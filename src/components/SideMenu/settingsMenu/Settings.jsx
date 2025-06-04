import React, { useState, useMemo } from 'react';
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
  const [searchTerm, setSearchTerm] = useState('');

  // Define all searchable settings with their keywords
  const searchableSettings = useMemo(() => [
    { 
      id: 'clickEnhancer', 
      name: 'Click Enhancer Effect', 
      description: 'Shows visual effects when clicking',
      keywords: ['click', 'visual', 'effect', 'enhancer'],
      section: 'Visual Effects'
    },
    { 
      id: 'holoBillboard', 
      name: 'HoloBillboard', 
      description: 'Animated holographic background',
      keywords: ['holo', 'billboard', 'background', 'animated', 'holographic'],
      section: 'Visual Effects'
    },
    { 
      id: 'beaconVisual', 
      name: 'Shard Beacon Visual', 
      description: 'Shows beacon effect for crystals',
      keywords: ['beacon', 'shard', 'crystal', 'visual'],
      section: 'Visual Effects'
    },
    { 
      id: 'drones', 
      name: 'Drones', 
      description: 'Show floating drone helpers',
      keywords: ['drone', 'floating', 'helper'],
      section: 'Game Elements'
    },
    { 
      id: 'hoverDrone', 
      name: 'Hover Drone', 
      description: 'Show special hover drone',
      keywords: ['hover', 'drone', 'special'],
      section: 'Game Elements'
    },
    { 
      id: 'autoclickers', 
      name: 'Autoclickers', 
      description: 'Show automation visual feedback',
      keywords: ['auto', 'clicker', 'automation', 'visual'],
      section: 'Game Elements'
    },
    { 
      id: 'newsTicker', 
      name: 'News Ticker', 
      description: 'Scrolling news updates',
      keywords: ['news', 'ticker', 'scroll', 'updates'],
      section: 'Game Elements'
    },
    { 
      id: 'questRewards', 
      name: 'Quest Rewards', 
      description: 'Show quest completion rewards',
      keywords: ['quest', 'reward', 'completion'],
      section: 'Game Elements'
    },
    { 
      id: 'trashPickup', 
      name: 'Trash Pickup', 
      description: 'Auto-collect falling trash',
      keywords: ['trash', 'pickup', 'auto', 'collect', 'falling'],
      section: 'Gameplay'
    },
    { 
      id: 'holdToClick', 
      name: 'Hold to Click', 
      description: 'Hold mouse button to click repeatedly',
      keywords: ['hold', 'click', 'mouse', 'repeat'],
      section: 'Gameplay'
    },
    { 
      id: 'quantumTapNotification', 
      name: 'Quantum Tap Notification', 
      description: 'Show notification when quantum tap triggers',
      keywords: ['quantum', 'tap', 'notification', 'popup'],
      section: 'Game Elements'
    },
    { 
      id: 'maxClickEnhancers', 
      name: 'Max Click Enhancers', 
      description: 'Maximum visual effects on screen',
      keywords: ['max', 'click', 'enhancer', 'limit', 'visual'],
      section: 'Limits & Controls'
    },
    { 
      id: 'maxVisibleDrones', 
      name: 'Max Visible Drones', 
      description: 'Maximum drones shown at once',
      keywords: ['max', 'drone', 'visible', 'limit'],
      section: 'Limits & Controls'
    },
    { 
      id: 'prestigeMeter', 
      name: 'Prestige Meter', 
      description: 'Show prestige progress meter at bottom of screen',
      keywords: ['prestige', 'meter', 'progress', 'quest'],
      section: 'Game Elements'
    },
    {
      id: 'pickupMagnetRadius',
      name: 'Pickup Magnet Radius',
      description: 'Show visual radius for pickup magnet array',
      keywords: ['pickup', 'magnet', 'radius', 'visual'],
      section: 'Game Elements'
    }
  ], []);

  // Filter settings based on search term
  const filteredSettings = useMemo(() => {
    if (!searchTerm.trim()) return searchableSettings;

    const term = searchTerm.toLowerCase();
    return searchableSettings.filter(setting => 
      setting.name.toLowerCase().includes(term) ||
      setting.description.toLowerCase().includes(term) ||
      setting.keywords.some(keyword => keyword.includes(term)) ||
      setting.section.toLowerCase().includes(term)
    );
  }, [searchTerm, searchableSettings]);

  // Check if a setting should be highlighted
  const shouldShowSetting = (settingId) => {
    if (!searchTerm.trim()) return true;
    return filteredSettings.some(setting => setting.id === settingId);
  };

    // Check if a specific setting should be shown
    const shouldShowSpecificSetting = (settingId) => {
        if (!searchTerm.trim()) return true;
        return filteredSettings.some(setting => setting.id === settingId);
    };

  // Check if a section should be shown
  const shouldShowSection = (sectionName) => {
    if (!searchTerm.trim()) return true;
    return filteredSettings.some(setting => setting.section === sectionName);
  };

  return (
    <div className="store-container settings-menu">
      <div className="settings-header">
        <h2>Settings</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search settings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="settings-search"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="clear-search"
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>
        <button onClick={onClose}>Close</button>
      </div>
      <div className="settings-options">
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
            {shouldShowSection('Visual Effects') && (
            <div className="settings-subsection">
              <h4 className="subsection-title">🎨 Visual Effects</h4>
              <div className="settings-grid">
                {shouldShowSetting('clickEnhancer') && (
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
                )}

                {shouldShowSetting('holoBillboard') && (
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
                )}

                {shouldShowSetting('beaconVisual') && (
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
                )}
              </div>
            </div>
            )}

            {/* Game Elements Section */}
            {shouldShowSection('Game Elements') && (
            <div className="settings-subsection">
              <h4 className="subsection-title">🎯 Game Elements</h4>
              <div className="settings-grid">
                {shouldShowSetting('drones') && (
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
                )}

                {shouldShowSetting('hoverDrone') && (
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
                )}

                {shouldShowSetting('autoclickers') && (
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
                )}

                {shouldShowSetting('newsTicker') && (
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
                )}

                {shouldShowSetting('questRewards') && (
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
                )}

                {shouldShowSetting('quantumTapNotification') && (
                <label className="setting-option modern">
                  <div className="setting-info">
                    <span className="setting-name">Quantum Tap Notification</span>
                    <span className="setting-description">Show notification when quantum tap triggers</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={localStorage.getItem('showQuantumTapNotification') !== 'false'}
                    onChange={(e) => {
                      localStorage.setItem('showQuantumTapNotification', e.target.checked);
                    }}
                  />
                </label>
                )}

                {shouldShowSpecificSetting('prestigeMeter') && (
                <label className="setting-option modern">
                  <div className="setting-info">
                    <span className="setting-name">Prestige Meter</span>
                    <span className="setting-description">Show prestige progress meter at bottom of screen</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={localStorage.getItem('showPrestigeMeter') !== 'false'}
                    onChange={(e) => {
                      localStorage.setItem('showPrestigeMeter', e.target.checked);
                    }}
                  />
                </label>
                )}

                <label className="setting-option modern">
                  <div className="setting-info">
                    <span className="setting-name">Pickup Magnet Radius</span>
                    <span className="setting-description">Show visual radius for pickup magnet array</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={localStorage.getItem('showPickupMagnetRadius') !== 'false'}
                    onChange={(e) => {
                      localStorage.setItem('showPickupMagnetRadius', e.target.checked);
                    }}
                  />
                </label>
              </div>
            </div>
            )}

            {/* Gameplay Settings */}
            {shouldShowSection('Gameplay') && (
            <div className="settings-subsection">
              <h4 className="subsection-title">⚙️ Gameplay</h4>
              <div className="settings-grid">
                {shouldShowSetting('trashPickup') && (
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
                )}

                {shouldShowSetting('holdToClick') && (
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
                )}
              </div>
            </div>
            )}

            {/* Limits & Controls */}
            {shouldShowSection('Limits & Controls') && (
            <div className="settings-subsection">
              <h4 className="subsection-title">📊 Limits & Controls</h4>
              <div className="settings-controls">
                {shouldShowSetting('maxClickEnhancers') && (
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
                )}

                {shouldShowSetting('maxVisibleDrones') && (
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
                )}
              </div>
            </div>
            )}

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