
import React, { useState, useEffect } from 'react';
import './QuantumTapEffect.css';

export default function QuantumTapEffect({ isActive, onComplete }) {
  const [visible, setVisible] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (isActive) {
      console.log('QuantumTapEffect triggered, setting visible to true');
      setVisible(true);
      setKey(prev => prev + 1); // Force re-render to restart animations
      const timer = setTimeout(() => {
        console.log('QuantumTapEffect hiding');
        setVisible(false);
        if (onComplete) onComplete();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isActive, onComplete]);

  if (!visible) return null;

  return (
    <div key={key} className="quantum-tap-effect">
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
