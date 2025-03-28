
import React from 'react';
import './TechTree.css';

export default function TechTree({ prestigeTokens, onUnlock, onClose }) {
  return (
    <div className="tech-tree-container">
      <div className="tech-tree-header">
        <h2>Tech Tree</h2>
        <button onClick={onClose}>Close</button>
      </div>
      <div className="tech-tokens">Prestige Tokens: {prestigeTokens}</div>
      
      <div className="tech-tree">
        <div className="tech-tier">
          <h3>Tier 1 - Root Node</h3>
          <div className="tech-node root-node">
            
            <button 
              onClick={() => onUnlock('tronicsClicker')}
              disabled={prestigeTokens < 1}
              className="tech-button"
            >
              Unlock Tronics Clicker
              <div className="tech-cost">Cost: 1 Token</div>
              <div className="required-label">REQUIRED</div>
              <div className="item-info">
                <p>Unlocks the Tronics Clicker - essential for late-game progression:</p>
                <ul>
                  <li>Generate Tronics with each click</li>
                  <li>Access to ElectroShop and advanced systems</li>
                  <li>Required for Credit Store access</li>
                </ul>
              </div>
            </button>
          </div>
        </div>
        
        <div className="tech-connections">
          <div className="vertical-line"></div>
          <div className="horizontal-line"></div>
        </div>
        
        <div className="tech-tier">
          <div className="tech-node locked">
            <button disabled className="tech-button">???</button>
          </div>
          <div className="tech-node locked">
            <button disabled className="tech-button">???</button>
          </div>
          <div className="tech-node locked">
            <button disabled className="tech-button">???</button>
          </div>
        </div>
      </div>
    </div>
  );
}
