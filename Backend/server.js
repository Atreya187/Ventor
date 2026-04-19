const express = require("express");
const cors = require("cors");
const Groq = require("groq-sdk");
require("dotenv").config(); // Essential to read your .env file

const connectDB = require("./config/db");
const reportRoutes = require("./routes/reportRoutes");

const app = express();

// Use the API key from your .env file
const groq = new Groq({
  apiKey: process.env.GROK_API_KEY 
});

/* CONNECT DATABASE */
// Ensure your config/db.js uses process.env.MONGO_URI to connect to Atlas
connectDB();

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());

/* ROUTES */
app.use("/api", reportRoutes);

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful AI assistant for Ventor, a premium startup model planner." 
        },
        {
          role: "user",
          content: userMessage
        }
      ],
      model: "llama-3.1-8b-instant"
    });

    res.json({
      reply: chatCompletion.choices[0].message.content
    });
  } catch (error) {
    console.error("Groq API Error:", error);
    res.status(500).json({
      reply: "AI service temporarily unavailable."
    });
  }
});

/* TEST ROUTE */
app.get("/", (req, res) => {
  res.send("Ventor API running on MongoDB Atlas");
});

/* START SERVER */
// Uses PORT from .env if available, otherwise defaults to 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});