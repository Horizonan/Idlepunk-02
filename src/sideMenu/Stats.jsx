
import React from 'react';

export default function Stats({ 
  clickCount,
  passiveIncome,
  globalJpsMultiplier,
  craftingInventory,
  surgeCount,
  prestigeCount,
  preservedHelper,
  onClose,
  permanentAutoClicks,
  electroMultiplier
}) {
  const totalTronicsClicks = parseInt(localStorage.getItem('totalTronicsClicks') || '0');

  return (
    <div className="store-container stats-menu">
      <div className="store-header">
        <h2>Game Statistics</h2>
        <button onClick={onClose}>Close</button>
      </div>
      <div className="store-items">
        <div className="stats-section">
          <h3>📊 Performance Stats</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Total Clicks:</span>
              <span className="stat-value">{clickCount.toLocaleString()}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Total Tronics Clicks:</span>
              <span className="stat-value">{totalTronicsClicks.toLocaleString()}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Average JPS:</span>
              <span className="stat-value">{Math.floor((passiveIncome * globalJpsMultiplier)).toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="stats-section">
          <h3>⚡ Multipliers</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Global JPS Multiplier:</span>
              <span className="stat-value">{(1 + (globalJpsMultiplier - 1) + (craftingInventory['Compression Pack'] ? 0.25 : 0)).toFixed(2)}x</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Global Electro Multiplier:</span>
              <span className="stat-value">{(electroMultiplier.toFixed(2))}x</span>
            </div>
          </div>
        </div>

        <div className="stats-section">
          <h3>🎯 Achievements</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Trash Surges Completed:</span>
              <span className="stat-value">{surgeCount.toLocaleString()}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Times Prestiged:</span>
              <span className="stat-value">{prestigeCount}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Permanent AutoClicks:</span>
              <span className="stat-value">{permanentAutoClicks}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Crystals Collected:</span>
              <span className="stat-value">{parseInt(localStorage.getItem('crystalsCollected') || '0')}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Capacitors Found:</span>
              <span className="stat-value">{parseInt(localStorage.getItem('capacitorsFound') || '0')}</span>
            </div>
          </div>
        </div>

        <div className="stats-section">
          <h3>⏱️ Time & Progress</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Session Playtime:</span>
              <span className="stat-value">{Math.floor(Date.now() / 1000 - (parseInt(localStorage.getItem('sessionStartTime') || Date.now() / 1000))) / 60} min</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Total Playtime:</span>
              <span className="stat-value">{Math.floor((parseInt(localStorage.getItem('totalPlaytime') || '0')) / 60)} min</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Clicks per Second (avg):</span>
              <span className="stat-value">{((clickCount / Math.max(1, (parseInt(localStorage.getItem('totalPlaytime') || '1')) / 1000)) || 0).toFixed(2)}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Highest JPS Reached:</span>
              <span className="stat-value">{parseInt(localStorage.getItem('highestJPS') || '0').toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="stats-section">
          <h3>💰 Economy Stats</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Total Scratz Earned:</span>
              <span className="stat-value">{parseInt(localStorage.getItem('totalScratzEarned') || '0').toLocaleString()}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Total Junk Collected:</span>
              <span className="stat-value">{parseInt(localStorage.getItem('totalJunkCollected') || '0').toLocaleString()}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Upgrades Purchased:</span>
              <span className="stat-value">{parseInt(localStorage.getItem('upgradesPurchased') || '0')}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Items Crafted:</span>
              <span className="stat-value">{parseInt(localStorage.getItem('itemsCrafted') || '0')}</span>
            </div>
          </div>
        </div>

        <div className="stats-section">
          <h3>🔬 Advanced Metrics</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Efficiency Rating:</span>
              <span className="stat-value">{((passiveIncome / Math.max(1, clickCount)) * 100).toFixed(1)}%</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Active vs Passive Ratio:</span>
              <span className="stat-value">{((clickCount * globalJpsMultiplier) / Math.max(1, passiveIncome)).toFixed(1)}:1</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Tech Nodes Unlocked:</span>
              <span className="stat-value">{Object.keys(JSON.parse(localStorage.getItem('unlockedNodes') || '{}')).length}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Quest Completion Rate:</span>
              <span className="stat-value">{((parseInt(localStorage.getItem('questsCompleted') || '0')) / Math.max(1, parseInt(localStorage.getItem('questsStarted') || '1')) * 100).toFixed(1)}%</span>
            </div>
          </div>
        </div>

        <div className="stats-section">
          <h3>🔧 Game Modifiers</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Crystal Time Reduction:</span>
              <span className="stat-value">{Math.min(10, parseInt(localStorage.getItem('beaconCount') || '0'))}%</span>
            </div>
          </div>
        </div>

        {preservedHelper && (
          <div className="stats-section">
            <h3>🛡️ Energy Shielded Helpers</h3>
            <div className="preserved-helpers">
              <span className="stat-label">Preserved Helper{preservedHelper.includes(',') ? 's' : ''}:</span>
              <span className="stat-value preserved-helper">{preservedHelper}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
