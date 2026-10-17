require('dotenv').config();
const path = require('path');
const express = require('express');
const connectDB = require('./config/db');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', require('./routes/auth'));
app.get('/', (req, res) => res.redirect('/login.html'));

connectDB().then(() => {
  app.listen(process.env.PORT || 5000, () =>
    console.log(`Server running on port ${process.env.PORT || 5000}`)
  );
});