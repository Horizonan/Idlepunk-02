
import React, { useState, useEffect } from 'react';
import './UpgradeStats.css';

export default function UpgradeStats({ onClose, junk, passiveIncome, clickMultiplier, setClickMultiplier, setPassiveIncome }) {
  const [activeSkill, setActiveSkill] = useState(localStorage.getItem('activeSkill') || null);
  const [xp, setXp] = useState(() => Number(localStorage.getItem('skillXp')) || 0);
  const [skills, setSkills] = useState(() => JSON.parse(localStorage.getItem('skills')) || {
    scavengingFocus: {
      name: "Scavenging Focus",
      level: 0,
      maxLevel: 10,
      xpNeeded: 10,
      effect: "+1% Junk per Click",
      flavor: "Eyes sharp, hands faster.",
      unlocked: true
    },
    greaseDiscipline: {
      name: "Grease Discipline",
      level: 0,
      maxLevel: 10,
      xpNeeded: 10,
      effect: "+0.5% Junk/sec",
      flavor: "The pile works harder when you do.",
      unlocked: false,
      requiresSkill: "scavengingFocus",
      requiresLevel: 5
    }
  });

  useEffect(() => {
    localStorage.setItem('skills', JSON.stringify(skills));
  }, [skills]);

  useEffect(() => {
    localStorage.setItem('activeSkill', activeSkill);
  }, [activeSkill]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (activeSkill) {
        setXp(prev => {
          const newXp = prev + 1;
          localStorage.setItem('skillXp', newXp);
          return newXp;
        });
      }
    }, 10000); // 1 XP every 10 seconds

    return () => clearInterval(interval);
  }, [activeSkill]);

  useEffect(() => {
    if (!activeSkill) return;

    const skill = skills[activeSkill];
    if (xp >= skill.xpNeeded && skill.level < skill.maxLevel) {
      setSkills(prev => {
        const newSkills = { ...prev };
        newSkills[activeSkill] = {
          ...skill,
          level: skill.level + 1,
          xpNeeded: Math.floor(skill.xpNeeded * 1.25)
        };

        // Update game stats based on skill
        if (activeSkill === 'scavengingFocus') {
          setClickMultiplier(prev => prev * 1.01); // +1% per level
        } else if (activeSkill === 'greaseDiscipline') {
          setPassiveIncome(prev => prev * 1.005); // +0.5% per level
        }

        // Check for unlocks
        if (activeSkill === 'scavengingFocus' && skill.level + 1 >= 5) {
          newSkills.greaseDiscipline.unlocked = true;
        }

        return newSkills;
      });
      setXp(0);
      localStorage.setItem('skillXp', '0');
    }
  }, [xp, activeSkill, skills]);

  return (
    <div className="upgrade-stats-container">
      <div className="upgrade-stats-header">
        <h2>Upgrade Stats</h2>
        <button onClick={onClose}>Close</button>
      </div>
      <div className="skills-list">
        {Object.entries(skills).map(([skillId, skill]) => (
          <div 
            key={skillId}
            className={`skill-item ${!skill.unlocked ? 'locked' : ''} ${activeSkill === skillId ? 'active' : ''}`}
            onClick={() => skill.unlocked && setActiveSkill(skillId === activeSkill ? null : skillId)}
          >
            <div className="skill-header">
              <h3>{skill.name}</h3>
              <span className="level">Level {skill.level}/{skill.maxLevel}</span>
            </div>
            <p className="effect">{skill.effect}</p>
            <p className="flavor">{skill.flavor}</p>
            {skill.unlocked ? (
              <div className="xp-bar">
                <div 
                  className="xp-progress"
                  style={{
                    width: `${activeSkill === skillId ? (xp / skill.xpNeeded * 100) : 0}%`
                  }}
                ></div>
                {activeSkill === skillId && (
                  <span className="xp-text">{xp}/{skill.xpNeeded} XP</span>
                )}
              </div>
            ) : (
              <p className="unlock-req">Unlock: {skills[skill.requiresSkill].name} Lv{skill.requiresLevel}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
