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

const addColumn = async (sql) => {
  try {
    await pool.query(sql);
  } catch (e) {
    if (e.code !== 'ER_DUP_FIELDNAME') throw e;
  }
};

const connectDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id INT AUTO_INCREMENT PRIMARY KEY,
        phone VARCHAR(20) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`);
    await addColumn('ALTER TABLE admins ADD COLUMN failed_attempts INT NOT NULL DEFAULT 0');
    await addColumn('ALTER TABLE admins ADD COLUMN locked_until DATETIME NULL');

    await pool.query(`
      CREATE TABLE IF NOT EXISTS submissions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        type VARCHAR(20) NOT NULL,
        name VARCHAR(120) NOT NULL,
        email VARCHAR(160) NOT NULL,
        phone VARCHAR(30) NOT NULL,
        subject VARCHAR(200) NULL,
        message TEXT NULL,
        extra TEXT NULL,
        status VARCHAR(20) NOT NULL DEFAULT 'new',
        mail_sent TINYINT NOT NULL DEFAULT 0,
        ip VARCHAR(64) NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_type (type),
        INDEX idx_status (status),
        INDEX idx_created (created_at)
      )`);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS login_logs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        phone VARCHAR(30) NOT NULL,
        success TINYINT NOT NULL,
        ip VARCHAR(64) NULL,
        user_agent VARCHAR(255) NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`);

    const phone = process.env.ADMIN_PHONE || '03001234567';
    const plain = process.env.ADMIN_PASSWORD || 'Admin@12345';
    const [rows] = await pool.query('SELECT id FROM admins WHERE phone = ?', [phone]);
    if (rows.length === 0) {
      await pool.query('INSERT INTO admins (phone, password) VALUES (?, ?)', [
        phone,
        await bcrypt.hash(plain, 10),
      ]);
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
connectDB.status = () => ({ connected, lastError });

module.exports = connectDB;