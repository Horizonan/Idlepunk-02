
import React from 'react';

export default function ElectroStore({ credits, onBuySolderingIron, onBuyMultimeter, onBack }) {
  const items = [
    { name: 'Soldering Iron', cost: 1000, action: onBuySolderingIron },
    { name: 'Multimeter', cost: 2000, action: onBuyMultimeter }
  ];

  return (
    <div className="store-container">
      <h2>Electronics Store</h2>
      <div className="store-items">
        <button className="store-item back-button" onClick={onBack}>← Back to Menu</button>
        {items.map((item) => (
          <button
            key={item.name}
            onClick={item.action}
            disabled={credits < item.cost}
            className="store-item"
          >
            Buy {item.name} ({item.cost}C)
          </button>
        ))}
      </div>
    </div>
  );
}
