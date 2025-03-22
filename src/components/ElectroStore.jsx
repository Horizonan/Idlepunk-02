
import React from 'react';

export default function ElectroStore({ credits, onBuySolderingIron, onBuyMultimeter, onBack }) {
  const items = [
    { name: 'Soldering Iron', cost: 1000, action: onBuySolderingIron },
    { name: 'Multimeter', cost: 2000, action: onBuyMultimeter }
  ];

  return (
    <div className="store-container">
      <div className="store-header">
        <h2>Electronics Store</h2>
        <button onClick={onBack}>Close</button>
      </div>
      <div className="store-items">
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
      <button onClick={onBack}>Back</button>
    </div>
  );
}
