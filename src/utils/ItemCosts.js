
export const getInitialItemCosts = () => ({
  trashBag: 10,
  trashPicker: 100,
  streetrat: 100,
  cart: 500,
  junkMagnet: 1500,
  clickEnhancer: 2500,
  urbanRecycler: 3000,
  scrapDrone: 7500,
  holoBillboard: 15000,
  autoClicker: 50000,
  autoClickerV2: 150000,
  autoRecycler: 5000000,
  junkRefinery: 500000,
  modularScrapper: 2500000,
  tronicsBoost: 250,
  tronicsBoostII: 750,
  flowRegulator: 3000,
  quantumTap: 1250,
  electroSurgeNode: 35000,
  scratzMiner: 250000,
  clampjawRig: 75000,
});

// Helper function to reset all item costs to initial values
export const resetItemCosts = () => getInitialItemCosts();
