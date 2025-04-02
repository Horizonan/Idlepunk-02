
import { useState, useEffect } from 'react';

export default function TrashSurge({ isActive, isTronicsActive, activeClicker }) {
  const [timeLeft, setTimeLeft] = useState(0);
  const [nextSurgeTime, setNextSurgeTime] = useState(() => {
    const saved = localStorage.getItem('nextSurgeTime');
    return saved ? parseInt(saved) : Date.now() + (240000 + Math.random() * 240000);
  });

  useEffect(() => {
    if (isActive) {
      document.body.classList.add('surge-active');

      const baseSurgeDuration = parseInt(localStorage.getItem('surgeDuration') || '5000');
      const isSurgeNodePurchased = localStorage.getItem('electro_surge_node_purchased') === 'true';
      const surgeDurationBonus = isSurgeNodePurchased ? parseInt(localStorage.getItem('surge_duration_bonus') || '5') * 1000 : 0;
      const surgeDuration = baseSurgeDuration + surgeDurationBonus;

      const startTime = Date.now();

      const timer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, Math.ceil((surgeDuration - elapsed) / 1000));
        setTimeLeft(remaining);
        
        if (remaining <= 0) {
          console.log("Surge completed after " + elapsed/1000 + " seconds");
          clearInterval(timer);
          document.body.classList.remove('surge-active');
          const nextTime = Date.now() + (240000 + Math.random() * 240000);
          setNextSurgeTime(nextTime);
          localStorage.setItem('nextSurgeTime', nextTime.toString());
        }
      }, 1000);

      return () => {
        clearInterval(timer);
        document.body.classList.remove('surge-active');
      };
    } else {
      const timer = setInterval(() => {
        const remaining = Math.max(0, Math.ceil((nextSurgeTime - Date.now()) / 1000));
        setTimeLeft(remaining);
        
        if (remaining <= 0 && !isActive) {
          clearInterval(timer);
          const nextTime = Date.now() + (240000 + Math.random() * 240000);
          setNextSurgeTime(nextTime);
          localStorage.setItem('nextSurgeTime', nextTime.toString());
          window.dispatchEvent(new Event('triggerSurge'));
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isActive, nextSurgeTime]);

  if (isActive) {
    return (
      <div className="surge-banner">
        ⚡ TRASH SURGE ACTIVE! ({timeLeft}s remaining)
      </div>
    );
  }
if(!isTronicsActive){
    return localStorage.getItem('hadFirstSurge') === 'true' && !isActive ? (
      <div className="next-surge-timer">
        Next surge in: {Math.floor(timeLeft / 60)}m {timeLeft % 60}s
      </div>
    ) : null;
  }
}
