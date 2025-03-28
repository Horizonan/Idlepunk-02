
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
  activeStore: '',
  ascension_tab_clicked: 'false',
  circuit_optimization_count: '0',
  quantum_tap_purchased: 'false',
  autoClickerV1Count: '0',
  autoClickerV2Count: '0',
  skillLevels: '{"scavengingFocus":0,"greaseDiscipline":0}',
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
  }
};

export const resetAllProgress = () => {
  // First clear everything
  Object.keys(localStorage).forEach(key => {
    localStorage.removeItem(key);
  });

  // Set initial primitive values
  Object.entries(initialState).forEach(([key, value]) => {
    localStorage.setItem(key, value);
  });

  // Set initial objects with proper stringification
  Object.entries(initialObjects).forEach(([key, value]) => {
    localStorage.setItem(key, JSON.stringify(value));
  });

  // Reset all item costs
  localStorage.setItem('itemCosts', JSON.stringify({
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
  }));

  // Clear all quest states
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith('quest_sync_')) {
      localStorage.removeItem(key);
    }
  });

  // Force reload to reset React state
  window.location.reload();
};
