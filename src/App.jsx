import React, { useState, useEffect } from 'react';
import './App.css';
import VersionPopup from './components/VersionPopup/VersionPopup';
import StatsDisplay from './components/StatsDisplay';
import { validateQuests } from './utils/questValidation';
import { useGameState } from './hooks/useGameState';
import { useAchievements, defaultAchievements } from './hooks/useAchievements';
import Clicker from './components/Clicker/Clicker';
import Achievements from './components/Achievements';
import CheatMenu from './components/CheatMenu/CheatMenu';
import Store from './components/StoreSystem/Store';
import ElectroStore from './components/StoreSystem/ElectroStore';
import CredStore from './components/StoreSystem/CredStore';
import AutomationStore from './components/StoreSystem/AutomationStore';
import MenuButtons from './components/StoreSystem/MenuButtons';
import NewsContainer from './components/NewsContainer';
import TrashSurge from './components/Effects/TrashSurge';
import Notifications from './components/Notifications';
import TutorialSystem from './components/TutorialSystem';
import QuestLog from './components/SideMenu/QuestLog';
import SlotMachine from './components/SideMenu/SlotMachine';
import ClickEnhancerEffect from './components/Effects/ClickEnhancerEffect';
import DroneEffect from './components/Effects/DroneEffect';
import HoverDroneEffect from './components/Effects/HoverDroneEffect';
import AutoClickerEffect from './components/Effects/AutoClickerEffect';
import Menu from './components/SideMenu/Menu';
import Settings from './components/Settings';
import CraftingStore from './components/StoreSystem/CraftingStore';
import Marketplace from './components/SideMenu/Marketplace';
import ActiveCheats from './components/CheatMenu/ActiveCheats';
import FlyingCrystal from './components/Effects/FlyingCrystal';
import HoloBillboard from './components/Effects/HoloBillboard';
import TrashBonus from './components/Effects/TrashBonus';
import ItemInventory from './components/StoreSystem/ItemInventory';
import Changelog from './components/SideMenu/Changelog';
import TechTree from './components/TechTree';
import PrestigePopup from './components/PrestigePopup';
import UpgradeStats from './components/StoreSystem/UpgradeStats';
import Tooltips from './components/SideMenu/Tooltips';
import ShardMiner from './components/Effects/ShardMiner';
import TronicsSurge from './components/Effects/TronicsSurge';

