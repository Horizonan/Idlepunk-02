
import React, { useState, useEffect } from 'react';

export default function SurgeTimer({ visible }) {
  const [nextSurge, setNextSurge] = useState(null);
  
  useEffect(() => {
    const updateTimer = () => {
      const now = Date.now();
      const nextPossibleSurge = window.lastSurgeTime ? window.lastSurgeTime + 240000 : now + 240000;
      const timeLeft = Math.max(0, nextPossibleSurge - now);
      setNextSurge(Math.floor(timeLeft / 1000));
    };

    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!visible || !nextSurge) return null;

  return (
    <div className="surge-timer">
      Next possible surge in: {Math.floor(nextSurge / 60)}:{String(nextSurge % 60).padStart(2, '0')}
    </div>
  );
}
