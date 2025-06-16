
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
  setAutoClicks, setPermanentAutoClicks, setCredits, credits,
}) => {
  const prestigeCount = parseInt(localStorage.getItem('prestigeCount') || '0');
  const totalTronicsClicks = parseInt(localStorage.getItem('totalTronicsClicks') || '0');
  const electroStoreUpgrades = parseInt(localStorage.getItem('upgradeCount') || '0');

  // Prestige 4 quest validation - Scraptagon Era
  if (prestigeCount >= 4) {
    if (junk >= 500000000 && !localStorage.getItem('quest_sync_The Scraptagon Awakens')) {
      localStorage.setItem('quest_sync_The Scraptagon Awakens', 'true');
      setCraftingInventory(prev => ({
        ...prev,
        'Void Essence': (prev['Void Essence'] || 0) + 3
      }));
      setNotifications(prev => [...prev, "Quest Complete: The Scraptagon Awakens"]);
      setNotifications(prev => [...prev, "Obtained: 3x Void Essence"]);
      window.dispatchEvent(new CustomEvent('nextNews', { 
        detail: { message: "The Scraptagon stirs. Reality itself bends to your scrap empire..." }
      }));
      return;
    }

    // Dimensional Engineering quest
    const dimensionalItems = (craftingInventory['Dimensional Stabilizer'] || 0) + 
                            (craftingInventory['Quantum Matrix'] || 0) + 
                            (craftingInventory['Void Resonator'] || 0);
    if (dimensionalItems >= 5 && !localStorage.getItem('quest_sync_Dimensional Engineering')) {
      localStorage.setItem('quest_sync_Dimensional Engineering', 'true');
      localStorage.setItem('voidExpeditionsUnlocked', 'true');
      setNotifications(prev => [...prev, "Quest Complete: Dimensional Engineering"]);
      setNotifications(prev => [...prev, "Unlocked: Void Expeditions!"]);
      return;
    }

    // Master of the Void quest
    const voidExpeditions = parseInt(localStorage.getItem('voidExpeditionsCompleted') || '0');
    if (voidExpeditions >= 3 && !localStorage.getItem('quest_sync_Master of the Void')) {
      localStorage.setItem('quest_sync_Master of the Void', 'true');
      localStorage.setItem('realityHackingUnlocked', 'true');
      setNotifications(prev => [...prev, "Quest Complete: Master of the Void"]);
      setNotifications(prev => [...prev, "Unlocked: Reality Hacking protocols!"]);
      return;
    }

    return; // Exit early if in prestige 4+ mode
  }

  // Prestige 3 quest validation - Skills Era
  if (prestigeCount === 3) {
    if (junk >= 200000000 && !localStorage.getItem('quest_sync_Neural Pattern Recognition')) {
      localStorage.setItem('quest_sync_Neural Pattern Recognition', 'true');
      setCraftingInventory(prev => ({
        ...prev,
        'Cognitive Enhancer': (prev['Cognitive Enhancer'] || 0) + 1
      }));
      setNotifications(prev => [...prev, "Quest Complete: Neural Pattern Recognition"]);
      setNotifications(prev => [...prev, "Obtained: Cognitive Enhancer"]);
      window.dispatchEvent(new CustomEvent('nextNews', { 
        detail: { message: "Your mind expands beyond biological limitations..." }
      }));
      return;
    }

    // Skill Mastery quest
    const skillLevels = parseInt(localStorage.getItem('totalSkillLevels') || '0');
    if (skillLevels >= 25 && !localStorage.getItem('quest_sync_Jack of All Trades')) {
      localStorage.setItem('quest_sync_Jack of All Trades', 'true');
      setPermanentAutoClicks(prev => prev + 3);
      setNotifications(prev => [...prev, "Quest Complete: Jack of All Trades"]);
      setNotifications(prev => [...prev, "Obtained: +3 Permanent Autoclicks"]);
      return;
    }

    // Advanced Skills quest
    const advancedSkills = parseInt(localStorage.getItem('advancedSkillsUnlocked') || '0');
    if (advancedSkills >= 3 && !localStorage.getItem('quest_sync_Cognitive Overflow')) {
      localStorage.setItem('quest_sync_Cognitive Overflow', 'true');
      setCraftingInventory(prev => ({
        ...prev,
        'Quantum Processor': (prev['Quantum Processor'] || 0) + 1
      }));
      setNotifications(prev => [...prev, "Quest Complete: Cognitive Overflow"]);
      setNotifications(prev => [...prev, "Obtained: Quantum Processor"]);
      return;
    }

    // Scraptagon Preparation quest
    const scraptagonPrep = (craftingInventory['Quantum Processor'] || 0) + 
                          (craftingInventory['Cognitive Enhancer'] || 0) + 
                          (craftingInventory['Neural Matrix'] || 0);
    if (scraptagonPrep >= 3 && !localStorage.getItem('quest_sync_Prepare the Scraptagon')) {
      localStorage.setItem('quest_sync_Prepare the Scraptagon', 'true');
      localStorage.setItem('scraptagonUnlocked', 'true');
      setNotifications(prev => [...prev, "Quest Complete: Prepare the Scraptagon"]);
      setNotifications(prev => [...prev, "Unlocked: The Scraptagon awaits your command!"]);
      window.dispatchEvent(new CustomEvent('nextNews', { 
        detail: { message: "The final form emerges. The Scraptagon is ready..." }
      }));
      return;
    }

    return;
  }

  // Prestige 2 quest validation - Crew & Scratz Era
  if (prestigeCount === 2) {
    if (junk >= 100000000 && !localStorage.getItem('quest_sync_Beyond the Heap')) {
      localStorage.setItem('quest_sync_Beyond the Heap', 'true');
      setCraftingInventory(prev => ({
        ...prev,
        'Dimensional Residue': (prev['Dimensional Residue'] || 0) + 1
      }));
      setNotifications(prev => [...prev, "Quest Complete: Beyond the Heap"]);
      setNotifications(prev => [...prev, "Obtained: Dimensional Residue"]);
      window.dispatchEvent(new CustomEvent('nextNews', { 
        detail: { message: "The dimensional barriers weaken as you transcend the material heap..." }
      }));
      return;
    }

    // Recruitment Drive quest
    const hiredCrew = JSON.parse(localStorage.getItem('crew-storage') || '{}').state?.hiredCrew?.length || 0;
    if (hiredCrew >= 3 && !localStorage.getItem('quest_sync_Recruitment Drive')) {
      localStorage.setItem('quest_sync_Recruitment Drive', 'true');
      setCredits(prev => prev + 100);
      setNotifications(prev => [...prev, "Quest Complete: Recruitment Drive"]);
      setNotifications(prev => [...prev, "Obtained: 100 Scratz"]);
      return;
    }

    // Mission Obsessed quest
    const successfulMissions = JSON.parse(localStorage.getItem('crew-storage') || '{}').state?.successfulMissions || 0;
    if (successfulMissions >= 10 && !localStorage.getItem('quest_sync_Mission Control')) {
      localStorage.setItem('quest_sync_Mission Control', 'true');
      localStorage.setItem('eliteGearUnlocked', 'true');
      setNotifications(prev => [...prev, "Quest Complete: Mission Control"]);
      setNotifications(prev => [...prev, "Unlocked: Elite gear and advanced missions!"]);
      return;
    }

    // Scratz Empire quest
    if (credits >= 5000 && !localStorage.getItem('quest_sync_Scratz Empire')) {
      localStorage.setItem('quest_sync_Scratz Empire', 'true');
      localStorage.setItem('skillsMenuUnlocked', 'true');
      setNotifications(prev => [...prev, "Quest Complete: Scratz Empire"]);
      setNotifications(prev => [...prev, "Unlocked: Skills Menu - Train your mind!"]);
      window.dispatchEvent(new CustomEvent('nextNews', { 
        detail: { message: "Your economic power unlocks new possibilities for self-improvement..." }
      }));
      return;
    }

    return;
  }

  // Prestige 1 quest validation - Enhanced Automation Era
  if (prestigeCount === 1) {
    if (junk >= 50000000 && !localStorage.getItem('quest_sync_System Memory Detected')) {
      localStorage.setItem('quest_sync_System Memory Detected', 'true');
      setCraftingInventory(prev => ({
        ...prev,
        'Encrypted Coil': (prev['Encrypted Coil'] || 0) + 1
      }));
      setNotifications(prev => [...prev, "Quest Complete: System Memory Detected"]);
      setNotifications(prev => [...prev, "Obtained: Encrypted Coil"]);
      window.dispatchEvent(new CustomEvent('nextNews', { 
        detail: { message: "There's data buried in the circuits… waiting to be recompiled." }
      }));
      return;
    }

    if (totalTronicsClicks >= 5000 && !localStorage.getItem('quest_sync_Tap the Pulse')) {
      localStorage.setItem('quest_sync_Tap the Pulse', 'true');
      setAutoClicks(prev => prev + 5);
      setNotifications(prev => [...prev, "Quest Complete: Tap the Pulse"]);
      setNotifications(prev => [...prev, "Obtained: 5 Auto Clicks"]);
      window.dispatchEvent(new CustomEvent('nextNews', { 
        detail: { message: "You feel the rhythm of the grid. Tronics flow faster now." }
      }));
      return;
    }

    if (electroStoreUpgrades >= 8 && !localStorage.getItem('quest_sync_Upgrade Cascade')) {
      localStorage.setItem('quest_sync_Upgrade Cascade', 'true');
      setCraftingInventory(prev => ({
        ...prev,
        'Surge Capacitor Fragment': (prev['Surge Capacitor Fragment'] || 0) + 1
      }));
      setNotifications(prev => [...prev, "Quest Complete: Upgrade Cascade"]);
      setNotifications(prev => [...prev, "Obtained: Surge Capacitor Fragment"]);
      window.dispatchEvent(new CustomEvent('nextNews', { 
        detail: { message: "With each spark, the system grows stronger." }
      }));
      return;
    }

    if (craftingInventory['Overcharged Prestige Crystal'] >= 1 && !localStorage.getItem('quest_sync_Forge the Overcrystal')) {
      localStorage.setItem('quest_sync_Forge the Overcrystal', 'true');
      localStorage.setItem('crewMenuUnlocked', 'true');
      localStorage.setItem('scratzStoreUnlocked', 'true');
      setNotifications(prev => [...prev, "Quest Complete: Forge the Overcrystal"]);
      setNotifications(prev => [...prev, "Unlocked: Crew Menu & Scratz Store!"]);
      window.dispatchEvent(new CustomEvent('nextNews', { 
        detail: { message: "The enhanced crystal opens new dimensions of possibility..." }
      }));
      return;
    }

    return;
  }

  // Prestige 0 (Base Game) quest validation
  const hasAnyUpgrade = ownedItems.trashBag > 0 || ownedItems.trashPicker > 0;
  const totalPassiveIncome = Math.floor(passiveIncome * globalJpsMultiplier + (autoClicks * clickMultiplier));

  const baseGameQuests = [
    {
      title: "First Steps",
      condition: clickCount > 9,
      category: 'tutorial'
    },
    {
      title: "Shopping Time",
      condition: hasAnyUpgrade,
      category: 'tutorial'
    },
    {
      title: "Tool Master",
      condition: clickMultiplier > 5,
      category: 'progression',
      onComplete: () => {
        setElectroShards(prev => {
          const newValue = prev + 1;
          localStorage.setItem('electroShards', newValue);
          return newValue;
        });
        setNotifications(prev => [...prev, "Quest Completed: Tool Master - Received 1x Electro Shard!"]);
      }
    },
    {
      title: "Passive Income Paradise",
      condition: totalPassiveIncome > 10,
      category: 'progression'
    },
    {
      title: "Begin Crafting",
      condition: Object.values(craftingInventory).some(count => count > 0),
      category: 'progression',
      onComplete: () => {
        const questKey = 'quest_sync_Begin Crafting';
        if (localStorage.getItem(questKey) !== 'true') {
          localStorage.setItem(questKey, 'true');
          window.dispatchEvent(new Event('storage'));
          setNotifications(prev => [...prev, "Quest Completed: Begin Crafting"]);
        }
      }
    },
    {
      title: "Surge Rider",
      condition: surgeCount >= 1,
      category: 'advanced',
      onComplete: () => {
        setElectroShards(prev => {
          const newValue = prev + 1;
          localStorage.setItem('electroShards', newValue);
          return newValue;
        });
        setNotifications(prev => [...prev, "Quest Completed: Surge Rider - Received 1x Electro Shard!"]);
      }
    },
    {
      title: "Automation Punk",
      condition: autoClicks >= 10,
      category: 'advanced',
      onComplete: () => {
        setPermanentAutoClicks(prev => prev + 1);
        setNotifications(prev => [...prev, "Quest Completed: Automation Punk - Received +1 Permanent AutoClick!"]);
      }
    },
    {
      title: "Gambling Addiction",
      condition: localStorage.getItem('bigSlots'),
      category: 'side',
      onComplete: () => {
        setNotifications(prev => [...prev, "Quest Completed: You are now addicted to gambling! - Unlocked more Gambling related content"]);
      }
    },
    {
      title: "Surge Overflow",
      condition: surgeCount >= 3,
      category: 'advanced',
      onComplete: () => {
        setCraftingInventory(prev => ({
          ...prev,
          'Stabilized Capacitor': (prev['Stabilized Capacitor'] || 0) + 1
        }));
        setNotifications(prev => [...prev, "Received: 1x Stabilized Capacitor"]);
      }
    },
    {
      title: "The Circuit Speaks",
      condition: electroShards >= 4,
      category: 'advanced',
      onComplete: () => {
        setCraftingInventory(prev => ({
          ...prev,
          'Voltage Node': (prev['Voltage Node'] || 0) + 1
        }));
        setNotifications(prev => [...prev, "The circuit's secrets are revealed. Received: 1x Voltage Node"]);
      }
    },
    {
      title: "Whispers in the Scrap",
      condition: (cogfatherLore.length >= 10 || junk >= 20000000),
      category: 'milestone',
      onComplete: () => {
        setCraftingInventory(prev => ({
          ...prev,
          'Synthcore Fragment': (prev['Synthcore Fragment'] || 0) + 1
        }));
        window.dispatchEvent(new CustomEvent('nextNews', { 
          detail: { message: "A strange resonance echoes from your scrap..." }
        }));
        setNotifications(prev => [...prev, "The whispers grow stronger. Received: 1x Synthcore Fragment"]);
      }
    },
    {
      title: "Unlock Ascension Protocol",
      condition: junk >= 4000000,
      category: 'milestone',
      onComplete: () => {
        localStorage.setItem('quest_sync_Unlock Ascension Protocol', 'true');
        localStorage.setItem('cogfatherEvent', 'true');
        setNotifications(prev => [...prev, "You've reached 4 million scrap! Unlocking Ascension Protocol."]);
        
        // Add animation to quest log buttons
        const questLogBtn = document.querySelector('.quest-log-toggle');
        const mainQuestLog = document.querySelector('.quest-log');
        if (questLogBtn) questLogBtn.classList.add('quest-log-attention');
        if (mainQuestLog) mainQuestLog.classList.add('quest-log-attention');
      }
    },
    {
      title: "Forge the Future",
      condition: craftingInventory['Prestige Crystal'] >= 1,
      category: 'prestige',
      onComplete: () => {
        localStorage.setItem('prestigeUnlocked', 'true');
        localStorage.setItem('quest_sync_Forge the Future', 'true');
        setNotifications(prev => [...prev, "The Prestige System has been unlocked!"]);
        window.dispatchEvent(new CustomEvent('nextNews', { 
          detail: { message: "Cogfather: The crystal's power flows through the system. You're ready for what comes next." }
        }));
      }
    }
  ];

  baseGameQuests.forEach(quest => {
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
};