import React, { useState } from 'react';
import ConsumablePopup from '../components/ConsumablePopup';

export default function ItemInventory({ craftingInventory, onBack, setNotifications }) {
  const [confirmDialog, setConfirmDialog] = useState(null);

  const itemDetails = {
    'Wires': {
      description: 'Basic conductive material',
      effect: 'Used in basic crafting',
      icon: <img src="../Icons/crafting/wire.png" alt="Wires" style={{width: '100%', height: '100%'}} />
    },
    'Metal Plates': {
      description: 'Sturdy metal sheets',
      effect: 'Used in basic crafting',
      icon: <img src="../Icons/crafting/metalPlates.png" alt="Metal Sheet" style={{width: '100%', height: '100%'}} />
    },
    'Gear Bits': {
      description: 'Mechanical components',
      effect: 'Used in basic crafting',
      icon: <img src="../Icons/crafting/gears.png" alt="Gears" style={{width: '100%', height: '100%'}} />
    },
    'Signal Mesh': {
      description: 'A tangled net of conductive filaments and memory threads',
      effect: 'Used for comms, signal boosting, and mysterious tech',
      icon: <img src="../Icons/crafting/signalMesh.png" alt="Mesh" style={{width: '100%', height: '100%'}} />
    },
    'Capacitor': {
      description: 'Basic Electric Component',
      effect: 'Used for Energy Storage',
      icon: <img src="../Icons/crafting/capacitor.png" alt="Mesh" style={{width: '100%', height: '100%'}} />
    },
    'Scrap Core': {
      description: 'A basic power core made from scrap',
      effect: 'Used in advanced crafting',
      icon: <img src="../Icons/crafting/scrapCore.png" alt="Scrap Core" style={{width: '90%', height: '140%'}} />
    },
    'Click Rig Mk I': {
      description: 'Advanced clicking mechanism',
      effect: 'Increases click power by 25%',
      icon: <img src="../Icons/crafting/clickRigMk1.png" alt="Mesh" style={{width: '100%', height: '100%'}} />
    },
    'Auto Toolkit': {
      description: 'Collection of automated tools',
      effect: 'Increases Auto Click efficiency by 25%',
      icon: <img src="../Icons/crafting/autoToolkit.png" alt="Mesh" style={{width: '100%', height: '100%'}} />
    },
    'Compression Pack': {
      description: 'Advanced storage solution',
      effect: 'Increases Junk/sec by 25%',
      icon: <img src="../Icons/crafting/compressionPack.png" alt="Mesh" style={{width: '100%', height: '100%'}} />
    },
    'Reinforced Backpack': {
      description: 'Heavy-duty storage pack',
      effect: 'Reduces cost scaling by 1% permanently',
      icon: <img src="../Icons/crafting/reinforcedBackpack.png" alt="Mesh" style={{width: '100%', height: '100%'}} />
    },
    'Surge Capacitor Module': {
      description: 'Power surge enhancement device',
      effect: 'Increases Trash Surge duration from 5s → 10s',
      icon: <img src="../Icons/crafting/surgeCapacitor.png" alt="Mesh" style={{width: '100%', height: '100%'}} />
    },
    'Echo Helmets': {
      description: 'Noise-canceling brainwear for clean signal thinking',
      effect: '+1% mission success rate',
      icon: <img src="../Icons/crafting/echoHelmet.png" alt="Mesh" style={{width: '100%', height: '100%'}} />
    },
    'Chrono Regulator': {
      description: 'A hacked regulator that compresses outbound sync pulses',
      effect: 'All crew missions complete 20 seconds faster',
      icon: <img src="../Icons/crafting/chronoRegulator.png" alt="Mesh" style={{width: '100%', height: '100%'}} />
    },
    'Rusted Loyalty Pins': {
      description: 'These crude pins bind crew to your cause. Or maybe they just look cool',
      effect: 'Crew recovers stamina 25% faster',
      icon: '📌'
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
      icon: <img src="../Icons/crafting/encryptedCoil.png" alt="Mesh" style={{width: '80%', height: '100%'}} />
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
    'Surge Delay Fuse': {
      description: 'Advanced surge extension device',
      effect: 'Adds +10s to Surge duration regardless of activation window',
      icon: '⏱️'
    },
    'Synth Thread': {
      description: 'Advanced synthetic threading material',
      effect: 'Created from processed wires, used for high-tech crafting',
      icon: '🧵'
    },
    'Reactor Grease': {
      description: 'Volatile lubricant that supercharges trash collection systems',
      effect: 'Unlocks Trash Surge ability (30s duration, 900s cooldown)',
      icon: '⚡'
    },
    'Click Injector': {
      description: 'Temporary click enhancement serum',
      effect: 'Unlocks Click Injector ability (+50% click power for 20s, 600s cooldown)',
      icon: '💉'
    },
    'Luck Engine': {
      description: 'A humming mass of fused chance. Feels... oddly warm.',
      effect: 'Gives you the ability to buy Auto Slotter and Ultimate Slots',
      icon: <img src="../Icons/crafting/luckEngine.png" alt="Mesh" style={{width: '80%', height: '100%'}} />
    },
    'Junk Cells': {
      description: 'Portable power source that lasts about 4 hours',
      effect: 'Used to power items temporarily',
      icon: <img src="../Icons/crafting/junkCell.png" alt="Mesh" style={{width: '80%', height: '100%'}} />
    },
    'Junk Magnet': {
      description: 'Increases Junk/sec by 15%',
      effect: 'Permanent boost to junk generation',
      icon: '🧲'
    },
    'Auto Gremlin Oil': {
      description: 'Mechanical lubricant that supercharges automated systems',
      effect: 'Increases Auto Click Rate by 50% for 60 seconds',
      icon: '🛢️'
    },
    'Instability Core': {
      description: 'A volatile power source that breaks the rules of conventional tech',
      effect: 'Used for advanced unstable crafting',
      icon: '⚡'
    },
    'Temporal Surge Capsule': {
      description: 'Advanced temporal enhancement device that bends time and power',
      effect: 'Unlocks Temporal Surge ability (+100% Click Power and +100% Junk/sec for 30s, 10min cooldown)',
      icon: '⏰'
    }
  };

  const basicItems = ['Wires', 'Metal Plates', 'Gear Bits', 'Signal Mesh', 'Capacitor', 'Synth Thread', 'Scrap Core', 'Glitched Scrap Core'];
  const consumableItems = ['Junk Cells', 'Auto Gremlin Oil', 'Temporal Surge Capsule'];
  const specialItems = ['Stabilized Capacitor', 'Voltage Node', 'Synthcore Fragment', 'Encrypted Coil', 'Surge Capacitor Fragment', 'Instability Core'];

  const basicMaterials = Object.entries(craftingInventory)
    .filter(([name]) => basicItems.includes(name));

  const craftedItems = Object.entries(craftingInventory)
    .filter(([name]) => itemDetails[name] && !basicItems.includes(name) && !consumableItems.includes(name) && !specialItems.includes(name));

  const consumableMaterials = Object.entries(craftingInventory)
    .filter(([name]) => consumableItems.includes(name));

  const specialMaterials = Object.entries(craftingInventory)
    .filter(([name]) => specialItems.includes(name));

  const handleConsumableClick = (itemName) => {
    if (consumableItems.includes(itemName)) {
      // Check if user has at least 1 of the item
      if ((craftingInventory[itemName] || 0) < 1) {
        setNotifications(prev => [...prev, `You don't have any ${itemName} to use!`]);
        return;
      }
      
      setConfirmDialog({
        itemName,
        itemDetails: itemDetails[itemName]
      });
    }
  };

  const handleConfirmUse = () => {
    const { itemName } = confirmDialog;

    if (itemName === 'Auto Gremlin Oil') {
      // Check if player has the item
      if ((craftingInventory[itemName] || 0) > 0) {
        // Apply the auto click rate boost
        localStorage.setItem('autoGremlinOilActive', Date.now() + 60000); // 60 seconds from now
        
        // Mark that Auto Gremlin Oil has been used for quest tracking
        localStorage.setItem('autoGremlinOilUsed', 'true');
        
        setNotifications(prev => [...prev, 'Auto Gremlin Oil activated! +50% Auto Click Rate for 60 seconds']);
        
        // Consume 1 item from inventory
        window.dispatchEvent(new CustomEvent('consumeItem', { 
          detail: { itemName, quantity: 1 } 
        }));
        
        setNotifications(prev => [...prev, `Used ${itemName}!`]);
      } else {
        setNotifications(prev => [...prev, `You don't have any ${itemName} to use!`]);
      }
    }

    setConfirmDialog(null);
  };

  const handleCancelUse = () => {
    setConfirmDialog(null);
  };

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
            <div 
              key={name} 
              className={`inventory-item ${specialClass} ${consumableItems.includes(name) ? 'clickable-consumable' : ''}`}
              onClick={() => handleConsumableClick(name)}
            >
              <div className="item-icon">{itemDetails[name]?.icon || '❓'}</div>
              <div className="item-content">
                <div className="item-name">{name} x{count}</div>
                <div className="item-description">{itemDetails[name]?.description || 'Unknown item'}</div>
                <div className="item-effect">{itemDetails[name]?.effect || 'No effect'}</div>
                {consumableItems.includes(name) && (
                  <div className="consumable-hint">Click to use</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <>
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

      <ConsumablePopup 
        isOpen={!!confirmDialog}
        itemName={confirmDialog?.itemName}
        itemDetails={confirmDialog?.itemDetails}
        onConfirm={handleConfirmUse}
        onCancel={handleCancelUse}
      />
    </>
  );
}