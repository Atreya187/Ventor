const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Essential to read your .env file

const connectDB = require("./config/db");
const reportRoutes = require("./routes/reportRoutes");

const app = express();

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
    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({
        reply: "AI service is not configured."
      });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${encodeURIComponent(process.env.GEMINI_API_KEY)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [
              {
                text: "You are a helpful AI assistant for Ventor, a premium startup model planner."
              }
            ]
          },
          contents: [
            {
              role: "user",
              parts: [{ text: userMessage }]
            }
          ]
        })
      }
    );

    if (!response.ok) {
      const errorDetails = await response.text();
      console.error("Gemini API Error:", response.status, errorDetails);
      return res.status(502).json({
        reply: "AI service temporarily unavailable."
      });
    }

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      throw new Error("Gemini returned no text response");
    }

    res.json({
      reply
    });
  } catch (error) {
    console.error("Gemini API Error:", error);
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