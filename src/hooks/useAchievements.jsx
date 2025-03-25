
import { useState } from 'react';

export const defaultAchievements = [
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

export const useAchievements = () => {
  const [achievements, setAchievements] = useState(() => {
    const stored = localStorage.getItem('achievements');
    if (!stored) {
      localStorage.setItem('achievements', JSON.stringify(defaultAchievements));
      return defaultAchievements;
    }
    return JSON.parse(stored);
  });

  const validateAchievements = (gameState) => {
    setAchievements(prev => {
      const newAchievements = [...prev];
      let changed = false;

      newAchievements.forEach(achievement => {
        if (achievement.unlocked) return;

        // Add achievement validation logic here
        // This is a simplified example
        if (achievement.title === "Junkie Starter" && gameState.junk >= 1000) {
          achievement.unlocked = true;
          achievement.checked = true;
          changed = true;
        }
      });

      if (changed) {
        localStorage.setItem('achievements', JSON.stringify(newAchievements));
        return [...newAchievements];
      }
      return prev;
    });
  };

  return { achievements, setAchievements, validateAchievements };
};
