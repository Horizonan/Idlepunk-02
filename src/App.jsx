import React, { useState, useEffect } from 'react';
import './App.css';

//import gamehandlers
import {gameHandlers} from './utils/gameHandlers';

// Import StoreMenu
import CraftingStore from './components/StoreSystem/CraftingStore';
import MenuButtons from './components/StoreSystem/MenuButtons';
import UpgradeStats from './components/StoreSystem/UpgradeStats';
import Store from './components/StoreSystem/Store';

//Autoclickers
import AutoClickerEffect from './components/Effects/Automation/AutoClickerEffect';

//Surges
import TrashSurge from './components/Effects/surges/TrashSurge';
import TronicsSurge from './components/Effects/surges/TronicsSurge';

//Side Menu
import QuestLog from './components/SideMenu/QuestLog';
import Achievements from './components/SideMenu/Achievements';
import TechTree from './components/SideMenu/techTree/TechTree';

//Settings Menu
import Settings from './components/SideMenu/settingsMenu/Settings';
import Changelog from './components/SideMenu/settingsMenu/Changelog';

//Utility imports
import { useAchievements} from './hooks/useAchievements';

//Other Imports
import VersionPopup from './components/VersionPopup/VersionPopup';
import StatsDisplay from './components/StatsDisplay';
import { validateQuests } from './utils/questValidation';
import { useGameState } from './hooks/useGameState';
import Clicker from './components/Clicker/Clicker';
import CheatMenu from './components/CheatMenu/CheatMenu';
import ElectroStore from './components/StoreSystem/ElectroStore';
import CredStore from './components/StoreSystem/CredStore';
import NewsContainer from './components/NewsContainer';
import Notifications from './components/Notifications';
import TutorialSystem from './components/TutorialSystem';
import SlotMachine from './components/SideMenu/SlotMachine';
import ClickEnhancerEffect from './components/Effects/ClickEnhancerEffect';
import DroneEffect from './components/Effects/DroneEffect';
import HoverDroneEffect from './components/Effects/HoverDroneEffect';
import Menu from './components/SideMenu/Menu';
import Marketplace from './components/SideMenu/Marketplace';
import ActiveCheats from './components/CheatMenu/ActiveCheats';
import FlyingCrystal from './components/Effects/FlyingCrystal';
import HoloBillboard from './components/Effects/HoloBillboard';
import TrashBonus from './components/Effects/TrashBonus';
import ItemInventory from './components/StoreSystem/ItemInventory';
import PrestigePopup from './components/PrestigePopup';
import Tooltips from './components/SideMenu/Tooltips';
import ShardMiner from './components/Effects/ShardMiner';
import CoinFlip from './components/SideMenu/CoinFlip';
import ScraptagonCombat from './components/Combat/scrapCombat';

//Zustand
import useJunkState from './hooks/useJunkState';

