
import React from 'react';
import './SurgeExplanationPopup.css';

export default function SurgeExplanationPopup({ onClose }) {
  return (
    <div className="surge-explanation-overlay">
      <div className="surge-explanation-popup">
        <div className="surge-explanation-header">
          <h2>⚡ Your First Surge!</h2>
          <button className="surge-explanation-close" onClick={onClose}>×</button>
        </div>
        <div className="surge-explanation-content">
          <div className="surge-explanation-icon">⚡</div>
          <h3>What is a Surge?</h3>
          <p>
            Surges are powerful events that temporarily flood your junkyard with extra energy and opportunities!
          </p>
          <div className="surge-benefits">
            <h4>During a Surge:</h4>
            <ul>
              <li>🗑️ <strong>Double Junk Collection</strong> - Your clicks collect twice as much junk</li>
              <li>⏱️ <strong>Limited Time</strong> - Surges last 5-7 seconds (can be extended with upgrades)</li>
              <li>🔋 <strong>Rare Materials</strong> - Sometimes spawns valuable Capacitors</li>
              <li>✨ <strong>Visual Effects</strong> - Screen glows and buttons shine brighter</li>
            </ul>
          </div>
          <div className="surge-tips">
            <h4>💡 Pro Tips:</h4>
            <ul>
              <li>Click as fast as you can during surges for maximum benefit</li>
              <li>Watch for the surge timer at the top of your screen</li>
              <li>Surges occur randomly every 4-8 minutes</li>
              <li>Later upgrades can unlock even more powerful surge types</li>
            </ul>
          </div>
          <button className="surge-explanation-got-it" onClick={onClose}>
            Got it! Let's collect some junk! 🗑️
          </button>
        </div>
      </div>
    </div>
  );
}
