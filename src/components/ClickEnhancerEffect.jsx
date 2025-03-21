
import React, { useEffect, useState } from 'react';

export default function ClickEnhancerEffect({ level = 1 }) {
  const maxEnhancers = Number(localStorage.getItem('maxClickEnhancers')) || 3;
  const numEnhancers = Math.min(level || 1, maxEnhancers);
  const [positions, setPositions] = useState(Array(numEnhancers).fill().map(() => ({ x: 0, y: 0 })));
  const [isClicking, setIsClicking] = useState(Array(numEnhancers).fill(false));

  useEffect(() => {
    const clickerElement = document.getElementById('trashClicker');
    if (clickerElement) {
      const rect = clickerElement.getBoundingClientRect();
      const centerX = rect.x + (rect.width / 2) - 16;
      const centerY = rect.y + (rect.height / 2) - 16;
      
      setPositions(Array(numEnhancers).fill().map(() => ({
        x: centerX,
        y: centerY
      })));
    }

    const moveInterval = setInterval(() => {
      const clickerElement = document.getElementById('trashClicker');
      if (clickerElement) {
        const rect = clickerElement.getBoundingClientRect();
        setPositions(Array(numEnhancers).fill().map(() => ({
          x: rect.x + Math.random() * rect.width,
          y: rect.y + Math.random() * rect.height
        })));
      }
    }, 2000);

    const clickInterval = setInterval(() => {
      setIsClicking(prev => prev.map(() => Math.random() < 0.3));
      setTimeout(() => setIsClicking(prev => prev.map(() => false)), 1000);
    }, 3000);

    return () => {
      clearInterval(moveInterval);
      clearInterval(clickInterval);
    };
  }, [numEnhancers]);

  return (
    <>
      {positions.map((pos, index) => (
        <img
          key={index}
          src="Icons/Upgrades/clickenhancer.png"
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
