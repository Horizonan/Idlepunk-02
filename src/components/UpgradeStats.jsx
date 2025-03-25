import React, { useState, useEffect } from 'react';
import './UpgradeStats.css';

export default function UpgradeStats({ onClose }) {
  const [xp, setXp] = useState(() => parseInt(localStorage.getItem('skillXp')) || 0);
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

  const getRequiredXp = (skill) => {
    const baseXp = 10;
    const level = skillLevels[skill];
    return Math.floor(baseXp * Math.pow(1.25, level));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (activeSkill && skillLevels[activeSkill] < 10) {
        setXp(prev => {
          const newXp = prev + 1;
          const requiredXp = getRequiredXp(activeSkill);

          if (newXp >= requiredXp) {
            setSkillLevels(prevLevels => ({
              ...prevLevels,
              [activeSkill]: prevLevels[activeSkill] + 1
            }));
            localStorage.setItem('skillXp', '0');
            return 0;
          }

          localStorage.setItem('skillXp', newXp);
          return newXp;
        });
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [activeSkill]);

  const getProgressPercentage = (skill) => {
    if (!skill) return 0;
    const required = getRequiredXp(skill);
    return (xp / required) * 100;
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
            >
              {activeSkill === 'scavengingFocus' ? 'Training' : 'Train'}
            </button>
            {activeSkill === 'scavengingFocus' && skillLevels.scavengingFocus < 10 && (
              <div className="progress-bar">
                <div className="progress" style={{ width: `${getProgressPercentage('scavengingFocus')}%` }}></div>
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
              >
                {activeSkill === 'greaseDiscipline' ? 'Training' : 'Train'}
              </button>
              {activeSkill === 'greaseDiscipline' && skillLevels.greaseDiscipline < 10 && (
                <div className="progress-bar">
                  <div className="progress" style={{ width: `${getProgressPercentage('greaseDiscipline')}%` }}></div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}