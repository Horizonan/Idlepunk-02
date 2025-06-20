import React, { useState, useEffect } from 'react';
import './App.css';

//import gamehandlers
import { gameHandlers } from './utils/gameHandlers';
import { useGameLoopManager } from './utils/gameLoopManager';
import { useCrystalZustand } from './utils/crystalZustand';
import { useFlavorEvents } from './utils/flavorEventsStore';
import CrystalTimer from './components/CrystalTimer';

// Import StoreMenu
import CraftingStore from './stores/CraftingStore';
import MenuButtons from './stores/MenuButtons';
import UpgradeStats from './stores/UpgradeStats';
import Store from './stores/Store';
import JunkUpgrades from './sideMenu/JunkUpgrades';
import ElectroStore from './stores/ElectroStore';
import CrewMenu from './stores/CrewMenu';

//Autoclickers
import AutoClickerEffect from './components/Effects/Automation/AutoClickerEffect';

//Surges
import TrashSurge from './components/Effects/surges/TrashSurge';
import TronicsSurge from './components/Effects/surges/TronicsSurge';

//Side Menu
import QuestLog from './sideMenu/QuestLog';
import Achievements from './sideMenu/Achievements';
import TechTree from './sideMenu/TechTree';
import Menu from './sideMenu/Menu';
import Marketplace from './sideMenu/Marketplace';
import Stats from './sideMenu/Stats';
import './styles/Stats.css';
import SlotMachine from './sideMenu/SlotMachine';
import CoinFlip from './sideMenu/CoinFlip';
import Tooltips from './sideMenu/GameTips';

//Settings Menu
import Settings from './components/SideMenu/settingsMenu/Settings';
import Changelog from './components/SideMenu/settingsMenu/Changelog';

//Utility imports
import { useAchievements } from './hooks/useAchievements';
import { validateQuests } from './utils/questValidation';
import { useGameState } from './hooks/useGameState';
import { getInitialItemCosts } from './utils/ItemCosts';
import { processOfflineProgress, updateLastActiveTime } from './utils/offlineSimulation';
import { junkCalculationManager, getEffectiveJunkPerSecond } from './utils/junkCalculation';
import { useSkillsStore } from './utils/skillsStore';

//Effects/Animations
import ClickEnhancerEffect from './components/Effects/ClickEnhancerEffect';
import DroneEffect from './components/Effects/DroneEffect';
import HoverDroneEffect from './components/Effects/HoverDroneEffect';
import FlyingCrystal from './components/Effects/FlyingCrystal';
import HoloBillboard from './components/Effects/HoloBillboard';
import TrashBonus from './components/Effects/TrashBonus';
import ShardMiner from './components/Effects/ShardMiner';
import ScratzMiner from './components/Effects/ScratzMiner';
import PickupMagnetArray from './components/Effects/PickupMagnetArray';
import AutoRecyclerEffect from './components/Effects/AutoRecyclerEffect';
import CogfatherEye from './components/Effects/CogfatherEye';

//Combat
import ScraptagonCombat from './components/Combat/scrapCombat';

//Components
import VersionPopup from './components/VersionPopup/VersionPopup';
import StatsDisplay from './components/StatsDisplay';
import Clicker from './components/Clicker';
import CheatMenu from './components/CheatMenu/CheatMenu';
import CredStore from './stores/CredStore';
import NewsContainer from './components/NewsContainer';
import Notifications from './components/Notifications';
import TutorialSystem from './components/TutorialSystem';
import ActiveCheats from './components/CheatMenu/ActiveCheats';
import ItemInventory from './stores/ItemInventory';
import PrestigePopup from './components/PrestigePopup';
import QuantumTapNotification from './components/QuantumTapNotification';
import PrestigeMeter from './components/PrestigeMeter';
import SurgeExplanationPopup from './components/SurgeExplanationPopup';
import OfflineProgressPopup from './components/OfflineProgressPopup';
import { useEmailStore } from './utils/emailStore';
import CrewRecruitmentTooltip from './components/CrewRecruitmentTooltip';

//Mini game Component
import RelayCascade from './components/MiniGames/RelayCascade';


