import React, { useState } from 'react';

export default function CraftingStore({ junk, onCraft, craftingInventory, onBack }) {
  const [selectedTab, setSelectedTab] = useState('basic');

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
    },
    {
      name: 'Stabilized Capacitor Voltage Node',
      cost: 1000000,
      description: 'A highly charged capacitor',
      type: 'basic'
    },
    {
      name: 'Synthcore Fragment',
      cost: 500000,
      description: 'A piece of a powerful synthcore',
      type: 'basic'
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

  const mysteriousItems = [
    {
      name: 'Prestige Crystal',
      requirements: {
        'Stabilized Capacitor Voltage Node': 1,
        'Synthcore Fragment': 1,
        'Scrap': 10000000
      },
      cost: 0,
      description: 'Used to increase prestige level',
      type: 'mysterious'
    }
  ];

  const canCraft = (item) => {
    if (item.type === 'basic') {
      return junk >= item.cost;
    } else {
      return Object.entries(item.requirements).every(
        ([mat, count]) => (craftingInventory[mat] || 0) >= count
      );
    }
  };

  return (
    <div className="store-container">
      <div className="store-header">
        <h2>Crafting Station</h2>
        <button onClick={onBack}>Close</button>
      </div>
      <div className="store-tabs">
        <button
          className={`store-tab ${selectedTab === 'basic' ? 'active' : ''}`}
          onClick={() => setSelectedTab('basic')}
        >
          Basic
        </button>
        <button
          className={`store-tab ${selectedTab === 'crafted' ? 'active' : ''}`}
          onClick={() => setSelectedTab('crafted')}
        >
          Crafted
        </button>
        <button
          className={`store-tab ${selectedTab === 'mysterious' ? 'active' : ''}`}
          onClick={() => setSelectedTab('mysterious')}
        >
          Mysterious
        </button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {selectedTab === 'basic' && (
          <div>
            <h3 style={{ color: '#9400D3', textAlign: 'center' }}>Basic Materials</h3>
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
                    {item.cost && <span className="cost">({item.cost} Junk)</span>}
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
        {selectedTab === 'crafted' && (
          <div>
            <h3 style={{ color: '#9400D3', textAlign: 'center' }}>Craftable Items</h3>
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
                    {item.cost && <p>- Junk: {item.cost}</p>}
                    {Object.entries(item.requirements).map(([mat, count]) => (
                      <p key={mat}>- {mat}: {count} ({craftingInventory[mat] || 0} owned)</p>
                    ))}
                    <p className="owned">Owned: {craftingInventory[item.name] || 0}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
        {selectedTab === 'mysterious' && (
          <div>
            <h3 style={{ color: '#9400D3', textAlign: 'center' }}>Mysterious Items</h3>
            <div className="store-items">
              {mysteriousItems.map((item) => (
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
                    {item.cost && <p>- Junk: {item.cost}</p>}
                    {Object.entries(item.requirements).map(([mat, count]) => (
                      <p key={mat}>- {mat}: {count} ({craftingInventory[mat] || 0} owned)</p>
                    ))}
                    <p className="owned">Owned: {craftingInventory[item.name] || 0}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}