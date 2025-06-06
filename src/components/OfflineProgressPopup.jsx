
import React from 'react';
import './OfflineProgressPopup.css';

export default function OfflineProgressPopup({ offlineData, onClose }) {
  if (!offlineData || !offlineData.showPopup) return null;

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else if (minutes > 0) {
      return `${minutes}m`;
    } else {
      return `${seconds}s`;
    }
  };

  return (
    <div className="offline-progress-overlay">
      <div className="offline-progress-popup">
        <div className="offline-progress-header">
          <h2>🌙 Welcome Back!</h2>
          <p>You were offline for {formatTime(offlineData.timeOffline)}</p>
        </div>
        
        <div className="offline-progress-content">
          <h3>Offline Progress Summary:</h3>
          
          {offlineData.scratzMiner && (
            <div className="offline-section">
              <h4>💻 Scratz Miner</h4>
              <div className="progress-items">
                <div className="progress-item">
                  <span className="progress-label">Credits Generated:</span>
                  <span className="progress-value">+{offlineData.scratzMiner.creditsGenerated}</span>
                </div>
                <div className="progress-item">
                  <span className="progress-label">Fuel Consumed:</span>
                  <span className="progress-value">{offlineData.scratzMiner.fuelConsumed.toFixed(2)} hours</span>
                </div>
                <div className="progress-item">
                  <span className="progress-label">Runtime:</span>
                  <span className="progress-value">{formatTime(offlineData.scratzMiner.actualRunTime)}</span>
                </div>
              </div>
            </div>
          )}

          {offlineData.junkGeneration && (
            <div className="offline-section">
              <h4>🗑️ Junk Generation</h4>
              <div className="progress-items">
                <div className="progress-item">
                  <span className="progress-label">Total Junk Generated:</span>
                  <span className="progress-value">+{offlineData.junkGeneration.junkGenerated.toLocaleString()}</span>
                </div>
                {offlineData.junkGeneration.passiveIncome > 0 && (
                  <div className="progress-item">
                    <span className="progress-label">From Passive Income:</span>
                    <span className="progress-value">+{offlineData.junkGeneration.passiveIncome.toLocaleString()}</span>
                  </div>
                )}
                {offlineData.junkGeneration.autoClickerIncome > 0 && (
                  <div className="progress-item">
                    <span className="progress-label">From Auto-Clickers:</span>
                    <span className="progress-value">+{offlineData.junkGeneration.autoClickerIncome.toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {offlineData.tronicsGeneration && (
            <div className="offline-section">
              <h4>⚡ Tronics Generation</h4>
              <div className="progress-items">
                <div className="progress-item">
                  <span className="progress-label">Total Tronics Generated:</span>
                  <span className="progress-value">+{offlineData.tronicsGeneration.tronicsGenerated.toLocaleString()}</span>
                </div>
                {offlineData.tronicsGeneration.autoClickerTronics > 0 && (
                  <div className="progress-item">
                    <span className="progress-label">From Auto-Clickers:</span>
                    <span className="progress-value">+{offlineData.tronicsGeneration.autoClickerTronics.toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {offlineData.totalValue && (
            <div className="offline-total">
              <div className="total-item">
                <span>Total Value Generated:</span>
                <span className="total-value">{offlineData.totalValue} Credits equivalent</span>
              </div>
            </div>
          )}
        </div>

        <button 
          onClick={onClose} 
          className="offline-progress-close"
        >
          Continue Playing
        </button>
      </div>
    </div>
  );
}
