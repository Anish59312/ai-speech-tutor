// utils/speechUtils.js
let currentUtterance = null;
let isSpeaking = false;
let gapBetweenChunks = 50; //in ms

// Split text into sentences and combine into chunks of less than maxLength
const splitTextIntoChunks = (text, maxLength = 200) => {
  const chunks = []; // array of chunks

  if (text.length <= maxLength) return [text];

  const sentences = text
    .split(/(?<=[.!?])\s+/)
    .filter((s) => s.trim().length > 0);

  let currentChunk = "";

  for (const sentence of sentences) {
    const trimmedSentence = sentence.trim();

    if (currentChunk.length + trimmedSentence.length + " " <= maxLength) {
      // check chunk length
      currentChunk += (currentChunk ? " " : "") + trimmedSentence; // combine sentences
    } else {
      //chunk's length exceeds
      if (currentChunk) {
        chunks.push(currentChunk);
      }
      currentChunk = trimmedSentence;
    }
  }

  // Add the last chunk if it exists
  if (currentChunk) {
    chunks.push(currentChunk);
  }

  return chunks;
};

const speakChunk = (chunk, onEnd, isLastChunk) => {
  return new Promise((resolve) => {
    const utterance = new SpeechSynthesisUtterance(chunk);
    utterance.lang = "en-US";
    utterance.rate = 1; // Slightly slower for better clarity

    utterance.onend = () => {
      currentUtterance = null;
      if (isLastChunk && onEnd) {
        onEnd();
      }
      resolve();
    };

    utterance.onerror = (e) => {
      console.error("Speech synthesis error:", e);
      currentUtterance = null;
      if (isLastChunk && onEnd) {
        onEnd();
      }
      resolve();
    };

    currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  });
};

export const speakText = async (text, onEnd) => {
  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel(); // Stop any existing speech
  }

  if (isSpeaking) {
    return; // Prevent multiple concurrent speech operations
  }

  isSpeaking = true;

  try {
    const chunks = splitTextIntoChunks(text.trim());
    console.log(`Speaking ${chunks.length} chunks:`, chunks);

    for (let i = 0; i < chunks.length; i++) {
      const isLastChunk = i === chunks.length - 1;
      await speakChunk(chunks[i], onEnd, isLastChunk);

      // Small delay between chunks to ensure smooth transition
      if (!isLastChunk) {
        await new Promise((resolve) => setTimeout(resolve, gapBetweenChunks));
      }
    }
  } catch (error) {
    console.error("Error in speakText:", error);
    if (onEnd) onEnd();
  } finally {
    isSpeaking = false;
  }
};

export const stopSpeaking = () => {
  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
  }
  currentUtterance = null;
  isSpeaking = false;
};

export const startSpeechRecognition = (onResult, onEnd) => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Speech recognition is not supported in this browser.");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  window.speechRecognition = recognition;

  recognition.onresult = (event) => {
    const transcript = event.results?.[0]?.[0]?.transcript || "";
    console.log("Transcript:", transcript);
    onResult(transcript);
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event);
    onResult(""); // empty so it triggers error message in App.jsx
  };

  recognition.onend = () => {
    console.log("Speech recognition ended.");
    onEnd();
  };

  recognition.start();
};
