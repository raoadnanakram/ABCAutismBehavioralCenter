const path = require('path');
const dns = require('dns');
const crypto = require('crypto');
const net = require('net');
const https = require('https');
const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config({ path: path.join(__dirname, '.env') });

// Hosting dashboards often keep stray spaces or wrapping quotes when a value is pasted.
// Clean them, otherwise passwords / secrets silently stop matching.
for (const key of ['MONGO_URI', 'MONGODB_URI', 'DATABASE_URL', 'JWT_SECRET', 'ADMIN_PHONE', 'ADMIN_PASSWORD', 'EMAIL_USER', 'EMAIL_PASS', 'OWNER_EMAIL']) {
  let v = process.env[key];
  if (typeof v !== 'string') continue;
  v = v.trim();
  if (v.length > 1 && ((v[0] === '"' && v.endsWith('"')) || (v[0] === "'" && v.endsWith("'")))) v = v.slice(1, -1);
  process.env[key] = v;
}

const Contact = require('./models/Contact');
const Appointment = require('./models/Appointment');
const Admin = require('./models/Admin');
const verifyToken = require('./middleware/auth');

// Unified helper to get active database URI
const getDbUri = () => process.env.MONGO_URI || process.env.MONGODB_URI || process.env.DATABASE_URL;

// If the hosting did not pass JWT_SECRET, derive a private one from the active DB URI (also a secret)
// so login keeps working. Better: set JWT_SECRET explicitly in the hosting Secrets.
if (!process.env.JWT_SECRET && getDbUri()) {
  process.env.JWT_SECRET = crypto.createHash('sha256').update('abc-autism-jwt:' + getDbUri()).digest('hex');
  console.warn('WARNING: JWT_SECRET not set - using a key derived from Database URI. Add JWT_SECRET in hosting Secrets.');
}

const app = express();

// ---------------------------------------------------------------- middleware
app.use(cors());
app.use(express.json());

// ------------------------------------------------------------------ database
let dbError = null;

// ---------------------------------------------------- network diagnostics (shown in /api/health)
let dbNetwork = null;

function tcpCheck(host, port, ms) {
  return new Promise((resolve) => {
    const socket = net.connect({ host, port });
    const done = (r) => { socket.destroy(); resolve(r); };
    socket.setTimeout(ms, () => done('timeout'));
    socket.once('connect', () => done('open'));
    socket.once('error', (e) => done('error ' + (e.code || e.message)));
  });
}

function httpGetText(url, ms) {
  return new Promise((resolve) => {
    const req = https.get(url, { timeout: ms }, (res) => {
      let body = '';
      res.on('data', (c) => { body += c; if (body.length > 200) req.destroy(); });
      res.on('end', () => resolve(body.trim()));
      res.on('close', () => resolve(body.trim()));
    });
    req.on('timeout', () => { req.destroy(); resolve(null); });
    req.on('error', () => resolve(null));
  });
}

async function probeNetwork(uri) {
  const info = {};
  try {
    info.serverPublicIp = await httpGetText('https://api.ipify.org', 5000); // the IP Atlas sees
    const m = (uri || '').match(/^mongodb\+srv:\/\/(?:[^@]+@)?([^/?]+)/);
    if (m) {
      try {
        const srv = await dns.promises.resolveSrv('_mongodb._tcp.' + m[1]);
        info.atlasDns = 'ok (' + srv.length + ' hosts)';
        info.atlasPort27017 = await tcpCheck(srv[0].name, srv[0].port || 27017, 6000);
      } catch (e) {
        info.atlasDns = 'failed: ' + e.code;
      }
    }
    // Any open-port test host: tells us if this hosting blocks outbound port 27017 at all
    info.outbound27017ToTestHost = await tcpCheck('portquiz.net', 27017, 6000);
  } catch (e) {
    info.error = e.message;
  }
  dbNetwork = info;
}

// Some networks (many Pakistani ISPs) cannot resolve MongoDB Atlas "mongodb+srv" addresses
// (error: querySrv ECONNREFUSED). On that error we retry once using Google / Cloudflare DNS.
async function connectWithDnsFallback(uri) {
  const options = { serverSelectionTimeoutMS: Number(process.env.DB_TIMEOUT_MS) || 15000 };
  if (process.env.DNS_SERVERS) {
    dns.setServers(process.env.DNS_SERVERS.split(',').map((s) => s.trim()).filter(Boolean));
  }
  try {
    await mongoose.connect(uri, options);
  } catch (err) {
    const dnsProblem = /querySrv|ECONNREFUSED|ENOTFOUND|ETIMEOUT|EAI_AGAIN/i.test(err.message);
    if (uri.startsWith('mongodb+srv') && dnsProblem) {
      console.warn('DNS lookup failed (' + err.message + '). Retrying with public DNS 8.8.8.8 / 1.1.1.1 ...');
      dns.setServers(['8.8.8.8', '1.1.1.1']);
      await mongoose.disconnect().catch(() => {});
      await mongoose.connect(uri, options);
    } else {
      throw err;
    }
  }
}

