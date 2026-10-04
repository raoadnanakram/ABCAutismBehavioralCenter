const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer'); // Nodemailer import kiya gaya hai
require('dotenv').config();

const Contact = require('./models/Contact');
const Appointment = require('./models/Appointment');
const Admin = require('./models/Admin');
const verifyToken = require('./middleware/auth');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB successfully connected!'))
  .catch((err) => console.log('Database connection error:', err));

// Nodemailer Transporter Configuration (Gmail SMTP)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Aapki official email (.env mein hogi)
    pass: process.env.EMAIL_PASS  // Gmail App Password (.env mein hoga)
  }
});

// ==================== PUBLIC APIs ====================

// 1. Contact Form Submit API
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;
    const newContact = new Contact({ 
      name, 
      email, 
      phone, 
      service, 
      message 
    });
    await newContact.save();

    // Emails bhejne ka logic
    try {
      // User ko confirmation email
      if (email) {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: 'ABC Autism Center - Query Received',
          text: `Hello ${name},\n\nThank you for contacting ABC Autism & Behavioral Center. We have received your query regarding "${service || 'General'}" and will get back to you shortly.\n\nBest Regards,\nTeam ABC Autism Center`
        });
      }

      // Owner ko notification email
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.OWNER_EMAIL || process.env.EMAIL_USER,
        subject: `New Contact Form Submission from ${name}`,
        text: `You have received a new contact submission:\n\nName: ${name}\nEmail: ${email || 'N/A'}\nPhone: ${phone || 'N/A'}\nService: ${service || 'N/A'}\nMessage: ${message}\n\nCheck your admin dashboard for more details.`
      });
    } catch (emailErr) {
      console.error('Email sending error:', emailErr);
    }

    res.status(201).json({ success: true, message: 'Contact form successfully submit ho gaya hai aur emails bhej di gayi hain!' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 2. Book Appointment API Endpoint
app.post('/api/appointment', async (req, res) => {
  try {
    const { name, email, phone, childName, service, date, time, additionalInfo } = req.body;
    const newAppointment = new Appointment({ 
      name, 
      email, 
      phone, 
      childName, 
      service, 
      date, 
      time,
      additionalInfo
    });
    await newAppointment.save();

    // Appointment emails bhejne ka logic
    try {
      // User ko confirmation email
      if (email) {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: 'ABC Autism Center - Appointment Booking Confirmation',
          text: `Hello ${name},\n\nYour appointment for child (${childName || 'N/A'}) regarding "${service || 'General'}" has been successfully booked for ${date} at ${time}.\n\nThank you,\nTeam ABC Autism Center`
        });
      }

      // Owner ko notification email
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.OWNER_EMAIL || process.env.EMAIL_USER,
        subject: `New Appointment Booked by ${name}`,
        text: `A new appointment has been booked:\n\nParent Name: ${name}\nChild Name: ${childName || 'N/A'}\nService: ${service || 'N/A'}\nPhone: ${phone}\nEmail: ${email || 'N/A'}\nDate: ${date}\nTime: ${time}\nAdditional Info: ${additionalInfo || 'None'}\n\nCheck your admin dashboard.`
      });
    } catch (emailErr) {
      console.error('Email sending error:', emailErr);
    }

    res.status(201).json({ success: true, message: 'Appointment successfully book ho gayi hai aur emails bhej di gayi hain!' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 3. Admin Login API (Phone Number & Password)
app.post('/api/admin/login', async (req, res) => {
  try {
    const { phone, password } = req.body;

    // Check admin exists
    const admin = await Admin.findOne({ phone });
    if (!admin) {
      return res.status(400).json({ success: false, message: 'Invalid Phone Number or Password!' });
    }

    // Match Password securely using bcrypt
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid Phone Number or Password!' });
    }

    // Create JWT Token (Expires in 2 hours for high security)
    const token = jwt.sign({ id: admin._id, phone: admin.phone }, process.env.JWT_SECRET, { expiresIn: '2h' });

    res.status(250).json({ // standard 200 ok status
      success: true,
      message: 'Admin logged in successfully!',
      token
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==================== ADMIN PROTECTED APIs (Dashboard) ====================

// 4. Get All Contacts for Admin Dashboard
app.get('/api/admin/contacts', verifyToken, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, contacts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 5. Get All Appointments for Admin Dashboard
app.get('/api/admin/appointments', verifyToken, async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, appointments });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server port ${PORT} par chal raha hai.`);
});