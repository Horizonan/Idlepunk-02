import { useState } from 'react';

export const defaultAchievements = [
  {
    title: "Who's Clicking the Clicker?",
    requirement: "Click on an Auto Clicker Bot",
    reward: "+1 Permanent Auto Click",
    flavorText: "You had to click it... just to make sure it was working.",
    unlocked: false,
    checked: false,
    hidden: true
  },
  {
    title: "Junkie Starter",
    requirement: "Collect 1,000 Junk",
    reward: "+500 Junk",
    flavorText: "Now you're hoarding like a real scavver.",
    unlocked: false,
    checked: false
  },
  {
    title: "Circuit Pulse Mastery",
    requirement: "Collect 5 Electro Shards",
    reward: "+2% global JPS",
    flavorText: "The shards sing with electric potential.",
    unlocked: false,
    checked: false,
    category: "electroShard",
    shardRequirement: 5
  },
  {
    title: "Cogfather's First Secret",
    requirement: "Collect 10 Electro Shards",
    reward: "Unlock Cogfather's Lore Entry #001",
    flavorText: "The truth lies in fragments of crystal and code.",
    unlocked: false,
    checked: false,
    category: "electroShard",
    shardRequirement: 10,
    loreUnlock: "001"
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
  },
  {
    title: "The First Hoard",
    requirement: "Accumulate 10,000 Junk",
    reward: "+10% JPS (30s)",
    flavorText: "Your pile of junk is becoming impressive...",
    unlocked: false,
    checked: false,
    badge: "🗑️"
  },
  {
    title: "UI Breaker",
    requirement: "Your First Trash Surge",
    reward: "Cosmetic Badge",
    flavorText: "The system can't handle your power!",
    unlocked: false,
    checked: false,
    badge: "⚡"
  }
];

export const useAchievements = (gameState, setJunk, setClickMultiplier, setAutoClicks, setPassiveIncome, setNotifications, setCogfatherLore) => {
  const [achievements, setAchievements] = useState(() => {
    try {
      const stored = localStorage.getItem('achievements');
      if (!stored) {
        localStorage.setItem('achievements', JSON.stringify(defaultAchievements));
        return defaultAchievements;
      }
      const parsed = JSON.parse(stored);
      const merged = defaultAchievements.map(defaultAchievement => {
        const stored = parsed.find(a => a.title === defaultAchievement.title);
        return stored || defaultAchievement;
      });
      return merged;
    } catch (error) {
      console.error('Error loading achievements:', error);
      return defaultAchievements;
    }
  });

  const validateAchievements = () => {
    const currentShards = parseInt(localStorage.getItem('electroShards')) || 0;
    const currentJunk = gameState.junk;
    const currentClicks = gameState.clickCount;
    const totalPassiveIncome = gameState.passiveIncome * gameState.globalJpsMultiplier + (gameState.autoClicks * gameState.clickMultiplier);

    setAchievements(prev => {
      const newAchievements = [...prev];
      let changed = false;

      newAchievements.forEach(achievement => {
        // Only check if achievement isn't already completed
        if (!achievement.unlocked && localStorage.getItem(`achievement_${achievement.title}`) === 'true') {
          achievement.unlocked = true;
          achievement.checked = true;
          changed = true;

          // Handle rewards
          switch (achievement.title) {
            case "Who's Clicking the Clicker?":
              const currentPermanent = parseInt(localStorage.getItem('permanentAutoClicks') || '0');
              localStorage.setItem('permanentAutoClicks', (currentPermanent + 1).toString());
              setAutoClicks(prev => prev + 1);
              break;
            case "Junkie Starter":
              setJunk(prev => prev + 500);
              break;
            case "Circuit Pulse Mastery":
              // Handled by global multiplier system
              break;
            case "Cogfather's First Secret":
              const newLore = [...gameState.cogfatherLore, "001"];
              setCogfatherLore(newLore);
              localStorage.setItem('cogfatherLore', JSON.stringify(newLore));
              break;
            case "The First Clicks":
              setClickMultiplier(prev => prev * 1.05);
              break;
            case "Greasy Milestone":
              setAutoClicks(prev => prev + 1);
              break;
            case "The First Hoard":
              setPassiveIncome(prev => {
                const newIncome = prev * 1.1;
                setTimeout(() => setPassiveIncome(prev => prev / 1.1), 30000);
                return newIncome;
              });
              break;
          }

          setNotifications(prev => [...prev, `Achievement Unlocked: ${achievement.title}!`]);
        }
      });

      if (changed) {
        localStorage.setItem('achievements', JSON.stringify(newAchievements));
        return [...newAchievements];
      }
      return prev;
    });
  };

  return { 
    achievements,
    setAchievements,
    validateAchievements
  };
};