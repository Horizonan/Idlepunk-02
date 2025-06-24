
import React from 'react';
import './ConsumablePopup.css';

export default function ConsumablePopup({ 
  isOpen, 
  itemName, 
  itemDetails, 
  onConfirm, 
  onCancel 
}) {
  if (!isOpen) return null;

  return (
    <div className="consumable-popup-overlay">
      <div className="consumable-popup-container">
        <div className="consumable-popup-header">
          <h3>🛢️ Use Consumable?</h3>
        </div>

        <div className="consumable-popup-content">
          <div className="consumable-display">
            <span className="consumable-icon">{itemDetails?.icon}</span>
            <div className="consumable-info">
              <h4>{itemName}</h4>
              <p className="consumable-description">{itemDetails?.description}</p>
              <p className="consumable-effect">{itemDetails?.effect}</p>
            </div>
          </div>

          <div className="confirmation-message">
            <p>Are you sure you want to use this item?</p>
          </div>

          <div className="consumable-popup-actions">
            <button 
              className="use-button"
              onClick={onConfirm}
            >
              ✅ Use Item
            </button>
            <button 
              className="cancel-button"
              onClick={onCancel}
            >
              ❌ Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
