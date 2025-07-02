import React, { useState } from 'react';
import Avatar from './components/Avatar';
import Toggle from './components/Toggle';
import TranscriptBox from './components/TranscriptBox';
import SpeechControls from './components/SpeechControls';
import { speakText, startSpeechRecognition } from './utils/speechUtils';
import axios from 'axios';
import './App.css';

function App() {
  const [isListening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSpeaking, setSpeaking] = useState(false);
  const [interviewMode, setInterviewMode] = useState(false);

  const [fillerScore, setFillerScore] = useState(null);
  const [wpm, setWPM] = useState(null);
  const [fluencyScore, setFluencyScore] = useState(null);

  // 👇 Helper function: Filler words list
  const fillerWords = ['um', 'uh', 'like', 'you know', 'so', 'actually', 'basically', 'literally'];

  const handleStart = () => {
    setListening(true);
    startSpeechRecognition(
      (text) => {
        setTranscript(text);
        if (text && text.trim() !== '') {
          analyzeSpeech(text);
          getGPTFeedback(text);
        } else {
          speakText("Sorry, I couldn't catch that.");
        }
      },
      () => setListening(false)
    );
  };

  const handleStop = () => {
    window.speechRecognition?.stop();
    setListening(false);
  };

  const getGPTFeedback = async (text) => {
    try {
      setSpeaking(true);
      const res = await axios.post('http://localhost:5000/gpt-feedback', {
        input: text,
        interviewMode,
      });
      const feedback = res.data.reply;
      speakText(feedback, () => {
        setSpeaking(false); // ❗ Only stop when GPT finishes speaking
      });
    } catch (err) {
      speakText("Sorry, I couldn't understand that.", () => setSpeaking(false));
    }
  };

  // 👇 Calculates filler score, WPM, and fluency
  const analyzeSpeech = (text) => {
    const words = text.trim().split(/\s+/);
    const wordCount = words.length;
    const durationSeconds = 6; // estimate (or customize if using timer)
    
    // Filler word count
    const fillerCount = words.filter((w) =>
      fillerWords.includes(w.toLowerCase())
    ).length;

    // WPM calculation
    const wpm = ((wordCount / durationSeconds) * 60).toFixed(1);
    setWPM(wpm);

    // Filler score (100 - penalty for each filler)
    const fillerPenalty = Math.min((fillerCount / wordCount) * 100, 100);
    const fillerScore = (100 - fillerPenalty).toFixed(1);
    setFillerScore(fillerScore);

    // Fluency: combination (you can make it more complex)
    const fluency = ((Number(fillerScore) + Math.min((wpm / 150) * 100, 100)) / 2).toFixed(1);
    setFluencyScore(fluency);
  };

  return (
    <div className="app-container">
      <h1 className="title">AI Speech Tutor</h1>
      <Avatar speaking={isSpeaking} />
      <Toggle
        isInterviewMode={interviewMode}
        toggleInterview={() => setInterviewMode(!interviewMode)}
      />
      <SpeechControls
        isListening={isListening}
        onStart={handleStart}
        onStop={handleStop}
      />
      <TranscriptBox text={transcript} />
      
      {transcript && (
        <div className="score-container">
          <p>Filler Word Score: {fillerScore}%</p>
          <p>Words per Minute (WPM): {wpm}</p>
          <p>Fluency Score: {fluencyScore}%</p>
        </div>
      )}
    </div>
  );
}

export default App;
