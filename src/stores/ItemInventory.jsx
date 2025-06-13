
import React, { useMemo } from 'react';

// Static icon components to prevent re-creation
const StaticWiresIcon = React.memo(() => (
  <img 
    src="/Icons/crafting/wires.svg" 
    alt="Wires" 
    style={{width: '32px', height: '32px', imageRendering: 'pixelated'}} 
    loading="lazy" 
    decoding="async"
  />
));

const StaticMetalPlatesIcon = React.memo(() => (
  <img 
    src="/Icons/crafting/metalPlates.svg" 
    alt="Metal Plates" 
    style={{width: '32px', height: '32px', imageRendering: 'pixelated'}} 
    loading="lazy" 
    decoding="async"
  />
));

const StaticScrapCoreIcon = React.memo(() => (
  <img 
    src="/Icons/crafting/scrapCore.svg" 
    alt="Scrap Core" 
    style={{width: '32px', height: '32px', imageRendering: 'pixelated'}} 
    loading="lazy" 
    decoding="async"
  />
));

// Static item details - never changes
const STATIC_ITEM_DETAILS = {
  'Wires': {
    description: 'Basic conductive material',
    effect: 'Used in basic crafting',
    icon: <StaticWiresIcon />
  },
  'Metal Plates': {
    description: 'Sturdy metal sheets',
    effect: 'Used in basic crafting',
    icon: <StaticMetalPlatesIcon />
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
    icon: <StaticScrapCoreIcon />
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

// Static category definitions
const BASIC_ITEMS = ['Wires', 'Metal Plates', 'Gear Bits', 'Signal Mesh', 'Capacitor', 'Scrap Core', 'Glitched Scrap Core'];
const CONSUMABLE_ITEMS = ['Junk Cells'];
const SPECIAL_ITEMS = ['Stabilized Capacitor', 'Voltage Node', 'Synthcore Fragment', 'Encrypted Coil', 'Surge Capacitor Fragment'];

// Memoized inventory item component
const InventoryItem = React.memo(({ name, count, itemDetail, specialClass }) => (
  <div className={`inventory-item ${specialClass}`}>
    <div className="item-icon">{itemDetail?.icon || '❓'}</div>
    <div className="item-content">
      <div className="item-name">{name} x{count}</div>
      <div className="item-description">{itemDetail?.description || 'Unknown item'}</div>
      <div className="item-effect">{itemDetail?.effect || 'No effect'}</div>
    </div>
  </div>
));

// Memoized inventory section component
const InventorySection = React.memo(({ items, title, subtitle, specialClass = '' }) => {
  if (items.length === 0) return null;

  return (
    <React.Fragment>
      <div className={`inventory-header ${specialClass}`}>
        <h2>{title}</h2>
        <div className="inventory-subtitle">{subtitle}</div>
      </div>
      <div className="inventory-grid">
        {items.map(([name, count]) => (
          <InventoryItem
            key={name}
            name={name}
            count={count}
            itemDetail={STATIC_ITEM_DETAILS[name]}
            specialClass={specialClass}
          />
        ))}
      </div>
    </React.Fragment>
  );
});

export default React.memo(function ItemInventory({ craftingInventory, onBack }) {
  // Only compute what's actually needed, with minimal processing
  const inventoryEntries = useMemo(() => Object.entries(craftingInventory), [craftingInventory]);
  
  const categorizedItems = useMemo(() => {
    const basic = [];
    const crafted = [];
    const consumable = [];
    const special = [];

    for (const [name, count] of inventoryEntries) {
      if (BASIC_ITEMS.includes(name)) {
        basic.push([name, count]);
      } else if (CONSUMABLE_ITEMS.includes(name)) {
        consumable.push([name, count]);
      } else if (SPECIAL_ITEMS.includes(name)) {
        special.push([name, count]);
      } else if (STATIC_ITEM_DETAILS[name]) {
        crafted.push([name, count]);
      }
    }

    return { basic, crafted, consumable, special };
  }, [inventoryEntries]);

  return (
    <div className="store-container inventory-container">
      <div className="store-header">
        <h2>Item Inventory</h2>
        <button onClick={onBack}>Close</button>
      </div>
      <InventorySection items={categorizedItems.basic} title="Basic Materials" subtitle="Components & Resources" specialClass="basic-materials" />
      <InventorySection items={categorizedItems.crafted} title="Crafted Equipment" subtitle="Enhanced Gear" specialClass="crafted-items" />
      <InventorySection items={categorizedItems.consumable} title="Consumables" subtitle="Temporary Power Sources" specialClass="consumable-materials" />
      <InventorySection items={categorizedItems.special} title="Special Materials" subtitle="Ascension Components" specialClass="special-materials" />
    </div>
  );
});
