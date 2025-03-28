
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

      // First, save any values we want to preserve
      const achievements = JSON.stringify(defaultAchievements);

      // Clear ALL localStorage
      localStorage.clear();

      // Reset core values
      localStorage.setItem('achievements', achievements);
      localStorage.setItem('globalJpsMultiplier', '1');
      localStorage.setItem('prestigeCount', '0');
      localStorage.setItem('electroShards', '0');
      localStorage.setItem('beaconCount', '0');
      localStorage.setItem('surgeCount', '0');
      localStorage.setItem('tronics', '0');
      localStorage.setItem('junk', '0');
      localStorage.setItem('credits', '0');
      localStorage.setItem('clickCount', '0');
      localStorage.setItem('autoClicks', '0');
      localStorage.setItem('clickMultiplier', '1');
      localStorage.setItem('passiveIncome', '0');
      localStorage.setItem('clickEnhancerLevel', '0');
      localStorage.setItem('skillLevels', JSON.stringify({scavengingFocus: 0, greaseDiscipline: 0}));
      localStorage.setItem('craftingInventory', '{}');
      localStorage.setItem('creditStoreItems', '{}');
      localStorage.setItem('ownedItems', '{}');
      localStorage.setItem('itemCosts', JSON.stringify({
        trashBag: 10,
        trashPicker: 100,
        streetrat: 100,
        cart: 500,
        junkMagnet: 1500,
        urbanRecycler: 3000,
        autoClicker: 5000,
        autoClickerV2: 10000,
        clickEnhancer: 2500,
        scrapDrone: 7500,
        holoBillboard: 15000,
        junkRefinery: 500000
      }));

      // Clear special states
      localStorage.removeItem('prestigeUnlocked');
      localStorage.removeItem('hasPrestiged');
      localStorage.removeItem('hadFirstSurge');
      localStorage.removeItem('cogfatherEvent');
      localStorage.removeItem('quantum_tap_purchased');
      localStorage.removeItem('tronics_boost_count');
      localStorage.removeItem('circuit_optimization_count');
      localStorage.removeItem('preservedHelper');
      localStorage.removeItem('unlocked_tronics_boost');

      // Clear quest states
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('quest_sync_')) {
          localStorage.removeItem(key);
        }
      });

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
