
import React from 'react';

export default function CredStoreFunctionality({ junk, credits, autoClicks, onSellJunk, onBuyBeacon, craftingInventory, onBuyHoverDrone, onBuyBooster, onBuyReclaimer, onBuyShardExtractor, creditStoreItems }) {
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
    <div className="store-items">
      <button
        onClick={() => onSellJunk(baseRate)}
        disabled={junk < baseRate}
        className="store-item"
      >
        <div className="item-header">
          <strong>💲 Basic Exchange</strong>
        </div>
        <div>1 Credit</div>
        <div className="item-info">
          Sell {formatAmount(baseRate)} Junk for 1 Credit
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
        <div>10 Credits</div>
        <div className="item-info">
          Sell {formatAmount(baseRate * 10)} Junk for 10 Credits
          A more efficient way to convert your junk into credits.
          Ideal for medium-scale operations.
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
        <div>100 Credits</div>
        <div className="item-info">
          Sell {formatAmount(baseRate * 100)} Junk for 100 Credits
          The ultimate exchange option for serious junk collectors.
          Perfect for large-scale operations.
        </div>
      </button>

      <button
        onClick={() => onBuyBeacon()}
        disabled={credits < 25 || localStorage.getItem('beaconCount') >= 10}
        className="store-item"
      >
        <div className="item-header">
          <strong>⚡ Electro Shard Beacon</strong>
        </div>
        <div>25 Credits</div>
        <div className="item-info">
          <p>Reduces Electro Shard spawn cooldown by 1% (Max 10)</p>
          A mysterious device that creates an electromagnetic field,
          attracting Electro Shards more frequently.
          <p>Stack up to 10 beacons for a maximum 10% reduction in spawn time.</p>
          <p>Current beacons: {localStorage.getItem('beaconCount') || 0}/10</p>
          {localStorage.getItem('beaconCount') >= 10 && 
            <p className="max-limit">Maximum beacons reached!</p>
          }
        </div>
      </button>

      <button
        onClick={() => onBuyShardExtractor()}
        disabled={credits < 75 || (creditStoreItems['lastShardExtractorUse'] && creditStoreItems['lastShardExtractorUse'] > Date.now() - 900000)}
        className="store-item"
      >
        <div className="item-header">
          <strong>🔮 Shard Extractor</strong>
        </div>
        <div>75 Credits</div>
        <div className="item-info">
          Forces an Electro Shard to spawn soon
          (15-minute cooldown between uses)
          {creditStoreItems['lastShardExtractorUse'] && (
            <p>Next use available in: {Math.ceil((creditStoreItems['lastShardExtractorUse'] + 900000 - Date.now()) / 60000)} minutes</p>
          )}
        </div>
      </button>

      <button
        onClick={() => onBuyBooster()}
        disabled={credits < 60 || craftingInventory['Crafting Booster Unit']}
        className="store-item"
      >
        <div className="item-header">
          <strong><span className="icon">🔧</span> Crafting Booster Unit</strong>
          <span>60 Credits</span>
        </div>
        <div className="item-info">
          -10% crafting costs on basic recipes
          An efficient processing unit that optimizes
          your crafting operations. One-time purchase.
        </div>
      </button>

      <button
        onClick={() => onBuyHoverDrone()}
        disabled={credits < 20 || creditStoreItems['Hover Drone']}
        className="store-item"
      >
        <div className="item-header">
          <strong>🚁 Hover Drone Addon</strong>
        </div>
        <div>20 Credits</div>
        <div className="item-info">
          Floating Trash lasts +5s longer before disappearing
          A sleek aerial companion that helps extend the lifespan
          of floating trash bonuses. One-time purchase.
        </div>
      </button>

      <button
        onClick={() => onBuyReclaimer()}
        disabled={credits < 90 || (craftingInventory['Ascension Reclaimer'] || 0) >= 2 || !autoClicks}
        className="store-item"
      >
        <div className="item-header">
          <strong>🔄 Ascension Reclaimer</strong>
        </div>
        <div>90 Credits</div>
        <div className="item-info">
          Preserve a random automation helper through prestige
          Maximum of 2 Reclaimers can be crafted
          {craftingInventory['Ascension Reclaimer'] > 0 && 
            <p>Current Reclaimers: {craftingInventory['Ascension Reclaimer']}/2</p>
          }
        </div>
      </button>
    </div>
  );
}
