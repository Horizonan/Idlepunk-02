
// Quest System - Uniform and Prestige-based
export const QUEST_LINES = {
  progression: {
    name: "Junk to Glory",
    prestigeRequirement: 0,
    quests: [
      {
        id: "first_steps",
        title: "First Steps",
        description: "Click on the junk pile to collect some scrap",
        condition: (state) => state.clickCount >= 10,
        reward: { type: "notification", message: "Quest Completed: First Steps" },
        category: "tutorial",
        difficulty: "easy"
      },
      {
        id: "shopping_time",
        title: "Shopping Time",
        description: "Visit the store and buy your first upgrade",
        condition: (state) => state.ownedItems.trashBag > 0 || state.ownedItems.trashPicker > 0,
        reward: { type: "notification", message: "Quest Completed: Shopping Time" },
        category: "tutorial",
        difficulty: "easy"
      },
      {
        id: "tool_master",
        title: "Tool Master",
        description: "Keep collecting and upgrading your tools",
        condition: (state) => state.clickMultiplier > 5,
        reward: { 
          type: "electroShards", 
          amount: 1,
          message: "Quest Completed: Tool Master - Received 1x Electro Shard!"
        },
        category: "progression",
        difficulty: "easy"
      },
      {
        id: "passive_income",
        title: "Passive Income",
        description: "Purchase some junk to generate passive junk",
        condition: (state) => (state.passiveIncome * state.globalJpsMultiplier + (state.autoClicks * state.clickMultiplier)) > 10,
        reward: { type: "notification", message: "Quest Completed: Passive Income" },
        category: "progression",
        difficulty: "medium"
      },
      {
        id: "begin_crafting",
        title: "Begin Crafting",
        description: "Start crafting items from your collected junk",
        condition: (state) => Object.values(state.craftingInventory).some(count => count > 0),
        reward: { type: "notification", message: "Quest Completed: Begin Crafting" },
        category: "progression",
        difficulty: "medium"
      },
      {
        id: "surge_rider",
        title: "Surge Rider",
        description: "Take advantage of the surge to collect extra junk",
        condition: (state) => state.surgeCount >= 1,
        reward: { 
          type: "electroShards", 
          amount: 1,
          message: "Quest Completed: Surge Rider - Received 1x Electro Shard!"
        },
        category: "advanced",
        difficulty: "medium"
      },
      {
        id: "clickpocalypse_now",
        title: "Clickpocalypse Now",
        description: "Reach 500 clicks",
        condition: (state) => state.clickCount >= 500,
        reward: { 
          type: "electroShards", 
          amount: 1,
          message: "Quest Completed: Clickpocalypse Now - Received 1x Electro Shard!"
        },
        category: "tutorial",
        difficulty: "easy"
      },
      {
        id: "junk_mountaineer",
        title: "Junk Mountaineer",
        description: "Reach 100,000 junk",
        condition: (state) => state.junk >= 100000,
        reward: { 
          type: "craftingMaterial", 
          material: "Synthcore Fragment",
          amount: 1,
          message: "Quest Completed: Junk Mountaineer - Received 1x Synthcore Fragment!"
        },
        category: "progression",
        difficulty: "medium"
      },
      {
        id: "auto_lifer",
        title: "Auto-Lifer",
        description: "Reach 5 auto clicks",
        condition: (state) => state.autoClicks >= 5,
        reward: { 
          type: "notification", 
          message: "Quest Completed: Auto-Lifer - Welcome to the automated life!"
        },
        category: "progression",
        difficulty: "easy"
      },
      {
        id: "craft_collector",
        title: "Craft Collector",
        description: "Own 5 different crafted items",
        condition: (state) => Object.values(state.craftingInventory).filter(count => count > 0).length >= 5,
        reward: { 
          type: "craftingMaterial", 
          material: "Encrypted Coil",
          amount: 1,
          message: "Quest Completed: Craft Collector - Received 1x Encrypted Coil!"
        },
        category: "progression",
        difficulty: "medium"
      },
      {
        id: "automation_punk",
        title: "Automation Punk",
        description: "Tired of clicking? Buy 10 Autoclickers!",
        condition: (state) => state.autoClicks >= 10,
        reward: { 
          type: "permanentAutoClicks", 
          amount: 1,
          message: "Quest Completed: Automation Punk - Received +1 Permanent AutoClick!"
        },
        category: "advanced",
        difficulty: "hard"
      },
      {
        id: "surge_overflow",
        title: "Surge Overflow",
        description: "Trigger 3 Trash Surges",
        condition: (state) => state.surgeCount >= 3,
        reward: { 
          type: "craftingMaterial", 
          material: "Stabilized Capacitor",
          amount: 1,
          message: "Received: 1x Stabilized Capacitor"
        },
        category: "challenge",
        difficulty: "medium"
      },
      {
        id: "the_circuit_speaks",
        title: "The Circuit Speaks",
        description: "Collect 4 Electro Shards",
        condition: (state) => state.electroShards >= 4,
        reward: { 
          type: "craftingMaterial", 
          material: "Voltage Node",
          amount: 1,
          message: "The circuit's secrets are revealed. Received: 1x Voltage Node"
        },
        category: "ascension",
        difficulty: "medium"
      },
      {
        id: "whispers_in_the_scrap",
        title: "Whispers in the Scrap",
        description: "Collect 20M Junk",
        condition: (state) => state.cogfatherLore.length >= 10 || state.junk >= 20000000,
        reward: { 
          type: "craftingMaterial", 
          material: "Synthcore Fragment",
          amount: 1,
          message: "The whispers grow stronger. Received: 1x Synthcore Fragment",
          news: "A strange resonance echoes from your scrap..."
        },
        category: "ascension",
        difficulty: "hard"
      },
      {
        id: "gremlin_wrangler",
        title: "Gremlin Wrangler",
        description: "Use Auto Gremlin Oil once",
        condition: (state) => {
          const gremlinOilUsed = localStorage.getItem('autoGremlinOilUsed') === 'true';
          return gremlinOilUsed;
        },
        reward: { 
          type: "lore", 
          message: "Quest Completed: Gremlin Wrangler - Lore fragment unlocked!",
          loreId: 3,
          loreTitle: "Experimental Compound — Gremlin Oil",
          loreContent: "Invented during a caffeine-fueled slapfight between two rogue engineers, Gremlin Oil was never meant to exist. But once it did, it refused to stop existing. Just like its primary users.\n\nWhen applied to mechanical joints, it triples actuation speed, fries limiters, and gives your auto-clickers a brief taste of godhood. Also smells like ozone and boiled mischief.\n\nSide effects may include: spontaneous gear-hiccups, recursive clicking, phantom limbs, and the overwhelming urge to scream 'I AM THE WRENCH' at passing birds.\n\nDuration: short. Impact: hilarious. Legality: questionable.\n\nDo not ingest — unless you're cool with that.",
          news: "Congratulations, scavver. You survived application of a Class-9 uncertified lubricant."
        },
        category: "progression",
        difficulty: "easy"
      },
      {
        id: "forge_the_future",
        title: "Forge the Future",
        description: "Craft the Prestige Crystal",
        condition: (state) => state.craftingInventory['Prestige Crystal'] >= 1,
        reward: { 
          type: "special", 
          action: "unlockPrestige",
          message: "The Prestige System has been unlocked!",
          news: "Cogfather: The crystal's power flows through the system. You're ready for what comes next."
        },
        category: "milestone",
        difficulty: "legendary"
      }
    ]
  },

  awakenTheCore: {
    name: "Awaken the Core",
    prestigeRequirement: 1,
    quests: [
      {
        id: "system_memory_detected",
        title: "System Memory Detected",
        description: "Reach 50M Junk (post-prestige)",
        condition: (state) => state.junk >= 50000000,
        reward: { 
          type: "craftingMaterial", 
          material: "Encrypted Coil",
          amount: 1,
          message: "Quest Complete: System Memory Detected",
          extraMessage: "Obtained: Encrypted Coil",
          news: "There's data buried in the circuits… waiting to be recompiled."
        },
        category: "milestone",
        difficulty: "hard"
      },
      {
        id: "tap_the_pulse",
        title: "Tap the Pulse",
        description: "Click the Tronics Clicker 10000 times",
        condition: (state) => {
          const totalTronicsClicks = parseInt(localStorage.getItem('totalTronicsClicks') || '0');
          return totalTronicsClicks >= 10000;
        },
        reward: { 
          type: "autoClicks", 
          amount: 5,
          message: "Quest Complete: Tap the Pulse",
          extraMessage: "Obtained: 5 Auto Clicks",
          news: "You feel the rhythm of the grid. Tronics flow faster now."
        },
        category: "challenge",
        difficulty: "medium"
      },
      {
        id: "upgrade_cascade",
        title: "Upgrade Cascade",
        description: "Purchase 10 ElectroShop Upgrades",
        condition: (state) => {
          const electroStoreUpgrades = parseInt(localStorage.getItem('upgradeCount') || '0');
          return electroStoreUpgrades >= 10;
        },
        reward: { 
          type: "craftingMaterial", 
          material: "Surge Capacitor Fragment",
          amount: 1,
          message: "Quest Complete: Upgrade Cascade",
          extraMessage: "Obtained: ...",
          news: "With each spark, the system grows stronger."
        },
        category: "progression",
        difficulty: "hard"
      },
      {
        id: "beacon_protocol",
        title: "Beacon Protocol",
        description: "Own 10 Electro Shard Beacons",
        condition: (state) => parseInt(localStorage.getItem('beaconCount') || '0') >= 10,
        reward: { 
          type: "craftingMaterial", 
          material: "Surge Capacitor Fragment",
          amount: 1,
          message: "Quest Complete: Beacon Protocol",
          extraMessage: "Obtained: ...",
          news: "The grid is lit. The path ahead is clear."
        },
        category: "collection",
        difficulty: "epic"
      },
      {
        id: "mission_obsessed",
        title: "Mission Obsessed",
        description: "Complete 20 Missions and gather 2000 Scratz",
        condition: (state) => {
          const crewStorage = JSON.parse(localStorage.getItem('crew-storage') || '{}');
          const successfulMissions = crewStorage.state?.successfulMissions || 0;
          return successfulMissions >= 20 && state.credits >= 2000;
        },
        reward: { 
          type: "special", 
          action: "unlockAdvancedMissions",
          message: "Quest Complete: Mission Obsessed",
          extraMessage: "Unlocked: New missions and gear available!",
          news: "Your dedication to missions has caught the attention of underground networks. New opportunities await."
        },
        category: "collection",
        difficulty: "legendary"
      },
      {
        id: "core_collector",
        title: "Core Collector",
        description: "Own 5 Scrap Cores",
        condition: (state) => (state.craftingInventory['Scrap Core'] || 0) >= 5,
        reward: { 
          type: "craftingMaterial", 
          material: "Crafting Booster Unit",
          amount: 1,
          message: "Quest Complete: Core Collector",
          extraMessage: "Obtained: Crafting Booster Unit - All junk crafting costs reduced by 10%!",
          news: "Your understanding of core technology deepens. Crafting efficiency increased."
        },
        category: "progression",
        difficulty: "medium"
      },
      {
        id: "forge_the_overcrystal",
        title: "Forge the Overcrystal",
        description: "Craft the Overcharged Prestige Crystal",
        condition: (state) => state.craftingInventory['Overcharged Prestige Crystal'] >= 1,
        reward: { 
          type: "special", 
          action: "unlockPrestige1",
          message: "The Prestige System has been unlocked!",
          news: "The signal breaks through. You're no longer just salvaging — you're rewriting the system"
        },
        category: "milestone",
        difficulty: "legendary"
      }
    ]
  },

  prestige2: {
    name: "Beyond Ascension",
    prestigeRequirement: 2,
    quests: [
      {
        id: "beyond_the_heap",
        title: "Beyond the Heap",
        description: "Reach 100M Junk post-Overcrystal",
        condition: (state) => state.junk >= 100000000,
        reward: { 
          type: "craftingMaterial", 
          material: "Dimensional Residue",
          amount: 1,
          message: "Quest Complete: Beyond the Heap",
          extraMessage: "Obtained: Dimensional Residue",
          news: "The dimensional barriers weaken as you transcend the material heap..."
        },
        category: "milestone",
        difficulty: "hard"
      },
      {
        id: "quantum_resonance",
        title: "Quantum Resonance",
        description: "Activate the Quantum Stabilizer 10 times",
        condition: (state) => {
          const quantumStabilizations = parseInt(localStorage.getItem('quantumStabilizations') || '0');
          return quantumStabilizations >= 10;
        },
        reward: { 
          type: "craftingMaterial", 
          material: "Quantum Fragment",
          amount: 1,
          message: "Quest Complete: Quantum Resonance",
          extraMessage: "Obtained: Quantum Fragment"
        },
        category: "progression",
        difficulty: "medium"
      },
      {
        id: "crafted_ascendancy",
        title: "Crafted Ascendancy",
        description: "Craft 3 Advanced Prestige Items",
        condition: (state) => {
          const advancedPrestigeCount = (state.craftingInventory['Advanced Prestige Core'] || 0) + 
                                        (state.craftingInventory['Dimensional Stabilizer'] || 0) + 
                                        (state.craftingInventory['Quantum Matrix'] || 0);
          return advancedPrestigeCount >= 3;
        },
        reward: { 
          type: "permanentAutoClicks", 
          amount: 2,
          message: "Quest Complete: Crafted Ascendancy",
          extraMessage: "Obtained: +2 Permanent Autoclicks"
        },
        category: "progression",
        difficulty: "epic"
      },
      {
        id: "surge_harvester",
        title: "Surge Harvester",
        description: "Harvest Junk during 3 Trash Surges",
        condition: (state) => {
          const surgeHarvests = parseInt(localStorage.getItem('surgeHarvests') || '0');
          return surgeHarvests >= 3;
        },
        reward: { 
          type: "craftingMaterial", 
          material: "Surge Core Stabilizer",
          amount: 1,
          message: "Quest Complete: Surge Harvester",
          extraMessage: "Obtained: Surge Core Stabilizer"
        },
        category: "collection",
        difficulty: "hard"
      },
      {
        id: "become_a_scratzionaire",
        title: "Become A Scratzionaire",
        description: "Reach 1mil Scratz",
        condition: (state) => state.credits >= 1000000,
        reward: { 
          type: "special", 
          action: "unlockSuperOvercharged",
          message: "Quest Complete: Become A Scratzionaire",
          extraMessage: "Unlocked: Super Overcharged Crystal crafting recipe!",
          news: "Your wealth transcends mere currency. The final crystal awaits..."
        },
        category: "milestone",
        difficulty: "legendary"
      }
    ]
  }
};

