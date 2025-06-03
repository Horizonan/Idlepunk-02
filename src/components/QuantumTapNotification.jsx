
import React, { useState, useEffect } from 'react';
import './QuantumTapNotification.css';

export default function QuantumTapNotification({ mousePosition, onComplete }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div 
      className="quantum-tap-notification"
      style={{
        left: mousePosition.x + 15,
        top: mousePosition.y - 10
      }}
    >
      Quantum Tap Triggered!
    </div>
  );
}
