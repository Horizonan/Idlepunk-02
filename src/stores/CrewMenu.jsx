import React, { useState, useEffect } from 'react';
import '../styles/CrewMenu.css';
import '../styles/mobile/CrewMenuMobile.css';
import { useRecruitmentZustand } from "./crewRecruitment/recruitmentZustand";
import { RecruitmentGame } from './crewRecruitment/RecruitmentGame';
import { SkillsAssessmentGame } from './crewRecruitment/SkillsAssessmentGame';
import { missions, calculateMissionSuccess, calculateMissionDuration } from "./crewRecruitment/missions";
import { equipmentDatabase, getAllEquipment } from "./crewRecruitment/equipment";
import StaminaTimer from '../components/StaminaTimer';
import DuplicateEquipmentDialog from '../components/DuplicateEquipmentDialog';


export default function CrewMenu({ onClose, setCredits, credits, setJunk, junk }) {
  const [activeTab, setActiveTab] = useState('view');
  const [showCrewSelect, setShowCrewSelect] = useState(false);
  const storedSelectedCrew = useRecruitmentZustand(state => state.selectedCrew);
  const selectedCrew = useRecruitmentZustand(state => state.selectedCrew) || [];
  const setSelectedCrew = useRecruitmentZustand(state => state.setSelectedCrew);
  const activeMission = useRecruitmentZustand(state => state.activeMission);
  const missionStartTime = useRecruitmentZustand(state => state.missionStartTime);
  const setActiveMission = useRecruitmentZustand(state => state.setActiveMission);
  const showMiniGame = useRecruitmentZustand(state => state.showMiniGame);
  const completeMiniGame = useRecruitmentZustand(state => state.completeMiniGame);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showMiniGameModal, setShowMiniGameModal] = useState(false);
  const [missionCompleting, setMissionCompleting] = useState(false);
  const [missionStarting, setMissionStarting] = useState(false);


  useEffect(() => {
    if (activeMission && missionStartTime) {
      setMissionCompleting(false); // Reset completion state when mission starts
      setMissionStarting(true); // Set starting state to prevent early completion

      // Disable the complete button for 10 seconds after mission start
      const startupTimer = setTimeout(() => {
        setMissionStarting(false);
      }, 3000);

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

      return () => {
        clearInterval(timer);
        clearTimeout(startupTimer);
      };
    } else {
      setMissionCompleting(false); // Reset when no active mission
      setMissionStarting(false); // Reset startup state
    }
  }, [activeMission?.id, missionStartTime]);

  // Watch for mini-game trigger
  useEffect(() => {
    if (showMiniGame && !showMiniGameModal) {
      setShowMiniGameModal(true);
    }
  }, [showMiniGame]);

  // Listen for mini-game completion from App level
  useEffect(() => {
    const handleMiniGameComplete = (event) => {
      const success = event.detail?.success || false;
      setShowMiniGameModal(false);
      completeMiniGame(success);
    };

    window.addEventListener('miniGameComplete', handleMiniGameComplete);
    return () => window.removeEventListener('miniGameComplete', handleMiniGameComplete);
  }, [completeMiniGame]);

  const toggleCrewSelection = (crewId) => {
    const currentSelection = selectedCrew || [];
    let newSelection;
    if (currentSelection.includes(crewId)) {
      newSelection = currentSelection.filter(id => id !== crewId);
    } else if (activeMission && currentSelection.length >= activeMission.maxCrew) {
      newSelection = currentSelection;
    } else {
      newSelection = [...currentSelection, crewId];
    }

    setSelectedCrew(newSelection);
  };

  const startMission = (mission) => {
    const selectedCrewMembers = selectedCrew;
    // Apply Chrono Regulator effect to mission duration
    const adjustedMission = {
      ...mission,
      duration: calculateMissionDuration(mission.duration)
    };
    useRecruitmentZustand.getState().startMission(adjustedMission, selectedCrewMembers);
    setShowCrewSelect(false);
  };
  const isRunning = useRecruitmentZustand(state => state.isRunning);
  const startGame = useRecruitmentZustand(state => state.startGame);

  // Get crew data at component level
  const hiredCrew = useRecruitmentZustand(state => state.hiredCrew);
  const unlockedCrew = useRecruitmentZustand(state => state.unlockedCrew);
  const newlyHiredCrew = useRecruitmentZustand(state => state.newlyHiredCrew);
  const equipment = useRecruitmentZustand(state => state.equipment);
  const crewLoadouts = useRecruitmentZustand(state => state.crewLoadouts);
  const equipItemToCrew = useRecruitmentZustand(state => state.equipItemToCrew);
  const unequipItemFromCrew = useRecruitmentZustand(state => state.unequipItemFromCrew);
  const getCrewEffectiveStats = useRecruitmentZustand(state => state.getCrewEffectiveStats);

  const renderTabContent = () => {
    switch(activeTab) {
      case 'view':
        return (
          <div className="crew-content">
            <h3>Current Crew</h3>

            <div className="crew-grid">
              {hiredCrew.map((crew) => (
                <div key={crew.id} className="crew-slot active">
                  {newlyHiredCrew.includes(crew.id) && (
                    <div className="new-crew-badge">New!</div>
                  )}
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
                      // Check if this crew member is on an active mission
                      if (activeMission && selectedCrew.includes(crew.id)) {
                        // Show custom popup instead of alert
                        const popup = document.createElement('div');
                        popup.className = 'crew-fire-blocked-popup';
                        popup.innerHTML = `
                          <div class="crew-fire-blocked-content">
                            <div class="blocked-header">
                              <span class="blocked-icon">🚫</span>
                              <h3>CREW MEMBER UNAVAILABLE</h3>
                            </div>
                            <div class="blocked-message">
                              <p>Sorry, please wait until the mission is completed to fire any crew members currently on missions.</p>
                              <p class="blocked-submessage">Mission in progress: <span class="mission-name">${activeMission.name}</span></p>
                            </div>
                            <button class="blocked-close-button" onclick="this.parentElement.parentElement.remove()">
                              UNDERSTOOD
                            </button>
                          </div>
                        `;
                        document.body.appendChild(popup);
                        return;
                      }

                      // Show styled confirmation popup that matches game UI
                      const confirmPopup = document.createElement('div');
                      confirmPopup.className = 'crew-fire-confirm-popup';
                      confirmPopup.innerHTML = `
                        <div class="crew-fire-confirm-content">
                          <div class="confirm-header">
                            <span class="confirm-icon">⚠️</span>
                            <h3>FIRE CREW MEMBER</h3>
                          </div>
                          <div class="confirm-message">
                            <p>Are you sure you want to fire <span class="crew-name-highlight">${crew.name}</span>?</p>
                            <p class="confirm-submessage">This action will return them to the available recruits pool.</p>
                          </div>
                          <div class="confirm-buttons">
                            <button class="confirm-fire-button">
                              🔥 FIRE CREW MEMBER
                            </button>
                            <button class="confirm-cancel-button">
                              CANCEL
                            </button>
                          </div>
                        </div>
                      `;

                      // Add event listeners after creating the popup
                      const fireButton = confirmPopup.querySelector('.confirm-fire-button');
                      const cancelButton = confirmPopup.querySelector('.confirm-cancel-button');

                      fireButton.addEventListener('click', () => {
                        confirmPopup.remove();
                        const state = useRecruitmentZustand.getState();
                        const crewToFire = state.hiredCrew.find(c => c.id === crew.id);
                        useRecruitmentZustand.setState({
                          hiredCrew: state.hiredCrew.filter(c => c.id !== crew.id),
                          unlockedCrew: [...state.unlockedCrew, crewToFire]
                        });
                      });

                      cancelButton.addEventListener('click', () => {
                        confirmPopup.remove();
                      });

                      document.body.appendChild(confirmPopup);
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
                    {useRecruitmentZustand.getState().gameVariant === 'profile' ? (
                      <RecruitmentGame />
                    ) : (
                      <SkillsAssessmentGame />
                    )}
                  </div>
                </div>
              )}
              <button 
                type="button"
                onClick={() => {
                  if(Number(localStorage.getItem('credits')) >= 10){
                    setCredits(prev => prev - 10);
                    
                    // Check if mini-game is disabled
                    if (localStorage.getItem('skipRecruitmentMiniGame') === 'true') {
                      // Auto-complete with median score
                      const profileCount = localStorage.getItem('signal_expander_purchased') ? 10 : 8;
                      const medianScore = Math.floor(profileCount * 0.6); // ~60% success rate for median
                      
                      // Randomly select game variant for unlocks
                      const random = Math.random();
                      if (random < 0.7) {
                        useRecruitmentZustand.getState().handleGameEnd(medianScore);
                      } else {
                        useRecruitmentZustand.getState().handleSkillsGameEnd(medianScore);
                      }
                    } else {
                      // Play mini-game normally
                      const random = Math.random();
                      if (random < 0.7) {
                        startGame(); // Profile screening
                      } else {
                        useRecruitmentZustand.getState().startSkillsGame(); // Skills assessment
                      }
                    }
                  }
                }}
                className="search-recruits-button"
                disabled={Number(localStorage.getItem('credits')) < 10}
              >
                🔍 Search for Recruits (10 Scratz)
              </button>
            </div>

          <div className="recruit-list">
            {unlockedCrew.map((crew) => (
              <div key={crew.id} className="recruit-card">
                {newlyHiredCrew.includes(crew.id) && (
                  <div className="new-crew-badge">New!</div>
                )}
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
                      console.log('Cannot afford:', costType === 'credits' ? 'Insufficient Scratz' : 'Insufficient junk');
                    }

                    if (canAfford) {
                      console.log('Updating crew state...');
                      useRecruitmentZustand.setState(state => {
                        console.log('Current unlocked crew:', state.unlockedCrew.length);
                        console.log('Current hired crew:', state.hiredCrew.length);
                        return {
                          unlockedCrew: state.unlockedCrew.filter(c => c.id !== crew.id),
                          hiredCrew: [...state.hiredCrew, crew],
                          newlyHiredCrew: [...state.newlyHiredCrew, crew.id]
                        };
                      });

                      // Remove "New!" badge after 10 seconds
                      setTimeout(() => {
                        useRecruitmentZustand.getState().markCrewAsNotNew(crew.id);
                      }, 10000);
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
        // Get available missions (with rotation for post-second prestige)
        const prestigeCount = parseInt(localStorage.getItem('prestigeCount') || '0');
        const availableMissions = Object.values(missions);

        return (
          <div className="crew-content">
            <h3>Available Missions</h3>
            {prestigeCount >= 2 && (
              <div className="mission-rotation-info" style={{
                background: 'rgba(148, 0, 211, 0.1)', 
                border: '1px solid #9400D3', 
                borderRadius: '5px', 
                padding: '10px', 
                marginBottom: '15px',
                textAlign: 'center'
              }}>
                <span style={{color: '#00FF88'}}>🔄 Mission Rotation Active</span>
                <p style={{fontSize: '0.9em', margin: '5px 0 0 0'}}>
                  Completing missions may unlock new ones from the same category!
                </p>
              </div>
            )}
            <div className="mission-list">
              {availableMissions.filter(mission => {
                // Filter out rotation-only missions unless they've been specifically rotated in
                const rotationOnlyMissions = ['scavenge_2', 'heist_2', 'void_2']; // Dumpster Dive Deluxe, Clawback Job, Echo Harvest
                if (rotationOnlyMissions.includes(mission.id)) {
                  const rotatedMissions = JSON.parse(localStorage.getItem('rotatedMissions') || '[]');
                  return rotatedMissions.includes(mission.id);
                }
                return true;
              }).map((mission) => (
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
                      Duration: {Math.round(calculateMissionDuration(mission.duration) / 60)} minutes
                      {(() => {
                        const craftingInventory = JSON.parse(localStorage.getItem('craftingInventory') || '{}');
                        const skillLevels = JSON.parse(localStorage.getItem('skillLevels') || '{}');
                        const heistingSpeedLevel = skillLevels.heistingSpeed || 0;
                        const hasChronoRegulator = craftingInventory['Chrono Regulator'] && craftingInventory['Chrono Regulator'] > 0;

                        const modifiers = [];
                        if (hasChronoRegulator) {
                          modifiers.push(<span key="chrono" style={{color: '#00ff00'}}> (Chrono Regulator: -20s)</span>);
                        }
                        if (heistingSpeedLevel > 0) {
                          const speedBonus = (heistingSpeedLevel * 0.5).toFixed(1);
                          modifiers.push(<span key="heisting" style={{color: '#9400D3'}}> (Heisting Speed: -{speedBonus}%)</span>);
                        }

                        return modifiers;
                      })()}
                    </div>
                  <button 
                    className="mission-button" 
                    disabled={hiredCrew.length === 0 || activeMission !== null}
                    onClick={() => {
                      if (!activeMission) {
                        setActiveMission(mission);
                        setSelectedCrew([]); // Reset crew selection for new mission
                        setShowCrewSelect(true);
                      }
                    }}
                  >
                    {hiredCrew.length === 0 
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
                        <button onClick={() => {
                          setShowCrewSelect(false);
                          setActiveMission(null);
                          setSelectedCrew([]);
                        }}>×</button>
                      </div>
                      <div className="mission-requirements-display">
                        <h4>Required Stats:</h4>
                        <div className="stat-comparison">
                          {Object.entries(mission.requirements).map(([stat, value]) => {
                            const selectedCrewStats = hiredCrew
                              .filter(crew => selectedCrew.includes(crew.id))
                              .reduce((total, crew) => {
                                const effectiveStats = getCrewEffectiveStats(crew.id);
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
                        {activeMission && (
                          <div className="success-chance">
                            Success Chance: {(() => {
                              const selectedCrewMembers = selectedCrew.map(id => 
                                hiredCrew.find(c => c.id === id)
                              ).filter(Boolean);

                              const crewStats = selectedCrewMembers.reduce((stats, crew) => {
                                const effectiveStats = getCrewEffectiveStats(crew.id);
                                Object.entries(activeMission.requirements).forEach(([stat]) => {
                                  const crewStat = effectiveStats?.[stat.toLowerCase()] || 0;
                                  stats[stat.toLowerCase()] = (stats[stat.toLowerCase()] || 0) + crewStat;
                                });
                                return stats;
                              }, {});

                              let successRate = calculateMissionSuccess(crewStats, activeMission.requirements);

                              // Apply Echo Helmets bonus
                              const craftingInventory = JSON.parse(localStorage.getItem('craftingInventory') || '{}');
                              if (craftingInventory['Echo Helmets'] && craftingInventory['Echo Helmets'] > 0) {
                                successRate += 1;
                              }

                              return `${Math.min(100, successRate).toFixed(1)}%`;
                            })()}
                          </div>
                        )}
                      </div>
                      <div className="crew-selection-list">
                        {hiredCrew.map((crew) => (
                          <div
                            key={crew.id}
                            className={`crew-selection-item ${(selectedCrew || []).includes(crew.id) ? 'selected' : ''}`}
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
                        }}>Cancel</button>
                        <button 
                          onClick={() => startMission(mission)}
                          disabled={(selectedCrew || []).length === 0}
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
                        const crew = hiredCrew.find(c => c.id === crewId);
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
                      ) : missionStarting ? (
                        <div className="mission-initializing">
                          🔄 Mission Initializing... Please wait
                        </div>
                      ) : (
                        <button 
                          className="complete-mission-button"
                          disabled={missionCompleting || missionStarting}
                          onClick={() => {
                            // Prevent multiple completions and early completion
                            if (!activeMission || missionCompleting || missionStarting) return;

                            // Set completing state immediately
                            setMissionCompleting(true);

                            const currentActiveMission = activeMission;

                            // Clear mission immediately to prevent spam but keep crew assignment visible
                            const completingMission = currentActiveMission;
                            const completingCrew = [...selectedCrew];

                            setActiveMission(null);
                            useRecruitmentZustand.setState({ 
                              activeMission: null,
                              missionStartTime: null
                              // Keep selectedCrew intact for display purposes
                            });
                            const selectedCrewMembers = selectedCrew.map(id => 
                              hiredCrew.find(c => c.id === id)
                            );

                            const crewStats = selectedCrewMembers.reduce((stats, crew) => {
                              const effectiveStats = getCrewEffectiveStats(crew.id);
                              Object.entries(currentActiveMission.requirements).forEach(([stat]) => {
                                const crewStat = effectiveStats?.[stat.toLowerCase()] || 0;
                                stats[stat.toLowerCase()] = (stats[stat.toLowerCase()] || 0) + crewStat;
                                console.log(`Crew member ${crew.name} contributes ${crewStat} to ${stat} (with equipment)`);
                              });
                              return stats;
                            }, {});

                            console.log('Final crew stats:', crewStats);
                            console.log('Mission requirements:', currentActiveMission.requirements);

                            let baseSuccessRate = calculateMissionSuccess(crewStats, currentActiveMission.requirements);

                            // Apply Echo Helmets +1% mission success rate bonus
                            const craftingInventory = JSON.parse(localStorage.getItem('craftingInventory') || '{}');
                            if (craftingInventory['Echo Helmets'] && craftingInventory['Echo Helmets'] > 0) {
                              baseSuccessRate += 1; // Add 1% flat bonus
                            }

                            // Apply mini-game effects - get state once
                            const state = useRecruitmentZustand.getState();
                            const miniGameBonus = state.miniGameBonus || { rewardChanceBonus: 0, successPenalty: 0 };
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

                              creditsReward = currentActiveMission.baseRewards.credits;
                              junkReward = currentActiveMission.baseRewards.junk;

                              // Calculate bonus rewards with mini-game bonus
                              if (currentActiveMission.bonusRewards) {
                                Object.entries(currentActiveMission.bonusRewards).forEach(([item, bonus]) => {
                                  const bonusChance = bonus.chance + (miniGameBonus.rewardChanceBonus || 0);
                                  console.log(`${item} bonus chance: ${(bonus.chance * 100).toFixed(1)}% + ${((miniGameBonus.rewardChanceBonus || 0) * 100).toFixed(1)}% = ${(bonusChance * 100).toFixed(1)}%`);

                                  if (Math.random() < bonusChance) {
                                    if (item === 'electroShard') creditsReward += 50 * bonus.amount;
                                    if (item === 'rareJunk') junkReward += bonus.amount;
                                    if (item === 'equipment') {
                                      const addResult = useRecruitmentZustand.getState().addEquipment(bonus.itemId);
                                      const equipmentData = getAllEquipment().find(eq => eq.id === bonus.itemId);
                                      if (equipmentData) {
                                        if (addResult === true) {
                                          equipmentRewards.push(equipmentData);
                                        } else if (addResult === 'duplicate') {
                                          // Duplicate will be handled by the dialog, just show it as a reward for now
                                          equipmentRewards.push(equipmentData);
                                        }
                                      }
                                    }
                                  }
                                });
                              }
                            } else {
                              // Apply failure penalties
                              creditsReward = currentActiveMission.penalties.failure.credits;
                              // Update crew stamina
                              const staminaPenalty = currentActiveMission.penalties.failure.crewStamina;
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

                            // Check for mission rotation after second prestige
                            const rotatedMission = useRecruitmentZustand.getState().rotateMission(completingMission.id);

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
                                  `<p class="success-message">${currentActiveMission.successMessages[Math.floor(Math.random() * currentActiveMission.successMessages.length)]}</p>` :
                                  currentActiveMission.penalties.failure.messagePool ?
                                  `<p class="failure-message">${currentActiveMission.penalties.failure.messagePool[Math.floor(Math.random() * currentActiveMission.penalties.failure.messagePool.length)]}</p>` 
                                  : ''}
                                <div class="mission-rewards-display">
                                  <p>Scratz: ${creditsReward > 0 ? '+' : ''}${creditsReward}</p>
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
                                        <p class="auto-sold-value">Sold for ${item.sellValue} Scratz (Duplicate)</p>
                                      </div>
                                    `).join('') : ''}
                                  ${rotatedMission ? `
                                    <div class="mission-rotation-notice">
                                      <h4 style="color: #00FF88;">🔄 Mission Rotation Available!</h4>
                                      <p>A new mission from the same category is now available:</p>
                                      <p style="color: #9400D3; font-weight: bold;">${rotatedMission.name}</p>
                                      <p style="font-size: 0.9em;">${rotatedMission.description}</p>
                                    </div>
                                  ` : ''}
                                </div>
                                <button class="mission-close-button">Close</button>
                              </div>
                            `;
                            
                            // Add proper event listener for the close button
                            const closeButton = missionWindow.querySelector('.mission-close-button');
                            closeButton.addEventListener('click', () => {
                              missionWindow.remove();
                            });
                            
                            document.body.appendChild(missionWindow);

                            // Reset mini-game bonus state
                            useRecruitmentZustand.setState(state => ({ 
                              ...state,
                              miniGameBonus: { rewardChanceBonus: 0, successPenalty: 0 }
                            }));
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
        return (
          <div className="crew-content">
            <h3>Crew Loadouts</h3>

            <div className="loadout-section">
              <h4>Available Equipment</h4>
              <div className="crew-equipment-inventory">
                {equipment.length === 0 ? (
                  <p>No equipment available. Complete missions to find equipment!</p>
                ) : (
                  equipment.map((item) => (
                    <div key={item.uniqueId} className="crew-equipment-item">
                      <span className="crew-equipment-icon">{item.icon}</span>
                      <div className="crew-equipment-info">
                        <h5>{item.name}</h5>
                        <p className="crew-equipment-rarity">{item.rarity}</p>
                        <p className="crew-equipment-type">{item.type}</p>
                        <div className="crew-equipment-stats">
                          {Object.entries(item.statBonus).map(([stat, bonus]) => (
                            <span key={stat}>{stat}: +{bonus}</span>
                          ))}
                        </div>
                        <p className="crew-equipment-flavor">{item.flavor}</p>
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
                        <span className="crew-role">{crew.role}</span>                      </div>

                      <div className="crew-loadout-slots">
                        {['weapon', 'armor', 'tool'].map(slotType => (
                          <div key={slotType} className="crew-loadout-slot">
                            <div className="crew-slot-type">{slotType}</div>
                            {loadout[slotType] ? (
                              <div className="crew-equipped-item">
                                <span className="crew-equipment-icon">{loadout[slotType].icon}</span>
                                <div className="crew-equipment-info">
                                  <p>{loadout[slotType].name}</p>
                                  <div className="crew-equipment-stats">
                                    {Object.entries(loadout[slotType].statBonus).map(([stat, bonus]) => (
                                      <span key={stat}>{stat}: +{bonus}</span>
                                    ))}
                                  </div>
                                </div>
                                <button 
                                  className="crew-unequip-button"
                                  onClick={() => unequipItemFromCrew(crew.id, slotType)}
                                >
                                  ✕
                                </button>
                              </div>
                            ) : (
                              <div className="crew-empty-slot">
                                <div className="crew-slot-icon">+</div>
                                <select 
                                  value=""
                                  onChange={(e) => {
                                    if (e.target.value) {
                                      equipItemToCrew(crew.id, e.target.value, slotType);
                                    }
                                  }}
                                >
                                  <option value="">Select {slotType}</option>
                                  {equipment
                                    .filter(item => item.type === slotType)
                                    .map((item) => (
                                      <option key={item.uniqueId} value={item.uniqueId}>
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

                      <div className="crew-effective-stats">
                        <h6>Effective Stats:</h6>
                        <div className="crew-stats-display">
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
      <DuplicateEquipmentDialog />
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

      {renderTabContent()}
    </div>
  );
}