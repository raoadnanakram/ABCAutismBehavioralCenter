require('dotenv').config();
const path = require('path');
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');

const app = express();
app.set('trust proxy', 1);
app.use(helmet({ contentSecurityPolicy: false }));

// Career form sends the CV inside the request, so this one route may be bigger.
// It must come BEFORE the general (small) limit below.
app.use('/api/forms/career', express.json({ limit: '8mb' }));
// Admin picture upload (one picture per request, base64), so this route may be bigger too.
app.use('/api/admin/media', express.json({ limit: '6mb' }));
app.use(express.json({ limit: '50kb' }));

app.use(
  '/api/auth/login',
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message: { message: 'Bohat zyada koshishein. 15 minute baad try karein.' },
  })
);

app.use('/api/auth', require('./routes/auth'));
app.use('/api/forms', require('./routes/forms'));
app.use('/api', require('./routes/posts')); // public: GET /api/posts, GET /api/media/:id
app.use('/api/admin', require('./routes/admin'));

app.use(['/login', '/dashboard'], (req, res, next) => {
  res.set('X-Robots-Tag', 'noindex, nofollow');
  next();
});

app.use(express.static(path.join(__dirname, 'site')));
app.get(/.*/, (req, res) => {
  if (req.path.startsWith('/api/')) return res.status(404).json({ message: 'Not found' });
  res.sendFile(path.join(__dirname, 'site', 'index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log('Server running on port', port));
connectDB();