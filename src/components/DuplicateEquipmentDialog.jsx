
import React, { useState, useEffect } from 'react';
import { useRecruitmentZustand } from '../stores/crewRecruitment/recruitmentZustand';
import './DuplicateEquipmentDialog.css';

export default function DuplicateEquipmentDialog() {
  const [isVisible, setIsVisible] = useState(false);
  const [equipment, setEquipment] = useState(null);
  const [itemId, setItemId] = useState(null);
  const handleDuplicateEquipment = useRecruitmentZustand(state => state.handleDuplicateEquipment);

  useEffect(() => {
    const handleShowDialog = (event) => {
      const { equipment, itemId } = event.detail;
      setEquipment(equipment);
      setItemId(itemId);
      setIsVisible(true);
    };

    window.addEventListener('showDuplicateEquipmentDialog', handleShowDialog);
    return () => window.removeEventListener('showDuplicateEquipmentDialog', handleShowDialog);
  }, []);

  const handleDecision = (decision) => {
    if (equipment) {
      handleDuplicateEquipment(equipment, decision);
    }
    setIsVisible(false);
    setEquipment(null);
    setItemId(null);
  };

  if (!isVisible || !equipment) return null;

  return (
    <div className="duplicate-equipment-overlay">
      <div className="duplicate-equipment-dialog">
        <div className="dialog-header">
          <h3>🔄 Duplicate Equipment Found</h3>
        </div>
        
        <div className="dialog-content">
          <div className="equipment-display">
            <span className="equipment-icon">{equipment.icon}</span>
            <div className="equipment-info">
              <h4>{equipment.name}</h4>
              <p className="equipment-rarity">{equipment.rarity}</p>
              <p className="equipment-type">{equipment.type.toUpperCase()}</p>
              <div className="equipment-stats">
                {Object.entries(equipment.statBonus).map(([stat, bonus]) => (
                  <span key={stat} className="stat-bonus">{stat}: +{bonus}</span>
                ))}
              </div>
              <p className="equipment-flavor">{equipment.flavor}</p>
            </div>
          </div>

          <div className="duplicate-message">
            <p>You already own this equipment. What would you like to do?</p>
          </div>

          <div className="dialog-actions">
            <button 
              className="keep-button"
              onClick={() => handleDecision('keep')}
            >
              📦 Keep (Add to Inventory)
            </button>
            <button 
              className="sell-button"
              onClick={() => handleDecision('sell')}
            >
              💰 Sell for {equipment.autoSellValue || 5} Scratz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
