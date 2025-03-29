
import { useState, useEffect } from 'react';
import './TronicsSurge.css';

export default function TronicsSurge({ isActive, activeClicker }) {
  const [timeLeft, setTimeLeft] = useState(0);
  const [nextSurgeTime, setNextSurgeTime] = useState(() => {
    const saved = localStorage.getItem('nextTronicsSurgeTime');
    return saved ? parseInt(saved) : Date.now() + (600000 + Math.random() * 900000);
  });
  const [capacitors, setCapacitors] = useState([]);

  useEffect(() => {
    if (isActive) {
      document.body.classList.add('tronics-surge-active');
      const surgeDuration = 5000; // 5 seconds
      const endTime = Date.now() + surgeDuration;
      
      // Spawn capacitors every second
      const capacitorTimer = setInterval(() => {
        if (Math.random() < 0.1) { // 10% chance
          const newCapacitor = {
            id: Date.now(),
            x: Math.random() * (window.innerWidth - 50),
            y: Math.random() * (window.innerHeight - 50)
          };
          setCapacitors(prev => [...prev, newCapacitor]);
        }
      }, 1000);

      const timer = setInterval(() => {
        const remaining = Math.max(0, Math.ceil((endTime - Date.now()) / 1000));
        setTimeLeft(remaining);
        
        if (remaining === 0) {
          clearInterval(timer);
          clearInterval(capacitorTimer);
          const nextTime = Date.now() + (600000 + Math.random() * 900000);
          setNextSurgeTime(nextTime);0
          localStorage.setItem('nextTronicsSurgeTime', nextTime);
          document.body.classList.remove('tronics-surge-active');
          setCapacitors([]);
        }
      }, 100);

      return () => {
        clearInterval(timer);
        clearInterval(capacitorTimer);
        document.body.classList.remove('tronics-surge-active');
      };
    } else {
      document.body.classList.remove('tronics-surge-active');
      
      const timer = setInterval(() => {
        const remaining = Math.max(0, Math.ceil((nextSurgeTime - Date.now()) / 1000));
        setTimeLeft(remaining);
        
        if (remaining <= 0 && !isActive) {
          window.dispatchEvent(new CustomEvent('triggerTronicsSurge'));
          clearInterval(timer);
          const nextTime = Date.now() + (600000 + Math.random() * 900000);
          setNextSurgeTime(nextTime);
          localStorage.setItem('nextTronicsSurgeTime', nextTime.toString());
          window.dispatchEvent(new Event('triggerTronicsSurge'));
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isActive, nextSurgeTime]);

  const handleCapacitorClick = (id) => {
    setCapacitors(prev => prev.filter(cap => cap.id !== id));
    const currentCount = parseInt(localStorage.getItem('capacitors') || '0');
    localStorage.setItem('capacitors', (currentCount + 1).toString());
  };

  if (isActive) {
    return (
      <>
        <div className="tronics-surge-banner">
          ⚡ TRONICS SURGE ACTIVE! ({timeLeft}s remaining)
        </div>
        {capacitors.map(cap => (
          <div
            key={cap.id}
            className="capacitor"
            style={{ left: cap.x + 'px', top: cap.y + 'px' }}
            onClick={() => handleCapacitorClick(cap.id)}
          >
            <img src="/Icons/capacitor.png" alt="Capacitor" />
          </div>
        ))}
      </>
    );
  }

  const isTronicsSurgeUnlocked = localStorage.getItem('electro_surge_node_purchased') === 'true';
  
  if (!isTronicsSurgeUnlocked) {
    return null;
  }

  return activeClicker === 'electronics' ? (
    <div className="next-surge-timer-tronics">
      Next Tronics surge in: {Math.floor(timeLeft / 60)}m {timeLeft % 60}s
    </div>
  ) : null;
}
