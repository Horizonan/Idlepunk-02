import { useState, useEffect } from 'react';
import './App.css';
import Clicker from './components/Clicker';
import Achievements from './components/Achievements';
import CheatMenu from './components/CheatMenu';
import Store from './components/Store';
import ElectroStore from './components/ElectroStore';
import CredStore from './components/CredStore';
import AutomationStore from './components/AutomationStore';
import MenuButtons from './components/MenuButtons';
import NewsContainer from './components/NewsContainer';
import TrashSurge from './components/TrashSurge';
import Notifications from './components/Notifications';
import TutorialSystem from './components/TutorialSystem';
import QuestLog from './components/QuestLog';
import SlotMachine from './components/SlotMachine';
import ClickEnhancerEffect from './components/ClickEnhancerEffect';
import DroneEffect from './components/DroneEffect';
import HoverDroneEffect from './components/HoverDroneEffect';
import Menu from './components/Menu';
import CraftingStore from './components/CraftingStore';
import Marketplace from './components/Marketplace';
import ActiveCheats from './components/ActiveCheats';
import FlyingCrystal from './components/FlyingCrystal';
import HoloBillboard from './components/HoloBillboard';
import TrashBonus from './components/TrashBonus';
import ItemInventory from './components/ItemInventory';
import Changelog from './components/Changelog';
import TechTree from './components/TechTree';

