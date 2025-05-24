import React, { useState } from 'react';
import '../styles/CrewMenu.css';
import { useRecruitmentZustand } from "./crewRecruitment/recruitmentZustand";
import { RecruitmentGame } from "./crewRecruitment/RecruitmentGame";
import { missions, calculateMissionSuccess } from "./crewRecruitment/missions";


export default function CrewMenu({ onClose, setCredits, credits }) {
  const [activeTab, setActiveTab] = useState('view');
  const [junkAmount, setJunkAmount] = useState(Number(localStorage.getItem('junk')) || 0);
  const [showCrewSelect, setShowCrewSelect] = useState(false);
  const [selectedCrew, setSelectedCrew] = useState([]);
  const [activeMission, setActiveMission] = useState(null);

  const toggleCrewSelection = (crewId) => {
    setSelectedCrew(prev => 
      prev.includes(crewId) 
        ? prev.filter(id => id !== crewId)
        : [...prev, crewId]
    );
  };

  const startMission = (mission) => {
    // Here you can implement the mission start logic
    console.log('Starting mission:', mission.name);
    console.log('Selected crew:', selectedCrew);
    setShowCrewSelect(false);
    setSelectedCrew([]);
  };
  const isRunning = useRecruitmentZustand(state => state.isRunning);
  const startGame = useRecruitmentZustand(state => state.startGame);

  const TabContent = () => {
    switch(activeTab) {
      case 'view':
        return (
          <div className="crew-content">
            <h3>Current Crew</h3>
            <div className="crew-grid">
              {useRecruitmentZustand(state => state.hiredCrew).map((crew) => (
                <div key={crew.id} className="crew-slot active">
                  <h4>{crew.name}</h4>
                  <p className="crew-role">{crew.role}</p>
                  <p className="crew-rarity">{crew.rarity}</p>
                  <div className="crew-perks">
                    <p>Perks:</p>
                    <p>{crew.perks}</p>
                  </div>
                </div>
              ))}
              {[...Array(3 - useRecruitmentZustand(state => state.hiredCrew).length)].map((_, i) => (
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
            {useRecruitmentZustand(state => state.unlockedCrew).map((crew) => (
              <div key={crew.id} className="recruit-card">
                <div className="recruit-stats">
                  <span>💪 {crew.name}</span>
                </div>
                <p>{crew.role}</p>
                <p className="crew-rarity">{crew.rarity}</p>
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
                    useRecruitmentZustand(state => state.hiredCrew).length >= 3
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
                    disabled={useRecruitmentZustand(state => state.hiredCrew).length === 0}
                    onClick={() => {
                      setActiveMission(mission);
                      setShowCrewSelect(true);
                    }}
                  >
                    {useRecruitmentZustand(state => state.hiredCrew).length === 0 ? 'No Crew Available' : 'Start Mission'}
                  </button>
                  {showCrewSelect && activeMission?.id === mission.id && (
                    <div className="crew-selection-modal">
                      <div className="crew-selection-header">
                        <h3>Select Crew for {mission.name}</h3>
                        <button onClick={() => setShowCrewSelect(false)}>×</button>
                      </div>
                      <div className="mission-requirements-display">
                        <h4>Required Stats:</h4>
                        <div className="stat-comparison">
                          {Object.entries(mission.requirements).map(([stat, value]) => {
                            const selectedCrewStats = useRecruitmentZustand(state => state.hiredCrew)
                              .filter(crew => selectedCrew.includes(crew.id))
                              .reduce((total, crew) => total + (crew[stat.toLowerCase()] || 0), 0);
                            
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
                                  stats[stat.toLowerCase()] = (stats[stat.toLowerCase()] || 0) + (crew[stat.toLowerCase()] || 0);
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