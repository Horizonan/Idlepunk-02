
import React, { useState } from 'react';

export default function Store({ credits, onBuyAutoClicker, onBuyAutoClickerV2, onBuyShoppingCart, onBuyHobo, onBuyTrashPicker, itemCosts, ownedItems, onBack }) {
  const [selectedTab, setSelectedTab] = useState('pre-prestige');

  const hasPrestiged = localStorage.getItem('hasPrestiged') === 'true';

  const clickItems = [
    {
      name: 'Trash Picker',
      cost: itemCosts.trashPicker || 100,
      action: onBuyTrashPicker,
      description: '+1 Junk per Click',
      info: 'A simple tool to help you collect more junk.',
      purchasedCount: ownedItems.trashPicker || 0
    },
    {
      name: 'Shopping Cart',
      cost: itemCosts.shoppingCart || 1000,
      action: onBuyShoppingCart,
      description: '+5 Junk per Click',
      info: 'Haul more junk with this rusty cart.',
      purchasedCount: ownedItems.shoppingCart || 0
    },
    {
      name: 'Local Hobo',
      cost: itemCosts.hobo || 5000,
      action: onBuyHobo,
      description: '+25 Junk per Click',
      info: 'A seasoned junk collector joins your cause.',
      purchasedCount: ownedItems.hobo || 0
    }
  ];

  const ascensionItems = [
    {
      name: 'Junk Refinery',
      cost: itemCosts.junkRefinery || 500000,
      description: '+50 Junk/sec',
      info: 'A high-tech facility that processes junk more efficiently.',
      purchasedCount: ownedItems.junkRefinery || 0
    }
  ];

  const tabs = [
    { id: 'pre-prestige', label: 'Pre-Prestige' },
    { id: 'ascension', label: 'First Ascension', unlockCondition: () => hasPrestiged }
  ];

  return (
    <div className="store-container">
      <div className="store-header">
        <h2>Junk Store</h2>
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

      {selectedTab === 'pre-prestige' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <h3 style={{ color: '#9400D3', textAlign: 'center' }}>Click Upgrades</h3>
            <div className="store-items">
              {clickItems.map((item) => (
                <button
                  key={item.name}
                  onClick={item.action}
                  disabled={credits < item.cost}
                  className="store-item"
                >
                  <div className="item-header">
                    <strong>{item.name}</strong>
                    <span className="cost">({item.cost} Junk)</span>
                  </div>
                  <div className="item-info">
                    <p>{item.description}</p>
                    <p>{item.info}</p>
                    <p className="owned">Owned: {item.purchasedCount}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div>
            <h3 style={{ color: '#9400D3', textAlign: 'center' }}>Passive Upgrades</h3>
            <div className="store-items">
              <button
                onClick={onBuyAutoClicker}
                disabled={credits < (itemCosts.autoClicker || 5000)}
                className="store-item"
              >
                <div className="item-header">
                  <strong>Auto Clicker</strong>
                  <span className="cost">({itemCosts.autoClicker || 5000} Junk)</span>
                </div>
                <div className="item-info">
                  <p>+1 Auto Click per second</p>
                  <p>A basic automated clicking machine.</p>
                </div>
              </button>
              <button
                onClick={onBuyAutoClickerV2}
                disabled={credits < (itemCosts.autoClickerV2 || 10000)}
                className="store-item"
              >
                <div className="item-header">
                  <strong>Auto Clicker V2</strong>
                  <span className="cost">({itemCosts.autoClickerV2 || 10000} Junk)</span>
                </div>
                <div className="item-info">
                  <p>+5 Auto Clicks per second</p>
                  <p>An upgraded automated clicking machine.</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedTab === 'ascension' && hasPrestiged && (
        <div className="store-category">
          <h3>First Ascension Upgrades</h3>
          <div className="store-items">
            {ascensionItems.map((item) => (
              <button
                key={item.name}
                className={`store-item ${credits < item.cost ? 'disabled' : ''}`}
                disabled={credits < item.cost}
              >
                <div className="item-header">
                  <strong>{item.name}</strong>
                  <span className="cost">({item.cost} Junk)</span>
                </div>
                <div className="item-info">
                  <p>{item.description}</p>
                  <p>{item.info}</p>
                  <p className="owned">Owned: {item.purchasedCount}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
