
import React from 'react';
import '../styles/JunkUpgrades.css';

export default function JunkUpgrades({ onClose }) {
  return (
    <div className="store-container">
      <div className="store-header">
        <h2>🔧 Junk Upgrades</h2>
        <button onClick={onClose}>Close</button>
      </div>
      
      <div className="junk-upgrades-content">
        <div className="upgrades-section">
          <h3>Equipment Enhancement</h3>
          <p className="coming-soon">
            🚧 Under Construction 🚧
          </p>
          <p>
            Advanced junk modification systems are being developed. 
            Check back soon for powerful equipment upgrades!
          </p>
        </div>
      </div>
    </div>
  );
}
