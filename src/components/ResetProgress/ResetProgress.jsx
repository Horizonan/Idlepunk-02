
import React from 'react';
import './ResetProgress.css';

export default function ResetProgress() {
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone!')) {
      // Get all localStorage keys and clear them
      const allKeys = Object.keys(localStorage);
      allKeys.forEach(key => localStorage.removeItem(key));
      localStorage.clear();

      // Set all initial game values
      const initialGameState = {
        junk: '0',
        credits: '0',
        tronics: '0',
        clickCount: '0',
        clickMultiplier: '1',
        passiveIncome: '0',
        autoClicks: '0',
        globalJpsMultiplier: '1',
        electronicsUnlock: 'false',
        menuOpen: 'true',
        clickEnhancerLevel: '0',
        tutorialStage: '0',
        prestigeCount: '0',
        prestigeUnlocked: 'false',
        hasPrestiged: 'false',
        surgeCount: '0',
        electroShards: '0',
        cogfatherEvent: 'false',
        beaconCount: '0',
        showDrones: 'true',
        maxVisibleDrones: '10',
        maxClickEnhancers: '3',
        showBeaconVisual: 'true',
        enableHoloBillboard: 'true',
        showNewsTicker: 'true',
        activeStore: '',
        ascension_tab_clicked: 'false'
      };

      // Initial achievements
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

      // Set all initial values in localStorage
      Object.entries(initialGameState).forEach(([key, value]) => {
        localStorage.setItem(key, value);
      });

      // Set initial object states
      localStorage.setItem('achievements', JSON.stringify(defaultAchievements));
      localStorage.setItem('craftingInventory', '{}');
      localStorage.setItem('ownedItems', '{}');
      localStorage.setItem('creditStoreItems', '{}');

      // Force a complete page reload
      window.location.href = window.location.href;
    }
  };

  return (
    <div className="reset-section">
      <h3>Reset Progress</h3>
      <p className="reset-warning">Warning: This will permanently delete all your progress!</p>
      <button 
        className="reset-button"
        onClick={handleReset}
      >
        Reset All Progress
      </button>
    </div>
  );
}
