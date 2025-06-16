import React, { useState, useEffect } from 'react';
import '../styles/PrestigeMeter.css';
import { getCurrentQuestLine, getQuestProgress, QUEST_LINES } from '../utils/questValidation';

export default function PrestigeMeter() {
  const [completedQuests, setCompletedQuests] = useState(0);
  const [showMeter, setShowMeter] = useState(false);
  const [prestigeCount, setPrestigeCount] = useState(0);
  const [showPrestigeMeter, setShowPrestigeMeter] = useState(true);
  const [currentQuestLine, setCurrentQuestLine] = useState('progression');

  useEffect(() => {
    const updateQuestCount = () => {
      // Get prestige count from localStorage
      const storedPrestigeCount = parseInt(localStorage.getItem('prestigeCount') || '0');
      setPrestigeCount(storedPrestigeCount);

      // Check if prestige meter is enabled
      const meterEnabled = localStorage.getItem('showPrestigeMeter') !== 'false';
      setShowPrestigeMeter(meterEnabled);

      // Get current quest line based on prestige status
      const questLineKey = getCurrentQuestLine();
      setCurrentQuestLine(questLineKey);

      // Get quest progress for current line
      const { completed, total } = getQuestProgress(questLineKey);
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

  // Get current quest line data
  const questLineData = QUEST_LINES[currentQuestLine];
  if (!questLineData) return null;

  const { completed: currentCompleted, total: totalQuests } = getQuestProgress(currentQuestLine);
  
  // Check if final quest is completed for 100% progress
  const finalQuest = questLineData.quests[questLineData.quests.length - 1];
  const finalQuestCompleted = localStorage.getItem(`quest_sync_${finalQuest.title}`) === 'true';
  const progressPercentage = finalQuestCompleted ? 100 : (currentCompleted / totalQuests) * 100;

  // Show current prestige level, minimum 1
  const prestigeLevel = Math.max(prestigeCount, 1);
  
  // Check what features are available at current prestige
  const getAvailableFeatures = (prestige) => {
    const features = [];
    if (prestige >= 1) features.push('Tronics & Crafting');
    if (prestige >= 2) features.push('Crew Management');
    if (prestige >= 3) features.push('Skills Center');
    if (prestige >= 4) features.push('Scraptagon Arena');
    return features;
  };
  
  // Get current prestige bonuses
  const getCurrentBonuses = (prestige) => {
    const bonuses = [];
    if (prestige >= 1) {
      const clickBonus = ((1 + (prestige * 0.05)) - 1) * 100;
      bonuses.push(`+${clickBonus.toFixed(0)}% Click Power`);
    }
    if (prestige >= 2) {
      const autoclicks = (prestige - 1) * 2;
      bonuses.push(`+${autoclicks} Auto-clicks`);
    }
    if (prestige >= 3) {
      const craftingSpeed = (Math.max(0, prestige - 2) * 0.1) * 100;
      bonuses.push(`+${craftingSpeed.toFixed(0)}% Crafting Speed`);
    }
    return bonuses;
  };

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
        <div className="available-features">
          <span className="features-label">Available:</span>
          <span className="features-list">
            {getAvailableFeatures(prestigeLevel).join(' • ')}
          </span>
        </div>
        {prestigeLevel > 0 && (
          <div className="prestige-bonuses">
            <span className="bonuses-label">Active Bonuses:</span>
            <span className="bonuses-list">
              {getCurrentBonuses(prestigeLevel).join(' • ')}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}