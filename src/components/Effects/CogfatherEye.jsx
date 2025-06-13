
import React, { useState, useEffect } from 'react';
import './CogfatherEye.css';

export default function CogfatherEye({ forceShow = false, onDisappear }) {
  const [isVisible, setIsVisible] = useState(false);
  const [eyePosition, setEyePosition] = useState({ x: 50, y: 30 });
  const [lookDirection, setLookDirection] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);

  const isNightTime = () => {
    const hour = new Date().getHours();
    return hour >= 18 || hour < 6; // 6 PM to 6 AM
  };

  const shouldShow = forceShow || isNightTime();

  useEffect(() => {
    if (!shouldShow) {
      setIsVisible(false);
      return;
    }

    // Spawn the eye periodically
    const spawnInterval = setInterval(() => {
      if (Math.random() < 0.3) { // 30% chance every interval
        setIsVisible(true);
        
        // Random position on screen
        setEyePosition({
          x: Math.random() * 80 + 10, // 10% to 90% of screen width
          y: Math.random() * 60 + 20  // 20% to 80% of screen height
        });

        // Eye stays visible for 8-15 seconds
        const visibleDuration = 8000 + Math.random() * 7000;
        setTimeout(() => {
          setIsVisible(false);
          if (onDisappear) onDisappear();
        }, visibleDuration);
      }
    }, 30000 + Math.random() * 60000); // Every 30-90 seconds

    return () => clearInterval(spawnInterval);
  }, [shouldShow, onDisappear]);

  useEffect(() => {
    if (!isVisible) return;

    // Eye looking around animation
    const lookInterval = setInterval(() => {
      // Random look direction
      setLookDirection({
        x: (Math.random() - 0.5) * 20, // -10 to 10 pixels
        y: (Math.random() - 0.5) * 20  // -10 to 10 pixels
      });
    }, 2000 + Math.random() * 3000); // Every 2-5 seconds

    // Blinking animation
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 3000 + Math.random() * 4000); // Every 3-7 seconds

    return () => {
      clearInterval(lookInterval);
      clearInterval(blinkInterval);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div 
      className="cogfather-eye-container"
      style={{
        left: `${eyePosition.x}%`,
        top: `${eyePosition.y}%`
      }}
    >
      <div className="cogfather-eye-glow"></div>
      <div className={`cogfather-eye ${isBlinking ? 'blinking' : ''}`}>
        <div 
          className="eye-pupil"
          style={{
            transform: `translate(${lookDirection.x}px, ${lookDirection.y}px)`
          }}
        >
          <div className="pupil-shine"></div>
        </div>
        {!isBlinking && (
          <>
            <div className="eye-reflection"></div>
            <div className="eye-veins"></div>
          </>
        )}
      </div>
      <div className="eye-shadow"></div>
    </div>
  );
}
