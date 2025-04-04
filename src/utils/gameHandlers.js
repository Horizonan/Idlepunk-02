export const gameHandlers = () => {


const collectJunk = (gameState, setGameState, isSurgeActive = false) => {
  const surgeMultiplier = isSurgeActive ? 2 : 1;
  setGameState.setJunk(prev => prev + (gameState.clickMultiplier * surgeMultiplier));
  setGameState.setClickCount(prev => {
    const newCount = prev + 1;
    localStorage.setItem('clickCount', newCount);
    return newCount;
  });
};

const handleBuyTrashBag = () => {
  if (junk >= (bulkBuy ? calculate10xPriceJunkClicker(itemCosts.trashBag) : itemCosts.trashBag)) {
    const cost = bulkBuy ? calculate10xPriceJunkClicker(itemCosts.trashBag) : itemCosts.trashBag;
    setJunk(prev => prev - cost);
    setNotifications(prev => [...prev, "Scrap Bag purchased!"]);
    setClickMultiplier(prev => prev + (bulkBuy ? 10 : 1));
    setItemCosts(prev => ({...prev, trashBag: Math.floor(prev.trashBag * 1.1)}));
    setOwnedItems(prev => ({...prev, trashBag: prev.trashBag + (bulkBuy ? 10 : 1)}));
    setHasUpgrade(true);
  }
};



  return handleBuyTrashBag;
}