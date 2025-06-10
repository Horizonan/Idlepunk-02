
import React from 'react';
import './OfflineProgressPopup.css';

export default function OfflineProgressPopup({ offlineResults, onClose }) {
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  const hasAnyProgress = offlineResults.junk > 0 || offlineResults.tronics > 0 || offlineResults.scratz > 0 || offlineResults.missions > 0;

  return (
    <div className="offline-progress-overlay">
      <div className="offline-progress-popup">
        <div className="offline-progress-header">
          <h2>🎯 While You Were Away</h2>
          <div className="offline-duration">
            Offline for: {formatTime(offlineResults.duration)}
            {offlineResults.duration >= 1800 && <span className="duration-cap"> (capped at 30min)</span>}
          </div>
        </div>

        <div className="offline-progress-content">
          {hasAnyProgress ? (
            <div className="progress-summary">
              <div className="summary-intro">
                <p>Your automated systems kept working while you were gone!</p>
              </div>

              <div className="progress-grid">
                {offlineResults.junk > 0 && (
                  <div className="progress-item junk">
                    <div className="progress-icon">🗑️</div>
                    <div className="progress-details">
                      <span className="progress-label">Junk Collected</span>
                      <span className="progress-value">+{offlineResults.junk.toLocaleString()}</span>
                    </div>
                  </div>
                )}

                {offlineResults.tronics > 0 && (
                  <div className="progress-item tronics">
                    <div className="progress-icon">⚡</div>
                    <div className="progress-details">
                      <span className="progress-label">Tronics Generated</span>
                      <span className="progress-value">+{offlineResults.tronics.toLocaleString()}</span>
                    </div>
                  </div>
                )}

                {offlineResults.scratz > 0 && (
                  <div className="progress-item scratz">
                    <div className="progress-icon">💰</div>
                    <div className="progress-details">
                      <span className="progress-label">Scratz Earned</span>
                      <span className="progress-value">+{offlineResults.scratz}</span>
                    </div>
                  </div>
                )}

                {offlineResults.missions > 0 && (
                  <div className="progress-item missions">
                    <div className="progress-icon">🎯</div>
                    <div className="progress-details">
                      <span className="progress-label">Missions Completed</span>
                      <span className="progress-value">{offlineResults.missions}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="progress-footer">
                <p className="efficiency-note">
                  💡 Offline efficiency: Your systems work at full capacity for up to 30 minutes
                </p>
              </div>
            </div>
          ) : (
            <div className="no-progress">
              <div className="no-progress-icon">😴</div>
              <p>Your systems were idle while you were away.</p>
              <p className="idle-tip">Build more automated income sources to earn while offline!</p>
            </div>
          )}
        </div>

        <div className="offline-progress-actions">
          <button className="welcome-back-btn" onClick={onClose}>
            Welcome Back!
          </button>
        </div>
      </div>
    </div>
  );
}
