
import React from 'react';

export default function AutomationStore({ junk, itemCosts, onBuyAutoClicker, onBack }) {
  const canAfford = junk >= (itemCosts.autoClicker || 5000);
  
  return (
    <div className="store-container">
      <h2>Automation Store</h2>
      <div className="store-items">
        <button 
          className={`store-item ${!canAfford ? 'disabled' : ''}`}
          onClick={onBuyAutoClicker}
          disabled={!canAfford}
        >
          <div className="item-header">
            <span>Auto Clicker Bot</span>
            <span className="cost">{itemCosts.autoClicker} Junk</span>
          </div>
          <div className="item-info">
            <img src="/src/Icons/robot.png" alt="Auto Clicker" className="item-icon" />
            <p>+1 Auto Click/sec</p>
          </div>
        </button>
      </div>
      <button onClick={onBack}>Back</button>
    </div>
  );
}
