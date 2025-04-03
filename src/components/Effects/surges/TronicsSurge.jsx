
import { useState, useEffect } from 'react';
import './TronicsSurge.css';

export default function TronicsSurge({ isActive, activeClicker, setCraftingInventory }) {
  const [timeLeft, setTimeLeft] = useState(5);
  const [capacitors, setCapacitors] = useState([]);

  useEffect(() => {
    let audio;
    if (isActive) {
      console.log("Tronics Surge Active");
      document.body.classList.add('tronics-surge-active');
      audio = new Audio('/public/sounds/tronics_surge_sound.mp3');
      
      audio.play();
      
      const surgeDuration = parseInt(localStorage.getItem('surge_duration_bonus') || '5') * 1000;
      const endTime = Date.now() + surgeDuration;

      // Spawn capacitors every second
      const capacitorTimer = setInterval(() => {
        if (Math.random() < 0.1) {
          const newCapacitor = {
            id: Date.now(),
            x: Math.random() * (window.innerWidth - 50),
            y: Math.random() * (window.innerHeight - 50)
          };
          setCraftingInventory(prev => ({
              ...prev,
              'Capacitor': (prev['Capacitor'] || 0) + 1
            }));
        }
      }, 1000);

      const timer = setInterval(() => {
        const remaining = Math.max(0, Math.ceil((endTime - Date.now()) / 1000));
        setTimeLeft(remaining);
        
        if (remaining === 0) {
          
          clearInterval(timer);
          clearInterval(capacitorTimer);
          document.body.classList.remove('tronics-surge-active');
          window.dispatchEvent(new Event('endTronicsSurge'));
        }
      }, 1000);

      return () => {
        clearInterval(timer);
        clearInterval(capacitorTimer);
        document.body.classList.remove('tronics-surge-active');
        if(audio) {
          audio.pause();
          audio.currentTime = 0;
        }
      };
    }
  }, [isActive]);

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

  return null;
}