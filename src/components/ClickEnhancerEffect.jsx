
import React, { useEffect, useState } from 'react';

export default function ClickEnhancerEffect({ level }) {
  const [positions, setPositions] = useState(Array(level).fill().map(() => ({ x: 0, y: 0 })));
  const [isClicking, setIsClicking] = useState(Array(level).fill(false));

  useEffect(() => {
    const clickerElement = document.getElementById('trashClicker');
    if (clickerElement) {
      const rect = clickerElement.getBoundingClientRect();
      const centerX = rect.x + (rect.width / 2) - 16; // Subtract half of icon width (32px/2)
      const centerY = rect.y + (rect.height / 2) - 16; // Subtract half of icon height (32px/2)
      setPosition({
        x: centerX,
        y: centerY
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
    <>
      {positions.map((pos, index) => (
        <img
          key={index}
          src="/src/Icons/Upgrades/clickenhancer.png"
          alt={`Click Enhancer ${index + 1}`}
          style={{
            position: 'fixed',
            left: pos.x,
            top: pos.y,
            width: '32px',
            height: '32px',
            pointerEvents: 'none',
            animation: isClicking[index] ? 'clickAnimation 1s forwards' : 'none',
            zIndex: 1000,
            transition: 'left 2s ease-in-out, top 2s ease-in-out'
          }}
        />
      ))}
    </>
  );
}