export default function App() {

  const {
    junk,
    setJunk,
    clickMultiplier,
    setClickMultiplier
  } = useJunkState();
  
  const { 
    credits, setCredits, clickCount, setClickCount, tronics, setTronics, autoClicks, setAutoClicks, passiveIncome, 
    setPassiveIncome, globalJpsMultiplier, setGlobalJpsMultiplier, notifications, setNotifications,
    electronicsUnlock, setElectronicsUnlock,  activeStore, setActiveStore, menuOpen, setMenuOpen, clickEnhancerLevel, setClickEnhancerLevel,
    tutorialStage, setTutorialStage, hasUpgrade, setHasUpgrade, showPrestigePopup, setShowPrestigePopup, prestigeCount, setPrestigeCount,
    electroShards, setElectroShards, beaconCount, setBeaconCount, setShowBeacon, showBeaconVisual, setShowBeaconVisual,isSurgeActive, setIsSurgeActive,
    hasFoundCapacitorThisSurge, setHasFoundCapacitorThisSurge, surgeCount, setSurgeCount, cogfatherLore, setCogfatherLore,
    preservedHelper, setPreservedHelper, setTronicsSurgeActive, isTronicsSurgeActive, setTotalTronicsClicks,
    autoClickerV1Count, setAutoClickerV1Count, autoClickerV2Count, setAutoClickerV2Count, showChangelog, setShowChangelog, showTechTree, setShowTechTree, showSlotMachine,
    setShowSlotMachine, showCheatMenu, setShowCheatMenu, showActiveCheats, setShowActiveCheats, showAchievements, setShowAchievements,
    showSettings, setShowSettings, showUpgradeStats, setShowUpgradeStats, enableHoloBillboard, setEnableHoloBillboard,
    showCrystal, setShowCrystal, showTrashBonus, setShowTrashBonus, showQuestLog, setShowQuestLog, showNewsTicker, setShowNewsTicker,
    prestigeQuestCompleted, setPrestigeQuestCompleted, showClickEnhancerUI, setShowClickEnhancerUI, craftingInventory, setCraftingInventory,
    showTooltips, setShowTooltips, hasHelper, setHasHelper, showInventory, setShowInventory, activeCheatsList, setActiveCheatsList,
    itemCosts, setItemCosts, ownedItems, setOwnedItems, skillLevels, uiSettingsCollapsed, setUiSettingsCollapsed, showJunkDrone, setShowJunkDrone,
    bulkBuy, setBulkBuy, showHoverDrone, setShowHoverDrone, showAutoclickers, setShowAutoclickers, enableTrashPickup, setEnableTrashPickup, permanentAutoClicks, setPermanentAutoClicks, showCombat, setShowCombat
  } = useGameState();

  const {
    handleBuyTrashBag, calculate10xPriceJunkClicker: calculate10xPrice01,
    handleBuyPicker, handleBuyClickEnhancer, calculate10xPriceJPS, handleBuyStreetrat,
    handleBuyCart, handleBuyJunkMagnet, handleBuyUrbanRecycler, handleBuyScrapDrone,
    handleBuyHoloBillboard, calculate10xPriceBillBoard: calculate10x02, handleBuyAutoClicker, handleBuyAutoClickerV2, handleBuyJunkRefinery, handleBuyModularScrapper, handleBuyTronicsBoost, handleBuyTronicsBoostII, handleBuyFlowRegulator, handleBuyQuantumTap, handleBuyElectroSurgeNode, handleBuyElectroBeaconCore, handleBuyCircuitOptimization, handleBuyHighFreqTap,
  } = gameHandlers({
    junk,
    tronics,
    electroShards,
    bulkBuy,
    itemCosts,
    setClickEnhancerLevel,
    clickEnhancerLevel,
    autoClickerV1Count,
    ownedItems

  }, {
    setJunk, tronics, setTronics, setNotifications, setClickMultiplier, setItemCosts, setOwnedItems, setHasUpgrade,
    setClickEnhancerLevel,clickEnhancerLevel, setPassiveIncome, setHasHelper, setGlobalJpsMultiplier, setAutoClicks,
    setAutoClickerV1Count, autoClickerV1Count, setAutoClickerV2Count, setElectroShards, setNotifications
  });

  const [showCoinFlip, setShowCoinFlip] = useState(false);
  
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

  const { achievements, validateAchievements, checkElectroMilestones } = useAchievements(
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


    if (shardCount === 3) {
      window.dispatchEvent(new CustomEvent('nextNews', { 
        detail: { message: "Cogfather: The circuit is almost loud enough to listen to." }
      }));
    }
  };

  

  useEffect(() => {
    const handleUpgradeStats = () => {
      setShowUpgradeStats(prev => {
        if (!prev) {
          setActiveStore(null);
          setShowSlotMachine(false);
          setShowAchievements(false);
          setShowSettings(false);
          setShowQuestLog(false);
          setShowTooltips(false); 
          setShowCoinFlip(false);
          setShowCombat(false);
        }
        return !prev;
      });
    };
    window.addEventListener('toggleUpgradeStats', handleUpgradeStats);

    if (showSlotMachine || showAchievements || showSettings || showQuestLog || showTooltips || showCoinFlip || showCombat) {
      setActiveStore(null);
      setShowUpgradeStats(false);
    }

    return () => window.removeEventListener('toggleUpgradeStats', handleUpgradeStats);
  }, [showSlotMachine, showAchievements, showSettings, showQuestLog, showTooltips, showCoinFlip, showCombat]);


  useEffect(() => {
    if (activeStore) {
      setShowUpgradeStats(false);
    }
  }, [activeStore]);

  useEffect(() => {
    const maxBeacons = Math.min(10, beaconCount); 
    const hasBeaconCore = localStorage.getItem('beacon_core_purchased') === 'true';
    const beaconBaseReduction = hasBeaconCore ? 0.25 : 0; 
    const beaconStackReduction = maxBeacons * 0.01; 
    const totalReduction = Math.min(0.9, beaconBaseReduction + beaconStackReduction); 
    const beaconMultiplier = 1 - totalReduction;
    const crystalInterval = setInterval(() => {
      if (Math.random() < 0.5) {
        setShowCrystal(true);
        setShowBeacon(true);
        setTimeout(() => setShowBeacon(false), 3000);
      }
    }, (900000 + Math.random() * 900000) * beaconMultiplier);

    const spawnTrashBonus = () => {
      setShowTrashBonus(true);
      const nextSpawnTime = 120000 + Math.random() * 360000; 
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

      const isTronicsSurge = isTronicsSurgeUnlocked; 

      if (isTronicsSurge) {
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


  useEffect(() => {
    const updateInterval = setInterval(() => {
      console.log(localStorage.getItem('prestige1Unlocked') == "true");
      const skillLevels = JSON.parse(localStorage.getItem('skillLevels')) || { greaseDiscipline: 0 };
      const greaseDisciplineBonus = skillLevels.greaseDiscipline * 0.5 / 100;
      const circuitOptCount = parseInt(localStorage.getItem('circuit_optimization_count') || '0');
      const circuitOptBonus = circuitOptCount * 0.25;
      const holoBillboardBonus = (ownedItems.holoBillboard || 0) * 0.1;
      const totalMultiplier = 1 + circuitOptBonus + (craftingInventory['Compression Pack'] ? 0.25 : 0) + greaseDisciplineBonus + holoBillboardBonus;
      setGlobalJpsMultiplier(totalMultiplier);

      if (passiveIncome > 0) {
        setJunk(prev => prev + (passiveIncome * totalMultiplier));

      }

      if (autoClicks > 0) {
        setJunk(prev => prev + ((autoClicks + permanentAutoClicks)  * clickMultiplier));
        setClickCount(prev => prev + (autoClicks + permanentAutoClicks) );

        if (electronicsUnlock) {
          const boostICount = parseInt(localStorage.getItem('tronics_boost_count') || '0');
          const boostIICount = parseInt(localStorage.getItem('tronics_boost_II_count') || '0');
          const tronicsPerClick = 1 + boostICount + (boostIICount * 2);
          setTronics(prev => prev + ((autoClicks + permanentAutoClicks) * tronicsPerClick));
          setTotalTronicsClicks(prev => prev + (autoClicks + permanentAutoClicks));
        }
      }
    }, 1000);

    return () => clearInterval(updateInterval);
  }, [passiveIncome, autoClicks, clickMultiplier, globalJpsMultiplier, craftingInventory]);

  useEffect(() => {
    localStorage.setItem('craftingInventory', JSON.stringify(craftingInventory));
  }, [craftingInventory]);

  useEffect(() => {
    const totalPassiveIncome = passiveIncome * globalJpsMultiplier + ((autoClicks + permanentAutoClicks) * clickMultiplier);
    if ((totalPassiveIncome >= 100 || junk >= 1000000)) {
      localStorage.setItem('prestigeUnlocked', 'true');
    }
    if ((totalPassiveIncome >= 100 || junk >= 1000000) && !localStorage.getItem('cogfatherEvent')) {
      setNotifications(prev => [...prev, "The Cogfather wants to speak with you about your progress..."]);
      localStorage.setItem('cogfatherEvent', 'true');
    }

    localStorage.setItem('credits', credits);
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
    localStorage.setItem('autoClickerV1Count', autoClickerV1Count); 
  }, [credits, junk, electronicsUnlock, clickMultiplier, passiveIncome, itemCosts, autoClicks, clickCount, achievements, ownedItems, clickEnhancerLevel, globalJpsMultiplier, autoClickerV1Count]);

  const validateQuestsAndAchievements = () => {
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
      setCraftingInventory,
      setAutoClicks, setPermanentAutoClicks
    });
  };

  const collectJunk = () => {
    const surgeMultiplier = isSurgeActive ? 2 : 1;
    const scavengingBonus = 1 + (skillLevels.scavengingFocus / 100);
    setJunk(prev => prev + (clickMultiplier * surgeMultiplier * scavengingBonus));

    // Random material finding
    const random = Math.random();
    if (random < 0.0001) { 
      const materials = ['Wires', 'Metal Plates', 'Gear Bits'];
      const randomMaterial = materials[Math.floor(Math.random() * materials.length)];
      setCraftingInventory(prev => ({
        ...prev,
        [randomMaterial]: (prev[randomMaterial] || 0) + 1
      }));
      setNotifications(prev => [...prev, `Found a ${randomMaterial}!`]);
    } else if (random < 0.00001) { 
      setCraftingInventory(prev => ({
        ...prev,
        'Scrap Core': (prev['Scrap Core'] || 0) + 1
      }));
      setNotifications(prev => [...prev, 'Found a Scrap Core!']);
    }

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

      if (amount === 1) {
      }

      const hasQuantumTap = localStorage.getItem('quantum_tap_purchased') === 'true';
      const quantumProc = hasQuantumTap && Math.random() < 0.03;

      setTronics(prev => prev + (quantumProc ? amount * 3 : amount));

      if (quantumProc) {
        setNotifications(prev => [...prev, "Quantum Tap triggered! 3x Tronics gained!"]);
      }
    }
  };

  const canAffordV1 = () => {
    return junk >= itemCosts.autoClicker;
  }

  const canAffordV2 = () => {
    return junk >= itemCosts.autoClickerV2;
  }




  useEffect(() => {
    localStorage.setItem('tutorialStage', tutorialStage);
    validateQuestsAndAchievements();


    if (junk >= 1000000) {
      if (!localStorage.getItem('shown_questlog_hint')) {
        localStorage.setItem('shown_questlog_hint', 'true');


        const questLogBtn = document.querySelector('.quest-log-toggle');
        const mainQuestLog = document.querySelector('.quest-log');
        if (questLogBtn) questLogBtn.classList.add('quest-log-attention');
        if (mainQuestLog) mainQuestLog.classList.add('quest-log-attention');


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


  useEffect(() => {
    validateQuestsAndAchievements();
  }, [passiveIncome, ownedItems.streetrat, clickMultiplier, globalJpsMultiplier]);

  useEffect(() => {
    const onetimeItems = ['Click Rig Mk I', 'Auto Toolkit', 'Compression Pack', 'Reinforced Backpack', 'Surge Capacitor Module'];
    const hasCraftedOneTime = onetimeItems.some(item => (craftingInventory[item] || 0) > 0);
    setShowInventory(hasCraftedOneTime);
  }, [craftingInventory]);

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
      <TrashSurge isActive={isSurgeActive} isTronicsActive={isTronicsSurgeActive} activeClicker={document.querySelector('.clicker-select.active')?.textContent.includes('Trash') ? 'trash' : 'electronics'} />


       <TronicsSurge 
        isActive={isTronicsSurgeActive}
        activeClicker={document.querySelector('.clicker-select.active')?.textContent.includes('Trash') ? 'trash' : 'electronics'}
         setCraftingInventory= {setCraftingInventory}
         />

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
        autoClickerV1Count={autoClickerV1Count} 
        permanentAutoClicks= {permanentAutoClicks}
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
          case 'tooltips':
            setShowTooltips(prev => !prev);
            console.log("Help");
            break;
          case 'upgradeStats':
            setShowUpgradeStats(prev => !prev);
            break;
          case 'coinflip': 
            setShowCoinFlip(prev => !prev);
            break;
          case 'combat':
            if (localStorage.getItem('hasPrestiged')) {
            setShowCombat(prev => !prev);
              console.log("help");
            break;
            }
        }
      }} />
      {showTooltips && <Tooltips onClose={() => setShowTooltips(false)} />}
      {showSlotMachine && (
        <SlotMachine
          junk={junk}
          onSpin={(cost) => setJunk(prev => prev - cost)}
          setCraftingInventory={setCraftingInventory}
          setElectroShards={setElectroShards}
          onClose={() => setShowSlotMachine(false)}
        />
      )}
      {showCombat && (
        <ScraptagonCombat
          playerStats={{
            maxHealth: 100,
            attack: 10,
            defense: 5,
            attackSpeed: 1
          }}
          onCombatEnd={(victory) => {
            if (victory) {
              setNotifications(prev => [...prev, "Combat Victory!"]);
            }
          }}
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
          setPassiveIncome = {setPassiveIncome}
          calculate10xPriceJunkClicker={calculate10xPrice01}
          calculate10xPriceJPS = {calculate10xPriceJPS}
          calculate10xPriceBillBoard= {calculate10x02}
          setBulkBuy={setBulkBuy}
          setJunk= {setJunk}
          itemCosts={itemCosts}
          bulkBuy={bulkBuy}
          setNotifictations={setNotifications}
          ownedItems={ownedItems}
          craftingInventory={craftingInventory}
          onBuyTrashBag={handleBuyTrashBag}
          onBuyPicker={handleBuyPicker}
          onBuyStreetrat={handleBuyStreetrat}
          onGetAutoClickersV1={autoClickerV1Count}
          onBuyAutoClicker = {handleBuyAutoClicker}
          canAffordV1={canAffordV1}
          canAffordV2={canAffordV2}
          onBuyAutoClickerV2= {handleBuyAutoClickerV2}
          onGetAutoClickersV2={autoClickerV2Count}
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
          onBuyClickEnhancer={handleBuyClickEnhancer}
          onBuyModularScrapper={handleBuyModularScrapper}
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
          bulkBuy={bulkBuy}
          setBulkBuy= {setBulkBuy}
          itemCosts={itemCosts}
          calculate10xPrice01={calculate10xPrice01}
          caluclatePricex02={calculate10x02}
          onBuyTronicsBoost={handleBuyTronicsBoost}
          onBuyTronicsBoostII={handleBuyTronicsBoostII}
          onBuyFlowRegulator={handleBuyFlowRegulator}
          onBuyQuantumTap={handleBuyQuantumTap}
          onBuyElectroSurgeNode={handleBuyElectroSurgeNode}
          onBuyElectroBeaconCore={handleBuyElectroBeaconCore}
          onBuyCircuitOptimization={handleBuyCircuitOptimization}
          onBuyFrequencyTap={handleBuyHighFreqTap}

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
          setCraftingInventory={setCraftingInventory}
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
              localStorage.setItem('tronicsClicker', 'true');
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
          setShowChangelog={setShowChangelog}
          setShowSettings={setShowSettings}
          showJunkDrone= {showJunkDrone}
          setShowJunkDrone= {setShowJunkDrone}
          showHoverDrone= {showHoverDrone}
          setShowHoverDrone= {setShowHoverDrone}
          showAutoclickers = {showAutoclickers}
          setShowAutoclickers= {setShowAutoclickers}
          enableTrashPickup= {enableTrashPickup}
          setEnableTrashPickup= {setEnableTrashPickup}
          setUiSettingsCollapsed={setUiSettingsCollapsed}
          uiSettingsCollapsed={uiSettingsCollapsed}
          permanentAutoClicks= {permanentAutoClicks}
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
      {showCoinFlip && (
        <CoinFlip
          junk={junk}
          onBet={(amount) => setJunk(prev => prev + amount)}
          onClose={() => setShowCoinFlip(false)}
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
      {((junk >= 1000000 && !localStorage.getItem('hasPrestiged') && prestigeCount === 0) &&
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

      {(junk >= 25000000 || (localStorage.getItem('prestige1Unlocked') === "true")&&
        <button 
          className={`prestige-button ${(localStorage.getItem('prestige1Unlocked') != "true") ? 'locked' : ''}`}
          onClick={() => {
            if (localStorage.getItem('prestige1Unlocked') != "false") {
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
            autoClickerV1Count 
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



            const preservedHelpersList = preservedHelper ? preservedHelper.split(', ') : [];
            let preservedAutoClicks = 0;


            preservedHelpersList.forEach(helper => {
              if (helper === 'Auto Clicker Bot') preservedAutoClicks++;
            });

            setJunk(0);
            setClickMultiplier(1);
            setPassiveIncome(0);
            setAutoClicks(preservedAutoClicks); 
            setClickEnhancerLevel(0);
            setAutoClickerV1Count(0); 

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
              autoClickerV2: 10000,
              junkRefinery: 500000,
              modularScrapper: 2500000,
              tronicsBoost: 250,
              tronicsBoostII: 750,
              flowRegulator: 3000,
              quantumTap: 1250,
              electroSurgeNode: 35000,
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
              junkRefinery: 0,
              modularScrapper: 0,
              tronicsBoost: 0,
              tronicsBoostII: 0,
              flowRegulator: 0,
              quantumTap: 0,
              electroSurgeNode: 0
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