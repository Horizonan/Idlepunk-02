import { useState, useEffect } from 'react';

export default function MenuButtons({ onStoreSelect, showInventory, craftingInventory = {} }) {
  const [showMenu, setShowMenu] = useState(true);
  const [canCraftPrestigeCrystal, setCanCraftPrestigeCrystal] = useState(false);

  // Check if Prestige Crystal is craftable
  useEffect(() => {
    const junk = parseInt(localStorage.getItem('junk') || '0');
    const hasStabilizedCapacitor = (craftingInventory['Stabilized Capacitor'] || 0) >= 1;
    const hasVoltageNode = (craftingInventory['Voltage Node'] || 0) >= 1;
    const hasSynthcoreFragment = (craftingInventory['Synthcore Fragment'] || 0) >= 1;
    const hasQuantumEntangler = (craftingInventory['Quantum Entangler'] || 0) >= 1;

    const canCraft = junk >= 10000000 && hasStabilizedCapacitor && hasVoltageNode && hasSynthcoreFragment && hasQuantumEntangler;
    setCanCraftPrestigeCrystal(canCraft);
  }, [craftingInventory]);

  const menuCategories = {
    stores: {
      header: 'STORES',
      buttons: [
        {
          label: 'Junk Store',
          onClick: () => {
            const activeStore = localStorage.getItem('activeStore');
            onStoreSelect(activeStore === 'store' ? null : 'store');
          }
        },
        {
          label: 'Electro Store',
          onClick: () => {
            const activeStore = localStorage.getItem('activeStore');
            onStoreSelect(activeStore === 'electrostore' ? null : 'electrostore');
          },
          locked: !localStorage.getItem('hasPrestiged')
        },
        {
          label: 'Scratz Store',
          onClick: () => {
            const activeStore = localStorage.getItem('activeStore');
            onStoreSelect(activeStore === 'credstore' ? null : 'credstore');
          }
        }
      ]
    },
    skills: {
      header: 'SKILLS',
      buttons: [
        {
          label: (
            <>
              Skills Center
              {(() => {
                try {
                  const crewStorage = JSON.parse(localStorage.getItem('crew-storage') || '{}');
                  const hasCompletedMission = (crewStorage.state?.successfulMissions || 0) > 0;
                  const heistingSpeedSeen = localStorage.getItem('heistingSpeedSeen') === 'true';

                  if (hasCompletedMission && !heistingSpeedSeen) {
                    return (
                      <span style={{
                        color: '#00FF00',
                        marginLeft: '8px',
                        fontSize: '1.2em',
                        textShadow: '0 0 10px #00FF00'
                      }}>
                        (!)
                      </span>
                    );
                  }
                  return null;
                } catch {
                  return null;
                }
              })()}
            </>
          ),
          onClick: () => {
            const event = new CustomEvent('toggleUpgradeStats');
            window.dispatchEvent(event);
          }
        },
        {
          label: (
            <>
              Crew
              {(() => {
                try {
                  const crewStorage = JSON.parse(localStorage.getItem('crew-storage') || '{}');
                  const state = crewStorage.state || {};

                  // Check if there's a completed mission (mission exists but timeLeft <= 0)
                  const hasCompletedMission = state.activeMission && 
                    state.missionStartTime && 
                    (Date.now() - state.missionStartTime) >= (state.activeMission.duration * 1000);

                  // Check if signal relay mini-game should be played
                  const hasSignalRelay = state.showMiniGame === true;

                  if (hasCompletedMission || hasSignalRelay) {
                    return (
                      <span style={{
                        color: '#00FF00',
                        marginLeft: '8px',
                        fontSize: '1.2em',
                        textShadow: '0 0 10px #00FF00'
                      }}>
                        (!)
                      </span>
                    );
                  }
                  return null;
                } catch {
                  return null;
                }
              })()}
            </>
          ),
          onClick: () => {
            const activeStore = localStorage.getItem('activeStore');
            onStoreSelect(activeStore === 'crew' ? null : 'crew');
          },
          locked: false
        },
        {
          label: 'Equipment',
          onClick: () => {
            const activeStore = localStorage.getItem('activeStore');
            onStoreSelect(activeStore === 'equipment' ? null : 'equipment');
          },
          locked: false
        }
      ]
    },
    crafting: {
      header: 'CRAFTING',
      buttons: [
        {
          label: `Crafting Menu${canCraftPrestigeCrystal ? ' (!)' : ''}`,
          onClick: () => {
            const activeStore = localStorage.getItem('activeStore');
            onStoreSelect(activeStore === 'craft' ? null : 'craft');
          }
        },
        ...(showInventory ? [{
          label: 'Item Inventory',
          onClick: () => {
            const activeStore = localStorage.getItem('activeStore');
            onStoreSelect(activeStore === 'inventory' ? null : 'inventory');
          }
        }] : [])
      ]
    }
  };

  return (
    <div className={`mainStore ${!showMenu ? 'collapsed' : ''}`}>
      <button className="menu-toggle" onClick={() => setShowMenu(prev => !prev)}>
        {showMenu ? 'Close' : '≡'}
      </button>
      {showMenu && Object.entries(menuCategories).map(([category, { header, buttons }]) => (
        <div key={category} className="menu-category">
          <h3 className="menu-category-header">{header}</h3>
          {buttons.map((button, index) => (
            <button
              key={index}
              onClick={button.onClick}
              className={`menu-button ${button.locked ? 'locked-store' : ''}`}
              disabled={button.locked}
            >
              {button.label} {button.locked && '🔒'}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}