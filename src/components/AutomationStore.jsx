
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
            <div className="item-description">
              <p>Effect: +1 Auto Click/sec</p>
              <p className="item-note">Generates Junk automatically as if clicked by the player</p>
              <p className="item-note">Cost increases by 15% per purchase</p>
            </div>
          </div>
        </button>
      </div>
      <button onClick={onBack}>Back</button>
    </div>
  );
}
