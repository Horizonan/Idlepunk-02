import React, { useState, useEffect } from 'react';

export default function TrashBonus({ onCollect, onDisappear, passiveIncome }) {
  const [position, setPosition] = useState({ 
    x: Math.random() * (window.innerWidth - 64),
    y: Math.random() * (window.innerHeight - 64)
  });

  useEffect(() => {
    const moveInterval = setInterval(() => {
      setPosition(prev => ({
        x: Math.max(0, Math.min(window.innerWidth - 64, prev.x + (Math.random() - 0.5) * 50)),
        y: Math.max(0, Math.min(window.innerHeight - 64, prev.y + (Math.random() - 0.5) * 50))
      }));
    }, 50);

    const hasHoverDrone = JSON.parse(localStorage.getItem('craftingInventory') || '{}')['Hover Drone'];
    const duration = hasHoverDrone ? 20000 : 15000;
    const disappearTimeout = setTimeout(() => {
      onDisappear();
    }, duration);

    return () => {
      clearInterval(moveInterval);
      clearTimeout(disappearTimeout);
    };
  }, []);

  return (
    <img
      src="/Icons/TrashButtonBig.png"
      alt="Trash Bonus"
      onClick={onCollect}
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        width: '64px',
        height: '64px',
        cursor: 'pointer',
        filter: 'drop-shadow(0 0 10px #00FF00)',
        transition: 'left 0.2s ease-out, top 0.2s ease-out',
        animation: 'float 2s infinite alternate ease-in-out',
        zIndex: 1000,
      }}
    />
  );
}