export default function App() {
    const {
        junk, setJunk, credits, setCredits, clickCount, setClickCount, tronics, setTronics, autoClicks, setAutoClicks, clickMultiplier, setClickMultiplier, passiveIncome, setPassiveIncome, globalJpsMultiplier, setGlobalJpsMultiplier, notifications, setNotifications,
        electronicsUnlock, setElectronicsUnlock, activeStore, setActiveStore, menuOpen, setMenuOpen, clickEnhancerLevel, setClickEnhancerLevel,
        tutorialStage, setTutorialStage, hasUpgrade, setHasUpgrade, showPrestigePopup, setShowPrestigePopup, prestigeCount, setPrestigeCount,
        electroShards, setElectroShards, beaconCount, setBeaconCount, setShowBeacon, showBeaconVisual, setShowBeaconVisual, isSurgeActive, setIsSurgeActive,
        hasFoundCapacitorThisSurge, setHasFoundCapacitorThisSurge, surgeCount, setSurgeCount, cogfatherLore, setCogfatherLore,
        preservedHelper, setPreservedHelper, setTronicsSurgeActive, isTronicsSurgeActive, setTotalTronicsClicks,
        autoClickerV1Count, setAutoClickerV1Count, autoClickerV2Count, setAutoClickerV2Count, showChangelog, setShowChangelog, showTechTree, setShowTechTree, showSlotMachine,
        setShowSlotMachine, showCheatMenu, setShowCheatMenu, showActiveCheats, setShowActiveCheats, showAchievements, setShowAchievements,
        showSettings, setShowSettings, showUpgradeStats, setShowUpgradeStats, enableHoloBillboard, setEnableHoloBillboard,
        showCrystal, setShowCrystal, showTrashBonus, setShowTrashBonus, showQuestLog, setShowQuestLog, showNewsTicker, setShowNewsTicker,
        prestigeQuestCompleted, setPrestigeQuestCompleted, showClickEnhancerUI, setShowClickEnhancerUI, craftingInventory, setCraftingInventory,
        showTooltips, setShowTooltips, hasHelper, setHasHelper, showInventory, setShowInventory, activeCheatsList, setActiveCheatsList,
        itemCosts, setItemCosts, ownedItems, setOwnedItems, skillLevels, uiSettingsCollapsed, setUiSettingsCollapsed, showJunkDrone, setShowJunkDrone,
        bulkBuy, setBulkBuy, showHoverDrone, setShowHoverDrone, showAutoclickers, setShowAutoclickers, enableTrashPickup, setEnableTrashPickup, permanentAutoClicks,   
        setPermanentAutoClicks, showCombat, setShowCombat, enableHoldToClick, setEnableHoldToClick, setElectroMultiplier, electroMultiplier, showCoinFlip, setShowCoinFlip,
        showMiniGameWindow, setShowMiniGameWindow, mousePosition, setMousePosition, quantumTapNotifications, setQuantumTapNotifications, showEndOfRoad, setShowEndOfRoad, 
        setShowSurgeExplanation, showSurgeExplanation, showCrewIntroTooltip, setShowCrewIntroTooltip, showOfflineProgress, setShowOfflineProgress, offlineProgressData, 
        setOfflineProgressData, forceCogfatherEye, setForceCogfatherEye, showRelayCascade, setShowRelayCascade
    } = useGameState();

    const purchaseHandlers = gameHandlers({
        junk,tronics,electroShards,bulkBuy,itemCosts,setClickEnhancerLevel,clickEnhancerLevel,autoClickerV1Count,ownedItems
    }, {
        setJunk, tronics, setTronics, setNotifications, setClickMultiplier, setItemCosts, setOwnedItems, setHasHelper, setGlobalJpsMultiplier, setAutoClicks,
        setClickEnhancerLevel, clickEnhancerLevel, setPassiveIncome, setAutoClickerV1Count, autoClickerV1Count, setAutoClickerV2Count, setElectroShards, setElectroMultiplier, setHasUpgrade
    });

    const {
        handleBuyTrashBag,
        calculate10xPriceJunkClicker: calculate10xPrice01, handleBuyPicker, handleBuyClickEnhancer, handleBuyClampjawRig, calculate10xPriceJPS, handleBuyStreetrat, handleBuyCart, handleBuyJunkMagnet, handleBuyUrbanRecycler, handleBuyScrapDrone, handleBuyHoloBillboard, calculate10xPriceBillBoard: calculate10x02, handleBuyAutoClicker, handleBuyAutoClickerV2, handleBuyJunkRefinery, handleBuyModularScrapper, handleBuyTronicsBoost, handleBuyTronicsBoostII, handleBuyFlowRegulator, handleBuyQuantumTap, handleBuyElectroSurgeNode, handleBuyElectroBeaconCore, handleBuyCircuitOptimization, handleBuyHighFreqTap, handleBuyReactiveFeedback, handleBuyPickupMagnetArray, handleBuyScratzMiner, handleBuyShardMiner, onBuyAutoRecycler, handleBuyStreetratUpgrade, handleBuyScrapBagUpgrade, handleBuyTrashPickerUpgrade, handleBuyCartUpgrade, handleBuyUrbanRecyclerUpgrade, handleBuyClickEnhancerUpgrade,handleBuyJunkMagnetUpgrade,
    handleBuyStreetratUpgrade2,
    handleBuyCartUpgrade2,
    handleBuyUrbanRecyclerUpgrade2,
    handleBuyTrashPickerUpgrade2,
    handleBuyTrashBagUpgrade2, handleBuyGutterlineExtractor
    } = purchaseHandlers;

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

  // Initialize game loop manager
  const { validateQuestsAndAchievements } = useGameLoopManager(
    {
      junk, credits, clickCount, tronics, autoClicks, clickMultiplier, passiveIncome,
      globalJpsMultiplier, electronicsUnlock, autoClickerV1Count, craftingInventory,
      ownedItems, permanentAutoClicks, electroMultiplier, isSurgeActive,
      hasFoundCapacitorThisSurge, activeCheatsList, electroShards, beaconCount,
      showSlotMachine, showAchievements, showSettings, showQuestLog, showTooltips,
      showCoinFlip, showCombat, activeStore, isTronicsSurgeActive, bulkBuy,
      tutorialStage, prestigeCount, mousePosition, quantumTapNotifications,
      showOfflineProgress, offlineProgressData, forceCogfatherEye, showCrewIntroTooltip,
      itemCosts, achievements, clickEnhancerLevel, cogfatherLore, surgeCount
    },
    {
      setJunk, setCredits, setClickCount, setTronics, setAutoClicks, setClickMultiplier,
      setPassiveIncome, setGlobalJpsMultiplier, setElectronicsUnlock, setAutoClickerV1Count,
      setCraftingInventory, setOwnedItems, setNotifications, setPermanentAutoClicks,
      setElectroMultiplier, setIsSurgeActive, setHasFoundCapacitorThisSurge,
      setActiveCheatsList, setElectroShards, setMousePosition, setActiveStore,
      setShowUpgradeStats, setShowSlotMachine, setShowAchievements, setShowSettings,
      setShowQuestLog, setShowTooltips, setShowCoinFlip, setShowCombat,
      setTronicsSurgeActive, setSurgeCount, setShowCrystal, setShowTrashBonus,
      setShowPrestigePopup, setShowSurgeExplanation, setQuantumTapNotifications,
      setShowOfflineProgress, setOfflineProgressData, setForceCogfatherEye,
      setShowRelayCascade, setTotalTronicsClicks, setShowMiniGameWindow,
      setShowInventory, setPrestigeQuestCompleted, setClickEnhancerLevel,
      setPrestigeCount, setCogfatherLore, setShowCrewIntroTooltip,
      setShowCheatMenu, setShowActiveCheats
    },
    { validateAchievements, checkElectroMilestones }
  );

  const checkAchievements = validateAchievements;

  const checkShardMilestones = (shardCount) => {
    if (shardCount === 3) {
      window.dispatchEvent(new CustomEvent('nextNews', { 
        detail: { message: "Cogfather: The circuit is almost loud enough to listen to." }
      }));
    }
  };






  const [creditStoreItems, setCreditStoreItems] = useState(() => JSON.parse(localStorage.getItem('creditStoreItems')) || {
    'Hover Drone': false,
    'Crafting Booster Unit': false,
    'Ascension Reclaimer': 0
  });

  useEffect(() => {
    localStorage.setItem('creditStoreItems', JSON.stringify(creditStoreItems));
  }, [creditStoreItems]);



  const collectJunk = () => {
    const surgeMultiplier = isSurgeActive ? 2 : 1;
    const scavengingBonus = 1 + (skillLevels.scavengingFocus / 100);
    const junkGained = clickMultiplier * surgeMultiplier * scavengingBonus;
    setJunk(prev => prev + junkGained);

    // Track total junk collected
    const currentTotal = parseInt(localStorage.getItem('totalJunkCollected') || '0');
    localStorage.setItem('totalJunkCollected', (currentTotal + junkGained).toString());

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
      const hasQuantumTap = localStorage.getItem('quantum_tap_purchased') === 'true';
      const quantumProc = hasQuantumTap && Math.random() < 0.03;

      setTronics(prev => prev + ((quantumProc ? amount * 3 : amount) * electroMultiplier));

      if (quantumProc && localStorage.getItem('showQuantumTapNotification') !== 'false') {
        const newNotification = {
          id: Date.now() + Math.random(),
          mousePosition: { ...mousePosition },
          offset: quantumTapNotifications.length * 30
        };
        setQuantumTapNotifications(prev => [...prev, newNotification]);
      }
    }
  };

  const canAffordV1 = () => {
    return junk >= itemCosts.autoClicker;
  }

  const canAffordV2 = () => {
    return junk >= itemCosts.autoClickerV2;
  }



    const handleTechUnlock = (techName) => {
    const currentPrestige = parseInt(localStorage.getItem('prestigeCount') || '0');

    // Check prestige requirements for new features
    const prestigeRequirements = {
      'crewMenu': 2,
      'skillsMenu': 3,
      'scraptagon': 4
    };

    const requiredPrestige = prestigeRequirements[techName];
    if (requiredPrestige && currentPrestige < requiredPrestige) {
      setNotifications(prev => [...prev, `${techName} requires Prestige ${requiredPrestige}!`]);
      return;
    }

    if (prestigeTokens > 0) {
      setPrestigeTokens(prev => prev - 1);
      localStorage.setItem('prestigeTokens', (prestigeTokens - 1).toString());
      localStorage.setItem(techName, 'true');

      // Special notifications for milestone unlocks
      const milestoneMessages = {
        'tronicsClicker': 'Tronics Clicker unlocked! The foundation of your empire.',
        'crewMenu': 'Crew Management unlocked! Build your team and send them on missions.',
        'skillsMenu': 'Skills Center unlocked! Master the arts of the wasteland.',
        'scraptagon': 'Scraptagon Arena unlocked! Prove your worth in combat.',
        'craftingBenchV2': 'Advanced Crafting unlocked! Create superior items.',
        'modcrafting': 'Modcrafting Station unlocked! Enhance yourself with mods.'
      };

      const message = milestoneMessages[techName] || `${techName} unlocked!`;
      setNotifications(prev => [...prev, message]);
      setShowTechTree(false);
    }
  };

  return (
    <main>      <VersionPopup onClose={() => {}} />
      {showQuestLog && <QuestLog tutorialStage={tutorialStage} onClose={() => setShowQuestLog(false)} />}
      <CrystalTimer />
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

      {/* Mini-game Window at App Level */}
      {showMiniGameWindow && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.95)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 4000
        }}>
          <div style={{
            width: '95vw',
            height: '95vh',
            maxWidth: '1200px',
            maxHeight: '800px',
            border: '3px solid #9400D3',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 0 30px rgba(148, 0, 211, 0.7)'
          }}>
            <RelayCascade
              onClose={() => {
                setShowMiniGameWindow(false);
                // Signal to crew menu that mini-game is complete
                window.dispatchEvent(new CustomEvent('miniGameComplete', { detail: { success: false } }));
              }}
              onComplete={(success) => {
                setShowMiniGameWindow(false);
                // Signal to crew menu that mini-game is complete
                window.dispatchEvent(new CustomEvent('miniGameComplete', { detail: { success } }));

                if (success) {
                  // Bonus rewards for successful mini-game completion
                  const bonusCredits = Math.floor(Math.random() * 20) + 10;
                  setCredits(prev => prev + bonusCredits);
                  setNotifications(prev => [...prev, `Mini-game completed! Bonus: ${bonusCredits} credits`]);
                }
              }}
            />
          </div>
        </div>
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
        permanentAutoClicks={permanentAutoClicks}
        isSurgeActive={isSurgeActive}
      />
      <Menu onStoreSelect={(type) => {
        switch(type) {
          case 'junkUpgrades':
            setActiveStore(prev => prev === 'junkUpgrades' ? null : 'junkUpgrades');
            break;
          case 'marketplace':
            setActiveStore(prev => prev === 'marketplace' ? null : 'marketplace');
            break;
          case 'achievements':
            setShowAchievements(prev => !prev);
            break;
          case 'stats':
            setActiveStore(prev => prev === 'stats' ? null : 'stats');
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
      {showCombat && localStorage.getItem('scraptagon') === 'true' && parseInt(localStorage.getItem('prestigeCount') || '0') >= 4 && (
        <ScraptagonCombat
          playerStats={{ 
            maxHealth: 100, 
            attack: 10 + (clickMultiplier * 0.5), 
            defense: 5, 
            attackSpeed: 1.2,
            level: Math.floor(clickMultiplier / 5) + 1,
            name: "SCRAP_HUNTER"
          }}
          equipment={[]}
          onCombatEnd={(victory, rewards) => {
            if (victory && rewards) {
              setJunk(prev => prev + rewards.junk);
              setCredits(prev => prev + rewards.credits);
              setNotifications(prev => [...prev, `Combat Victory! Gained ${rewards.junk} junk and ${rewards.credits} credits.`]);
            } else if (victory) {
              setNotifications(prev => [...prev, "Combat Victory! Gained experience and resources."]);
            } else {
              setNotifications(prev => [...prev, "Combat Defeat. Better luck next time."]);
            }
          }}
          onClose={() => setShowCombat(false)}
        />
      )}
      {showAchievements && (
        <Achievements 
          achievements={achievements}
          onClose={() => setShowAchievements(false)}
        />
      )}
      <div 
        className={`sidebar ${menuOpen ? 'open' : ''}`}
        style={{
          left: menuOpen ? '0px' : '-300px',
          top: '105px',
          bottom: 'auto'
        }}
      >

        <MenuButtons 
          onStoreSelect={(store) => {
            setActiveStore(store);
            localStorage.setItem('activeStore', store);
          }}
          showInventory={showInventory}
          craftingInventory={craftingInventory}
          ownedItems={ownedItems}
        />
      </div>
      {showUpgradeStats && (
        <UpgradeStats
          onClose={() => setShowUpgradeStats(false)}
        />
      )}

      {activeStore === 'junkUpgrades' && (
        <JunkUpgrades
          onClose={() => {
            setActiveStore(null);
            localStorage.setItem('activeStore', null);
          }}
          ownedItems={ownedItems}
          junk={junk}
          setJunk={setJunk}
          onBuyStreetratUpgrade={handleBuyStreetratUpgrade}
          onBuyScrapBagUpgrade={handleBuyScrapBagUpgrade}
          onBuyTrashPickerUpgrade={handleBuyTrashPickerUpgrade}
          onBuyCartUpgrade={handleBuyCartUpgrade}
          onBuyUrbanRecyclerUpgrade={handleBuyUrbanRecyclerUpgrade}
          onBuyClickEnhancerUpgrade={handleBuyClickEnhancerUpgrade}
          onBuyJunkMagnetUpgrade={handleBuyJunkMagnetUpgrade}
          onBuyClampjawUpgrade1={handleBuyClampjawRig}
          onBuyScrapDroneUpgrade1={handleBuyScrapDrone}
          onBuyTrashPickerUpgrade2={() => {}}
          onBuyStreetratUpgrade2={() => {}}
          onBuyTrashBagUpgrade2={() => {}}
          onBuyCartUpgrade2={() => {}}
          onBuyUrbanRecyclerUpgrade2={() => {}}
          onNewUpgradesChange={() => {}}
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
          onBuyScratzMiner={handleBuyScratzMiner}
          onBuyShardMiner={handleBuyShardMiner}
          onBuyCart={handleBuyCart}
          onBuyJunkMagnet={handleBuyJunkMagnet}
          onBuyUrbanRecycler={handleBuyUrbanRecycler}
          onBuyScrapDrone={handleBuyScrapDrone}
          onBuyHoloBillboard={handleBuyHoloBillboard} 
          globalJpsMultiplier={globalJpsMultiplier}
          passiveIncome={passiveIncome}
          onBuyClickEnhancer={handleBuyClickEnhancer}
          onBuyClampjawRig={handleBuyClampjawRig}
          onBuyModularScrapper={handleBuyModularScrapper}
          clickCount={clickCount}
          purchasedUpgrades={Object.values(itemCosts).filter(cost => cost > 0).length}
          onBack={() => {
            setActiveStore(null);
            localStorage.setItem('activeStore', null);
          }}
          onBuyJunkRefinery={handleBuyJunkRefinery}
          onBuyAutoRecycler={() => {
            const cost = 5000000;
            if (junk >= cost) {
              setJunk(prev => prev - cost);
              setOwnedItems(prev => ({ ...prev, autoRecycler: (prev.autoRecycler || 0) + 1 }));
              setNotifications(prev => [...prev, "Auto Recycler Unit purchased!"]);
            }
          }}
          onBuyGutterlineExtractor={handleBuyGutterlineExtractor}
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

        {activeStore === 'stats' && (
          <Stats 
            clickCount={clickCount}
            passiveIncome={passiveIncome}
            globalJpsMultiplier={globalJpsMultiplier}
            craftingInventory={craftingInventory}
            surgeCount={surgeCount}
            prestigeCount={prestigeCount}
            preservedHelper={preservedHelper}
            permanentAutoClicks={permanentAutoClicks}
            electroMultiplier={electroMultiplier}
            onClose={() => setActiveStore(null)}
          />
        )}
      {activeStore === 'crew' && parseInt(localStorage.getItem('prestigeCount') || '0') >= 2 && (
        <CrewMenu
          setCredits={setCredits}
          setJunk={setJunk}
          junk={junk}
          onClose={() => {
            setActiveStore(null);
            localStorage.setItem('activeStore', null);
          }}
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
          onBuyReactiveFeedback={handleBuyReactiveFeedback}
          onBuyPickupMagnetArray={handleBuyPickupMagnetArray}
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
          onCraft={(item, quantity = 1) => {
            if (item.type === 'basic') {
              const hasBooster = craftingInventory['Crafting Booster Unit'];
              let totalCost = 0;

              if (quantity === 10) {
                // Calculate 10x crafting cost with scaling
                let currentCost = hasBooster ? Math.floor(item.cost * 0.9) : item.cost;
                for (let i = 0; i < 10; i++) {
                  totalCost += currentCost;
                  currentCost = Math.floor(currentCost * 1.1);
                }
              } else {
                totalCost = hasBooster ? Math.floor(item.cost * 0.9) : item.cost;
              }

              if (junk >= totalCost) {
                setJunk(prev => prev - totalCost);
                setCraftingInventory(prev => ({
                  ...prev,
                  [item.name]: (prev[item.name] || 0) + quantity
                }));
                setNotifications(prev => [...prev, `Crafted ${quantity}x ${item.name}!`]);
              }
            } else {
              // For non-basic items, handle quantity properly
              const actualQuantity = item.onetime ? 1 : quantity;
              const canCraft = Object.entries(item.requirements).every(
                ([mat, count]) => (craftingInventory[mat] || 0) >= (count * actualQuantity)
              ) && (!item.onetime || !(craftingInventory[item.name] || 0)) && junk >= ((item.cost || 0) * actualQuantity);

              if (canCraft) {
                setCraftingInventory(prev => {
                  const newInventory = { ...prev };
                  Object.entries(item.requirements).forEach(([mat, count]) => {
                    newInventory[mat] -= (count * actualQuantity);
                  });
                  newInventory[item.name] = (newInventory[item.name] || 0) + actualQuantity;
                  return newInventory;
                });
                if (item.cost) setJunk(prev => prev - (item.cost * actualQuantity));
                // Handle crafting bonuses
                if (item.name === 'Click Rig Mk I') {
                  setClickMultiplier(prev => prev * 1.25);
                  setNotifications(prev => [...prev, "Click Rig Mk I crafted! +25% click power!"]);
                } else if (item.name === 'Overclocked Click Rig') {
                  // Remove Click Rig Mk I from inventory and apply upgraded bonus
                  setCraftingInventory(prev => ({
                    ...prev,
                    'Click Rig Mk I': 0 // Remove the original
                  }));
                  // Remove the old 25% bonus and apply the new 50% bonus
                  setClickMultiplier(prev => (prev / 1.25) * 1.5);
                  setNotifications(prev => [...prev, "Overclocked Click Rig crafted! Click power upgraded from +25% to +50%!"]);
                } else if (item.name === 'Auto Toolkit') {
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
                setNotifications(prev => [...prev, `Crafted ${actualQuantity}x ${item.name}!`]);
              }
            }
          }}
          onBack={() => {
            setActiveStore(null);
            localStorage.setItem('activeStore', null);
          }}
        />
      )}
      {activeStore === 'credstore' && parseInt(localStorage.getItem('prestigeCount') || '0') >= 2 && (
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
        enableHoldToClick={enableHoldToClick}
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
          setCredits={setCredits}
          setCraftingInventory={setCraftingInventory}
          onLaunchRelayCascade={() => setShowRelayCascade(true)} // Cheat button to launch Relay Cascade
          onForcePrestige={() => setShowPrestigePopup(true)} // Force prestige without requirements        
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
          onUnlock={(techName) => {
            handleTechUnlock(techName);
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
          showJunkDrone= {setShowJunkDrone}
          showHoverDrone= {showHoverDrone}
          setShowHoverDrone= {setShowHoverDrone}
          showAutoclickers = {showAutoclickers}
          setShowAutoclickers= {setShowAutoclickers}
          enableTrashPickup= {enableTrashPickup}
          setEnableTrashPickup= {setEnableTrashPickup}
          enableHoldToClick={enableHoldToClick}
          setEnableHoldToClick={setEnableHoldToClick}
          setUiSettingsCollapsed={setUiSettingsCollapsed}
          uiSettingsCollapsed={uiSettingsCollapsed}
          permanentAutoClicks= {permanentAutoClicks}
          electroMultiplier={electroMultiplier}
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
      {/* Unified Prestige Button Logic */}
      {(() => {
        const hasPrestiged = localStorage.getItem('hasPrestiged') === 'true';
        const prestige1Unlocked = localStorage.getItem('prestige1Unlocked') === 'true';
        const currentPrestigeCount = parseInt(localStorage.getItem('prestigeCount') || '0');

        // First prestige conditions
        if (!hasPrestiged && junk >= 1000000 && currentPrestigeCount === 0) {
          return (
            <button 
              className={`prestige-button ${!prestigeQuestCompleted ? 'locked' : ''}`}
              onClick={()=>{
                if (prestigeQuestCompleted) {
                  setShowPrestigePopup(true);
                }
              }}>
              Prestige
            </button>
          );
        }

        // Second prestige conditions (post first prestige)
        if (hasPrestiged && currentPrestigeCount === 1 && prestige1Unlocked) {
          return (
            <button 
              className="prestige-button"
              onClick={() => {
                setShowPrestigePopup(true);
              }}>
              Prestige Again
            </button>
          );
        }

        return null;
      })()}
      {ownedItems.scratzMiner > 0 && (
        <ScratzMiner
          ownedMiners={ownedItems.scratzMiner}
          junkCells={craftingInventory['Junk Cells'] || 0}
          onConsumeFuel={(amount) => {
            setCraftingInventory(prev => ({
              ...prev,
              'Junk Cells': Math.max(0, (prev['Junk Cells'] || 0) - amount)
            }));
          }}
          onGenerateCredits={(amount) => {
            setCredits(prev => prev + amount);
          }}
          setNotifications={setNotifications}
        />
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
          onConfirm={async () => {
            setShowPrestigePopup(false);

            setCraftingInventory(prev => ({
              ...prev,
              'Prestige Token': (prev['Prestige Token'] || 0) + 1
            }));
            setPrestigeCount(prev => {
              const newCount = prev + 1;
              localStorage.setItem('prestigeCount', newCount.toString());

              // Apply prestige bonuses
              const applyPrestigeBonuses = (prestige) => {
                // Click multiplier bonus (5% per prestige)
                const clickBonus = 1 + (prestige * 0.05);
                localStorage.setItem('prestigeClickBonus', clickBonus.toString());

                // Starting autoclicks (2 per prestige after first)
                const autoclicks = Math.max(0, (prestige - 1) * 2);
                localStorage.setItem('prestigeAutoclicks', autoclicks.toString());

                // Starting credits (50 per prestige after first)
                const startingCredits = Math.max(0, (prestige - 1) * 50);
                localStorage.setItem('prestigeStartingCredits', startingCredits.toString());

                // Crafting speed bonus (10% per prestige after second)
                const craftingSpeed = 1 + (Math.max(0, prestige - 2) * 0.1);
                localStorage.setItem('prestigeCraftingSpeed', craftingSpeed.toString());
              };

              applyPrestigeBonuses(newCount);

              // Set prestige2Active flag if this is the second prestige
              if (newCount === 2) {
                localStorage.setItem('prestige2Active', 'true');
                setNotifications(prevNotifs => [...prevNotifs, "Prestige 2 activated! Beyond Ascension questline unlocked!"]);
              }

              return newCount;
            });



            const preservedHelpersList = preservedHelper ? preservedHelper.split(', ') : [];
            let preservedAutoClicks = 0;


            preservedHelpersList.forEach(helper => {
              if (helper === 'Auto Clicker Bot') preservedAutoClicks++;
            });

            // Apply prestige bonuses
            const prestigeClickBonus = parseFloat(localStorage.getItem('prestigeClickBonus') || '1');
            const prestigeAutoclicks = parseInt(localStorage.getItem('prestigeAutoclicks') || '0');
            const prestigeStartingCredits = parseInt(localStorage.getItem('prestigeStartingCredits') || '0');

            setJunk(0);
            setClickMultiplier(prestigeClickBonus);
            setPassiveIncome(0);
            setAutoClicks(preservedAutoClicks + prestigeAutoclicks); 
            setClickEnhancerLevel(0);
            setAutoClickerV1Count(0);

            // Set starting credits from prestige bonus
            setCredits(prestigeStartingCredits); 

            //Reset Zustand
            useCrystalZustand.getState().setHasChronoCrystalTimer(false);

            // Clear crew data on prestige
            const { useRecruitmentZustand } = await import('./stores/crewRecruitment/recruitmentZustand');
            useRecruitmentZustand.getState().clearAllCrewData();

            // Reset credit store items
            setCreditStoreItems({
              'Hover Drone': false,
              'Crafting Booster Unit': false,
              'Ascension Reclaimer': 0
            });

            // Reset credits to 0
            setCredits(0);

            setItemCosts(getInitialItemCosts());


            const resetOwnedItems = {
              trashBag: 0,
              trashPicker: 0,
              streetrat: 0,
              cart: 0,
              junkMagnet: 0,
              urbanRecycler: 0,
              clickEnhancer: 0,
              clampjawRig: 0,
              scrapDrone: 0,
              holoBillboard: 0,
              junkRefinery: 0,
              modularScrapper: 0,
              tronicsBoost: 0,
              tronicsBoostII: 0,
              flowRegulator: 0,
              quantumTap: 0,
              electroSurgeNode: 0,
              scratzMiner: 0,
              autoRecycler: 0,
            };
            setOwnedItems(resetOwnedItems);


            setNotifications(prev => [...prev, "Prestige complete! Gained 1 Prestige Token"]);


            localStorage.setItem('hasPrestiged', 'true');

            // Clear quest progress for post-prestige questlines
            const postPrestigeQuests = [
              'System Memory Detected',
              'Tap the Pulse', 
              'Upgrade Cascade',
              'Beacon Protocol',
              'Forge the Overcrystal'
            ];

            postPrestigeQuests.forEach(quest => {
              localStorage.removeItem(`quest_sync_${quest}`);
            });

            // Trigger prestige meter update
            window.dispatchEvent(new CustomEvent('prestigeComplete'));

            if (prestigeCount === 0) {
              // Use setTimeout to ensure the message appears after the prestige reset
              setTimeout(() => {
                console.log("Notifications after setting the cogfather message:", notifications);

                const cogfatherMessage = (
                  <div className="cogfather-message-popup">
                    <img src="Icons/NPCs/Cogfather.jfif" alt="Cogfather" />
                    <p>You scrapped everything… just to prove you could build better. That's the first real upgrade.</p> 
                    <p>You've done it, kid. The Tech Tree's unlocked and it's permanent. No more looking back. 
                      From here on out, you're building the future out of scrap and sparks.</p>
                    <button onClick={() => {
                      setShowTechTree(true);
                      setNotifications(prev => prev.filter(n => typeof n !== 'object'));
                    }}>Improvement complete...</button>
                  </div>
                );
                setNotifications(prev => [...prev, cogfatherMessage]);
              }, 100);
            }
          }}
        />
      )}
      {showRelayCascade && (
        <RelayCascade onClose={() => setShowRelayCascade(false)} />
      )}
      {quantumTapNotifications.length > 0 && (
        <QuantumTapNotification
          notifications={quantumTapNotifications}
          onRemoveNotification={(id) => {
            setQuantumTapNotifications(prev => prev.filter(notification => notification.id !== id));
          }}
        />
      )}
      <PrestigeMeter />
      <PickupMagnetArray />

      {ownedItems.autoRecycler > 0 && (
        <AutoRecyclerEffect
          ownedItems={ownedItems}
          passiveIncome={passiveIncome}
          globalJpsMultiplier={globalJpsMultiplier}
          setPassiveIncome={setPassiveIncome}
          setCraftingInventory={setCraftingInventory}
          setNotifications={setNotifications}
          autoClicks={autoClicks}
          clickMultiplier={clickMultiplier}
        />
      )}

      {/* Offline Progress Popup */}
      {showSurgeExplanation && (
        <SurgeExplanationPopup 
          onClose={() => setShowSurgeExplanation(false)}
        />
      )}

      {/* Offline Progress Popup */}
      {showOfflineProgress && offlineProgressData && (
        <OfflineProgressPopup
          offlineResults={offlineProgressData}
          onClose={() => {
            setShowOfflineProgress(false);
            setOfflineProgressData(null);
          }}
        />
      )}

      {/* Cogfather Eye */}
      <CogfatherEye 
        forceShow={forceCogfatherEye}
        onDisappear={() => setForceCogfatherEye(false)}
      />

      {/* Crew Recruitment Intro Tooltip */}
      <CrewRecruitmentTooltip 
        showCrewIntroTooltip={showCrewIntroTooltip}
        setShowCrewIntroTooltip={setShowCrewIntroTooltip}
        setCredits={setCredits}
        setNotifications={setNotifications}
      />

      {/* End of Road UI Element for 2nd Prestige */}
      {prestigeCount >= 2 && showEndOfRoad && (
        <div className="end-of-road-container">
          <div className="end-of-road-header">
            <h2>🏁 Unexplored Waters</h2>
            <button 
              className="end-of-road-close-btn"
              onClick={() => setShowEndOfRoad(false)}
              title="Just a little bit longer please"
            >
              Just a little bit longer please
            </button>
          </div>
          <div className="end-of-road-content">
            <div className="prestige-badge">Prestige {prestigeCount}</div>
            <div className="end-of-road-message">
              <p>Congratulations! You've reached the current end of stable development.</p>
              <p>More content and features are coming in future updates! But you can Explore whats currently here</p>
            </div>
            <div className="end-of-road-stats">
              <div className="stat-item">
                <span className="stat-label">Total Junk Collected:</span>
                <span className="stat-value">{Math.floor(junk).toLocaleString()}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Prestige Level:</span>
                <span className="stat-value">{prestigeCount}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Total Clicks:</span>
                <span className="stat-value">{clickCount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}