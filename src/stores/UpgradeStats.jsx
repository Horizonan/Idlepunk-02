import React, { useEffect } from 'react';
import '../styles/UpgradeStats.css';
import { useSkillsStore } from '../utils/skillsStore';

export default function UpgradeStats({ onClose }) {
  const { skillXp, skillLevels, activeSkill, setActiveSkill, updateXp } = useSkillsStore();

  useEffect(() => {
    const interval = setInterval(() => {
      if (activeSkill && skillLevels[activeSkill] < 10) {
        updateXp(activeSkill);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [activeSkill, skillLevels, updateXp]);

  const getRequiredXp = (skill) => {
    const baseXp = 10;
    const level = skillLevels[skill];
    return Math.floor(baseXp * Math.pow(1.25, level));
  };

  const getProgressPercentage = (skill) => {
    if (!skill) return 0;
    const required = getRequiredXp(skill);
    return ((skillXp[skill] || 0) / required) * 100;
  };

  return (
    <div className="upgrade-stats">
      <div className="upgrade-header">
        <h2>Skills Center</h2>
        <button onClick={onClose}>Close</button>
      </div>
      <div className="skill-list">
        <div className="item-container">
          <div className="item-header-section">
            <div className="item-icon-wrapper">🎯</div>
            <div className="item-title-wrapper">
              <h3 className="item-title-text">Scavenging Focus {skillLevels.scavengingFocus}/10</h3>
              <div className="item-cost-text">Effect: +{skillLevels.scavengingFocus}% Junk per Click</div>
            </div>
          </div>
          <div className="item-content-section">
            <p className="item-info-text">"Eyes sharp, hands faster."</p>
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
          <div className="item-footer-section">
            <div className={`item-status-badge ${skillLevels.scavengingFocus >= 10 ? "owned" : "available"}`}>
              {skillLevels.scavengingFocus >= 10 ? "Maxed" : "Available"}
            </div>
          </div>
        </div>

        {skillLevels.scavengingFocus >= 5 && (
          <div className="item-container">
            <div className="item-header-section">
              <div className="item-icon-wrapper">🛠️</div>
              <div className="item-title-wrapper">
                <h3 className="item-title-text">Grease Discipline {skillLevels.greaseDiscipline}/10</h3>
                <div className="item-cost-text">Effect: +{(skillLevels.greaseDiscipline * 0.5).toFixed(1)}% Junk/sec</div>
              </div>
            </div>
            <div className="item-content-section">
              <p className="item-info-text">"The pile works harder when you do."</p>
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
            <div className="item-footer-section">
              <div className={`item-status-badge ${skillLevels.greaseDiscipline >= 10 ? "owned" : "available"}`}>
                {skillLevels.greaseDiscipline >= 10 ? "Maxed" : "Available"}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}