
import React from 'react';
import './FluxDisplay.css';

export default function FluxDisplay({ fluxShards, fluxMeter }) {
  const fluxShardsNum = parseInt(fluxShards || 0);
  const fluxMeterNum = parseInt(fluxMeter || 0);
  const progressToNext = fluxShardsNum % 1000;
  const progressPercentage = (progressToNext / 1000) * 100;

  // Only show if player has any flux
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
          <span className="flux-label">Full Meters:</span>
          <span className="flux-value">{fluxMeterNum}</span>
        </div>
        <div className="flux-progress-container">
          <div className="flux-progress-label">Progress to next meter:</div>
          <div className="flux-progress-bar">
            <div 
              className="flux-progress-fill" 
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="flux-progress-text">{progressToNext}/1000</div>
        </div>
      </div>
      <div className="flux-info">
        <p>Generate Flux by clicking during Temporal Surge. Every 1000 Flux grants rewards!</p>
      </div>
    </div>
  );
}