async function connectDatabase() {
  const activeUri = getDbUri();
  if (!activeUri) {
    dbError = 'Database URI (MONGO_URI / MONGODB_URI / DATABASE_URL) is not set';
    console.error('ERROR: Database URI is not set. Add it to the hosting Environment Variables.');
    return;
  }
  try {
    await connectWithDnsFallback(activeUri);
    dbError = null;
    dbNetwork = null;
    console.log('MongoDB successfully connected! Database:', mongoose.connection.name);

    // Make sure the collections + indexes exist right away (not only after the first form submit)
    for (const Model of [Admin, Contact, Appointment]) {
      try {
        await Model.createCollection();
      } catch (e) {
        if (e.code !== 48) console.error(`createCollection(${Model.modelName}) failed:`, e.message);
      }
      await Model.init();
    }
    console.log('Collections ready: admins, contacts, appointments');

    await ensureAdmin();
  } catch (err) {
    dbError = err.message;
    console.error('Database connection error:', err.message);
    probeNetwork(activeUri).then(() => console.log('Network check:', JSON.stringify(dbNetwork)));
    console.error('Hint: in MongoDB Atlas > Network Access allow the hosting server (0.0.0.0/0), and check user/password in database URI.');
    // Keep trying, so fixing Atlas is enough - no restart needed
    const wait = Number(process.env.DB_RETRY_MS) || 30000;
    console.log('Will retry the database connection in ' + Math.round(wait / 1000) + 's ...');
    setTimeout(connectDatabase, wait);
  }
}

// ADMIN_PHONE / ADMIN_PASSWORD are the source of truth (no shell access needed on hosting):
//  - admin is created if missing
//  - password is updated if it differs from ADMIN_PASSWORD
//  - any OTHER admin account is removed (the old default login was public on GitHub).
//    Set ADMIN_KEEP_OTHERS=true to keep other admins.
async function ensureAdmin() {
  const phone = (process.env.ADMIN_PHONE || '').trim();
  const rawPassword = process.env.ADMIN_PASSWORD || '';
  if (!phone || !rawPassword) {
    const count = await Admin.countDocuments();
    if (count === 0) console.warn('WARNING: no admin exists. Set ADMIN_PHONE and ADMIN_PASSWORD, then redeploy.');
    return;
  }

  const existing = await Admin.findOne({ phone });
  if (!existing) {
    await Admin.create({ phone, password: await bcrypt.hash(rawPassword, 10) });
    console.log('Admin created for phone:', phone);
  } else if (!(await bcrypt.compare(rawPassword, existing.password))) {
    existing.password = await bcrypt.hash(rawPassword, 10);
    await existing.save();
    console.log('Admin password updated for phone:', phone);
  } else {
    console.log('Admin OK for phone:', phone);
  }

if (process.env.ADMIN_KEEP_OTHERS !== 'true') {
    const removed = await Admin.deleteMany({ phone: { $ne: phone } });
    if (removed.deletedCount) console.log('Removed old admin account(s):', removed.deletedCount);
  }
}

// -------------------------------------------------------------------- email
// Short timeouts + fire-and-forget: a blocked SMTP port must never freeze a form submit.
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 15000
});

function sendMailSafe(options) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) return;
  transporter.sendMail({ from: process.env.EMAIL_USER, ...options })
    .catch((err) => console.error('Email sending error:', err.message));
}

const OWNER = () => process.env.OWNER_EMAIL || process.env.EMAIL_USER;
const clean = (v) => (typeof v === 'string' ? v.trim() : '');

// -------------------------------------------------------------- public APIs
app.get('/api/health', async (req, res) => {
  const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  let adminCount = null;
  try {
    if (mongoose.connection.readyState === 1) adminCount = await Admin.countDocuments();
  } catch (e) { /* ignore */ }
  res.json({
    ok: true,
    database: states[mongoose.connection.readyState] || 'unknown',
    databaseName: mongoose.connection.name || null,
    databaseError: dbError,
    networkCheck: dbNetwork,
    adminCount,
    settingsSeenByServer: {
      MONGODB_URI: !!process.env.MONGODB_URI,
      DATABASE_URL: !!process.env.DATABASE_URL,
      JWT_SECRET: !!process.env.JWT_SECRET,
      ADMIN_PHONE: !!process.env.ADMIN_PHONE,
      ADMIN_PASSWORD: !!process.env.ADMIN_PASSWORD,
      EMAIL_USER: !!process.env.EMAIL_USER,
      EMAIL_PASS: !!process.env.EMAIL_PASS,
      OWNER_EMAIL: !!process.env.OWNER_EMAIL
    }
  });
});

