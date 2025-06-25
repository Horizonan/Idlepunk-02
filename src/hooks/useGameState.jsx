import React, { useState, useEffect } from 'react';
import { getInitialItemCosts } from '../utils/ItemCosts';

export const useGameState = () => {

  const [clickMultiplier, setClickMultiplier] = useState(() => Number(localStorage.getItem('clickMultiplier')) || 1);
  const [passiveIncome, setPassiveIncome] = useState(() => Number(localStorage.getItem('passiveIncome')) || 0);
  const [notifications, setNotifications] = useState([]);
  const [electronicsUnlock, setElectronicsUnlock] = useState(() => localStorage.getItem('electronicsUnlock') === 'true');
  const [activeStore, setActiveStore] = useState(() => localStorage.getItem('activeStore') || null);
  const [menuOpen, setMenuOpen] = useState(() => localStorage.getItem('menuOpen') !== 'false');
  const [clickEnhancerLevel, setClickEnhancerLevel] = useState(() => Number(localStorage.getItem('clickEnhancerLevel')) || 0);
  const [tutorialStage, setTutorialStage] = useState(() => Number(localStorage.getItem('tutorialStage')) || 0);
  const [hasUpgrade, setHasUpgrade] = useState(false);
  const [showPrestigePopup, setShowPrestigePopup] = useState(false);
  const [prestigeCount, setPrestigeCount] = useState(() => Number(localStorage.getItem('prestigeCount')) || 0);
  const [electroShards, setElectroShards] = useState(() => Number(localStorage.getItem('electroShards')) || 0);
  const [cogfatherLore, setCogfatherLore] = useState(() => JSON.parse(localStorage.getItem('cogfatherLore')) || []);
  const [preservedHelper, setPreservedHelper] = useState(() => localStorage.getItem('preservedHelper') || null);
  const [showCombat, setShowCombat] = useState(false);
  const [showCoinFlip, setShowCoinFlip] = useState(false);
  const [showMiniGameWindow, setShowMiniGameWindow] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [quantumTapNotifications, setQuantumTapNotifications] = useState([]);
  const [showEndOfRoad, setShowEndOfRoad] = useState(true);
  const [showSurgeExplanation, setShowSurgeExplanation] = useState(false);
  const [showCrewIntroTooltip, setShowCrewIntroTooltip] = useState(false);
  const [showOfflineProgress, setShowOfflineProgress] = useState(false);
  const [offlineProgressData, setOfflineProgressData] = useState(null);
  const [forceCogfatherEye, setForceCogfatherEye] = useState(false);
  const [fluxShards, setFluxShards] = useState(() => parseInt(localStorage.getItem('fluxShards') || '0'));
  const [fluxMeter, setFluxMeter] = useState(() => parseInt(localStorage.getItem('fluxMeter') || '0'));
  const [showRelayCascade, setShowRelayCascade] = useState(false);



  //Currencies
  const [junk, setJunk] = useState(() => Math.floor(Number(localStorage.getItem('junk')) || 0));
  const [credits, setCredits] = useState(() => Math.floor(Number(localStorage.getItem('credits')) || 0));
  const [tronics, setTronics] = useState(() => Number(localStorage.getItem('tronics')) || 0);

  //Multiplier
  const [electroMultiplier, setElectroMultiplier] = useState(() => Number(localStorage.getItem('globalTronicsMultiplier')) || 1);
  const [globalJpsMultiplier, setGlobalJpsMultiplier] = useState(() => Number(localStorage.getItem('globalJpsMultiplier')) || 1);

  //Junk Store Specific 
  const [bulkBuy, setBulkBuy] = useState(false);

  //Beacons
  const [beaconCount, setBeaconCount] = useState(() => Number(localStorage.getItem('beaconCount')) || 0);
  const [showBeacon, setShowBeacon] = useState(false);
  const [showBeaconVisual, setShowBeaconVisual] = useState(() => localStorage.getItem('showBeaconVisual') !== 'false');

  //Autoclickers
  const [autoClickerV1Count, setAutoClickerV1Count] = useState(() => Number(localStorage.getItem('autoClickerV1Count')) || 0);
  const [autoClickerV2Count, setAutoClickerV2Count] = useState(() => Number(localStorage.getItem('autoClickerV2Count')) || 0);


  //Trash Surge 
  const [surgeCount, setSurgeCount] = useState(() => Number(localStorage.getItem('surgeCount')) || 0);  
  const [hasFoundCapacitorThisSurge, setHasFoundCapacitorThisSurge] = useState(false);
  const [isSurgeActive, setIsSurgeActive] = useState(false);

  //Tronics Surge
  const [isTronicsSurgeActive, setTronicsSurgeActive] = useState(false);

  //Click counts
  const [clickCount, setClickCount] = useState(() => Math.floor(Number(localStorage.getItem('clickCount')) || 0));

  //show Gamestates
  const [showChangelog, setShowChangelog] = useState(false);
  const [showTechTree, setShowTechTree] = useState(false);
  const [showSlotMachine, setShowSlotMachine] = useState(false);
  const [showCheatMenu, setShowCheatMenu] = useState(false);
  const [showActiveCheats, setShowActiveCheats] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showUpgradeStats, setShowUpgradeStats] = useState(false);
  const [showQuestLog, setShowQuestLog] = useState(false);
  const [showTooltips, setShowTooltips] = useState(false);
  const [showInventory, setShowInventory] = useState(false);

  //Enable Settings Gamestates
  const [enableHoloBillboard, setEnableHoloBillboard] = useState(() => localStorage.getItem('enableHoloBillboard') !== 'false');
  const [showNewsTicker, setShowNewsTicker] = useState(() => localStorage.getItem('showNewsTicker') !== 'false');
  const [showJunkDrone, setShowJunkDrone] = useState(() => localStorage.getItem('showDrones') !== 'false');
  const [showClickEnhancerUI, setShowClickEnhancerUI] = useState(() => localStorage.getItem('showClickEnhancerUI') !== 'false');
  const [showHoverDrone, setShowHoverDrone] = useState(() => localStorage.getItem('showHoverDrone') !== 'false');
  const [showAutoclickers, setShowAutoclickers] = useState(() => localStorage.getItem('showAutoclickers') !== 'false');
  const [enableTrashPickup, setEnableTrashPickup] = useState(() => localStorage.getItem('enableTrashPickup') !== 'false');
  const [enableHoldToClick, setEnableHoldToClick] = useState(() => localStorage.getItem('enableHoldToClick') !== 'false');


  //Other Settings gamestates
  const [uiSettingsCollapsed, setUiSettingsCollapsed] = useState(() => localStorage.getItem('uiSettingsCollapsed') === 'true');

  //Effects
  const [showCrystal, setShowCrystal] = useState(false);
  const [showTrashBonus, setShowTrashBonus] = useState(false);


  //Quest Check
  const [prestigeQuestCompleted, setPrestigeQuestCompleted] = useState(() => 
    localStorage.getItem('quest_sync_Forge the Future') === 'true'
  );

  //Other Checks
   const [hasHelper, setHasHelper] = useState(false);

  //Set Crafting Inventory
  const [craftingInventory, setCraftingInventory] = useState(() => 
    JSON.parse(localStorage.getItem('craftingInventory')) || {}
  );

  //Active Cheats 
  const [activeCheatsList, setActiveCheatsList] = useState(() => ({
    'Guaranteed Capacitor': false,
    'Force Triple Win': false,
    'Force Double Win': false
  }));

  //Auto Clicks
  const [autoClicks, setAutoClicks] = useState(() => {
    const saved = Number(localStorage.getItem('autoClicks')) || 0;
    return saved;
  });

  const [permanentAutoClicks, setPermanentAutoClicks] = useState(() => {
    const saved = Number(localStorage.getItem('permanentAutoClicks')) || 0;
    return saved;
  });

  //Item Costs
  const [itemCosts, setItemCosts] = useState(() => {
    const savedItemCosts = localStorage.getItem('itemCosts');
    return savedItemCosts ? JSON.parse(savedItemCosts) : getInitialItemCosts();
  });


  //Owned Items
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
    junkRefinery: 0,
    autoClickerV2: 0,
    autoClickerV1: 0,
    modularScrapper: 0,
    tronicsBoost: 0,
    tronicsBoostII: 0,
    flowRegulator: 0,
    quantumTap: 0,
    electroSurgeNode: 0,
    twitchweaveGauntlets: 0
  });

  //Skill Levels
  const [skillLevels, setSkillLevels] = useState(() => {
    const saved = localStorage.getItem('skillLevels');
    return saved ? JSON.parse(saved) : {
      scavengingFocus: 0,
      greaseDiscipline: 0
    };
  });


  useEffect(() => {
    localStorage.setItem('credits', credits);
    localStorage.setItem('junk', junk);
    localStorage.setItem('clickCount', clickCount);
    localStorage.setItem('tronics', tronics);
    localStorage.setItem('autoClicks', autoClicks);
    localStorage.setItem('autoClickerV1Count', autoClickerV1Count);
    localStorage.setItem('autoClickerV2Count', autoClickerV2Count);
    localStorage.setItem('clickMultiplier', clickMultiplier);
    localStorage.setItem('passiveIncome', passiveIncome);
    localStorage.setItem('globalJpsMultiplier', globalJpsMultiplier);
    localStorage.setItem('electronicsUnlock', electronicsUnlock);
    localStorage.setItem('clickEnhancerLevel', clickEnhancerLevel);
    localStorage.setItem('tutorialStage', tutorialStage);
    localStorage.setItem('prestigeCount', prestigeCount);
    localStorage.setItem('electroShards', electroShards);
    localStorage.setItem('beaconCount', beaconCount);
    localStorage.setItem('surgeCount', surgeCount);
    localStorage.setItem('cogfatherLore', JSON.stringify(cogfatherLore));
    localStorage.setItem('uiSettingsCollapsed', uiSettingsCollapsed);
    localStorage.setItem('showAutoclickers', showAutoclickers);
    localStorage.setItem('itemCosts', JSON.stringify(itemCosts));
    localStorage.setItem('fluxShards', fluxShards);
    localStorage.setItem('fluxMeter', fluxMeter);
    localStorage.setItem('showRelayCascade', showRelayCascade);


  }, [junk, credits, clickCount, tronics, autoClicks, clickMultiplier, passiveIncome, globalJpsMultiplier, 
      electronicsUnlock, clickEnhancerLevel, tutorialStage, prestigeCount, electroShards, beaconCount, 
      surgeCount, cogfatherLore, uiSettingsCollapsed, showAutoclickers, itemCosts, fluxShards, fluxMeter, showRelayCascade]);

  const [manualTronicsClicks, setManualTronicsClicks] = useState(() => 
  parseInt(localStorage.getItem('manualTronicsClicks') || '0')
);
const [totalTronicsClicks, setTotalTronicsClicks] = useState(() => 
  parseInt(localStorage.getItem('totalTronicsClicks') || '0')
);

