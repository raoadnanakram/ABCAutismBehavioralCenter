const mongoose = require('mongoose');
const { getLastError } = require('../mailer');

const adminSchema = new mongoose.Schema(
  {
    phone: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Admin', adminSchema);