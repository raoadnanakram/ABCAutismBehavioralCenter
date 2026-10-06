const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Admin || mongoose.model('Admin', adminSchema);
