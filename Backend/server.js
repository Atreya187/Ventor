require('dotenv').config(); // MUST be the first line
const express = require("express");
const cors = require("cors");
const Groq = require("groq-sdk");
const connectDB = require("./config/db");
const reportRoutes = require("./routes/reportRoutes");

const app = express();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "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"
});

/* CONNECT DATABASE */
connectDB();

/* MIDDLEWARE */
// app.use(cors());
app.use(cors({
  origin:"*", // Add your Vercel URL here
  methods: ["GET", "POST", "PUT", "DELETE"],
  // credentials: true
}));
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
          content: "You are a helpful AI assistant for a startup model planner website."
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
    console.error(error);
    res.status(500).json({
      reply: "AI service temporarily unavailable."
    });
  }
});

/* TEST ROUTE */
app.get("/", (req, res) => {
  res.send("API running");
});

/* START SERVER */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