export const getCurrentQuestLine = () => {
  const prestigeCount = parseInt(localStorage.getItem('prestigeCount') || '0');
  const prestige2Active = localStorage.getItem('prestige2Active') === 'true';
  
  if (prestige2Active) {
    return 'prestige2';
  } else if (prestigeCount >= 1) {
    return 'awakenTheCore';
  } else {
    return 'progression';
  }
};

export const getAvailableQuestLines = () => {
  const prestigeCount = parseInt(localStorage.getItem('prestigeCount') || '0');
  const prestige2Active = localStorage.getItem('prestige2Active') === 'true';
  const available = [];
  
  Object.entries(QUEST_LINES).forEach(([key, questLine]) => {
    // Special handling for prestige2 questline
    if (key === 'prestige2') {
      if (prestige2Active) {
        available.push({ key, ...questLine });
      }
      return;
    }
    
    // Regular prestige requirement check for other questlines
    if (prestigeCount >= questLine.prestigeRequirement) {
      if (questLine.unlockCondition) {
        if (questLine.unlockCondition()) {
          available.push({ key, ...questLine });
        }
      } else {
        available.push({ key, ...questLine });
      }
    }
  });
  
  return available;
};

export const validateQuests = (gameState, setters) => {
  const currentQuestLineKey = getCurrentQuestLine();
  const currentQuestLine = QUEST_LINES[currentQuestLineKey];
  
  if (!currentQuestLine) return;
  
  currentQuestLine.quests.forEach(quest => {
    const questKey = `quest_sync_${quest.title}`;
    const isCompleted = localStorage.getItem(questKey) === 'true';
    
    if (!isCompleted && quest.condition(gameState)) {
      completeQuest(quest, setters);
      localStorage.setItem(questKey, 'true');
    }
  });
};

