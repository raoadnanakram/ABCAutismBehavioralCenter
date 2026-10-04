const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const Admin = require('./models/Admin');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected for Admin creation...');
    
    const phone = "03001234567"; // Apna admin phone number yahan likhein
    const rawPassword = "securepassword123"; // Apna secure password yahan likhein

    const existingAdmin = await Admin.findOne({ phone });
    if (existingAdmin) {
      console.log('Admin already exists with this phone number!');
      process.exit();
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(rawPassword, salt);

    const newAdmin = new Admin({
      phone,
      password: hashedPassword
    });

    await newAdmin.save();
    console.log('Admin successfully created!');
    process.exit();
  })
  .catch(err => {
    console.log('Error:', err);
  });