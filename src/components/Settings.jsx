import React from 'react';

export default function Settings({ 
  showClickEnhancerUI,
  setShowClickEnhancerUI,
  showNewsTicker,
  setShowNewsTicker,
  showBeaconVisual,
  setShowBeaconVisual,
  enableHoloBillboard,
  setEnableHoloBillboard,
  prestigeCount,
  setShowTechTree,
  clickCount,
  passiveIncome,
  globalJpsMultiplier,
  surgeCount,
  craftingInventory,
  preservedHelper,
  onClose 
}) {
  return (
    <div className="settings-menu">
      <div className="settings-header">
        <h2>Settings</h2>
        <button onClick={onClose}>✕</button>
      </div>
      <div className="settings-options">
        <label className="setting-option">
          <span>Show Click Effects</span>
          <input
            type="checkbox"
            checked={showClickEnhancerUI}
            onChange={(e) => {
              setShowClickEnhancerUI(e.target.checked);
              localStorage.setItem('showClickEnhancerUI', e.target.checked);
            }}
          />
        </label>
        <label className="setting-option">
          <span>Show News Ticker</span>
          <input
            type="checkbox"
            checked={showNewsTicker}
            onChange={(e) => {
              setShowNewsTicker(e.target.checked);
              localStorage.setItem('showNewsTicker', e.target.checked);
            }}
          />
        </label>
        <label className="setting-option">
          <span>Show Shard Beacon</span>
          <input
            type="checkbox"
            checked={showBeaconVisual}
            onChange={(e) => {
              setShowBeaconVisual(e.target.checked);
              localStorage.setItem('showBeaconVisual', e.target.checked);
            }}
          />
        </label>
        <label className="setting-option">
          <span>Enable HoloBillboard</span>
          <input
            type="checkbox"
            checked={enableHoloBillboard}
            onChange={(e) => {
              setEnableHoloBillboard(e.target.checked);
              localStorage.setItem('enableHoloBillboard', e.target.checked);
            }}
          />
        </label>
        {(prestigeCount > 0 || localStorage.getItem('hasPrestiged') === 'true') && (
          <button 
            onClick={() => setShowTechTree(true)}
            style={{marginBottom: '20px', width: '100%'}}
          >
            Open Tech Tree
          </button>
        )}
        <div className="stats-section">
          <h3>Game Stats</h3>
          <p>Total Clicks: {clickCount.toLocaleString()}</p>
          <p>Passive Income: {Math.floor(passiveIncome * globalJpsMultiplier).toLocaleString()} JPS</p>
          <p>Global Multiplier: {(globalJpsMultiplier * 100).toFixed(0)}%</p>
          <p>Surge Count: {surgeCount}</p>
          <p>Prestige Count: {prestigeCount}</p>
          {preservedHelper && <p>Preserved Helper: {preservedHelper}</p>}
          <p>Crafted Items: {Object.keys(craftingInventory).length}</p>
        </div>
        <div className="reset-section">
          <h3>Reset Progress</h3>
          <p className="reset-warning">Warning: This will permanently delete all your progress!</p>
          <button 
            className="reset-button" 
            onClick={() => {
              if (window.confirm('Are you sure you want to reset all progress? This cannot be undone!')) {
                // First clear all localStorage
                localStorage.clear();

                // Reset core game values
                localStorage.setItem('junk', '0');
                localStorage.setItem('credits', '0');
                localStorage.setItem('clickCount', '0');
                localStorage.setItem('tronics', '0');
                localStorage.setItem('autoClicks', '0');
                localStorage.setItem('clickMultiplier', '1');
                localStorage.setItem('passiveIncome', '0');
                localStorage.setItem('globalJpsMultiplier', '1');
                localStorage.setItem('electronicsUnlock', 'false');
                localStorage.setItem('clickEnhancerLevel', '0');
                localStorage.setItem('tutorialStage', '0');
                localStorage.setItem('prestigeCount', '0');
                localStorage.setItem('electroShards', '0');
                localStorage.setItem('beaconCount', '0');
                localStorage.setItem('surgeCount', '0');
                localStorage.setItem('cogfatherLore', '[]');
                localStorage.setItem('craftingInventory', '{}');
                localStorage.setItem('ownedItems', '{}');
                localStorage.setItem('achievements', JSON.stringify(defaultAchievements));

                // Force a page reload to apply changes
                window.location.reload();
              }
            }}
          >
            Reset All Progress
          </button>
        </div>
      </div>
    </div>
  );
}