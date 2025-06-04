
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
            targetX: Math.random() * (window.innerWidth - 64),
            targetY: Math.random() * (window.innerHeight - 64)
          };
        }

        // Move slowly towards target
        return {
          ...prev,
          x: prev.x + (prev.targetX - prev.x) * 0.008,
          y: prev.y + (prev.targetY - prev.y) * 0.008 + Math.sin(Date.now() / 1000) * 0.3
        };
      });
    }, 100);

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
        left: 0,
        top: 0,
        width: '64px',
        height: '64px',
        pointerEvents: 'none',
        zIndex: 1000,
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: 'transform 0.5s ease-out',
        filter: 'drop-shadow(0 0 0.1px #9400D3)',
        willChange: 'transform'
      }}
    />
  );
}
