const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // process.env.MONGO_URI will be pulled from your .env file
        await mongoose.connect(process.env.MONGO_URI);
        console.log("🚀 Ventor Database Connected to Atlas!");
    } catch (err) {
        console.error("Database connection error:", err.message);
        process.exit(1); // Stop the server if connection fails
    }
};

module.exports = connectDB;