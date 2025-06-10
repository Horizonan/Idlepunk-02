import React, { useEffect, useState } from 'react';
import '../styles/UpgradeStats.css';
import { useSkillsStore } from '../utils/skillsStore';
import SkillsCenterIntro from '../components/SkillsCenterIntro';

export default function UpgradeStats({ onClose }) {
  const { skillXp, skillLevels, activeSkill, setActiveSkill, updateXp } = useSkillsStore();
  const [showIntro, setShowIntro] = useState(false);

  // Check if this is the first time opening Skills Center
  useEffect(() => {
    const hasSeenSkillsIntro = localStorage.getItem('hasSeenSkillsIntro');
    if (!hasSeenSkillsIntro) {
      setShowIntro(true);
      localStorage.setItem('hasSeenSkillsIntro', 'true');
    }
  }, []);

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
    <>
      {showIntro && (
        <SkillsCenterIntro onClose={() => setShowIntro(false)} />
      )}
      <div className="upgrade-stats">
      <div className="upgrade-header">
        <h2>Skills Center</h2>
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
    </>
  );
}