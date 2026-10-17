require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();
app.use(express.json());
app.use(express.static('public'));

app.use('/api/auth', require('./routes/auth'));
app.get('/', (req, res) => res.redirect('/login.html'));

connectDB().then(() => {
  app.listen(process.env.PORT || 5174, () =>
    console.log(`Server: http://localhost:${process.env.PORT || 5174}`)
  );
});