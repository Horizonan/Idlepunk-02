
export const collectJunk = (gameState, setGameState, isSurgeActive = false) => {
  const surgeMultiplier = isSurgeActive ? 2 : 1;
  setGameState.setJunk(prev => prev + (gameState.clickMultiplier * surgeMultiplier));
  setGameState.setClickCount(prev => {
    const newCount = prev + 1;
    localStorage.setItem('clickCount', newCount);
    return newCount;
  });
};

export const handleBuyItem = (cost, junk, setJunk, setNotifications, callback) => {
  if (junk >= cost) {
    setJunk(prev => prev - cost);
    if (callback) callback();
  }
};

export const updateItemCost = (itemCosts, setItemCosts, itemName, multiplier = 1.15) => {
  setItemCosts(prev => ({
    ...prev,
    [itemName]: Math.floor(prev[itemName] * multiplier)
  }));
};

export const handleReset = (type, gameState, setGameState) => {
  switch(type) {
    case 'junk':
      setGameState.setJunk(0);
      break;
    case 'credits':
      setGameState.setCredits(0);
      break;
    case 'all':
      Object.keys(setGameState).forEach(key => {
        if (typeof setGameState[key] === 'function') {
          setGameState[key](0);
        }
      });
      localStorage.clear();
      break;
  }
};
