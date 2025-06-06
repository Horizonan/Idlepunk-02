
import React, { useState, useEffect } from 'react';
import '../styles/PrestigeMeter.css';

export default function PrestigeMeter() {
  const [completedQuests, setCompletedQuests] = useState(0);
  const [showMeter, setShowMeter] = useState(false);
  const [prestigeCount, setPrestigeCount] = useState(0);
  const [showPrestigeMeter, setShowPrestigeMeter] = useState(true);

  // Pre-prestige quests only
  const prePrestigeQuests = [
    "First Steps", "Shopping Time", "Tool Master", "Passive Income", "Begin Crafting", 
    "Surge Rider", "Scratz $$$", "Alone or Lonely?", "Automation Punk", 
    "Unlock Ascension Protocol", "Gambling Addiction", "Surge Overflow", 
    "The Circuit Speaks", "Whispers in the Scrap", "Forge the Future"
  ];

  // Post-prestige quests
  const postPrestigeQuests = [
    "System Memory Detected", "Tap the Pulse", "Upgrade Cascade", 
    "Beacon Protocol", "Forge the Overcrystal"
  ];

  useEffect(() => {
    const updateQuestCount = () => {
      // Get prestige count from localStorage
      const storedPrestigeCount = parseInt(localStorage.getItem('prestigeCount') || '0');
      setPrestigeCount(storedPrestigeCount);

      // Check if prestige meter is enabled
      const meterEnabled = localStorage.getItem('showPrestigeMeter') !== 'false';
      setShowPrestigeMeter(meterEnabled);

      // Check if user has prestiged
      const hasPrestiged = localStorage.getItem('hasPrestiged') === 'true';

      // Use appropriate quest list based on prestige status
      const questsToCount = hasPrestiged ? postPrestigeQuests : prePrestigeQuests;
      
      const completed = questsToCount.filter(quest => 
        localStorage.getItem(`quest_sync_${quest}`) === 'true'
      ).length;
      
      setCompletedQuests(completed);
      setShowMeter(completed >= 1 && meterEnabled);
    };

    updateQuestCount();
    
    // Listen for quest updates and prestige completion
    const interval = setInterval(updateQuestCount, 1000);
    window.addEventListener('storage', updateQuestCount);
    window.addEventListener('questUpdate', updateQuestCount);
    window.addEventListener('prestigeComplete', updateQuestCount);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', updateQuestCount);
      window.removeEventListener('questUpdate', updateQuestCount);
      window.removeEventListener('prestigeComplete', updateQuestCount);
    };
  }, []);

  if (!showMeter || !showPrestigeMeter) return null;

  // Check if user has prestiged to determine which quest list to use
  const hasPrestiged = localStorage.getItem('hasPrestiged') === 'true';
  const questsToCount = hasPrestiged ? postPrestigeQuests : prePrestigeQuests;
  const totalQuests = questsToCount.length;
  
  // Check completion conditions based on current questline
  let progressPercentage;
  if (hasPrestiged) {
    // Post-prestige: Check if "Forge the Overcrystal" is completed
    const overcrystalCompleted = localStorage.getItem('quest_sync_Forge the Overcrystal') === 'true';
    progressPercentage = overcrystalCompleted ? 100 : (completedQuests / totalQuests) * 100;
  } else {
    // Pre-prestige: Check if "Forge the Future" is completed
    const forgeTheFutureCompleted = localStorage.getItem('quest_sync_Forge the Future') === 'true';
    progressPercentage = forgeTheFutureCompleted ? 100 : (completedQuests / totalQuests) * 100;
  }
  
  // Show current prestige level, minimum 1
  const prestigeLevel = Math.max(prestigeCount, 1);

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
