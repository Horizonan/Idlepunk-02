
import React, { useState, useEffect } from 'react';

export default function SurgeTimer() {
  const [nextSurge, setNextSurge] = useState(null);
  
  useEffect(() => {
    const updateTimer = () => {
      const now = Date.now();
      const nextPossibleSurge = window.lastSurgeTime ? window.lastSurgeTime + 240000 : now + 240000;
      const timeLeft = Math.max(0, nextPossibleSurge - now);
      setNextSurge(timeLeft);
    };

    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!nextSurge) return null;

  const minutes = Math.floor(nextSurge / 60000);
  const seconds = Math.floor((nextSurge % 60000) / 1000);

  return (
    <div className="surge-timer">
      Next possible surge in: {minutes}:{seconds.toString().padStart(2, '0')}
    </div>
  );
}
