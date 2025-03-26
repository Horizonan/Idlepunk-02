
import React, { useState, useEffect } from 'react';
import { formatJunkCost, basicMaterials, craftableItems } from './CraftingLogic';

export default function CraftingStore({ junk, onCraft, craftingInventory, onBack }) {
  const [selectedTab, setSelectedTab] = useState('basic');

  const tabs = [
    { id: 'basic', label: 'Basic Materials' },
    { id: 'items', label: 'Craftable Items' },
    { id: 'mysterious', label: 'Mysterious', unlockCondition: () => localStorage.getItem('mysteriousUnlocked') === 'true' || craftingInventory['Synthcore Fragment'] >= 1 }
  ];

  useEffect(() => {
    if (craftingInventory['Synthcore Fragment'] >= 1) {
      localStorage.setItem('mysteriousUnlocked', 'true');
    }
  }, [craftingInventory]);

  const canCraft = (item) => {
    if (item.type === 'basic' && !item.uncraftable) {
      return junk >= (item.cost || 0);
    }
    if (!item.requirements) return true;
    return Object.entries(item.requirements).every(
      ([mat, count]) => (craftingInventory[mat] || 0) >= count
    ) && (!item.onetime || !(craftingInventory[item.name] || 0)) && junk >= (item.cost || 0);
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
                    <p className="owned">Owned: {craftingInventory[item.name] || 0}</p>
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
                  <p>- Stabilized Capacitor: 1 ({craftingInventory['Stabilized Capacitor'] || 0} owned)</p>
                  <p>- Voltage Node: 1 ({craftingInventory['Voltage Node'] || 0} owned)</p>
                  <p>- Synthcore Fragment: 1 ({craftingInventory['Synthcore Fragment'] || 0} owned)</p>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
