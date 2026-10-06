// Usage (local or SSH):  node backend/createAdmin.js 03001234567 "MyStrongPassword"
// or set ADMIN_PHONE / ADMIN_PASSWORD in .env. Existing admin => password is updated.
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const Admin = require('./models/Admin');

const phone = (process.argv[2] || process.env.ADMIN_PHONE || '').trim();
const rawPassword = process.argv[3] || process.env.ADMIN_PASSWORD || '';

(async () => {
  if (!process.env.MONGO_URI || !phone || !rawPassword) {
    console.error('Need MONGO_URI plus phone and password (arguments or ADMIN_PHONE / ADMIN_PASSWORD).');
    process.exit(1);
  }
  try {
    await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 15000 });
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
