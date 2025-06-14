import React, { useState, useEffect } from 'react';
import './scrapCombat.css'

export default function ScraptagonCombat({ playerStats, equipment, onCombatEnd, onClose }) {
  const [selectedStage, setSelectedStage] = useState(null);
  const [activeTab, setActiveTab] = useState('combat');
  const [playerEquipment, setPlayerEquipment] = useState(() => {
    const saved = localStorage.getItem('playerEquipment');
    return saved ? JSON.parse(saved) : {
      head: null,
      leftHand: null,
      rightHand: null,
      torso: null,
      legs: null,
      feet: null
    };
  });
  const [playerInventory, setPlayerInventory] = useState(() => {
    const saved = localStorage.getItem('playerInventory');
    if (saved) {
      return JSON.parse(saved);
    }
    // Initialize with equipment from crew system if available
    try {
      const crewEquipment = JSON.parse(localStorage.getItem('recruitmentZustand') || '{}');
      if (crewEquipment.state && crewEquipment.state.equipment) {
        return [...crewEquipment.state.equipment];
      }
    } catch (e) {
      console.log('Could not load crew equipment');
    }
    return [];
  });
  const [winStreak, setWinStreak] = useState(() => {
    return parseInt(localStorage.getItem('trainingWinStreak') || '0');
  });
  const [combatState, setCombatState] = useState({
    inProgress: false,
    playerHealth: playerStats?.maxHealth || 100,
    enemyHealth: 150,
    combatLog: [],
    victory: false,
    statusEffects: [],
    playerAttacking: false,
    criticalHit: false
  });

  const triggerPlayerAttack = (isCritical = false) => {
    setCombatState(prev => ({ ...prev, playerAttacking: true, criticalHit: isCritical }));
    setTimeout(() => {
      setCombatState(prev => ({ ...prev, playerAttacking: false, criticalHit: false }));
    }, isCritical ? 700 : 500);
  };

  const equipItem = (item, slot) => {
    const newEquipment = { ...playerEquipment };
    const newInventory = [...playerInventory];

    // If there's already an item in this slot, move it back to inventory
    if (newEquipment[slot]) {
      newInventory.push(newEquipment[slot]);
    }

    // Equip the new item
    newEquipment[slot] = item;

    // Remove item from inventory
    const itemIndex = newInventory.findIndex(invItem => invItem.uniqueId === item.uniqueId);
    if (itemIndex !== -1) {
      newInventory.splice(itemIndex, 1);
    }

    setPlayerEquipment(newEquipment);
    setPlayerInventory(newInventory);
    localStorage.setItem('playerEquipment', JSON.stringify(newEquipment));
    localStorage.setItem('playerInventory', JSON.stringify(newInventory));
  };

  const unequipItem = (slot) => {
    const newEquipment = { ...playerEquipment };
    const newInventory = [...playerInventory];

    if (newEquipment[slot]) {
      newInventory.push(newEquipment[slot]);
      newEquipment[slot] = null;

      setPlayerEquipment(newEquipment);
      setPlayerInventory(newInventory);
      localStorage.setItem('playerEquipment', JSON.stringify(newEquipment));
      localStorage.setItem('playerInventory', JSON.stringify(newInventory));
    }
  };

  const getSlotTypeForEquipment = (equipmentType) => {
    const typeMapping = {
      weapon: ['leftHand', 'rightHand'],
      armor: ['torso'],
      tool: ['head', 'legs', 'feet']
    };
    return typeMapping[equipmentType] || [];
  };

  const calculateEffectiveStats = () => {
    let effectiveStats = { ...playerStats };

    Object.values(playerEquipment).forEach(item => {
      if (item && item.statBonus) {
        Object.entries(item.statBonus).forEach(([stat, bonus]) => {
          if (effectiveStats[stat] !== undefined) {
            effectiveStats[stat] += bonus;
          }
        });
      }
    });

    return effectiveStats;
  };

  const stages = {
    training: {
      name: "Training Dummy",
      description: "Practice your combat skills against a basic training dummy",
      unlocked: true,
      enemy: {
        name: "TRAINING DUMMY v1.0",
        maxHealth: 75,
        damage: 2,
        attackSpeed: 1500, // slower attacks
        defense: 5
      },
      rewards: {
        junk: 100,
        credits: 5
      }
    },
    scrapper: {
      name: "Cyber Scrapper",
      description: "Battle against a dangerous cyber-enhanced scrapper",
      unlocked: winStreak >= 15,
      unlockRequirement: "Defeat 15 Training Dummies in a row",
      enemy: {
        name: "CYBER-SCRAPPER MK.III",
        maxHealth: 150,
        damage: 5,
        attackSpeed: 1000,
        defense: 10
      },
      rewards: {
        junk: 500,
        credits: 25
      }
    }
  };

  const currentStage = selectedStage ? stages[selectedStage] : null;
  const enemy = currentStage?.enemy || stages.training.enemy;

  const startCombat = () => {
    if (!selectedStage) return;

    const effectiveStats = calculateEffectiveStats();

    setCombatState({
      inProgress: true,
      playerHealth: effectiveStats.maxHealth,
      enemyHealth: enemy.maxHealth,
      combatLog: [`Combat started against ${enemy.name}!`],
      victory: false,
      statusEffects: [],
      playerAttacking: false,
      criticalHit: false
    });
  };

  useEffect(() => {
    if (combatState.inProgress && combatState.playerHealth > 0) {
      const effectiveStats = calculateEffectiveStats();

      const playerInterval = setInterval(() => {
        setCombatState(prev => {
          if (prev.playerHealth <= 0 || !prev.inProgress) {
            return prev;
          }

          const isCritical = Math.random() < 0.2;
          const damage = effectiveStats.attack * (1 - enemy.defense / 100) * (isCritical ? 1.5 : 1);
          const newEnemyHealth = Math.max(0, prev.enemyHealth - damage);

          triggerPlayerAttack(isCritical);

          return {
            ...prev,
            enemyHealth: newEnemyHealth,
            combatLog: [...prev.combatLog, 
              isCritical 
                ? `CRITICAL HIT! Player deals ${damage.toFixed(1)} damage!` 
                : `Player deals ${damage.toFixed(1)} damage!`
            ]
          };
        });
      }, 1000 / effectiveStats.attackSpeed);

      const enemyInterval = setInterval(() => {
        setCombatState(prev => {
          if (prev.playerHealth <= 0 || !prev.inProgress) {
            return prev;
          }

          const damage = enemy.damage * (1 - effectiveStats.defense / 100);
          const newPlayerHealth = Math.max(0, prev.playerHealth - damage);

          return {
            ...prev,
            playerHealth: newPlayerHealth,
            combatLog: [...prev.combatLog, `Enemy deals ${damage.toFixed(1)} damage!`]
          };
        });
      }, enemy.attackSpeed);

      return () => {
        clearInterval(playerInterval);
        clearInterval(enemyInterval);
      };
    }
  }, [combatState.inProgress, combatState.playerHealth, playerEquipment]);

  useEffect(() => {
    if (combatState.inProgress && combatState.playerHealth <= 0) {
      // Reset win streak on defeat if in training stage
      if (selectedStage === 'training') {
        setWinStreak(0);
        localStorage.setItem('trainingWinStreak', '0');
      }
      setCombatState(prev => ({
        ...prev,
        inProgress: false,
        victory: false,
        combatLog: [...prev.combatLog, "Defeat! You have been defeated. Training win streak reset!"]
      }));
      onCombatEnd(false);
    } else if (combatState.inProgress && combatState.enemyHealth <= 0 && selectedStage) {
      const rewards = stages[selectedStage].rewards;
      let newWinStreak = winStreak;

      // Increment win streak for training stage
      if (selectedStage === 'training') {
        newWinStreak = winStreak + 1;
        setWinStreak(newWinStreak);
        localStorage.setItem('trainingWinStreak', newWinStreak.toString());
      }

      const streakMessage = selectedStage === 'training' ? 
        ` Training win streak: ${newWinStreak}/15` : '';

      // Give rewards but don't end combat - spawn new enemy
      onCombatEnd(true, rewards);

      setCombatState(prev => ({
        ...prev,
        enemyHealth: enemy.maxHealth, // Reset enemy health for new fight
        victory: false, // Keep combat going
        combatLog: [...prev.combatLog, `Victory! Enemy defeated! Earned ${rewards.junk} junk and ${rewards.credits} credits!${streakMessage}`, `New ${enemy.name} appears!`]
      }));
    }
  }, [combatState.playerHealth, combatState.enemyHealth, combatState.inProgress, selectedStage, winStreak]);

  return (
    <div className="scraptagon-combat">
      <div className="combat-header">
        <h2>SCRAPTAGON COMBAT v2.077</h2>
        <button className="close-combat" onClick={onClose}>Close</button>
      </div>

      <div className="combat-tabs">
        <button 
          className={`combat-tab ${activeTab === 'combat' ? 'active' : ''}`}
          onClick={() => setActiveTab('combat')}
        >
          COMBAT
        </button>
        <button 
          className={`combat-tab ${activeTab === 'equipment' ? 'active' : ''}`}
          onClick={() => setActiveTab('equipment')}
        >
          EQUIPMENT
        </button>
      </div>

      {activeTab === 'combat' && (
        <div className="combat-content">
          <div className="combat-stats">
            <div>PLAYER: [LVL {playerStats?.level || 1}] {playerStats?.name || 'UNKNOWN'}</div>
            <div>COMBAT RATING: {calculateEffectiveStats().attack || 0} DMG / {calculateEffectiveStats().defense || 0} DEF</div>
            {Object.values(playerEquipment).some(item => item) && (
              <div className="equipment-bonus">Equipment Bonuses Active</div>
            )}
          </div>

          {!selectedStage && (
            <div className="stage-selection">
              <h3>SELECT COMBAT STAGE</h3>
              <div className="combat-stats">
                <div>Training Win Streak: {winStreak}/15</div>
                <div>Stages Unlocked: {Object.values(stages).filter(stage => stage.unlocked).length}/{Object.keys(stages).length}</div>
              </div>
              <div className="stage-list">
                {Object.entries(stages).map(([stageKey, stage]) => (
                  <div 
                    key={stageKey} 
                    className={`stage-option ${!stage.unlocked ? 'locked' : ''}`} 
                    onClick={() => stage.unlocked && setSelectedStage(stageKey)}
                  >
                    <div className="stage-name">
                      {stage.name} {!stage.unlocked && '🔒'}
                      {stage.unlocked && stageKey === 'training' && (
                        <span className="stage-progress"> [{winStreak}/15]</span>
                      )}
                      {stage.unlocked && stageKey === 'scrapper' && (
                        <span className="stage-progress"> [∞/∞]</span>
                      )}
                    </div>
                    <div className="stage-description">{stage.description}</div>
                    {!stage.unlocked && stage.unlockRequirement && (
                      <div className="unlock-requirement">Unlock: {stage.unlockRequirement}</div>
                    )}
                    <div className="stage-enemy">Enemy: {stage.enemy.name} (HP: {stage.enemy.maxHealth})</div>
                    <div className="stage-rewards">Rewards: {stage.rewards.junk} Junk, {stage.rewards.credits} Credits</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedStage && (
            <div className="stage-info">
              <div className="current-stage">
                <span>Current Stage: {stages[selectedStage].name} 
                  {selectedStage === 'training' && ` [${winStreak}/15]`}
                  {selectedStage === 'scrapper' && ` [∞/∞]`}
                </span>
                <button className="back-to-stages" onClick={() => setSelectedStage(null)}>Change Stage</button>
              </div>
            </div>
          )}

          {selectedStage && (
            <div className="combat-arena">
              <div className="health-bars">
                <div className="health-bar player">
                  <div className="health-fill" style={{ width: `${(combatState.playerHealth / playerStats.maxHealth) * 100}%` }}></div>
                  <span className="health-text">{Math.ceil(combatState.playerHealth)} / {playerStats.maxHealth}</span>
                </div>
                <div className="health-bar enemy">
                  <div className="health-fill" style={{ width: `${(combatState.enemyHealth / enemy.maxHealth) * 100}%` }}></div>
                  <span className="health-text">{Math.ceil(combatState.enemyHealth)} / {enemy.maxHealth}</span>
                </div>
              </div>

              <div className="combat-visuals">
                <div className={`player-sprite ${
                  combatState.victory ? 'victory' : 
                  combatState.playerAttacking ? 'attacking' :
                  combatState.criticalHit ? 'critical' : ''
                }`}></div>
                <div className={`enemy-sprite ${combatState.inProgress ? 'animated' : ''} ${selectedStage === 'training' ? 'training-dummy' : ''}`}></div>
              </div>

              <div className="combat-log">
                {combatState.combatLog.slice(-5).map((log, index) => (
                  <div key={index} className="log-entry">
                    {log.includes('CRITICAL') || log.includes('SYSTEM') || log.includes('Victory') ? (
                      <span className="status-effect">{log}</span>
                    ) : (
                      log
                    )}
                  </div>
                ))}
              </div>

              {!combatState.inProgress && (
                <button className="start-combat" onClick={startCombat}>
                  Start Combat
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {activeTab === 'equipment' && (
        <div className="equipment-interface">
          <div className="equipment-main">
            <div className="character-display">
              <h3>CHARACTER LOADOUT</h3>
              <div className="character-slots">
                <div className="equipment-slot head-slot">
                  <div className="slot-label">HEAD</div>
                  {playerEquipment.head ? (
                    <div className="equipped-item" onClick={() => unequipItem('head')}>
                      <span className="item-icon">{playerEquipment.head.icon}</span>
                      <div className="item-name">{playerEquipment.head.name}</div>
                    </div>
                  ) : (
                    <div className="empty-slot">+</div>
                  )}
                </div>

                <div className="equipment-row">
                  <div className="equipment-slot hand-slot">
                    <div className="slot-label">LEFT HAND</div>
                    {playerEquipment.leftHand ? (
                      <div className="equipped-item" onClick={()={() => unequipItem('leftHand')}}>
                        <span className="item-icon">{playerEquipment.leftHand.icon}</span>
                        <div className="item-name">{playerEquipment.leftHand.name}</div>
                      </div>
                    ) : (
                      <div className="empty-slot">+</div>
                    )}
                  </div>

                  <div className="equipment-slot torso-slot">
                    <div className="slot-label">TORSO</div>
                    {playerEquipment.torso ? (
                      <div className="equipped-item" onClick={() => unequipItem('torso')}>
                        <span className="item-icon">{playerEquipment.torso.icon}</span>
                        <div className="item-name">{playerEquipment.torso.name}</div>
                      </div>
                    ) : (
                      <div className="empty-slot">+</div>
                    )}
                  </div>

                  <div className="equipment-slot hand-slot">
                    <div className="slot-label">RIGHT HAND</div>
                    {playerEquipment.rightHand ? (
                      <div className="equipped-item" onClick={() => unequipItem('rightHand')}>
                        <span className="item-icon">{playerEquipment.rightHand.icon}</span>
                        <div className="item-name">{playerEquipment.rightHand.name}</div>
                      </div>
                    ) : (
                      <div className="empty-slot">+</div>
                    )}
                  </div>
                </div>

                <div className="equipment-slot legs-slot">
                  <div className="slot-label">LEGS</div>
                  {playerEquipment.legs ? (
                    <div className="equipped-item" onClick={() => unequipItem('legs')}>
                      <span className="item-icon">{playerEquipment.legs.icon}</span>
                      <div className="item-name">{playerEquipment.legs.name}</div>
                    </div>
                  ) : (
                    <div className="empty-slot">+</div>
                  )}
                </div>

                <div className="equipment-slot feet-slot">
                  <div className="slot-label">FEET</div>
                  {playerEquipment.feet ? (
                    <div className="equipped-item" onClick={() => unequipItem('feet')}>
                      <span className="item-icon">{playerEquipment.feet.icon}</span>
                      <div className="item-name">{playerEquipment.feet.name}</div>
                    </div>
                  ) : (
                    <div className="empty-slot">+</div>
                  )}
                </div>
              </div>

              <div className="effective-stats-display">
                <h4>EFFECTIVE STATS</h4>
                <div className="stats-grid">
                  {Object.entries(calculateEffectiveStats()).map(([stat, value]) => (
                    <div key={stat} className="stat-item">
                      <span className="stat-name">{stat.toUpperCase()}:</span>
                      <span className="stat-value">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="inventory-display">
              <h3>INVENTORY</h3>
              <div className="inventory-grid">
                {playerInventory.length === 0 ? (
                  <div className="empty-inventory">
                    <p>No equipment in inventory</p>
                    <p>Complete crew missions to find equipment!</p>
                  </div>
                ) : (
                  playerInventory.map((item) => (
                    <div key={item.uniqueId} className="inventory-item" 
                         onClick={() => {
                           const validSlots = getSlotTypeForEquipment(item.type);
                           if (validSlots.length > 0) {
                             // For now, equip to the first available slot
                             const availableSlot = validSlots.find(slot => !playerEquipment[slot]) || validSlots[0];
                             equipItem(item, availableSlot);
                           }
                         }}>
                      <span className="item-icon">{item.icon}</span>
                      <div className="item-info">
                        <div className="item-name">{item.name}</div>
                        <div className="item-type">{item.type.toUpperCase()}</div>
                        <div className="item-rarity">{item.rarity}</div>
                        <div className="item-stats">
                          {Object.entries(item.statBonus).map(([stat, bonus]) => (
                            <span key={stat}>{stat}: +{bonus}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}