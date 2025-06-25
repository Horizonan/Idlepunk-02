import React from 'react';
import './FluxDisplay.css';

export default function FluxDisplay({ fluxShards, fluxMeter, fluxThreshold }) {
  const meterPercentage = Math.min((fluxMeter / fluxThreshold) * 100, 100);

  return (
    <div className="flux-display">
      <div className="flux-shards">
        <span className="flux-label">⚡ Flux Shards:</span>
        <span className="flux-value">{Math.floor(fluxShards)}</span>
      </div>
      <div className="flux-meter-container">
        <div className="flux-meter-label">Flux Meter</div>
        <div className="flux-meter-background">
          <div 
            className="flux-meter-fill" 
            style={{ width: `${meterPercentage}%` }}
          ></div>
        </div>
        <div className="flux-meter-text">
          {Math.floor(fluxMeter)} / {fluxThreshold}
        </div>
      </div>
    </div>
  );
}