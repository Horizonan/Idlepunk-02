
import React from 'react';

export default function ItemInventory({ craftingInventory, onBack }) {
  const itemDetails = {
    'Wires': {
      description: 'Basic conductive material',
      effect: 'Used in basic crafting',
      icon: '🔌'
    },
    'Metal Plates': {
      description: 'Sturdy metal sheets',
      effect: 'Used in basic crafting',
      icon: '🛡️'
    },
    'Gear Bits': {
      description: 'Mechanical components',
      effect: 'Used in basic crafting',
      icon: '⚙️'
    },
    'Scrap Core': {
      description: 'A basic power core made from scrap',
      effect: 'Used in advanced crafting',
      icon: '💠'
    },
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
      effect: 'Required for advanced tech progression',
      icon: '🔋'
    },
    'Voltage Node': {
      description: 'High-powered energy distributor',
      effect: 'Required for network upgrades',
      icon: '⚡'
    },
    'Synthcore Fragment': {
      description: 'Mysterious technological artifact',
      effect: 'Purpose unknown',
      icon: '💎'
    }
  };

  const basicItems = ['Wires', 'Metal Plates', 'Gear Bits', 'Scrap Core'];
  const specialItems = ['Stabilized Capacitor', 'Voltage Node', 'Synthcore Fragment'];
  
  const basicMaterials = Object.entries(craftingInventory)
    .filter(([name]) => basicItems.includes(name));

  const craftedItems = Object.entries(craftingInventory)
    .filter(([name]) => itemDetails[name] && !basicItems.includes(name) && !specialItems.includes(name));

  const specialMaterials = Object.entries(craftingInventory)
    .filter(([name]) => specialItems.includes(name));

  const renderInventorySection = (items, title, subtitle, specialClass = '') => {
    if (items.length === 0) return null;
    
    return (
      <>
        <div className={`inventory-header ${specialClass}`}>
          <h2>{title}</h2>
          <div className="inventory-subtitle">{subtitle}</div>
        </div>
        <div className="inventory-grid">
          {items.map(([name, count]) => (
            <div key={name} className={`inventory-item ${specialClass}`}>
              <div className="item-icon">{itemDetails[name]?.icon || '❓'}</div>
              <div className="item-content">
                <div className="item-name">{name} x{count}</div>
                <div className="item-description">{itemDetails[name]?.description || 'Unknown item'}</div>
                <div className="item-effect">{itemDetails[name]?.effect || 'No effect'}</div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="store-container inventory-container">
      {renderInventorySection(basicMaterials, 'Basic Materials', 'Components & Resources', 'basic-materials')}
      {renderInventorySection(craftedItems, 'Crafted Equipment', 'Enhanced Gear', 'crafted-items')}
      {renderInventorySection(specialMaterials, 'Special Materials', 'Ascension Components', 'special-materials')}
      <button onClick={onBack} className="back-button">Back</button>
    </div>
  );
}
