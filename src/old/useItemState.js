
import { useState, useEffect } from 'react';

export const useItemState = () => {
  const [itemCosts, setItemCosts] = useState(() => JSON.parse(localStorage.getItem('itemCosts')) || {
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
    junkRefinery: 500000,
    modularScrapper: 2500000,
  });

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
    autoClickerV2: 0,
    autoClickerV1: 0,
    junkRefinery: 0,
    modularScrapper: 0,
  });

  useEffect(() => {
    localStorage.setItem('itemCosts', JSON.stringify(itemCosts));
    localStorage.setItem('ownedItems', JSON.stringify(ownedItems));
  }, [itemCosts, ownedItems]);

  return {
    itemCosts, setItemCosts,
    ownedItems, setOwnedItems
  };
};
