import React, { useState } from 'react';

import { useCrystalZustand } from '../utils/crystalZustand';

export default function CredStore({ credits, junk, craftingInventory, onBuyHoverDrone, onBuyBooster, onBuyReclaimer, autoClicks, onBack, creditStoreItems, onSetCredits, onSetJunk, onSetNotification, onSetBeaconCount, onSetShowBeacon, onSetCreditStoreItems, onSetShowCrystal, onSetCraftingInventory, onSetPreservedHelper }) {
  const [selectedTab, setSelectedTab] = useState("basic");

  // 100,000 junk = 1 credit
  const baseRate = 10000000; 

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

  const basicItems = [
    {
      name: "💲 Basic Exchange",
      cost: baseRate,
      description: "Sell Junk for Scratz",
      info: `Sell ${formatAmount(baseRate)} Junk for 1 Scratz. Convert your excess junk into valuable scratz at the standard exchange rate. Perfect for small transactions.`,
      action: () => onSellJunk(baseRate),
      disabled: junk < baseRate,
      creditsName: "1 Scratz",
    },
    {
      name: "💲 Bulk Exchange (10x)",
      cost: baseRate * 10,
      description: "Sell Junk for Scratz",
      info: `Sell ${formatAmount(baseRate * 10)} Junk for 10 Scratz. A more efficient way to exchange larger amounts of junk. Save time by converting in bulk!`,
      action: () => onSellJunk(baseRate * 10),
      disabled: junk < baseRate * 10,
      creditsName: "10 Scratz",
    },
    {
      name: "💲 Mass Exchange (100x)",
      cost: baseRate * 100,
      description: "Sell Junk for Scratz",
      info: `Sell ${formatAmount(baseRate * 100)} Junk for 100 Scratz. The ultimate exchange option for serious junk collectors. Perfect for large-scale operations.`,
      action: () => onSellJunk(baseRate * 100),
      disabled: junk < baseRate * 100,
      creditsName: "100 Scratz",
    },
    {
      name: "⚡ Electro Shard Beacon",
      cost: 25,
      description: "Reduces Electro Shard spawn cooldown",
      info: `Reduces Electro Shard spawn cooldown by 1% (Max 10). A mysterious device that creates an electromagnetic field, attracting Electro Shards more frequently. Stack up to 10 beacons for a maximum 10% reduction in spawn time. Current beacons: ${localStorage.getItem('beaconCount') || 0}/10`,
      action: () => onBuyBeacon(),
      disabled: credits < 25 || localStorage.getItem('beaconCount') >= 10,
      creditsName: "25 Scratz",
      maxLimit: localStorage.getItem('beaconCount') >= 10
    },
    {
      name: "🔧 Crafting Booster Unit",
      cost: 60,
      description: "-10% crafting costs on basic recipes",
      info: "An efficient processing unit that optimizes your crafting operations. One-time purchase.",
      action: () => onBuyBooster(),
      disabled: credits < 60 || craftingInventory['Crafting Booster Unit'],
      creditsName: "60 Scratz",
    },
    {
      name: "🚁 Hover Drone Addon",
      cost: 20,
      description: "Floating Trash lasts +5s longer",
      info: "A sleek aerial companion that helps extend the lifespan of floating trash bonuses. One-time purchase.",
      action: () => onBuyHoverDrone(),
      disabled: credits < 20 || creditStoreItems['Hover Drone'],
      creditsName: "20 Scratz",
    },
    {
      name: "⌛ Chrono Crystal Timer",
      cost: 200,
      description: "Tracks and displays the countdown for the next Flying Crystal",
      info: "A high-tech device that tracks and displays the countdown for the next Flying Crystal to appear. Uses Junk-Time Synergies to feel when the next Crystal is approaching.",
      action: () => {
        if (credits >= 200) {
          onSetCredits(prev => prev - 200);
          useCrystalZustand.getState().setHasChronoCrystalTimer(true);
          onSetNotification(prev => [...prev, "Chrono Crystal Timer purchased! You can now see when the next crystal will appear."]);
        }
      },
      disabled: credits < 200 || useCrystalZustand.getState().hasChronoCrystalTimer,
      creditsName: "200 Scratz",
    },
    {
      name: "🖥️ Big Slots",
      cost: 150,
      description: "Enlarges the slot machine window and improves visual feedback.",
      info: "Now with 50% more screen real estate... and danger. Enlarges the slot machine window and improves visual feedback. Cost per spin: 1,000,000 Junk. Bigger reels. Bigger risks. Bigger... maybe wins?",
      action: () => {
        if (credits >= 150 && !localStorage.getItem('bigSlots')) {
          onSetCredits(prev => prev - 150);
          localStorage.setItem('bigSlots', 'true');
          onSetNotification(prev => [...prev, "Big Slots activated! The slot machine has been upgraded."]);
          window.dispatchEvent(new CustomEvent('nextNews', { 
            detail: { message: "The slots just got bigger... and riskier." }
          }));
        }
      },
      disabled: credits < 150 || localStorage.getItem('bigSlots'),
      creditsName: "150 Scratz",
    },
    {
      name: "📦 Signal Expander",
      cost: 750,
      description: "Increases max profiles in Signal Sort from 8 → 10",
      info: "More frequencies, more faces. Sometimes two extra choices make all the difference. Permanently increases the maximum profiles shown during the Signal Sort recruitment minigame.",
      action: () => {
        if (credits >= 750 && !localStorage.getItem('signal_expander_purchased')) {
          onSetCredits(prev => prev - 750);
          localStorage.setItem('signal_expander_purchased', 'true');
          onSetNotification(prev => [...prev, "Signal Expander installed! Recruitment games now show 10 profiles instead of 8."]);
          window.dispatchEvent(new CustomEvent('nextNews', { 
            detail: { message: "Signal reception improved. More candidates detected." }
          }));
        }
      },
      disabled: credits < 750 || localStorage.getItem('signal_expander_purchased') || !localStorage.getItem('prestige1Unlocked'),
      creditsName: "750 Scratz",
    },
    {
      name: "🔄 Auto Slotter",
      cost: 100,
      description: "Automatically spins the slot machine every 15 seconds",
      info: "Automatically spins the slot machine every 15 seconds. Works even when the slot machine window is closed. Let the machine gamble for you while you focus on other tasks",
      action: () => {
        if (credits >= 100 && !localStorage.getItem('autoSlotter')) {
          onSetCredits(prev => prev - 100);
          localStorage.setItem('autoSlotter', 'true');
          onSetNotification(prev => [...prev, "Auto Slotter purchased! The slot machine can now spin automatically."]);
          window.dispatchEvent(new CustomEvent('nextNews', { 
            detail: { message: "Automation comes to the gambling den..." }
          }));
        }
      },
      disabled: credits < 100 || localStorage.getItem('autoSlotter'),
      creditsName: "100 Scratz",
    },
    {
      name: "⚙️ Expanded Junk Capacities",
      cost: 200,
      description: "Auto Recycler produces 5 basic materials every 30s, increases junk requirement to 15k/sec",
      info: "Upgrades your Auto Recycler units to also produce basic materials (Wires, Metal Plates, Gear Bits) - 5 materials every 30 seconds. Increases junk consumption requirement to 15,000 per second per unit.",
      action: () => {
        if (credits >= 200 && !localStorage.getItem('expandedJunkCapacities')) {
          onSetCredits(prev => prev - 200);
          localStorage.setItem('expandedJunkCapacities', 'true');
          onSetNotification(prev => [...prev, "Expanded Junk Capacities purchased! Auto Recyclers now produce basic materials."]);
          window.dispatchEvent(new CustomEvent('nextNews', { 
            detail: { message: "Your recycling operations have been enhanced with material production capabilities." }
          }));
        }
      },
      disabled: credits < 200 || localStorage.getItem('expandedJunkCapacities'),
      creditsName: "200 Scratz",
      hide: !craftingInventory['Auto Recycler Unit'] || (craftingInventory['Auto Recycler Unit'] || 0) === 0,
    },
    {
      name: "🗑️ Graffitied Tribute Bin",
      cost: 200,
      description: "+20% global Junk/sec boost",
      info: "An old industrial scrap bin, warped by time and scorched at the base. But its real value lies in the layers of graff—each tag a name lost to the alleys and backzones of the Junk Grid. Some were burners. Some were just loud. The system remembers them through this shrine to thrown-away brilliance. Tagged by legends. Dumped by all. But it never stops grinding.",
      action: () => {
        if (credits >= 200 && !localStorage.getItem('graffitiedTributeBin')) {
          onSetCredits(prev => prev - 200);
          localStorage.setItem('graffitiedTributeBin', 'true');
          onSetCraftingInventory(prev => ({
            ...prev,
            'Graffitied Tribute Bin': 1
          }));
          onSetNotification(prev => [...prev, "Graffitied Tribute Bin purchased! +20% global Junk/sec boost activated."]);
          window.dispatchEvent(new CustomEvent('nextNews', { 
            detail: { message: "A shrine to forgotten legends now boosts your operations from the shadows." }
          }));
        }
      },
      disabled: credits < 200 || localStorage.getItem('graffitiedTributeBin'),
      creditsName: "200 Scratz",
    },
  ];

  const firstPrestigeItems = [
    {
      name: "🛡️ Ascension Reclaimer",
      cost: 90,
      description: "Keep 1 random helper or crafting bonus after Prestige.",
      info: `Keep 1 random helper or crafting bonus after Prestige. Energy shield technology that preserves automation through ascension. Can be purchased twice. (${(craftingInventory['Ascension Reclaimer'] || 0)}/2)`,
      action: () => {
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
      },
      disabled: credits < 90 || (craftingInventory['Ascension Reclaimer'] || 0) >= 2 || autoClicks === 0,
      creditsName: "90 Scratz",
      title: autoClicks === 0 ? "You need to own at least one automation helper to use the Ascension Reclaimer!" : ""
    },
    {
      name: "⚡ Shard Extractor",
      cost: 75,
      description: "Forces a crystal shard to spawn within 30 seconds",
      info: "Forces a crystal shard to spawn within 30 seconds. 15 minute cooldown between uses",
      action: () => onBuyShardExtractor(),
      disabled: credits < 75 || creditStoreItems['lastShardExtractorUse'] > Date.now() - 900000,
      creditsName: "75 Scratz",
      cooldown: creditStoreItems['lastShardExtractorUse'] > Date.now() - 900000 ? Math.ceil((900000 - (Date.now() - creditStoreItems['lastShardExtractorUse'])) / 60000) : 0
    },
    {
      name: "🎰 Ultimate Slots",
      cost: 300,
      description: "The final evolution of risk and reward.",
      info: "The final evolution of risk and reward. Cost per spin: 10,000,000 Junk or 1 Electro Shard. A glitched-out masterpiece of dubious engineering. <ERROR: CONSCIOUSNESS_DETECTED>",
      action: () => {
        if (credits >= 300 && !localStorage.getItem('ultimateSlots')) {
          onSetCredits(prev => prev - 300);
          localStorage.setItem('ultimateSlots', 'true');
          onSetNotification(prev => [...prev, "Ultimate Slots activated! The machine... it's alive?"]);
          window.dispatchEvent(new CustomEvent('nextNews', { 
            detail: { message: "A sentient slot machine emerges from the scrap..." }
          }));
        }
      },
      disabled: credits < 300 || localStorage.getItem('ultimateSlots'),
      creditsName: "300 Scratz",
      hide: localStorage.getItem('bigSlots') !== 'true' || !craftingInventory['Luck Engine']
    },
  ];

  const tabs = [
    { id: "basic", label: "Basic" },
    { 
      id: "firstPrestige", 
      label: "First Ascension",
      unlockCondition: () => localStorage.getItem("hasPrestiged") === "true",
    },
  ];

  return (
    <div className="store-container">
      <div className="store-header">
        <h2>Scratz Store</h2>
        <button onClick={onBack}>Close</button>
      </div>

      <div className="crafting-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${selectedTab === tab.id ? "active" : ""} ${tab.unlockCondition && !tab.unlockCondition() ? "locked" : ""}`}
            onClick={() =>
              (!tab.unlockCondition || tab.unlockCondition()) &&
              setSelectedTab(tab.id)
            }
            disabled={tab.unlockCondition && !tab.unlockCondition()}
          >
            {tab.label} {tab.unlockCondition && !tab.unlockCondition() && "🔒"}
          </button>
        ))}
      </div>

      <div className="store-items">
        {selectedTab === "basic" && basicItems.filter(item => !item.hide).map((item) => (
          <button
            key={item.name}
            onClick={item.action}
            disabled={item.disabled}
            className="store-item"
            title={item.title}
          >
            <div className="item-header">
              <strong>{item.name}</strong>
            </div>
            <div>{item.creditsName}</div>
            <div className="item-info">
              <p>{item.description}</p>
              {item.maxLimit && 
                <p className="max-limit">Maximum beacons reached!</p>
              }
              <p>{item.info}</p>
            </div>
          </button>
        ))}

        {selectedTab === "firstPrestige" && localStorage.getItem("hasPrestiged") === "true" && firstPrestigeItems.map((item) => {
          if (item.hide) return null;
          return (
            <button
              key={item.name}
              onClick={item.action}
              disabled={item.disabled}
              className={`store-item ${item.disabled ? 'uncraftable' : ''}`}
              title={item.title}
            >
              <div className="item-header">
                <strong>{item.name}</strong>
              </div>
              <div>{item.creditsName}</div>
              <div className="item-info">
                <p>{item.description}</p>
                {item.cooldown > 0 && 
                  <p className="cooldown">Available in: {item.cooldown}m</p>
                }
                <p>{item.info}</p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  );
}