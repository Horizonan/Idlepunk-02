
import React, { useState, useEffect } from 'react';

export default function SurgeTimer({ visible }) {
  const [nextSurge, setNextSurge] = useState(null);
  
  useEffect(() => {
    const updateTimer = () => {
      const now = Date.now();
      const lastSurge = window.lastSurgeTime || now;
      const baseDelay = 240000; // 4 minutes
      const randomDelay = Math.random() * 240000; // Up to 4 more minutes
      const nextSurgeTime = lastSurge + baseDelay + randomDelay;
      const timeLeft = Math.max(0, nextSurgeTime - now);
      const seconds = Math.floor(timeLeft / 1000);
      setNextSurge(seconds);
    };

    const timer = setInterval(updateTimer, 1000);
    updateTimer(); // Initial update
    
    return () => clearInterval(timer);
  }, []);

  if (!visible || nextSurge === null) return null;

  const minutes = Math.floor(nextSurge / 60);
  const seconds = nextSurge % 60;

  return (
    <div className="surge-timer">
      Next surge in: {minutes}:{seconds.toString().padStart(2, '0')}
    </div>
  );
}
