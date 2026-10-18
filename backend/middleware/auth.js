const jwt = require('jsonwebtoken');

const IDLE_MS = 5 * 60 * 1000;
const lastSeen = new Map();

module.exports = (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Token missing' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const key = `${payload.id}:${payload.iat}`;
    const now = Date.now();
    const prev = lastSeen.get(key);
    if (prev && now - prev > IDLE_MS) {
      lastSeen.delete(key);
      return res.status(401).json({ message: 'Session expired (idle)' });
    }
    lastSeen.set(key, now);
    req.admin = payload;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};