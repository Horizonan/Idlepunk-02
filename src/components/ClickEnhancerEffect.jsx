
import React, { useEffect, useState } from 'react';

export default function ClickEnhancerEffect() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const clickerElement = document.getElementById('trashClicker');
    if (clickerElement) {
      const rect = clickerElement.getBoundingClientRect();
      setPosition({
        x: rect.x + rect.width / 2,
        y: rect.y + rect.height / 2
      });
    }

    const moveInterval = setInterval(() => {
      const clickerElement = document.getElementById('trashClicker');
      if (clickerElement) {
        const rect = clickerElement.getBoundingClientRect();
        setPosition({
          x: rect.x + Math.random() * rect.width,
          y: rect.y + Math.random() * rect.height
        });
      }
    }, 2000);

    const clickInterval = setInterval(() => {
      if (Math.random() < 0.3) {
        setIsClicking(true);
        setTimeout(() => setIsClicking(false), 1000);
      }
    }, 3000);

    return () => {
      clearInterval(moveInterval);
      clearInterval(clickInterval);
    };
  }, []);

  return (
    <img
      src="/src/Icons/Upgrades/clickenhancer.png"
      alt="Click Enhancer"
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        width: '32px',
        height: '32px',
        pointerEvents: 'none',
        animation: isClicking ? 'clickAnimation 1s forwards' : 'none',
        zIndex: 1000,
        transition: 'left 2s ease-in-out, top 2s ease-in-out'
      }}
    />
  );
}
