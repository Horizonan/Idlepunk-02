
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

        <div className="tooltip-entry">
          <h3 onClick={() => toggleTip('prestige')} style={{ cursor: 'pointer' }}>
            🔁 How Prestige Works {expandedTip === 'prestige' ? '▼' : '▶'}
          </h3>
          {expandedTip === 'prestige' && (
            <div className="tooltip-section">
              <p>Prestiging is a major reset that wipes most of your progress in exchange for unlocking permanent upgrades and access to powerful new systems like Electronics, Tronics, and mod slots.</p>
              
              <h4>How to Unlock Prestige:</h4>
              <ul>
                <li>Reach 1 million Junk</li>
                <li>Complete the Ascension Questline (starts after 1 million junk)</li>
                <li>Collect special resources (Ascension Materials)</li>
                <li>Craft the Prestige Crystal in the crafting menu</li>
              </ul>
              
              <h4>What Does Prestige Reset?</h4>
              <ul>
                <li>Your Junk, upgrades, helpers, and quest progress</li>
                <li>Most inventory items and crafting materials</li>
              </ul>

              <h4>What Do You Keep?</h4>
              <ul>
                <li>Unlocked systems (like the ElectroShop)</li>
                <li>Prestige-exclusive upgrades and bonuses</li>
                <li>Electro Shards, Tronics, Credits, and special resources unlocked post-prestige</li>
                <li>Progress in future systems (e.g., passive skills, mod slots)</li>
              </ul>

              <h4>Why Prestige?</h4>
              <ul>
                <li>Access powerful new layers of progression</li>
                <li>Unlock Electronics Clicker, Tronics Upgrades, and more</li>
                <li>Speed up future runs with permanent multipliers and bonuses</li>
              </ul>
              
              <p className="tooltip-tip">💡 Tip: Make sure to craft the Prestige Crystal before attempting to prestige!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