export default function App() {
  const { 
    junk, setJunk,
    credits, setCredits,
    clickCount, setClickCount,
    tronics, setTronics,
    autoClicks, setAutoClicks,
    clickMultiplier, setClickMultiplier,
    passiveIncome, setPassiveIncome,
    globalJpsMultiplier, setGlobalJpsMultiplier,
    notifications, setNotifications,
    electronicsUnlock, setElectronicsUnlock,
    activeStore, setActiveStore,
    menuOpen, setMenuOpen,
    clickEnhancerLevel, setClickEnhancerLevel,
    tutorialStage, setTutorialStage,
    hasUpgrade, setHasUpgrade,
    showPrestigePopup, setShowPrestigePopup,
    prestigeCount, setPrestigeCount,
    electroShards, setElectroShards,
    beaconCount, setBeaconCount,
    showBeacon, setShowBeacon,
    showBeaconVisual, setShowBeaconVisual,
    isSurgeActive, setIsSurgeActive,
    hasFoundCapacitorThisSurge, setHasFoundCapacitorThisSurge,
    surgeCount, setSurgeCount,
    cogfatherLore, setCogfatherLore,
    preservedHelper, setPreservedHelper,
    setTronicsSurgeActive, isTronicsSurgeActive
  } = useGameState();
  const [showChangelog, setShowChangelog] = useState(false);
  const [showTechTree, setShowTechTree] = useState(false);
  const [showSlotMachine, setShowSlotMachine] = useState(false);
  const [enableHoloBillboard, setEnableHoloBillboard] = useState(() => localStorage.getItem('enableHoloBillboard') !== 'false');
  const [showCheatMenu, setShowCheatMenu] = useState(false);
  const [showCrystal, setShowCrystal] = useState(false);
  const [showTrashBonus, setShowTrashBonus] = useState(false);
  const [showActiveCheats, setShowActiveCheats] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showUpgradeStats, setShowUpgradeStats] = useState(false);
  const [skillLevels, setSkillLevels] = useState(() => {
    const saved = localStorage.getItem('skillLevels');
    return saved ? JSON.parse(saved) : {
      scavengingFocus: 0,
      greaseDiscipline: 0
    };
  });
  const [showQuestLog, setShowQuestLog] = useState(false);
  const [showClickEnhancerUI, setShowClickEnhancerUI] = useState(true);
  const [showNewsTicker, setShowNewsTicker] = useState(() => localStorage.getItem('showNewsTicker') !== 'false');
  const [prestigeQuestCompleted, setPrestigeQuestCompleted] = useState(() => 
    localStorage.getItem('quest_sync_Forge the Future') === 'true'
  );
  const [craftingInventory, setCraftingInventory] = useState(() => 
    JSON.parse(localStorage.getItem('craftingInventory')) || {}
  );
  const [autoClickerV1Count, setAutoClickerV1Count] = useState(0);
  const [autoClickerV2Count, setAutoClickerV2Count] = useState(0);
  const [showTooltips, setShowTooltips] = useState(false); // Added state for Tooltips

  useEffect(() => {
    const handleUpdateSurgeCount = () => {
      setSurgeCount(3);
    };

    window.addEventListener('updateSurgeCount', handleUpdateSurgeCount);

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

  const { achievements, setAchievements, validateAchievements, checkElectroMilestones } = useAchievements(
    { 
      junk, 
      clickCount, 
      passiveIncome, 
      globalJpsMultiplier, 
      autoClicks, 
      clickMultiplier,
      isSurgeActive,
      cogfatherLore 
    },
    setJunk,
    setClickMultiplier,
    setAutoClicks,
    setPassiveIncome,
    setNotifications,
    setCogfatherLore
  );

  const checkAchievements = validateAchievements;

  const checkShardMilestones = (shardCount) => {
    // Check for 3 shard milestone
    if (shardCount === 3) {
      window.dispatchEvent(new CustomEvent('nextNews', { 
        detail: { message: "Cogfather: The circuit is almost loud enough to listen to." }
      }));
    }
  };


  const [hasHelper, setHasHelper] = useState(false);
  const [showInventory, setShowInventory] = useState(false);


  // Close store when opening other menus
  useEffect(() => {
    const handleUpgradeStats = () => {
      setShowUpgradeStats(prev => {
        if (!prev) {
          setActiveStore(null);
          setShowSlotMachine(false);
          setShowAchievements(false);
          setShowSettings(false);
          setShowQuestLog(false);
          setShowTooltips(false); // Added setShowTooltips
        }
        return !prev;
      });
    };
    window.addEventListener('toggleUpgradeStats', handleUpgradeStats);

    if (showSlotMachine || showAchievements || showSettings || showQuestLog || showTooltips) { // Added showTooltips
      setActiveStore(null);
      setShowUpgradeStats(false);
    }

    return () => window.removeEventListener('toggleUpgradeStats', handleUpgradeStats);
  }, [showSlotMachine, showAchievements, showSettings, showQuestLog, showTooltips]); // Added showTooltips


  // Close upgrade stats when opening a store
  useEffect(() => {
    if (activeStore) {
      setShowUpgradeStats(false);
    }
  }, [activeStore]);

  useEffect(() => {
    const maxBeacons = Math.min(10, beaconCount); // Cap at 10 beacons
    const hasBeaconCore = localStorage.getItem('beacon_core_purchased') === 'true';
    const beaconBaseReduction = hasBeaconCore ? 0.25 : 0; // 25% base reduction if core is purchased
    const beaconStackReduction = maxBeacons * 0.01; // 1% per beacon
    const totalReduction = Math.min(0.9, beaconBaseReduction + beaconStackReduction); // Cap at 90% reduction
    const beaconMultiplier = 1 - totalReduction;
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
      const isTronicsSurgeUnlocked = localStorage.getItem('electro_surge_node_purchased') === 'true';

      // 50/50 chance between trash and tronics surge if unlocked
      const randomVal = Math.random();
      console.log("Number is: " + randomVal);
      const isTronicsSurge = isTronicsSurgeUnlocked; //&& randomVal < 0.5
      console.log("Is Tronics Surge: " + isTronicsSurge);

      if (isTronicsSurge) {
        console.log("Triggering Tronics Surge");
        setTronicsSurgeActive(true);
        setTimeout(() => {
          setTronicsSurgeActive(false);
          setSurgeCount(prev => {
            const newCount = prev + 1;
            localStorage.setItem('surgeCount', newCount);
            return newCount;
          });
        }, parseInt(localStorage.getItem('surge_duration_bonus') || '5') * 1000);
      } else {
        console.log("Triggering Trash Surge");
        setIsSurgeActive(true);
        setHasFoundCapacitorThisSurge(false);
        localStorage.setItem('hadFirstSurge', 'true');

        const surgeDurationBonus = isTronicsSurgeUnlocked ? parseInt(localStorage.getItem('surge_duration_bonus') || '5') : 0;
        const surgeDuration = craftingInventory['Surge Capacitor Module'] ? 10000 : 5000 + (surgeDurationBonus * 1000);

        setTimeout(() => {
          setIsSurgeActive(false);
          setHasFoundCapacitorThisSurge(false);
          setSurgeCount(prev => {
            const newCount = prev + 1;
            localStorage.setItem('surgeCount', newCount);
            return newCount;
          });
        }, surgeDuration);
      }
    };

    const handleTriggerSurge = () => startSurge();
    window.addEventListener('triggerSurge', handleTriggerSurge);

    const interval = setInterval(() => {
      if (!isSurgeActive && Math.random() < 0.5) startSurge();
    }, 240000 + Math.random() * 240000);

    return () => {
      clearInterval(interval);
      window.removeEventListener('triggerSurge', handleTriggerSurge);
    };
  }, []);


  const [creditStoreItems, setCreditStoreItems] = useState(() => JSON.parse(localStorage.getItem('creditStoreItems')) || {
    'Hover Drone': false,
    'Crafting Booster Unit': false,
    'Ascension Reclaimer': 0
  });

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
    scrapDrone: 7500,
    holoBillboard: 15000,
    junkRefinery: 500000
  });

  const [ownedItems, setOwnedItems] = useState(() => JSON.parse(localStorage.getItem('ownedItems')) || {
    trashBag: 0,
    trashPicker: 0,
    streetrat: 0,
    cart: 0,
    junkMagnet: 0,
    urbanRecycler: 0,
    clickEnhancer: 0,
    scrapDrone: 0,
    holoBillboard: 0,
    junkRefinery: 0
  });

  useEffect(() => {
    const updateInterval = setInterval(() => {
      const skillLevels = JSON.parse(localStorage.getItem('skillLevels')) || { greaseDiscipline: 0 };
      const greaseDisciplineBonus = skillLevels.greaseDiscipline * 0.5 / 100;
      const circuitOptCount = parseInt(localStorage.getItem('circuit_optimization_count') || '0');
      const circuitOptBonus = circuitOptCount * 0.25;
      const holoBillboardBonus = (ownedItems.holoBillboard || 0) * 0.1;
      const totalMultiplier = 1 + circuitOptBonus + (craftingInventory['Compression Pack'] ? 0.25 : 0) + greaseDisciplineBonus + holoBillboardBonus;
      setGlobalJpsMultiplier(totalMultiplier);

      // Only add passive income, not clicking
      if (passiveIncome > 0) {
        setJunk(prev => prev + (passiveIncome * totalMultiplier));
      }

      // Handle auto clicks separately
      if (autoClicks > 0) {
        setJunk(prev => prev + (autoClicks * clickMultiplier));
        
        // Generate tronics if electronics are unlocked
        if (electronicsUnlock) {
          const boostICount = parseInt(localStorage.getItem('tronics_boost_count') || '0');
          const boostIICount = parseInt(localStorage.getItem('tronics_boost_II_count') || '0');
          const tronicsPerClick = 1 + boostICount + (boostIICount * 2);
          setTronics(prev => prev + (autoClicks * tronicsPerClick));
        }
      }
    }, 1000);

    return () => clearInterval(updateInterval);
  }, [passiveIncome, autoClicks, clickMultiplier, globalJpsMultiplier, craftingInventory]);

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
    localStorage.setItem('autoClickerV1Count', autoClickerV1Count); //Persist v1 count
  }, [credits, junk, electronicsUnlock, clickMultiplier, passiveIncome, itemCosts, autoClicks, clickCount, achievements, ownedItems, clickEnhancerLevel, globalJpsMultiplier, autoClickerV1Count]);

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

    // Use the separated quest validation
    validateQuests({
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
      setCraftingInventory
    });
  };

  const collectJunk = () => {
    const surgeMultiplier = isSurgeActive ? 2 : 1;
    const scavengingBonus = 1 + (skillLevels.scavengingFocus / 100);
    setJunk(prev => prev + (clickMultiplier * surgeMultiplier * scavengingBonus));

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


  const collectTronics = (amount) => {
    if (electronicsUnlock) {
      // Update total tronics clicks
      setTotalTronicsClicks(prev => prev + 1);
      
      // Handle manual clicks
      if (amount === 1) {
        setManualTronicsClicks(prev => prev + 1);
      }

      const hasQuantumTap = localStorage.getItem('quantum_tap_purchased') === 'true';
      const randomValue = Math.random();
      const quantumProc = hasQuantumTap && randomValue < 0.03;

      setTronics(prev => {
        const newValue = prev + (quantumProc ? amount * 3 : amount);
        localStorage.setItem('tronics', newValue);
        return newValue;
      });

      if (quantumProc) {
        setNotifications(prev => [...prev, "Quantum Tap triggered! 3x Tronics gained!"]);
      }
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
        window.dispatchEvent(new CustomEvent('addNews', {
          detail: { message: "Automated helper deployed. Don't expect it to take breaks." }
        }));
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

  useEffect(() => {
    localStorage.setItem('tutorialStage', tutorialStage);
    validateQuestsAndAchievements();

    // Check for 1M junk milestone
    if (junk >= 1000000) {
      if (!localStorage.getItem('shown_questlog_hint')) {
        localStorage.setItem('shown_questlog_hint', 'true');

        // Add pulsing animation class to both quest log buttons
        const questLogBtn = document.querySelector('.quest-log-toggle');
        const mainQuestLog = document.querySelector('.quest-log');
        if (questLogBtn) questLogBtn.classList.add('quest-log-attention');
        if (mainQuestLog) mainQuestLog.classList.add('quest-log-attention');

        // Add Cogfather popup message
        const cogfatherMessage = (
          <div className="cogfather-message-popup">
            <img src="Icons/NPCs/Cogfather.jfif" alt="Cogfather" />
            <p>A million pieces of junk? Now that's what I call a beautiful mess. Check your quest log, kid - you're ready for bigger things.</p>
            <button onClick={() => {
              setShowQuestLog(true);
              setNotifications(prev => prev.filter(n => typeof n !== 'object'));
            }}>Open Quest Log</button>
          </div>
        );
        setNotifications(prev => [...prev, cogfatherMessage]);
      }
    }
  }, [tutorialStage, junk]);

  // Validate on major game events
  useEffect(() => {
    validateQuestsAndAchievements();
  }, [passiveIncome, ownedItems.streetrat, clickMultiplier, globalJpsMultiplier]);

  useEffect(() => {
    const onetimeItems = ['Click Rig Mk I', 'Auto Toolkit', 'Compression Pack', 'Reinforced Backpack', 'Surge Capacitor Module'];
    const hasCraftedOneTime = onetimeItems.some(item => (craftingInventory[item] || 0) > 0);
    setShowInventory(hasCraftedOneTime);
  }, [craftingInventory]);


  const handleBuyJunkRefinery = () => {
    if (junk >= (itemCosts.junkRefinery || 500000)) {
      setJunk(prev => prev - (itemCosts.junkRefinery || 500000));
      setPassiveIncome(prev => prev + 50);
      setOwnedItems(prev => ({...prev, junkRefinery: (prev.junkRefinery || 0) + 1}));
      setItemCosts(prev => ({...prev, junkRefinery: Math.floor((prev.junkRefinery || 500000) * 1.2)}));
      setNotifications(prev => [...prev, "Junk Refinery purchased! +50 Junk/sec"]);

      if (!ownedItems.junkRefinery) {
        window.dispatchEvent(new CustomEvent('nextNews', { 
          detail: { message: "Cogfather: A Refinery? Now you're thinking industrial scale." }
        }));
      }
    }
  };

  // Update prestige state when quest completes
  useEffect(() => {
    if (localStorage.getItem('quest_sync_Forge the Future') === 'true' || 
        (craftingInventory && craftingInventory['Prestige Crystal'] >= 1)) {
      setPrestigeQuestCompleted(true);
    }
  }, [craftingInventory]);

  return (
    <main>
      <VersionPopup onClose={() => {}} />
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
      <TrashSurge isActive={isSurgeActive} activeClicker={document.querySelector('.clicker-select.active')?.textContent.includes('Trash') ? 'trash' : 'electronics'} />


       <TronicsSurge isActive={isTronicsSurgeActive} activeClicker={document.querySelector('.clicker-select.active')?.textContent.includes('Trash') ? 'trash' : 'electronics'} />

      {enableHoloBillboard && <HoloBillboard ownedItems={ownedItems} />}
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
      <StatsDisplay 
        credits={credits}
        junk={junk}
        passiveIncome={passiveIncome}
        autoClicks={autoClicks}
        clickMultiplier={clickMultiplier}
        globalJpsMultiplier={globalJpsMultiplier}
        tronics={tronics}
        electroShards={electroShards}
        autoClickerV1Count={autoClickerV1Count} // Pass to StatsDisplay
      />
      <Menu onStoreSelect={(type) => {
        switch(type) {
          case 'marketplace':
            setActiveStore(prev => prev === 'marketplace' ? null : 'marketplace');
            break;
          case 'achievements':
            setShowAchievements(prev => !prev);
            break;
          case 'questLog':
            setShowQuestLog(prev => {
              const questLogBtn = document.querySelector('.quest-log-toggle');
              const mainQuestLog = document.querySelector('.quest-log');
              if (questLogBtn) {
                questLogBtn.classList.remove('quest-log-attention');
              }
              if (mainQuestLog) {
                mainQuestLog.classList.remove('quest-log-attention');
              }
              return !prev;
            });
            break;
          case 'slotMachine':
            setShowSlotMachine(prev => !prev);
            break;
          case 'settings':
            setShowSettings(prev => !prev);
            break;
          case 'techTree':
            setShowTechTree(prev => !prev);
            break;
          case 'changelog':
            setShowChangelog(prev => !prev);
            break;
          case 'tooltips':
            setShowTooltips(prev => !prev);
            break;
          case 'upgradeStats':
            setShowUpgradeStats(prev => !prev);
            break;
        }
      }} />
      {showTooltips && <Tooltips onClose={() => setShowTooltips(false)} />}
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
          top: localStorage.getItem('sidebarTop') || '250px',
          bottom: 'auto'
        }}
        onMouseDown={(e) => {
          if (localStorage.getItem('sidebarLocked') === 'true' || e.target.className === 'lock-button') return;

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
            const newLocked = !isLocked;
            localStorage.setItem('sidebarLocked', newLocked);
            document.querySelector('.sidebar').classList.toggle('locked');
            // Force a re-render by toggling a class
            document.querySelector('.sidebar').classList.toggle('temp');
            setTimeout(() => document.querySelector('.sidebar').classList.toggle('temp'), 0);
          }}
        >
          {localStorage.getItem('sidebarLocked') === 'true' ? '🔒' : '🔓'}
        </button>
        <MenuButtons 
          onStoreSelect={(store) => {
            setActiveStore(store);
            localStorage.setItem('activeStore', store);
          }}
          showInventory={showInventory}
          onUpgradeStats={() => setShowUpgradeStats(true)}
        />
      </div>
      {showUpgradeStats && (
        <UpgradeStats
          onClose={() => setShowUpgradeStats(false)}
        />
      )}
      {activeStore === 'store' && (
        <Store 
          credits={junk}
          itemCosts={itemCosts}
          ownedItems={ownedItems}
          craftingInventory={craftingInventory}
          onBuyTrashBag={handleBuyTrashBag}
          onBuyPicker={handleBuyPicker}
          onBuyStreetrat={handleBuyStreetrat}
          onBuyShardMiner={() => {
            const cost = 10000000;
            if (junk >= cost && craftingInventory['Scrap Core'] >= 5 && !ownedItems.shardMiner) {
              setJunk(prev => prev - cost);
              setCraftingInventory(prev => ({
                ...prev,
                'Scrap Core': prev['Scrap Core'] - 5
              }));
              setOwnedItems(prev => ({...prev, shardMiner: 1}));
              setNotifications(prev => [...prev, "Shard Miner purchased!"]);
              window.dispatchEvent(new CustomEvent('nextNews', { 
                detail: { message: "A new frequency resonates through your junkyard..." }
              }));
            }
          }}
          onBuyCart={handleBuyCart}
          onBuyJunkMagnet={handleBuyJunkMagnet}
          onBuyUrbanRecycler={handleBuyUrbanRecycler}
          onBuyScrapDrone={handleBuyScrapDrone}
          onBuyHoloBillboard={handleBuyHoloBillboard} 
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
          onBack={() => {
            setActiveStore(null);
            localStorage.setItem('activeStore', null);
          }}
          onBuyJunkRefinery={handleBuyJunkRefinery}
        />
      )}
      {activeStore === 'marketplace' && (
        <Marketplace 
          onClose={() => {
            setActiveStore(null);
            localStorage.setItem('activeStore', null);
          }}
          junk={junk}
          passiveIncome={passiveIncome}
          cogfatherLore={cogfatherLore}
        />
      )}
      {activeStore === 'electrostore' && (
        <ElectroStore 
          onRemoveElectroShard={(amount) => setElectroShards(prev => prev - amount)}
          electroShards={electroShards}
          tronics={tronics}
          setTronics={setTronics}
          setNotifications={setNotifications}
          onBuyQuantumTap={() => {
            if (tronics >= 1250) {
              setTronics(prev => prev - 1250);
              setNotifications(prev => [...prev, "Quantum Tap Circuit installed! You now have a 3% chance to get 3x Tronics per click."]);
            }
          }}
          onBuyTronicsBoost={() => {
            const isUnlocked = localStorage.getItem('unlocked_tronics_boost') === 'true';
            if (!isUnlocked && electroShards >= 3) {
              setElectroShards(prev => {
                const newValue = prev - 3;
                localStorage.setItem('electroShards', newValue.toString());
                return newValue;
              });
              setNotifications(prev => [...prev, "Tronics Click Boost I unlocked!"]);
            } else if (isUnlocked && tronics >= 250) {
              setClickMultiplier(prev => prev + 1);
              const newBoostCount = (parseInt(localStorage.getItem('tronics_boost_count') || '0') + 1);
              localStorage.setItem('tronics_boost_count', newBoostCount);

              // Update cost
              const currentCost = parseInt(localStorage.getItem('tronics_boost_cost') || '250');
              const newCost = Math.floor(currentCost * 1.1);
              localStorage.setItem('tronics_boost_cost', newCost);
              setTronics(prev => prev - currentCost);

              setNotifications(prev => [...prev, "Tronics Click Boost I purchased! +1 Tronics per click"]);
            }
          }}
          onBack={() => {
            setActiveStore(null);
            localStorage.setItem('activeStore', null);
          }}
        />
      )}
      {activeStore === 'automation' && (
        <AutomationStore
          junk={junk}
          itemCosts={itemCosts}
          autoClicks={autoClicks}
          autoClickerV1Count={autoClickerV1Count}
          autoClickerV2Count={autoClickerV2Count}
          onBuyAutoClicker={() => {
            if (junk >= itemCosts.autoClicker) {
              setJunk(prev => prev - itemCosts.autoClicker);
              setAutoClicks(prev => prev + 1);
              setAutoClickerV1Count(prev => prev + 1); //Increment v1 count
              setItemCosts(prev => ({...prev, autoClicker: Math.floor(prev.autoClicker * 1.15)}));
              setNotifications(prev => [...prev, "Auto Clicker Bot purchased!"]);
              window.dispatchEvent(new CustomEvent('nextNews', { 
                detail: { message: "Cogfather whispers: 'Sit back, kid. Let the bots handle it from here.'" }
              }));
            }
          }}
          onBuyAutoClickerV2={() => {
            const baseV2Cost = 10000;
            const currentCost = itemCosts.autoClickerV2 || baseV2Cost;

            if (junk >= currentCost && autoClickerV1Count >= 1) { // Check v1 count
              setJunk(prev => prev - currentCost);
              setAutoClicks(prev => prev + 1); // Add v2 bot (worth 2 clicks/sec)
              setAutoClickerV1Count(prev => prev - 1); //Decrement v1 count
              setAutoClickerV2Count(prev => prev + 1); // Increment v2 count
              setItemCosts(prev => ({
                ...prev, 
                autoClickerV2: Math.floor((prev.autoClickerV2 || baseV2Cost) * 1.2)
              }));
              setNotifications(prev => [...prev, "Auto Clicker Bot v2.0 purchased! (Consumed 1 Auto Clicker Bot)"]);
              window.dispatchEvent(new CustomEvent('nextNews', { 
                detail: { message: "Cogfather: 'Twice the clicks, twice the profits. Now that's efficiency!'" }
              }));
            }
          }}
          onBack={() => {
            setActiveStore(null);
            localStorage.setItem('activeStore', null);
          }}
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
                      if (key !== 'clickEnhancer') { 
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
          onBack={() => {
            setActiveStore(null);
            localStorage.setItem('activeStore', null);
          }}
        />
      )}
      {activeStore === 'credstore' && (
        <CredStore
          junk={junk}
          credits={credits}
          autoClicks={autoClicks}
          onSetJunk={setJunk}
          onSetCredits={setCredits}
          onSetNotification={setNotifications}
          onSetBeaconCount={setBeaconCount}
          onSetShowBeacon={setShowBeacon}
          craftingInventory={craftingInventory}
          creditStoreItems={creditStoreItems}
          onSetCreditStoreItems={setCreditStoreItems}
          onSetShowCrystal={setShowCrystal}
          onSetCraftingInventory={setCraftingInventory}
          onSetPreservedHelper= {setPreservedHelper}
          onBack={() => {
            setActiveStore(null);
            localStorage.setItem('activeStore', null);
          }}
        />
      )}
      {beaconCount > 0 && showBeaconVisual && (
        <div className={`shard-beacon ${localStorage.getItem('beacon_core_purchased') === 'true' ? 'core-active' : ''}`}>
          <div className="beacon-rays"></div>
          <div className="beacon-rays"></div>
          <div className="beacon-top"></div>
          <div className="beacon-tower">
            <div className="beacon-glow"></div>
            {localStorage.getItem('beacon_core_purchased') === 'true' && (
              <div className="core-container">
                <div className="core-pulse"></div>
              </div>
            )}
          </div>
          <div className="beacon-base"></div>
        </div>
      )}
      {activeStore === 'inventory' && showInventory && (
        <ItemInventory
          craftingInventory={craftingInventory}
          onBack={() => {
            setActiveStore(null);
            localStorage.setItem('activeStore', null);
          }}
        />
      )}
      <Clicker 
        collectJunk={collectJunk} 
        collectTronics={collectTronics}
        electronicsUnlock={electronicsUnlock}
      />
      {showClickEnhancerUI && clickEnhancerLevel > 0 && <ClickEnhancerEffect level={clickEnhancerLevel} />}
      {autoClicks > 0 && <AutoClickerEffect autoClicks={autoClicks} />}
      {ownedItems.scrapDrone > 0 && <DroneEffect numDrones={ownedItems.scrapDrone} />}
      {craftingInventory['Hover Drone'] && <HoverDroneEffect />}
      {showCheatMenu && (
        <CheatMenu 
          onReset={() => window.location.reload()}
          onAddJunk={(amount) => setJunk(prev => prev + amount)}
          onAddTronics={(amount) => setTronics(prev => prev + amount)}
          onAddSetPrestige={(amount) => setPrestigeCount(amount)}
          onAddElectroShard={(amount) => setElectroShards(prev => prev + amount)}
          onClose={() => setShowCheatMenu(false)}
          onResetTutorial={() => setTutorialStage(0)}
          onNextTutorial={() => setTutorialStage(prev => prev + 1)}
          setShowTrashBonus={setShowTrashBonus}
          onShowCrystal= {setShowCrystal}
          onSetTronicsSurgeActive= {setTronicsSurgeActive}
          onSetSurgeActive={setIsSurgeActive}

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
              localStorage.setItem('hasPrestiged', 'true');
              setNotifications(prev => [...prev, "Tronics Clicker and ElectroShop Unlocked!"]);
            }
          }}
        />
      )}
      {showSettings && (
        <Settings
          showClickEnhancerUI={showClickEnhancerUI}
          setShowClickEnhancerUI={setShowClickEnhancerUI}
          showNewsTicker={showNewsTicker}
          setShowNewsTicker={setShowNewsTicker}
          showBeaconVisual={showBeaconVisual}
          setShowBeaconVisual={setShowBeaconVisual}
          enableHoloBillboard={enableHoloBillboard}
          setEnableHoloBillboard={setEnableHoloBillboard}
          clickCount={clickCount}
          passiveIncome={passiveIncome}
          globalJpsMultiplier={globalJpsMultiplier}
          craftingInventory={craftingInventory}
          surgeCount={surgeCount}
          prestigeCount={prestigeCount}
          preservedHelper={preservedHelper}
          prestigeQuestCompleted={prestigeQuestCompleted}
          setShowTechTree={setShowTechTree}
          onClose={() => setShowSettings(false)}
        />
      )}
      {showUpgradeStats && (
        <UpgradeStats
          onClose={() => setShowUpgradeStats(false)}
        />
      )}
      <Notifications notifications={notifications} />
      {ownedItems.shardMiner && (
        <ShardMiner
          onCollect={(amount) => {
            setElectroShards(prev => {
              const newValue = prev + amount;
              localStorage.setItem('electroShards', newValue);
              return newValue;
            });
            setNotifications(prev => [...prev, `Collected ${amount} Electro Shard${amount > 1 ? 's' : ''}!`]);
          }}
        />
      )}
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
      {(junk >= 1000000 || craftingInventory['Prestige Crystal'] >= 1) && !localStorage.getItem('hasPrestiged') && prestigeCount === 0 && (
        <button 
          className={`prestige-button ${!prestigeQuestCompleted ? 'locked' : ''}`}
          onClick={() => {
            if (prestigeQuestCompleted) {
              setShowPrestigePopup(true);
            }
          }}>
          Prestige
        </button>
      )}
      {showPrestigePopup && (
        <PrestigePopup
          stats={{
            junk,
            clickMultiplier,
            passiveIncome,
            autoClicks,
            clickEnhancerLevel,
            autoClickerV1Count // Add to stats
          }}
          onClose={() => setShowPrestigePopup(false)}
          onConfirm={() => {
            setShowPrestigePopup(false);

            setCraftingInventory(prev => ({
              ...prev,
              'Prestige Token': (prev['Prestige Token'] || 0) + 1
            }));
            setPrestigeCount(prev => {
              const newCount = prev + 1;
              localStorage.setItem('prestigeCount', newCount);
              return newCount;
            });


            // Keep track of preserved helpers before reset
            const preservedHelpersList = preservedHelper ? preservedHelper.split(', ') : [];
            let preservedAutoClicks = 0;

            // Count preserved Auto Clicker Bots
            preservedHelpersList.forEach(helper => {
              if (helper === 'Auto Clicker Bot') preservedAutoClicks++;
            });

            setJunk(0);
            setClickMultiplier(1);
            setPassiveIncome(0);
            setAutoClicks(preservedAutoClicks); // Set preserved auto clickers
            setClickEnhancerLevel(0);
            setAutoClickerV1Count(0); // Reset v1 count on prestige

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
              holoBillboard: 15000,
              junkRefinery: 500000
            });


            const resetOwnedItems = {
              trashBag: 0,
              trashPicker: 0,
              streetrat: 0,
              cart: 0,
              junkMagnet: 0,
              urbanRecycler: 0,
              clickEnhancer: 0,
              scrapDrone: 0,
              holoBillboard: 0,
              junkRefinery: 0
            };
            setOwnedItems(resetOwnedItems);


            setNotifications(prev => [...prev, "Prestige complete! Gained 1 Prestige Token"]);


            localStorage.setItem('hasPrestiged', 'true');


            if (prestigeCount === 0) {
              const cogfatherMessage = (
                <div className="cogfather-message-popup">
                  <img src="Icons/NPCs/Cogfather.jfif" alt="Cogfather" />
                  <p>You scrapped everything… just to prove you could build better. That's the first real upgrade.</p> 
                  <p>You’ve done it, kid. The Tech Tree’s unlocked and it’s permanent. No more looking back. 
                    From here on out, you're building the future out of scrap and sparks.</p>
                  <button onClick={() => {
                    setShowTechTree(true);
                    setNotifications(prev => prev.filter(n => typeof n !== 'object'));
                  }}>Improvement complete...</button>
                </div>
              );
              setNotifications(prev => [...prev, cogfatherMessage]);
            }
          }}
        />
      )}
    </main>
  );
}