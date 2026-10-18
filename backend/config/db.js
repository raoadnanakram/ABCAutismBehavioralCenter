const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 5,
});

let connected = false;
let lastError = null;

const connectDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id INT AUTO_INCREMENT PRIMARY KEY,
        phone VARCHAR(20) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    const phone = process.env.ADMIN_PHONE || '03001234567';
    const plain = process.env.ADMIN_PASSWORD || 'Admin@12345';

    const [rows] = await pool.query('SELECT id FROM admins WHERE phone = ?', [phone]);
    if (rows.length === 0) {
      const hashed = await bcrypt.hash(plain, 10);
      await pool.query('INSERT INTO admins (phone, password) VALUES (?, ?)', [phone, hashed]);
      console.log('Admin ban gaya:', phone);
    }

    connected = true;
    lastError = null;
    console.log('MySQL connected');
  } catch (err) {
    lastError = err.message;
    console.error('DB error:', err.message);
  }
};

connectDB.pool = pool;
connectDB.status = () => ({
  connected,
  lastError,
  jwtSecretSet: !!process.env.JWT_SECRET,
  dbVarsSet: {
    DB_HOST: !!process.env.DB_HOST,
    DB_PORT: !!process.env.DB_PORT,
    DB_NAME: !!process.env.DB_NAME,
    DB_USER: !!process.env.DB_USER,
    DB_PASSWORD: !!process.env.DB_PASSWORD,
  },
});

module.exports = connectDB;