export default function App() {
  const baseRate = 100000; // 100,000 junk = 1 credit
  const [showChangelog, setShowChangelog] = useState(false);
  const [showTechTree, setShowTechTree] = useState(false);
  const [showSlotMachine, setShowSlotMachine] = useState(false);
  const [showCheatMenu, setShowCheatMenu] = useState(false);
  const [showCrystal, setShowCrystal] = useState(false);
  const [showTrashBonus, setShowTrashBonus] = useState(false);
  const [electroShards, setElectroShards] = useState(() => Number(localStorage.getItem('electroShards')) || 0);
  const [beaconCount, setBeaconCount] = useState(() => Number(localStorage.getItem('beaconCount')) || 0);
  const [showBeacon, setShowBeacon] = useState(false);
  const [showBeaconVisual, setShowBeaconVisual] = useState(() => localStorage.getItem('showBeaconVisual') !== 'false');
  const [showHoloBillboard, setShowHoloBillboard] = useState(() => localStorage.getItem('showHoloBillboard') !== 'false')
  const [showActiveCheats, setShowActiveCheats] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showQuestLog, setShowQuestLog] = useState(false);
  const [showClickEnhancerUI, setShowClickEnhancerUI] = useState(true);
  const [showNewsTicker, setShowNewsTicker] = useState(() => localStorage.getItem('showNewsTicker') !== 'false');
  const [credits, setCredits] = useState(() => Math.floor(Number(localStorage.getItem('credits')) || 0));
  const [junk, setJunk] = useState(() => Math.floor(Number(localStorage.getItem('junk')) || 0));
  const [clickCount, setClickCount] = useState(() => Math.floor(Number(localStorage.getItem('clickCount')) || 0));
  const [cogfatherLore, setCogfatherLore] = useState(() => JSON.parse(localStorage.getItem('cogfatherLore')) || []);

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

  const [achievements, setAchievements] = useState(() => {
    const stored = localStorage.getItem('achievements');
    if (!stored) {
      localStorage.setItem('achievements', JSON.stringify(defaultAchievements));
      return defaultAchievements;
    }
    const loadedAchievements = JSON.parse(stored);
    // Merge existing achievements with any new ones from defaultAchievements, preserving unlocked/checked states
    const mergedAchievements = defaultAchievements.map(defaultAchievement => {
      const existingAchievement = loadedAchievements.find(a => a.title === defaultAchievement.title);
      if (existingAchievement) {
        return {
          ...defaultAchievement,
          unlocked: existingAchievement.unlocked,
          checked: existingAchievement.checked
        };
      }
      return defaultAchievement;
    });
    return mergedAchievements;
  });
  const [autoClicks, setAutoClicks] = useState(() => Number(localStorage.getItem('autoClicks')) || 0);
  const [preservedHelper, setPreservedHelper] = useState(null); //New state for preserved helper
  const [globalJpsMultiplier, setGlobalJpsMultiplier] = useState(() => Number(localStorage.getItem('globalJpsMultiplier')) || 1);

  useEffect(() => {
    const handleAddMaterial = (e) => {
      const { material, amount } = e.detail;
      setCraftingInventory(prev => ({
        ...prev,
        [material]: (prev[material] || 0) + amount
      }));
    };

    const handleValidateAchievements = () => {
      validateQuestsAndAchievements();
      setNotifications(prev => [...prev, "Achievements validated!"]);
    };

    window.addEventListener('addMaterial', handleAddMaterial);
    window.addEventListener('validateAchievements', handleValidateAchievements);

    if (activeCheatsList['Force Triple Win']) {
      window.dispatchEvent(new CustomEvent('slotForceTriple'));
    }
    if (activeCheatsList['Force Double Win']) {
      window.dispatchEvent(new CustomEvent('slotForceDouble'));
    }

    const handleKeyPress = (e) => {
      if (e.shiftKey && e.key === 'H') {
        setShowCheatMenu(prev => !prev);
        setShowActiveCheats(prev => !prev);
      }
    };

    const handleSlotForceTriple = () => {
      if (window.spinSlotMachine) window.spinSlotMachine(true, false);
    };

    const handleSlotForceDouble = () => {
      if (window.spinSlotMachine) window.spinSlotMachine(false, true);
    };

    const handleShowCrystal = () => {
      setShowCrystal(true);
    };

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('showCrystal', handleShowCrystal);
    window.addEventListener('slotForceTriple', handleSlotForceTriple);
    window.addEventListener('slotForceDouble', handleSlotForceDouble);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('slotForceTriple', handleSlotForceTriple);
      window.removeEventListener('slotForceDouble', handleSlotForceDouble);
      window.removeEventListener('showCrystal', handleShowCrystal);
      window.removeEventListener('addMaterial', handleAddMaterial);
      window.removeEventListener('validateAchievements', handleValidateAchievements);
    };
  }, []);

  const checkElectroMilestones = (shardCount) => {
    setAchievements(prev => {
      const newAchievements = [...prev];
      let changed = false;

      // Check Circuit Pulse Mastery
      const circuitPulse = newAchievements.find(a => a.title === "Circuit Pulse Mastery");
      if (circuitPulse && !circuitPulse.unlocked && shardCount >= 5) {
        circuitPulse.unlocked = true;
        if (!circuitPulse.checked) {
          setGlobalJpsMultiplier(prev => prev * 1.02);
          setNotifications(prev => [...prev, "Achievement Unlocked: Circuit Pulse Mastery!"]);
          circuitPulse.checked = true;
          changed = true;
        }
      }

      // Check Cogfather's First Secret
      const cogfatherSecret = newAchievements.find(a => a.title === "Cogfather's First Secret");
      if (cogfatherSecret && !cogfatherSecret.unlocked && shardCount >= 10) {
        console.log(`Cogfather unlocked`);
        cogfatherSecret.unlocked = true;
        if (!cogfatherSecret.checked) {
          const newLore = [...cogfatherLore, "001"];
          setCogfatherLore(newLore);
          localStorage.setItem('cogfatherLore', JSON.stringify(newLore));
          setNotifications(prev => [...prev, "Achievement Unlocked: Cogfather's First Secret!"]);
          cogfatherSecret.checked = true;
          changed = true;
        }
      }

      return changed ? newAchievements : prev;
    });
  };

  const checkShardMilestones = (shardCount) => {
    // Check for 3 shard milestone
    if (shardCount === 3) {
      window.dispatchEvent(new CustomEvent('nextNews', { 
        detail: { message: "Cogfather: The circuit is almost loud enough to listen to." }
      }));
    }
  };

  const handleReset = (type) => {
    switch(type) {
      case 'junk':
        setJunk(0);
        break;
      case 'credits':
        setCredits(0);
        break;
      case 'achievements':
        setAchievements(prevAchievements => 
          prevAchievements.map(achievement => ({
            ...achievement,
            unlocked: false,
            checked: false
          }))
        );
        break;
      case 'all':
        setJunk(0);
        setCredits(0);
        setClickCount(0);
        localStorage.setItem('clickCount', '0');
        setClickMultiplier(1);
        setPassiveIncome(0);
        setElectronicsUnlock(false);
        setClickEnhancerLevel(0);
        setItemCosts({
          trashBag: 10,
          trashPicker: 100,
          streetrat: 100,
          cart: 500,
          junkMagnet: 1500,
          clickEnhancer: 2500,
          urbanRecycler: 3000,
          autoClicker: 5000,
          scrapDrone: 7500,
          holoBillboard: 15000
        });
        setAutoClicks(0);
        setCraftingInventory({});
        localStorage.removeItem('craftedItems');
        localStorage.removeItem('craftingInventory');
        setShowInventory(false);
        const resetOwnedItems = {
          trashBag: 0,
          trashPicker: 0,
          streetrat: 0,
          cart: 0,
          junkMagnet: 0,
          urbanRecycler: 0,
          clickEnhancer: 0,
          scrapDrone: 0,
          holoBillboard: 0
        };
        setOwnedItems(resetOwnedItems);
        localStorage.setItem('ownedItems', JSON.stringify(resetOwnedItems));
        setAchievements(prevAchievements => 
          prevAchievements.map(achievement => ({
            ...achievement,
            unlocked: false,
            checked: false
          }))
        );
        localStorage.setItem('globalJpsMultiplier', '1');
        setGlobalJpsMultiplier(1);
        break;
    }
  };
  const [electronicsUnlock, setElectronicsUnlock] = useState(() => localStorage.getItem('electronicsUnlock') === 'true');
  const [notifications, setNotifications] = useState([]);
  const [activeStore, setActiveStore] = useState(() => localStorage.getItem('activeStore') || null);
  const [menuOpen, setMenuOpen] = useState(() => localStorage.getItem('menuOpen') !== 'false');
  const [clickMultiplier, setClickMultiplier] = useState(() => Number(localStorage.getItem('clickMultiplier')) || 1);
  const [clickEnhancerLevel, setClickEnhancerLevel] = useState(() => Number(localStorage.getItem('clickEnhancerLevel')) || 0);
  const [isSurgeActive, setIsSurgeActive] = useState(false);
  const [tutorialStage, setTutorialStage] = useState(() => Number(localStorage.getItem('tutorialStage')) || 0);
  const [hasUpgrade, setHasUpgrade] = useState(false);
  const [hasHelper, setHasHelper] = useState(false);
  const [showInventory, setShowInventory] = useState(false);
  const [passiveIncome, setPassiveIncome] = useState(() => Number(localStorage.getItem('passiveIncome')) || 0);

  // Close store when opening other menus
  useEffect(() => {
    if (showSlotMachine || showAchievements || showSettings || showQuestLog) {
      setActiveStore(null);
    }
  }, [showSlotMachine, showAchievements, showSettings, showQuestLog]);

  useEffect(() => {
    const maxBeacons = Math.min(10, beaconCount); // Cap at 10 beacons
    const beaconMultiplier = Math.pow(0.99, maxBeacons); // 1% reduction per beacon
    const crystalInterval = setInterval(() => {
      if (Math.random() < 0.5) {
        setShowCrystal(true);
        setShowBeacon(true);
        setTimeout(() => setShowBeacon(false), 3000);
      }
    }, (900000 + Math.random() * 900000) * beaconMultiplier); // Reduced by beacon effect

    const spawnTrashBonus = () => {
      setShowTrashBonus(true);
      const nextSpawnTime = 120000 + Math.random() * 360000; // Random between 2-8 minutes
      setTimeout(spawnTrashBonus, nextSpawnTime);
    };

    const initialSpawnTime = 120000 + Math.random() * 360000;
    const trashBonusTimer = setTimeout(spawnTrashBonus, initialSpawnTime);

    return () => {
      clearInterval(crystalInterval);
      clearTimeout(trashBonusTimer);
    };
  }, []);

  useEffect(() => {
    const startSurge = () => {
      window.surgeStartTime = Date.now();
      setIsSurgeActive(true);
      setHasFoundCapacitorThisSurge(false);
      localStorage.setItem('hadFirstSurge', 'true');
      const surgeDuration = craftingInventory['Surge Capacitor Module'] ? 10000 : 5000;
      setTimeout(() => {
        setIsSurgeActive(false);
        setHasFoundCapacitorThisSurge(false);
        setSurgeCount(prev => {
          const newCount = prev + 1;
          localStorage.setItem('surgeCount', newCount);
          return newCount;
        });
      }, surgeDuration);
    };

    const handleTriggerSurge = () => startSurge();
    window.addEventListener('triggerSurge', handleTriggerSurge);

    const interval = setInterval(() => {
      if (Math.random() < 0.5) startSurge();
    }, 240000 + Math.random() * 240000);

    return () => {
      clearInterval(interval);
      window.removeEventListener('triggerSurge', handleTriggerSurge);
    };
  }, []);

  const [craftingInventory, setCraftingInventory] = useState(() => JSON.parse(localStorage.getItem('craftingInventory')) || {});
  const [creditStoreItems, setCreditStoreItems] = useState(() => JSON.parse(localStorage.getItem('creditStoreItems')) || {
    'Hover Drone': false,
    'Crafting Booster Unit': false,
    'Ascension Reclaimer': 0
  });

  const [hasFoundCapacitorThisSurge, setHasFoundCapacitorThisSurge] = useState(false);
  const [surgeCount, setSurgeCount] = useState(() => Number(localStorage.getItem('surgeCount')) || 0);
  const [activeCheatsList, setActiveCheatsList] = useState(() => ({
    'Guaranteed Capacitor': false,
    'Force Triple Win': false,
    'Force Double Win': false
  }));
  const [itemCosts, setItemCosts] = useState(() => JSON.parse(localStorage.getItem('itemCosts')) || {
    trashBag: 10,
    trashPicker: 100,
    streetrat: 100,
    cart: 500,
    junkMagnet: 1500,
    urbanRecycler: 3000,
    autoClicker: 5000,
    autoClickerV2: 10000,
    clickEnhancer: 2500,
    scrapDrone: 7500
  });

  const [ownedItems, setOwnedItems] = useState(() => JSON.parse(localStorage.getItem('ownedItems')) || {
    trashBag: 0,
    trashPicker: 0,
    streetrat: 0,
    cart: 0,
    junkMagnet: 0,
    urbanRecycler: 0,
    clickEnhancer: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const totalMultiplier = 1 + (globalJpsMultiplier - 1) + (craftingInventory['Compression Pack'] ? 0.25 : 0);
      setJunk(prev => prev + (passiveIncome * totalMultiplier) + (autoClicks * clickMultiplier)); // Auto clicks use click multiplier
    }, 1000);
    return () => clearInterval(interval);
  }, [passiveIncome, autoClicks, clickMultiplier, globalJpsMultiplier]);

  // Save special resources whenever craftingInventory changes
  useEffect(() => {
    localStorage.setItem('craftingInventory', JSON.stringify(craftingInventory));
  }, [craftingInventory]);

  useEffect(() => {
    const totalPassiveIncome = passiveIncome * globalJpsMultiplier + (autoClicks * clickMultiplier);
    if ((totalPassiveIncome >= 100 || junk >= 1000000)) {
      localStorage.setItem('prestigeUnlocked', 'true');
    }
    if ((totalPassiveIncome >= 100 || junk >= 1000000) && !localStorage.getItem('cogfatherEvent')) {
      setNotifications(prev => [...prev, "The Cogfather wants to speak with you about your progress..."]);
      localStorage.setItem('cogfatherEvent', 'true');
    }

    localStorage.setItem('credits', credits);
    localStorage.setItem('junk', junk);
    localStorage.setItem('electronicsUnlock', electronicsUnlock);
    localStorage.setItem('clickMultiplier', clickMultiplier);
    localStorage.setItem('passiveIncome', passiveIncome);
    localStorage.setItem('itemCosts', JSON.stringify(itemCosts));
    localStorage.setItem('autoClicks', autoClicks);
    localStorage.setItem('clickCount', clickCount);
    localStorage.setItem('achievements', JSON.stringify(achievements));
    localStorage.setItem('clickEnhancerLevel', clickEnhancerLevel);
    localStorage.setItem('ownedItems', JSON.stringify(ownedItems));
    localStorage.setItem('craftingInventory', JSON.stringify(craftingInventory));
    localStorage.setItem('globalJpsMultiplier', globalJpsMultiplier);
  }, [credits, junk, electronicsUnlock, clickMultiplier, passiveIncome, itemCosts, autoClicks, clickCount, achievements, ownedItems, clickEnhancerLevel, globalJpsMultiplier]);

  const validateQuestsAndAchievements = () => {
    const totalPassiveIncome = Math.floor(passiveIncome * globalJpsMultiplier + (autoClicks * clickMultiplier));

    // Validate achievements independently
    setAchievements(prev => {
      const newAchievements = [...prev];
      let changed = false;

      // Each achievement is checked independently
      if (!newAchievements[0].unlocked && Math.floor(junk) >= 1000) {
        newAchievements[0].unlocked = true;
        if (!newAchievements[0].checked) {
          setJunk(prev => prev + 500);
          setNotifications(prev => [...prev, "Achievement Unlocked: Junkie Starter!"]);
          newAchievements[0].checked = true;
          changed = true;
        }
      }

      if (!newAchievements[1].unlocked && clickCount >= 500) {
        newAchievements[1].unlocked = true;
        if (!newAchievements[1].checked) {
          setClickMultiplier(prev => prev * 1.05);
          setNotifications(prev => [...prev, "Achievement Unlocked: The First Clicks!"]);
          newAchievements[1].checked = true;
          changed = true;
        }
      }

      if (!newAchievements[2].unlocked && totalPassiveIncome >= 10) {
        newAchievements[2].unlocked = true;
        if (!newAchievements[2].checked) {
          setAutoClicks(prev => prev + 1);
          setNotifications(prev => [...prev, "Achievement Unlocked: Greasy Milestone!"]);
          newAchievements[2].checked = true;
          changed = true;
        }
      }

      if (!newAchievements[3].unlocked && Math.floor(junk) >= 10000) {
        newAchievements[3].unlocked = true;
        if (!newAchievements[3].checked) {
          setPassiveIncome(prev => prev * 1.1);
          setTimeout(() => setPassiveIncome(prev => prev / 1.1), 30000);
          setNotifications(prev => [...prev, "Achievement Unlocked: The First Hoard!"]);
          newAchievements[3].checked = true;
          changed = true;
        }
      }

      if (!newAchievements[4].unlocked && (isSurgeActive || localStorage.getItem('hadFirstSurge') === 'true')) {
        newAchievements[4].unlocked = true;
        if (!newAchievements[4].checked) {
          setNotifications(prev => [...prev, "Achievement Unlocked: UI Breaker!"]);
          newAchievements[4].checked = true;
          changed = true;
        }
      }

      if (changed) {
        localStorage.setItem('achievements', JSON.stringify(newAchievements));
        return [...newAchievements];
      }
      return prev;
    });

    // Quest validation
    const hasAnyUpgrade = ownedItems.trashBag > 0 || ownedItems.trashPicker > 0;

    const questChecks = [
      { 
        title: "First Steps", 
        condition: clickCount > 0,
        category: 'progression'
      },
      { 
        title: "Shopping Time", 
        condition: hasAnyUpgrade,
        category: 'progression'
      },
      { 
        title: "Tool Master", 
        condition: clickMultiplier > 1,
        category: 'progression'
      },
      { 
        title: "Passive Income", 
        condition: totalPassiveIncome > 0,
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
        condition: electroShards >= 5,
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
        condition: (cogfatherLore.length >= 10 || junk >= 7500000),
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
        title: "Forge the Future",
        condition: craftingInventory['Prestige Crystal'] >= 1,
        category: 'prestige',
        onComplete: () => {
          localStorage.setItem('prestigeUnlocked', 'true');
          setNotifications(prev => [...prev, "The Prestige System has been unlocked!"]);
          window.dispatchEvent(new CustomEvent('nextNews', { 
            detail: { message: "Cogfather: The crystal's power flows through the system. You're ready for what comes next." }
          }));
        }
      }
    ];

    questChecks.forEach(quest => {
      if (quest.condition) {
        const questSyncKey = `quest_sync_${quest.title}`;
        if (!localStorage.getItem(questSyncKey)) {
          localStorage.setItem(questSyncKey, 'true');
          setNotifications(prev => [...prev, `Quest Completed: ${quest.title}`]);

          // Call completion handler if it exists
          if (quest.onComplete) {
            quest.onComplete();
          }

          // Special handling for Surge Overflow quest
          if (quest.title === "Surge Overflow") {
            setCraftingInventory(prev => ({
              ...prev,
              'Stabilized Capacitor': (prev['Stabilized Capacitor'] || 0) + 1
            }));
            setNotifications(prev => [...prev, "Received: 1x Stabilized Capacitor"]);
          }
        }
      }
    });
  };

  const checkAchievements = () => {
    setAchievements(prev => {
      const newAchievements = [...prev];
      let anyChanged = false;

      // Check each achievement independently
      newAchievements.forEach(achievement => {
        if (achievement.unlocked) return; // Skip if already unlocked

        let shouldUnlock = false;
        let reward = null;

        switch (achievement.title) {
          case "Junkie Starter":
            if (junk >= 1000) {
              shouldUnlock = true;
              reward = () => setJunk(j => j + 500);
            }
            break;
          case "The First Clicks":
            if (clickCount >= 500) {
              shouldUnlock = true;
              reward = () => setClickMultiplier(prev => prev * 1.05);
            }
            break;
          case "Greasy Milestone":
            if ((passiveIncome * globalJpsMultiplier + (autoClicks * clickMultiplier)) >= 10) {
              shouldUnlock = true;
              reward = () => setAutoClicks(prev => prev + 1);
            }
            break;
          case "The First Hoard":
            if (junk >= 10000) {
              shouldUnlock = true;
              reward = () => {
                setPassiveIncome(prev => prev * 1.1);
                setTimeout(() => setPassiveIncome(prev => prev / 1.1), 30000);
              };
            }
            break;
          case "UI Breaker":
            if (isSurgeActive || localStorage.getItem('hadFirstSurge') === 'true') {
              shouldUnlock = true;
            }
            break;
        }

        if (shouldUnlock && !achievement.checked) {
          achievement.unlocked = true;
          achievement.checked = true;
          anyChanged = true;
          setNotifications(prev => [...prev, `Achievement Unlocked: ${achievement.title}!`]);
          if (reward) reward();
        }
      });

      if (anyChanged) {
        localStorage.setItem('achievements', JSON.stringify(newAchievements));
      }
      return anyChanged ? newAchievements : prev;
    });
  };

  const collectJunk = () => {
    const surgeMultiplier = isSurgeActive ? 2 : 1;
    setJunk(prev => prev + (clickMultiplier * surgeMultiplier));

    // Random material finding
    const random = Math.random();
    if (random < 0.0001) { // 0.01% chance for basic materials
      const materials = ['Wires', 'Metal Plates', 'Gear Bits'];
      const randomMaterial = materials[Math.floor(Math.random() * materials.length)];
      setCraftingInventory(prev => ({
        ...prev,
        [randomMaterial]: (prev[randomMaterial] || 0) + 1
      }));
      setNotifications(prev => [...prev, `Found a ${randomMaterial}!`]);
    } else if (random < 0.00001) { // 0.001% chance for power core
      setCraftingInventory(prev => ({
        ...prev,
        'Scrap Core': (prev['Scrap Core'] || 0) + 1
      }));
      setNotifications(prev => [...prev, 'Found a Scrap Core!']);
    }

    // Check for capacitor during surge
    if (isSurgeActive && !hasFoundCapacitorThisSurge && (activeCheatsList['Guaranteed Capacitor'] || Math.random() < 0.01)) {
      setCraftingInventory(prev => ({
        ...prev,
        'Capacitor': (prev['Capacitor'] || 0) + 1
      }));
      setHasFoundCapacitorThisSurge(true);
      setNotifications(prev => [...prev, 'Found a Capacitor from the surge!']);
    }

    setClickCount(prev => {
      const newCount = prev + 1;
      localStorage.setItem('clickCount', newCount);
      return newCount;
    });
    checkAchievements();
  };

  const collectTronics = () => {
    if (electronicsUnlock) {
      setCredits(prev => prev + 1);
    }
  };

  const buyItem = (cost, message) => {
    if (credits >= cost) {
      setCredits(prev => prev - cost);
      setNotifications(prev => [...prev, message]);
    }
  };

  const handleBuyTrashBag = () => {
    if (junk >= itemCosts.trashBag) {
      setJunk(prev => prev - itemCosts.trashBag);
      setNotifications(prev => [...prev, "Scrap Bag purchased!"]);
      setClickMultiplier(prev => prev + 1);
      setItemCosts(prev => ({...prev, trashBag: Math.floor(prev.trashBag * 1.1)}));
      setOwnedItems(prev => ({...prev, trashBag: prev.trashBag + 1}));
      setHasUpgrade(true);
    }
  };

  const handleBuyPicker = () => {
    if (junk >= itemCosts.trashPicker) {
      setJunk(prev => prev - itemCosts.trashPicker);
      setNotifications(prev => [...prev, "Trash Picker purchased!"]);
      setClickMultiplier(prev => prev + 3);
      setItemCosts(prev => ({...prev, trashPicker: Math.floor(prev.trashPicker * 1.1)}));
      setOwnedItems(prev => ({...prev, trashPicker: prev.trashPicker + 1}));
    }
  };

  const handleBuyStreetrat = () => {
    if (junk >= itemCosts.streetrat) {
      setJunk(prev => prev - itemCosts.streetrat);
      setNotifications(prev => [...prev, "Streetrat hired!"]);
      setPassiveIncome(prev => prev + 1);
      setItemCosts(prev => ({...prev, streetrat: Math.floor(prev.streetrat * 1.15)}));
      setOwnedItems(prev => ({...prev, streetrat: prev.streetrat + 1}));
      setHasHelper(true);
    }
  };

  const handleBuyCart = () => {
    if (junk >= itemCosts.cart) {
      setJunk(prev => prev - itemCosts.cart);
      setNotifications(prev => [...prev, "Shopping Cart purchased!"]);
      setPassiveIncome(prev => prev + 5);
      setItemCosts(prev => ({...prev, cart: Math.floor(prev.cart * 1.15)}));
      setOwnedItems(prev => ({...prev, cart: prev.cart + 1}));
    }
  };

  const handleBuyJunkMagnet = () => {
    if (junk >= itemCosts.junkMagnet) {
      setJunk(prev => prev - itemCosts.junkMagnet);
      setNotifications(prev => [...prev, "Junk Magnet purchased!"]);
      setPassiveIncome(prev => prev + 10);
      setItemCosts(prev => ({...prev, junkMagnet: Math.floor(prev.junkMagnet * 1.15)}));
      setOwnedItems(prev => ({...prev, junkMagnet: prev.junkMagnet + 1}));
    }
  };

  const handleBuyUrbanRecycler = () => {
    if (junk >= itemCosts.urbanRecycler) {
            setJunk(prev => prev - itemCosts.urbanRecycler);
      setNotifications(prev => [...prev, "Urban Recycler purchased!"]);
      setPassiveIncome(prev => prev + 20);
      setItemCosts(prev => ({...prev, urbanRecycler: Math.floor(prev.urbanRecycler * 1.15)}));
      setOwnedItems(prev => ({...prev, urbanRecycler: prev.urbanRecycler + 1}));
    }
  };

  const handleBuyScrapDrone = () => {
    if (junk >= itemCosts.scrapDrone) {
      setJunk(prev => prev - itemCosts.scrapDrone);
      setNotifications(prev => [...prev, "Scrap Drone Deployed – +25 JPS"]);
      setPassiveIncome(prev => prev + 25);
      setItemCosts(prev => ({...prev, scrapDrone: Math.floor(prev.scrapDrone * 1.15)}));
      setOwnedItems(prev => ({...prev, scrapDrone: (prev.scrapDrone || 0) + 1}));

      if (!ownedItems.scrapDrone) {
        window.dispatchEvent(new CustomEvent('nextNews', { 
          detail: { message: "Cogfather: You've got drones now? Look at you, corporate overlord in the making." }
        }));
        setDefaultNews(prev => [...prev, "Automated helper deployed. Don't expect it to take breaks."]);
      }
    }
  };

  const handleBuyHoloBillboard = () => {
    if (junk >= (itemCosts.holoBillboard || 15000)) {
      setJunk(prev => prev - (itemCosts.holoBillboard || 15000));
      setNotifications(prev => [...prev, "Holo Billboard Online – City scrappers stare in awe (+10% Junk/sec globally)!"]);
      setGlobalJpsMultiplier(prev => {
        const newValue = prev + 0.1;
        localStorage.setItem('globalJpsMultiplier', newValue);
        return newValue;
      });
      setItemCosts(prev => ({...prev, holoBillboard: Math.floor((prev.holoBillboard || 15000) * 1.2)}));
      setOwnedItems(prev => ({...prev, holoBillboard: (prev.holoBillboard || 0) + 1}));

      if (!ownedItems.holoBillboard) {
        window.dispatchEvent(new CustomEvent('nextNews', { 
          detail: { message: "Cogfather nods approvingly: 'Advertising your junk empire now? Ambitious, kid. I like it.'" }
        }));
      }
    }
  };

  const handleBuySolderingIron = () => {
    buyItem(1000, "Bought a Soldering Iron!");
    setElectronicsUnlock(true);
  };
  const handleBuyMultimeter = () => buyItem(2000, "Bought a Multimeter!");

  useEffect(() => {
    localStorage.setItem('tutorialStage', tutorialStage);
    validateQuestsAndAchievements();
  }, [tutorialStage]);

  // Validate on major game events
  useEffect(() => {
    validateQuestsAndAchievements();
  }, [passiveIncome, ownedItems.streetrat, clickMultiplier, globalJpsMultiplier]);

  useEffect(() => {
    const onetimeItems = ['Click Rig Mk I', 'Auto Toolkit', 'Compression Pack', 'Reinforced Backpack', 'Surge Capacitor Module'];
    const hasCraftedOneTime = onetimeItems.some(item => (craftingInventory[item] || 0) > 0);
    setShowInventory(hasCraftedOneTime);
  }, [craftingInventory]);


  return (
    <main>
      {showQuestLog && <QuestLog tutorialStage={tutorialStage} onClose={() => setShowQuestLog(false)} />}
      <TutorialSystem
        junk={junk}
        hasUpgrade={hasUpgrade}
        passiveIncome={passiveIncome}
        hasHelper={hasHelper}
        hasCrafting={Object.values(craftingInventory).some(count => count > 0)}
        isSurgeActive={isSurgeActive}
        tutorialStage={tutorialStage}
        onTutorialProgress={(stage) => setTutorialStage(stage)}
      />
      {showNewsTicker && <NewsContainer isSurgeActive={isSurgeActive} />}
      <TrashSurge isActive={isSurgeActive} />
      <HoloBillboard ownedItems={ownedItems} />
      {showCrystal && (
        <FlyingCrystal
          onCollect={() => {
            setShowCrystal(false);
            setElectroShards(prev => {
              const newValue = prev + 1;
              localStorage.setItem('electroShards', newValue);
              checkElectroMilestones(newValue);
              checkShardMilestones(newValue);
              return newValue;
            });
            setNotifications(prev => [...prev, "Crystal shard collected!"]);
          }}
          onDisappear={() => {
            setShowCrystal(false);
            setNotifications(prev => [...prev, "The electro shard vanished into the void..."]);
          }}
        />
      )}
      <div className="stats">
        <p>Money: {credits.toFixed(2)}C</p>
        <p>Junk: {Math.floor(junk).toLocaleString('en-US', {maximumFractionDigits: 0})}</p>
        <p>Junk/sec: {Math.floor((passiveIncome * globalJpsMultiplier) + (autoClicks * clickMultiplier)).toLocaleString('en-US', {maximumFractionDigits: 0})}</p>
        <p className="crystal-shards" title="Requires advanced knowledge to operate. Unlocks after ascension.">
          Electro Shards: {electroShards}
        </p>

      </div>
      <Menu onStoreSelect={(type) => {
        switch(type) {
          case 'marketplace':
            setActiveStore('marketplace');
            break;
          case 'achievements':
            setShowAchievements(true);
            break;
          case'questLog':
            setShowQuestLog(prev => !prev);
            break;
          case 'slotMachine':
            setShowSlotMachine(true);
            break;
          case 'settings':
            setShowSettings(true);
            break;
          case 'changelog':
            setShowChangelog(true);
            break;
        }
      }} />
      {showSlotMachine && (
        <SlotMachine
          junk={junk}
          onSpin={(cost) => setJunk(prev => prev - cost)}
          onClose={() => setShowSlotMachine(false)}
        />
      )}
      {showAchievements && (
        <Achievements 
          achievements={achievements}
          onClose={() => setShowAchievements(false)}
        />
      )}
      <div className={`burger-menu ${menuOpen ? 'open' : ''}`} onClick={() => {
        setMenuOpen(!menuOpen);
        localStorage.setItem('menuOpen', !menuOpen);
      }}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div 
        className={`sidebar ${menuOpen ? 'open' : ''} ${localStorage.getItem('sidebarLocked') === 'true' ? 'locked' : ''}`}
        style={{
          left: menuOpen ? (localStorage.getItem('sidebarLeft') || '0px') : '-300px',
          bottom: activeStore ? (localStorage.getItem('sidebarBottom') || '250px') : '250px'
        }}
        onMouseDown={(e) => {
          if (localStorage.getItem('sidebarLocked') === 'true' ||e.target.className === 'lock-button') return;

          const sidebar = e.currentTarget;
          const startX = e.clientX - sidebar.offsetLeft;
          const rect = sidebar.getBoundingClientRect();
          const startY = e.clientY - rect.top;

          const handleMouseMove = (e) => {
            const newTop = e.clientY - startY;
            sidebar.style.top = `${newTop}px`;
          };

          const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            localStorage.setItem('sidebarTop', sidebar.style.top);
          };

          document.addEventListener('mousemove', handleMouseMove);
          document.addEventListener('mouseup', handleMouseUp);
        }}
      >
        <button 
          className="lock-button"
          onClick={() => {
            const isLocked = localStorage.getItem('sidebarLocked') === 'true';
            localStorage.setItem('sidebarLocked', !isLocked);
            document.querySelector('.sidebar').classList.toggle('locked');
          }}
        >
          {localStorage.getItem('sidebarLocked') === 'true' ? '🔒' : '🔓'}
        </button>
        <MenuButtons 
          onStoreSelect={(store) => {
            setActiveStore(store);
          }}
          showInventory={showInventory}
        />
      </div>
      {activeStore === 'store' && (
        <Store 
          credits={junk}
          itemCosts={itemCosts}
          ownedItems={ownedItems}
          onBuyTrashBag={handleBuyTrashBag}
          onBuyPicker={handleBuyPicker}
          onBuyStreetrat={handleBuyStreetrat}
          onBuyCart={handleBuyCart}
          onBuyJunkMagnet={handleBuyJunkMagnet}
          onBuyUrbanRecycler={handleBuyUrbanRecycler}
          onBuyScrapDrone={handleBuyScrapDrone}
          onBuyHoloBillboard={handleBuyHoloBillboard} // Added prop
          globalJpsMultiplier={globalJpsMultiplier}
          passiveIncome={passiveIncome}
          onBuyClickEnhancer={() => {
            if (junk >= itemCosts.clickEnhancer) {
              setJunk(prev => prev - itemCosts.clickEnhancer);
              setClickMultiplier(prev => prev + 10);
              setClickEnhancerLevel(prev => prev + 1);
              setItemCosts(prev => ({...prev, clickEnhancer: Math.floor(prev.clickEnhancer * 1.1)}));
              setOwnedItems(prev => ({...prev, clickEnhancer: (prev.clickEnhancer || 0) + 1}));
              setNotifications(prev => [...prev, "Click Enhancer purchased!"]);
              if (clickEnhancerLevel === 0) {
                setNotifications(prev => [...prev, "Finger strength increasing! Bet you never thought clicking would become your day job."]);
                window.dispatchEvent(new CustomEvent('nextNews', { 
                  detail: { message: "Cogfather nods approvingly: 'Clicks mean business. Keep 'em coming.'" }
                }));
              }
            }
          }}
          clickCount={clickCount}
          purchasedUpgrades={Object.values(itemCosts).filter(cost => cost > 0).length}
          onBack={() => setActiveStore(null)}
        />
      )}
      {activeStore === 'marketplace' && (
        <Marketplace 
          onClose={() => setActiveStore(null)}
          junk={junk}
          passiveIncome={passiveIncome}
          cogfatherLore={cogfatherLore}
        />
      )}
      {activeStore === 'electrostore' && (
        <ElectroStore 
          credits={credits}
          onBuySolderingIron={handleBuySolderingIron}
          onBuyMultimeter={handleBuyMultimeter}
          onBack={() => setActiveStore(null)}
        />
      )}
      {activeStore === 'automation' && (
        <AutomationStore
          junk={junk}
          itemCosts={itemCosts}
          autoClicks={autoClicks}
          onBuyAutoClicker={() => {
            if (junk >= itemCosts.autoClicker) {
              setJunk(prev => prev - itemCosts.autoClicker);
              setAutoClicks(prev => prev + 1);
              setItemCosts(prev => ({...prev, autoClicker: Math.floor(prev.autoClicker * 1.15)}));
              setNotifications(prev => [...prev, "Auto Clicker Bot purchased!"]);
              window.dispatchEvent(new CustomEvent('nextNews', { 
                detail: { message: "Cogfather whispers: 'Sit back, kid. Let the bots handle it from here.'" }
              }));
            }
          }}
          onBuyAutoClickerV2={() => {
            if (junk >= itemCosts.autoClickerV2 && autoClicks >= 1) {
              setJunk(prev => prev - itemCosts.autoClickerV2);
              setAutoClicks(prev => prev - 1 + 2); // Remove 1 v1 and add 2 clicks for v2
              setItemCosts(prev => ({...prev, autoClickerV2: Math.floor(prev.autoClickerV2 * 1.15)}));
              setNotifications(prev => [...prev, "Auto Clicker Bot v2.0 purchased! (Consumed 1 Auto Clicker Bot)"]);
              window.dispatchEvent(new CustomEvent('nextNews', { 
                detail: { message: "Cogfather: 'Twice the clicks, twice the profits. Now that's efficiency!'" }
              }));
            }
          }}
          onBack={() => setActiveStore(null)}
        />
      )}
      {activeStore === 'craft' && (
        <CraftingStore
          junk={junk}
          craftingInventory={craftingInventory}
          onCraft={(item) => {
            if (item.type === 'basic') {
              if (junk >= item.cost) {
                setJunk(prev => prev - item.cost);
                setCraftingInventory(prev => ({
                  ...prev,
                  [item.name]: (prev[item.name] || 0) + 1
                }));
                setNotifications(prev => [...prev, `Crafted ${item.name}!`]);
              }
            } else {
              const canCraft = Object.entries(item.requirements).every(
                ([mat, count]) => (craftingInventory[mat] || 0) >= count
              ) && (!item.onetime || !(craftingInventory[item.name] || 0)) && junk >= (item.cost || 0);
              if (canCraft) {
                setCraftingInventory(prev => {
                  const newInventory = { ...prev };
                  Object.entries(item.requirements).forEach(([mat, count]) => {
                    newInventory[mat] -= count;
                  });
                  newInventory[item.name] = (newInventory[item.name] || 0) + 1;
                  return newInventory;
                });
                if (item.cost) setJunk(prev => prev - item.cost);
                if (item.name === 'Click Rig Mk I') {
                  setClickMultiplier(prev => prev * 1.25);
                  setNotifications(prev => [...prev, "Click power increased by 25%!"]);
                }
                if (item.name === 'Auto Toolkit') {
                  setAutoClicks(prev => Math.floor(prev * 1.25));
                  setNotifications(prev => [...prev, "Auto Click efficiency increased by 25%!"]);
                }
                if (item.name === 'Compression Pack') {
                  setPassiveIncome(prev => Math.floor(prev * 1.25));
                  setNotifications(prev => [...prev, "Passive income increased by 25%!"]);
                }
                if (item.name === 'Reinforced Backpack') {
                  setItemCosts(prev => {
                    const newCosts = { ...prev };
                    Object.keys(newCosts).forEach(key => {
                      if (key !== 'clickEnhancer') { // Don't affect click enhancer scaling
                        const currentScaling = key === 'streetrat' || key === 'cart' || key === 'junkMagnet' || key === 'urbanRecycler' || key === 'scrapDrone' ? 1.15 : 1.1;
                        const newScaling = currentScaling - 0.01;
                        localStorage.setItem(`${key}Scaling`, newScaling.toString());
                      }
                    });
                    return newCosts;
                  });
                  setNotifications(prev => [...prev, "Cost scaling reduced by 1%!"]);
                }
                setNotifications(prev => [...prev, `Crafted ${item.name}!`]);
              }
            }
          }}
          onBack={() => setActiveStore(null)}
        />
      )}
      {activeStore === 'credstore' && (
        <CredStore
          junk={junk}
          credits={credits}
          autoClicks={autoClicks}
          onSellJunk={(rate) => {
            if (junk >= rate) {
              const creditsToAdd = rate === baseRate ? 1 : rate === baseRate * 10 ? 10 : 100;
              setJunk(prev => prev - rate);
              setCredits(prev => prev + creditsToAdd);
              setNotifications(prev => [...prev, `Sold ${rate} junk for ${creditsToAdd} credits!`]);
            }
          }}
          onBuyBeacon={() => {
            if (credits >= 25) {
              setCredits(prev => prev - 25);
              setBeaconCount(prev => {
                const newCount = prev + 1;
                localStorage.setItem('beaconCount', newCount);
                return newCount;
              });
              setNotifications(prev => [...prev, "Electro Shard Beacon purchased! Crystal spawn time reduced by 1%"]);
              setShowBeacon(true);
              setTimeout(() => setShowBeacon(false), 3000);
            }
          }}
          craftingInventory={craftingInventory}
          creditStoreItems={creditStoreItems}
          onBuyHoverDrone={() => {
            if (credits >= 20 && !creditStoreItems['Hover Drone']) {
              setCredits(prev => prev - 20);
              setCreditStoreItems(prev => {
                const newItems = { ...prev, 'Hover Drone': true };
                localStorage.setItem('creditStoreItems', JSON.stringify(newItems));
                return newItems;
              });
              setCraftingInventory(prev => ({
                ...prev,
                'Hover Drone': 1
              }));
              setNotifications(prev => [...prev, "Hover Drone Addon purchased! Floating trash will last longer."]);
              window.dispatchEvent(new CustomEvent('nextNews', { 
                detail: { message: "A new drone takes to the skies, extending the life of your floating opportunities." }
              }));
            }
          }}
          onBuyBooster={() => {
            if (credits >= 60 && !creditStoreItems['Crafting Booster Unit']) {
              setCredits(prev => prev - 60);
              setCreditStoreItems(prev => {
                const newItems = { ...prev, 'Crafting Booster Unit': true };
                localStorage.setItem('creditStoreItems', JSON.stringify(newItems));
                return newItems;
              });
              setCraftingInventory(prev => ({
                ...prev,
                'Crafting Booster Unit': 1
              }));
              setNotifications(prev => [...prev, "Crafting Booster Unit purchased! Basic crafting costs reduced by 10%"]);
              window.dispatchEvent(new CustomEvent('nextNews', { 
                detail: { message: "Your crafting operations just got more efficient!" }
              }));
            }
          }}
          onBuyReclaimer={() => {
            const hasAutoClickerBot = autoClicks > 0; // Check if user has any Auto Clicker Bots

            if (!hasAutoClickerBot) {
              setNotifications(prev => [...prev, "You need to own at least one automation helper to use the Ascension Reclaimer!"]);
              return;
            }

            if (credits >= 90 && (craftingInventory['Ascension Reclaimer'] || 0) < 2) {
              setCredits(prev => prev - 90);  // Deduct 90 credits from the user's current balance
              setCraftingInventory(prev => ({
                ...prev,
                'Ascension Reclaimer': (prev['Ascension Reclaimer'] || 0) + 1 // Increment the count of the Ascension Reclaimer in the crafting inventory
              }));

              // Only select from automation store items
              const automationHelpers = [
                'Auto Clicker Bot'
              ];

              // Randomly select a helper from the automationHelpers array
              const randomHelper = automationHelpers[Math.floor(Math.random() * automationHelpers.length)];
              // Update the state to keep track of the selected helper
              setPreservedHelper(randomHelper);
              // Store the selected helper in local storage
              localStorage.setItem('preservedHelper', randomHelper);


              setNotifications(prev => [...prev, `Ascension Reclaimer purchased! ${randomHelper} will be preserved after prestige.`]);
              window.dispatchEvent(new CustomEvent('nextNews', { 
                detail: { message: `Energy shield activated: ${randomHelper} locked in for preservation.` }
              }));
            }
          }}
          onBack={() => setActiveStore(null)}
        />
      )}
      {beaconCount > 0 && showBeaconVisual && (
        <div className="shard-beacon">
          <div className="beacon-rays"></div>
          <div className="beacon-top"></div>
          <div className="beacon-tower">
            <div className="beacon-glow"></div>
          </div>
          <div className="beacon-base"></div>
        </div>
      )}
      {activeStore === 'inventory' && showInventory && (
        <ItemInventory
          craftingInventory={craftingInventory}
          onBack={() => setActiveStore(null)}
        />
      )}
      <Clicker 
        collectJunk={collectJunk} 
        collectTronics={collectTronics}
        electronicsUnlock={electronicsUnlock}
      />
      {showClickEnhancerUI && clickEnhancerLevel > 0 && <ClickEnhancerEffect level={clickEnhancerLevel} />}
      {ownedItems.scrapDrone > 0 && <DroneEffect numDrones={ownedItems.scrapDrone} />}
      {craftingInventory['Hover Drone'] && <HoverDroneEffect />}
      <Notifications notifications={notifications} />
      {showCheatMenu && (
        <CheatMenu 
          onReset={handleReset}
          onAddJunk={(amount) => setJunk(prev => prev + amount)}
          onClose={() => setShowCheatMenu(false)}
          onResetTutorial={() => setTutorialStage(0)}
          onNextTutorial={() => setTutorialStage(prev => prev + 1)}
          setShowTrashBonus={setShowTrashBonus}
        />
      )}
      {showActiveCheats && (
        <ActiveCheats
          cheats={activeCheatsList}
          onToggleCheat={(cheatName) => setActiveCheatsList(prev => ({
            ...prev,
            [cheatName]: !prev[cheatName]
          }))}
          onClose={() => setShowActiveCheats(false)}
        />
      )}
      {showChangelog && (
        <Changelog onClose={() => setShowChangelog(false)} />
      )}
      {showTechTree && (
        <TechTree 
          prestigeTokens={craftingInventory['Prestige Token'] || 0}
          onClose={() => setShowTechTree(false)}
          onUnlock={(nodeId) => {
            if (nodeId === 'tronicsClicker') {
              setCraftingInventory(prev => ({
                ...prev,
                'Prestige Token': prev['Prestige Token'] - 1
              }));
              setElectronicsUnlock(true);
              setNotifications(prev => [...prev, "Tronics Clicker Unlocked!"]);
            }
          }}
          onClose={() => setShowTechTree(false)}
        />
      )}
      {showSettings && (
        <div className="store-container settings-menu">
          <div className="settings-header">
            <h2>Settings</h2>
            <button onClick={() => setShowSettings(false)}>Close</button>
          </div>
          <div className="settings-options">
            <div className="stats-section">
              <h3>Stats</h3>
              <p>Total Clicks: {clickCount.toLocaleString()}</p>
              <p>Average JPS: {Math.floor((passiveIncome * globalJpsMultiplier) + (autoClicks * clickMultiplier)).toLocaleString()}</p>
              <p>Global JPS Multiplier: {(1 + (globalJpsMultiplier - 1) + (craftingInventory['Compression Pack'] ? 0.25 : 0)).toFixed(2)}x</p>
              <p>Trash Surges Completed: {surgeCount.toLocaleString()}</p>
            </div>
            {preservedHelper && (
              <div className="stats-section">
                <h3>Energy Shielded Helpers</h3>
                <p>{preservedHelper} (Protected from Ascension)</p>
              </div>
            )}
            <label className="setting-option">
              <span>Show Click Enhancer Effect</span>
              <input
                type="checkbox"
                checked={showClickEnhancerUI}
                onChange={() => setShowClickEnhancerUI(prev => !prev)}
              />
            </label>
            <label className="setting-option">
              <span>Max Click Enhancers</span>
              <input
                type="number"
                min="1"
                max="10"
                value={localStorage.getItem('maxClickEnhancers') || 3}
                onChange={(e) => localStorage.setItem('maxClickEnhancers', e.target.value)}
              />
            </label>
            <label className="setting-option">
              <span>Show Drones</span>
              <input
                type="checkbox"
                checked={localStorage.getItem('showDrones') !== 'false'}
                onChange={(e) => localStorage.setItem('showDrones', e.target.checked)}
              />
            </label>
            <label className="setting-option">
              <span>Max Visible Drones</span>
              <input
                type="number"
                min="1"
                max="20"
                value={localStorage.getItem('maxVisibleDrones') || 10}
                onChange={(e) => localStorage.setItem('maxVisibleDrones', e.target.value)}
              />
            </label>
            <label className="setting-option">
              <span>Show News Ticker</span>
              <input
                type="checkbox"
                checked={showNewsTicker}
                onChange={(e) => {
                  setShowNewsTicker(e.target.checked);
                  localStorage.setItem('showNewsTicker', e.target.checked);
                }}
              />
            </label>
            <label className="setting-option">
              <span>Show Shard Beacon</span>
              <input
                type="checkbox"
                checked={showBeaconVisual}
                onChange={(e) => {
                  setShowBeaconVisual(e.target.checked);
                  localStorage.setItem('showBeaconVisual', e.target.checked);
                }}
              />
            </label>
            {(craftingInventory['Prestige Token'] > 0 || localStorage.getItem('prestigeUnlocked') === 'true') && (
              <button 
                onClick={() => setShowTechTree(true)}
                style={{marginBottom: '20px', width: '100%'}}
              >
                Open Tech Tree
              </button>
            )}
            <div className="reset-section">
              <h3>Reset Progress</h3>
              <p className="reset-warning">Warning: This will permanently delete all your progress!</p>
              <button 
                className="reset-button" 
                onClick={() => {
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
                    localStorage.clear();
                    localStorage.setItem('achievements', JSON.stringify(defaultAchievements));
                    localStorage.setItem('globalJpsMultiplier', '1');
                    setGlobalJpsMultiplier(1);
                    handleReset('all');
                    window.location.reload();
                  }
                }}
              >
                Reset All Progress
              </button>
            </div>
          </div>
        </div>
      )}
      <Notifications notifications={notifications} />
      {showTrashBonus && (
        <TrashBonus
          passiveIncome={passiveIncome}
          onCollect={() => {
            const bonus = Math.floor((passiveIncome * globalJpsMultiplier + (autoClicks * clickMultiplier)) * 11.87);
            setJunk(prev => prev + bonus);
            setShowTrashBonus(false);
            setNotifications(prev => [...prev, `Collected ${bonus.toLocaleString()} bonus junk!`]);
          }}
          onDisappear={() => {
            setShowTrashBonus(false);
            setNotifications(prev => [...prev, "Trash bonus crashed and disappeared!"]);
          }}
        />
      )}
      {((craftingInventory['Prestige Crystal'] >= 1) || localStorage.getItem('prestigeUnlocked') === 'true') && (
        <button 
          className={`prestige-button ${localStorage.getItem('prestigeUnlocked') !== 'true' ? 'locked' : ''}`}
          onClick={() => {
            if (localStorage.getItem('prestigeUnlocked') === 'true') {
              if (window.confirm('Are you sure you want to prestige? This will reset your progress but grant you 1 Prestige Token.')) {
                // Add Prestige Token
                setCraftingInventory(prev => ({
                  ...prev,
                  'Prestige Token': (prev['Prestige Token'] || 0) + 1
                }));
                
                // Reset progress
                setJunk(0);
                setClickMultiplier(1);
                setPassiveIncome(0);
                setAutoClicks(0);
                setClickEnhancerLevel(0);
                
                // Reset costs
                setItemCosts({
                  trashBag: 10,
                  trashPicker: 100,
                  streetrat: 100,
                  cart: 500,
                  junkMagnet: 1500,
                  clickEnhancer: 2500,
                  urbanRecycler: 3000,
                  autoClicker: 5000,
                  scrapDrone: 7500,
                  holoBillboard: 15000
                });
                
                // Reset owned items except preserved ones
                const resetOwnedItems = {
                  trashBag: 0,
                  trashPicker: 0,
                  streetrat: 0,
                  cart: 0,
                  junkMagnet: 0,
                  urbanRecycler: 0,
                  clickEnhancer: 0,
                  scrapDrone: 0,
                  holoBillboard: 0
                };
                setOwnedItems(resetOwnedItems);
                
                // Show notification
                setNotifications(prev => [...prev, "Prestige complete! Gained 1 Prestige Token"]);
                
                // Open Tech Tree
                setShowTechTree(true);
              }
            }
          }}
        >
          Prestige
        </button>
      )}
    </main>
  );
}