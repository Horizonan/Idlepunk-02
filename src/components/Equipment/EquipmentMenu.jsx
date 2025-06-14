
import React, { useState } from 'react';
import { useRecruitmentZustand } from '../../stores/crewRecruitment/recruitmentZustand';
import './EquipmentMenu.css';

export default function EquipmentMenu({ onClose }) {
  const [activeTab, setActiveTab] = useState('inventory');
  
  const equipment = useRecruitmentZustand(state => state.equipment);
  const hiredCrew = useRecruitmentZustand(state => state.hiredCrew);
  const crewLoadouts = useRecruitmentZustand(state => state.crewLoadouts);
  const equipItemToCrew = useRecruitmentZustand(state => state.equipItemToCrew);
  const unequipItemFromCrew = useRecruitmentZustand(state => state.unequipItemFromCrew);
  const getCrewEffectiveStats = useRecruitmentZustand(state => state.getCrewEffectiveStats);

  const getEquippedBy = (equipmentId) => {
    for (const [crewId, loadout] of Object.entries(crewLoadouts)) {
      for (const [slot, item] of Object.entries(loadout)) {
        if (item && item.uniqueId === equipmentId) {
          const crew = hiredCrew.find(c => c.id === crewId);
          return { crew: crew?.name || 'Unknown', slot };
        }
      }
    }
    return null;
  };

  const getAllEquippedItems = () => {
    const equippedItems = [];
    Object.entries(crewLoadouts).forEach(([crewId, loadout]) => {
      const crew = hiredCrew.find(c => c.id === crewId);
      if (crew) {
        Object.entries(loadout).forEach(([slot, item]) => {
          if (item) {
            equippedItems.push({
              ...item,
              equippedBy: crew.name,
              equippedSlot: slot,
              crewId
            });
          }
        });
      }
    });
    return equippedItems;
  };

  return (
    <div className="equipment-menu">
      <div className="equipment-header">
        <h2>EQUIPMENT MANAGEMENT</h2>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>

      <div className="equipment-tabs">
        <button 
          className={`equipment-tab ${activeTab === 'inventory' ? 'active' : ''}`}
          onClick={() => setActiveTab('inventory')}
        >
          INVENTORY
        </button>
        <button 
          className={`equipment-tab ${activeTab === 'equipped' ? 'active' : ''}`}
          onClick={() => setActiveTab('equipped')}
        >
          EQUIPPED
        </button>
        <button 
          className={`equipment-tab ${activeTab === 'stats' ? 'active' : ''}`}
          onClick={() => setActiveTab('stats')}
        >
          STATS
        </button>
      </div>

      {activeTab === 'inventory' && (
        <div className="equipment-content">
          <h3>Equipment Inventory</h3>
          <div className="equipment-stats-summary">
            <div>Total Items: {equipment.length}</div>
            <div>Equipped Items: {getAllEquippedItems().length}</div>
            <div>Available Items: {equipment.length}</div>
          </div>
          
          <div className="equipment-grid">
            {equipment.length === 0 ? (
              <div className="empty-inventory">
                <h4>No Equipment Found</h4>
                <p>Complete crew missions to find equipment!</p>
                <p>Equipment can be found as rewards from successful missions.</p>
              </div>
            ) : (
              equipment.map((item) => {
                const equippedInfo = getEquippedBy(item.uniqueId);
                return (
                  <div key={item.uniqueId} className="equipment-item">
                    <div className="equipment-header-info">
                      <span className="equipment-icon">{item.icon}</span>
                      <div className="equipment-type-badge">{item.type.toUpperCase()}</div>
                    </div>
                    <div className="equipment-details">
                      <h4 className="equipment-name">{item.name}</h4>
                      <div className="equipment-rarity">{item.rarity}</div>
                      <div className="equipment-stats">
                        {Object.entries(item.statBonus).map(([stat, bonus]) => (
                          <span key={stat} className="stat-bonus">
                            {stat}: +{bonus}
                          </span>
                        ))}
                      </div>
                      <p className="equipment-flavor">{item.flavor}</p>
                    </div>
                    {equippedInfo && (
                      <div className="equipped-status">
                        <span>Equipped by {equippedInfo.crew}</span>
                        <span>Slot: {equippedInfo.slot}</span>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {activeTab === 'equipped' && (
        <div className="equipment-content">
          <h3>Equipped Items</h3>
          <div className="equipped-items">
            {getAllEquippedItems().length === 0 ? (
              <div className="no-equipped">
                <p>No items currently equipped</p>
                <p>Visit the Crew > Loadouts tab to equip items to your crew members</p>
              </div>
            ) : (
              getAllEquippedItems().map((item) => (
                <div key={`${item.crewId}-${item.equippedSlot}`} className="equipped-item-card">
                  <div className="equipped-item-header">
                    <span className="equipment-icon">{item.icon}</span>
                    <div className="equipped-item-info">
                      <h4>{item.name}</h4>
                      <div className="equipped-details">
                        <span>Equipped by: {item.equippedBy}</span>
                        <span>Slot: {item.equippedSlot}</span>
                      </div>
                    </div>
                  </div>
                  <div className="equipment-stats">
                    {Object.entries(item.statBonus).map(([stat, bonus]) => (
                      <span key={stat} className="stat-bonus">
                        {stat}: +{bonus}
                      </span>
                    ))}
                  </div>
                  <button 
                    className="unequip-button"
                    onClick={() => unequipItemFromCrew(item.crewId, item.equippedSlot)}
                  >
                    Unequip
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {activeTab === 'stats' && (
        <div className="equipment-content">
          <h3>Equipment Statistics</h3>
          <div className="equipment-stats-overview">
            <div className="stats-section">
              <h4>Collection Stats</h4>
              <div className="stat-grid">
                <div className="stat-item">
                  <span>Total Equipment:</span>
                  <span>{equipment.length + getAllEquippedItems().length}</span>
                </div>
                <div className="stat-item">
                  <span>In Inventory:</span>
                  <span>{equipment.length}</span>
                </div>
                <div className="stat-item">
                  <span>Currently Equipped:</span>
                  <span>{getAllEquippedItems().length}</span>
                </div>
              </div>
            </div>

            <div className="stats-section">
              <h4>Equipment by Type</h4>
              <div className="stat-grid">
                {['weapon', 'armor', 'tool'].map(type => {
                  const typeCount = [...equipment, ...getAllEquippedItems()].filter(item => item.type === type).length;
                  return (
                    <div key={type} className="stat-item">
                      <span>{type.charAt(0).toUpperCase() + type.slice(1)}s:</span>
                      <span>{typeCount}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="stats-section">
              <h4>Equipment by Rarity</h4>
              <div className="stat-grid">
                {['common', 'uncommon', 'rare', 'epic', 'legendary'].map(rarity => {
                  const rarityCount = [...equipment, ...getAllEquippedItems()].filter(item => item.rarity === rarity).length;
                  if (rarityCount === 0) return null;
                  return (
                    <div key={rarity} className="stat-item">
                      <span>{rarity.charAt(0).toUpperCase() + rarity.slice(1)}:</span>
                      <span>{rarityCount}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {hiredCrew.length > 0 && (
              <div className="stats-section">
                <h4>Crew Equipment Summary</h4>
                <div className="crew-equipment-summary">
                  {hiredCrew.map(crew => {
                    const effectiveStats = getCrewEffectiveStats(crew.id);
                    const loadout = crewLoadouts[crew.id] || {};
                    const equippedCount = Object.values(loadout).filter(item => item).length;
                    
                    return (
                      <div key={crew.id} className="crew-summary">
                        <h5>{crew.name}</h5>
                        <div className="crew-equipment-stats">
                          <span>Equipment Slots: {equippedCount}/3</span>
                          <div className="effective-stats">
                            Effective Stats: 
                            {Object.entries(effectiveStats || {}).map(([stat, value]) => (
                              <span key={stat}> {stat}: {value}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
