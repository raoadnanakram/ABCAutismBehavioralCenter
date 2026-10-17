require('dotenv').config();
const bcrypt = require('bcryptjs');
const connectDB = require('./config/db');
const Admin = require('./models/Admin');

(async () => {
  await connectDB();

  const phone = '03001234567';       // login par bilkul yehi number likhna hai
  const password = 'Admin@12345';    // login par bilkul yehi password likhna hai

  const hashed = await bcrypt.hash(password, 10);
  await Admin.findOneAndUpdate(
    { phone },
    { phone, password: hashed },
    { upsert: true, new: true }
  );

  console.log('Admin tayyar hai -> phone:', phone);
  process.exit();
})();