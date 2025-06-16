import React from 'react';

export default function TechTree({ prestigeTokens, onUnlock, onClose }) {
  const hasTronicsClicker = localStorage.getItem('tronicsClicker') === 'true';
  const hasCrewMenu = localStorage.getItem('crewMenu') === 'true';
  const hasSkillsMenu = localStorage.getItem('skillsMenu') === 'true';
  const hasScraptagon = localStorage.getItem('scraptagon') === 'true';

  const currentPrestige = parseInt(localStorage.getItem('prestigeCount') || '0');
  
  // Get prestige bonuses from localStorage
  const getPrestigeBonuses = () => {
    return {
      clickMultiplier: parseFloat(localStorage.getItem('prestigeClickBonus') || '1'),
      startingAutoclicks: parseInt(localStorage.getItem('prestigeAutoclicks') || '0'),
      startingCredits: parseInt(localStorage.getItem('prestigeStartingCredits') || '0'),
      craftingSpeedBonus: parseFloat(localStorage.getItem('prestigeCraftingSpeed') || '1')
    };
  };
  
  const bonuses = getPrestigeBonuses();

  return (
    <div className="tech-tree-container">
      <div className="tech-tree-header">
        <h2>Tech Tree - Prestige Progression</h2>
        <button onClick={onClose}>Close</button>
      </div>

      <div className="tech-tree-grid">
        {/* Prestige 1 - Foundation Node */}
        <div className="tech-tier tier-1">
          <h3>Prestige 1 - Foundation</h3>
          <div className="prestige-rewards">
            <div className="rewards-header">🎁 Prestige Rewards:</div>
            <div className="reward-item">• +{((bonuses.clickMultiplier - 1) * 100).toFixed(0)}% Click Power</div>
            <div className="reward-item">• {bonuses.startingAutoclicks} Starting Auto-clicks</div>
            <div className="reward-item">• Keep 1 Random Helper on Reset</div>
          </div>
          <div className="tech-nodes-row">
            <div className="tech-node foundation-node">
              <button 
                onClick={() => onUnlock('tronicsClicker')}
                disabled={hasTronicsClicker || currentPrestige < 1}
                className={`tech-button ${hasTronicsClicker ? 'unlocked' : ''} ${currentPrestige < 1 ? 'locked-tier' : ''}`}
              >
                <div className="tech-icon">⚡</div>
                <div className="tech-name">Tronics Clicker</div>
                <div className={`tech-status ${hasTronicsClicker ? 'purchased' : ''}`}>
                  {currentPrestige < 1 ? 'PRESTIGE 1 REQUIRED' : hasTronicsClicker ? 'UNLOCKED' : 'AVAILABLE'}
                </div>
                <div className="tech-description">
                  Essential foundation for advanced progression. Generate Tronics with each click and access to ElectroShop. <strong>Unlock Crafting System & Electro Currency!</strong>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Connection Line */}
        <div className="tech-connection vertical"></div>

        {/* Prestige 2 - Crew Operations */}
        <div className="tech-tier tier-2">
          <h3>Prestige 2 - Crew Operations</h3>
          <div className="prestige-rewards">
            <div className="rewards-header">🎁 Prestige Rewards:</div>
            <div className="reward-item">• +{bonuses.startingCredits} Starting Scratz</div>
            <div className="reward-item">• +25% Mission Success Rate</div>
            <div className="reward-item">• Unlock Advanced Questlines</div>
          </div>
          <div className="tech-nodes-row">
            <div className="tech-node milestone-node">
              <button 
                onClick={() => onUnlock('crewMenu')}
                disabled={!hasTronicsClicker || hasCrewMenu || currentPrestige < 2}
                className={`tech-button ${hasCrewMenu ? 'unlocked' : ''} ${currentPrestige < 2 ? 'locked-tier' : ''}`}
              >
                <div className="tech-icon">👥</div>
                <div className="tech-name">Crew Management</div>
                <div className={`tech-status ${hasCrewMenu ? 'purchased' : ''}`}>
                  {currentPrestige < 2 ? 'PRESTIGE 2 REQUIRED' : hasCrewMenu ? 'UNLOCKED' : 'MILESTONE'}
                </div>
                <div className="tech-description">
                  "No one survives the heap alone. Time to build a crew." <strong>Recruit crew members, send them on passive missions for Scratz & resources!</strong> Unlock recruitment mini-games.
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Connection Line */}
        <div className="tech-connection vertical"></div>

        {/* Prestige 3 - Skills Mastery */}
        <div className="tech-tier tier-3">
          <h3>Prestige 3 - Skills Mastery</h3>
          <div className="prestige-rewards">
            <div className="rewards-header">🎁 Prestige Rewards:</div>
            <div className="reward-item">• +{((bonuses.craftingSpeedBonus - 1) * 100).toFixed(0)}% Crafting Speed</div>
            <div className="reward-item">• Permanent XP Gain Boost</div>
            <div className="reward-item">• Unlock Elite Equipment</div>
          </div>
          <div className="tech-nodes-row">
            <div className="tech-node milestone-node">
              <button 
                onClick={() => onUnlock('skillsMenu')}
                disabled={!hasCrewMenu || hasSkillsMenu || currentPrestige < 3}
                className={`tech-button ${hasSkillsMenu ? 'unlocked' : ''} ${currentPrestige < 3 ? 'locked-tier' : ''}`}
              >
                <div className="tech-icon">🎯</div>
                <div className="tech-name">Skills Center</div>
                <div className={`tech-status ${hasSkillsMenu ? 'purchased' : ''}`}>
                  {currentPrestige < 3 ? 'PRESTIGE 3 REQUIRED' : hasSkillsMenu ? 'UNLOCKED' : 'MILESTONE'}
                </div>
                <div className="tech-description">
                  "Master the arts of the wasteland. Knowledge is the ultimate upgrade." <strong>Train specialized skills, unlock passive bonuses & skill-based challenges!</strong> Access to permanent progression.
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Connection Line */}
        <div className="tech-connection vertical"></div>

        {/* Prestige 4 - Combat Systems */}
        <div className="tech-tier tier-4">
          <h3>Prestige 4 - Combat Systems</h3>
          <div className="prestige-rewards">
            <div className="rewards-header">🎁 Prestige Rewards:</div>
            <div className="reward-item">• Unlock Combat Currency</div>
            <div className="reward-item">• +50% Rare Drop Rates</div>
            <div className="reward-item">• Access to Endgame Content</div>
          </div>
          <div className="tech-nodes-row">
            <div className="tech-node milestone-node">
              <button 
                onClick={() => onUnlock('scraptagon')}
                disabled={!hasSkillsMenu || hasScraptagon || currentPrestige < 4}
                className={`tech-button ${hasScraptagon ? 'unlocked' : ''} ${currentPrestige < 4 ? 'locked-tier' : ''}`}
              >
                <div className="tech-icon">⚔️</div>
                <div className="tech-name">Scraptagon Arena</div>
                <div className={`tech-status ${hasScraptagon ? 'purchased' : ''}`}>
                  {currentPrestige < 4 ? 'PRESTIGE 4 REQUIRED' : hasScraptagon ? 'UNLOCKED' : 'MILESTONE'}
                </div>
                <div className="tech-description">
                  "You've built the junk. Now prove you can survive it." <strong>Enter real-time combat, fight bosses, earn combat tokens & legendary equipment!</strong> The ultimate endgame system.
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Progression Summary */}
        <div className="tech-progression-summary">
          <h4>Progression Path</h4>
          <div className="progression-flow">
            <div className={`progression-step ${currentPrestige >= 1 ? 'completed' : 'locked'}`}>
              <span className="step-number">1</span>
              <span className="step-name">Foundation</span>
            </div>
            <div className="flow-arrow">→</div>
            <div className={`progression-step ${currentPrestige >= 2 ? 'completed' : 'locked'}`}>
              <span className="step-number">2</span>
              <span className="step-name">Crew Ops</span>
            </div>
            <div className="flow-arrow">→</div>
            <div className={`progression-step ${currentPrestige >= 3 ? 'completed' : 'locked'}`}>
              <span className="step-number">3</span>
              <span className="step-name">Skills</span>
            </div>
            <div className="flow-arrow">→</div>
            <div className={`progression-step ${currentPrestige >= 4 ? 'completed' : 'locked'}`}>
              <span className="step-number">4</span>
              <span className="step-name">Combat</span>
            </div>
          </div>
          <p className="current-prestige">Current Prestige Level: {Math.max(currentPrestige, 1)}</p>
        </div>
      </div>
    </div>
  );
}