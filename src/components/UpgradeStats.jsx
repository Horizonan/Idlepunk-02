
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

  useEffect(() => {
    const interval = setInterval(() => {
      if (activeSkill) {
        setSkillLevels(prev => {
          const skill = prev[activeSkill];
          if (skill < 10) {
            const requiredXp = getRequiredXp(activeSkill);
            setXp(prevXp => {
              const newXp = prevXp + 1;
              localStorage.setItem('skillXp', newXp);
              if (newXp >= requiredXp) {
                levelUpSkill(activeSkill);
                return 0;
              }
              return newXp;
            });
          }
          return prev;
        });
      }
    }, 10000); // 1 XP every 10 seconds

    return () => clearInterval(interval);
  }, [activeSkill]);

  const getRequiredXp = (skill) => {
    const baseXp = 10;
    const level = skillLevels[skill];
    return Math.floor(baseXp * Math.pow(1.25, level));
  };

  const levelUpSkill = (skill) => {
    const requiredXp = getRequiredXp(skill);
    if (xp >= requiredXp && skillLevels[skill] < 10) {
      setXp(prev => {
        const remaining = prev - requiredXp;
        localStorage.setItem('skillXp', remaining);
        return remaining;
      });
      setSkillLevels(prev => ({
        ...prev,
        [skill]: prev[skill] + 1
      }));
      window.dispatchEvent(new CustomEvent('skillLevelUp', { 
        detail: { skill, level: skillLevels[skill] + 1 }
      }));
    }
  };

  return (
    <div className="upgrade-stats">
      <div className="upgrade-header">
        <h2>Skills</h2>
        <button onClick={onClose}>Close</button>
      </div>
      <div className="skill-xp">XP: {xp}</div>
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
            <button 
              onClick={() => levelUpSkill('scavengingFocus')}
              disabled={xp < getRequiredXp('scavengingFocus') || skillLevels.scavengingFocus >= 10}
            >
              Level Up ({getRequiredXp('scavengingFocus')} XP)
            </button>
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
              <button 
                onClick={() => levelUpSkill('greaseDiscipline')}
                disabled={xp < getRequiredXp('greaseDiscipline') || skillLevels.greaseDiscipline >= 10}
              >
                Level Up ({getRequiredXp('greaseDiscipline')} XP)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
