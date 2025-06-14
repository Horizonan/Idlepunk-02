import React, { useState } from 'react';
import '../styles/mobile/CraftingMobile.css';

const formatJunkCost = (cost, hasBooster) => {
  if (hasBooster) {
    cost = Math.floor(cost * 0.9);
  }
  if (cost >= 1000000) {
    return (cost / 1000000).toFixed(1) + 'M';
  } else if (cost >= 1000) {
    return (cost / 1000).toFixed(0) + 'K';
  }
  return cost;
};

export default function CraftingStore({ junk, onCraft, craftingInventory, onBack }) {
  const [selectedTab, setSelectedTab] = useState('basic');
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [bulkCraft, setBulkCraft] = useState(false);
  const [itemInfo, setItemInfo] = useState({}); // Added state to manage item info visibility

  const tabs = [
    { id: 'basic', label: 'Basic Materials' },
    { id: 'items', label: 'Craftable Items' },
    { id: 'consumables', label: 'Consumables' },
    { id: 'enhanced', label: 'Enhanced Crafting', unlockCondition: () => localStorage.getItem('hasPrestiged') === 'true' },
    { id: 'mysterious', label: 'Mysterious', unlockCondition: () => localStorage.getItem('mysteriousUnlocked') === 'true' || craftingInventory['Synthcore Fragment'] >= 1 }
  ];

  // Set mysterious tab as unlocked if condition met
  React.useEffect(() => {
    if (craftingInventory['Synthcore Fragment'] >= 1) {
      localStorage.setItem('mysteriousUnlocked', 'true');
    }
  }, [craftingInventory]);

  const basicMaterials = [
    {
      name: 'Wires',
      cost: 25000,
      description: 'Basic conductive material',
      type: 'basic'
    },
    {
      name: 'Metal Plates',
      cost: 50000,
      description: 'Sturdy metal sheets',
      type: 'basic'
    },
    {
      name: 'Gear Bits',
      cost: 30000,
      description: 'Mechanical components',
      type: 'basic'
    },
    {
      name: 'Signal Mesh',
      cost: 60000,
      description: 'A tangled net of conductive filaments and memory threads, often salvaged from obsolete broadcast towers',
      type: 'basic'
    },
    {
      name: 'Capacitor',
      description: 'Energy storage device',
      type: 'basic',
      uncraftable: true
    }
  ];

  const consumableItems = [
    {
      name: 'Junk Cells',
      requirements: {
        'Metal Plates': 50,
        'Wires': 20,
        'Scrap Core': 1
      },
      cost: 0,
      description: 'Portable power source that lasts about 4 hours',
      type: 'consumable'
    }
  ];

  const enhancedCraftingItems = [
    {
      name: 'Chrono Regulator',
      requirements: {
        'Scrap Core': 4,
        'Signal Mesh': 6,
        'Capacitor': 2
      },
      cost: 4000000,
      description: 'A hacked regulator that compresses outbound sync pulses. All crew missions complete 20 seconds faster.',
      type: 'enhanced',
      onetime: true
    }
  ];

  const craftableItems = [
    {
      name: 'Scrap Core',
      requirements: {
        'Metal Plates': 3,
        'Wires': 2
      },
      cost: 250000,
      description: 'A basic power core made from scrap',
      type: 'crafted',
      onetime: false
    },
    {
      name: 'Click Rig Mk I',
      requirements: {
        'Wires': 4,
        'Gear Bits': 2
      },
      cost: 250000,
      description: 'Increases click power by 25%',
      type: 'crafted',
      onetime: true
    },
    {
      name: 'Auto Toolkit',
      requirements: {
        'Metal Plates': 3,
        'Gear Bits': 2
      },
      cost: 300000,
      description: 'Increases Auto Click efficiency by 25%',
      type: 'crafted',
      onetime: true
    },
    {
      name: 'Compression Pack',
      requirements: {
        'Scrap Core': 2,
        'Wires': 3
      },
      cost: 350000,
      description: 'Increases Junk/sec by 25%',
      type: 'crafted',
      onetime: true
    },
    {
      name: 'Reinforced Backpack',
      requirements: {
        'Metal Plates': 3,
        'Scrap Core': 2,
        'Gear Bits': 2
      },
      cost: 400000,
      description: 'Reduces cost scaling by 1% permanently',
      type: 'crafted',
      onetime: true
    },
    {
      name: 'Surge Capacitor Module',
      requirements: {
        'Capacitor': 2,
        'Scrap Core': 1,
        'Metal Plates': 2
      },
      cost: 500000,
      description: 'Increases Trash Surge duration from 5s → 10s',
      type: 'crafted',
      onetime: true
    },
    {
      name: 'Overclocked Click Rig',
      requirements: {
        'Click Rig Mk I': 1,
        'Gear Bits': 15,
        'Metal Plates': 15,
        'Capacitor': 1,
        'Scrap Core': 5
      },
      cost: 2000000,
      description: 'An unstable upgrade of the original Click Rig—burns bright, earns fast. Replaces Click Rig Mk I. Click power +50% instead of +25%.',
      type: 'crafted',
      onetime: true
    },
    {
      name: 'Luck Engine',
      requirements: {
        'Capacitor': 3,
        'Glitched Scrap Core': 1,
        'Metal Plates': 20,
        'Wires': 40
      },
      cost: 25000000,
      description: 'Allows you to purchase Auto Slotter and Ultimate Slots',
      type: 'crafted',
      onetime: true
    }
  ];

  const calculate10xCraftingPrice = (baseCost) => {
    const cost = craftingInventory['Crafting Booster Unit'] ? Math.floor(baseCost * 0.9) : baseCost;
    let totalCost = 0;
    let currentCost = cost;

    for (let i = 0; i < 10; i++) {
      totalCost += currentCost;
      currentCost = Math.floor(currentCost * 1.1); // 10% increase per craft
    }

    return { totalCost, finalCost: currentCost };
  };

  const canCraft = (item) => {
    if (item.type === 'basic') {
      if (bulkCraft) {
        const { totalCost } = calculate10xCraftingPrice(item.cost);
        return junk >= totalCost;
      } else {
        const cost = craftingInventory['Crafting Booster Unit'] ? Math.floor(item.cost * 0.9) : item.cost;
        return junk >= cost;
      }
    } else {
      // For consumables and craftable items, allow bulk crafting except for one-time items
      const multiplier = (bulkCraft && !item.onetime) ? 10 : 1;
      const hasRequiredMaterials = item.requirements ? 
        Object.entries(item.requirements).every(
          ([mat, count]) => (craftingInventory[mat] || 0) >= (count * multiplier)
        ) : true;
      const hasRequiredJunk = junk >= ((item.cost || 0) * multiplier);
      return hasRequiredMaterials && hasRequiredJunk;
    }
  };

  const toggleItemInfo = (itemName, event) => {
    event.stopPropagation(); // Prevent triggering the craft button click
    setItemInfo(prevState => ({
      ...prevState,
      [itemName]: !prevState[itemName]
    }));
  };

  return (
    <div className="store-container">
      <div className="store-header">
        <h2>Crafting Station</h2>
        <div className="store-controls">
          <button 
            onClick={() => setBulkCraft(!bulkCraft)} 
            className="bulk-buy-toggle"
          >
            {bulkCraft ? '10x' : '1x'}
          </button>
          <button onClick={onBack}>Close</button>
        </div>
      </div>
      <div className="crafting-tabs">
        {tabs.map(tab => (
          (!tab.unlockCondition || tab.unlockCondition()) && (
            <button 
              key={tab.id}
              className={`tab-button-rounded ${selectedTab === tab.id ? 'active' : ''}`}
              onClick={() => setSelectedTab(tab.id)}
            >
              {tab.label}
            </button>
          )
        ))}
      </div>
      <div className="crafting-content">
        {selectedTab === 'basic' && (
          <div className="crafting-section">
            <h3>Basic Materials</h3>
            <div className="store-items">
              {basicMaterials.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    const quantity = bulkCraft ? 10 : 1;
                    onCraft(item, quantity);
                  }}
                  disabled={item.uncraftable || !canCraft(item)}
                  className={`store-item ${item.uncraftable ? 'uncraftable' : ''}`}
                >
                  <div className="item-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <strong>{item.name}</strong>
                      <button 
                        className="item-info-icon"
                        onClick={(e) => toggleItemInfo(item.name, e)}
                        style={{ display: window.innerWidth <= 768 ? 'inline-flex' : 'none' }}
                      >
                        i
                      </button>
                    </div>
                  </div>
                  <div className="item-info">
                    <p>{item.description}</p>
                    <p className="owned">Owned: {craftingInventory[item.name] || 0}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'items' && (
          <div className="crafting-section">
            <h3>Craftable Items</h3>
            <div className="store-items">
              {craftableItems.filter(item => {
                // Hide one-time items that are already crafted
                if (item.onetime && craftingInventory[item.name]) {
                  return false;
                }
                // Only show Overclocked Click Rig if player owns Click Rig Mk I
                if (item.name === 'Overclocked Click Rig' && !craftingInventory['Click Rig Mk I']) {
                  return false;
                }
                return true;
              }).map((item) => (
                <button
                  key={item.name}
                  onClick={() => onCraft(item, bulkCraft ? 10 : 1)}
                  disabled={!canCraft(item)}
                  className="store-item"
                >
                  <div className="item-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <strong>{item.name}</strong>
                      <button 
                        className="item-info-icon"
                        onClick={(e) => toggleItemInfo(item.name, e)}
                        style={{ display: window.innerWidth <= 768 ? 'inline-flex' : 'none' }}
                      >
                        i
                      </button>
                    </div>
                  </div>
                  <div className="item-info">
                    <p>{item.description}</p>
                    {item.requirements && (
                      <div>
                        <p>Requirements:</p>
                        {Object.entries(item.requirements).map(([mat, count]) => (
                          <p key={mat}>- {mat}: {count * ((bulkCraft && !item.onetime) ? 10 : 1)} ({craftingInventory[mat] || 0} owned)</p>
                        ))}
                      </div>
                    )}
                    {item.cost && <p>Cost: {formatJunkCost(item.cost * ((bulkCraft && !item.onetime) ? 10 : 1), craftingInventory['Crafting Booster Unit'])} Junk</p>}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'consumables' && (
          <div className="crafting-section">
            <h3>Consumables</h3>
            <div className="store-items">
              {consumableItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => onCraft(item, bulkCraft ? 10 : 1)}
                  disabled={!canCraft(item)}
                  className="store-item"
                >
                  <div className="item-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <strong>{item.name}</strong>
                      <button 
                        className="item-info-icon"
                        onClick={(e) => toggleItemInfo(item.name, e)}
                        style={{ display: window.innerWidth <= 768 ? 'inline-flex' : 'none' }}
                      >
                        i
                      </button>
                    </div>
                  </div>
                  <div className="item-info">
                    <p>{item.description}</p>
                    {item.requirements && (
                      <div>
                        <p>Requirements:</p>
                        {Object.entries(item.requirements).map(([mat, count]) => (
                          <p key={mat}>- {mat}: {count * ((bulkCraft && !item.onetime) ? 10 : 1)} ({craftingInventory[mat] || 0} owned)</p>
                        ))}
                      </div>
                    )}
                    <p className="owned">Owned: {craftingInventory[item.name] || 0}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'enhanced' && (
          <div className="crafting-section">
            <h3>Enhanced Crafting</h3>
            <div className="store-items">
              {enhancedCraftingItems.filter(item => {
                // Hide one-time items that are already crafted
                if (item.onetime && craftingInventory[item.name]) {
                  return false;
                }
                return true;
              }).map((item) => (
                <button
                  key={item.name}
                  onClick={() => onCraft(item, 1)} // Always craft 1 for enhanced items
                  disabled={!canCraft(item)}
                  className="store-item"
                >
                  <div className="item-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <strong>{item.name}</strong>
                      <button 
                        className="item-info-icon"
                        onClick={(e) => toggleItemInfo(item.name, e)}
                        style={{ display: window.innerWidth <= 768 ? 'inline-flex' : 'none' }}
                      >
                        i
                      </button>
                    </div>
                  </div>
                  <div className="item-info">
                    <p>{item.description}</p>
                    {item.requirements && (
                      <div>
                        <p>Requirements:</p>
                        {Object.entries(item.requirements).map(([mat, count]) => (
                          <p key={mat}>- {mat}: {count} ({craftingInventory[mat] || 0} owned)</p>
                        ))}
                      </div>
                    )}
                    {item.cost && <p>Cost: {formatJunkCost(item.cost, craftingInventory['Crafting Booster Unit'])} Junk</p>}
                    {item.onetime && <p className="owned">One-time purchase</p>}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'mysterious' && (
          <div className="crafting-section">
            <h3>Mysterious Items</h3>

            <div className="store-items">
              {craftingInventory['Synthcore Fragment'] >= 1 && (<button
                onClick={() => onCraft({
                  name: 'Prestige Crystal',
                  requirements: {
                    'Stabilized Capacitor': 1,
                    'Voltage Node': 1,
                    'Synthcore Fragment': 1,
                    'Quantum Entangler': 1
                  },
                  cost: 10000000,
                  description: 'A mysterious crystal pulsing with otherworldly power',
                  type: 'mysterious',
                  icon: '💎'
                }, 1)} // Always craft 1 for unique items
                disabled={!canCraft({
                  requirements: {
                    'Stabilized Capacitor': 1,
                    'Voltage Node': 1,
                    'Synthcore Fragment': 1,
                    'Quantum Entangler': 1
                  },
                  cost: 10000000
                })}
                className="store-item mysterious"
              >
                <div className="item-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <strong>💎 Prestige Crystal</strong>
                      <button 
                        className="item-info-icon"
                        onClick={(e) => toggleItemInfo('Prestige Crystal', e)}
                        style={{ display: window.innerWidth <= 768 ? 'inline-flex' : 'none' }}
                      >
                        i
                      </button>
                    </div>
                  </div>
                <div className="item-info">
                  <p>A mysterious crystal pulsing with otherworldly power</p>
                  <p>Requirements:</p>
                  <p>- Junk: {formatJunkCost(10000000, craftingInventory['Crafting Booster Unit'])}</p>
                  <p>- Stabilized Capacitor: 1 ({craftingInventory['Stabilized Capacitor'] || 0} owned)</p>
                  <p>- Voltage Node: 1 ({craftingInventory['Voltage Node'] || 0} owned)</p>
                  <p>- Synthcore Fragment: 1 ({craftingInventory['Synthcore Fragment'] || 0} owned)</p>
                  <p>- Quantum Entangler: 1 ({craftingInventory['Quantum Entangler'] || 0} owned)</p>
                </div>
              </button>)}

            {localStorage.getItem('quest_sync_Beacon Protocol') === 'true' && (
              <button
                onClick={() => onCraft({
                  name: 'Overcharged Prestige Crystal',
                  requirements: {
                    'Encrypted Coil': 1,
                    'Surge Capacitor Fragment': 1,
                  },
                  cost: 25000000,
                  description: 'A mysterious crystal pulsing with otherworldly power',
                  type: 'mysterious',
                  icon: '💎'
                }, 1)} // Always craft 1 for unique items
                disabled={!canCraft({
                  requirements: {
                    'Encrypted Coil': 1,
                    'Surge Capacitor Fragment': 1
                  },
                  cost: 25000000
                })}
                className="store-item mysterious"
              >
                <div className="item-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <strong>💎Overcharged Prestige Crystal</strong>
                      <button 
                        className="item-info-icon"
                        onClick={(e) => toggleItemInfo('Overcharged Prestige Crystal', e)}
                        style={{ display: window.innerWidth <= 768 ? 'inline-flex' : 'none' }}
                      >
                        i
                      </button>
                    </div>
                  </div>
                <div className="item-info">
                  <p>A mysterious crystal pulsing with otherworldly power</p>
                  <p>Requirements:</p>
                  <p>- Junk: {formatJunkCost(25000000, craftingInventory['Overcharged Prestige Crystal'])}</p>
                  <p>- Encrypted Coil: 1 ({craftingInventory['Encrypted Coil'] || 0} owned)</p>
                  <p>- Surge Capacitor Fragment: 1 ({craftingInventory['Surge Capacitor Fragment'] || 0} owned)</p>
                </div>
              </button>)}
            </div>

            {/* Reset Recipe Button - Bottom of section */}
            <div className="reset-button-container">
              <button
                onClick={() => setShowResetConfirm(true)}
                className="reset-recipe-button"
              >
                🔄 Reset Recipe
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Internal Reset Confirmation Popup */}
      {showResetConfirm && (
        <div className="reset-confirm-overlay">
          <div className="reset-confirm-popup">
            <h4>Reset Prestige Crystal Recipe?</h4>
            <p>This will clear your crafting progress but you will keep your materials.</p>
            <div className="reset-confirm-buttons">
              <button 
                onClick={() => {
                  localStorage.removeItem('prestigeCrystalProgress');
                  localStorage.removeItem('prestigeCrystalStarted');
                  window.dispatchEvent(new CustomEvent('prestigeCrystalReset'));
                  console.log('Prestige Crystal recipe has been reset');
                  setShowResetConfirm(false);
                }}
                className="confirm-reset-button"
              >
                Yes, Reset Recipe
              </button>
              <button 
                onClick={() => setShowResetConfirm(false)}
                className="cancel-reset-button"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}