const completeQuest = (quest, setters) => {
  const reward = quest.reward;
  
  // Add completion notification
  setters.setNotifications(prev => [...prev, reward.message]);
  
  // Handle different reward types
  switch (reward.type) {
    case 'electroShards':
      setters.setElectroShards(prev => {
        const newValue = prev + reward.amount;
        localStorage.setItem('electroShards', newValue);
        return newValue;
      });
      break;
      
    case 'credits':
      setters.setCredits(prev => prev + reward.amount);
      break;
      
    case 'autoClicks':
      setters.setAutoClicks(prev => prev + reward.amount);
      break;
      
    case 'permanentAutoClicks':
      setters.setPermanentAutoClicks(prev => prev + reward.amount);
      break;
      
    case 'craftingMaterial':
      setters.setCraftingInventory(prev => ({
        ...prev,
        [reward.material]: (prev[reward.material] || 0) + reward.amount
      }));
      if (reward.extraMessage) {
        setters.setNotifications(prev => [...prev, reward.extraMessage]);
      }
      break;
      
    case 'lore':
      // Unlock the specific lore fragment in the lore store
      if (reward.loreId) {
        const { useLoreStore } = await import('../utils/loreStore');
        useLoreStore.getState().unlockFragment(reward.loreId);
      }
      // Also store in localStorage for backwards compatibility
      const existingLore = JSON.parse(localStorage.getItem('loreFragments') || '[]');
      const newLoreFragment = {
        title: reward.loreTitle,
        content: reward.loreContent,
        unlockedAt: Date.now()
      };
      existingLore.push(newLoreFragment);
      localStorage.setItem('loreFragments', JSON.stringify(existingLore));
      break;
      
    case 'special':
      handleSpecialReward(reward, setters);
      break;
  }
  
  // Handle news messages
  if (reward.news) {
    window.dispatchEvent(new CustomEvent('nextNews', { 
      detail: { message: reward.news }
    }));
  }
  
  // Trigger quest update event
  window.dispatchEvent(new CustomEvent('questUpdate'));
};

