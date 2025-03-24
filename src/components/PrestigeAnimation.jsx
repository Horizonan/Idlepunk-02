
import React, { useEffect } from 'react';

export default function PrestigeAnimation({ onAnimationComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onAnimationComplete();
    }, 3000); // Total animation duration

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="prestige-animation">
      <div className="black-hole"></div>
      <div className="particles">
        {[...Array(50)].map((_, i) => (
          <div key={i} className="particle" style={{
            '--delay': `${Math.random() * 0.5}s`,
            '--angle': `${Math.random() * 360}deg`
          }}></div>
        ))}
      </div>
    </div>
  );
}
