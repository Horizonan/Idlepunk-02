
import React, { useState, useEffect } from 'react';

export default function HoverDroneEffect() {
  const [position, setPosition] = useState({
    x: Math.random() * (window.innerWidth - 32),
    y: Math.random() * (window.innerHeight - 32),
    targetX: 0,
    targetY: 0
  });

  useEffect(() => {
    // Set initial target
    setPosition(prev => ({
      ...prev,
      targetX: Math.random() * (window.innerWidth - 32),
      targetY: Math.random() * (window.innerHeight - 32)
    }));

    const moveInterval = setInterval(() => {
      setPosition(prev => {
        // If close to target, set new target
        if (Math.abs(prev.x - prev.targetX) < 5 && Math.abs(prev.y - prev.targetY) < 5) {
          return {
            ...prev,
            targetX: Math.random() * (window.innerWidth - 32),
            targetY: Math.random() * (window.innerHeight - 32)
          };
        }

        // Move slowly towards target
        return {
          ...prev,
          x: prev.x + (prev.targetX - prev.x) * 0.01,
          y: prev.y + (prev.targetY - prev.y) * 0.01 + Math.sin(Date.now() / 500) * 0.5
        };
      });
    }, 50);

    return () => clearInterval(moveInterval);
  }, []);

  const showHoverDrone = localStorage.getItem('showHoverDrone') !== 'false';
  
  if (!showHoverDrone) return null;

  return (
    <img
      src="/Icons/Upgrades/hover-drone.svg"
      alt="Hover Drone"
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        width: '64px',
        height: '64px',
        pointerEvents: 'none',
        zIndex: 1000,
        transition: 'left 0.5s ease-out, top 0.5s ease-out',
        filter: 'drop-shadow(0 0 0.1px #00ffff)'
      }}
    />
  );
}
