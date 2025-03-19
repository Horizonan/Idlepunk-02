import React, { useState, useEffect } from 'react';

export default function Store({ credits, itemCosts, onBuyTrashBag, onBuyPicker, onBuyStreetrat, onBuyCart, onBuyJunkMagnet, onBuyUrbanRecycler, onBuyClickEnhancer, onBuyScrapDrone, clickCount, purchasedUpgrades, onBack, ownedItems, updateOwnedItems, passiveIncome }) {
  const showClickEnhancer = purchasedUpgrades >= 3 || clickCount >= 1000;
  const items = [
    { 
      name: 'Scrap Bag', 
      cost: itemCosts.trashBag, 
      description: '+1 Junk/Click, +10% Cost per purchase', 
      info: 'A sturdy bag that helps you collect more junk with each click',
      action: () => onBuyTrashBag('trashBag'), 
      purchasedCount: ownedItems.trashBag || 0 
    },
    { 
      name: 'Trash Picker', 
      cost: itemCosts.trashPicker, 
      description: '+3 Junk/Click, +10% Cost', 
      info: 'Professional tool that triples your junk collection efficiency',
      action: () => onBuyPicker('trashPicker'), 
      purchasedCount: ownedItems.trashPicker || 0 
    },
    { 
      name: 'Streetrat', 
      cost: itemCosts.streetrat, 
      description: '+1 Junk/sec, +15% Cost', 
      info: 'Hire a local to automatically collect junk for you',
      action: () => onBuyStreetrat('streetrat'), 
      purchasedCount: ownedItems.streetrat || 0 
    },
    { 
      name: 'Shopping Cart', 
      cost: itemCosts.cart, 
      description: '+5 Junk/sec, +15% Cost', 
      info: 'Large capacity cart that greatly increases automatic collection',
      action: () => onBuyCart('cart'), 
      purchasedCount: ownedItems.cart || 0 
    },
    { 
      name: 'Junk Magnet', 
      cost: itemCosts.junkMagnet, 
      description: '+10 Junk/sec, +15% Cost', 
      info: 'A powerful magnet that attracts junk from all directions',
      action: () => onBuyJunkMagnet('junkMagnet'), 
      purchasedCount: ownedItems.junkMagnet || 0 
    },
    ...(showClickEnhancer ? [{
      name: 'Click Enhancer I',
      cost: itemCosts.clickEnhancer,
      description: '+10 Junk/Click, +10% Cost',
      info: 'Enhances your clicking power significantly',
      action: () => onBuyClickEnhancer('clickEnhancer'), 
      purchasedCount: ownedItems.clickEnhancer || 0 
    }] : []),
    { 
      name: 'Urban Recycler', 
      cost: itemCosts.urbanRecycler, 
      description: '+20 Junk/sec, +15% Cost', 
      info: 'Advanced automated system that scans and collects valuable junk',
      action: () => onBuyUrbanRecycler('urbanRecycler'), 
      purchasedCount: ownedItems.urbanRecycler || 0 
    },
    { 
      name: 'Scrap Drone',
      cost: itemCosts.scrapDrone,
      description: '+25 Junk/sec, +15% Cost',
      info: 'Autonomous flying collector that scans the area for valuable materials',
      action: () => onBuyScrapDrone('scrapDrone'),
      purchasedCount: ownedItems.scrapDrone || 0,
      unlockCondition: passiveIncome >= 100 || purchasedUpgrades >= 5
    }
  ];

  return (
    <div className="store-container">
      <h2>Junk Store</h2>
      <div className="store-items">
        {items.map((item) => (
          <button
            key={item.name}
            onClick={() => {item.action(); updateOwnedItems(item.name)}} 
            disabled={credits < item.cost || (item.unlockCondition && !item.unlockCondition)}
            className="store-item"
          >
            Buy {item.name} ({item.cost} Junk)
            <div className="item-info">
              <strong>{item.name}</strong>
              <p>{item.description}</p>
              <p>{item.info}</p>
              <p className="owned">Owned: {item.purchasedCount}</p> 
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}