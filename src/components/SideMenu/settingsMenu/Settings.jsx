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
  setEnableHoldToClick,
  electroMultiplier
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
          <p>Global Electro Multiplier: {(electroMultiplier.toFixed(2))}x</p>
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
          }} className="settings-category-header">
            🎮 UI Settings {uiSettingsCollapsed ? '▼' : '▲'}
          </h3>
          <div className={`ui-settings ${uiSettingsCollapsed ? 'collapsed' : 'expanded'}`}>
            
            {/* Visual Effects Section */}
            <div className="settings-subsection">
              <h4 className="subsection-title">🎨 Visual Effects</h4>
              <div className="settings-grid">
                <label className="setting-option modern">
                  <div className="setting-info">
                    <span className="setting-name">Click Enhancer Effect</span>
                    <span className="setting-description">Shows visual effects when clicking</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={showClickEnhancerUI}
                    onChange={(e) => {
                      localStorage.setItem('showClickEnhancerUI', e.target.checked);
                      setShowClickEnhancerUI(e.target.checked);
                    }}
                  />
                </label>
                
                <label className="setting-option modern">
                  <div className="setting-info">
                    <span className="setting-name">HoloBillboard</span>
                    <span className="setting-description">Animated holographic background</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={enableHoloBillboard}
                    onChange={(e) => {
                      localStorage.setItem('enableHoloBillboard', e.target.checked);
                      setEnableHoloBillboard(e.target.checked);
                    }}
                  />
                </label>

                <label className="setting-option modern">
                  <div className="setting-info">
                    <span className="setting-name">Shard Beacon Visual</span>
                    <span className="setting-description">Shows beacon effect for crystals</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={showBeaconVisual}
                    onChange={(e) => {
                      localStorage.setItem('showBeaconVisual', e.target.checked);
                      setShowBeaconVisual(e.target.checked);
                    }}
                  />
                </label>
              </div>
            </div>

            {/* Game Elements Section */}
            <div className="settings-subsection">
              <h4 className="subsection-title">🎯 Game Elements</h4>
              <div className="settings-grid">
                <label className="setting-option modern">
                  <div className="setting-info">
                    <span className="setting-name">Drones</span>
                    <span className="setting-description">Show floating drone helpers</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={showJunkDrone}
                    onChange={(e) => {
                      localStorage.setItem('showDrones', e.target.checked);
                      setShowJunkDrone(e.target.checked);
                    }}
                  />
                </label>

                <label className="setting-option modern">
                  <div className="setting-info">
                    <span className="setting-name">Hover Drone</span>
                    <span className="setting-description">Show special hover drone</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={showHoverDrone}
                    onChange={(e) => {
                      localStorage.setItem('showHoverDrone', e.target.checked);
                      setShowHoverDrone(e.target.checked);
                    }}
                  />
                </label>

                <label className="setting-option modern">
                  <div className="setting-info">
                    <span className="setting-name">Autoclickers</span>
                    <span className="setting-description">Show automation visual feedback</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={showAutoclickers}
                    onChange={(e) => {
                      localStorage.setItem('showAutoclickers', e.target.checked);
                      setShowAutoclickers(e.target.checked);
                    }}
                  />
                </label>

                <label className="setting-option modern">
                  <div className="setting-info">
                    <span className="setting-name">News Ticker</span>
                    <span className="setting-description">Scrolling news updates</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={showNewsTicker}
                    onChange={(e) => {
                      localStorage.setItem('showNewsTicker', e.target.checked);
                      setShowNewsTicker(e.target.checked);
                    }}
                  />
                </label>

                <label className="setting-option modern">
                  <div className="setting-info">
                    <span className="setting-name">Quest Rewards</span>
                    <span className="setting-description">Show quest completion rewards</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={localStorage.getItem('showQuestRewards') !== 'false'}
                    onChange={(e) => {
                      localStorage.setItem('showQuestRewards', e.target.checked);
                    }}
                  />
                </label>
              </div>
            </div>

            {/* Gameplay Settings */}
            <div className="settings-subsection">
              <h4 className="subsection-title">⚙️ Gameplay</h4>
              <div className="settings-grid">
                <label className="setting-option modern">
                  <div className="setting-info">
                    <span className="setting-name">Trash Pickup</span>
                    <span className="setting-description">Auto-collect falling trash</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={enableTrashPickup}
                    onChange={(e) => {
                      localStorage.setItem('enableTrashPickup', e.target.checked);
                      setEnableTrashPickup(e.target.checked);
                    }}
                  />
                </label>

                <label className="setting-option modern">
                  <div className="setting-info">
                    <span className="setting-name">Hold to Click</span>
                    <span className="setting-description">Hold mouse button to click repeatedly</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={enableHoldToClick}
                    onChange={(e) => {
                      localStorage.setItem('enableHoldToClick', e.target.checked);
                      setEnableHoldToClick(e.target.checked);
                    }}
                  />
                </label>
              </div>
            </div>

            {/* Limits & Controls */}
            <div className="settings-subsection">
              <h4 className="subsection-title">📊 Limits & Controls</h4>
              <div className="settings-controls">
                <div className="control-group">
                  <label className="control-label">
                    <span className="control-name">Max Click Enhancers</span>
                    <span className="control-description">Maximum visual effects on screen</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={localStorage.getItem('maxClickEnhancers') || 3}
                    onChange={(e) => localStorage.setItem('maxClickEnhancers', e.target.value)}
                    className="number-input"
                  />
                </div>
                
                <div className="control-group">
                  <label className="control-label">
                    <span className="control-name">Max Visible Drones</span>
                    <span className="control-description">Maximum drones shown at once</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={localStorage.getItem('maxVisibleDrones') || 10}
                    onChange={(e) => localStorage.setItem('maxVisibleDrones', e.target.value)}
                    className="number-input"
                  />
                </div>
              </div>
            </div>

            {/* Reset Section */}
            <div className="settings-subsection danger-section">
              <h4 className="subsection-title">🔄 Reset Options</h4>
              <button 
                className="ui-reset-button modern"
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
                  localStorage.setItem('enableTrashPickup', 'false');
                  localStorage.setItem('enableHoldToClick', 'true');

                  // Force refresh
                  window.location.reload();
                }}
              >
                🔄 Reset UI Positions & Settings
              </button>
            </div>
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