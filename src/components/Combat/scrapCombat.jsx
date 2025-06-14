import React, { useState, useEffect } from 'react';
import './scrapCombat.css'

export default function ScraptagonCombat({ playerStats, equipment, onCombatEnd, onClose }) {
  const [selectedStage, setSelectedStage] = useState(null);
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
  const [showEquipmentModal, setShowEquipmentModal] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState({
    weapon: null,
    armor: null,
    tool: null
  });

  const triggerPlayerAttack = (isCritical = false) => {
    setCombatState(prev => ({ ...prev, playerAttacking: true, criticalHit: isCritical }));
    setTimeout(() => {
      setCombatState(prev => ({ ...prev, playerAttacking: false, criticalHit: false }));
    }, isCritical ? 700 : 500);
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

    setCombatState({
      inProgress: true,
      playerHealth: playerStats.maxHealth,
      enemyHealth: enemy.maxHealth,
      combatLog: [`Combat started against ${enemy.name}!`],
      victory: false,
      statusEffects: [],
      playerAttacking: false,
      criticalHit: false
    });
  };

  const getEffectiveStats = () => {
    let attackBonus = 0;
    let defenseBonus = 0;
    let luckBonus = 0;

    if (selectedEquipment.weapon) {
      attackBonus += selectedEquipment.weapon.statBonus.attack || 0;
    }
    if (selectedEquipment.armor) {
      defenseBonus += selectedEquipment.armor.statBonus.defense || 0;
    }
     if (selectedEquipment.tool) {
      luckBonus += selectedEquipment.tool.statBonus.luck || 0;
    }

    return {
      attack: (playerStats?.attack || 0) + attackBonus,
      defense: (playerStats?.defense || 0) + defenseBonus,
      luck: luckBonus
    };
  };

  useEffect(() => {
    if (combatState.inProgress && combatState.playerHealth > 0) {
      const playerInterval = setInterval(() => {
        setCombatState(prev => {
          if (prev.playerHealth <= 0 || !prev.inProgress) {
            return prev;
          }

          const effectiveStats = getEffectiveStats();
          const baseDamage = Math.floor(Math.random() * 15) + effectiveStats.attack;
          const isCritical = Math.random() < (effectiveStats.luck / 100);
          const damage = isCritical ? Math.floor(baseDamage * 1.5) : baseDamage;
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
      }, 1000 / playerStats.attackSpeed);

      const enemyInterval = setInterval(() => {
        setCombatState(prev => {
          if (prev.playerHealth <= 0 || !prev.inProgress) {
            return prev;
          }

          const damage = enemy.damage * (1 - playerStats.defense / 100);
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
  }, [combatState.inProgress, combatState.playerHealth, playerStats.attackSpeed, playerStats.defense, enemy.attackSpeed, enemy.damage, enemy.defense, getEffectiveStats]);

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
  }, [combatState.playerHealth, combatState.enemyHealth, combatState.inProgress, selectedStage, winStreak, onCombatEnd, enemy.maxHealth]);

  const handleEquipItem = (item, slot) => {
    setSelectedEquipment(prev => ({
      ...prev,
      [slot]: item
    }));
  };

  const handleUnequipItem = (slot) => {
    setSelectedEquipment(prev => ({
      ...prev,
      [slot]: null
    }));
  };

  const getAvailableEquipment = (type) => {
    return equipment?.filter(item => item.type === type) || [];
  };

  return (
    <div className="scraptagon-combat">
      <div className="combat-header">
        <h2>SCRAPTAGON COMBAT v2.077</h2>
        <div className="combat-header-buttons">
          <button 
            className="equipment-button"
            onClick={() => setShowEquipmentModal(true)}
          >
            ⚔️ Equipment
          </button>
          <button className="close-combat" onClick={onClose}>Close</button>
        </div>
      </div>

      {/* Equipment Modal */}
      {showEquipmentModal && (
        <div className="equipment-modal-overlay">
          <div className="equipment-modal">
            <div className="equipment-modal-header">
              <h3>Combat Equipment</h3>
              <button onClick={() => setShowEquipmentModal(false)}>×</button>
            </div>

            <div className="equipment-sections">
              <div className="equipped-items">
                <h4>Currently Equipped</h4>
                <div className="equipment-slots">
                  {['weapon', 'armor', 'tool'].map(slot => (
                    <div key={slot} className="equipment-slot">
                      <div className="slot-label">{slot.toUpperCase()}</div>
                      {selectedEquipment[slot] ? (
                        <div className="equipped-item">
                          <span className="equipment-icon">{selectedEquipment[slot].icon}</span>
                          <div className="equipment-details">
                            <p className="equipment-name">{selectedEquipment[slot].name}</p>
                            <div className="equipment-stats">
                              {Object.entries(selectedEquipment[slot].statBonus).map(([stat, bonus]) => (
                                <span key={stat} className="stat-bonus">
                                  {stat}: +{bonus}
                                </span>
                              ))}
                            </div>
                          </div>
                          <button 
                            className="unequip-btn"
                            onClick={() => handleUnequipItem(slot)}
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <div className="empty-slot">
                          <span className="empty-icon">+</span>
                          <p>Empty {slot} slot</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="effective-stats-display">
                  <h4>Effective Combat Stats</h4>
                  <div className="stats-grid">
                    {Object.entries(getEffectiveStats()).map(([stat, value]) => (
                      <div key={stat} className="stat-item">
                        <span className="stat-name">{stat}:</span>
                        <span className="stat-value">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="available-equipment">
                <h4>Available Equipment</h4>
                <div className="equipment-inventory">
                  {['weapon', 'armor', 'tool'].map(type => (
                    <div key={type} className="equipment-category">
                      <h5>{type.toUpperCase()}S</h5>
                      <div className="equipment-list">
                        {getAvailableEquipment(type).length === 0 ? (
                          <p className="no-equipment">No {type}s available</p>
                        ) : (
                          getAvailableEquipment(type).map((item) => (
                            <div key={item.uniqueId || item.id} className="equipment-item">
                              <span className="equipment-icon">{item.icon}</span>
                              <div className="equipment-info">
                                <p className="equipment-name">{item.name}</p>
                                <p className="equipment-rarity">{item.rarity}</p>
                                <div className="equipment-stats">
                                  {Object.entries(item.statBonus).map(([stat, bonus]) => (
                                    <span key={stat} className="stat-bonus">
                                      {stat}: +{bonus}
                                    </span>
                                  ))}
                                </div>
                                <p className="equipment-flavor">{item.flavor}</p>
                              </div>
                              <button 
                                className="equip-btn"
                                onClick={() => handleEquipItem(item, type)}
                                disabled={selectedEquipment[type]?.uniqueId === item.uniqueId}
                              >
                                {selectedEquipment[type]?.uniqueId === item.uniqueId ? 'Equipped' : 'Equip'}
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="combat-stats">
        <div>PLAYER: [LVL {playerStats?.level || 1}] {playerStats?.name || 'UNKNOWN'}</div>
        <div>COMBAT RATING: {playerStats?.attack || 0} DMG / {playerStats?.defense || 0} DEF</div>
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
  );
}