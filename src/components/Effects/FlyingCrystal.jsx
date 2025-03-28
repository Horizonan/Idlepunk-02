
import React, { useState, useEffect } from 'react';

export default function FlyingCrystal({ onCollect, onDisappear }) {
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

  return (
    <img
      src="Icons/electroClicker/crystals.png"
      alt="Crystal"
      onClick={onCollect}
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
  );
}
