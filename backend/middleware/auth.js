const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Access Denied! Token missing.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    req.admin = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    // 401 (not 403) so the dashboard knows to send the admin back to /login
    res.status(401).json({ success: false, message: 'Invalid or Expired Token!' });
  }
};

module.exports = verifyToken;
