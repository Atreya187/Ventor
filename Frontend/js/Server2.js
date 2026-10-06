const express = require("express");
const cors = require("cors");
const Groq = require("groq-sdk");

const app = express();

app.use(cors());
app.use(express.json());

const groq = new Groq({
  apiKey: "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"
});

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

    res.json({
      reply: "AI service temporarily unavailable."
    });

  }

});

app.listen(3000, () => {
  console.log("AI chatbot server running on port 3000");
});