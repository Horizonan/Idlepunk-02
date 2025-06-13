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
  },
  {
    title: "Who Clicks the Clickers",
    requirement: "Click on an Auto Clicker Bot",
    reward: "You're Clicking What? Badge + 1 Permanent Auto Clicker",
    flavorText: "Why are you clicking the thing that clicks for you?",
    unlocked: false,
    checked: false,
    badge: "🤖"
  },
  {
    title: "Befriend the Junk Pile",
    requirement: "Click and drag on the junk pile to pet it",
    reward: "Junk Whisperer Badge + 5% Click Power",
    flavorText: "The junk pile purrs with mechanical satisfaction.",
    unlocked: false,
    checked: false,
    badge: "🗑️❤️"
  },
  {
    title: "Speed Demon",
    requirement: "Click 100 times in 10 seconds",
    reward: "+10% Click Power",
    flavorText: "Your fingers are becoming cybernetic...",
    unlocked: false,
    checked: false,
    badge: "💨"
  },
  {
    title: "Passive Income Pioneer",
    requirement: "Reach 100 Junk/sec",
    reward: "+2 Auto Clicks/sec",
    flavorText: "Money makes money, junk makes junk.",
    unlocked: false,
    checked: false
  },
  {
    title: "Millionaire Scrapper",
    requirement: "Accumulate 1,000,000 Junk",
    reward: "+5% global JPS",
    flavorText: "You're swimming in salvage now.",
    unlocked: false,
    checked: false,
    badge: "💰"
  },
  {
    title: "Surge Master",
    requirement: "Experience 10 Trash Surges",
    reward: "+15% Surge effectiveness",
    flavorText: "You've learned to ride the electric waves.",
    unlocked: false,
    checked: false,
    badge: "🌊"
  },
  {
    title: "Shop Till You Drop",
    requirement: "Purchase 50 total upgrades",
    reward: "+3% Click Power",
    flavorText: "The vendors love seeing you coming.",
    unlocked: false,
    checked: false
  },
  {
    title: "Assembly Line",
    requirement: "Own 10 Auto Clickers total",
    reward: "+1 Permanent Auto Click",
    flavorText: "The machines work while you sleep.",
    unlocked: false,
    checked: false,
    badge: "🏭"
  },
  {
    title: "Click Marathon",
    requirement: "Click 10,000 times",
    reward: "+10% Click Power",
    flavorText: "Your mouse has seen better days...",
    unlocked: false,
    checked: false
  },
  {
    title: "Junk Tycoon",
    requirement: "Reach 10,000,000 Junk",
    reward: "+10% global JPS",
    flavorText: "You could build a city with all this scrap.",
    unlocked: false,
    checked: false,
    badge: "🏙️"
  },
  {
    title: "Efficiency Expert",
    requirement: "Reach 1,000 Junk/sec",
    reward: "+5 Auto Clicks/sec",
    flavorText: "Your operation runs like clockwork.",
    unlocked: false,
    checked: false
  },
  {
    title: "Surge Addict",
    requirement: "Experience 25 Trash Surges",
    reward: "+25% Surge effectiveness",
    flavorText: "You live for the electric rush.",
    unlocked: false,
    checked: false,
    badge: "⚡💊"
  },
  {
    title: "Electronic Shepherd",
    requirement: "Collect 25 Electro Shards",
    reward: "Unlock Advanced Cogfather Lore",
    flavorText: "The shards whisper secrets of the old world.",
    unlocked: false,
    checked: false,
    category: "electroShard",
    shardRequirement: 25,
    loreUnlock: "002"
  },
  {
    title: "First Steps Complete",
    requirement: "Complete your first quest",
    reward: "+1,000 Junk",
    flavorText: "Every journey begins with a single step... or click.",
    unlocked: false,
    checked: false
  },
  {
    title: "Quest Hunter",
    requirement: "Complete 5 quests",
    reward: "+5% global JPS",
    flavorText: "You're getting the hang of this scavenging business.",
    unlocked: false,
    checked: false,
    badge: "🎯"
  },
  {
    title: "Big Spender",
    requirement: "Spend 1,000,000 Junk on upgrades",
    reward: "+3% Click Power",
    flavorText: "Investment in your future self.",
    unlocked: false,
    checked: false
  },
  {
    title: "Automation King",
    requirement: "Own 25 Auto Clickers total",
    reward: "+3 Permanent Auto Clicks",
    flavorText: "The singularity is clicking.",
    unlocked: false,
    checked: false,
    badge: "👑"
  },
  {
    title: "Prestige Pioneer",
    requirement: "Complete your first prestige",
    reward: "+1 Permanent Auto Click",
    flavorText: "Rebirth through destruction and renewal.",
    unlocked: false,
    checked: false,
    badge: "♻️"
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
    const totalUpgradesPurchased = parseInt(localStorage.getItem('totalUpgradesPurchased')) || 0;
    const totalJunkSpent = parseInt(localStorage.getItem('totalJunkSpent')) || 0;
    const surgeCount = parseInt(localStorage.getItem('surgeCount')) || 0;
    const completedQuests = parseInt(localStorage.getItem('completedQuests')) || 0;
    const totalAutoClickers = (gameState.ownedItems?.autoClicker || 0) + (gameState.ownedItems?.autoClickerV2 || 0);
    const speedClickCount = parseInt(localStorage.getItem('speedClickCount')) || 0;
    const speedClickTime = parseInt(localStorage.getItem('speedClickTime')) || 0;

    // First validate electro shard milestones
    checkElectroMilestones(currentShards);

    setAchievements(prev => {
      const newAchievements = [...prev];
      let changed = false;
      const currentJps = gameState.passiveIncome * gameState.globalJpsMultiplier + (gameState.autoClicks * gameState.clickMultiplier);

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
          case "Cogfather's Second Secret":
            if (currentShards >= 10 && !achievement.unlocked) {
              achievement.unlocked = true;
              achievement.checked = true;
              const newLore = [...gameState.cogfatherLore, "002"];
              setCogfatherLore(newLore);
              localStorage.setItem('cogfatherLore', JSON.stringify(newLore));
              setNotifications(prev => [...prev, "Achievement Unlocked: Cogfather's Second Secret!"]);
              changed = true;
            }
            break;
          case "Electronic Shepherd":
            if (currentShards >= 25 && !achievement.unlocked) {
              achievement.unlocked = true;
              achievement.checked = true;
              const newLore = [...gameState.cogfatherLore, "002"];
              setCogfatherLore(newLore);
              localStorage.setItem('cogfatherLore', JSON.stringify(newLore));
              setNotifications(prev => [...prev, "Achievement Unlocked: Electronic Shepherd!"]);
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
          case "Click Marathon":
            if (gameState.clickCount >= 10000 && !achievement.unlocked) {
              achievement.unlocked = true;
              achievement.checked = true;
              setClickMultiplier(prev => prev * 1.1);
              setNotifications(prev => [...prev, "Achievement Unlocked: Click Marathon!"]);
              changed = true;
            }
            break;
          case "Speed Demon":
            if (speedClickCount >= 100 && speedClickTime <= 10000 && !achievement.unlocked) {
              achievement.unlocked = true;
              achievement.checked = true;
              setClickMultiplier(prev => prev * 1.1);
              setNotifications(prev => [...prev, "Achievement Unlocked: Speed Demon!"]);
              changed = true;
            }
            break;
          case "Greasy Milestone":
            if (currentJps >= 10 && !achievement.unlocked) {
              achievement.unlocked = true;
              achievement.checked = true;
              setAutoClicks(prev => prev + 1);
              setNotifications(prev => [...prev, "Achievement Unlocked: Greasy Milestone!"]);
              changed = true;
            }
            break;
          case "Passive Income Pioneer":
            if (currentJps >= 100 && !achievement.unlocked) {
              achievement.unlocked = true;
              achievement.checked = true;
              setAutoClicks(prev => prev + 2);
              setNotifications(prev => [...prev, "Achievement Unlocked: Passive Income Pioneer!"]);
              changed = true;
            }
            break;
          case "Efficiency Expert":
            if (currentJps >= 1000 && !achievement.unlocked) {
              achievement.unlocked = true;
              achievement.checked = true;
              setAutoClicks(prev => prev + 5);
              setNotifications(prev => [...prev, "Achievement Unlocked: Efficiency Expert!"]);
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
          case "Millionaire Scrapper":
            if (gameState.junk >= 1000000 && !achievement.unlocked) {
              achievement.unlocked = true;
              achievement.checked = true;
              setNotifications(prev => [...prev, "Achievement Unlocked: Millionaire Scrapper!"]);
              changed = true;
            }
            break;
          case "Junk Tycoon":
            if (gameState.junk >= 10000000 && !achievement.unlocked) {
              achievement.unlocked = true;
              achievement.checked = true;
              setNotifications(prev => [...prev, "Achievement Unlocked: Junk Tycoon!"]);
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
          case "Surge Master":
            if (surgeCount >= 10 && !achievement.unlocked) {
              achievement.unlocked = true;
              achievement.checked = true;
              setNotifications(prev => [...prev, "Achievement Unlocked: Surge Master!"]);
              changed = true;
            }
            break;
          case "Surge Addict":
            if (surgeCount >= 25 && !achievement.unlocked) {
              achievement.unlocked = true;
              achievement.checked = true;
              setNotifications(prev => [...prev, "Achievement Unlocked: Surge Addict!"]);
              changed = true;
            }
            break;
          case "Shop Till You Drop":
            if (totalUpgradesPurchased >= 50 && !achievement.unlocked) {
              achievement.unlocked = true;
              achievement.checked = true;
              setClickMultiplier(prev => prev * 1.03);
              setNotifications(prev => [...prev, "Achievement Unlocked: Shop Till You Drop!"]);
              changed = true;
            }
            break;
          case "Big Spender":
            if (totalJunkSpent >= 1000000 && !achievement.unlocked) {
              achievement.unlocked = true;
              achievement.checked = true;
              setClickMultiplier(prev => prev * 1.03);
              setNotifications(prev => [...prev, "Achievement Unlocked: Big Spender!"]);
              changed = true;
            }
            break;
          case "Assembly Line":
            if (totalAutoClickers >= 10 && !achievement.unlocked) {
              achievement.unlocked = true;
              achievement.checked = true;
              setAutoClicks(prev => prev + 1);
              setNotifications(prev => [...prev, "Achievement Unlocked: Assembly Line!"]);
              changed = true;
            }
            break;
          case "Automation King":
            if (totalAutoClickers >= 25 && !achievement.unlocked) {
              achievement.unlocked = true;
              achievement.checked = true;
              setAutoClicks(prev => prev + 3);
              setNotifications(prev => [...prev, "Achievement Unlocked: Automation King!"]);
              changed = true;
            }
            break;
          case "First Steps Complete":
            if (completedQuests >= 1 && !achievement.unlocked) {
              achievement.unlocked = true;
              achievement.checked = true;
              setJunk(prev => prev + 1000);
              setNotifications(prev => [...prev, "Achievement Unlocked: First Steps Complete!"]);
              changed = true;
            }
            break;
          case "Quest Hunter":
            if (completedQuests >= 5 && !achievement.unlocked) {
              achievement.unlocked = true;
              achievement.checked = true;
              setNotifications(prev => [...prev, "Achievement Unlocked: Quest Hunter!"]);
              changed = true;
            }
            break;
          case "Prestige Pioneer":
            if (localStorage.getItem('hasPrestiged') === 'true' && !achievement.unlocked) {
              achievement.unlocked = true;
              achievement.checked = true;
              setAutoClicks(prev => prev + 1);
              setNotifications(prev => [...prev, "Achievement Unlocked: Prestige Pioneer!"]);
              changed = true;
            }
            break;
          case "Who Clicks the Clickers":
            const clickedAutoClicker = localStorage.getItem('clickedAutoClicker') === 'true';
            if (clickedAutoClicker && !achievement.unlocked) {
              achievement.unlocked = true;
              achievement.checked = true;
              setAutoClicks(prev => prev + 1);
              setNotifications(prev => [...prev, "Achievement Unlocked: Who Clicks the Clickers!"]);
              changed = true;
            }
            break;
          case "Befriend the Junk Pile":
            const pettedJunkPile = localStorage.getItem('pettedJunkPile') === 'true';
            if (pettedJunkPile && !achievement.unlocked) {
              achievement.unlocked = true;
              achievement.checked = true;
              setClickMultiplier(prev => prev * 1.05);
              setNotifications(prev => [...prev, "Achievement Unlocked: Befriend the Junk Pile!"]);
              console.log('Befriend the Junk Pile achievement unlocked!', achievement);
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
      const electronicShepherd = newAchievements.find(a => a.title === "Electronic Shepherd");

      // Check Circuit Pulse Mastery (5 shards)
      if (circuitPulse && currentShards >= 5) {
        if (!circuitPulse.unlocked) {
          circuitPulse.unlocked = true;
          circuitPulse.checked = true;
          setNotifications(prev => [...prev, "Achievement Unlocked: Circuit Pulse Mastery!"]);
          changed = true;
        }
      }

      // Check Cogfather's Second Secret (10 shards)
      if (cogfatherSecret && currentShards >= 10) {
        if (!cogfatherSecret.unlocked) {
          cogfatherSecret.unlocked = true;
          cogfatherSecret.checked = true;
          const newLore = [...gameState.cogfatherLore, "002"];
          setCogfatherLore(newLore);
          localStorage.setItem('cogfatherLore', JSON.stringify(newLore));
          setNotifications(prev => [...prev, "Achievement Unlocked: Cogfather's Second Secret!"]);
          changed = true;
        }
      }

      // Check Electronic Shepherd (25 shards)
      if (electronicShepherd && currentShards >= 25) {
        if (!electronicShepherd.unlocked) {
          electronicShepherd.unlocked = true;
          electronicShepherd.checked = true;
          const newLore = [...gameState.cogfatherLore, "002"];
          setCogfatherLore(newLore);
          localStorage.setItem('cogfatherLore', JSON.stringify(newLore));
          setNotifications(prev => [...prev, "Achievement Unlocked: Electronic Shepherd!"]);
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