
import React from 'react';
import './TechTree.css';

export default function TechTree({ prestigeTokens, onUnlock }) {
  return (
    <div className="tech-tree-container">
      <h2>Tech Tree</h2>
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
