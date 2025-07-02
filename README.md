# 🎙️ AI Voice Tutor

> A voice-based English speaking assistant that gives real-time feedback using mistral-7B AI.

[🔗 Demo Video](https://your-demo-link.com)  
[📖 Substack Deep Dive](https://your-substack-link.com)  
[💼 Connect on LinkedIn](https://www.linkedin.com/in/samradhi-sharma-2781a4261/)

---

## 🧠 Overview

**AI Voice Tutor** is an AI-powered speech assistant built to help students — especially bilingual or non-native speakers — improve their spoken English and prepare for job interviews.

It provides:
- Real-time transcription
- Spoken feedback using mistral-7B model via OpenRouter
- Metrics like WPM (words per minute), filler word count, and a fluency score
- Two modes: friendly tutor or HR-style interviewer

---

## 📸 Preview

<!-- Replace with actual image path -->
![App Screenshot](https://drive.google.com/file/d/1AZsqSEeldUeyCUV7muNpye4IORNVDyMz/view?usp=sharing)

---

## ⚙️ How It Works

1. You click **Start Speaking** and begin talking.
2. Browser’s Web Speech API transcribes your voice.
3. The transcript is sent to the **`mistralai/mistral-7b-instruct`** model via [OpenRouter](https://openrouter.ai).
4. The model responds with helpful corrections or interview-style prompts.
5. GPT’s response is read aloud using your browser’s text-to-speech engine.
6. The app also calculates:
   - **WPM (Words per Minute)**
   - **Filler Word Score**
   - **Fluency Score**

---

## 🛠️ Tech Stack

| Layer       | Technology |
|-------------|------------|
| Frontend    | React + Vite |
| Styling     | Custom CSS |
| Animation   | Lottie (JSON avatar) |
| Backend     | Node.js + Express |
| AI Model    | `mistralai/mistral-7b-instruct` via OpenRouter |
| Voice Input | Web Speech API |
| Voice Output| Web SpeechSynthesis API |

---

## ✨ Features

- 🎙️ Voice transcription + real-time analysis
- 🤖 AI feedback using Mistral model
- 🗣️ Talking avatar (Lottie animation)
- 🧠 Fluency, WPM, and filler word scores
- 🧑‍💼 Interview Mode toggle
- 📱 Responsive UI for web

---

## 🚫 Why It's Not Deployed Yet

The app uses a private OpenRouter API key to access the Mistral-7B model.  
Since there's no unlimited free tier, deploying it publicly would require key management, server rate-limiting, and potential billing concerns.

Also, speech understanding (especially in noisy environments) can still be improved.

---

## 💻 Local Setup Instructions

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/ai-voice-tutor.git
cd ai-voice-tutor

# 2. Install frontend dependencies
npm install

# 3. Go to backend folder
cd ai-voice-backend
npm install

# 4. Add your OpenRouter API key
# Create a file named `.env` in ai-voice-backend/ with:
OPENROUTER_API_KEY=your_openrouter_key_here

# 5. Start backend server
node server.js

# 6. In a new terminal, start frontend
cd ..
npm run dev
```

🤝 Got feedback or want to contribute? Open an issue, send a PR, or connect with me directly — always open to ideas and collaboration!
