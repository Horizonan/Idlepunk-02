
import React, { useState } from 'react';
import './Tooltips.css';

export default function Tooltips({ onClose }) {
  const [expandedTip, setExpandedTip] = useState(null);

  const toggleTip = (tipId) => {
    setExpandedTip(expandedTip === tipId ? null : tipId);
  };

  return (
    <div className="store-container tooltips-menu">
      <div className="tooltips-header">
        <h2>Game Tooltips</h2>
        <button onClick={onClose}>Close</button>
      </div>
      
      <div className="tooltips-content">
        <div className="tooltip-entry">
          <h3 onClick={() => toggleTip('electroShards')}>
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
                <li>Electroshard miner v0.1</li>
              </ul>
              
              <p>Their availability increases after your first Prestige, but limited ways to earn them exist earlier in the game.</p>
            
              <p className="tooltip-tip">💡 Tip: Keep an eye on rare pickups and hidden quest rewards — they matter more than you think.</p>
            </div>
          )}
        </div>

        <div className="tooltip-entry">
          <h3 onClick={() => toggleTip('tronicsClicker')}>
            🔌 Tronics Clicker {expandedTip === 'tronicsClicker' ? '▼' : '▶'}
          </h3>
          {expandedTip === 'tronicsClicker' && (
            <div className="tooltip-section">
              <p>Channel unstable energy into the system — one click at a time.</p>
              <ul>
                <li>🔌 Generates 1 Tronic per click</li>
                <li>📈 Benefits from Tronics per Click upgrades</li>
                <li>💡 Unlocks new tech, ElectroShop items, and advanced systems post-prestige</li>
              </ul>
            </div>
          )}
        </div>

        <div className="tooltip-entry">
          <h3 onClick={() => toggleTip('techTree')}>
            💡 What Is The Tech Tree? {expandedTip === 'techTree' ? '▼' : '▶'}
          </h3>
          {expandedTip === 'techTree' && (
            <div className="tooltip-section">
              <p>“Unlock the circuits of progression.”</p>
              <p>The first node is mandatory it unlocks the Tronics Clicker, which is core to late-game systems like ElectroShop, Credit Store, and more.</p>
              <p>Spend your first Ascension Token here to begin your tech evolution. More nodes unlock advanced upgrades and passive systems.

</p>
              <p className="tooltip-tip">💡 Tip: Unlock the First Node or you WILL be STUCK.</p>
            </div>
          )}
        </div>

        <div className="tooltip-entry">
          <h3 onClick={() => toggleTip('prestige')}>
            🔁 How Prestige Works {expandedTip === 'prestige' ? '▼' : '▶'}
          </h3>
          {expandedTip === 'prestige' && (
            <div className="tooltip-section">
              <p>Prestiging is a major reset that wipes most of your progress in exchange for unlocking permanent upgrades and access to powerful new systems.</p>
              
              <h4>How to Unlock Prestige:</h4>
              <ul>
                <li>Reach 1 million Junk</li>
                <li>Complete the Ascension Questline</li>
                <li>Collect special resources</li>
                <li>Craft the Prestige Crystal</li>
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
                <li>Special resources unlocked post-prestige</li>
              </ul>
              
              <p className="tooltip-tip">💡 Tip: Time your prestige carefully - make sure you've maximized your current run's potential first!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
