// Initial game state values
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
  skillLevels: '{"scavengingFocus":0,"greaseDiscipline":0}',
  preservedHelper: '',
  hadFirstSurge: 'false',
  autoClickerV1Count: '0'
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
    autoClicker: 0,
    autoClickerV2: 0
  },
  creditStoreItems: {},
  electroStoreItems: {}
};

export const resetAllProgress = () => {
  // Clear all localStorage first
  localStorage.clear();

  // Set initial primitive values
  Object.entries(initialState).forEach(([key, value]) => {
    localStorage.setItem(key, value);
  });

  // Set initial objects with proper stringification
  Object.entries(initialObjects).forEach(([key, value]) => {
    localStorage.setItem(key, JSON.stringify(value));
  });

  // Clear all quest states
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith('quest_sync_')) {
      localStorage.removeItem(key);
    }
  });

  // Force page reload to reset all React states
  window.location.reload();
};