useEffect(() => {
  localStorage.setItem('manualTronicsClicks', manualTronicsClicks);
  localStorage.setItem('totalTronicsClicks', totalTronicsClicks);
}, [manualTronicsClicks, totalTronicsClicks]);

return {
    junk, setJunk, credits, setCredits, clickCount, setClickCount, tronics, setTronics, autoClickerV1Count, setAutoClickerV1Count,
    autoClickerV2Count, setAutoClickerV2Count, manualTronicsClicks, setManualTronicsClicks,
    totalTronicsClicks, setTotalTronicsClicks, autoClicks, setAutoClicks,
    clickMultiplier, setClickMultiplier, passiveIncome, setPassiveIncome,
    globalJpsMultiplier, setGlobalJpsMultiplier, notifications, setNotifications,
    electronicsUnlock, setElectronicsUnlock,
    activeStore, setActiveStore, menuOpen, setMenuOpen,
    clickEnhancerLevel, setClickEnhancerLevel, tutorialStage, setTutorialStage,
    hasUpgrade, setHasUpgrade, showPrestigePopup, setShowPrestigePopup,
    prestigeCount, setPrestigeCount, electroShards, setElectroShards,
    beaconCount, setBeaconCount, showBeacon, setShowBeacon,
    showBeaconVisual, setShowBeaconVisual, isSurgeActive, setIsSurgeActive,
    hasFoundCapacitorThisSurge, setHasFoundCapacitorThisSurge, surgeCount, setSurgeCount,
    cogfatherLore, setCogfatherLore, preservedHelper, setPreservedHelper, 
    isTronicsSurgeActive, setTronicsSurgeActive, showChangelog, setShowChangelog,
    showTechTree, setShowTechTree, showSlotMachine, setShowSlotMachine, showCheatMenu, setShowCheatMenu,
    showActiveCheats, setShowActiveCheats, showAchievements, setShowAchievements,
    showSettings, setShowSettings, showUpgradeStats, setShowUpgradeStats, enableHoloBillboard, setEnableHoloBillboard,
    showCrystal, setShowCrystal, showTrashBonus, setShowTrashBonus, showQuestLog, setShowQuestLog, showNewsTicker, setShowNewsTicker,
    prestigeQuestCompleted, setPrestigeQuestCompleted, showClickEnhancerUI, setShowClickEnhancerUI, craftingInventory, setCraftingInventory,
    showTooltips, setShowTooltips, hasHelper, setHasHelper, showInventory, setShowInventory,
    activeCheatsList, setActiveCheatsList,
    itemCosts, setItemCosts, ownedItems, setOwnedItems, skillLevels, setSkillLevels, uiSettingsCollapsed, setUiSettingsCollapsed, bulkBuy, setBulkBuy, showJunkDrone, setShowJunkDrone, showHoverDrone, setShowHoverDrone, showAutoclickers, setShowAutoclickers, enableTrashPickup, setEnableTrashPickup,
    enableHoldToClick,
    setEnableHoldToClick, permanentAutoClicks, setPermanentAutoClicks,
  showCombat, setShowCombat, setElectroMultiplier, electroMultiplier, showCoinFlip, setShowCoinFlip, showMiniGameWindow, setShowMiniGameWindow, mousePosition, setMousePosition, quantumTapNotifications, setQuantumTapNotifications, showEndOfRoad, setShowEndOfRoad, setShowSurgeExplanation, showSurgeExplanation, showCrewIntroTooltip, setShowCrewIntroTooltip, showOfflineProgress, setShowOfflineProgress, offlineProgressData, setOfflineProgressData, forceCogfatherEye, setForceCogfatherEye, fluxShards, setFluxShards, fluxMeter, setFluxMeter, showRelayCascade, setShowRelayCascade
  };
};