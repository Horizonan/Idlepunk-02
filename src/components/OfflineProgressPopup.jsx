
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

          {offlineData.passiveIncome && (
            <div className="offline-section">
              <h4>⚙️ Passive Income</h4>
              <div className="progress-items">
                <div className="progress-item">
                  <span className="progress-label">Junk Generated:</span>
                  <span className="progress-value">+{offlineData.passiveIncome.junkGenerated}</span>
                </div>
              </div>
            </div>
          )}

          {offlineData.tronics && (
            <div className="offline-section">
              <h4>⚡ Tronics</h4>
              <div className="progress-items">
                <div className="progress-item">
                  <span className="progress-label">Tronics Generated:</span>
                  <span className="progress-value">+{offlineData.tronics.generated}</span>
                </div>
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
