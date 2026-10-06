const mongoose = require('mongoose');

// 1. CHANGE THIS to your actual Mongo URI from your .env or server.js
const MONGO_URI = 'mongodb://localhost:27017/your_database_name'; 

// 2. Define the Schema (Adjust fields based on your project requirements)
const InsightSchema = new mongoose.Schema({
    name: String,
    description: String,
    category: String
});

const Insight = mongoose.model('Insight', InsightSchema);

async function seedData() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB...");

        // Clear existing (optional)
        await Insight.deleteMany({});

        // Add the missing B2B record
        await Insight.create({
            name: "B2B",
            description: "Business to Business Model Data",
            category: "General"
        });

        console.log("✅ Data seeded successfully! B2B insight created.");
        process.exit();
    } catch (err) {
        console.error("❌ Seeding failed:", err);
        process.exit(1);
    }
}

seedData();