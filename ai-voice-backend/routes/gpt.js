const express = require("express");
const router = express.Router();
const axios = require("axios");

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

router.post("/", async (req, res) => {
  const { input, interviewMode } = req.body;

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct", // You can change this if needed
        messages: [
          {
            role: "system",
            content: interviewMode
              ? "You are an HR interviewer. Respond naturally to what the candidate says as if in a conversation. Then give concise feedback to help them improve their English. Ask a related follow-up question."
              : "You are a friendly English-speaking conversation partner and tutor. First, respond naturally and casually to what the user says, as if chatting with a friend. Then give brief feedback on their grammar, tone, or word choice. Then ask a related question to keep the conversation going.",
          },
          {
            role: "user",
            content: input,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error("OpenRouter Error:", error.response?.data || error.message);
    res.status(500).json({ reply: "Sorry, I couldn't process that." });
  }
});

module.exports = router;
