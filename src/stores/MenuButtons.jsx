import React, { useState, useEffect } from 'react';

export default function MenuButtons({ onStoreSelect, showInventory, craftingInventory = {}, ownedItems = {} }) {
  const [showMenu, setShowMenu] = useState(true);
  const [canCraftPrestigeCrystal, setCanCraftPrestigeCrystal] = useState(false);
  const [hasNewUpgrades, setHasNewUpgrades] = useState(false);

  // Check for new upgrades
  useEffect(() => {
    const checkNewUpgrades = () => {
      const scrapBagUpgradeAvailable = (ownedItems?.trashBag || 0) >= 10 && 
        !localStorage.getItem('upgrade_seen_scrapBagUpgrade') &&
        parseInt(localStorage.getItem('scrapBagUpgrade') || '0') === 0;

      const streetratUpgradeAvailable = (ownedItems?.streetrat || 0) >= 10 && 
        !localStorage.getItem('upgrade_seen_streetratUpgrade') &&
        parseInt(localStorage.getItem('streetratUpgrade') || '0') === 0;

      setHasNewUpgrades(scrapBagUpgradeAvailable || streetratUpgradeAvailable);
    };

    checkNewUpgrades();
    const interval = setInterval(checkNewUpgrades, 1000);
    return () => clearInterval(interval);
  }, [craftingInventory, ownedItems]);

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
          label: (
            <>
              Junk Upgrades{hasNewUpgrades && ' (!)'}
            </>
          ),
          onClick: () => {
            const activeStore = localStorage.getItem('activeStore');
            onStoreSelect(activeStore === 'junkUpgrades' ? null : 'junkUpgrades');
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
            const prestigeCount = parseInt(localStorage.getItem('prestigeCount') || '0');
            if (prestigeCount < 2) {
              return; // Don't allow opening if prestige requirement not met
            }
            const activeStore = localStorage.getItem('activeStore');
            onStoreSelect(activeStore === 'credstore' ? null : 'credstore');
          },
          locked: parseInt(localStorage.getItem('prestigeCount') || '0') < 2
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
          },
          locked: !localStorage.getItem('skillsMenu') || parseInt(localStorage.getItem('prestigeCount') || '0') < 3
        },
        {
          label: (
            <>
              Crew Management
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
            const prestigeCount = parseInt(localStorage.getItem('prestigeCount') || '0');
            if (prestigeCount < 2) {
              return; // Don't allow opening if prestige requirement not met
            }
            const activeStore = localStorage.getItem('activeStore');
            onStoreSelect(activeStore === 'crew' ? null : 'crew');
          },
          locked: parseInt(localStorage.getItem('prestigeCount') || '0') < 2
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
      {showMenu && Object.entries(menuCategories).map(([category, { header, buttons }]) => {
        const visibleButtons = buttons.filter(button => !button.locked);

        // Only render the section if it has visible buttons
        if (visibleButtons.length === 0) return null;

        return (
          <div key={category} className="menu-category">
            <h3 className="menu-category-header">{header}</h3>
            {buttons.map((button, index) => (
              !button.locked && (
                <button
                  key={index}
                  onClick={button.onClick}
                  className="menu-button"
                >
                  {button.label}
                </button>
              )
            ))}
          </div>
        );
      })}
    </div>
  );
}