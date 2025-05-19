
import React, { useState } from 'react';
import '../styles/CrewMenu.css';

export default function CrewMenu({ onClose }) {
  const [activeTab, setActiveTab] = useState('view');

  const TabContent = () => {
    switch(activeTab) {
      case 'view':
        return (
          <div className="crew-content">
            <h3>Current Crew</h3>
            <p>No crew members recruited yet.</p>
          </div>
        );
      case 'recruit':
        return (
          <div className="crew-content">
            <h3>Available Recruits</h3>
            <p>No recruits available in this sector.</p>
          </div>
        );
      case 'missions':
        return (
          <div className="crew-content">
            <h3>Available Missions</h3>
            <p>No missions available.</p>
          </div>
        );
      case 'loadouts':
        return (
          <div className="crew-content">
            <h3>Crew Loadouts</h3>
            <p>No loadouts configured.</p>
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
        <button onClick={onClose}>Close</button>
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
