import React, { useState, useEffect } from 'react';
import '../styles/CrewMenu.css';
import { useRecruitmentZustand } from "./crewRecruitment/recruitmentZustand";
import { RecruitmentGame } from "./crewRecruitment/RecruitmentGame";
import { missions, calculateMissionSuccess } from "./crewRecruitment/missions";


export default function CrewMenu({ onClose, setCredits, credits }) {
  const [activeTab, setActiveTab] = useState('view');
  const [junkAmount, setJunkAmount] = useState(Number(localStorage.getItem('junk')) || 0);
  const [showCrewSelect, setShowCrewSelect] = useState(false);
  const [selectedCrew, setSelectedCrew] = useState([]);
  const activeMission = useRecruitmentZustand(state => state.activeMission);
  const missionStartTime = useRecruitmentZustand(state => state.missionStartTime);
  const setActiveMission = useRecruitmentZustand(state => state.setActiveMission);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (activeMission && missionStartTime) {
      const timer = setInterval(() => {
        const elapsed = (Date.now() - missionStartTime) / 1000;
        const remaining = Math.max(0, activeMission.duration - elapsed);
        setTimeLeft(remaining);

        if (remaining <= 0) {
          clearInterval(timer);
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [activeMission, missionStartTime]);

  const toggleCrewSelection = (crewId) => {
    setSelectedCrew(prev => 
      prev.includes(crewId) 
        ? prev.filter(id => id !== crewId)
        : [...prev, crewId]
    );
  };

  const startMission = (mission) => {
    useRecruitmentZustand.getState().startMission(mission, selectedCrew);
    setShowCrewSelect(false);
    setSelectedCrew([]);
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
                </div>
              ))}
              {[...Array(3 - hiredCrew.length)].map((_, i) => (
                <div key={i} className="crew-slot empty">
                  <div className="slot-icon">?</div>
                  <p>Empty Slot</p>
                </div>
              ))}
            </div>
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
                  if(Number(localStorage.getItem('credits')) >= 100){
                    setCredits(prev => prev - 100);
                    startGame();
                  }
                  }}
                  className="search-recruits-button" >
                  🔍 Search for Recruits (100 Credits)
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

                    const junkAmount = Number(localStorage.getItem('junk')) || 0;
                    console.log('Current junk:', junkAmount);

                    let canAfford = false;
                    if (costType === 'credits' && credits >= cost) {
                      console.log('Can afford with credits');
                      setCredits(prev => prev - cost);
                      canAfford = true;
                    } else if (costType === 'junk' && junkAmount >= cost) {
                      console.log('Can afford with junk');
                      const newJunkAmount = junkAmount - cost;
                      localStorage.setItem('junk', newJunkAmount);
                      setJunkAmount(newJunkAmount);
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
                    (crew.unlockCost?.type === 'junk' && junkAmount < crew.unlockCost?.amount) ||
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
                              .reduce((total, crew) => total + (crew.stats?.[stat.toLowerCase()] || 0), 0);

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
                                Object.entries(mission.requirements).forEach(([stat]) => {
                                  stats[stat.toLowerCase()] = (stats[stat.toLowerCase()] || 0) + (crew.stats?.[stat.toLowerCase()] || 0);
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
                        <button onClick={() => setShowCrewSelect(false)}>Cancel</button>
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
                            const missionSuccessRate = useRecruitmentZustand.getState().activeMission?.successRate || 0;
                            const success = Math.random() * 100 < missionSuccessRate;
                            
                            const missionWindow = document.createElement('div');
                            missionWindow.className = 'mission-completion-window';
                            missionWindow.innerHTML = `
                              <div class="mission-result ${success ? 'success' : 'failure'}">
                                <h2>${success ? 'Mission Successful!' : 'Mission Failed'}</h2>
                                <p>Success Rate: ${successRate.toFixed(1)}%</p>
                                <button onclick="this.parentElement.parentElement.remove()">Close</button>
                              </div>
                            `;
                            document.body.appendChild(missionWindow);
                            
                            setActiveMission(null);
                            setSelectedCrew([]);
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
          </div>
        );
      case 'loadouts':
        return (
          <div className="crew-content">
            <h3>Crew Loadouts</h3>
            <div className="loadout-grid">
              <div className="loadout-slot empty">
                <div className="slot-type">Weapon</div>
                <div className="slot-icon">+</div>
              </div>
              <div className="loadout-slot empty">
                <div className="slot-type">Armor</div>
                <div className="slot-icon">+</div>
              </div>
              <div className="loadout-slot empty">
                <div className="slot-type">Tool</div>
                <div className="slot-icon">+</div>
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