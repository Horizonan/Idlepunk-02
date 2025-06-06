import React, { useEffect } from 'react';
import '../styles/UpgradeStats.css';
import { useSkillsStore } from '../utils/skillsStore';
import TooltipWrapper from '../components/TooltipWrapper';

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
        <TooltipWrapper 
          tooltipData={{
            name: 'Scavenging Focus',
            subtitle: `Skill Level ${skillLevels.scavengingFocus}/10`,
            description: '"Eyes sharp, hands faster."',
            owned: skillLevels.scavengingFocus,
            effects: [
              {
                label: "Junk per Click Bonus",
                value: `+${skillLevels.scavengingFocus}%`,
                prefix: "",
                suffix: ""
              }
            ]
          }}
          gameState={{ skillLevels }}
        >
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
        </TooltipWrapper>

        {skillLevels.scavengingFocus >= 5 && (
          <TooltipWrapper 
            tooltipData={{
              name: 'Grease Discipline',
              subtitle: `Skill Level ${skillLevels.greaseDiscipline}/10`,
              description: '"The pile works harder when you do."',
              owned: skillLevels.greaseDiscipline,
              effects: [
                {
                  label: "Junk/sec Bonus",
                  value: `+${(skillLevels.greaseDiscipline * 0.5).toFixed(1)}%`,
                  prefix: "",
                  suffix: ""
                }
              ]
            }}
            gameState={{ skillLevels }}
          >
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
          </TooltipWrapper>
        )}
      </div>
    </div>
  );
}