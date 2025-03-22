
import React from 'react';

export default function CredStore({ junk, onSellJunk, onBack, credits, onBuyBeacon }) {
  const baseRate = 100000; // 100,000 junk = 1 credit
  const formatAmount = (amount) => {
    if (amount >= 1000000) {
      return `${(amount / 1000000)} mil`;
    } else if (amount >= 1000) {
      return `${(amount / 1000)}k`;
    }
    return amount;
  };

  return (
    <div className="store-container">
      <div className="store-header">
        <h2>Credit Exchange</h2>
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
          <div>Sell {formatAmount(baseRate)} Junk for 1 Credit</div>
        </button>

        <button
          onClick={() => onSellJunk(baseRate * 10)}
          disabled={junk < baseRate * 10}
          className="store-item"
        >
          <div className="item-header">
            <strong>💲 Bulk Exchange (10x)</strong>
          </div>
          <div>Sell {formatAmount(baseRate * 10)} Junk for 10 Credits</div>
        </button>

        <button
          onClick={() => onSellJunk(baseRate * 100)}
          disabled={junk < baseRate * 100}
          className="store-item"
        >
          <div className="item-header">
            <strong>💲 Mass Exchange (100x)</strong>
          </div>
          <div>Sell {formatAmount(baseRate * 100)} Junk for 100 Credits</div>
        </button>

        <button
          onClick={() => onBuyBeacon()}
          disabled={credits < 25}
          className="store-item"
        >
          <div className="item-header">
            <strong>⚡ Electro Shard Beacon</strong>
          </div>
          <div>Reduces Electro Shard spawn cooldown by 1% (Max 10)</div>
          <div>Cost: 25 Credits</div>
          <div className="item-info">
            A mysterious device that creates an electromagnetic field,
            attracting Electro Shards more frequently. Stack up to 10 beacons
            for a maximum 10% reduction in spawn time.
          </div>
        </button>
      <button
          onClick={() => onSellJunk(baseRate)}
          disabled={junk < baseRate}
          className="store-item"
        >
          <div className="item-header">
            <strong>💲 Basic Exchange</strong>
          </div>
          <div>Sell {formatAmount(baseRate)} Junk for 1 Credit</div>
          <div className="item-info">
            Convert your excess junk into valuable credits at the standard exchange rate.
            Perfect for small transactions.
          </div>
        </button>

        <button
          onClick={() => onSellJunk(baseRate * 10)}
          disabled={junk < baseRate * 10}
          className="store-item"
        >
          <div className="item-header">
            <strong>💲 Bulk Exchange (10x)</strong>
          </div>
          <div>Sell {formatAmount(baseRate * 10)} Junk for 10 Credits</div>
          <div className="item-info">
            A more efficient way to exchange larger amounts of junk.
            Save time by converting in bulk!
          </div>
        </button>

        <button
          onClick={() => onSellJunk(baseRate * 100)}
          disabled={junk < baseRate * 100}
          className="store-item"
        >
          <div className="item-header">
            <strong>💲 Mass Exchange (100x)</strong>
          </div>
          <div>Sell {formatAmount(baseRate * 100)} Junk for 100 Credits</div>
          <div className="item-info">
            The ultimate exchange option for serious junk collectors.
            Perfect for large-scale operations.
          </div>
        </button>
      </div>
      <button onClick={onBack}>Back</button>
    </div>
  );
}
