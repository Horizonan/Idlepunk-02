
import React from 'react';

export default function Store({ credits, itemCosts, onBuyTrashBag, onBuyPicker, onBuyStreetrat, onBuyCart, onBack }) {
  const items = [
    { name: 'Scrap Bag', cost: itemCosts.trashBag, description: '+1 Junk/Click, +10% Kosten pro Kauf', action: onBuyTrashBag },
    { name: 'Trash Picker', cost: itemCosts.trashPicker, description: '+3 Junk/Click, +10% Kosten', action: onBuyPicker },
    { name: 'Streetrat', cost: itemCosts.streetrat, description: '+1 Junk/sec, +15% Kosten', action: onBuyStreetrat },
    { name: 'Shopping Cart', cost: itemCosts.cart, description: '+5 Junk/sec, +15% Kosten', action: onBuyCart }
  ];

  return (
    <div className="store-container">
      <h2>Junk Store</h2>
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
