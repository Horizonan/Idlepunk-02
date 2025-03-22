
import React from 'react';

export default function CredStore({ junk, onSellJunk, onBack }) {
  const baseRate = 100000; // 100,000 junk = 1 credit

  return (
    <div className="store-container">
      <div className="store-header">
        <h2>Credit Exchange</h2>
        <button onClick={onBack}>Close</button>
      </div>
      <div className="store-items">
        <button
          onClick={() => onSellJunk(baseRate)}
          disabled={junk < baseRate}
          className="store-item"
        >
          <div className="item-header">
            <strong>💲 Basic Exchange</strong>
          </div>
          <div>Sell {baseRate.toLocaleString()} Junk for 1 Credit</div>
        </button>

        <button
          onClick={() => onSellJunk(baseRate * 10)}
          disabled={junk < baseRate * 10}
          className="store-item"
        >
          <div className="item-header">
            <strong>💲 Bulk Exchange (10x)</strong>
          </div>
          <div>Sell {(baseRate * 10).toLocaleString()} Junk for 10 Credits</div>
        </button>

        <button
          onClick={() => onSellJunk(baseRate * 100)}
          disabled={junk < baseRate * 100}
          className="store-item"
        >
          <div className="item-header">
            <strong>💲 Mass Exchange (100x)</strong>
          </div>
          <div>Sell {(baseRate * 100).toLocaleString()} Junk for 100 Credits</div>
        </button>
      </div>
      <button onClick={onBack}>Back</button>
    </div>
  );
}
