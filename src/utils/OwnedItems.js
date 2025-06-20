
export const getInitialOwnedItems = () => ({
  trashBag: 0,
  trashPicker: 0,
  streetrat: 0,
  cart: 0,
  junkMagnet: 0,
  clickEnhancer: 0,
  urbanRecycler: 0,
  scrapDrone: 0,
  holoBillboard: 0,
  autoClicker: 0,
  autoClickerV2: 0,
  autoRecycler: 0,
  junkRefinery: 0,
  modularScrapper: 0,
  tronicsBoost: 0,
  tronicsBoostII: 0,
  flowRegulator: false,
  quantumTap: false,
  electroSurgeNode: false,
  scratzMiner: 0,
  clampjawRig: 0,
  twitchweaveGauntlets: 0,
  gutterlineExtractor: 0,
  shardMiner: false,
  beaconCore: false,
  circuitOptimization: 0,
  highFreqTap: false,
  reactiveFeedback: false,
  pickupMagnetArray: false,
});

// Helper function to reset all owned items to initial values
export const resetOwnedItems = () => getInitialOwnedItems();

// Helper function to load owned items from localStorage
export const loadOwnedItemsFromStorage = () => {
  const initial = getInitialOwnedItems();
  const loaded = {};
  
  Object.keys(initial).forEach(key => {
    const stored = localStorage.getItem(`owned_${key}`);
    if (stored !== null) {
      // Handle boolean values
      if (typeof initial[key] === 'boolean') {
        loaded[key] = stored === 'true';
      } else {
        // Handle numeric values
        loaded[key] = parseInt(stored) || 0;
      }
    } else {
      loaded[key] = initial[key];
    }
  });
  
  return loaded;
};

// Helper function to save owned items to localStorage
export const saveOwnedItemsToStorage = (ownedItems) => {
  Object.entries(ownedItems).forEach(([key, value]) => {
    localStorage.setItem(`owned_${key}`, value.toString());
  });
};

// Helper function to update a specific owned item
export const updateOwnedItem = (ownedItems, itemKey, newValue) => {
  const updated = { ...ownedItems, [itemKey]: newValue };
  saveOwnedItemsToStorage(updated);
  return updated;
};

// Helper function to increment an owned item count
export const incrementOwnedItem = (ownedItems, itemKey, amount = 1) => {
  const currentValue = ownedItems[itemKey] || 0;
  return updateOwnedItem(ownedItems, itemKey, currentValue + amount);
};
