import React from 'react';

const SpeechControls = ({ isListening, onStart, onStop }) => (
  <div className="speech-buttons">
    {!isListening ? (
      <button className="btn btn-primary" onClick={onStart}>🎙️ Start Speaking</button>
    ) : (
      <button className="btn btn-danger" onClick={onStop}>🛑 Stop</button>
    )}
  </div>
);

export default SpeechControls;
