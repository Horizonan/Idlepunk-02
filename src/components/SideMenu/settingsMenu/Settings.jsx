import React from 'react';
import ResetProgress from '../../ResetProgress/ResetProgress.jsx';

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
  setShowChangelog,
  setShowSettings, setShowJunkDrone, showHoverDrone, setShowHoverDrone,
  onClose, setUiSettingsCollapsed, uiSettingsCollapsed, showJunkDrone, showAutoclickers, setShowAutoclickers,
  enableTrashPickup, permanentAutoClicks,
  setEnableTrashPickup,
  enableHoldToClick,
  setEnableHoldToClick
}) {
  const totalTronicsClicks = parseInt(localStorage.getItem('totalTronicsClicks') || '0');

  return (
    <div className="store-container settings-menu">
      <div className="settings-header">
        <h2>Settings</h2>
        <button onClick={onClose}>Close</button>
      </div>
      <div className="settings-options">
        <div className="stats-section">
          <h3>Stats</h3>
          <h4>Clicking</h4>
          <p>Total Clicks: {clickCount.toLocaleString()}</p>
          <p>Total Tronics Clicks: {totalTronicsClicks.toLocaleString()}</p> 
          <h4>Multipliers</h4>
          <p>Global JPS Multiplier: {(1 + (globalJpsMultiplier - 1) + (craftingInventory['Compression Pack'] ? 0.25 : 0)).toFixed(2)}x</p>
          <p>Global Electro Multiplier: {(parseFloat(localStorage.getItem('globalTronicsMultiplier') || '1.0')).toFixed(2)}x</p>
          <h4>Counters</h4>
          <p>Trash Surges Completed: {surgeCount.toLocaleString()}</p>
          <p>Times Prestiged: {prestigeCount}</p>
          <h4>Others</h4>
          <p>Crystal Time Reduction: {Math.min(10, parseInt(localStorage.getItem('beaconCount') || '0'))}%</p>
          <p>Average JPS: {Math.floor((passiveIncome * globalJpsMultiplier)).toLocaleString()}</p>
          <p>Permanent AutoClicks: {permanentAutoClicks}</p>
          
        </div>
        {preservedHelper && (
          <div className="stats-section">
            <h3>Energy Shielded Helpers</h3>
            <p>Preserved Helper{preservedHelper.includes(',') ? 's' : ''}: {preservedHelper}</p>
          </div>
        )}
        <div className="settings-section">
          <h3 onClick={() => {
            const newState = !uiSettingsCollapsed;
            console.log(uiSettingsCollapsed);
            setUiSettingsCollapsed(newState);
            localStorage.setItem('uiSettingsCollapsed', newState);
          }} style={{ cursor: 'pointer' }}>
            🎮 UI Settings {uiSettingsCollapsed ? '▼' : '▲'}
          </h3>
             <div className="ui-settings" style={{ display: uiSettingsCollapsed ? 'none' : 'block' }}>
            <label className="setting-option">
              <span>Show Click Enhancer Effect</span>
              <input
                type="checkbox"
                checked={showClickEnhancerUI}
                onChange={(e) => {
                  localStorage.setItem('showClickEnhancerUI', e.target.checked);
                  setShowClickEnhancerUI(e.target.checked);
                }}
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
                checked={showJunkDrone}
                onChange={(e) => {
                  localStorage.setItem('showDrones', e.target.checked);
                  setShowJunkDrone(e.target.checked);
                }}
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
                  localStorage.setItem('showNewsTicker', e.target.checked);
                  setShowNewsTicker(e.target.checked);
                }}
              />
            </label>
            <label className="setting-option">
              <span>Show Shard Beacon</span>
              <input
                type="checkbox"
                checked={showBeaconVisual}
                onChange={(e) => {
                  localStorage.setItem('showBeaconVisual', e.target.checked);
                  setShowBeaconVisual(e.target.checked);
                }}
              />
            </label>
            <label className="setting-option">
              <span>Enable HoloBillboard</span>
              <input
                type="checkbox"
                checked={enableHoloBillboard}
                onChange={(e) => {
                  localStorage.setItem('enableHoloBillboard', e.target.checked);
                  setEnableHoloBillboard(e.target.checked);
                }}
              />
            </label>
            <label className="setting-option">
              <span>Show Hover Drone</span>
              <input
                type="checkbox"
                checked={showHoverDrone}
                onChange={(e) => {
                  localStorage.setItem('showHoverDrone', e.target.checked);
                  setShowHoverDrone(e.target.checked);
                }}
              />
            </label>
            <label className="setting-option">
              <span>Show Autoclickers</span>
              <input
                type="checkbox"
                checked={showAutoclickers}
                onChange={(e) => {
                  localStorage.setItem('showAutoclickers', e.target.checked);
                  setShowAutoclickers(e.target.checked);
                }}
              />
            </label>
            <label className="setting-option">
              <span>Enable Trash Pickup</span>
              <input
                type="checkbox"
                checked={enableTrashPickup}
                onChange={(e) => {
                  localStorage.setItem('enableTrashPickup', e.target.checked);
                  setEnableTrashPickup(e.target.checked);
                }}
              />
            </label>
            <label className="setting-option">
              <span>Enable Hold to Click</span>
              <input
                type="checkbox"
                checked={enableHoldToClick}
                onChange={(e) => {
                  localStorage.setItem('enableHoldToClick', e.target.checked);
                  setEnableHoldToClick(e.target.checked);
                }}
              />
            </label>
            <button 
              className="ui-reset-button"
              onClick={() => {
                // Reset draggable positions
                localStorage.removeItem('slotMachinePosition');
                localStorage.removeItem('cheatMenuPosition');
                localStorage.removeItem('activeCheatsPosition');
                localStorage.removeItem('sidebarLeft');
                localStorage.removeItem('sidebarTop');
                localStorage.removeItem('questLogPosition');
                localStorage.removeItem('achievementsPosition');

                // Reset toggleable settings
                localStorage.setItem('showDrones', 'false');
                localStorage.setItem('showClickEnhancerUI', 'false');
                localStorage.setItem('enableHoloBillboard', 'false');
                localStorage.setItem('showNewsTicker', 'false');
                localStorage.setItem('showBeaconVisual', 'false');
                localStorage.setItem('sidebarLocked', 'false');
                localStorage.setItem('enableTrashPickup', 'false'); // Added reset for enableTrashPickup
                localStorage.setItem('enableHoldToClick', 'true'); // Reset hold-to-click to enabled

                // Force refresh
                window.location.reload();
              }}
            >
              Reset UI Positions
            </button>
          </div>
        </div>
        <button className="changelog-button" onClick={() => {
          setShowChangelog(prev => !prev);
          setShowSettings(false);
        }}>Show Changelog</button>


        <ResetProgress onReset={() => window.location.reload()} />
      </div>
    </div>
  );
}