
import React from 'react';
import '../styles/Store.css';

export default function PurchasedItemsList({ 
  title = "Completed Purchases", 
  purchasedItems = [], 
  className = "" 
}) {
  if (purchasedItems.length === 0) {
    return null;
  }

  return (
    <div className={`purchased-items-section ${className}`}>
      <h3 className="purchased-items-title">{title}</h3>
      <div className="purchased-items-grid">
        {purchasedItems.map((item, index) => (
          <div key={index} className="purchased-item">
            <div className="purchased-item-header">
              <span className="purchased-item-name">{item.name}</span>
              {item.count > 1 && (
                <span className="purchased-item-count">×{item.count}</span>
              )}
            </div>
            <div className="purchased-item-effect">{item.effect}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
