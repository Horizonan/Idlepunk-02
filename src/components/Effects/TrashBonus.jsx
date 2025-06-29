import React, { useState, useEffect } from 'react';
import { getTrashPickupDuration } from '../../utils/trashUtils';

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

    const duration = getTrashPickupDuration() * 1000; // Convert to milliseconds
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
      src="/Icons/TrashBonus.svg"
      alt="Trash Bonus"
      onClick={onCollect}
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        width: '64px',
        height: '64px',
        cursor: 'pointer',
        filter: 'drop-shadow(0 0 10px #00B7EB)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: 'translateZ(0)',
        willChange: 'transform',
        zIndex: 9999,
      }}
    />
  );
}