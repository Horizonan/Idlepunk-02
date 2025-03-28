// Initial game state values
const initialState = {
  junk: '0',
  credits: '0',
  tronics: '0',
  clickCount: '0',
  clickMultiplier: '1',
  passiveIncome: '0',
  autoClicks: '0',
  electronicsUnlock: 'false',
  clickEnhancerLevel: '0',
  autoClickerV1Count: '0',
  electroShards: '0',
  beaconCount: '0',
  globalJpsMultiplier: '1',
  quantum_tap_purchased: 'false',
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
    autoClicker: 0,
    autoClickerV2: 0
  },
  creditStoreItems: {},
  electroStoreItems: {}
};

export const resetAllProgress = () => {
  // Clear ALL localStorage first
  localStorage.clear();

  // Set initial primitive values
  Object.entries(initialState).forEach(([key, value]) => {
    localStorage.setItem(key, value);
  });

  // Set initial objects with proper stringification
  Object.entries(initialObjects).forEach(([key, value]) => {
    localStorage.setItem(key, JSON.stringify(value));
  });

  // Clear any quest states
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith('quest_sync_')) {
      localStorage.removeItem(key);
    }
  });

  // Clear any specific progression flags
  localStorage.removeItem('unlocked_tronics_boost');
  localStorage.removeItem('tronics_boost_count');
  localStorage.removeItem('tronics_boost_cost');
  localStorage.removeItem('prestigeUnlocked');
  localStorage.removeItem('hasPrestiged');
  localStorage.removeItem('cogfatherEvent');
  localStorage.removeItem('cogfatherLore');
  localStorage.removeItem('surgeCount');
  localStorage.removeItem('circuit_optimization_count');
  localStorage.removeItem('sidebarLocked');
  localStorage.removeItem('sidebarLeft');
  localStorage.removeItem('sidebarTop');
  localStorage.removeItem('craftedItems');
  localStorage.removeItem('skillXp');
  localStorage.removeItem('lastShardExtractorUse');


  // Force a complete page reload to reset all React states
  window.location.reload();
};