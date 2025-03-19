
import React from 'react';

export default function Store({ credits, itemCosts, onBuyTrashBag, onBuyPicker, onBuyStreetrat, onBuyCart, onBuyJunkMagnet, onBuyUrbanRecycler, onBack }) {
  const items = [
    { 
      name: 'Scrap Bag', 
      cost: itemCosts.trashBag, 
      description: '+1 Junk/Click, +10% Cost per purchase', 
      info: 'A sturdy bag that helps you collect more junk with each click',
      action: onBuyTrashBag 
    },
    { 
      name: 'Trash Picker', 
      cost: itemCosts.trashPicker, 
      description: '+3 Junk/Click, +10% Cost', 
      info: 'Professional tool that triples your junk collection efficiency',
      action: onBuyPicker 
    },
    { 
      name: 'Streetrat', 
      cost: itemCosts.streetrat, 
      description: '+1 Junk/sec, +15% Cost', 
      info: 'Hire a local to automatically collect junk for you',
      action: onBuyStreetrat 
    },
    { 
      name: 'Shopping Cart', 
      cost: itemCosts.cart, 
      description: '+5 Junk/sec, +15% Cost', 
      info: 'Large capacity cart that greatly increases automatic collection',
      action: onBuyCart 
    },
    { 
      name: 'Junk Magnet', 
      cost: itemCosts.junkMagnet || 1500, 
      description: '+10 Junk/sec, +15% Cost', 
      info: 'A powerful magnet that attracts junk from all directions',
      action: onBuyJunkMagnet 
    },
    { 
      name: 'Urban Recycler', 
      cost: itemCosts.urbanRecycler || 3000, 
      description: '+20 Junk/sec, +15% Cost', 
      info: 'Advanced automated system that scans and collects valuable junk',
      action: onBuyUrbanRecycler
      
    }
  ];

  return (
    <div className="store-container">
      <h2>Junk Store</h2>
      <div className="store-items">
        {items.map((item) => (
          <button
            key={item.name}
            onClick={item.action}
            disabled={credits < item.cost}
            className="store-item"
          >
            Buy {item.name} ({item.cost} Junk)
            <div className="item-info">
              <strong>{item.name}</strong>
              <p>{item.description}</p>
              <p>{item.info}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
