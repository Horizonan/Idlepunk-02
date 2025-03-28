
// Initial game state values with proper defaults
const initialState = {
  junk: '0',
  credits: '0',
  tronics: '0',
  clickCount: '0',
  clickMultiplier: '1',
  passiveIncome: '0',
  autoClicks: '0',
  globalJpsMultiplier: '1',
  electronicsUnlock: 'false',
  menuOpen: 'true',
  clickEnhancerLevel: '0',
  tutorialStage: '0',
  prestigeCount: '0',
  prestigeUnlocked: 'false',
  hasPrestiged: 'false',
  surgeCount: '0',
  electroShards: '0',
  cogfatherEvent: 'false',
  beaconCount: '0',
  showDrones: 'true',
  maxVisibleDrones: '10',
  maxClickEnhancers: '3',
  showBeaconVisual: 'true',
  enableHoloBillboard: 'true',
  showNewsTicker: 'true',
  hasUpgrade: 'false',
  activeStore: '',
  autoClickerV1Count: '0',
  autoClickerV2Count: '0',
  preservedHelper: '',
  hadFirstSurge: 'false'
};

const initialObjects = {
  achievements: [],
  craftingInventory: {},
  ownedItems: {
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
    shardMiner: 0
  },
  creditStoreItems: {
    'Hover Drone': false,
    'Crafting Booster Unit': false,
    'Ascension Reclaimer': 0
  },
  itemCosts: {
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
  },
  skillLevels: {
    scavengingFocus: 0,
    greaseDiscipline: 0
  }
};

export const resetAllProgress = () => {
  // Clear ALL localStorage first
  localStorage.clear();

  // Reset all primitive values
  Object.entries(initialState).forEach(([key, value]) => {
    localStorage.setItem(key, value);
  });

  // Reset all object values
  Object.entries(initialObjects).forEach(([key, value]) => {
    localStorage.setItem(key, JSON.stringify(value));
  });

  // Clear specific progress flags
  localStorage.removeItem('unlocked_tronics_boost');
  localStorage.removeItem('tronics_boost_count');
  localStorage.removeItem('tronics_boost_cost');
  localStorage.removeItem('quantum_tap_purchased');
  localStorage.removeItem('circuit_optimization_count');
  localStorage.removeItem('skillXp');
  localStorage.removeItem('lastShardExtractorUse');
  localStorage.removeItem('sidebarLocked');
  localStorage.removeItem('sidebarLeft');
  localStorage.removeItem('sidebarTop');
  localStorage.removeItem('preservedHelper');
  localStorage.removeItem('craftedItems');

  // Clear any quest states
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith('quest_sync_')) {
      localStorage.removeItem(key);
    }
  });

  // Force a complete page reload to reset React state
  window.location.href = window.location.href;
};
