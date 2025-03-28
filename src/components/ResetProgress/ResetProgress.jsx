
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

      // Clear ALL localStorage items
      const keysToPreserve = ['achievements'];
      const allKeys = Object.keys(localStorage);
      allKeys.forEach(key => {
        if (!keysToPreserve.includes(key)) {
          localStorage.removeItem(key);
        }
      });

      // Reset achievements
      localStorage.setItem('achievements', JSON.stringify(defaultAchievements));
      
      // Reset core game values
      localStorage.setItem('globalJpsMultiplier', '1');
      localStorage.setItem('prestigeCount', '0');
      localStorage.setItem('electroShards', '0');
      localStorage.setItem('beaconCount', '0');
      localStorage.setItem('surgeCount', '0');
      localStorage.setItem('cogfatherLore', '[]');
      localStorage.setItem('preservedHelper', '');
      localStorage.setItem('craftingInventory', '{}');
      localStorage.setItem('creditStoreItems', '{}');
      localStorage.setItem('skillLevels', '{"scavengingFocus":0,"greaseDiscipline":0}');
      localStorage.setItem('hasPrestiged', 'false');
      localStorage.setItem('prestigeUnlocked', 'false');
      localStorage.setItem('hadFirstSurge', 'false');
      localStorage.setItem('cogfatherEvent', 'false');
      localStorage.setItem('quantum_tap_purchased', 'false');
      localStorage.setItem('tronics_boost_count', '0');
      localStorage.setItem('circuit_optimization_count', '0');

      onReset(type);
    }
  };

  return (
    <div className="reset-progress">
      <button onClick={() => handleReset('all')}>Reset All Progress</button>
    </div>
  );
}
