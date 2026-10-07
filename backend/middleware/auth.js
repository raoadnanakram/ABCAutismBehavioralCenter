const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Access Denied! Token missing.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    req.admin = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });
    next();
  } catch (err) {
    // 401 (not 403) so the dashboard sends the admin back to /login
    const expired = err.name === 'TokenExpiredError';
    res.status(401).json({
      success: false,
      code: expired ? 'TOKEN_EXPIRED' : 'TOKEN_INVALID',
      message: expired
        ? 'Session expired. Please login again.'
        : 'Session is not valid on this server (login was made with a different secret). Please login again.'
    });
  }
};

module.exports = verifyToken;