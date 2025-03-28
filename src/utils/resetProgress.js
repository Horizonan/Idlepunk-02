
export const resetAllProgress = () => {
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
    ascension_tab_clicked: 'false'
  };

  // Clear all localStorage
  localStorage.clear();

  // Set initial values
  Object.entries(initialState).forEach(([key, value]) => {
    localStorage.setItem(key, value);
  });

  // Reset object-based storage
  localStorage.setItem('achievements', JSON.stringify([]));
  localStorage.setItem('craftingInventory', '{}');
  localStorage.setItem('ownedItems', '{}');
  localStorage.setItem('creditStoreItems', '{}');

  // Force page reload to reset all React states
  window.location.href = window.location.href;
};
