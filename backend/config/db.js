const mongoose = require('mongoose');

if (!process.env.PORT) {
  require('dns').setServers(['8.8.8.8', '8.8.4.4']);
}

let lastError = null;
let details = null;

const connectDB = async () => {
  console.log('MONGO_URI set hai?', !!process.env.MONGO_URI);
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 15000,
    });
    console.log('MongoDB connected');
    lastError = null;
  } catch (err) {
    lastError = err.message;
    try {
      details = [...(err.reason?.servers || new Map()).entries()].map(([host, s]) => ({
        host,
        error: s.error ? s.error.message : null,
      }));
    } catch (e) {}
    console.error('DB error:', err.message, JSON.stringify(details));
  }
};

connectDB.status = () => ({
  mongoUriSet: !!process.env.MONGO_URI,
  jwtSecretSet: !!process.env.JWT_SECRET,
  dbState: mongoose.connection.readyState,
  lastError,
  details,
});

module.exports = connectDB;