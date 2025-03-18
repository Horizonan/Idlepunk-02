
import React from 'react';

export default function Store({ credits, junk, onBuyTrashBag, onBuyPicker, onBuyCart }) {
  const items = [
    { name: 'Trash Bag', cost: 50, action: onBuyTrashBag },
    { name: 'Trash Picker', cost: 150, action: onBuyPicker },
    { name: 'Shopping Cart', cost: 500, action: onBuyCart }
  ];

  return (
    <div className="store-container">
      <h2>Junk Store</h2>
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
    </div>
  );
}
