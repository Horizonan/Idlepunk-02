
import React from 'react';

export default function CredStore({ junk, onSellJunk, onBack }) {
  const sellRate = 10; // 10 junk = 1 credit

  return (
    <div className="store-container">
      <div className="store-header">
        <h2>Credit Exchange</h2>
      </div>
      <div className="store-items">
        <button
          onClick={() => onSellJunk(sellRate)}
          disabled={junk < sellRate}
          className="store-item"
        >
          Sell {sellRate} Junk for 1 Credit
        </button>
      </div>
      <button onClick={onBack}>Back</button>
    </div>
  );
}
