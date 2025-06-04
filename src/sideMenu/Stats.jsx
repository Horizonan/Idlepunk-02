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
            <div className="stat-item">
              <span className="stat-label">Total Clicks:</span>
              <span className="stat-value">{clickCount.toLocaleString()}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Total Tronics Clicks:</span>
              <span className="stat-value">{totalTronicsClicks.toLocaleString()}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Total Junk Collected:</span>
              <span className="stat-value">{totalJunkCollected.toLocaleString()}</span>
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
              <span className="stat-label">Successful Crew Missions:</span>
              <span className="stat-value">{successfulMissions}</span>
            </div>
          </div>
        </div>

        <div className="stats-section">
          <h3>⏱️ Pickup Time</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Trash Pickup Duration:</span>
              <span className="stat-value">{getTrashPickupDuration()}s</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Crystal Pickup Duration:</span>
              <span className="stat-value">{getCrystalPickupDuration()}s</span>
            </div>
          </div>
        </div>

        <div className="stats-section">
          <h3>🔧 Game Modifiers</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Crystal Time Reduction:</span>
              <span className="stat-value">{calculateCrystalTimeReduction().percentageReduction}%</span>
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