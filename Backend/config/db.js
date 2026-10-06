const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // This uses the Atlas URI from your .env file
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Atlas Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// CRITICAL: You must export the function name exactly like this
module.exports = connectDB;