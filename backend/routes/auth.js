const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const auth = require('../middleware/auth');

const pool = db.pool;
const h = (fn) => (req, res) =>
  fn(req, res).catch((e) => {
    console.error('Auth error:', e.message);
    res.status(500).json({ message: 'Server error' });
  });

const log = (phone, ok, req) =>
  pool
    .query('INSERT INTO login_logs (phone, success, ip, user_agent) VALUES (?,?,?,?)', [
      String(phone).slice(0, 30),
      ok ? 1 : 0,
      req.ip,
      String(req.headers['user-agent'] || '').slice(0, 255),
    ])
    .catch(() => {});

const BAD = { message: 'Phone ya password ghalat hai' };

router.post(
  '/login',
  h(async (req, res) => {
    const { phone, password } = req.body || {};
    if (!phone || !password)
      return res.status(400).json({ message: 'Phone aur password zaroori hain' });

    const [rows] = await pool.query(
      'SELECT *, (locked_until IS NOT NULL AND locked_until > NOW()) AS locked FROM admins WHERE phone = ? LIMIT 1',
      [String(phone).trim()]
    );
    const admin = rows[0];
    if (!admin) {
      log(phone, false, req);
      return res.status(401).json(BAD);
    }
    if (admin.locked) {
      log(phone, false, req);
      return res
        .status(423)
        .json({ message: 'Bohat ghalat koshishein. Account 15 minute ke liye lock hai.' });
    }

    const ok = await bcrypt.compare(String(password), admin.password);
    if (!ok) {
      await pool.query(
        'UPDATE admins SET failed_attempts = failed_attempts + 1, locked_until = IF(failed_attempts >= 5, DATE_ADD(NOW(), INTERVAL 15 MINUTE), locked_until) WHERE id = ?',
        [admin.id]
      );
      log(phone, false, req);
      return res.status(401).json(BAD);
    }

    await pool.query('UPDATE admins SET failed_attempts = 0, locked_until = NULL WHERE id = ?', [
      admin.id,
    ]);
    log(phone, true, req);
    const token = jwt.sign({ id: admin.id, phone: admin.phone }, process.env.JWT_SECRET, {
      expiresIn: '2h',
    });
    res.json({ token });
  })
);

router.get('/me', auth, (req, res) => res.json({ phone: req.admin.phone }));

router.post(
  '/change-password',
  auth,
  h(async (req, res) => {
    const { currentPassword, newPassword } = req.body || {};
    if (!currentPassword || !newPassword)
      return res.status(400).json({ message: 'Dono password zaroori hain' });
    if (newPassword.length < 10 || !/[A-Za-z]/.test(newPassword) || !/\d/.test(newPassword))
      return res
        .status(400)
        .json({ message: 'Naya password kam az kam 10 characters, harf aur number ke saath ho' });

    const [rows] = await pool.query('SELECT id, password FROM admins WHERE id = ?', [req.admin.id]);
    const admin = rows[0];
    if (!admin || !(await bcrypt.compare(String(currentPassword), admin.password)))
      return res.status(401).json({ message: 'Maujooda password ghalat hai' });

    await pool.query('UPDATE admins SET password = ? WHERE id = ?', [
      await bcrypt.hash(newPassword, 10),
      admin.id,
    ]);
    res.json({ ok: true });
  })
);

module.exports = router;