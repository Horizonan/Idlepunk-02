
import React, { useState } from 'react';
import '../styles/mobile/CraftingMobile.css';

const formatJunkCost = (cost) => {
  if (cost >= 1000000) {
    return (cost / 1000000).toFixed(1) + 'M';
  } else if (cost >= 1000) {
    return (cost / 1000).toFixed(0) + 'K';
  }
  return cost;
};

export default function ReassemblyBench({ junk, onReassemble, craftingInventory, onBack }) {
  const [selectedTab, setSelectedTab] = useState('breakdown');
  const [mobileInfoModal, setMobileInfoModal] = useState(null);

  const tabs = [
    { id: 'breakdown', label: 'Item Breakdown' },
    { id: 'upgrade', label: 'Item Upgrade' }
  ];

  // Items that can be broken down for materials
  const breakdownItems = [
    {
      name: 'Scrap Core',
      returns: {
        'Metal Plates': 2,
        'Wires': 1
      },
      cost: 0,
      description: 'Break down Scrap Cores to recover basic materials',
      type: 'breakdown'
    },
    {
      name: 'Click Rig Mk I',
      returns: {
        'Wires': 3,
        'Gear Bits': 1
      },
      cost: 0,
      description: 'Disassemble Click Rig to recover components',
      type: 'breakdown'
    },
    {
      name: 'Auto Toolkit',
      returns: {
        'Metal Plates': 2,
        'Gear Bits': 1
      },
      cost: 0,
      description: 'Break down Auto Toolkit for materials',
      type: 'breakdown'
    },
    {
      name: 'Compression Pack',
      returns: {
        'Scrap Core': 1,
        'Wires': 2
      },
      cost: 0,
      description: 'Disassemble Compression Pack',
      type: 'breakdown'
    }
  ];

  // Items that can be upgraded
  const upgradeItems = [
    {
      name: 'Enhanced Click Rig',
      requirements: {
        'Click Rig Mk I': 1,
        'Overclocked Click Rig': 1,
        'Capacitor': 2
      },
      cost: 1500000,
      description: 'Combine two click rigs into an ultimate clicking device. Click power +75%',
      type: 'upgrade',
      effect: 'Replaces both Click Rigs with enhanced version'
    },
    {
      name: 'Fusion Core',
      requirements: {
        'Scrap Core': 3,
        'Glitched Scrap Core': 1,
        'Capacitor': 2
      },
      cost: 2000000,
      description: 'Create a stable fusion core from unstable components',
      type: 'upgrade'
    },
    {
      name: 'Master Toolkit',
      requirements: {
        'Auto Toolkit': 1,
        'Gear Bits': 10,
        'Signal Mesh': 3
      },
      cost: 1000000,
      description: 'Upgrade Auto Toolkit to Master level. Auto Click efficiency +50%',
      type: 'upgrade',
      effect: 'Replaces Auto Toolkit with enhanced version'
    }
  ];

  const canProcess = (item) => {
    if (item.type === 'breakdown') {
      return (craftingInventory[item.name] || 0) > 0;
    } else if (item.type === 'upgrade') {
      const hasRequiredItems = item.requirements ? 
        Object.entries(item.requirements).every(
          ([mat, count]) => (craftingInventory[mat] || 0) >= count
        ) : true;
      const hasRequiredJunk = item.cost ? junk >= item.cost : true;
      return hasRequiredItems && hasRequiredJunk;
    }
    return false;
  };

  const openMobileInfo = (item) => {
    setMobileInfoModal(item);
  };

  const closeMobileInfo = () => {
    setMobileInfoModal(null);
  };

  const handleItemClick = (item, isMobile) => {
    if (isMobile && window.innerWidth <= 768) {
      openMobileInfo(item);
    } else {
      onReassemble(item);
    }
  };

  return (
    <div className="store-container">
      <div className="store-header">
        <h2>Reassembly Bench</h2>
        <div className="store-controls">
          <button onClick={onBack}>Close</button>
        </div>
      </div>
      <div className="crafting-tabs">
        {tabs.map(tab => (
          <button 
            key={tab.id}
            className={`tab-button-rounded ${selectedTab === tab.id ? 'active' : ''}`}
            onClick={() => setSelectedTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="crafting-content">
        {selectedTab === 'breakdown' && (
          <div className="crafting-section">
            <h3>Item Breakdown</h3>
            <p style={{textAlign: 'center', color: '#9400D3', marginBottom: '15px', fontStyle: 'italic'}}>
              Break down existing items to recover materials
            </p>
            <div className="store-items">
              {breakdownItems.filter(item => (craftingInventory[item.name] || 0) > 0).map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleItemClick(item, true)}
                  disabled={!canProcess(item)}
                  className="store-item"
                >
                  <div className="item-header">
                    <strong>{item.name}</strong>
                  </div>
                  <div className="item-info">
                    <p>{item.description}</p>
                    <div>
                      <p>Returns:</p>
                      {Object.entries(item.returns).map(([mat, count]) => (
                        <p key={mat}>- {mat}: {count}</p>
                      ))}
                    </div>
                    <p className="owned">Available: {craftingInventory[item.name] || 0}</p>
                  </div>
                </button>
              ))}
              {breakdownItems.filter(item => (craftingInventory[item.name] || 0) > 0).length === 0 && (
                <div style={{textAlign: 'center', color: '#666', padding: '20px'}}>
                  No items available for breakdown
                </div>
              )}
            </div>
          </div>
        )}

        {selectedTab === 'upgrade' && (
          <div className="crafting-section">
            <h3>Item Upgrade</h3>
            <p style={{textAlign: 'center', color: '#9400D3', marginBottom: '15px', fontStyle: 'italic'}}>
              Combine and upgrade existing items into more powerful versions
            </p>
            <div className="store-items">
              {upgradeItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleItemClick(item, true)}
                  disabled={!canProcess(item)}
                  className="store-item"
                >
                  <div className="item-header">
                    <strong>{item.name}</strong>
                  </div>
                  <div className="item-info">
                    <p>{item.description}</p>
                    {item.effect && <p style={{color: '#00FF00', fontStyle: 'italic'}}>{item.effect}</p>}
                    {item.requirements && (
                      <div>
                        <p>Requirements:</p>
                        {Object.entries(item.requirements).map(([mat, count]) => (
                          <p key={mat}>- {mat}: {count} ({craftingInventory[mat] || 0} owned)</p>
                        ))}
                      </div>
                    )}
                    {item.cost > 0 && <p>Cost: {formatJunkCost(item.cost)} Junk</p>}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Info Modal */}
      {mobileInfoModal && (
        <div className="mobile-info-overlay" onClick={closeMobileInfo}>
          <div className="mobile-info-popup" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-info-header">
              <h3>{mobileInfoModal.name}</h3>
              <button onClick={closeMobileInfo} className="close-mobile-info">×</button>
            </div>
            <div className="mobile-info-content">
              <p className="mobile-info-description">{mobileInfoModal.description}</p>

              {mobileInfoModal.type === 'breakdown' && mobileInfoModal.returns && (
                <div className="mobile-info-requirements">
                  <h4>Returns:</h4>
                  {Object.entries(mobileInfoModal.returns).map(([mat, count]) => (
                    <p key={mat}>{mat}: {count}</p>
                  ))}
                </div>
              )}

              {mobileInfoModal.requirements && (
                <div className="mobile-info-requirements">
                  <h4>Requirements:</h4>
                  {Object.entries(mobileInfoModal.requirements).map(([mat, count]) => {
                    const owned = craftingInventory[mat] || 0;
                    return (
                      <p key={mat} className={owned >= count ? 'requirement-met' : 'requirement-unmet'}>
                        {mat}: {count} ({owned} owned)
                      </p>
                    );
                  })}
                </div>
              )}

              {mobileInfoModal.cost && (
                <div className="mobile-info-cost">
                  <h4>Cost:</h4>
                  <p>{formatJunkCost(mobileInfoModal.cost)} Junk</p>
                </div>
              )}

              {mobileInfoModal.type === 'breakdown' && (
                <div className="mobile-info-owned">
                  <h4>Available:</h4>
                  <p>{craftingInventory[mobileInfoModal.name] || 0}</p>
                </div>
              )}
            </div>

            <div className="mobile-info-actions">
              <button 
                onClick={() => {
                  onReassemble(mobileInfoModal);
                  closeMobileInfo();
                }}
                disabled={!canProcess(mobileInfoModal)}
                className="craft-button"
              >
                {mobileInfoModal.type === 'breakdown' ? 'Break Down' : 'Upgrade'}
              </button>
              <button onClick={closeMobileInfo} className="cancel-button">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
