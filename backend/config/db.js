const mongoose = require('mongoose');

// Sirf aapke computer par DNS fix (GoDaddy par nahi)
if (!process.env.PORT) {
  require('dns').setServers(['8.8.8.8', '8.8.4.4']);
}

let lastError = null;

const connectDB = async () => {
  console.log('MONGO_URI set hai?', !!process.env.MONGO_URI);
  console.log('JWT_SECRET set hai?', !!process.env.JWT_SECRET);
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log('MongoDB connected');
  } catch (err) {
    lastError = err.message;
    console.error('DB error:', err.message);
  }
};

connectDB.status = () => ({
  mongoUriSet: !!process.env.MONGO_URI,
  jwtSecretSet: !!process.env.JWT_SECRET,
  dbState: mongoose.connection.readyState, // 1 = connected
  lastError,
});

module.exports = connectDB;