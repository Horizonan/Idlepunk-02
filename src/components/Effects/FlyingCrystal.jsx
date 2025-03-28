
import React, { useState, useEffect } from 'react';

const crystalSound = new Audio('/sounds/crystal appears.mp3');

export default function FlyingCrystal({ onCollect, onDisappear }) {
  const [nextCrystalTime, setNextCrystalTime] = useState(() => {
    const saved = localStorage.getItem('nextCrystalTime');
    return saved ? parseInt(saved) : Date.now() + (900000 + Math.random() * 900000);
  });

  const [timeLeft, setTimeLeft] = useState(() => {
    const savedSpawnTime = localStorage.getItem('crystalSpawnTime');
    if (!savedSpawnTime) {
      localStorage.setItem('crystalSpawnTime', Date.now().toString());
      return 300;
    }
    const elapsed = Math.floor((Date.now() - parseInt(savedSpawnTime)) / 1000);
    return Math.max(0, 300 - elapsed);
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = Math.max(0, Math.ceil((nextCrystalTime - Date.now()) / 1000));
      setTimeLeft(remaining);
    }, 1000);

    return () => clearInterval(timer);
  }, [nextCrystalTime]);

  useEffect(() => {
    crystalSound.play().catch(err => console.log('Audio play failed:', err));
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          onDisappear();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const [position, setPosition] = useState({ 
    x: Math.random() < 0.5 ? -100 : window.innerWidth + 100,
    y: Math.random() * window.innerHeight 
  });
  const [direction] = useState(position.x < 0 ? 1 : -1);
  
  useEffect(() => {
    const moveInterval = setInterval(() => {
      setPosition(prev => {
        const newX = prev.x + (3 * direction);
        if ((direction > 0 && newX > window.innerWidth + 100) || 
            (direction < 0 && newX < -100)) {
          return {
            x: direction > 0 ? -100 : window.innerWidth + 100,
            y: Math.random() * (window.innerHeight - 100)
          };
        }
        return {
          ...prev,
          x: newX
        };
      });
    }, 16);

    const disappearTimeout = setTimeout(() => {
      onDisappear();
    }, 300000); // 5 minutes max duration

    return () => {
      clearInterval(moveInterval);
      clearTimeout(disappearTimeout);
    };
  }, [direction, onDisappear]);

  const showNextSpawn = !document.querySelector('.crystal-container');

  return (
    <>
      {showNextSpawn && (
        <div className="next-crystal-timer">
          Next crystal in: {Math.floor(timeLeft / 60)}m {timeLeft % 60}s
        </div>
      )}
      <div className="crystal-container">
        <div className="crystal-timer">{Math.floor(timeLeft)}s</div>
        <img
        src="Icons/electroClicker/crystals.png"
        alt="Crystal"
        onClick={() => {
          localStorage.removeItem('crystalSpawnTime');
          onCollect();
        }}
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        width: '64px',
        height: '64px',
        cursor: 'pointer',
        filter: 'drop-shadow(0 0 10px #9400D3)',
        animation: 'float 2s infinite alternate ease-in-out',
        zIndex: 1000,
      }}
    />
    </div>
  );
}

// Add styles
const styles = document.createElement('style');
styles.textContent = `
  .crystal-container {
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 1000;
  }
  
  .crystal-timer {
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    padding: 2px 8px;
    border-radius: 10px;
    font-size: 12px;
    margin-bottom: 5px;
  }
`;
document.head.appendChild(styles);
