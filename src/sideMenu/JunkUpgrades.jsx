
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
          <div style={{padding: '20px', border: '2px solid #9400D3', margin: '20px 0'}}>
            <h4 style={{color: '#00FF00'}}>TEST: Component is displaying correctly!</h4>
            <p>If you can see this message, the JunkUpgrades component is working.</p>
            <button style={{padding: '10px', background: '#9400D3', color: 'white', border: 'none', borderRadius: '4px'}}>
              Test Button
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
