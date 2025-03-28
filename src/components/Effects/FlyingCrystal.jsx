
import React, { useState, useEffect } from 'react';

export default function FlyingCrystal({ onCollect, onDisappear }) {
  const [position, setPosition] = useState({ x: -100, y: Math.random() * window.innerHeight });

  useEffect(() => {
    const moveInterval = setInterval(() => {
      setPosition(prev => ({
        ...prev,
        x: prev.x + 2
      }));
    }, 16);

    const disappearTimeout = setTimeout(() => {
      onDisappear();
    }, 300000); // 5 minutes

    return () => {
      clearInterval(moveInterval);
      clearTimeout(disappearTimeout);
    };
  }, []);

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
