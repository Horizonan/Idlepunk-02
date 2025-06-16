import React, { useState, useEffect } from 'react';
import '../styles/PrestigeMeter.css';

export default function PrestigeMeter() {
  const [completedQuests, setCompletedQuests] = useState(0);
  const [showMeter, setShowMeter] = useState(false);
  const [prestigeCount, setPrestigeCount] = useState(0);
  const [showPrestigeMeter, setShowPrestigeMeter] = useState(true);

  // Quest lists for each prestige tier
  const prestigeQuests = {
    0: [
      "First Contact with Junk", "Window Shopping Spree", "Tool Supremacy", 
      "Passive Aggressive Income", "Crafting for Dummies", "Surge Surfer", 
      "Crystal Forge Master"
    ],
    1: [
      "Reboot Protocols", "Automation Station", "Tech Tree Climber", 
      "Efficiency Expert", "Mass Production", "Advanced Crystal Synthesis"
    ],
    2: [
      "Second Wind", "Scratz Entrepreneur", "People Manager", 
      "Mission Commander", "Gambling Problem", "Crew Chief", 
      "Superior Crystal Engineering"
    ],
    3: [
      "Third Time's the Charm", "Skills Assessment", "Multi-Talented", 
      "Elite Crew Operations", "Resource Tycoon", "Perfect Crystal Mastery"
    ],
    4: [
      "Fourth Dimension", "Scraptagon Initiate", "Combat Training", 
      "Skill Master", "Arena Champion", "Legendary Status", 
      "Ultimate Crystal Creation"
    ]
  };

  useEffect(() => {
    const updateQuestCount = () => {
      // Get prestige count from localStorage
      const storedPrestigeCount = parseInt(localStorage.getItem('prestigeCount') || '0');
      setPrestigeCount(storedPrestigeCount);

      // Check if prestige meter is enabled
      const meterEnabled = localStorage.getItem('showPrestigeMeter') !== 'false';
      setShowPrestigeMeter(meterEnabled);

      // Use appropriate quest list based on current prestige tier
      const currentTier = Math.min(storedPrestigeCount, 4);
      const questsToCount = prestigeQuests[currentTier] || [];

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

  // Determine current tier and quest list
  const currentTier = Math.min(prestigeCount, 4);
  const questsToCount = prestigeQuests[currentTier] || [];
  const totalQuests = questsToCount.length;

  // Check completion conditions based on current questline
  let progressPercentage;
  const finalQuestCompleted = localStorage.getItem(`quest_sync_${questsToCount[questsToCount.length-1]}`) === 'true';
  progressPercentage = finalQuestCompleted ? 100 : (completedQuests / totalQuests) * 100;

  const isMaxed = progressPercentage >= 100;

  return (
    <div className="prestige-meter">
      <div className="prestige-meter-header">
        <span className="prestige-meter-title">
          {currentTier === 0 ? 'Tutorial Progress' : `Prestige ${currentTier} Progress`}
        </span>
        <span className="prestige-count">Tier: {currentTier}</span>
      </div>
      <div className="prestige-meter-bar">
        <div 
          className="prestige-meter-fill" 
          style={{ 
            width: `${progressPercentage}%`,
            backgroundColor: isMaxed ? '#00FF00' : '#9400D3'
          }}
        ></div>
        <div className="prestige-meter-text">
          {completedQuests}/{totalQuests} Quests {isMaxed ? '✓' : ''}
        </div>
      </div>
      <div className="prestige-meter-status">
        {isMaxed ? 
          `Ready for ${currentTier === 4 ? 'Final' : 'Next'} Prestige!` : 
          `${totalQuests - completedQuests} quests remaining`
        }
      </div>
    </div>
  );
}