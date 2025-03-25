
import React from 'react';

export default function ElectroStore({ electroShards, tronics, onBuyTronicsBoost, onBack }) {
  return (
    <div className="store-container">
      <div className="store-header">
        <h2>Electronics Store</h2>
        <button onClick={onBack}>Close</button>
      </div>
      <div className="store-items">
        <button
          className={`store-item ${electroShards < 3 || tronics < 250 ? 'disabled' : ''}`}
          onClick={onBuyTronicsBoost}
          disabled={electroShards < 3 || tronics < 250}
          title={electroShards < 3 ? "Requires 3 Electro Shards to unlock" : ""}
        >
          <div className="item-header">
            <strong>⚡ Tronics Click Boost I</strong>
          </div>
          <div>250 Tronics</div>
          <div className="item-info">
            <p>+1 Tronics per click</p>
            <p>Unlock Cost: 3 Electro Shards</p>
          </div>
        </button>
      </div>
    </div>
  );
}
