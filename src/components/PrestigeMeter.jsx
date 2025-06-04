
import React, { useState, useEffect } from 'react';
import '../styles/PrestigeMeter.css';

export default function PrestigeMeter() {
  const [completedQuests, setCompletedQuests] = useState(0);
  const [showMeter, setShowMeter] = useState(false);
  const [prestigeCount, setPrestigeCount] = useState(0);

  // Pre-prestige quests only
  const prePrestigeQuests = [
    "First Steps", "Shopping Time", "Tool Master", "Passive Income", "Begin Crafting", 
    "Surge Rider", "Scratz $$$", "Alone or Lonely?", "Automation Punk", 
    "Unlock Ascension Protocol", "Gambling Addiction", "Surge Overflow", 
    "The Circuit Speaks", "Whispers in the Scrap", "Forge the Future"
  ];

  useEffect(() => {
    const updateQuestCount = () => {
      // Get prestige count from localStorage
      const storedPrestigeCount = parseInt(localStorage.getItem('prestigeCount') || '0');
      setPrestigeCount(storedPrestigeCount);

      // Only count pre-prestige quests for the meter
      const completed = prePrestigeQuests.filter(quest => 
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

  const totalQuests = prePrestigeQuests.length;
  
  // Check if "Forge the Future" is completed to automatically show 100%
  const forgeTheFutureCompleted = localStorage.getItem('quest_sync_Forge the Future') === 'true';
  const progressPercentage = forgeTheFutureCompleted ? 100 : (completedQuests / totalQuests) * 100;
  
  // Show "Prestige 1" when at least one prestige has been completed
  const prestigeLevel = prestigeCount > 0 ? prestigeCount : 1;

  return (
    <div className="prestige-meter-container">
      <div className="prestige-meter-content">
        <div className="prestige-info">
          <span className="prestige-level">Prestige {prestigeLevel}</span>
          <span className="quest-count">{completedQuests}/{totalQuests}</span>
        </div>
        <div className="prestige-bar">
          <div 
            className="prestige-fill" 
            style={{ width: `${progressPercentage}%` }}
          />
          <span className="prestige-percentage">{progressPercentage.toFixed(0)}%</span>
        </div>
      </div>
    </div>
  );
}
