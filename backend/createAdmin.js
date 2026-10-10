// Usage (local or SSH):  node backend/createAdmin.js 03001234567 "MyStrongPassword"
// or set ADMIN_PHONE / ADMIN_PASSWORD in .env. Existing admin => password is updated.
const path = require('path');
const dns = require('dns');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const Admin = require('./models/Admin');

let DB_URI = process.env.MONGODB_URI || process.env.MONGO_URI || process.env.DATABASE_URL || '';
// Atlas hostnames need mongodb+srv://
if (/^mongodb:\/\/(?:[^@]+@)?[^/:,]+\.mongodb\.net(\/|\?|$)/i.test(DB_URI)) DB_URI = DB_URI.replace(/^mongodb:\/\//, 'mongodb+srv://');

const phone = (process.argv[2] || process.env.ADMIN_PHONE || '').trim();
const rawPassword = process.argv[3] || process.env.ADMIN_PASSWORD || '';

(async () => {
  if (!DB_URI || !phone || !rawPassword) {
    console.error('Need MONGODB_URI plus phone and password (arguments or ADMIN_PHONE / ADMIN_PASSWORD).');
    process.exit(1);
  }
  try {
    try {
      await mongoose.connect(DB_URI, { serverSelectionTimeoutMS: 15000 });
    } catch (e) {
      if (!/querySrv|ECONNREFUSED|ENOTFOUND|ETIMEOUT|EAI_AGAIN/i.test(e.message)) throw e;
      console.warn('DNS lookup failed, retrying with 8.8.8.8 / 1.1.1.1 ...');
      dns.setServers(['8.8.8.8', '1.1.1.1']);
      await mongoose.disconnect().catch(() => {});
      await mongoose.connect(DB_URI, { serverSelectionTimeoutMS: 15000 });
    }
    await Admin.createCollection().catch(() => {});
    const hashed = await bcrypt.hash(rawPassword, 10);
    const existing = await Admin.findOne({ phone });
    if (existing) {
      existing.password = hashed;
      await existing.save();
      console.log('Admin already existed - password updated for', phone);
    } else {
      await Admin.create({ phone, password: hashed });
      console.log('Admin successfully created for', phone);
    }
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
})();
