
import { useState, useEffect } from 'react';

export default function TrashSurge({ isActive }) {
  const [timeLeft, setTimeLeft] = useState(0);
  const [activeClicker, setActiveClicker] = useState('trash');
  const [nextSurgeTime, setNextSurgeTime] = useState(() => {
    const saved = localStorage.getItem('nextSurgeTime');
    return saved ? parseInt(saved) : Date.now() + (240000 + Math.random() * 240000);
  });

  useEffect(() => {
    const updateActiveClicker = () => {
      const activeElement = document.querySelector('.clicker-select.active');
      setActiveClicker(activeElement?.textContent.toLowerCase().includes('trash') ? 'trash' : 'tronics');
    };
    
    updateActiveClicker();
    document.addEventListener('click', updateActiveClicker);
    
    return () => document.removeEventListener('click', updateActiveClicker);
  }, []);

  useEffect(() => {
    if (isActive) {
      document.body.classList.add('surge-active');
      const surgeDuration = localStorage.getItem('surgeDuration') || 5000;
      const endTime = Date.now() + surgeDuration;
      
      const timer = setInterval(() => {
        const remaining = Math.max(0, Math.ceil((endTime - Date.now()) / 1000));
        setTimeLeft(remaining);
        
        if (remaining === 0) {
          clearInterval(timer);
          const nextTime = Date.now() + (240000 + Math.random() * 240000);
          setNextSurgeTime(nextTime);
          localStorage.setItem('nextSurgeTime', nextTime);
        }
      }, 100);

      return () => {
        clearInterval(timer);
        document.body.classList.remove('surge-active');
      };
    } else {
      document.body.classList.remove('surge-active');
      
      const timer = setInterval(() => {
        const remaining = Math.max(0, Math.ceil((nextSurgeTime - Date.now()) / 1000));
        setTimeLeft(remaining);
        
        if (remaining === 0) {
          window.dispatchEvent(new CustomEvent('triggerSurge'));
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

  return localStorage.getItem('hadFirstSurge') === 'true' && activeClicker === 'trash' ? (
    <div className="next-surge-timer">
      Next surge in: {Math.floor(timeLeft / 60)}m {timeLeft % 60}s
    </div>
  ) : null;
}
