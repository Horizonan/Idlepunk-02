
import React from 'react';
import './ResetProgress.css';

export default function ResetProgress({ onReset }) {
  const handleReset = (type) => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone!')) {
      // Clear all localStorage first
      const allKeys = Object.keys(localStorage);
      allKeys.forEach(key => localStorage.removeItem(key));
      localStorage.clear();

      // Reset all game states to default values
      const defaultAchievements = [
        {
          title: "Junkie Starter",
          requirement: "Collect 1,000 Junk",
          reward: "+500 Junk",
          flavorText: "Now you're hoarding like a real scavver.",
          unlocked: false,
          checked: false
        },
        {
          title: "The First Clicks",
          requirement: "Click 500 times",
          reward: "+5% Click Power",
          flavorText: "That mouse is starting to look worn...",
          unlocked: false,
          checked: false
        },
        {
          title: "Greasy Milestone",
          requirement: "Reach 10 Junk/sec",
          reward: "+1 Auto Click/sec",
          flavorText: "The gears are turning smoothly now.",
          unlocked: false,
          checked: false
        }
      ];

      // Reset all essential game states
      localStorage.setItem('achievements', JSON.stringify(defaultAchievements));
      localStorage.setItem('junk', '0');
      localStorage.setItem('credits', '0');
      localStorage.setItem('tronics', '0');
      localStorage.setItem('globalJpsMultiplier', '1');
      localStorage.setItem('prestigeCount', '0');
      localStorage.setItem('clickCount', '0');
      localStorage.setItem('electronicsUnlock', 'false');
      localStorage.setItem('clickMultiplier', '1');
      localStorage.setItem('passiveIncome', '0');
      localStorage.setItem('autoClicks', '0');
      localStorage.setItem('clickEnhancerLevel', '0');
      localStorage.setItem('tutorialStage', '0');
      localStorage.setItem('electroShards', '0');
      localStorage.setItem('prestigeUnlocked', 'false');
      localStorage.setItem('hasPrestiged', 'false');
      localStorage.setItem('cogfatherEvent', 'false');
      localStorage.setItem('surgeCount', '0');
      localStorage.setItem('craftingInventory', '{}');
      localStorage.setItem('ownedItems', '{}');
      localStorage.setItem('creditStoreItems', '{}');
      localStorage.setItem('beaconCount', '0');
      localStorage.setItem('showDrones', 'true');
      localStorage.setItem('maxVisibleDrones', '10');
      localStorage.setItem('maxClickEnhancers', '3');
      localStorage.setItem('showBeaconVisual', 'true');
      localStorage.setItem('enableHoloBillboard', 'true');
      localStorage.setItem('showNewsTicker', 'true');

      // Reset quest states
      allKeys.forEach(key => {
        if (key.startsWith('quest_sync_')) {
          localStorage.removeItem(key);
        }
      });

      // Reset all UI states
      localStorage.setItem('menuOpen', 'true');
      localStorage.setItem('activeStore', null);
      localStorage.setItem('ascension_tab_clicked', 'false');

      // Force a complete page reload to reset all React states
      window.location.href = window.location.href;
    }
  };

  return (
    <div className="reset-section">
      <h3>Reset Progress</h3>
      <p className="reset-warning">Warning: This will permanently delete all your progress!</p>
      <button 
        className="reset-button"
        onClick={() => handleReset('all')}
      >
        Reset All Progress
      </button>
    </div>
  );
}
