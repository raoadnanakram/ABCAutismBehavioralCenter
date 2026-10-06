const path = require('path');
const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const Contact = require('./models/Contact');
const Appointment = require('./models/Appointment');
const Admin = require('./models/Admin');
const verifyToken = require('./middleware/auth');

const app = express();

// ---------------------------------------------------------------- middleware
app.use(cors());
app.use(express.json());

// ------------------------------------------------------------------ database
let dbError = null;

async function connectDatabase() {
  if (!process.env.MONGO_URI) {
    dbError = 'MONGO_URI is not set';
    console.error('ERROR: MONGO_URI is not set. Add it to the hosting Environment Variables.');
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 15000 });
    dbError = null;
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
    console.error('Hint: in MongoDB Atlas > Network Access allow the hosting server (0.0.0.0/0), and check user/password in MONGO_URI.');
  }
}

// Creates the admin from ADMIN_PHONE / ADMIN_PASSWORD (no shell access needed on hosting)
async function ensureAdmin() {
  const phone = (process.env.ADMIN_PHONE || '').trim();
  const rawPassword = process.env.ADMIN_PASSWORD || '';
  if (!phone || !rawPassword) {
    const count = await Admin.countDocuments();
    if (count === 0) console.warn('WARNING: no admin exists. Set ADMIN_PHONE and ADMIN_PASSWORD, then redeploy.');
    return;
  }
  const existing = await Admin.findOne({ phone });
  const hashed = await bcrypt.hash(rawPassword, 10);
  if (!existing) {
    await Admin.create({ phone, password: hashed });
    console.log('Admin created for phone:', phone);
  } else if (process.env.ADMIN_FORCE_RESET === 'true') {
    existing.password = hashed;
    await existing.save();
    console.log('Admin password reset for phone:', phone);
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
app.get('/api/health', (req, res) => {
  const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  res.json({
    ok: true,
    database: states[mongoose.connection.readyState] || 'unknown',
    databaseName: mongoose.connection.name || null,
    databaseError: dbError
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
// GoDaddy injects PORT. Never hard-code 5173/3000 - that is the Vite dev port and gets EACCES.
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDatabase();
});
