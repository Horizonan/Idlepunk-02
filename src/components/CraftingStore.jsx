
import React, { useState } from 'react';

export default function CraftingStore({ junk, onCraft, craftingInventory, onBack }) {
  const [selectedTab, setSelectedTab] = useState('basic');

  const basicMaterials = [
    {
      name: 'Wires',
      cost: 250,
      description: 'Basic conductive material',
      type: 'basic'
    },
    {
      name: 'Metal Plates',
      cost: 500,
      description: 'Sturdy metal sheets',
      type: 'basic'
    },
    {
      name: 'Gear Bits',
      cost: 300,
      description: 'Mechanical components',
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
      description: 'A basic power core made from scrap',
      type: 'crafted'
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
      <h2>Crafting Station</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <h3 style={{ color: '#9400D3', textAlign: 'center' }}>Basic Materials</h3>
          <div className="store-items">
            {basicMaterials.map((item) => (
              <button
                key={item.name}
                onClick={() => onCraft(item)}
                disabled={!canCraft(item)}
                className="store-item"
              >
                <div className="item-header">
                  <strong>{item.name}</strong>
                  <span className="cost">({item.cost} Junk)</span>
                </div>
                <div className="item-info">
                  <p>{item.description}</p>
                  <p className="owned">Owned: {craftingInventory[item.name] || 0}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
        <div>
          <h3 style={{ color: '#9400D3', textAlign: 'center' }}>Craftable Items</h3>
          <div className="store-items">
            {craftableItems.map((item) => (
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
                  <p>Requirements:</p>
                  {Object.entries(item.requirements).map(([mat, count]) => (
                    <p key={mat}>- {mat}: {count} ({craftingInventory[mat] || 0} owned)</p>
                  ))}
                  <p className="owned">Owned: {craftingInventory[item.name] || 0}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      <button onClick={onBack} style={{ marginTop: '20px' }}>Back</button>
    </div>
  );
}
