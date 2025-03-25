import React from 'react';


export default function Store({ credits, itemCosts, ownedItems, onBuyTrashBag, onBuyPicker, onBuyStreetrat, onBuyCart, onBuyJunkMagnet, onBuyUrbanRecycler, onBuyScrapDrone, onBuyHoloBillboard, clickCount, purchasedUpgrades, onBack, passiveIncome, onBuyClickEnhancer, globalJpsMultiplier }) {
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

  return (
    <div className="store-container">
      <div className="store-header">
        <h2>Junk Store</h2>
        <button onClick={onBack}>Close</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
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
      </div>
      
    </div>
  );
}