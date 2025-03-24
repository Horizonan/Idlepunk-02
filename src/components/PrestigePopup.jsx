
import React from 'react';

export default function PrestigePopup({ onConfirm, onClose, stats }) {
  return (
    <div className="store-container">
      <div className="store-header">
        <h2>Prestige Confirmation</h2>
        <button onClick={onClose}>Close</button>
      </div>
      
      <div style={{ padding: '20px' }}>
        <div className="stats-section">
          <h3>Current Progress</h3>
          <p>Junk: {Math.floor(stats.junk).toLocaleString()}</p>
          <p>Click Power: {stats.clickMultiplier}x</p>
          <p>Passive Income: {stats.passiveIncome}/sec</p>
          <p>Auto Clicks: {stats.autoClicks}/sec</p>
          <p>Click Enhancer Level: {stats.clickEnhancerLevel}</p>
        </div>

        <div className="stats-section" style={{ color: '#ff4444' }}>
          <h3>The following will be reset:</h3>
          <ul style={{ listStyle: 'none', padding: '0' }}>
            <li>• All Junk</li>
            <li>• Click Power</li>
            <li>• Passive Income</li>
            <li>• Auto Clickers</li>
            <li>• Click Enhancers</li>
            <li>• All Store Items</li>
            <li>• Item Costs</li>
          </ul>
        </div>

        <div className="stats-section" style={{ color: '#00ff00' }}>
          <h3>You will receive:</h3>
          <p>• 1 Prestige Token</p>
          <p>• Access to the Tech Tree</p>
        </div>

        <button 
          onClick={onConfirm}
          style={{
            width: '100%',
            marginTop: '20px',
            background: '#9400D3',
            color: 'white'
          }}
        >
          Confirm Prestige
        </button>
      </div>
    </div>
  );
}
