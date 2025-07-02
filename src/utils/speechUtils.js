// utils/speechUtils.js
let currentUtterance = null;

export const speakText = (text, onEnd) => {
  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel(); // Stop any existing speech
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';

  utterance.onend = () => {
    currentUtterance = null;
    if (onEnd) onEnd();
  };

  utterance.onerror = (e) => {
    console.error("Speech synthesis error:", e);
    if (onEnd) onEnd();
  };

  currentUtterance = utterance;
  window.speechSynthesis.speak(utterance);
};


export const startSpeechRecognition = (onResult, onEnd) => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Speech recognition is not supported in this browser.");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  window.speechRecognition = recognition;

  recognition.onresult = (event) => {
    const transcript = event.results?.[0]?.[0]?.transcript || '';
    console.log("Transcript:", transcript);
    onResult(transcript);
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event);
    onResult(''); // empty so it triggers error message in App.jsx
  };

  recognition.onend = () => {
    console.log("Speech recognition ended.");
    onEnd();
  };

  recognition.start();
};
