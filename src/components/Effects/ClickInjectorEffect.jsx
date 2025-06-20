
import React, { useState, useEffect } from 'react';
import './ClickInjectorEffect.css';

export default function ClickInjectorEffect() {
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const handleClickInjector = (event) => {
      const duration = event.detail.duration; // Duration in milliseconds
      setIsActive(true);
      setTimeLeft(Math.ceil(duration / 1000)); // Convert to seconds

      const startTime = Date.now();
      const timer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, Math.ceil((duration - elapsed) / 1000));
        setTimeLeft(remaining);
        
        if (remaining <= 0) {
          setIsActive(false);
          clearInterval(timer);
        }
      }, 1000);

      return () => clearInterval(timer);
    };

    window.addEventListener('triggerClickInjector', handleClickInjector);
    return () => window.removeEventListener('triggerClickInjector', handleClickInjector);
  }, []);

  if (!isActive) return null;

  return (
    <div className="click-injector-effect">
      <div className="click-injector-banner">
        💉 CLICK INJECTOR ACTIVE! +50% Click Power ({timeLeft}s remaining)
      </div>
    </div>
  );
}
