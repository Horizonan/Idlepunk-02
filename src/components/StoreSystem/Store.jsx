import React, { useState } from 'react';
import './Store.css';

export default function Store({ credits, itemCosts, ownedItems, craftingInventory, onBuyTrashBag, onBuyPicker, onBuyStreetrat, onBuyCart, onBuyJunkMagnet, onBuyUrbanRecycler, onBuyScrapDrone, onBuyHoloBillboard, onBuyJunkRefinery, onBuyShardMiner, globalJpsMultiplier, passiveIncome, onBuyClickEnhancer, clickCount, purchasedUpgrades, onBuyAutoClicker, onGetAutoClickersV1, canAffordV1, canAffordV2, onGetAutoClickersV2, onBuyAutoClickerV2, onBack }) {
  const [selectedTab, setSelectedTab] = useState('prePres');
  const [activeTab, setActiveTab] = useState('prePres'); // Added state for premium tab

  const showClickEnhancer = purchasedUpgrades >= 3 || clickCount >= 1000;

  const clickItems = [
    { 
      name: 'Scrap Bag', 
      cost: itemCosts.trashBag, 
      description: '+1 Junk/Click, +10% Cost per purchase', 
      info: 'A sturdy bag that helps you collect more junk with each click',
      action: onBuyTrashBag,
      purchasedCount: ownedItems.trashBag || 0 
    },
    { 
      name: 'Trash Picker', 
      cost: itemCosts.trashPicker, 
      description: '+3 Junk/Click, +10% Cost', 
      info: 'Professional tool that triples your junk collection efficiency',
      action: onBuyPicker,
      purchasedCount: ownedItems.trashPicker || 0 
    }
  ];

  if (showClickEnhancer) {
    clickItems.push({
      name: 'Click Enhancer',
      cost: itemCosts.clickEnhancer,
      description: '+10 Junk/Click, +10% Cost',
      info: 'Cybernetic finger enhancements for maximum clicking efficiency',
      action: onBuyClickEnhancer,
      purchasedCount: ownedItems.clickEnhancer || 0
    });
  }

  const passiveItems = [
    { 
      name: 'Streetrat', 
      cost: itemCosts.streetrat, 
      description: `+${Math.floor(1 * globalJpsMultiplier)} Junk/sec, +15% Cost`,
      info: 'Hire a local to automatically collect junk for you',
      action: onBuyStreetrat,
      purchasedCount: ownedItems.streetrat || 0 
    },
    { 
      name: 'Shopping Cart', 
      cost: itemCosts.cart, 
      description: `+${Math.floor(5 * globalJpsMultiplier)} Junk/sec, +15% Cost`, 
      info: 'Large capacity cart that greatly increases automatic collection',
      action: onBuyCart,
      purchasedCount: ownedItems.cart || 0 
    },
    { 
      name: 'Junk Magnet', 
      cost: itemCosts.junkMagnet, 
      description: `+${Math.floor(10 * globalJpsMultiplier)} Junk/sec, +15% Cost`, 
      info: 'Electromagnetic device that attracts valuable junk automatically',
      action: onBuyJunkMagnet,
      purchasedCount: ownedItems.junkMagnet || 0 
    },
    { 
      name: 'Urban Recycler', 
      cost: itemCosts.urbanRecycler, 
      description: `+${Math.floor(20 * globalJpsMultiplier)} Junk/sec, +15% Cost`, 
      info: 'Automated system that processes urban waste into valuable junk',
      action: onBuyUrbanRecycler,
      purchasedCount: ownedItems.urbanRecycler || 0 
    },
    { 
      name: 'Scrap Drone', 
      cost: itemCosts.scrapDrone, 
      description: `+${Math.floor(25 * globalJpsMultiplier)} Junk/sec, +15% Cost`, 
      info: 'Autonomous drone that scans the area for valuable junk',
      action: onBuyScrapDrone,
      purchasedCount: ownedItems.scrapDrone || 0 
    },{
      name: 'Holo Billboard',
        cost: itemCosts.holoBillboard || 15000,
        description: '+10% global Junk/sec boost',
        info: 'A massive holographic display that attracts more scrappers to your territory',
        action: onBuyHoloBillboard,
        purchasedCount: ownedItems.holoBillboard || 0,
        hidden: !(passiveIncome >= 50 || (ownedItems.scrapDrone && ownedItems.scrapDrone > 0))
      }

  ];

  const tabs = [
    { id: 'prePres', label: 'Pre-Prestige' },
    { id: 'premium', label: 'Premium' },
    { id: 'automation', label: 'Automation' },
    { id: 'firstAsc', label: 'First Ascension', unlockCondition: () => localStorage.getItem('hasPrestiged') === 'true' }
  ];

  const premiumItems = [
    {
      name: 'Shard Miner',
      cost: { junk: 10000000, scrapCores: 5 },
      description: 'Passively generates 1 Electro Shard every 30 minutes, up to a max of 3 stored.',
      info: 'A glorified toaster tuned to the shard frequency. Hums when it works.',
      unlockCondition: () => credits >= 10000000 && (craftingInventory?.['Scrap Core'] || 0) >= 5,
      purchasedCount: ownedItems.shardMiner || 0,
      action: onBuyShardMiner
    }
  ];


  
  //Automation Menu
  const automationItems = [
    {
      name: 'Auto Clicker Bot',
      cost: { junk: itemCosts.autoClicker},
      description: '+1 Automatic Click per second (counts towards manual clicks)',
      disabled: !canAffordV1,
      unlockCondition: () => true,
      purchasedCount: onGetAutoClickersV1,
      action: onBuyAutoClicker
      },
    {
      name: 'Auto Clicker Bot V2',
      cost: { junk: itemCosts.autoClickerV2},
      description: 'Auto Clicker Bot v2.0 – Upgraded to 2 clicks/sec. Now 12% less annoying.',
      disabled: !canAffordV2,
      unlockCondition: () => onGetAutoClickersV1 > 1,
      purchasedCount: onGetAutoClickersV2,
      action: onBuyAutoClickerV2
      }
    
  ];



  

  return (
    <div className="store-container">
      <div className="store-header">
        <h2>Junk Store</h2>
        <button onClick={onBack}>Close</button>
      </div>
      <div className="crafting-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${selectedTab === tab.id ? 'active' : ''} ${tab.unlockCondition && !tab.unlockCondition() ? 'locked' : ''}`}
            onClick={() => (!tab.unlockCondition || tab.unlockCondition()) && setSelectedTab(tab.id)}
            disabled={tab.unlockCondition && !tab.unlockCondition()}
          >
            {tab.label} {tab.unlockCondition && !tab.unlockCondition() && '🔒'}
          </button>
        ))}
      </div>
      <div className="store-items">
        {selectedTab === 'prePres' && (
          <>
            <div>
              <h3 style={{ color: '#9400D3', textAlign: 'center' }}>Click Upgrades</h3>
              <div className="store-items">
                {clickItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={item.action}
                    disabled={credits < item.cost}
                    className="store-item"
                  >
                    <div className="item-header">
                      <strong>{item.name}</strong>
                      <span className="cost">({item.cost} Junk)</span>
                    </div>
                    <div className="item-info">
                      <p>{item.description}</p>
                      <p>{item.info}</p>
                      <p className="owned">Owned: {item.purchasedCount}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 style={{ color: '#9400D3', textAlign: 'center' }}>Passive Upgrades</h3>
              <div className="store-items">
                {passiveItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={item.action}
                    disabled={credits < item.cost}
                    className="store-item"
                  >
                    <div className="item-header">
                      <strong>{item.name}</strong>
                      <span className="cost">({item.cost} Junk)</span>
                    </div>
                    <div className="item-info">
                      <p>{item.description}</p>
                      <p>{item.info}</p>
                      <p className="owned">Owned: {item.purchasedCount}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
        {selectedTab === 'automation' && ( // Render Automationitems
          <div className="store-category">
            <h3>Automation Items</h3>
            {automationItems.map((item) => (
              <button
                key={item.name}
                onClick={item.action}
                disabled={!item.unlockCondition || credits < item.cost.junk || ownedItems.scrapCores < item.cost.scrapCores}
                className="store-item"
              >
                <div className="item-header">
                  <strong>{item.name} </strong>
                  <span className="cost"> ({item.cost.junk} Junk)</span>
                </div>
                <div className="item-info">
                  <p>{item.description}</p>
                  <p>{item.info}</p>
                  <p className="owned">Owned: {item.purchasedCount}</p>
                </div>
              </button>
            ))}
          </div>
        )}
        {selectedTab === 'premium' && ( // Render Premium items
          <div className="store-category">
            <h3>Premium Items</h3>
            {premiumItems.map((item) => (
              <button
                key={item.name}
                onClick={item.action}
                disabled={!item.unlockCondition || credits < item.cost.junk || ownedItems.scrapCores < item.cost.scrapCores}
                className="store-item"
              >
                <div className="item-header">
                  <strong>{item.name}</strong>
                  <span className="cost">({item.cost.junk} Junk + {item.cost.scrapCores} Scrap Cores)</span>
                </div>
                <div className="item-info">
                  <p>{item.description}</p>
                  <p>{item.info}</p>
                  <p className="owned">Owned: {item.purchasedCount}</p>
                </div>
              </button>
            ))}
          </div>
        )}
        {selectedTab === 'firstAsc' && localStorage.getItem('hasPrestiged') === 'true' && (
          <div className="store-category">
            <h3>First Ascension</h3>
            <button
              onClick={() => {
                if (credits >= 2500000 && !localStorage.getItem('modularScrapperPurchased')) {
                setJunk(prev => prev - 2500000);  
                passiveIncome(prev => prev * 2);
                  localStorage.setItem('modularScrapperPurchased', 'true');
                  setNotifications(prev => [...prev, "Modular Scrapper Rig installed! Junk/sec doubled!"]);
                  window.dispatchEvent(new CustomEvent('nextNews', { 
                    detail: { message: "Cogfather: Now that's what I call an upgrade. Your operation just got serious." }
                  }));
                }
              }}
              disabled={credits < 2500000 || localStorage.getItem('modularScrapperPurchased')}
              className="store-item"
            >
              <div className="item-header">
                <strong>🔹 Modular Scrapper Rig</strong>
                <span className="cost">(2.5M Junk)</span>
              </div>
              <div className="item-info">
                <p>Doubles current Junk/sec</p>
                <p>One-time purchase per prestige</p>
                <p className="owned">Owned: {localStorage.getItem('modularScrapperPurchased') ? '1' : '0'}</p>
              </div>
            </button>
            <button
              className={`store-item ${credits < (itemCosts.junkRefinery || 500000) ? 'disabled' : ''}`}
              onClick={onBuyJunkRefinery}
              disabled={credits < (itemCosts.junkRefinery || 500000)}
            >
              <div className="item-header">
                <strong>🔹 Junk Refinery</strong>
              </div>
              <div>{itemCosts.junkRefinery || 500000} Junk</div>
              <div className="item-info">
                <p>+50 Junk/sec</p>
                <p>Owned: {ownedItems.junkRefinery || 0}</p>
                A high-tech facility that processes junk more efficiently.
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}