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
      // Ensure all default achievements exist
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

    // First validate electro shard milestones
    checkElectroMilestones(currentShards);

    setAchievements(prev => {
      const newAchievements = [...prev];
      let changed = false;

      newAchievements.forEach(achievement => {
        switch (achievement.title) {
          case "Junkie Starter":
            if (gameState.junk >= 1000 && !achievement.unlocked) {
              achievement.unlocked = true;
              achievement.checked = true;
              setJunk(prev => prev + 500);
              setNotifications(prev => [...prev, "Achievement Unlocked: Junkie Starter!"]);
              changed = true;
            }
            break;
          case "Circuit Pulse Mastery":
            if (currentShards >= 5 && !achievement.unlocked) {
              achievement.unlocked = true;
              achievement.checked = true;
              setNotifications(prev => [...prev, "Achievement Unlocked: Circuit Pulse Mastery!"]);
              changed = true;
            }
            break;
          case "Cogfather's First Secret":
            if (currentShards >= 10 && !achievement.unlocked) {
              achievement.unlocked = true;
              achievement.checked = true;
              const newLore = [...gameState.cogfatherLore, "001"];
              setCogfatherLore(newLore);
              localStorage.setItem('cogfatherLore', JSON.stringify(newLore));
              setNotifications(prev => [...prev, "Achievement Unlocked: Cogfather's First Secret!"]);
              changed = true;
            }
            break;
          case "The First Clicks":
            if (gameState.clickCount >= 500 && !achievement.unlocked) {
              achievement.unlocked = true;
              achievement.checked = true;
              setClickMultiplier(prev => prev * 1.05);
              setNotifications(prev => [...prev, "Achievement Unlocked: The First Clicks!"]);
              changed = true;
            }
            break;
          case "Greasy Milestone":
            if ((gameState.passiveIncome * gameState.globalJpsMultiplier + (gameState.autoClicks * gameState.clickMultiplier)) >= 10 && !achievement.unlocked) {
              achievement.unlocked = true;
              achievement.checked = true;
              setAutoClicks(prev => prev + 1);
              setNotifications(prev => [...prev, "Achievement Unlocked: Greasy Milestone!"]);
              changed = true;
            }
            break;
          case "The First Hoard":
            if (gameState.junk >= 10000 && !achievement.unlocked) {
              achievement.unlocked = true;
              achievement.checked = true;
              setPassiveIncome(prev => {
                const newIncome = prev * 1.1;
                setTimeout(() => setPassiveIncome(prev => prev / 1.1), 30000);
                return newIncome;
              });
              setNotifications(prev => [...prev, "Achievement Unlocked: The First Hoard!"]);
              changed = true;
            }
            break;
          case "UI Breaker":
            if ((gameState.isSurgeActive || localStorage.getItem('hadFirstSurge') === 'true') && !achievement.unlocked) {
              achievement.unlocked = true;
              achievement.checked = true;
              setNotifications(prev => [...prev, "Achievement Unlocked: UI Breaker!"]);
              changed = true;
            }
            break;
          case "Who's Clicking the Clicker?":
            if (!achievement.unlocked && localStorage.getItem('clickedAutoClicker') === 'true') {
              achievement.unlocked = true;
              achievement.checked = true;
              setAutoClicks(prev => prev + 1);
              const currentPermanent = parseInt(localStorage.getItem('permanentAutoClicks') || '0');
              localStorage.setItem('permanentAutoClicks', (currentPermanent + 1).toString());
              setNotifications(prev => [...prev, "Achievement Unlocked: Who's Clicking the Clicker?!"]);
              window.dispatchEvent(new CustomEvent('nextNews', { 
                detail: { message: "Cogfather: 'Ah, a true automation enthusiast. Always verifying their tools.'" }
              }));
              changed = true;
            }
            break;
        }
      });

      if (changed) {
        localStorage.setItem('achievements', JSON.stringify(newAchievements));
        return [...newAchievements];
      }
      return prev;
    });
  };

  const checkElectroMilestones = (shardCount) => {
    const currentShards = parseInt(localStorage.getItem('electroShards')) || 0;

    setAchievements(prev => {
      const newAchievements = [...prev];
      let changed = false;

      // Find electro shard achievements
      const circuitPulse = newAchievements.find(a => a.title === "Circuit Pulse Mastery");
      const cogfatherSecret = newAchievements.find(a => a.title === "Cogfather's First Secret");

      // Check Circuit Pulse Mastery (5 shards)
      if (circuitPulse && currentShards >= 5) {
        if (!circuitPulse.unlocked) {
          circuitPulse.unlocked = true;
          circuitPulse.checked = true;
          setNotifications(prev => [...prev, "Achievement Unlocked: Circuit Pulse Mastery!"]);
          changed = true;
        }
      }

      // Check Cogfather's First Secret (10 shards)
      if (cogfatherSecret && currentShards >= 10) {
        if (!cogfatherSecret.unlocked) {
          cogfatherSecret.unlocked = true;
          cogfatherSecret.checked = true;
          const newLore = [...gameState.cogfatherLore, "001"];
          setCogfatherLore(newLore);
          localStorage.setItem('cogfatherLore', JSON.stringify(newLore));
          setNotifications(prev => [...prev, "Achievement Unlocked: Cogfather's First Secret!"]);
          changed = true;
        }
      }

      if (changed) {
        localStorage.setItem('achievements', JSON.stringify(newAchievements));
      }
      return changed ? newAchievements : prev;
    });
  };

  return { 
    achievements, 
    setAchievements, 
    validateAchievements,
    checkElectroMilestones
  };
};