const handleSpecialReward = (reward, setters) => {
  switch (reward.action) {
    case 'unlockPrestige':
      localStorage.setItem('prestigeUnlocked', 'true');
      break;
      
    case 'unlockPrestige1':
      localStorage.setItem('prestige1Unlocked', 'true');
      break;
      
    case 'unlockAdvancedMissions':
      localStorage.setItem('advancedMissionsUnlocked', 'true');
      localStorage.setItem('eliteGearUnlocked', 'true');
      break;
      
    case 'unlockSuperOvercharged':
      localStorage.setItem('superOverchargedUnlocked', 'true');
      break;
  }
  
  if (reward.extraMessage) {
    setters.setNotifications(prev => [...prev, reward.extraMessage]);
  }
};

export const getQuestProgress = (questLineKey) => {
  const questLine = QUEST_LINES[questLineKey];
  if (!questLine) return { completed: 0, total: 0 };
  
  const completed = questLine.quests.filter(quest => 
    localStorage.getItem(`quest_sync_${quest.title}`) === 'true'
  ).length;
  
  return { completed, total: questLine.quests.length };
};

export const getNextIncompleteQuest = (questLineKey) => {
  const questLine = QUEST_LINES[questLineKey];
  if (!questLine) return null;
  
  return questLine.quests.find(quest => 
    localStorage.getItem(`quest_sync_${quest.title}`) !== 'true'
  );
};
