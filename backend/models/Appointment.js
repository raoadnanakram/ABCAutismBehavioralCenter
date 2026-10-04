const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  childName: { type: String },
  service: { type: String },
  date: { type: String, required: true },
  time: { type: String, required: true },
  additionalInfo: { type: String }, // Yeh naya field add karein
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Appointment', appointmentSchema);