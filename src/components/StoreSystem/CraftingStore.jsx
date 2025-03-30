import React, { useState } from 'react';

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

  const tabs = [
    { id: 'basic', label: 'Basic Materials' },
    { id: 'items', label: 'Craftable Items' },
    { id: 'mysterious', label: 'Mysterious', unlockCondition: () => localStorage.getItem('mysteriousUnlocked') === 'true' || craftingInventory['Synthcore Fragment'] >= 1 },
    { id: 'special', label: 'Special Materials' } // Added special materials tab
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
      name: 'Capacitor',
      description: 'Energy storage device',
      type: 'basic',
      uncraftable: true
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
      type: 'crafted'
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
    }
  ];

  const specialMaterials = [
    {
      name: 'Encrypted Coil',
      description: 'A mysterious coil emitting strange energy.',
      type: 'special'
    }
    // Add more special materials here as needed
  ];

  const canCraft = (item) => {
    if (item.type === 'basic') {
      const cost = craftingInventory['Crafting Booster Unit'] ? Math.floor(item.cost * 0.9) : item.cost;
      return junk >= cost;
    } else {
      return Object.entries(item.requirements).every(
        ([mat, count]) => (craftingInventory[mat] || 0) >= count
      ) && junk >= (item.cost || 0);
    }
  };

  return (
    <div className="store-container">
      <div className="store-header">
        <h2>Crafting Station</h2>
        <button onClick={onBack}>Close</button>
      </div>
      <div className="crafting-tabs">
        {tabs.map(tab => (
          (!tab.unlockCondition || tab.unlockCondition()) && (
            <button
              key={tab.id}
              className={`tab-button ${selectedTab === tab.id ? 'active' : ''}`}
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
                  onClick={() => !item.uncraftable && onCraft(item)}
                  disabled={item.uncraftable || !canCraft(item)}
                  className={`store-item ${item.uncraftable ? 'uncraftable' : ''}`}
                >
                  <div className="item-header">
                    <strong>{item.name}</strong>
                    {item.cost && <span className="cost">({formatJunkCost(item.cost, craftingInventory['Crafting Booster Unit'])} Junk)</span>}
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
              {craftableItems.filter(item => !item.onetime || !craftingInventory[item.name]).map((item) => (
                <button
                  key={item.name}
                  onClick={() => onCraft(item)}
                  disabled={!canCraft(item)}
                  className="store-item"
                >
                  <div className="item-header">
                    <strong>{item.name}</strong>
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
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'mysterious' && craftingInventory['Synthcore Fragment'] >= 1 && (
          <div className="crafting-section">
            <h3>Mysterious Items</h3>
            <div className="store-items">
              <button
                onClick={() => onCraft({
                  name: 'Prestige Crystal',
                  requirements: {
                    'Stabilized Capacitor': 1,
                    'Voltage Node': 1,
                    'Synthcore Fragment': 1
                  },
                  cost: 10000000,
                  description: 'A mysterious crystal pulsing with otherworldly power',
                  type: 'mysterious',
                  icon: '💎'
                })}
                disabled={!canCraft({
                  requirements: {
                    'Stabilized Capacitor': 1,
                    'Voltage Node': 1,
                    'Synthcore Fragment': 1
                  },
                  cost: 10000000
                })}
                className="store-item mysterious"
              >
                <div className="item-header">
                  <strong>💎 Prestige Crystal</strong>
                </div>
                <div className="item-info">
                  <p>A mysterious crystal pulsing with otherworldly power</p>
                  <p>Requirements:</p>
                  <p>- Junk: {formatJunkCost(10000000, craftingInventory['Crafting Booster Unit'])}</p>
                  <p>- Stabilized Capacitor: 1 ({craftingInventory['Stabilized Capacitor'] || 0} owned)</p>
                  <p>- Voltage Node: 1 ({craftingInventory['Voltage Node'] || 0} owned)</p>
                  <p>- Synthcore Fragment: 1 ({craftingInventory['Synthcore Fragment'] || 0} owned)</p>
                </div>
              </button>
            </div>
          </div>
        )}

        {selectedTab === 'special' && (
          <div className="crafting-section">
            <h3>Special Materials</h3>
            <div className="store-items">
              {specialMaterials.map((item, index) => (
                <div key={index} className="store-item special">
                  <div className="item-header">
                    <strong>{item.name}</strong>
                  </div>
                  <div className="item-info">
                    <p>{item.description}</p>
                    <p className="inventory-count">Owned: {craftingInventory[item.name] || 0}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}