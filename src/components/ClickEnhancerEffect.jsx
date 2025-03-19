
import React, { useEffect, useState } from 'react';

export default function ClickEnhancerEffect() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.1) { // 10% chance to appear
        const clickerElement = document.getElementById('trashClicker');
        if (clickerElement) {
          const rect = clickerElement.getBoundingClientRect();
          setPosition({
            x: rect.x + Math.random() * rect.width,
            y: rect.y + Math.random() * rect.height
          });
          setIsVisible(true);
          setTimeout(() => setIsVisible(false), 1000);
        }
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

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
        animation: 'clickAnimation 1s forwards'
      }}
    />
  );
}
