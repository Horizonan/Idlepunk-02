
export const gameHandlers = (gameState, setGameState) => {
  const collectJunk = (isSurgeActive = false) => {
    const surgeMultiplier = isSurgeActive ? 2 : 1;
    setGameState.setJunk(prev => prev + (gameState.clickMultiplier * surgeMultiplier));
    setGameState.setClickCount(prev => {
      const newCount = prev + 1;
      localStorage.setItem('clickCount', newCount);
      return newCount;
    });
  };

  const handleBuyTrashBag = () => {
    if (gameState.junk >= (gameState.bulkBuy ? calculate10xPriceJunkClicker(gameState.itemCosts.trashBag) : gameState.itemCosts.trashBag)) {
      const cost = gameState.bulkBuy ? calculate10xPriceJunkClicker(gameState.itemCosts.trashBag) : gameState.itemCosts.trashBag;
      setGameState.setJunk(prev => prev - cost);
      setGameState.setNotifications(prev => [...prev, "Scrap Bag purchased!"]);
      setGameState.setClickMultiplier(prev => prev + (gameState.bulkBuy ? 10 : 1));
      setGameState.setItemCosts(prev => ({...prev, trashBag: Math.floor(prev.trashBag * 1.1)}));
      setGameState.setOwnedItems(prev => ({...prev, trashBag: prev.trashBag + (gameState.bulkBuy ? 10 : 1)}));
      setGameState.setHasUpgrade(true);
    }
  };

  const calculate10xPriceJunkClicker = (baseCost) => {
    let totalCost = 0;
    let currentCost = baseCost;

    for(let i = 0; i < 10; i++) {
      totalCost += currentCost;
      currentCost = Math.floor(currentCost * 1.1);
    }
    return totalCost;
  };

  const handleBuyPicker = () => {
    if (gameState.junk >= gameState.itemCosts.trashPicker) {
      setGameState.setJunk(prev => prev - gameState.itemCosts.trashPicker);
      setGameState.setNotifications(prev => [...prev, "Trash Picker purchased!"]);
      setGameState.setClickMultiplier(prev => prev + 3);
      setGameState.setItemCosts(prev => ({...prev, trashPicker: Math.floor(prev.trashPicker * 1.1)}));
      setGameState.setOwnedItems(prev => ({...prev, trashPicker: prev.trashPicker + 1}));
    }
  };

  return {
    collectJunk,
    handleBuyTrashBag,
    handleBuyPicker,
    calculate10xPriceJunkClicker
  };
};