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
  clickCount,
  passiveIncome,
  globalJpsMultiplier,
  craftingInventory,
  surgeCount,
  prestigeCount,
  preservedHelper,
  prestigeQuestCompleted,
  setShowTechTree,
  onClose 
}) {
  return (
    <div className="store-container settings-menu">
      <div className="settings-header">
        <h2>Settings</h2>
        <button onClick={onClose}>Close</button>
      </div>
      <div className="settings-options">
        <div className="stats-section">
          <h3>Stats</h3>
          <p>Total Clicks: {clickCount.toLocaleString()}</p>
          <p>Average JPS: {Math.floor((passiveIncome * globalJpsMultiplier)).toLocaleString()}</p>
          <p>Global JPS Multiplier: {(1 + (globalJpsMultiplier - 1) + (craftingInventory['Compression Pack'] ? 0.25 : 0)).toFixed(2)}x</p>
          <p>Trash Surges Completed: {surgeCount.toLocaleString()}</p>
          <p>Times Prestiged: {prestigeCount}</p>
        </div>
        {preservedHelper && (
          <div className="stats-section">
            <h3>Energy Shielded Helpers</h3>
            <p>Preserved Helper{preservedHelper.includes(',') ? 's' : ''}: {preservedHelper}</p>
          </div>
        )}
        <label className="setting-option">
          <span>Show Click Enhancer Effect</span>
          <input
            type="checkbox"
            checked={showClickEnhancerUI}
            onChange={() => setShowClickEnhancerUI(prev => !prev)}
          />
        </label>
        <label className="setting-option">
          <span>Max Click Enhancers</span>
          <input
            type="number"
            min="1"
            max="10"
            value={localStorage.getItem('maxClickEnhancers') || 3}
            onChange={(e) => localStorage.setItem('maxClickEnhancers', e.target.value)}
          />
        </label>
        <label className="setting-option">
          <span>Show Drones</span>
          <input
            type="checkbox"
            checked={localStorage.getItem('showDrones') !== 'false'}
            onChange={(e) => localStorage.setItem('showDrones', e.target.checked)}
          />
        </label>
        <label className="setting-option">
          <span>Max Visible Drones</span>
          <input
            type="number"
            min="1"
            max="20"
            value={localStorage.getItem('maxVisibleDrones') || 10}
            onChange={(e) => localStorage.setItem('maxVisibleDrones', e.target.value)}
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
       
        
        <div className="reset-section">
          <h3>Reset Progress</h3>
          <p className="reset-warning">Warning: This will permanently delete all your progress!</p>
          <button 
            className="reset-button" 
            onClick={() => {
              if (window.confirm('Are you sure you want to reset all progress? This cannot be undone!')) {
                const defaultAchievements = [
                  {
                    title: "Junkie Starter",
                    requirement: "Collect 1,000 Junk",
                    reward: "+500 Junk",
                    flavorText: "Now you're hoarding like a real scavver.",
                    unlocked: false,
                    checked: false
                  },
                  {
                    title: "The First Clicks",
                    requirement: "Click 500 times",
                    reward: "+5% Click Power",
                    flavorText: "That mouse is starting to look worn...",
                    unlocked: false,
                    checked: false
                  },
                  {
                    title: "Greasy Milestone",
                    requirement: "Reach 10 Junk/sec",
                    reward: "+1 Auto Click/sec",
                    flavorText: "The gears are turning smoothly now.",
                    unlocked: false,
                    checked: false
                  }
                ];

                Object.keys(localStorage).forEach(key => {
                  if (key.startsWith('quest_sync_')) {
                    localStorage.removeItem(key);
                  }
                });
                localStorage.clear();
                localStorage.setItem('achievements', JSON.stringify(defaultAchievements));
                localStorage.setItem('globalJpsMultiplier', '1');
                localStorage.setItem('prestigeCount', '0');
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