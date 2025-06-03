
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
  setAutoClicks, setPermanentAutoClicks, setCredits,
}) => {
  const hasPrestiged = localStorage.getItem('hasPrestiged') === 'true';
  const totalTronicsClicks = parseInt(localStorage.getItem('totalTronicsClicks'));
  const electroStoreUpgrades = localStorage.getItem('upgradeCount');


  if (hasPrestiged) {


    if (junk >= 25000000 && !localStorage.getItem('quest_sync_System Memory Detected')) {
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


      
      if (electroStoreUpgrades >= 10 && !localStorage.getItem('quest_sync_Upgrade Cascade')) {
        localStorage.setItem('quest_sync_Upgrade Cascade', 'true');
        setCraftingInventory(prev => ({
          ...prev,
          'Surge Capacitor Fragment': (prev['Surge Capacitor Fragment'] || 0) + 1
        }));
        setNotifications(prev => [...prev, "Quest Complete: Upgrade Cascade"]);
        setNotifications(prev => [...prev, "Obtained: ..."]);
        window.dispatchEvent(new CustomEvent('nextNews', { 
          detail: { message: "With each spark, the system grows stronger." }
        }));
      return;
    }

 
    if (localStorage.getItem('beaconCount') == 10 && !localStorage.getItem('quest_sync_Beacon Protocol')) {
      localStorage.setItem('quest_sync_Beacon Protocol', 'true');
      setCraftingInventory(prev => ({
        ...prev,
        'Surge Capacitor Fragment': (prev['Surge Capacitor Fragment'] || 0) + 1
      }));
      setNotifications(prev => [...prev, "Quest Complete: Beacon Protocol"]);
      setNotifications(prev => [...prev, "Obtained: ..."]);
      window.dispatchEvent(new CustomEvent('nextNews', { 
        detail: { message: "The grid is lit. The path ahead is clear." }
      }));
      return;
    }

  
    if (craftingInventory['Overcharged Prestige Crystal'] >= 1 && !localStorage.getItem('quest_sync_Forge the Overcrystal')) {
      localStorage.setItem('prestige1Unlocked', 'true');
      localStorage.setItem('quest_sync_Forge the Overcrystal', 'true');
      setNotifications(prev => [...prev, "The Prestige System has been unlocked!"]);
      window.dispatchEvent(new CustomEvent('nextNews', { 
        detail: { message: "The signal breaks through. You're no longer just salvaging — you're rewriting the system" }
      }));
      return;
    }
    return; 
  }

 
  const hasAnyUpgrade = ownedItems.trashBag > 0 || ownedItems.trashPicker > 0;
  const totalPassiveIncome = Math.floor(passiveIncome * globalJpsMultiplier + (autoClicks * clickMultiplier));

  const questChecks = [
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
      title: "First Steps", 
      condition: clickCount > 9,
      category: 'progression'
    },
    { 
      title: "Shopping Time", 
      condition: hasAnyUpgrade,
      category: 'progression'
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
      title: "Passive Income", 
      condition: totalPassiveIncome > 10,
      category: 'progression'
    },
    {
      title: "Surge Rider",
      condition: surgeCount >= 1,
      category: 'ascension',
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
      title: "Scratz $$$",
      condition: ownedItems.scratzMiner <= 1,
      category: 'progression',
      onComplete: () => {
        setCredits(prev => prev + 30);
      }
    },
    {
      title: "Alone or Lonely?",
      condition: localStorage.getItem('crew-storage') && JSON.parse(localStorage.getItem('crew-storage') || '{}').state?.hiredCrew?.length > 0,
      category: 'progression',
      onComplete: () => {
        setCredits(prev => prev + 30);
      }
    },
    {
      title: "Automation Punk",
      condition: autoClicks >= 10,
      category: 'ascension',
      onComplete: () => {
        setPermanentAutoClicks(prev => prev + 1);
        setNotifications(prev => [...prev, "Quest Completed: Automation Punk - Received +1 Permanent AutoClick!"]);
      }
    },
    {
      title: "Gambling Addiction",
      condition: localStorage.getItem('bigSlots'),
      category: 'progression',
      onComplete: () => {
        
        setNotifications(prev => [...prev, "Quest Completed: You are now addicted to gambling! - Unlocked more Gambling related content"]);
      }
    },
    { 
      title: "Surge Overflow", 
      condition: surgeCount >= 3,
      category: 'ascension',
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
      category: 'ascension',
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
      condition: (cogfatherLore.length >= 10 || junk >= 12500000),
      category: 'ascension',
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
      title: "Prestige Ready",
      condition: junk >= 4000000,
      category: 'progression',
      onComplete: () => {
        localStorage.setItem('quest_sync_Prestige Ready', 'true');
        setNotifications(prev => [...prev, "You've accumulated enough junk to attempt a Prestige!"]);

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
    },


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
};