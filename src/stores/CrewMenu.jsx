
import React from 'react';
import '../styles/CrewMenu.css';
import { useRecruitmentZustand } from "./crewRecruitment/recruitmentZustand";
import { RecruitmentGame } from "./crewRecruitment/RecruitmentGame";
import { missions, calculateMissionSuccess } from "./crewRecruitment/missions";

class CrewMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'view',
      junkAmount: Number(localStorage.getItem('junk')) || 0,
      showCrewSelect: false,
      selectedCrew: [],
      activeMission: null
    };
  }

  toggleCrewSelection = (crewId) => {
    this.setState(prev => ({
      selectedCrew: prev.selectedCrew.includes(crewId) 
        ? prev.selectedCrew.filter(id => id !== crewId)
        : [...prev.selectedCrew, crewId]
    }));
  };

  startMission = (mission) => {
    console.log('Starting mission:', mission.name);
    console.log('Selected crew:', this.state.selectedCrew);
    this.setState({
      showCrewSelect: false,
      selectedCrew: []
    });
  };

  renderTabContent = () => {
    const store = useRecruitmentZustand.getState();
    const { activeTab, showCrewSelect, activeMission, selectedCrew } = this.state;
    const { setCredits, credits } = this.props;

    switch(activeTab) {
      case 'view':
        return (
          <div className="crew-content">
            <h3>Current Crew</h3>
            <div className="crew-grid">
              {store.hiredCrew.map((crew) => (
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
              {[...Array(3 - store.hiredCrew.length)].map((_, i) => (
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
              {store.isRunning && (
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
                    store.startGame();
                  }
                }}
                className="search-recruits-button">
                🔍 Search for Recruits (100 Credits)
              </button>
            </div>

            <div className="recruit-list">
              {store.unlockedCrew.map((crew) => (
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
                      const junkAmount = Number(localStorage.getItem('junk')) || 0;

                      let canAfford = false;
                      if (costType === 'credits' && credits >= cost) {
                        setCredits(prev => prev - cost);
                        canAfford = true;
                      } else if (costType === 'junk' && junkAmount >= cost) {
                        const newJunkAmount = junkAmount - cost;
                        localStorage.setItem('junk', newJunkAmount);
                        this.setState({ junkAmount: newJunkAmount });
                        canAfford = true;
                      }

                      if (canAfford) {
                        useRecruitmentZustand.setState(state => ({
                          unlockedCrew: state.unlockedCrew.filter(c => c.id !== crew.id),
                          hiredCrew: [...state.hiredCrew, crew]
                        }));
                      }
                    }}
                    disabled={
                      (crew.unlockCost?.type === 'credits' && credits < crew.unlockCost?.amount) ||
                      (crew.unlockCost?.type === 'junk' && this.state.junkAmount < crew.unlockCost?.amount) ||
                      store.hiredCrew.length >= 3
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
                    disabled={store.hiredCrew.length === 0}
                    onClick={() => this.setState({ activeMission: mission, showCrewSelect: true })}
                  >
                    {store.hiredCrew.length === 0 ? 'No Crew Available' : 'Start Mission'}
                  </button>
                  {showCrewSelect && activeMission?.id === mission.id && (
                    <div className="crew-selection-modal">
                      <div className="crew-selection-header">
                        <h3>Select Crew for {mission.name}</h3>
                        <button onClick={() => this.setState({ showCrewSelect: false })}>×</button>
                      </div>
                      <div className="mission-requirements-display">
                        <h4>Required Stats:</h4>
                        <div className="stat-comparison">
                          {Object.entries(mission.requirements).map(([stat, value]) => {
                            const selectedCrewStats = store.hiredCrew
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
                            store.hiredCrew
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
                        {store.hiredCrew.map((crew) => (
                          <div
                            key={crew.id}
                            className={`crew-selection-item ${selectedCrew.includes(crew.id) ? 'selected' : ''}`}
                            onClick={() => this.toggleCrewSelection(crew.id)}
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
                        <button onClick={() => this.setState({ showCrewSelect: false })}>Cancel</button>
                        <button 
                          onClick={() => this.startMission(mission)}
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

  render() {
    const { onClose } = this.props;
    const { activeTab } = this.state;

    return (
      <div className="crew-menu">
        <div className="crew-header">
          <h2>Crew Management</h2>
          <button className="store-item" onClick={onClose}>Close</button>
        </div>

        <div className="crew-tabs">
          <button 
            className={`crew-tab-button ${activeTab === 'view' ? 'active' : ''}`}
            onClick={() => this.setState({ activeTab: 'view' })}
          >
            View Crew
          </button>
          <button 
            className={`crew-tab-button ${activeTab === 'recruit' ? 'active' : ''}`}
            onClick={() => this.setState({ activeTab: 'recruit' })}
          >
            Recruit
          </button>
          <button 
            className={`crew-tab-button ${activeTab === 'missions' ? 'active' : ''}`}
            onClick={() => this.setState({ activeTab: 'missions' })}
          >
            Missions
          </button>
          <button 
            className={`crew-tab-button ${activeTab === 'loadouts' ? 'active' : ''}`}
            onClick={() => this.setState({ activeTab: 'loadouts' })}
          >
            Loadouts
          </button>
        </div>

        {this.renderTabContent()}
      </div>
    );
  }
}

export default CrewMenu;
