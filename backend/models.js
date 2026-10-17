const m = require('mongoose');

// 03059804409 / +92 305 9804409 / 923059804409 -> 03059804409
const normPhone = (p) => {
  let d = String(p || '').replace(/\D/g, '');
  if (d.startsWith('92') && d.length === 12) d = '0' + d.slice(2);
  return d;
};

const Admin = m.model('Admin', new m.Schema({
  phone: { type: String, unique: true },
  password: String,
  fails: { type: Number, default: 0 },
  lockUntil: Date,
}));

const Contact = m.model('Contact', new m.Schema({
  name: String, email: String, phone: String, service: String,
  subject: String, preferredContact: String, message: String,
  read: { type: Boolean, default: false },
}, { timestamps: true }));

const Appointment = m.model('Appointment', new m.Schema({
  name: String, email: String, phone: String, childName: String,
  service: String, date: String, time: String, additionalInfo: String,
  status: { type: String, enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'], default: 'Pending' },
}, { timestamps: true }));

module.exports = { Admin, Contact, Appointment, normPhone };
