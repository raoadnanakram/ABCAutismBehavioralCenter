const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, trim: true, default: '' },          // optional on the website form
  phone: { type: String, required: true, trim: true },
  childName: { type: String, trim: true, default: '' },
  service: { type: String, trim: true, default: '' },
  date: { type: String, required: true },
  time: { type: String, required: true },
  additionalInfo: { type: String, trim: true, default: '' },
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Appointment || mongoose.model('Appointment', appointmentSchema);
