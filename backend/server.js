require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const cookie = require('cookie-parser');
const sanitize = require('express-mongo-sanitize');
const path = require('path');
const bcrypt = require('bcryptjs');
const { Admin, normPhone } = require('./models');

const app = express();
app.set('trust proxy', 1);

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      scriptSrcAttr: ["'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"]
    }
  },
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));

// CORS Configuration
const origins = (process.env.FRONTEND_URL || '').split(',').map((x) => x.trim().replace(/\/+$/, '')).filter(Boolean);
if (process.env.NODE_ENV !== 'production') {
  origins.push('http://localhost:5173', 'http://localhost:3000');
}
app.use(cors({ origin: origins, credentials: true, methods: ['GET', 'POST', 'PATCH', 'DELETE'], allowedHeaders: ['Content-Type', 'Authorization'] }));

app.use(express.json({ limit: '20kb' }));
app.use(cookie());
app.use(sanitize());

// Routes & Health Check
app.get('/', (q, s) => s.json({ ok: true, service: 'ABC Autism API' }));
app.get('/api/health', (q, s) => s.json({ ok: true, db: mongoose.connection.readyState === 1, status: dbState }));
app.use('/api', require('./routes'));
app.use('/admin', express.static(path.join(__dirname, 'public')));

app.use((q, s) => s.status(404).json({ success: false, message: 'Not found' }));

app.use((e, q, s, n) => {
  console.error(e.message);
  s.status(e.type === 'entity.parse.failed' ? 400 : 500).json({ success: false, message: 'Server error. Please try again.' });
});

// Never crash server on unhandled rejections
process.on('unhandledRejection', (e) => console.error('Unhandled:', e && e.message));
process.on('uncaughtException', (e) => console.error('Uncaught:', e && e.message));

let dbState = 'connecting';
const why = (e) => {
  const m = String(e && e.message);
  if (/bad auth|authentication failed/i.test(m)) return 'MONGO_URI username/password is wrong';
  if (/ENOTFOUND|querySrv|ECONNREFUSED.*27017/i.test(m)) return 'MONGO_URI host is wrong';
  if (/Server selection|timed out|whitelist|ECONNRESET|SSL|tls/i.test(m)) return 'Atlas Network Access: add 0.0.0.0/0';
  return 'MongoDB connection failed (see logs)';
};

async function connectDb() {
  if (!process.env.MONGO_URI) {
    dbState = 'MONGO_URI secret is missing';
    console.error(dbState);
    return setTimeout(connectDb, 15000);
  }
  try {
    await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 10000 });
    dbState = 'connected';
    console.log('MongoDB connected');
  } catch (e) {
    dbState = why(e);
    console.error('MongoDB error:', e.message);
    return setTimeout(connectDb, 15000); // Retry connection to keep server alive
  }

  try {
    const phone = normPhone ? normPhone(process.env.ADMIN_PHONE) : (process.env.ADMIN_PHONE || '').replace(/\D/g, '');
    if (phone && process.env.ADMIN_PASSWORD && !(await Admin.findOne({ phone }))) {
      await Admin.create({ phone, password: await bcrypt.hash(process.env.ADMIN_PASSWORD, 12) });
      console.log('Admin created in MongoDB');
    }
  } catch (e) { 
    console.error('Admin seed error:', e.message); 
  }
}

app.listen(process.env.PORT || 5000, () => { 
  console.log('Server running'); 
  connectDb(); 
});