const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const auth = require('../middleware/auth');

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { phone, password } = req.body;
    if (!phone || !password)
      return res.status(400).json({ message: 'Phone aur password zaroori hain' });

    const admin = await Admin.findOne({ phone });
    if (!admin) return res.status(401).json({ message: 'Phone ya password ghalat hai' });

    const ok = await bcrypt.compare(password, admin.password);
    if (!ok) return res.status(401).json({ message: 'Phone ya password ghalat hai' });

    const token = jwt.sign({ id: admin._id, phone: admin.phone }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    res.json({ token });
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/auth/me  (dashboard isse check karega)
router.get('/me', auth, (req, res) => {
  res.json({ phone: req.admin.phone });
});

module.exports = router;