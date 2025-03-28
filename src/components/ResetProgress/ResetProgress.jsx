
import React from 'react';
import './ResetProgress.css';

export default function ResetProgress({ onReset }) {
  const handleReset = (type) => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone!')) {
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

      // Clear quest sync data
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('quest_sync_')) {
          localStorage.removeItem(key);
        }
      });

      // Clear all localStorage except achievements
      localStorage.clear();
      localStorage.setItem('achievements', JSON.stringify(defaultAchievements));
      localStorage.setItem('globalJpsMultiplier', '1');
      localStorage.setItem('prestigeCount', '0');

      onReset(type);
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
