
import React from 'react';

export default function TechTree({ prestigeTokens, onUnlock, onClose }) {
  const hasTronicsClicker = localStorage.getItem('tronicsClicker') === 'true';
  const hasScraptagon = localStorage.getItem('scraptagon') === 'true';
  const hasCraftingBenchV2 = localStorage.getItem('craftingBenchV2') === 'true';
  const hasModcrafting = localStorage.getItem('modcrafting') === 'true';

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
              disabled={prestigeTokens < 1 || hasTronicsClicker}
              className="tech-button"
            >
              <span>Unlock Tronics Clicker</span>
              
              <div className={`tech-cost ${hasTronicsClicker ? 'purchased' : ''}`}>Cost: 1 Token</div>
              <div className={`tech-cost ${!hasTronicsClicker ? 'purchased' : ''}`}>Purchased</div>
              <div className={`required-label ${hasTronicsClicker ? 'purchased' : ''}`}>REQUIRED</div> 
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
          <div className="tech-node">
            <button 
              onClick={() => onUnlock('scraptagon')}
              disabled={!hasTronicsClicker || prestigeTokens < 1 || hasScraptagon}
              className="tech-button"
            >
              <span>Unlocks Scraptagon</span>
              <div className={`tech-cost ${hasScraptagon ? 'purchased' : ''}`}>Cost: 1 Token</div>
              <div className={`tech-cost ${!hasScraptagon ? 'purchased' : ''}`}>Purchased</div>
              <div className={`required-label ${hasScraptagon ? 'purchased' : ''}`}>Optional</div>
              <div className="item-info">
                <p>"You've built the junk. Now prove you can survive it." Unlocks:</p>
                <ul>
                  <li>Access to Combat Grounds (passive combat system)</li>
                  <li>Adds Training Dummies for Combat XP</li>
                  <li>Future enemies and loot-based mechanics</li>
                </ul>
              </div>
            </button>
          </div>
          <div className="tech-node">
            <button 
              onClick={() => onUnlock('craftingBenchV2')}
              disabled={!hasTronicsClicker || prestigeTokens < 1 || hasCraftingBenchV2}
              className="tech-button"
            >
              <span>Unlocks Crafting Bench v2</span>
              <div className={`tech-cost ${hasCraftingBenchV2 ? 'purchased' : ''}`}>Cost: 1 Token</div>
              <div className={`tech-cost ${!hasCraftingBenchV2 ? 'purchased' : ''}`}>Purchased</div>
              <div className={`required-label ${hasCraftingBenchV2 ? 'purchased' : ''}`}>Optional</div>
              <div className="item-info">
                <p>"More advanced parts, fewer duct-tape miracles." Unlocks:</p>
                <ul>
                  <li>Access to new items</li>
                  <li>Recipes show full item info and rarity</li>
                </ul>
              </div>
            </button>
          </div>
          <div className="tech-node">
            <button 
              onClick={() => onUnlock('modcrafting')}
              disabled={!hasTronicsClicker || prestigeTokens < 1 || hasModcrafting}
              className="tech-button"
            >
              <span>Unlocks Modcrafting Station</span>
              <div className={`tech-cost ${hasModcrafting ? 'purchased' : ''}`}>Cost: 1 Token</div>
              <div className={`tech-cost ${!hasModcrafting ? 'purchased' : ''}`}>Purchased</div>
              <div className={`required-label ${hasModcrafting ? 'purchased' : ''}`}>Optional</div>
              <div className="item-info">
                <p>"You've shaped the world — now shape yourself." Unlocks:</p>
                <ul>
                  <li>Craft and equip passive mods with unique effects</li>
                  <li>Mod rarity, synergy, and future expansion planned</li>
                </ul>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
