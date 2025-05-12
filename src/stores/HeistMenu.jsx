
import React, { useState, useEffect } from 'react';
import { useHeistStore } from '../utils/heistStore';
import '../styles/HeistMenu.css';

export default function HeistMenu({ onBack }) {
  const { 
    crewMembers, 
    assignedCrew, 
    heistProgress,
    heistCooldown,
    assignCrewMember,
    removeCrewMember,
    startHeist,
    updateHeistProgress,
    updateCooldown
  } = useHeistStore();

  const [showConfirmation, setShowConfirmation] = useState(false);
  
  useEffect(() => {
    if (heistProgress > 0 && heistProgress < 100) {
      const timer = setInterval(() => updateHeistProgress(), 1000);
      return () => clearInterval(timer);
    }
  }, [heistProgress]);

  useEffect(() => {
    if (heistCooldown > 0) {
      const timer = setInterval(() => updateCooldown(), 1000);
      return () => clearInterval(timer);
    }
  }, [heistCooldown]);

  const handleStartHeist = () => {
    setShowConfirmation(false);
    startHeist();
  };

  return (
    <div className="store-container heist-menu">
      <div className="store-header">
        <h2>Store Robbery: Tech Shop</h2>
        <button onClick={onBack}>Close</button>
      </div>

      <div className="heist-details">
        <div className="detail-item">
          <span>Required Crew:</span> 3
        </div>
        <div className="detail-item">
          <span>Difficulty:</span> Medium
        </div>
        <div className="detail-item">
          <span>Base Reward:</span> 100 Credits
        </div>
        <div className="detail-item">
          <span>Loot Drop Chance:</span> 15%
        </div>
      </div>

      <div className="crew-section">
        <div className="available-crew">
          <h3>Available Crew</h3>
          <div className="crew-grid">
            {crewMembers.map(crew => (
              <div 
                key={crew.id} 
                className={`crew-member ${!crew.available ? 'unavailable' : ''}`}
                onClick={() => crew.available && assignCrewMember(crew.id)}
              >
                <h4>{crew.name}</h4>
                <div className="crew-stats">
                  <div>Stealth: {crew.stealth}</div>
                  <div>Combat: {crew.combat}</div>
                  <div>Skill: {crew.skill}</div>
                  <div>Cost: {crew.cost} Junk</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="assigned-crew">
          <h3>Assigned Crew</h3>
          <div className="crew-grid">
            {assignedCrew.map(crew => (
              <div 
                key={crew.id} 
                className="crew-member"
                onClick={() => removeCrewMember(crew.id)}
              >
                <h4>{crew.name}</h4>
                <div className="crew-stats">
                  <div>Stealth: {crew.stealth}</div>
                  <div>Combat: {crew.combat}</div>
                  <div>Skill: {crew.skill}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {heistProgress > 0 && (
        <div className="heist-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{width: `${heistProgress}%`}}
            />
          </div>
          <div>Heist in Progress: {heistProgress}%</div>
        </div>
      )}

      {heistCooldown > 0 && (
        <div className="heist-cooldown">
          Cooldown: {Math.floor(heistCooldown / 60)}:{(heistCooldown % 60).toString().padStart(2, '0')}
        </div>
      )}

      <button 
        className="start-heist-button"
        disabled={assignedCrew.length < 3 || heistProgress > 0 || heistCooldown > 0}
        onClick={() => setShowConfirmation(true)}
      >
        Start Heist
      </button>

      {showConfirmation && (
        <div className="confirmation-popup">
          <h3>Start Store Robbery?</h3>
          <p>Difficulty: Medium</p>
          <p>Potential Reward: 100 Credits</p>
          <div className="confirmation-buttons">
            <button onClick={() => setShowConfirmation(false)}>Cancel</button>
            <button onClick={handleStartHeist}>Start Heist</button>
          </div>
        </div>
      )}
    </div>
  );
}
