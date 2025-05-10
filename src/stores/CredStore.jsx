import React from 'react';

import { useCrystalZustand } from '../utils/crystalZustand';

export default function CredStore({ credits, junk, craftingInventory, onBuyHoverDrone, onBuyBooster, onBuyReclaimer, autoClicks, onBack, creditStoreItems, onSetCredits, onSetJunk, onSetNotification, onSetBeaconCount, onSetShowBeacon, onSetCreditStoreItems, onSetShowCrystal, onSetCraftingInventory, onSetPreservedHelper }) {


  // 100,000 junk = 1 credit
  const baseRate = 100000; 

  //Formatting Junk 
  const formatAmount = (amount) => {
    if (amount >= 1000000) {
      return `${(amount / 1000000)} mil`;
    } else if (amount >= 1000) {
      return `${(amount / 1000)}k`;
    }
    return amount;
  };

  //Sell Junk Function
  const onSellJunk = (rate) => {
    if (junk >= rate) {
      const creditsToAdd = rate === baseRate ? 1 : rate === baseRate * 10 ? 10 : 100;
      onSetJunk(prev => prev - rate);
      onSetCredits(prev => prev + creditsToAdd);
      onSetNotification(prev => [...prev, `Sold ${rate} junk for ${creditsToAdd} credits!`]);
    }
  };

  //Buy beacon function
  const onBuyBeacon = () => {
    const currentBeaconCount = parseInt(localStorage.getItem('beaconCount') || '0');
    if (credits >= 25 && currentBeaconCount < 10) {
      onSetCredits(prev => prev - 25);
      onSetBeaconCount(prev => prev +1);
      onSetNotification(prev => [...prev, "Electro Shard Beacon purchased! Crystal spawn time reduced by 1%"]);
      onSetShowBeacon(true);
      setTimeout(() => onSetShowBeacon(false), 3000);
    }
  }

  //Buy Shard Extractor Function
  const onBuyShardExtractor=() => {
    if (credits >= 75 && (!creditStoreItems['lastShardExtractorUse'] || creditStoreItems['lastShardExtractorUse'] <= Date.now() - 900000)) {
      onSetCredits(prev => prev - 75);
      onSetCreditStoreItems(prev => {
        const newItems = { ...prev, lastShardExtractorUse: Date.now() };
        localStorage.setItem('creditStoreItems', JSON.stringify(newItems));
        return newItems;
      });
      onSetNotification(prev => [...prev, "Shard Extractor activated! A crystal will appear soon..."]);
      setTimeout(() => {
        onSetShowCrystal(true);
        onSetShowBeacon(true);
        setTimeout(() => onSetShowBeacon(false), 3000);
      }, Math.random() * 30000);
    }
  }

  //Buy Hover Drone Function
  onBuyHoverDrone = () => {
    if (credits >= 20 && !creditStoreItems['Hover Drone']) {
      onSetCredits(prev => prev - 20);
      onSetCreditStoreItems(prev => {
        const newItems = { ...prev, 'Hover Drone': true };
        localStorage.setItem('creditStoreItems', JSON.stringify(newItems));
        return newItems;
      });
      onSetCraftingInventory(prev => ({
        ...prev,
        'Hover Drone': 1
      }));
      onSetNotification(prev => [...prev, "Hover Drone Addon purchased! Floating trash will last longer."]);
      window.dispatchEvent(new CustomEvent('nextNews', { 
        detail: { message: "A new drone takes to the skies, extending the life of your floating opportunities." }
      }));
    }
  }

  //Buy Booster Function
  onBuyBooster= () => {
    if (credits >= 60 && !creditStoreItems['Crafting Booster Unit']) {
      onSetCredits(prev => prev - 60);
      onSetCreditStoreItems(prev => {
        const newItems = { ...prev, 'Crafting Booster Unit': true };
        localStorage.setItem('creditStoreItems', JSON.stringify(newItems));
        return newItems;
      });
      onSetCraftingInventory(prev => ({
        ...prev,
        'Crafting Booster Unit': 1
      }));
      onSetNotification(prev => [...prev, "Crafting Booster Unit purchased! Basic crafting costs reduced by 10%"]);
      window.dispatchEvent(new CustomEvent('nextNews', { 
        detail: { message: "Your crafting operations just got more efficient!" }
      }));
    }
  }

  //Buy Reclaimer Function
  onBuyReclaimer=() => {
    const hasAutoClickerBot = autoClicks > 0; 

    if (!hasAutoClickerBot) {
      onSetNotification(prev => [...prev, "You need to own at least one automation helper to use the Ascension Reclaimer!"]);
      return;
    }

    if (credits >= 90 && (craftingInventory['Ascension Reclaimer'] || 0) < 2) {
      onSetCredits(prev => prev - 90);  
      onSetCraftingInventory(prev => ({
        ...prev,
        'Ascension Reclaimer': (prev['Ascension Reclaimer'] || 0) + 1 
      }));

      const automationHelpers = [
        'Auto Clicker Bot'
      ];

      const currentPreserved = localStorage.getItem('preservedHelper') || '';
      let randomHelper = automationHelpers[Math.floor(Math.random() * automationHelpers.length)];

      // Make sure second helper is different from first
      if (currentPreserved && randomHelper === currentPreserved) {
        randomHelper = automationHelpers.find(h => h !== currentPreserved) || randomHelper;
      }

      onSetPreservedHelper(currentPreserved ? `${currentPreserved}, ${randomHelper}` : randomHelper);
      localStorage.setItem('preservedHelper', currentPreserved ? `${currentPreserved}, ${randomHelper}` : randomHelper);

      onSetNotification(prev => [...prev, `Ascension Reclaimer purchased! ${randomHelper} will be preserved after prestige.`]);
      window.dispatchEvent(new CustomEvent('nextNews', { 
        detail: { message: `Energy shield activated: ${randomHelper} locked in for preservation.` }
      }));
    }
  }

  return (
    <div className="store-container">
      <div className="store-header">
        <h2>Credit Store</h2>
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

        <button
          onClick={() => {
            if (credits >= 200) {
              onSetCredits(prev => prev - 200);
              useCrystalZustand.getState().setHasChronoCrystalTimer(true);
              onSetNotification(prev => [...prev, "Chrono Crystal Timer purchased! You can now see when the next crystal will appear."]);
            }
          }}
          disabled={credits < 200 || useCrystalZustand.getState().hasChronoCrystalTimer}
          className="store-item"
        >
          <div className="item-header">
            <strong>⌛ Chrono Crystal Timer</strong>
          </div>
          <div>200 Credits</div>
          <div className="item-info">
            A high-tech device that tracks and displays the countdown for the next Flying Crystal to appear.
            Uses Junk-Time Synergies to feel when the next Crystal is approaching.
          </div>
        </button>

        <button
          onClick={() => {
            if (credits >= 150 && !localStorage.getItem('bigSlots')) {
              onSetCredits(prev => prev - 150);
              localStorage.setItem('bigSlots', 'true');
              onSetNotification(prev => [...prev, "Big Slots activated! The slot machine has been upgraded."]);
              window.dispatchEvent(new CustomEvent('nextNews', { 
                detail: { message: "The slots just got bigger... and riskier." }
              }));
            }
          }}
          disabled={credits < 150 || localStorage.getItem('bigSlots')}
          className="store-item"
        >
          <div className="item-header">
            <strong>🖥️ Big Slots</strong>
            <span>150 Credits</span>
          </div>
          <div className="item-info">
            Now with 50% more screen real estate... and danger.
            Enlarges the slot machine window and improves visual feedback.
            Cost per spin: 1,000,000 Junk
            <p>Bigger reels. Bigger risks. Bigger... maybe wins?</p>
          </div>
        </button>

        {localStorage.getItem('bigSlots') === 'true' && craftingInventory['Luck Engine'] && (
          <button
            onClick={() => {
              if (credits >= 300 && !localStorage.getItem('ultimateSlots')) {
                onSetCredits(prev => prev - 300);
                localStorage.setItem('ultimateSlots', 'true');
                onSetNotification(prev => [...prev, "Ultimate Slots activated! The machine... it's alive?"]);
                window.dispatchEvent(new CustomEvent('nextNews', { 
                  detail: { message: "A sentient slot machine emerges from the scrap..." }
                }));
              }
            }}
            disabled={credits < 300 || localStorage.getItem('ultimateSlots')}
            className="store-item"
          >
            <div className="item-header">
              <strong>🎰 Ultimate Slots</strong>
              <span>300 Credits</span>
            </div>
            <div className="item-info">
              <p>The final evolution of risk and reward.</p>
              <p>Cost per spin: 10,000,000 Junk or 1 Electro Shard</p>
              <p>A glitched-out masterpiece of dubious engineering.</p>
              <p style={{color: '#ff00ff'}}>{"<ERROR: CONSCIOUSNESS_DETECTED>"}</p>
            </div>
          </button>
        )}
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