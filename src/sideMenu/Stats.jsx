import React from 'react';
import { calculateCrystalTimeReduction, getCrystalPickupDuration } from '../utils/crystalUtils';
import { getTrashPickupDuration } from '../utils/trashUtils';
import { useRecruitmentZustand } from '../stores/crewRecruitment/recruitmentZustand';

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
  const successfulMissions = useRecruitmentZustand(state => state.successfulMissions);
  const totalTronicsClicks = parseInt(localStorage.getItem('totalTronicsClicks') || '0');
  const totalJunkCollected = parseInt(localStorage.getItem('totalJunkCollected') || '0');
  const hasHoverDrone = craftingInventory && craftingInventory['Hover Drone'];

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
            <div className="stats-item">
              <span className="stats-label">Total Clicks:</span>
              <span className="stats-value">{clickCount.toLocaleString()}</span>
            </div>
            <div className="stats-item">
              <span className="stats-label">Total Tronics Clicks:</span>
              <span className="stats-value">{totalTronicsClicks.toLocaleString()}</span>
            </div>
            <div className="stats-item">
              <span className="stats-label">Total Junk Collected:</span>
              <span className="stats-value">{totalJunkCollected.toLocaleString()}</span>
            </div>
            <div className="stats-item">
              <span className="stats-label">Average JPS:</span>
              <span className="stats-value">{Math.floor((passiveIncome * globalJpsMultiplier)).toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="stats-section">
          <h3>⚡ Multipliers</h3>
          <div className="stats-grid">
            <div className="stats-item">
              <span className="stats-label">Global JPS Multiplier:</span>
              <span className="stats-value">{(1 + (globalJpsMultiplier - 1) + (craftingInventory['Compression Pack'] ? 0.25 : 0)).toFixed(2)}x</span>
            </div>
            <div className="stats-item">
              <span className="stats-label">Global Electro Multiplier:</span>
              <span className="stats-value">{(electroMultiplier.toFixed(2))}x</span>
            </div>
          </div>
        </div>

        <div className="stats-section">
          <h3>🎯 Achievements</h3>
          <div className="stats-grid">
            <div className="stats-item">
              <span className="stats-label">Trash Surges Completed:</span>
              <span className="stats-value">{surgeCount.toLocaleString()}</span>
            </div>
            <div className="stats-item">
              <span className="stats-label">Times Prestiged:</span>
              <span className="stats-value">{prestigeCount}</span>
            </div>
            <div className="stats-item">
              <span className="stats-label">Permanent AutoClicks:</span>
              <span className="stats-value">{permanentAutoClicks}</span>
            </div>
            <div className="stats-item">
              <span className="stats-label">Successful Crew Missions:</span>
              <span className="stats-value">{successfulMissions}</span>
            </div>
          </div>
        </div>

        <div className="stats-section">
          <h3>⏱️ Pickup Time</h3>
          <div className="stats-grid">
            <div className="stats-item">
              <span className="stats-label">Trash Pickup Duration:</span>
              <span className="stats-value">{getTrashPickupDuration()}s</span>
            </div>
            <div className="stats-item">
              <span className="stats-label">Crystal Pickup Duration:</span>
              <span className="stats-value">{getCrystalPickupDuration()}s</span>
            </div>
          </div>
        </div>

        <div className="stats-section">
          <h3>🔧 Game Modifiers</h3>
          <div className="stats-grid">
            <div className="stats-item">
              <span className="stats-label">Crystal Time Reduction:</span>
              <span className="stats-value">{calculateCrystalTimeReduction().percentageReduction}%</span>
            </div>
            <div className="stats-item">
              <span className="stats-label">Mission Speedup:</span>
              <span className="stats-value">{(() => {
                const skillLevels = JSON.parse(localStorage.getItem('skillLevels') || '{}');
                const heistingSpeedLevel = skillLevels.heistingSpeed || 0;
                const craftingInventory = JSON.parse(localStorage.getItem('craftingInventory') || '{}');
                const hasChronoRegulator = craftingInventory['Chrono Regulator'] && craftingInventory['Chrono Regulator'] > 0;
                
                let totalSpeedup = 0;
                if (heistingSpeedLevel > 0) {
                  totalSpeedup += heistingSpeedLevel * 0.5; // 0.5% per level
                }
                if (hasChronoRegulator) {
                  totalSpeedup += 3.33; // Approximate percentage for 20 second reduction
                }
                
                return totalSpeedup.toFixed(1);
              })()}%</span>
            </div>
          </div>
        </div>

        {preservedHelper && (
          <div className="stats-section">
            <h3>🛡️ Energy Shielded Helpers</h3>
            <div className="preserved-helpers">
              <span className="stats-label">Preserved Helper{preservedHelper.includes(',') ? 's' : ''}:</span>
              <span className="stats-value preserved-helper">{preservedHelper}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}