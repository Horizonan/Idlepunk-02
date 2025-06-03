
import React, { useState, useEffect } from 'react';
import './QuantumTapNotification.css';

export default function QuantumTapNotification({ show, mouseX, mouseY, onComplete }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        onComplete();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!isVisible) return null;

  return (
    <div 
      className="quantum-tap-notification"
      style={{
        left: mouseX + 20,
        top: mouseY - 10,
      }}
    >
      ⚡ Quantum Tap Triggered! ⚡
    </div>
  );
}
