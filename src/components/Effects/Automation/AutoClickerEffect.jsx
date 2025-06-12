
import React, { useEffect, useState } from 'react';

export default function AutoClickerEffect({ autoClicks = 0 }) {
  const showAutoclickers = localStorage.getItem('showAutoclickers') !== 'false';
  if (!showAutoclickers) return null;
  const [cursors, setCursors] = useState([]);
  const achievementUnlocked = localStorage.getItem('clickedAutoClicker') === 'true';

  const handleAutoClickerClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Only allow clicking if achievement hasn't been unlocked yet
    if (!achievementUnlocked) {
      localStorage.setItem('clickedAutoClicker', 'true');
      window.dispatchEvent(new CustomEvent('validateAchievements'));
      console.log('AutoClicker clicked! Achievement unlocked.');
    }
  };

  useEffect(() => {
    const numCursors = Math.min(autoClicks, 5); // Cap visible cursors at 5
    if (numCursors === 0) return;
    
    const updatePositions = () => {
      const clickerElement = document.getElementById('trashClicker');
      if (!clickerElement) return;

      const rect = clickerElement.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const radius = Math.min(rect.width, rect.height) / 2 + 50;

      // Create cursor positions in a circle around the clicker
      const newCursors = Array(numCursors).fill().map((_, i) => {
        const angle = (i / numCursors) * 2 * Math.PI;
        return {
          id: i,
          x: centerX + radius * Math.cos(angle) - 20, // Offset for cursor size
          y: centerY + radius * Math.sin(angle) - 20,
          clicking: false,
          rotation: Math.random() * 360
        };
      });

      setCursors(newCursors);
    };

    updatePositions();
    
    // Update positions on window resize/scroll
    const handleResize = () => updatePositions();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleResize);

    // Animate clicks
    const clickInterval = setInterval(() => {
      setCursors(prev => prev.map(cursor => ({
        ...cursor,
        clicking: Math.random() < 0.3
      })));
    }, 1000);

    return () => {
      clearInterval(clickInterval);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleResize);
    };
  }, [autoClicks]);

  return (
    <>
      {cursors.map(cursor => (
        <div
          key={cursor.id}
          className={`auto-clicker ${cursor.clicking ? 'clicking' : ''} ${achievementUnlocked ? 'achievement-unlocked' : 'clickable'}`}
          onClick={achievementUnlocked ? undefined : handleAutoClickerClick}
          style={{
            left: `${cursor.x}px`,
            top: `${cursor.y}px`,
            backgroundImage: cursor.id % 2 === 0 ? 'url(/Icons/Upgrades/autoClickerV1.svg)' : 'url(/Icons/Upgrades/clickerV2.svg)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            animation: `rotate ${cursor.id % 2 === 0 ? '4s' : '3s'} infinite linear`,
            transform: `scale(${cursor.id % 2 === 0 ? '1.1' : '1.4'}) ${cursor.clicking ? 'scale(0.9)' : ''}`,
            filter: cursor.id % 2 === 0 ? 'none' : 'drop-shadow(0 0 1px #00B7EB)',
            cursor: achievementUnlocked ? 'default' : 'pointer',
            pointerEvents: achievementUnlocked ? 'none' : 'auto',
            zIndex: 1000
          }}
          title={achievementUnlocked ? '' : 'Click me for a surprise!'}
        />
      ))}
    </>
  );
}
