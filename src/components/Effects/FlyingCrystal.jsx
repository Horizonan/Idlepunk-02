
import React, { useState, useEffect, useRef } from 'react';

const crystalSound = new Audio('/sounds/crystal appears.mp3');

export default function FlyingCrystal({ onCollect, onDisappear }) {
  const [position, setPosition] = useState({ 
    x: Math.random() < 0.5 ? -100 : window.innerWidth + 100,
    y: Math.random() * window.innerHeight 
  });
  const [direction] = useState(position.x < 0 ? 1 : -1);
  const animationRef = useRef();
  const startTimeRef = useRef(Date.now());
  const lastUpdateRef = useRef(0);

  useEffect(() => {
    crystalSound.play().catch(err => console.log('Audio play failed:', err));
  }, []);
  
  useEffect(() => {
    const animate = (currentTime) => {
      // Throttle to ~30fps to reduce CPU usage
      if (currentTime - lastUpdateRef.current < 33) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      lastUpdateRef.current = currentTime;

      setPosition(prev => {
        const newX = prev.x + (3 * direction);
        
        // Check if crystal went off screen
        if ((direction > 0 && newX > window.innerWidth + 100) || 
            (direction < 0 && newX < -100)) {
          return {
            x: direction > 0 ? -100 : window.innerWidth + 100,
            y: Math.random() * (window.innerHeight - 100)
          };
        }
        
        return { ...prev, x: newX };
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    const disappearTimeout = setTimeout(() => {
      onDisappear();
    }, 300000); // 5 minutes max duration

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      clearTimeout(disappearTimeout);
    };
  }, [direction, onDisappear]);

  return (
    <img
      src="Icons/electroClicker/crystals.png"
      alt="Crystal"
      onClick={onCollect}
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        width: '64px',
        height: '64px',
        cursor: 'pointer',
        filter: 'drop-shadow(0 0 10px #9400D3)',
        animation: 'float 2s infinite alternate ease-in-out',
        zIndex: 1000,
        willChange: 'transform', // Optimize for animations
        transform: 'translateZ(0)', // Force hardware acceleration
      }}
    />
  );
}
