
import React, { useEffect, useState } from 'react';

export default function AutoClickerEffect({ autoClicks = 0 }) {
  const [cursors, setCursors] = useState([]);

  useEffect(() => {
    const numCursors = Math.min(autoClicks, 5); // Cap visible cursors at 5
    const clickerElement = document.getElementById('trashClicker');
    
    if (!clickerElement) return;

    const rect = clickerElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const radius = Math.min(rect.width, rect.height) / 2.5;

    // Create cursor positions in a circle around the clicker
    const newCursors = Array(numCursors).fill().map((_, i) => {
      const angle = (i / numCursors) * 2 * Math.PI;
      return {
        id: i,
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
        clicking: false,
        rotation: Math.random() * 360
      };
    });

    setCursors(newCursors);

    // Animate clicks
    const clickInterval = setInterval(() => {
      setCursors(prev => prev.map(cursor => ({
        ...cursor,
        clicking: Math.random() < 0.3
      })));
    }, 1000);

    return () => clearInterval(clickInterval);
  }, [autoClicks]);

  return (
    <>
      {cursors.map(cursor => (
        <div
          key={cursor.id}
          className={`auto-clicker ${cursor.clicking ? 'clicking' : ''}`}
          onClick={() => {
            console.log('Dispatching clickedAutoClicker event');
            localStorage.setItem('clickedAutoClicker', 'true');
            window.dispatchEvent(new CustomEvent('clickedAutoClicker'));
          }}
          style={{
            left: cursor.x,
            top: cursor.y,
            backgroundImage: cursor.id % 2 === 0 ? 'url(/Icons/Upgrades/autoClickerV1.png)' : 'url(/Icons/Upgrades/clickerV2.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            animation: `rotate ${cursor.id % 2 === 0 ? '4s' : '3s'} infinite linear`,
            transform: `scale(${cursor.id % 2 === 0 ? '1' : '1.2'})`,
            filter: cursor.id % 2 === 0 ? 'none' : 'drop-shadow(0 0 5px #00ff00)'
          }}
        />
      ))}
    </>
  );
}
