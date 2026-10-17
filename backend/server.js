require('dotenv').config();
const path = require('path');
const express = require('express');
const connectDB = require('./config/db');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/health', (req, res) => res.json(connectDB.status()));
app.use('/api/auth', require('./routes/auth'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'public', 'login.html'))
);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log('Server running on port', port));
connectDB();