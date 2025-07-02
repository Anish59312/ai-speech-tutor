import React from 'react';

const Toggle = ({ isInterviewMode, toggleInterview }) => (
  <div className="form-check form-switch">
    <input
      className="form-check-input"
      type="checkbox"
      role="switch"
      id="interviewModeSwitch"
      checked={isInterviewMode}
      onChange={toggleInterview}
    />
    <label className="form-check-label" htmlFor="interviewModeSwitch">
      Interview Mode: {isInterviewMode ? 'ON' : 'OFF'}
    </label>
  </div>
);

export default Toggle;
