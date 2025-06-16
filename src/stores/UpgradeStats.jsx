import React, { useEffect, useState } from 'react';
import '../styles/UpgradeStats.css';
import { useSkillsStore } from '../utils/skillsStore';
import SkillsCenterIntro from '../components/SkillsCenterIntro';

export default function UpgradeStats({ onClose }) {
  const { skillXp, skillLevels, activeSkill, setActiveSkill, loadFromLocalStorage } = useSkillsStore();
  const [showIntro, setShowIntro] = useState(false);
  const [ownedItems, setOwnedItems] = useState(() => JSON.parse(localStorage.getItem('ownedItems')) || {});

  useEffect(() => {
    const handleStorageChange = () => {
      const updated = JSON.parse(localStorage.getItem('ownedItems')) || {};
      setOwnedItems(updated);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Helper function to get upgraded name or fallback to original
  const getUpgradedName = (itemKey, originalName) => {
    return localStorage.getItem(`${itemKey}_upgradedName`) || originalName;
  };

  const itemDisplayNames = {
    trashBag: getUpgradedName("trashBag", "Scrap Bags"),
    trashPicker: getUpgradedName("trashPicker", "Trash Pickers"), 
    streetrat: getUpgradedName("streetrat", "Streetrats"),
    cart: getUpgradedName("cart", "Shopping Carts"),
    junkMagnet: getUpgradedName("junkMagnet", "Junk Magnets"),
    urbanRecycler: getUpgradedName("urbanRecycler", "Urban Recyclers"),
    clickEnhancer: getUpgradedName("clickEnhancer", "Click Enhancers"),
    clampjawRig: getUpgradedName("clampjawRig", "Clampjaw Rigs"),
    scrapDrone: getUpgradedName("scrapDrone", "Scrap Drones"),
    holoBillboard: getUpgradedName("holoBillboard", "Holo Billboards"),
    junkRefinery: getUpgradedName("junkRefinery", "Junk Refineries"),
    modularScrapper: getUpgradedName("modularScrapper", "Modular Scrappers"),
    scratzMiner: getUpgradedName("scratzMiner", "Scratz Miners"),
    autoRecycler: getUpgradedName("autoRecycler", "Auto Recyclers")
  };

  // Check if this is the first time opening Skills Center
  useEffect(() => {
    const hasSeenSkillsIntro = localStorage.getItem('hasSeenSkillsIntro');
    if (!hasSeenSkillsIntro) {
      setShowIntro(true);
      localStorage.setItem('hasSeenSkillsIntro', 'true');
    }

    // Sync with localStorage when component mounts
    loadFromLocalStorage();
  }, [loadFromLocalStorage]);

  // Auto-refresh the component every second to show real-time progress
  useEffect(() => {
    const refreshInterval = setInterval(() => {
      loadFromLocalStorage();
    }, 1000);

    return () => clearInterval(refreshInterval);
  }, [loadFromLocalStorage]);

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

  const skillsData = [
    {
      name: 'scavengingFocus',
      displayName: 'Scavenging Focus',
      description: 'Increases trash pickup duration by 0.1s per level (Max: 10)',
      maxLevel: 10,
      unlocked: true
    },
    {
      name: 'greaseDiscipline', 
      displayName: 'Grease Discipline',
      description: 'Reduces crystal pickup time by 0.1s per level (Max: 10)',
      maxLevel: 10,
      unlocked: localStorage.getItem('firstCrystal') === 'true'
    },
    {
      name: 'heistingSpeed',
      displayName: 'Heisting Speed',
      description: 'Reduces mission duration by 0.5% per level (Max: 10)',
      maxLevel: 10,
      unlocked: (() => {
        try {
          const crewStorage = JSON.parse(localStorage.getItem('crew-storage') || '{}');
          return (crewStorage.state?.successfulMissions || 0) > 0;
        } catch {
          return false;
        }
      })()
    }
  ];

  const handleSkillToggle = (skillName) => {
    const newActiveSkill = activeSkill === skillName ? '' : skillName;
    setActiveSkill(newActiveSkill);
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
        {skillsData.map((skill) => {
          if (!skill.unlocked) return null;

          const currentLevel = skillLevels[skill.name] || 0;
          const currentXp = skillXp[skill.name] || 0;
          const isActive = activeSkill === skill.name;
          const isMaxLevel = currentLevel >= skill.maxLevel;

          // Check if this is a newly unlocked Heisting Speed skill
          const isNewlyUnlocked = skill.name === 'heistingSpeed' && 
            !localStorage.getItem('heistingSpeedSeen') &&
            skill.unlocked;

          // Calculate XP for next level
          const baseXp = 10;
          const requiredXp = Math.floor(baseXp * Math.pow(1.25, currentLevel));

          return (
            <div key={skill.name} className="skill-item">
              <h3>
                {skill.displayName} (Level {currentLevel})
                {isNewlyUnlocked && (
                  <span style={{ 
                    color: '#FF6600', 
                    marginLeft: '8px', 
                    fontSize: '1.2em',
                    textShadow: '0 0 10px #FF6600'
                  }}>
                    (!)
                  </span>
                )}
              </h3>
              <p>{skill.description}</p>

              {!isMaxLevel && (
                <div className="progress-container">
                  <div className="progress-bar">
                    <div 
                      className="progress" 
                      style={{ width: `${(currentXp / requiredXp) * 100}%` }}
                    />
                  </div>
                  <div className="xp-text">
                    {currentXp} / {requiredXp} XP
                  </div>
                </div>
              )}

              {isMaxLevel && (
                <div className="max-level-indicator">
                  <span style={{ color: '#FFD700' }}>★ MAX LEVEL ★</span>
                </div>
              )}

              <button
                onClick={() => {
                  handleSkillToggle(skill.name);
                  // Mark Heisting Speed as seen when player interacts with it
                  if (skill.name === 'heistingSpeed') {
                    localStorage.setItem('heistingSpeedSeen', 'true');
                  }
                }}
                disabled={isMaxLevel}
                style={{
                  background: isActive ? '#9400D3' : '#222',
                  color: isActive ? '#fff' : '#00FF00',
                  border: `2px solid ${isActive ? '#fff' : '#9400D3'}`,
                  padding: '8px 16px',
                  cursor: isMaxLevel ? 'not-allowed' : 'pointer',
                  borderRadius: '4px',
                  marginTop: '10px'
                }}
              >
                {isMaxLevel ? 'Maxed Out' : isActive ? 'Active' : 'Activate'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
    </>
  );
}