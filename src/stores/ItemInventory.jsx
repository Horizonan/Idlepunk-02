import React, { useEffect } from 'react';

export default function ItemInventory({ craftingInventory, onBack }) {
  // Preload images for faster display
  useEffect(() => {
    const imagePaths = [
      '/Icons/crafting/wires.svg',
      '/Icons/crafting/metalPlates.svg',
      '/Icons/crafting/scrapCore.svg'
    ];

    imagePaths.forEach(path => {
      const img = new Image();
      img.src = path;
    });
  }, []);
  const itemDetails = {
    'Wires': {
      description: 'Basic conductive material',
      effect: 'Used in basic crafting',
      icon: <img src="/Icons/crafting/wires.svg" alt="Wires" style={{width: '100%', height: '100%'}} loading="eager" />
    },
    'Metal Plates': {
      description: 'Sturdy metal sheets',
      effect: 'Used in basic crafting',
      icon: <img src="/Icons/crafting/metalPlates.svg" alt="Metal Plates" style={{width: '100%', height: '100%'}} loading="eager" />
    },
    'Gear Bits': {
      description: 'Mechanical components',
      effect: 'Used in basic crafting',
      icon: '⚙️'
    },
    'Signal Mesh': {
      description: 'A tangled net of conductive filaments and memory threads',
      effect: 'Used for comms, signal boosting, and mysterious tech',
      icon: '📡'
    },
    'Capacitor': {
      description: 'Basic Electric Component',
      effect: 'Used for Energy Storage',
      icon: '⚡'
    },
    'Scrap Core': {
      description: 'A basic power core made from scrap',
      effect: 'Used in advanced crafting',
      icon: <img src="/Icons/crafting/scrapCore.svg" alt="Scrap Core" style={{width: '100%', height: '100%'}} loading="eager" />
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
    },
    'Encrypted Coil': {
      description: 'A mysterious coil emitting strange energy',
      effect: 'Contains fragments of ancient data',
      icon: '🔷'
    },
    'Surge Capacitor Fragment': {
      description: 'It still hums — dangerously.',
      effect: 'Said to form only during peak Electro overloads.',
      icon: '🔷'
    },
    'Glitched Scrap Core': {
      description: 'Looks incredibly Lucky!',
      effect: 'Reality chewed it up. You kept it anyway.',
      icon: '🔷'
    },
    'Luck Engine': {
      description: 'A humming mass of fused chance. Feels... oddly warm.',
      effect: 'Gives you the ability to buy Auto Slotter and Ultimate Slots',
      icon: '🎲'
    },
    'Junk Cells': {
      description: 'Portable power source that lasts about 4 hours',
      effect: 'Used to power items temporarily',
      icon: '🔋'
    }
  };

  const basicItems = ['Wires', 'Metal Plates', 'Gear Bits', 'Signal Mesh', 'Capacitor', 'Scrap Core', 'Glitched Scrap Core'];
  const consumableItems = ['Junk Cells'];
  const specialItems = ['Stabilized Capacitor', 'Voltage Node', 'Synthcore Fragment', 'Encrypted Coil', 'Surge Capacitor Fragment'];

  const basicMaterials = Object.entries(craftingInventory)
    .filter(([name]) => basicItems.includes(name));

  const craftedItems = Object.entries(craftingInventory)
    .filter(([name]) => itemDetails[name] && !basicItems.includes(name) && !consumableItems.includes(name) && !specialItems.includes(name));

  const consumableMaterials = Object.entries(craftingInventory)
    .filter(([name]) => consumableItems.includes(name));

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
      <div className="store-header">
        <h2>Item Inventory</h2>
        <button onClick={onBack}>Close</button>
      </div>
      {renderInventorySection(basicMaterials, 'Basic Materials', 'Components & Resources', 'basic-materials')}
      {renderInventorySection(craftedItems, 'Crafted Equipment', 'Enhanced Gear', 'crafted-items')}
      {renderInventorySection(consumableMaterials, 'Consumables', 'Temporary Power Sources', 'consumable-materials')}
      {renderInventorySection(specialMaterials, 'Special Materials', 'Ascension Components', 'special-materials')}
    </div>
  );
}