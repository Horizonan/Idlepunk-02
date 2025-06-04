
import React, { useState, useEffect } from 'react';
import '../styles/PrestigeMeter.css';

export default function PrestigeMeter() {
  const [completedQuests, setCompletedQuests] = useState(0);
  const [showMeter, setShowMeter] = useState(false);

  const questLines = {
    progression: [
      "First Steps", "Shopping Time", "Tool Master", "Passive Income", "Begin Crafting", 
      "Surge Rider", "Scratz $$$", "Alone or Lonely?", "Automation Punk", 
      "Unlock Ascension Protocol", "Gambling Addiction"
    ],
    ascension: [
      "Surge Overflow", "The Circuit Speaks", "Whispers in the Scrap", "Forge the Future"
    ],
    awakenTheCore: [
      "System Memory Detected", "Tap the Pulse", "Upgrade Cascade", 
      "Beacon Protocol", "Forge the Overcrystal"
    ]
  };

  const getAllQuests = () => {
    return [...questLines.progression, ...questLines.ascension, ...questLines.awakenTheCore];
  };

  useEffect(() => {
    const updateQuestCount = () => {
      const allQuests = getAllQuests();
      const completed = allQuests.filter(quest => 
        localStorage.getItem(`quest_sync_${quest}`) === 'true'
      ).length;
      
      setCompletedQuests(completed);
      setShowMeter(completed >= 3);
    };

    updateQuestCount();
    
    // Listen for quest updates
    const interval = setInterval(updateQuestCount, 1000);
    window.addEventListener('storage', updateQuestCount);
    window.addEventListener('questUpdate', updateQuestCount);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', updateQuestCount);
      window.removeEventListener('questUpdate', updateQuestCount);
    };
  }, []);

  if (!showMeter) return null;

  const totalQuests = getAllQuests().length;
  const progressPercentage = (completedQuests / totalQuests) * 100;
  const prestigeLevel = Math.floor(completedQuests / 5); // Every 5 quests = 1 prestige level

  return (
    <div className="prestige-meter-container">
      <div className="prestige-meter-content">
        <div className="prestige-meter-header">
          <span className="prestige-level">Prestige Level {prestigeLevel}</span>
          <span className="quest-counter">{completedQuests}/{totalQuests} Quests</span>
        </div>
        <div className="prestige-meter-bar">
          <div 
            className="prestige-meter-fill" 
            style={{ width: `${progressPercentage}%` }}
          >
            <div className="prestige-meter-glow"></div>
          </div>
          <div className="prestige-meter-text">
            {progressPercentage.toFixed(1)}% Complete
          </div>
        </div>
        {prestigeLevel > 0 && (
          <div className="prestige-bonuses">
            ⚡ Prestige Bonuses Active: {prestigeLevel}
          </div>
        )}
      </div>
    </div>
  );
}
