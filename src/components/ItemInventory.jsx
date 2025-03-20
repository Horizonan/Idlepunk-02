
import React from 'react';

export default function ItemInventory({ craftingInventory, onBack }) {
  const craftedItems = Object.entries(craftingInventory)
    .filter(([name]) => {
      const onetimeItems = ['Click Rig Mk I', 'Auto Toolkit', 'Compression Pack', 'Reinforced Backpack', 'Surge Capacitor Module'];
      return onetimeItems.includes(name);
    });

  return (
    <div className="store-container">
      <h2>Item Inventory</h2>
      <div className="store-items">
        {craftedItems.map(([name, count]) => (
          <div key={name} className="store-item">
            <div className="item-header">
              <strong>{name}</strong>
            </div>
            <div className="item-info">
              <p>Owned: {count}</p>
            </div>
          </div>
        ))}
      </div>
      <button onClick={onBack} style={{ marginTop: '20px' }}>Back</button>
    </div>
  );
}
