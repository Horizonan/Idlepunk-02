
import React from 'react';
import '../App.css';

export default function ItemInventory({ craftingInventory, onBack }) {
  const itemDetails = {
    'Click Rig Mk I': {
      description: 'Advanced clicking mechanism',
      effect: 'Increases click power by 25%',
      icon: '🔧'
    },
    'Auto Toolkit': {
      description: 'Collection of automated tools',
      effect: 'Increases Auto Click efficiency by 25%',
      icon: '⚙️'
    },
    'Compression Pack': {
      description: 'Advanced storage solution',
      effect: 'Increases Junk/sec by 25%',
      icon: '📦'
    },
    'Reinforced Backpack': {
      description: 'Heavy-duty storage pack',
      effect: 'Reduces cost scaling by 1% permanently',
      icon: '🎒'
    },
    'Surge Capacitor Module': {
      description: 'Power surge enhancement device',
      effect: 'Increases Trash Surge duration from 5s → 10s',
      icon: '⚡'
    }
  };

  const craftedItems = Object.entries(craftingInventory)
    .filter(([name]) => itemDetails[name]);

  return (
    <div className="store-container inventory-container">
      <h2 className="inventory-header">Item Inventory</h2>
      <div className="inventory-grid">
        {craftedItems.map(([name]) => (
          <div key={name} className="inventory-item">
            <div className="item-icon">{itemDetails[name].icon}</div>
            <div className="item-content">
              <div className="item-name">{name}</div>
              <div className="item-description">{itemDetails[name].description}</div>
              <div className="item-effect">{itemDetails[name].effect}</div>
            </div>
          </div>
        ))}
      </div>
      <button onClick={onBack} className="back-button">Back</button>
    </div>
  );
}
