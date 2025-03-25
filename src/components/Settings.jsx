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
  surgeCount,
  prestigeCount,
  onClose
}) {
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone!')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="settings-menu">
      <div className="settings-header">
        <h2>Settings</h2>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>

      <div className="stats-section">
        <h3>Stats</h3>
        <p>Total Clicks: {clickCount}</p>
        <p>Average JPS: {Math.floor(passiveIncome * globalJpsMultiplier)}</p>
        <p>Global JPS Multiplier: {globalJpsMultiplier.toFixed(2)}x</p>
        <p>Trash Surges Completed: {surgeCount}</p>
        <p>Times Prestiged: {prestigeCount}</p>
      </div>

      <div className="settings-options">
        <div className="setting-option">
          <label>Show Click Enhancer Effect</label>
          <input
            type="checkbox"
            checked={showClickEnhancerUI}
            onChange={(e) => setShowClickEnhancerUI(e.target.checked)}
          />
        </div>

        <div className="setting-option">
          <label>Max Click Enhancers</label>
          <input
            type="number"
            defaultValue="3"
            min="1"
            max="10"
          />
        </div>

        <div className="setting-option">
          <label>Show Drones</label>
          <input
            type="checkbox"
            checked={showBeaconVisual}
            onChange={(e) => setShowBeaconVisual(e.target.checked)}
          />
        </div>

        <div className="setting-option">
          <label>Max Visible Drones</label>
          <input
            type="number"
            defaultValue="10"
            min="1"
            max="20"
          />
        </div>

        <div className="setting-option">
          <label>Show News Ticker</label>
          <input
            type="checkbox"
            checked={showNewsTicker}
            onChange={(e) => setShowNewsTicker(e.target.checked)}
          />
        </div>

        <div className="setting-option">
          <label>Show Shard Beacon</label>
          <input
            type="checkbox"
            checked={showBeaconVisual}
            onChange={(e) => setShowBeaconVisual(e.target.checked)}
          />
        </div>

        <div className="setting-option">
          <label>Enable HoloBillboard</label>
          <input
            type="checkbox"
            checked={enableHoloBillboard}
            onChange={(e) => setEnableHoloBillboard(e.target.checked)}
          />
        </div>
      </div>

      <div className="reset-section">
        <h3>Reset Progress</h3>
        <p className="reset-warning">Warning: This will permanently delete all your progress!</p>
        <button className="reset-button" onClick={handleReset}>
          Reset All Progress
        </button>
      </div>
    </div>
  );
}