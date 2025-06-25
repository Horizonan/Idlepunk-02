
import React from 'react';
import './FluxDisplay.css';

export default function FluxDisplay({ fluxShards, fluxMeter }) {
  const fluxShardsNum = parseInt(fluxShards || 0);
  const fluxMeterNum = parseInt(fluxMeter || 0);
  const progressToNext = fluxShardsNum % 1000;
  const progressPercentage = (progressToNext / 1000) * 100;
  const completedMeters = Math.floor(fluxShardsNum / 1000);
  const meterProgress = (fluxMeterNum / 100) * 100;

  // Only show if player has any flux or is during a surge
  if (fluxShardsNum === 0 && fluxMeterNum === 0) {
    return null;
  }

  return (
    <div className="flux-display">
      <div className="flux-header">
        <h4>🌌 Flux System</h4>
      </div>
      <div className="flux-stats">
        <div className="flux-stat">
          <span className="flux-label">Flux Shards:</span>
          <span className="flux-value">{fluxShardsNum.toLocaleString()}</span>
        </div>
        <div className="flux-stat">
          <span className="flux-label">Shard Milestones:</span>
          <span className="flux-value">{completedMeters}</span>
        </div>
        <div className="flux-progress-container">
          <div className="flux-progress-label">Progress to next milestone:</div>
          <div className="flux-progress-bar">
            <div 
              className="flux-progress-fill" 
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="flux-progress-text">{progressToNext}/1000</div>
        </div>
        <div className="flux-progress-container">
          <div className="flux-progress-label">Instability Meter:</div>
          <div className="flux-progress-bar">
            <div 
              className="flux-progress-fill" 
              style={{ width: `${meterProgress}%` }}
            />
          </div>
          <div className="flux-progress-text">{fluxMeterNum}/100</div>
        </div>
      </div>
      <div className="flux-info">
        <p>Generate Flux by clicking during Temporal Surge. Every 1000 Flux Shards grants Electro Shards!</p>
        <p>Instability Meter fills every 100 clicks and grants Instability Cores!</p>
      </div>
    </div>
  );
}
