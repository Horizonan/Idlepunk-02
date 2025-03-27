
import React, { useState } from 'react';

export default function Tooltips({ onClose }) {
  const [expandedTip, setExpandedTip] = useState(null);

  const toggleTip = (tipId) => {
    setExpandedTip(expandedTip === tipId ? null : tipId);
  };

  return (
    <div className="store-container tooltips-menu">
      <div className="store-header">
        <h2>Game Tooltips</h2>
        <button onClick={onClose}>Close</button>
      </div>
      
      <div className="tooltips-content">
        <div className="tooltip-entry">
          <h3 onClick={() => toggleTip('electroShards')} style={{ cursor: 'pointer' }}>
            ⚡ What Are Electro Shards? {expandedTip === 'electroShards' ? '▼' : '▶'}
          </h3>
          {expandedTip === 'electroShards' && (
            <div className="tooltip-section">
              <p>Electro Shards are a rare, high-tier resource used to power advanced systems. They are primarily required to:</p>
              <ul>
                <li>Craft special quest items (like the Prestige Crystal)</li>
                <li>Purchase powerful ElectroShop upgrades</li>
              </ul>
              
              <p>Electro Shards can be acquired through:</p>
              <ul>
                <li>Rare floating pickups</li>
                <li>Special crafting recipes Post Prestige</li>
                <li>Select quests</li>
              </ul>
              
              <p>Their availability increases after your first Prestige, but limited ways to earn them exist earlier in the game.</p>
              <p className="tooltip-tip">💡 Tip: Keep an eye on rare pickups and hidden quest rewards — they matter more than you think.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
