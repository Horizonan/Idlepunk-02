
import React, { useState, useEffect } from 'react';
import './QuantumTapEffect.css';

export default function QuantumTapEffect({ isActive, onComplete }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isActive) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        if (onComplete) onComplete();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isActive, onComplete]);

  if (!visible) return null;

  return (
    <div className="quantum-tap-effect">
      <div className="quantum-pulse">
        <div className="quantum-ring"></div>
        <div className="quantum-ring"></div>
        <div className="quantum-ring"></div>
      </div>
      <div className="quantum-text">⚡ QUANTUM TAP ⚡</div>
      <div className="quantum-multiplier">3x TRONICS</div>
    </div>
  );
}
