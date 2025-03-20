
import React, { useState, useEffect } from 'react';

export default function SurgeTimer({ visible }) {
  const [nextSurge, setNextSurge] = useState(null);
  const [nextSurgeTime, setNextSurgeTime] = useState(null);
  
  useEffect(() => {
    // Calculate next surge time whenever lastSurgeTime changes
    if (window.lastSurgeTime) {
      const minDelay = 240000; // 4 minutes
      const maxDelay = 480000; // 8 minutes
      const randomDelay = minDelay + Math.random() * (maxDelay - minDelay);
      setNextSurgeTime(window.lastSurgeTime + randomDelay);
    }
  }, [window.lastSurgeTime]);

  useEffect(() => {
    const updateTimer = () => {
      if (!nextSurgeTime) return;
      
      const now = Date.now();
      const timeLeft = Math.max(0, nextSurgeTime - now);
      setNextSurge(Math.floor(timeLeft / 1000));
    };

    const timer = setInterval(updateTimer, 1000);
    updateTimer(); // Initial update
    
    return () => clearInterval(timer);
  }, [nextSurgeTime]);

  if (!visible || nextSurge === null) return null;

  const minutes = Math.floor(nextSurge / 60);
  const seconds = nextSurge % 60;

  return (
    <div className="surge-timer">
      Next surge in: {minutes}:{seconds.toString().padStart(2, '0')}
    </div>
  );
}
