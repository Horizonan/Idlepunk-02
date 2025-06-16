
import React from 'react';

export default function TechTree({ prestigeTokens, onUnlock, onClose }) {
  const hasTronicsClicker = localStorage.getItem('tronicsClicker') === 'true';
  const hasCraftingBenchV2 = localStorage.getItem('craftingBenchV2') === 'true';
  const hasModcrafting = localStorage.getItem('modcrafting') === 'true';
  const hasCrewMenu = localStorage.getItem('crewMenu') === 'true';
  const hasSkillsMenu = localStorage.getItem('skillsMenu') === 'true';
  const hasScraptagon = localStorage.getItem('scraptagon') === 'true';

  const currentPrestige = parseInt(localStorage.getItem('prestigeCount') || '0');

  return (
    <div className="tech-tree-container">
      <div className="tech-tree-header">
        <h2>Tech Tree - Linear Progression</h2>
        <button onClick={onClose}>Close</button>
      </div>
      <div className="tech-tokens">Prestige Tokens: {prestigeTokens}</div>
      
      <div className="tech-tree-linear">
        {/* Tier 1 - Available at Prestige 1 */}
        <div className="tech-tier">
          <h3>Prestige 1 - Foundation</h3>
          <div className="tech-node">
            <button 
              onClick={() => onUnlock('tronicsClicker')}
              disabled={prestigeTokens < 1 || hasTronicsClicker || currentPrestige < 1}
              className="tech-button"
            >
              <span>Unlock Tronics Clicker</span>
              <div className={`tech-cost ${hasTronicsClicker ? 'purchased' : ''}`}>Cost: 1 Token</div>
              <div className={`tech-status ${hasTronicsClicker ? 'purchased' : ''}`}>
                {hasTronicsClicker ? 'UNLOCKED' : 'REQUIRED'}
              </div>
              <div className="item-info">
                <p>Essential foundation for advanced progression:</p>
                <ul>
                  <li>Generate Tronics with each click</li>
                  <li>Access to ElectroShop and advanced systems</li>
                  <li>Required for Credit Store access</li>
                  <li>Gateway to all future tech unlocks</li>
                </ul>
              </div>
            </button>
          </div>

          <div className="tech-node">
            <button 
              onClick={() => onUnlock('craftingBenchV2')}
              disabled={!hasTronicsClicker || prestigeTokens < 1 || hasCraftingBenchV2 || currentPrestige < 1}
              className="tech-button"
            >
              <span>Unlock Crafting Bench v2</span>
              <div className={`tech-cost ${hasCraftingBenchV2 ? 'purchased' : ''}`}>Cost: 1 Token</div>
              <div className={`tech-status ${hasCraftingBenchV2 ? 'purchased' : ''}`}>
                {hasCraftingBenchV2 ? 'UNLOCKED' : 'OPTIONAL'}
              </div>
              <div className="item-info">
                <p>"More advanced parts, fewer duct-tape miracles."</p>
                <ul>
                  <li>Access to advanced crafting recipes</li>
                  <li>Recipes show full item info and rarity</li>
                  <li>Foundation for complex item creation</li>
                </ul>
              </div>
            </button>
          </div>

          <div className="tech-node">
            <button 
              onClick={() => onUnlock('modcrafting')}
              disabled={!hasTronicsClicker || prestigeTokens < 1 || hasModcrafting || currentPrestige < 1}
              className="tech-button"
            >
              <span>Unlock Modcrafting Station</span>
              <div className={`tech-cost ${hasModcrafting ? 'purchased' : ''}`}>Cost: 1 Token</div>
              <div className={`tech-status ${hasModcrafting ? 'purchased' : ''}`}>
                {hasModcrafting ? 'UNLOCKED' : 'OPTIONAL'}
              </div>
              <div className="item-info">
                <p>"You've shaped the world — now shape yourself."</p>
                <ul>
                  <li>Craft and equip passive mods with unique effects</li>
                  <li>Mod rarity and synergy systems</li>
                  <li>Permanent character enhancement</li>
                </ul>
              </div>
            </button>
          </div>
        </div>

        <div className="tech-divider"></div>

        {/* Tier 2 - Available at Prestige 2 */}
        <div className="tech-tier">
          <h3>Prestige 2 - Crew Operations</h3>
          <div className="tech-node">
            <button 
              onClick={() => onUnlock('crewMenu')}
              disabled={!hasTronicsClicker || prestigeTokens < 1 || hasCrewMenu || currentPrestige < 2}
              className={`tech-button ${currentPrestige < 2 ? 'locked-tier' : ''}`}
            >
              <span>Unlock Crew Management</span>
              <div className={`tech-cost ${hasCrewMenu ? 'purchased' : ''}`}>Cost: 1 Token</div>
              <div className={`tech-status ${hasCrewMenu ? 'purchased' : ''}`}>
                {currentPrestige < 2 ? 'PRESTIGE 2 REQUIRED' : hasCrewMenu ? 'UNLOCKED' : 'MILESTONE'}
              </div>
              <div className="item-info">
                <p>"No one survives the heap alone. Time to build a crew."</p>
                <ul>
                  <li>Recruit and manage crew members</li>
                  <li>Send crews on missions for rewards</li>
                  <li>Equipment and loadout systems</li>
                  <li>Automated resource generation through missions</li>
                </ul>
              </div>
            </button>
          </div>
        </div>

        <div className="tech-divider"></div>

        {/* Tier 3 - Available at Prestige 3 */}
        <div className="tech-tier">
          <h3>Prestige 3 - Skills Mastery</h3>
          <div className="tech-node">
            <button 
              onClick={() => onUnlock('skillsMenu')}
              disabled={!hasCrewMenu || prestigeTokens < 1 || hasSkillsMenu || currentPrestige < 3}
              className={`tech-button ${currentPrestige < 3 ? 'locked-tier' : ''}`}
            >
              <span>Unlock Skills Center</span>
              <div className={`tech-cost ${hasSkillsMenu ? 'purchased' : ''}`}>Cost: 1 Token</div>
              <div className={`tech-status ${hasSkillsMenu ? 'purchased' : ''}`}>
                {currentPrestige < 3 ? 'PRESTIGE 3 REQUIRED' : hasSkillsMenu ? 'UNLOCKED' : 'MILESTONE'}
              </div>
              <div className="item-info">
                <p>"Master the arts of the wasteland. Knowledge is the ultimate upgrade."</p>
                <ul>
                  <li>Unlock and upgrade specialized skills</li>
                  <li>Permanent passive bonuses</li>
                  <li>Skill trees for different play styles</li>
                  <li>Advanced character progression</li>
                </ul>
              </div>
            </button>
          </div>
        </div>

        <div className="tech-divider"></div>

        {/* Tier 4 - Available at Prestige 4 */}
        <div className="tech-tier">
          <h3>Prestige 4 - Combat Systems</h3>
          <div className="tech-node">
            <button 
              onClick={() => onUnlock('scraptagon')}
              disabled={!hasSkillsMenu || prestigeTokens < 1 || hasScraptagon || currentPrestige < 4}
              className={`tech-button ${currentPrestige < 4 ? 'locked-tier' : ''}`}
            >
              <span>Unlock Scraptagon Arena</span>
              <div className={`tech-cost ${hasScraptagon ? 'purchased' : ''}`}>Cost: 1 Token</div>
              <div className={`tech-status ${hasScraptagon ? 'purchased' : ''}`}>
                {currentPrestige < 4 ? 'PRESTIGE 4 REQUIRED' : hasScraptagon ? 'UNLOCKED' : 'MILESTONE'}
              </div>
              <div className="item-info">
                <p>"You've built the junk. Now prove you can survive it."</p>
                <ul>
                  <li>Access to Combat Grounds (passive combat system)</li>
                  <li>Training Dummies for Combat XP</li>
                  <li>Enemy encounters and loot mechanics</li>
                  <li>Combat skills and equipment synergy</li>
                </ul>
              </div>
            </button>
          </div>
        </div>

        <div className="tech-progression-info">
          <h4>Progression Summary</h4>
          <p>Each prestige level unlocks new milestone features that fundamentally expand your capabilities:</p>
          <ul>
            <li><strong>Prestige 1:</strong> Foundation systems (Tronics, Crafting, Mods)</li>
            <li><strong>Prestige 2:</strong> Crew management and missions</li>
            <li><strong>Prestige 3:</strong> Advanced skills and specialization</li>
            <li><strong>Prestige 4:</strong> Combat systems and arena gameplay</li>
          </ul>
          <p className="current-prestige">Current Prestige Level: {Math.max(currentPrestige, 1)}</p>
        </div>
      </div>
    </div>
  );
}
