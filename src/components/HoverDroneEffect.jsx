
import React, { useState, useEffect } from 'react';

export default function HoverDroneEffect() {
  const [position, setPosition] = useState({
    x: Math.random() * (window.innerWidth - 32),
    y: Math.random() * (window.innerHeight - 32)
  });

  useEffect(() => {
    const moveInterval = setInterval(() => {
      setPosition(prev => ({
        x: Math.max(0, Math.min(window.innerWidth - 32, prev.x + (Math.random() - 0.5) * 30)),
        y: Math.max(0, Math.min(window.innerHeight - 32, prev.y + (Math.random() - 0.5) * 30))
      }));
    }, 50);

    return () => clearInterval(moveInterval);
  }, []);

  return (
    <img
      src="/Icons/Upgrades/hover-drone.png"
      alt="Hover Drone"
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        width: '32px',
        height: '32px',
        pointerEvents: 'none',
        zIndex: 1000,
        transition: 'left 0.2s ease-out, top 0.2s ease-out',
        filter: 'drop-shadow(0 0 5px #00ffff)'
      }}
    />
  );
}
