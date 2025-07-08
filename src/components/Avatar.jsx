import React, { useEffect, useRef } from 'react';
import Lottie from 'react-lottie-player';
import animationData from '../assets/talking-avatar.json';

const Avatar = ({ speaking }) => {
  const lottieRef = useRef(null);

  useEffect(() => {
    if (speaking) {
      lottieRef.current?.play();
    } else {
      lottieRef.current?.stop();
    }
  }, [speaking]);

  return (
    <div className="avatar-container">
      <Lottie
        ref={lottieRef}
        loop
        animationData={animationData}
        style={{ width: 250, height: 150 }}
      />
    </div>
  );
};

export default Avatar;
