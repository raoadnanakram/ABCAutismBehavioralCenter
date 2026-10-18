const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connectDB = require('../config/db');
const auth = require('../middleware/auth');

router.post('/login', async (req, res) => {
  try {
    const { phone, password } = req.body;
    if (!phone || !password)
      return res.status(400).json({ message: 'Phone aur password zaroori hain' });

    const [rows] = await connectDB.pool.query(
      'SELECT * FROM admins WHERE phone = ? LIMIT 1',
      [phone]
    );
    const admin = rows[0];
    if (!admin) return res.status(401).json({ message: 'Phone ya password ghalat hai' });

    const ok = await bcrypt.compare(password, admin.password);
    if (!ok) return res.status(401).json({ message: 'Phone ya password ghalat hai' });

    const token = jwt.sign({ id: admin.id, phone: admin.phone }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    res.json({ token });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/me', auth, (req, res) => {
  res.json({ phone: req.admin.phone });
});

module.exports = router;