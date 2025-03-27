import React, { useState, useEffect } from 'react';
import './UpgradeStats.css';

// Create a shared interval ID to prevent multiple intervals
let globalXpInterval = null;

const updateXp = () => {
  const activeSkill = localStorage.getItem('activeSkill');
  const skillXp = JSON.parse(localStorage.getItem('skillXp')) || {
    scavengingFocus: 0,
    greaseDiscipline: 0
  };
  const skillLevels = JSON.parse(localStorage.getItem('skillLevels')) || {
    scavengingFocus: 0,
    greaseDiscipline: 0
  };

  if (activeSkill && skillLevels[activeSkill] < 10) {
    const currentXp = typeof skillXp[activeSkill] === 'number' ? skillXp[activeSkill] : 0;
    const newXp = currentXp + 1;
    const baseXp = 10;
    const requiredXp = Math.floor(baseXp * Math.pow(1.25, skillLevels[activeSkill]));

    if (newXp >= requiredXp) {
      skillLevels[activeSkill]++;
      localStorage.setItem('skillLevels', JSON.stringify(skillLevels));
      skillXp[activeSkill] = 0;
    } else {
      skillXp[activeSkill] = newXp;
    }
    localStorage.setItem('skillXp', JSON.stringify(skillXp));
  }
};

// Start the global XP interval when the module loads
if (!globalXpInterval) {
  globalXpInterval = setInterval(updateXp, 10000);
}

export default function UpgradeStats({ onClose }) {
  const [skillXp, setSkillXp] = useState(() => JSON.parse(localStorage.getItem('skillXp')) || {
    scavengingFocus: 0,
    greaseDiscipline: 0
  });
  const [activeSkill, setActiveSkill] = useState(() => localStorage.getItem('activeSkill') || '');
  const [skillLevels, setSkillLevels] = useState(() => {
    const saved = localStorage.getItem('skillLevels');
    return saved ? JSON.parse(saved) : {
      scavengingFocus: 0,
      greaseDiscipline: 0
    };
  });

  useEffect(() => {
    localStorage.setItem('skillLevels', JSON.stringify(skillLevels));
  }, [skillLevels]);

  useEffect(() => {
    localStorage.setItem('activeSkill', activeSkill);
  }, [activeSkill]);

  // Update local state from localStorage every second
  useEffect(() => {
    const updateLocalState = () => {
      setSkillXp(JSON.parse(localStorage.getItem('skillXp')) || {
        scavengingFocus: 0,
        greaseDiscipline: 0
      });
      setSkillLevels(JSON.parse(localStorage.getItem('skillLevels')));
    };
    
    const interval = setInterval(updateLocalState, 1000);
    return () => clearInterval(interval);
  }, []);

  const getRequiredXp = (skill) => {
    const baseXp = 10;
    const level = skillLevels[skill];
    return Math.floor(baseXp * Math.pow(1.25, level));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (activeSkill && skillLevels[activeSkill] < 10) {
        const currentSkillXp = JSON.parse(localStorage.getItem('skillXp')) || {
          scavengingFocus: 0,
          greaseDiscipline: 0
        };
        
        const newXp = (currentSkillXp[activeSkill] || 0) + 1;
        const requiredXp = getRequiredXp(activeSkill);

        if (newXp >= requiredXp) {
          setSkillLevels(prevLevels => ({
            ...prevLevels,
            [activeSkill]: prevLevels[activeSkill] + 1
          }));
          currentSkillXp[activeSkill] = 0;
        } else {
          currentSkillXp[activeSkill] = newXp;
        }
        
        localStorage.setItem('skillXp', JSON.stringify(currentSkillXp));
        setSkillXp(currentSkillXp);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [activeSkill]);

  const getProgressPercentage = (skill) => {
    if (!skill) return 0;
    const required = getRequiredXp(skill);
    return ((skillXp[skill] || 0) / required) * 100;
  };

  return (
    <div className="upgrade-stats">
      <div className="upgrade-header">
        <h2>Skills</h2>
        <button onClick={onClose}>Close</button>
      </div>
      <div className="skill-list">
        <div className="skill-item">
          <h3>Scavenging Focus {skillLevels.scavengingFocus}/10</h3>
          <p>Effect: +{skillLevels.scavengingFocus}% Junk per Click</p>
          <p className="flavor-text">"Eyes sharp, hands faster."</p>
          <div className="skill-controls">
            <button 
              onClick={() => setActiveSkill(activeSkill === 'scavengingFocus' ? '' : 'scavengingFocus')}
              className={activeSkill === 'scavengingFocus' ? 'active' : ''}
              disabled={skillLevels.scavengingFocus >= 10}
            >
              {activeSkill === 'scavengingFocus' ? 'Training' : 'Train'}
            </button>
            {activeSkill === 'scavengingFocus' && skillLevels.scavengingFocus < 10 && (
              <div className="progress-container">
                <div className="progress-bar">
                  <div className="progress" style={{ width: `${getProgressPercentage('scavengingFocus')}%` }}></div>
                </div>
                <div className="xp-text">{skillXp.scavengingFocus || 0}/{getRequiredXp('scavengingFocus')} XP</div>
              </div>
            )}
          </div>
        </div>

        {skillLevels.scavengingFocus >= 5 && (
          <div className="skill-item">
            <h3>Grease Discipline {skillLevels.greaseDiscipline}/10</h3>
            <p>Effect: +{(skillLevels.greaseDiscipline * 0.5).toFixed(1)}% Junk/sec</p>
            <p className="flavor-text">"The pile works harder when you do."</p>
            <div className="skill-controls">
              <button 
                onClick={() => setActiveSkill(activeSkill === 'greaseDiscipline' ? '' : 'greaseDiscipline')}
                className={activeSkill === 'greaseDiscipline' ? 'active' : ''}
                disabled={skillLevels.greaseDiscipline >= 10}
              >
                {activeSkill === 'greaseDiscipline' ? 'Training' : 'Train'}
              </button>
              {activeSkill === 'greaseDiscipline' && skillLevels.greaseDiscipline < 10 && (
                <div className="progress-container">
                  <div className="progress-bar">
                    <div className="progress" style={{ width: `${getProgressPercentage('greaseDiscipline')}%` }}></div>
                  </div>
                  <div className="xp-text">{skillXp.greaseDiscipline || 0}/{getRequiredXp('greaseDiscipline')} XP</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}