import React from 'react';
import CredStoreFunctionality from './CredStoreFunctionality';

export default function CredStore({ credits, junk, onSellJunk, onBuyBeacon, craftingInventory, onBuyHoverDrone, onBuyBooster, onBuyReclaimer, autoClicks, onBack, creditStoreItems, onBuyShardExtractor }) {
  return (
    <div className="store-container">
      <div className="store-header">
        <h2>Credit Store</h2>
        <button onClick={onBack}>Close</button>
      </div>
      <CredStoreFunctionality 
        junk={junk}
        credits={credits}
        autoClicks={autoClicks}
        onSellJunk={onSellJunk}
        onBuyBeacon={onBuyBeacon}
        craftingInventory={craftingInventory}
        onBuyHoverDrone={onBuyHoverDrone}
        onBuyBooster={onBuyBooster}
        onBuyReclaimer={onBuyReclaimer}
        onBuyShardExtractor={onBuyShardExtractor}
        creditStoreItems={creditStoreItems}
      />
    </div>
  );on>

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

            <p>Stack up to 10 beacons
            for a maximum 10% reduction in spawn time.</p>
            <p>Current beacons: {localStorage.getItem('beaconCount') || 0}/10</p>
            {localStorage.getItem('beaconCount') >= 10 && 
              <p className="max-limit">Maximum beacons reached!</p>
            }
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
          className={`store-item ${credits < 90 || (craftingInventory['Ascension Reclaimer'] || 0) >= 2 || autoClicks === 0 ? 'uncraftable' : ''}`}
          onClick={() => {
            if (credits >= 90 && (craftingInventory['Ascension Reclaimer'] || 0) < 2 && autoClicks > 0) {
              onBuyReclaimer();
            }
          }}
          disabled={credits < 90 || (craftingInventory['Ascension Reclaimer'] || 0) >= 2 || autoClicks === 0}
          title={autoClicks === 0 ? "You need to own at least one automation helper to use the Ascension Reclaimer!" : ""}
        >
          <div className="item-header">
            <strong><span className="icon">🛡️</span> Ascension Reclaimer</strong>
            <span>90 Credits</span>
          </div>
          <div className="item-info">
            Keep 1 random helper or crafting bonus after Prestige.
            Energy shield technology that preserves automation through ascension.
            Can be purchased twice. ({(craftingInventory['Ascension Reclaimer'] || 0)}/2)
          </div>
        </button>
      </div>

      {localStorage.getItem('hasPrestiged') === 'true' && (
        <div className="store-category">
          <h3>First Ascension</h3>
          <button
            onClick={() => onBuyShardExtractor()}
            disabled={credits < 75 || creditStoreItems['lastShardExtractorUse'] > Date.now() - 900000}
            className="store-item"
          >
            <div className="item-header">
              <strong>⚡ Shard Extractor</strong>
            </div>
            <div>75 Credits</div>
            <div className="item-info">
              <p>Forces a crystal shard to spawn within 30 seconds</p>
              <p>15 minute cooldown between uses</p>
              {creditStoreItems['lastShardExtractorUse'] > Date.now() - 900000 && 
                <p className="cooldown">Available in: {Math.ceil((900000 - (Date.now() - creditStoreItems['lastShardExtractorUse'])) / 60000)}m</p>
              }
            </div>
          </button>
        </div>
      )}
    </div>
  );
}