app.post('/api/contact', async (req, res) => {
  try {
    const name = clean(req.body.name);
    const email = clean(req.body.email);
    const phone = clean(req.body.phone);
    const service = clean(req.body.service);
    const preferredContact = clean(req.body.preferredContact);
    const message = clean(req.body.message);

    if (!name || !phone) {
      return res.status(400).json({ success: false, message: 'Name and phone number are required.' });
    }

    await Contact.create({ name, email, phone, service, preferredContact, message });

    if (email) {
      sendMailSafe({
        to: email,
        subject: 'ABC Autism Center - Query Received',
        text: `Hello ${name},\n\nThank you for contacting ABC Autism & Behavioral Center. We have received your query regarding "${service || 'General'}" and will get back to you shortly.\n\nBest Regards,\nTeam ABC Autism Center`
      });
    }
    sendMailSafe({
      to: OWNER(),
      subject: `New Contact Form Submission from ${name}`,
      text: `You have received a new contact submission:\n\nName: ${name}\nEmail: ${email || 'N/A'}\nPhone: ${phone}\nService: ${service || 'N/A'}\nPreferred contact: ${preferredContact || 'N/A'}\nMessage: ${message || 'N/A'}\n\nCheck your admin dashboard for more details.`
    });

    res.status(201).json({ success: true, message: 'Your message has been sent successfully.' });
  } catch (error) {
    console.error('POST /api/contact failed:', error.message);
    res.status(500).json({ success: false, message: 'Could not save your message. Please try again.', error: error.message });
  }
});

app.post('/api/appointment', async (req, res) => {
  try {
    const name = clean(req.body.name);
    const email = clean(req.body.email);
    const phone = clean(req.body.phone);
    const childName = clean(req.body.childName);
    const service = clean(req.body.service);
    const date = clean(req.body.date);
    const time = clean(req.body.time);
    const additionalInfo = clean(req.body.additionalInfo);

    if (!name || !phone || !date || !time) {
      return res.status(400).json({ success: false, message: 'Name, phone, date and time are required.' });
    }

    await Appointment.create({ name, email, phone, childName, service, date, time, additionalInfo });

    if (email) {
      sendMailSafe({
        to: email,
        subject: 'ABC Autism Center - Appointment Booking Confirmation',
        text: `Hello ${name},\n\nYour appointment for child (${childName || 'N/A'}) regarding "${service || 'General'}" has been successfully booked for ${date} at ${time}.\n\nThank you,\nTeam ABC Autism Center`
      });
    }
    sendMailSafe({
      to: OWNER(),
      subject: `New Appointment Booked by ${name}`,
      text: `A new appointment has been booked:\n\nParent Name: ${name}\nChild Name: ${childName || 'N/A'}\nService: ${service || 'N/A'}\nPhone: ${phone}\nEmail: ${email || 'N/A'}\nDate: ${date}\nTime: ${time}\nAdditional Info: ${additionalInfo || 'None'}\n\nCheck your admin dashboard.`
    });

    res.status(201).json({ success: true, message: 'Appointment booked successfully.' });
  } catch (error) {
    console.error('POST /api/appointment failed:', error.message);
    res.status(500).json({ success: false, message: 'Could not book the appointment. Please try again.', error: error.message });
  }
});

app.post('/api/admin/login', async (req, res) => {
  try {
    const phone = clean(req.body.phone);
    const password = typeof req.body.password === 'string' ? req.body.password : '';

    if (!phone || !password) {
      return res.status(400).json({ success: false, message: 'Phone number and password are required.' });
    }
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not set');
      return res.status(500).json({ success: false, message: 'Server is not configured (JWT_SECRET missing).' });
    }
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ success: false, message: 'Database is not connected. Check /api/health.' });
    }

    const admin = await Admin.findOne({ phone });
    const isMatch = admin ? await bcrypt.compare(password, admin.password) : false;
    if (!admin || !isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid Phone Number or Password!' });
    }

    const token = jwt.sign({ id: admin._id, phone: admin.phone }, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.status(200).json({ success: true, message: 'Admin logged in successfully!', token });
  } catch (error) {
    console.error('POST /api/admin/login failed:', error.message);
    res.status(500).json({ success: false, message: 'Login failed on the server.', error: error.message });
  }
});

// ------------------------------------------------------- admin protected APIs
app.get('/api/admin/contacts', verifyToken, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/api/admin/appointments', verifyToken, async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Unknown API routes -> JSON 404 (never HTML, so the dashboard can parse it)
app.use('/api', (req, res) => {
  res.status(404).json({ success: false, message: 'API route not found.' });
});

// ------------------------------------------------ optional: serve built frontend
// (the website itself lives on GitHub Pages; this only runs if frontend/dist exists)
const distPath = path.join(__dirname, '..', 'frontend', 'dist');
if (fs.existsSync(path.join(distPath, 'index.html'))) {
  app.use(express.static(distPath));
  // Express 5: a bare '*' is invalid, a plain middleware is the safe SPA fallback
  app.use((req, res) => res.sendFile(path.join(distPath, 'index.html')));
} else {
  app.get('/', (req, res) => res.json({ ok: true, service: 'ABC Autism Center API' }));
}

// ---------------------------------------------------------------- start up
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDatabase();
});