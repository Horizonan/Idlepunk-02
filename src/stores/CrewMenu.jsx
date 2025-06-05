import React, { useState, useEffect } from 'react';
import '../styles/CrewMenu.css';
import { useRecruitmentZustand } from "./crewRecruitment/recruitmentZustand";
import { RecruitmentGame } from "./crewRecruitment/RecruitmentGame";
import { missions, calculateMissionSuccess } from "./crewRecruitment/missions";
import { equipmentDatabase, getAllEquipment } from "./crewRecruitment/equipment";
import StaminaTimer from '../components/StaminaTimer';


export default function CrewMenu({ onClose, setCredits, credits, setJunk, junk }) {
  const [activeTab, setActiveTab] = useState('view');
  const [showCrewSelect, setShowCrewSelect] = useState(false);
  const storedSelectedCrew = useRecruitmentZustand(state => state.selectedCrew);
  const [selectedCrew, setSelectedCrew] = useState(storedSelectedCrew || []);
  const activeMission = useRecruitmentZustand(state => state.activeMission);
  const missionStartTime = useRecruitmentZustand(state => state.missionStartTime);
  const setActiveMission = useRecruitmentZustand(state => state.setActiveMission);
  const showMiniGame = useRecruitmentZustand(state => state.showMiniGame);
  const completeMiniGame = useRecruitmentZustand(state => state.completeMiniGame);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showMiniGameModal, setShowMiniGameModal] = useState(false);
  

  useEffect(() => {
    if (activeMission && missionStartTime) {
      const timer = setInterval(() => {
        // Check for mini-game trigger
        useRecruitmentZustand.getState().checkForMiniGame();
        
        // Calculate time remaining using the new method
        const remaining = useRecruitmentZustand.getState().getMissionTimeRemaining();
        setTimeLeft(remaining);

        if (remaining <= 0) {
          clearInterval(timer);
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [activeMission, missionStartTime]);

  // Watch for mini-game trigger
  useEffect(() => {
    if (showMiniGame && !showMiniGameModal) {
      setShowMiniGameModal(true);
    }
  }, [showMiniGame, showMiniGameModal]);

  // Listen for mini-game completion from App level
  useEffect(() => {
    const handleMiniGameComplete = (event) => {
      const success = event.detail?.success || false;
      setShowMiniGameModal(false);
      completeMiniGame(success);
    };

    window.addEventListener('miniGameComplete', handleMiniGameComplete);
    return () => window.removeEventListener('miniGameComplete', handleMiniGameComplete);
  }, []);

  const toggleCrewSelection = (crewId) => {
    setSelectedCrew(prev => {
      let newSelection;
      if (prev.includes(crewId)) {
        newSelection = prev.filter(id => id !== crewId);
      } else if (prev.length >= activeMission?.maxCrew) {
        newSelection = prev;
      } else {
        newSelection = [...prev, crewId];
      }
      
      // Update zustand store
      useRecruitmentZustand.setState({ selectedCrew: newSelection });
      return newSelection;
    });
  };

  const startMission = (mission) => {
    const selectedCrewMembers = selectedCrew;
    useRecruitmentZustand.getState().startMission(mission, selectedCrewMembers);
    setShowCrewSelect(false);
  };
  const isRunning = useRecruitmentZustand(state => state.isRunning);
  const startGame = useRecruitmentZustand(state => state.startGame);

  const TabContent = () => {
    const hiredCrew = useRecruitmentZustand(state => state.hiredCrew);
    const unlockedCrew = useRecruitmentZustand(state => state.unlockedCrew);

    switch(activeTab) {
      case 'view':
        return (
          <div className="crew-content">
            <h3>Current Crew</h3>
           
            <div className="crew-grid">
              {hiredCrew.map((crew) => (
                <div key={crew.id} className="crew-slot active">
                  <h4>{crew.name}</h4>
                  <p className="crew-role">{crew.role}</p>
                  <p className="crew-rarity">{crew.rarity}</p>
                  <div className="crew-stats">
                    <div>Tech: {crew.stats?.tech || 0}</div>
                    <div>Grit: {crew.stats?.grit || 0}</div>
                    <div>Stealth: {crew.stats?.stealth || 0}</div>
                    <div>Luck: {crew.stats?.luck || 0}</div>
                    <div>Psyche: {crew.stats?.psyche || 0}</div>
                    <div className="stamina-bar">
                      <div>Stamina: {crew.stamina || 100}</div>
                      <div className="stamina-fill" style={{width: `${crew.stamina || 100}%`}}></div>
                    </div>
                  </div>
                  <div className="crew-perks">
                    <p>Perks:</p>
                    <p>{crew.perks}</p>
                  </div>
                  <button 
                    className="fire-crew-button"
                    onClick={() => {
                      if (confirm(`Are you sure you want to fire ${crew.name}?`)) {
                        useRecruitmentZustand.setState(state => ({
                          hiredCrew: state.hiredCrew.filter(c => c.id !== crew.id),
                          unlockedCrew: [...state.unlockedCrew, crew]
                        }));
                      }
                    }}
                  >
                    🔥 Fire
                  </button>
                </div>
              ))}
              {[...Array(3 - hiredCrew.length)].map((_, i) => (
                <div key={i} className="crew-slot empty">
                  <div className="slot-icon">?</div>
                  <p>Empty Slot</p>
                </div>
              ))}
            </div>
             <StaminaTimer />
          </div>
        );
        
      case 'recruit':
        return (
          <div className="crew-content">
            <h3>Available Recruits</h3>
            <div className="search-section">
              {isRunning && (
                <div className="recruitment-modal">
                  <div className="recruitment-modal-content">
                    <RecruitmentGame />
                  </div>
                </div>
              )}
                <button 
                  type="button"
                  onClick={() => {
                  if(Number(localStorage.getItem('credits')) >= 10){
                    setCredits(prev => prev - 10);
                    startGame();
                  }
                  }}
                  className="search-recruits-button" >
                  🔍 Search for Recruits (10 Credits)
                </button>
              </div>

          <div className="recruit-list">
            {unlockedCrew.map((crew) => (
              <div key={crew.id} className="recruit-card">
                <div className="recruit-stats">
                  <span>💪 {crew.name}</span>
                </div>
                <p>{crew.role}</p>
                <p className="crew-rarity">{crew.rarity}</p>
                <div className="crew-stats">
                  <div>Tech: {crew.stats?.tech || 0}</div>
                  <div>Grit: {crew.stats?.grit || 0}</div>
                  <div>Stealth: {crew.stats?.stealth || 0}</div>
                  <div>Luck: {crew.stats?.luck || 0}</div>
                  <div>Psyche: {crew.stats?.psyche || 0}</div>
                  <div className="stamina-bar">
                    <div>Stamina: {crew.stamina || 100}</div>
                    <div className="stamina-fill" style={{width: `${crew.stamina || 100}%`}}></div>
                  </div>
                </div>
                <p className="crew-perks">{crew.perks}</p>
                <div className="unlock-cost">
                  <p>Unlock Cost: {crew.unlockCost?.amount || 0} {crew.unlockCost?.type}</p>
                  {crew.unlockCost?.items?.length > 0 && (
                    <p>Required Items: {crew.unlockCost.items.join(', ')}</p>
                  )}
                </div>
                <button 
                  className="recruit-button"
                  onClick={() => {
                    const cost = crew.unlockCost?.amount || 0;
                    const costType = crew.unlockCost?.type || 'credits';

                    console.log('Attempting to hire crew:', crew.name);
                    console.log('Cost:', cost, 'Type:', costType);
                    console.log('Current credits:', credits);
                    console.log('Current junk:', junk);

                    let canAfford = false;
                    if (costType === 'credits' && credits >= cost) {
                      console.log('Can afford with credits');
                      setCredits(prev => prev - cost);
                      canAfford = true;
                    } else if (costType === 'junk' && junk >= cost) {
                      console.log('Can afford with junk');
                      setJunk(prev =>prev - cost);
                      canAfford = true;
                    } else {
                      console.log('Cannot afford:', costType === 'credits' ? 'Insufficient credits' : 'Insufficient junk');
                    }

                    if (canAfford) {
                      console.log('Updating crew state...');
                      useRecruitmentZustand.setState(state => {
                        console.log('Current unlocked crew:', state.unlockedCrew.length);
                        console.log('Current hired crew:', state.hiredCrew.length);
                        return {
                          unlockedCrew: state.unlockedCrew.filter(c => c.id !== crew.id),
                          hiredCrew: [...state.hiredCrew, crew]
                        };
                      });
                    }
                  }}
                  disabled={
                    (crew.unlockCost?.type === 'credits' && credits < crew.unlockCost?.amount) ||
                    (crew.unlockCost?.type === 'junk' && junk < crew.unlockCost?.amount) ||
                    hiredCrew.length >= 3
                  }
                >
                  Add to Active Crew ({crew.unlockCost?.amount} {crew.unlockCost?.type})
                </button>
              </div>
            ))}
            <div className="recruit-card locked">
              <div className="recruit-lock">🔒</div>
              <h4>???</h4>
              <p>Complete more missions to unlock</p>
            </div>
          </div>
          </div>
        );
      case 'missions':
        return (
          <div className="crew-content">
            <h3>Available Missions</h3>
            <div className="mission-list">
              {Object.values(missions).map((mission) => (
                <div key={mission.id} className="mission-card">
                  <div className="mission-header">
                    <h4>{mission.name}</h4>
                    <span className="mission-difficulty">{mission.difficulty}</span>
                  </div>
                  <p>{mission.description}</p>
                  <div className="mission-requirements">
                    <h5>Required Stats:</h5>
                    {Object.entries(mission.requirements).map(([stat, value]) => (
                      <span key={stat}>
                        {stat}: {value}
                      </span>
                    ))}
                  </div>
                  <div className="mission-rewards">
                    <h5>Base Rewards:</h5>
                    <span>💰 {mission.baseRewards.credits}</span>
                    <span>🗑️ {mission.baseRewards.junk}</span>
                  </div>
                  <div className="mission-duration">
                    Duration: {Math.floor(mission.duration / 60)}min
                  </div>
                  <button 
                    className="mission-button" 
                    disabled={useRecruitmentZustand(state => state.hiredCrew).length === 0 || activeMission !== null}
                    onClick={() => {
                      if (!activeMission) {
                        setActiveMission(mission);
                        setShowCrewSelect(true);
                      }
                    }}
                  >
                    {useRecruitmentZustand(state => state.hiredCrew).length === 0 
                      ? 'No Crew Available' 
                      : activeMission 
                        ? 'Mission In Progress'
                        : 'Start Mission'}
                  </button>
                  {showCrewSelect && activeMission?.id === mission.id && (
                    <div className="crew-selection-modal">
                      <div className="crew-selection-header">
                        <h3>Select Crew for {mission.name}</h3>
                        <div className="crew-count">Selected: {selectedCrew.length} / {mission.maxCrew}</div>
                        <button onClick={() => setShowCrewSelect(false)}>×</button>
                      </div>
                      <div className="mission-requirements-display">
                        <h4>Required Stats:</h4>
                        <div className="stat-comparison">
                          {Object.entries(mission.requirements).map(([stat, value]) => {
                            const selectedCrewStats = useRecruitmentZustand(state => state.hiredCrew)
                              .filter(crew => selectedCrew.includes(crew.id))
                              .reduce((total, crew) => {
                                const effectiveStats = useRecruitmentZustand.getState().getCrewEffectiveStats(crew.id);
                                return total + (effectiveStats?.[stat.toLowerCase()] || 0);
                              }, 0);

                            return (
                              <div key={stat} className={`stat-row ${selectedCrewStats >= value ? 'met' : 'unmet'}`}>
                                <span className="stat-name">{stat}:</span>
                                <span className="stat-value">{selectedCrewStats} / {value}</span>
                              </div>
                            );
                          })}
                        </div>
                        <div className="success-chance">
                          Success Chance: {calculateMissionSuccess(
                            useRecruitmentZustand(state => state.hiredCrew)
                              .filter(crew => selectedCrew.includes(crew.id))
                              .reduce((stats, crew) => {
                                const effectiveStats = useRecruitmentZustand.getState().getCrewEffectiveStats(crew.id);
                                Object.entries(mission.requirements).forEach(([stat]) => {
                                  stats[stat.toLowerCase()] = (stats[stat.toLowerCase()] || 0) + (effectiveStats?.[stat.toLowerCase()] || 0);
                                });
                                return stats;
                              }, {}),
                            mission.requirements
                          ).toFixed(1)}%
                        </div>
                      </div>
                      <div className="crew-selection-list">
                        {useRecruitmentZustand(state => state.hiredCrew).map((crew) => (
                          <div
                            key={crew.id}
                            className={`crew-selection-item ${selectedCrew.includes(crew.id) ? 'selected' : ''}`}
                            onClick={() => toggleCrewSelection(crew.id)}
                          >
                            <h4>{crew.name}</h4>
                            <p>{crew.role}</p>
                            <div className="crew-stats">
                              <div>Tech: {crew.stats?.tech || 0}</div>
                              <div>Grit: {crew.stats?.grit || 0}</div>
                              <div>Stealth: {crew.stats?.stealth || 0}</div>
                              <div>Luck: {crew.stats?.luck || 0}</div>
                              <div>Psyche: {crew.stats?.psyche || 0}</div>
                              <div className="stamina-bar">
                                <div>Stamina: {crew.stamina || 100}</div>
                                <div className="stamina-fill" style={{width: `${crew.stamina || 100}%`}}></div>
                              </div>
                            </div>
                            <p>{crew.perks}</p>
                          </div>
                        ))}
                      </div>
                      <div className="crew-selection-actions">
                        <button onClick={() => {
                          setShowCrewSelect(false);
                          setActiveMission(null);
                          setSelectedCrew([]);
                          useRecruitmentZustand.setState({ selectedCrew: [] });
                        }}>Cancel</button>
                        <button 
                          onClick={() => startMission(mission)}
                          disabled={selectedCrew.length === 0}
                        >
                          Start Mission
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      case 'ongoing':
        return (
          <div className="crew-content">
            <h3>Ongoing Missions</h3>
            <div className="ongoing-missions-list">
              {activeMission ? (
                <div className="ongoing-mission">
                  <div className="mission-header">
                    <h4>{activeMission.name}</h4>
                    <span className="mission-difficulty">{activeMission.difficulty}</span>
                  </div>
                  <p>{activeMission.description}</p>
                  <div className="mission-crew">
                    <h5>Assigned Crew:</h5>
                    <div className="assigned-crew-list">
                      {selectedCrew.map(crewId => {
                        const crew = useRecruitmentZustand(state => 
                          state.hiredCrew.find(c => c.id === crewId)
                        );
                        return (
                          <div key={crewId} className="assigned-crew-member">
                            <h6>{crew.name}</h6>
                            <p>{crew.role}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="mission-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{
                          width: `${((activeMission.duration - timeLeft) / activeMission.duration) * 100}%`
                        }}
                      ></div>
                    </div>
                    <div className="time-remaining">
                      {timeLeft > 0 ? (
                        `Time Remaining: ${Math.ceil(timeLeft / 60)}min ${Math.ceil(timeLeft % 60)}s`
                      ) : (
                        <button 
                          className="complete-mission-button"
                          onClick={() => {
                            const activeMission = useRecruitmentZustand.getState().activeMission;
                            const selectedCrewMembers = selectedCrew.map(id => 
                              useRecruitmentZustand.getState().hiredCrew.find(c => c.id === id)
                            );

                            const crewStats = selectedCrewMembers.reduce((stats, crew) => {
                              const effectiveStats = useRecruitmentZustand.getState().getCrewEffectiveStats(crew.id);
                              Object.entries(activeMission.requirements).forEach(([stat]) => {
                                const crewStat = effectiveStats?.[stat.toLowerCase()] || 0;
                                stats[stat.toLowerCase()] = (stats[stat.toLowerCase()] || 0) + crewStat;
                                console.log(`Crew member ${crew.name} contributes ${crewStat} to ${stat} (with equipment)`);
                              });
                              return stats;
                            }, {});

                            console.log('Final crew stats:', crewStats);
                            console.log('Mission requirements:', activeMission.requirements);

                            let baseSuccessRate = calculateMissionSuccess(crewStats, activeMission.requirements);
                            
                            // Apply mini-game effects
                            const miniGameBonus = useRecruitmentZustand.getState().miniGameBonus || { rewardChanceBonus: 0, successPenalty: 0 };
                            const finalSuccessRate = Math.max(0, baseSuccessRate - (miniGameBonus.successPenalty * 100));
                            
                            console.log(`Base success rate: ${baseSuccessRate.toFixed(1)}%`);
                            if (miniGameBonus.successPenalty > 0) {
                              console.log(`Mini-game penalty applied: -${(miniGameBonus.successPenalty * 100).toFixed(1)}%`);
                            }
                            console.log(`Final success rate: ${finalSuccessRate.toFixed(1)}%`);

                            const randomRoll = Math.random() * 100;
                            console.log(`Random roll: ${randomRoll.toFixed(1)} vs required: ${finalSuccessRate.toFixed(1)}`);
                            const success = randomRoll < finalSuccessRate;

                            // Calculate rewards
                            let creditsReward = 0;
                            let junkReward = 0;
                            let equipmentRewards = [];
                            let autoSoldItems = [];

                            if (success) {
                              // Increment successful missions counter
                              console.log('Mission successful - incrementing counter');
                              useRecruitmentZustand.setState(state => ({
                                successfulMissions: state.successfulMissions + 1
                              }));
                              
                              creditsReward = activeMission.baseRewards.credits;
                              junkReward = activeMission.baseRewards.junk;

                              // Calculate bonus rewards with mini-game bonus
                              if (activeMission.bonusRewards) {
                                Object.entries(activeMission.bonusRewards).forEach(([item, bonus]) => {
                                  const bonusChance = bonus.chance + (miniGameBonus.rewardChanceBonus || 0);
                                  console.log(`${item} bonus chance: ${(bonus.chance * 100).toFixed(1)}% + ${((miniGameBonus.rewardChanceBonus || 0) * 100).toFixed(1)}% = ${(bonusChance * 100).toFixed(1)}%`);
                                  
                                  if (Math.random() < bonusChance) {
                                    if (item === 'electroShard') creditsReward += 50 * bonus.amount;
                                    if (item === 'rareJunk') junkReward += bonus.amount;
                                    if (item === 'equipment') {
                                      const wasAdded = useRecruitmentZustand.getState().addEquipment(bonus.itemId);
                                      const equipmentData = getAllEquipment().find(eq => eq.id === bonus.itemId);
                                      if (equipmentData) {
                                        if (wasAdded) {
                                          equipmentRewards.push(equipmentData);
                                        } else {
                                          // Item was auto-sold, add to credits display
                                          const sellValue = equipmentData.autoSellValue || 5;
                                          creditsReward += sellValue;
                                          autoSoldItems.push({
                                            name: equipmentData.name,
                                            icon: equipmentData.icon,
                                            sellValue: sellValue
                                          });
                                        }
                                      }
                                    }
                                  }
                                });
                              }
                            } else {
                              // Apply failure penalties
                              creditsReward = activeMission.penalties.failure.credits;
                              // Update crew stamina
                              const staminaPenalty = activeMission.penalties.failure.crewStamina;
                              useRecruitmentZustand.setState(state => ({
                                hiredCrew: state.hiredCrew.map(crew => 
                                  selectedCrew.includes(crew.id) 
                                    ? {...crew, stamina: Math.max(0, (crew.stamina || 100) + staminaPenalty)}
                                    : crew
                                )
                              }));
                            }

                            // Update credits and junk
                            setCredits(prev => prev + creditsReward);
                            setJunk(prev => prev + junkReward);
                            localStorage.setItem('junk', Number(localStorage.getItem('junk') || 0) + junkReward);

                            const missionWindow = document.createElement('div');
                            missionWindow.className = 'mission-completion-window';
                            missionWindow.innerHTML = `
                              <div class="mission-result ${success ? 'success' : 'failure'}">
                                <h2>${success ? 'Mission Successful!' : 'Mission Failed'}</h2>
                                <p>Base Success Rate: ${baseSuccessRate.toFixed(1)}%</p>
                                ${miniGameBonus.successPenalty > 0 ? 
                                  `<p style="color: #FF6666;">Mini-game Penalty: -${(miniGameBonus.successPenalty * 100).toFixed(1)}%</p>` : ''}
                                ${miniGameBonus.rewardChanceBonus > 0 ? 
                                  `<p style="color: #00FF00;">Mini-game Reward Bonus: +${(miniGameBonus.rewardChanceBonus * 100).toFixed(1)}%</p>` : ''}
                                <p>Final Success Rate: ${finalSuccessRate.toFixed(1)}%</p>
                                ${success ? 
                                  `<p class="success-message">${activeMission.successMessages[Math.floor(Math.random() * activeMission.successMessages.length)]}</p>` :
                                  activeMission.penalties.failure.messagePool ?
                                  `<p class="failure-message">${activeMission.penalties.failure.messagePool[Math.floor(Math.random() * activeMission.penalties.failure.messagePool.length)]}</p>` 
                                  : ''}
                                <div class="mission-rewards-display">
                                  <p>Credits: ${creditsReward > 0 ? '+' : ''}${creditsReward}</p>
                                  <p>Junk: ${junkReward > 0 ? '+' : ''}${junkReward}</p>
                                  ${equipmentRewards.length > 0 ? 
                                    equipmentRewards.map(equipment => `
                                      <div class="equipment-reward">
                                        <div class="equipment-reward-header">
                                          <span class="equipment-icon">${equipment.icon}</span>
                                          <span class="equipment-type">${equipment.type.toUpperCase()}</span>
                                        </div>
                                        <h4 class="equipment-name">${equipment.name}</h4>
                                        <div class="equipment-stats">
                                          ${Object.entries(equipment.statBonus).map(([stat, bonus]) => 
                                            `<span class="stat-bonus">${stat}: +${bonus}</span>`
                                          ).join(' ')}
                                        </div>
                                      </div>
                                    `).join('') : ''}
                                  ${autoSoldItems.length > 0 ? 
                                    autoSoldItems.map(item => `
                                      <div class="auto-sold-item">
                                        <div class="auto-sold-header">
                                          <span class="equipment-icon">${item.icon}</span>
                                          <span class="auto-sold-label">AUTO-SOLD</span>
                                        </div>
                                        <h4 class="auto-sold-name">${item.name}</h4>
                                        <p class="auto-sold-value">Sold for ${item.sellValue} Credits (Duplicate)</p>
                                      </div>
                                    `).join('') : ''}
                                </div>
                                <button onclick="this.parentElement.parentElement.remove()">Close</button>
                              </div>
                            `;
                            document.body.appendChild(missionWindow);

                            setActiveMission(null);
                            setSelectedCrew([]);
                            
                            // Reset mini-game bonus state and clear selected crew from store
                            useRecruitmentZustand.setState({ 
                              miniGameBonus: { rewardChanceBonus: 0, successPenalty: 0 },
                              selectedCrew: []
                            });
                          }}
                        >
                          Complete Mission
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="no-missions">
                  <p>No active missions</p>
                  <p>Visit the Missions tab to start one</p>
                </div>
              )}
            </div>

            {/* Mini-game Complication Alert */}
            {showMiniGameModal && (
              <div className="mini-game-overlay">
                <div className="mini-game-container">
                  <div className="mini-game-header">
                    <h3>🚨 Mission Complication Detected! 🚨</h3>
                    <p>Your crew has encountered a signal relay cascade failure!</p>
                    <p>Mission timer is paused until resolved.</p>
                    <p>Click the button below to address the complication.</p>
                  </div>
                  <div className="mini-game-actions">
                    <button 
                      className="mini-game-button"
                      onClick={() => {
                        // Open mini-game at App level
                        window.dispatchEvent(new CustomEvent('showMiniGame'));
                      }}
                    >
                      🛰️ Fix Signal Relay
                    </button>
                    <button 
                      className="mini-game-skip-button"
                      onClick={() => {
                        setShowMiniGameModal(false);
                        completeMiniGame(false); // Skipping counts as failure
                      }}
                    >
                      Skip (Penalty Applied)
                    </button>
                  </div>
                </div>
              </div>
            )}

            
          </div>
        );
      case 'loadouts':
        const equipment = useRecruitmentZustand(state => state.equipment);
        const crewLoadouts = useRecruitmentZustand(state => state.crewLoadouts);
        const equipItemToCrew = useRecruitmentZustand(state => state.equipItemToCrew);
        const unequipItemFromCrew = useRecruitmentZustand(state => state.unequipItemFromCrew);
        const getCrewEffectiveStats = useRecruitmentZustand(state => state.getCrewEffectiveStats);
        
        return (
          <div className="crew-content">
            <h3>Crew Loadouts</h3>
            
            <div className="loadout-section">
              <h4>Available Equipment</h4>
              <div className="equipment-inventory">
                {equipment.length === 0 ? (
                  <p>No equipment available. Complete missions to find equipment!</p>
                ) : (
                  equipment.map((item, index) => (
                    <div key={`${item.id}-${index}`} className="equipment-item">
                      <span className="equipment-icon">{item.icon}</span>
                      <div className="equipment-info">
                        <h5>{item.name}</h5>
                        <p className="equipment-rarity">{item.rarity}</p>
                        <p className="equipment-type">{item.type}</p>
                        <div className="equipment-stats">
                          {Object.entries(item.statBonus).map(([stat, bonus]) => (
                            <span key={stat}>{stat}: +{bonus}</span>
                          ))}
                        </div>
                        <p className="equipment-flavor">{item.flavor}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="loadout-section">
              <h4>Crew Equipment</h4>
              <div className="crew-loadouts">
                {hiredCrew.map((crew) => {
                  const loadout = crewLoadouts[crew.id] || { weapon: null, armor: null, tool: null };
                  const effectiveStats = getCrewEffectiveStats(crew.id);
                  
                  return (
                    <div key={crew.id} className="crew-loadout-card">
                      <div className="crew-loadout-header">
                        <h5>{crew.name}</h5>
                        <span className="crew-role">{crew.role}</span>
                      </div>
                      
                      <div className="loadout-slots">
                        {['weapon', 'armor', 'tool'].map(slotType => (
                          <div key={slotType} className="loadout-slot">
                            <div className="slot-type">{slotType}</div>
                            {loadout[slotType] ? (
                              <div className="equipped-item">
                                <span className="equipment-icon">{loadout[slotType].icon}</span>
                                <div className="equipment-info">
                                  <p>{loadout[slotType].name}</p>
                                  <div className="equipment-stats">
                                    {Object.entries(loadout[slotType].statBonus).map(([stat, bonus]) => (
                                      <span key={stat}>{stat}: +{bonus}</span>
                                    ))}
                                  </div>
                                </div>
                                <button 
                                  className="unequip-button"
                                  onClick={() => unequipItemFromCrew(crew.id, slotType)}
                                >
                                  ✕
                                </button>
                              </div>
                            ) : (
                              <div className="empty-slot">
                                <div className="slot-icon">+</div>
                                <select 
                                  key={`${crew.id}-${slotType}-select`}
                                  onChange={(e) => {
                                    const selectedValue = e.target.value;
                                    if (selectedValue && selectedValue !== "") {
                                      equipItemToCrew(crew.id, selectedValue, slotType);
                                      // Reset dropdown after a tiny delay to allow selection to complete
                                      setTimeout(() => {
                                        e.target.selectedIndex = 0;
                                      }, 10);
                                    }
                                  }}
                                >
                                  <option value="">Select {slotType}</option>
                                  {equipment
                                    .filter(item => item.type === slotType)
                                    .map((item, index) => (
                                      <option key={`${item.id}-${index}`} value={item.id}>
                                        {item.name}
                                      </option>
                                    ))
                                  }
                                </select>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      
                      <div className="effective-stats">
                        <h6>Effective Stats:</h6>
                        <div className="stats-display">
                          {Object.entries(effectiveStats || {}).map(([stat, value]) => (
                            <span key={stat}>{stat}: {value}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="crew-menu">
      <div className="crew-header">
        <h2>Crew Management</h2>
        <button className="store-item" onClick={onClose}>Close</button>
      </div>

      <div className="crew-tabs">
        <button 
          className={`crew-tab-button ${activeTab === 'view' ? 'active' : ''}`}
          onClick={() => setActiveTab('view')}
        >
          View Crew
        </button>
        <button 
          className={`crew-tab-button ${activeTab === 'recruit' ? 'active' : ''}`}
          onClick={() => setActiveTab('recruit')}
        >
          Recruit
        </button>
        <button 
          className={`crew-tab-button ${activeTab === 'missions' ? 'active' : ''}`}
          onClick={() => setActiveTab('missions')}
        >
          Missions
        </button>
        <button 
          className={`crew-tab-button ${activeTab === 'ongoing' ? 'active' : ''}`}
          onClick={() => setActiveTab('ongoing')}
        >
          Ongoing Missions
        </button>
        <button 
          className={`crew-tab-button ${activeTab === 'loadouts' ? 'active' : ''}`}
          onClick={() => setActiveTab('loadouts')}
        >
          Loadouts
        </button>
      </div>

      <TabContent />
    </div>
  );
}