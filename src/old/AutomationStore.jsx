
import React from 'react';

export default function AutomationStore({ junk, itemCosts, onBuyAutoClicker, onBuyAutoClickerV2, autoClicks, autoClickerV1Count, autoClickerV2Count, onBack }) {
  const canAffordV1 = junk >= (itemCosts.autoClicker || 5000);
  const baseV2Cost = 10000;
const canAffordV2 = junk >= (itemCosts.autoClickerV2 || baseV2Cost);

  

  return (
    <div className="store-container">
      <div className="store-header">
        <h2>Automation Center</h2>
        <button onClick={onBack}>Close</button>
      </div>
      <div className="store-items">
        <button 
          className={`store-item ${!canAffordV1 ? 'disabled' : ''}`}
          onClick={onBuyAutoClicker}
          disabled={!canAffordV1}
        >
          <div className="item-header">
            <span>Auto Clicker Bot</span>
            <span className="cost"> ({itemCosts.autoClicker} Junk)</span>
          </div>
          <div className="item-info">
            <img src="/Icons/Upgrades/autoClickerV1.png" alt="Auto Clicker" className="item-icon" />
            <p>+1 Automatic Click per second (generates Junk automatically as if clicked by the player)</p>
            <p>Owned: {autoClickerV1Count}</p>
          </div>
        </button>

        <button 
          className={`store-item ${!canAffordV2 || autoClicks < 1 ? 'disabled' : ''}`}
          onClick={onBuyAutoClickerV2}
          disabled={!canAffordV2 || autoClicks < 1}
          title="Auto Clicker Bot v2.0 – Upgraded to 2 clicks/sec. Now 12% less annoying."
        >
          <div className="item-header">
            <span>Auto Clicker Bot v2.0</span>
            <span className="cost"> ({itemCosts.autoClickerV2 || 10000} Junk)</span>
          </div>
          <div className="item-info">
            <img src="/Icons/Upgrades/clickerV2.png" alt="Auto Clicker v2.0" className="item-icon" />
            <p>+2 Automatic Clicks per second (Consumes 1 Auto Clicker Bot)</p>
            <p>Owned: {autoClickerV2Count}</p>
          </div>
        </button>
      </div>
    </div>
  );
}
