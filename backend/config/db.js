const mongoose = require('mongoose');

// Sirf aapke computer par DNS fix lagao (GoDaddy par nahi)
if (!process.env.PORT) {
  require('dns').setServers(['8.8.8.8', '8.8.4.4']);
}

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('DB error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;