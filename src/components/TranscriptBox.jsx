import React from 'react';

const TranscriptBox = ({ text }) => {
  return <div className="transcript-box">{text || 'Start speaking to see transcript...'}</div>;
};

export default TranscriptBox;
