
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
    },
    'Stabilized Capacitor': {
      description: 'A perfectly stabilized energy storage unit',
      effect: 'Required for advanced crafting',
      icon: '🔋'
    },
    'Voltage Node': {
      description: 'Crystallized electrical potential',
      effect: 'Required for advanced crafting',
      icon: '⚡'
    },
    'Synthcore Fragment': {
      description: 'Piece of a mysterious power source',
      effect: 'Required for advanced crafting',
      icon: '💠'
    }
  };

  const specialItems = ['Stabilized Capacitor', 'Voltage Node', 'Synthcore Fragment'];
  
  const craftedItems = Object.entries(craftingInventory)
    .filter(([name]) => itemDetails[name] && !specialItems.includes(name));

  const specialMaterials = Object.entries(craftingInventory)
    .filter(([name]) => specialItems.includes(name));

  return (
    <div className="store-container">
      <div className="inventory-header">
        <h2>Item Inventory</h2>
        <div className="inventory-subtitle">Your Crafted Equipment</div>
      </div>
      <div className="inventory-grid">
        {craftedItems.map(([name, count]) => (
          <div key={name} className="inventory-item">
            <div className="item-icon">{itemDetails[name].icon}</div>
            <div className="item-content">
              <div className="item-name">{name} x{count}</div>
              <div className="item-description">{itemDetails[name].description}</div>
              <div className="item-effect">{itemDetails[name].effect}</div>
            </div>
          </div>
        ))}
      </div>
      
      {specialMaterials.length > 0 && (
        <>
          <div className="inventory-header">
            <h2 className="electro-title">Special Materials</h2>
            <div className="inventory-subtitle">Ascension Components</div>
          </div>
          <div className="inventory-grid">
            {specialMaterials.map(([name, count]) => (
              <div key={name} className="inventory-item">
                <div className="item-icon">{itemDetails[name].icon}</div>
                <div className="item-content">
                  <div className="item-name">{name} x{count}</div>
                  <div className="item-description">{itemDetails[name].description}</div>
                  <div className="item-effect">{itemDetails[name].effect}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      <button onClick={onBack}>Back</button>
    </div>
  );
}
