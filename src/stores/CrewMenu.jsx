import React, { useState } from 'react';
import '../styles/CrewMenu.css';
import { useRecruitmentZustand } from './stores/crewRecruitment/recruitmentZustand.js'

export default function CrewMenu({ onClose }) {
  const [activeTab, setActiveTab] = useState('view');
  const startRecGame = useRecruitmentZustand(state => state.startGame)

  const TabContent = () => {
    switch(activeTab) {
      case 'view':
        return (
          <div className="crew-content">
            <h3>Current Crew</h3>
            <div className="crew-grid">
              <div className="crew-slot empty">
                <div className="slot-icon">?</div>
                <p>Empty Slot</p>
              </div>
              <div className="crew-slot empty">
                <div className="slot-icon">?</div>
                <p>Empty Slot</p>
              </div>
              <div className="crew-slot locked">
                <div className="slot-icon">🔒</div>
                <p>Locked</p>
              </div>
            </div>
          </div>
        );
      case 'recruit':
        return (
          <div className="crew-content">
            <h3>Available Recruits</h3>
            <div className="search-section">
            <button onClick={startRecGame} className="search-recruits-button">
              🔍 Search for Recruits (100 Credits)
            </button>
          </div>
          <div className="recruit-list">
            <div className="recruit-card">
              <div className="recruit-stats">
                <span>💪 5</span>
                <span>🛡️ 3</span>
                <span>⚡ 2</span>
              </div>
              <h4>Street Runner</h4>
              <p>Fast and agile scrap collector</p>
              <button className="recruit-button" disabled>Recruit (500 Credits)</button>
            </div>
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
              <div className="mission-card">
                <div className="mission-header">
                  <h4>Scrap Scout</h4>
                  <span className="mission-difficulty">Easy</span>
                </div>
                <p>Scout the outskirts for valuable junk</p>
                <div className="mission-rewards">
                  <span>💰 100-200</span>
                  <span>⚡ 1-2</span>
                </div>
                <button className="mission-button" disabled>No Crew Available</button>
              </div>
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
        <button className="close-button" onClick={onClose}>×</button>
      </div>

      <div className="crew-tabs">
        <button 
          className={`tab-button ${activeTab === 'view' ? 'active' : ''}`}
          onClick={() => setActiveTab('view')}
        >
          View Crew
        </button>
        <button 
          className={`tab-button ${activeTab === 'recruit' ? 'active' : ''}`}
          onClick={() => setActiveTab('recruit')}
        >
          Recruit
        </button>
        <button 
          className={`tab-button ${activeTab === 'missions' ? 'active' : ''}`}
          onClick={() => setActiveTab('missions')}
        >
          Missions
        </button>
        <button 
          className={`tab-button ${activeTab === 'loadouts' ? 'active' : ''}`}
          onClick={() => setActiveTab('loadouts')}
        >
          Loadouts
        </button>
      </div>

      <TabContent />
    </div>
  );
}