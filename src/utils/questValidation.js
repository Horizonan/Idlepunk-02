
export const validateQuests = ({
  junk,
  clickCount,
  clickMultiplier,
  passiveIncome,
  autoClicks,
  globalJpsMultiplier,
  surgeCount,
  electroShards,
  cogfatherLore,
  craftingInventory,
  ownedItems,
  setElectroShards,
  setNotifications,
  setCraftingInventory,
  setAutoClicks, 
  setPermanentAutoClicks, 
  setCredits, 
  credits,
}) => {
  const prestigeCount = parseInt(localStorage.getItem('prestigeCount') || '0');
  const hasAnyUpgrade = ownedItems.trashBag > 0 || ownedItems.trashPicker > 0;
  const totalPassiveIncome = Math.floor(passiveIncome * globalJpsMultiplier + (autoClicks * clickMultiplier));

  // Prestige 0 Quests
  if (prestigeCount === 0) {
    const questChecks = [
      {
        title: "First Contact with Junk",
        condition: clickCount >= 10,
        category: 'tutorial'
      },
      {
        title: "Window Shopping Spree",
        condition: hasAnyUpgrade,
        category: 'tutorial'
      },
      {
        title: "Tool Supremacy",
        condition: clickMultiplier >= 5,
        category: 'progression',
        onComplete: () => {
          setElectroShards(prev => {
            const newValue = prev + 1;
            localStorage.setItem('electroShards', newValue);
            return newValue;
          });
          setNotifications(prev => [...prev, "Quest Completed: Tool Supremacy - Received 1x Electro Shard!"]);
        }
      },
      {
        title: "Passive Aggressive Income",
        condition: totalPassiveIncome > 5,
        category: 'progression'
      },
      {
        title: "Crafting for Dummies",
        condition: Object.values(craftingInventory).some(count => count > 0),
        category: 'progression'
      },
      {
        title: "Surge Surfer",
        condition: surgeCount >= 1,
        category: 'advanced',
        onComplete: () => {
          setElectroShards(prev => {
            const newValue = prev + 1;
            localStorage.setItem('electroShards', newValue);
            return newValue;
          });
          setNotifications(prev => [...prev, "Quest Completed: Surge Surfer - Received 1x Electro Shard!"]);
        }
      },
      {
        title: "Crystal Forge Master",
        condition: craftingInventory['Basic Prestige Crystal'] >= 1,
        category: 'milestone',
        onComplete: () => {
          localStorage.setItem('prestige1Unlocked', 'true');
          setNotifications(prev => [...prev, "Prestige 1 System Unlocked!"]);
        }
      }
    ];

    questChecks.forEach(quest => {
      if (quest.condition) {
        const questSyncKey = `quest_sync_${quest.title}`;
        if (!localStorage.getItem(questSyncKey)) {
          localStorage.setItem(questSyncKey, 'true');
          setNotifications(prev => [...prev, `Quest Completed: ${quest.title}`]);
          if (quest.onComplete) {
            quest.onComplete();
          }
        }
      }
    });
  }

  // Prestige 1 Quests
  if (prestigeCount === 1) {
    const questChecks = [
      {
        title: "Reboot Protocols",
        condition: junk >= 1000000,
        category: 'milestone'
      },
      {
        title: "Automation Station",
        condition: autoClicks >= 5,
        category: 'progression',
        onComplete: () => {
          setPermanentAutoClicks(prev => prev + 1);
          setNotifications(prev => [...prev, "Quest Completed: Automation Station - Received +1 Permanent Autoclick!"]);
        }
      },
      {
        title: "Tech Tree Climber",
        condition: parseInt(localStorage.getItem('techUpgradeCount') || '0') >= 3,
        category: 'progression',
        onComplete: () => {
          // Award tech points
          setNotifications(prev => [...prev, "Quest Completed: Tech Tree Climber - Received 2x Tech Points!"]);
        }
      },
      {
        title: "Efficiency Expert",
        condition: clickMultiplier >= 10,
        category: 'progression',
        onComplete: () => {
          setCraftingInventory(prev => ({
            ...prev,
            'Voltage Capacitor': (prev['Voltage Capacitor'] || 0) + 1
          }));
          setNotifications(prev => [...prev, "Received: 1x Voltage Capacitor"]);
        }
      },
      {
        title: "Mass Production",
        condition: surgeCount >= 3,
        category: 'challenge',
        onComplete: () => {
          setCraftingInventory(prev => ({
            ...prev,
            'Stabilized Core': (prev['Stabilized Core'] || 0) + 1
          }));
          setNotifications(prev => [...prev, "Received: 1x Stabilized Core"]);
        }
      },
      {
        title: "Advanced Crystal Synthesis",
        condition: craftingInventory['Enhanced Prestige Crystal'] >= 1,
        category: 'milestone',
        onComplete: () => {
          localStorage.setItem('prestige2Unlocked', 'true');
          setNotifications(prev => [...prev, "Prestige 2 System Unlocked!"]);
        }
      }
    ];

    questChecks.forEach(quest => {
      if (quest.condition) {
        const questSyncKey = `quest_sync_${quest.title}`;
        if (!localStorage.getItem(questSyncKey)) {
          localStorage.setItem(questSyncKey, 'true');
          setNotifications(prev => [...prev, `Quest Completed: ${quest.title}`]);
          if (quest.onComplete) {
            quest.onComplete();
          }
        }
      }
    });
  }

  // Prestige 2 Quests
  if (prestigeCount === 2) {
    const crewStorage = JSON.parse(localStorage.getItem('crew-storage') || '{}');
    const hiredCrew = crewStorage.state?.hiredCrew || [];
    const successfulMissions = crewStorage.state?.successfulMissions || 0;

    const questChecks = [
      {
        title: "Second Wind",
        condition: junk >= 5000000,
        category: 'milestone'
      },
      {
        title: "Scratz Entrepreneur",
        condition: credits >= 50,
        category: 'progression'
      },
      {
        title: "People Manager",
        condition: hiredCrew.length >= 1,
        category: 'progression',
        onComplete: () => {
          setCredits(prev => prev + 30);
          setNotifications(prev => [...prev, "Quest Completed: People Manager - Received 30 Scratz!"]);
        }
      },
      {
        title: "Mission Commander",
        condition: successfulMissions >= 5,
        category: 'progression',
        onComplete: () => {
          setCraftingInventory(prev => ({
            ...prev,
            'Quantum Relay': (prev['Quantum Relay'] || 0) + 1
          }));
          setNotifications(prev => [...prev, "Received: 1x Quantum Relay"]);
        }
      },
      {
        title: "Gambling Problem",
        condition: localStorage.getItem('bigSlots') === 'true',
        category: 'side',
        onComplete: () => {
          setNotifications(prev => [...prev, "Quest Completed: Gambling Problem - You're officially addicted!"]);
        }
      },
      {
        title: "Crew Chief",
        condition: hiredCrew.length >= 3,
        category: 'progression',
        onComplete: () => {
          setCraftingInventory(prev => ({
            ...prev,
            'Neural Interface': (prev['Neural Interface'] || 0) + 1
          }));
          setNotifications(prev => [...prev, "Received: 1x Neural Interface"]);
        }
      },
      {
        title: "Superior Crystal Engineering",
        condition: craftingInventory['Superior Prestige Crystal'] >= 1,
        category: 'milestone',
        onComplete: () => {
          localStorage.setItem('prestige3Unlocked', 'true');
          setNotifications(prev => [...prev, "Prestige 3 System Unlocked!"]);
        }
      }
    ];

    questChecks.forEach(quest => {
      if (quest.condition) {
        const questSyncKey = `quest_sync_${quest.title}`;
        if (!localStorage.getItem(questSyncKey)) {
          localStorage.setItem(questSyncKey, 'true');
          setNotifications(prev => [...prev, `Quest Completed: ${quest.title}`]);
          if (quest.onComplete) {
            quest.onComplete();
          }
        }
      }
    });
  }

  // Prestige 3 Quests
  if (prestigeCount === 3) {
    const crewStorage = JSON.parse(localStorage.getItem('crew-storage') || '{}');
    const successfulMissions = crewStorage.state?.successfulMissions || 0;
    const skillsData = JSON.parse(localStorage.getItem('skillsData') || '{}');
    const skillsUnlocked = localStorage.getItem('skillsUnlocked') === 'true';

    const questChecks = [
      {
        title: "Third Time's the Charm",
        condition: junk >= 20000000,
        category: 'milestone'
      },
      {
        title: "Skills Assessment",
        condition: skillsUnlocked,
        category: 'progression'
      },
      {
        title: "Multi-Talented",
        condition: Object.values(skillsData).filter(level => level >= 5).length >= 3,
        category: 'progression',
        onComplete: () => {
          setCraftingInventory(prev => ({
            ...prev,
            'Skill Amplifier': (prev['Skill Amplifier'] || 0) + 1
          }));
          setNotifications(prev => [...prev, "Received: 1x Skill Amplifier"]);
        }
      },
      {
        title: "Elite Crew Operations",
        condition: successfulMissions >= 15,
        category: 'progression',
        onComplete: () => {
          setCraftingInventory(prev => ({
            ...prev,
            'Command Matrix': (prev['Command Matrix'] || 0) + 1
          }));
          setNotifications(prev => [...prev, "Received: 1x Command Matrix"]);
        }
      },
      {
        title: "Resource Tycoon",
        condition: credits >= 500,
        category: 'collection',
        onComplete: () => {
          setCraftingInventory(prev => ({
            ...prev,
            'Wealth Converter': (prev['Wealth Converter'] || 0) + 1
          }));
          setNotifications(prev => [...prev, "Received: 1x Wealth Converter"]);
        }
      },
      {
        title: "Perfect Crystal Mastery",
        condition: craftingInventory['Perfect Prestige Crystal'] >= 1,
        category: 'milestone',
        onComplete: () => {
          localStorage.setItem('prestige4Unlocked', 'true');
          setNotifications(prev => [...prev, "Prestige 4 System Unlocked!"]);
        }
      }
    ];

    questChecks.forEach(quest => {
      if (quest.condition) {
        const questSyncKey = `quest_sync_${quest.title}`;
        if (!localStorage.getItem(questSyncKey)) {
          localStorage.setItem(questSyncKey, 'true');
          setNotifications(prev => [...prev, `Quest Completed: ${quest.title}`]);
          if (quest.onComplete) {
            quest.onComplete();
          }
        }
      }
    });
  }

  // Prestige 4 Quests
  if (prestigeCount === 4) {
    const crewStorage = JSON.parse(localStorage.getItem('crew-storage') || '{}');
    const successfulMissions = crewStorage.state?.successfulMissions || 0;
    const skillsData = JSON.parse(localStorage.getItem('skillsData') || '{}');
    const scraptagonUnlocked = localStorage.getItem('scraptagonUnlocked') === 'true';
    const scraptagonWins = parseInt(localStorage.getItem('scraptagonWins') || '0');

    const questChecks = [
      {
        title: "Fourth Dimension",
        condition: junk >= 100000000,
        category: 'milestone'
      },
      {
        title: "Scraptagon Initiate",
        condition: scraptagonUnlocked,
        category: 'progression'
      },
      {
        title: "Combat Training",
        condition: scraptagonWins >= 5,
        category: 'progression',
        onComplete: () => {
          setCraftingInventory(prev => ({
            ...prev,
            'Battle Core': (prev['Battle Core'] || 0) + 1
          }));
          setNotifications(prev => [...prev, "Received: 1x Battle Core"]);
        }
      },
      {
        title: "Skill Master",
        condition: Object.values(skillsData).filter(level => level >= 10).length >= 2,
        category: 'progression',
        onComplete: () => {
          setCraftingInventory(prev => ({
            ...prev,
            'Mastery Gem': (prev['Mastery Gem'] || 0) + 1
          }));
          setNotifications(prev => [...prev, "Received: 1x Mastery Gem"]);
        }
      },
      {
        title: "Arena Champion",
        condition: scraptagonWins >= 25,
        category: 'challenge',
        onComplete: () => {
          setCraftingInventory(prev => ({
            ...prev,
            'Victory Essence': (prev['Victory Essence'] || 0) + 1
          }));
          setNotifications(prev => [...prev, "Received: 1x Victory Essence"]);
        }
      },
      {
        title: "Legendary Status",
        condition: credits >= 2000 && successfulMissions >= 50,
        category: 'collection',
        onComplete: () => {
          setCraftingInventory(prev => ({
            ...prev,
            'Legend Fragment': (prev['Legend Fragment'] || 0) + 1
          }));
          setNotifications(prev => [...prev, "Received: 1x Legend Fragment"]);
        }
      },
      {
        title: "Ultimate Crystal Creation",
        condition: craftingInventory['Ultimate Prestige Crystal'] >= 1,
        category: 'milestone',
        onComplete: () => {
          localStorage.setItem('prestige5Unlocked', 'true');
          setNotifications(prev => [...prev, "Prestige 5 System Unlocked!"]);
        }
      }
    ];

    questChecks.forEach(quest => {
      if (quest.condition) {
        const questSyncKey = `quest_sync_${quest.title}`;
        if (!localStorage.getItem(questSyncKey)) {
          localStorage.setItem(questSyncKey, 'true');
          setNotifications(prev => [...prev, `Quest Completed: ${quest.title}`]);
          if (quest.onComplete) {
            quest.onComplete();
          }
        }
      }
    });
  }
};
