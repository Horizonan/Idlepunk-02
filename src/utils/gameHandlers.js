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

  const calculate10xPriceJunkClicker = (baseCost, adjustForBulk = false) => {
    let totalCost = 0;
    let currentCost = baseCost;

    for(let i = 0; i < 10; i++) {
      totalCost += currentCost;
      currentCost = Math.floor(currentCost * 1.1);
    }

    return adjustForBulk ? Math.floor(totalCost * 1.1) : totalCost;
  };

  const calculate10xPriceJPS = (baseCost, adjustForBulk = false) => {
    let totalCost = 0;
    let currentCost = baseCost;

    for(let i = 0; i < 10; i++) {
      totalCost += currentCost;
      currentCost = Math.floor(currentCost * 1.15);
    }

    return adjustForBulk ? Math.floor(totalCost * 1.15) : totalCost;
  };

  const calculate10xPriceBillBoard = (baseCost, adjustForBulk = false) => {
    let totalCost = 0;
    let currentCost = baseCost;

    for(let i = 0; i < 10; i++) {
      totalCost += currentCost;
      currentCost = Math.floor(currentCost * 1.2);
    }

    return adjustForBulk ? Math.floor(totalCost * 1.2) : totalCost;
  };


  //Manual Clicker Upgrades
  const handleBuyTrashBag = () => {
    if (gameState.junk >= (gameState.bulkBuy ? calculate10xPriceJunkClicker(gameState.itemCosts.trashBag, true) : gameState.itemCosts.trashBag)) {
      const cost = gameState.bulkBuy ? calculate10xPriceJunkClicker(gameState.itemCosts.trashBag, true) : gameState.itemCosts.trashBag;
      setGameState.setJunk(prev => prev - cost);
      setGameState.setNotifications(prev => [...prev, "Scrap Bag purchased!"]);
      setGameState.setClickMultiplier(prev => prev + (gameState.bulkBuy ? 10 : 1));
      setGameState.setItemCosts(prev => ({...prev, trashBag: Math.floor(cost * 1.1)}));
      setGameState.setOwnedItems(prev => ({...prev, trashBag: (prev.trashBag || 0)  + (gameState.bulkBuy ? 10 : 1)}));
      setGameState.setHasUpgrade(true);
    }
  };

  const handleBuyPicker = () => {
    if (gameState.junk >= (gameState.bulkBuy ? calculate10xPriceJunkClicker(gameState.itemCosts.trashPicker, true) : gameState.itemCosts.trashPicker)) {
      const cost = gameState.bulkBuy ? calculate10xPriceJunkClicker(gameState.itemCosts.trashPicker, true) : gameState.itemCosts.trashPicker;
      setGameState.setJunk(prev => prev - cost);
      setGameState.setNotifications(prev => [...prev, "Trash Picker purchased!"]);
      setGameState.setClickMultiplier(prev => prev + (gameState.bulkBuy ? 30 : 3));
      setGameState.setItemCosts(prev => ({...prev, trashPicker: Math.floor(cost * 1.1)}));
      setGameState.setOwnedItems(prev => ({...prev, trashPicker: (prev.trashPicker || 0) + (gameState.bulkBuy ? 10 : 1)}));
    }
  };

  const handleBuyClickEnhancer = () => {
    if (gameState.junk >= (gameState.bulkBuy ? calculate10xPriceJunkClicker(gameState.itemCosts.clickEnhancer, true) : gameState.itemCosts.clickEnhancer)) {
      const cost = gameState.bulkBuy ? calculate10xPriceJunkClicker(gameState.itemCosts.clickEnhancer, true) : gameState.itemCosts.clickEnhancer;
      setGameState.setJunk(prev => prev - cost);
      setGameState.setClickMultiplier(prev => prev + (gameState.bulkBuy ? 100 : 10));
      setGameState.setClickEnhancerLevel(prev => prev + 1);
      setGameState.setItemCosts(prev => ({...prev, clickEnhancer: Math.floor(cost * 1.1)}));
      setGameState.setOwnedItems(prev => ({...prev, clickEnhancer: (prev.clickEnhancer || 0) + (gameState.bulkBuy ? 10 : 1)}));
      setGameState.setNotifications(prev => [...prev, "Click Enhancer purchased!"]);
      if (setGameState.clickEnhancerLevel === 0) {
        setGameState.setNotifications(prev => [...prev, "Finger strength increasing! Bet you never thought clicking would become your day job."]);
        window.dispatchEvent(new CustomEvent('nextNews', { 
          detail: { message: "Cogfather nods approvingly: 'Clicks mean business. Keep 'em coming.'" }
        }));
      }
    }
  }


  //JPS Upgrades
  const handleBuyStreetrat = () => {
    if (gameState.junk >= gameState.bulkBuy ? calculate10xPriceJPS(gameState.itemCosts.streetrat) : gameState.itemCosts.streetrat) {
      const cost = gameState.bulkBuy ? calculate10xPriceJPS(gameState.itemCosts.streetrat) : gameState.itemCosts.streetrat;
      setGameState.setJunk(prev => prev - cost);
      setGameState.setNotifications(prev => [...prev, "Streetrat hired!"]);
      setGameState.setPassiveIncome(prev => prev + gameState.bulkBuy ? 10 : 1);
      setGameState.setItemCosts(prev => ({...prev, streetrat: Math.floor(cost * 1.15)}));
      setGameState.setOwnedItems(prev => ({...prev, streetrat: (prev.streetrat || 0) + (gameState.bulkBuy ? 10 : 1)}));
      setGameState.setHasHelper(true);
    }
  };

  const handleBuyCart = () => {
    if (gameState.junk >= gameState.bulkBuy ? calculate10xPriceJPS(gameState.itemCosts.cart) : gameState.itemCosts.cart) {
      const cost = gameState.bulkBuy ? calculate10xPriceJPS(gameState.itemCosts.cart) : gameState.itemCosts.cart;
      setGameState.setJunk(prev => prev - cost);
      setGameState.setNotifications(prev => [...prev, "Shopping Cart purchased!"]);
      setGameState.setPassiveIncome(prev => prev + (gameState.bulkBuy ? 50 : 5));
      setGameState.setItemCosts(prev => ({...prev, cart: Math.floor(cost* 1.15)}));
      setGameState.setOwnedItems(prev => ({...prev, cart: (prev.cart || 0) + (gameState.bulkBuy ? 10 : 1)}));
    }
  };

  const handleBuyJunkMagnet = () => {
    if (gameState.junk >= gameState.bulkBuy ? calculate10xPriceJPS(gameState.itemCosts.junkMagnet) : gameState.itemCosts.junkMagnet) {
      const cost = gameState.bulkBuy ? calculate10xPriceJPS(gameState.itemCosts.junkMagnet) : gameState.itemCosts.junkMagnet;
      setGameState.setJunk(prev => prev - cost);
      setGameState.setNotifications(prev => [...prev, "Junk Magnet purchased!"]);
      setGameState.setPassiveIncome(prev => prev + (gameState.bulkBuy ? 100 : 10));
      setGameState.setItemCosts(prev => ({...prev, junkMagnet: Math.floor(cost * 1.15)}));
      setGameState.setOwnedItems(prev => ({...prev, junkMagnet: (prev.junkMagnet || 0) + (gameState.bulkBuy ? 10 : 1)}));
    }
  };

  const handleBuyUrbanRecycler = () => {
    if (gameState.junk >= gameState.buyBulk ? calculate10xPriceJPS(gameState.itemCosts.urbanRecycler) : gameState.itemCosts.urbanRecycler) {
      const cost = gameState.buyBulk ? calculate10xPriceJPS(gameState.itemCosts.urbanRecycler) : gameState.itemCosts.urbanRecycler;
      setGameState.setJunk(prev => prev - cost);
      setGameState.setNotifications(prev => [...prev, "Urban Recycler purchased!"]);
      setGameState.setPassiveIncome(prev => prev + (gameState.bulkBuy ? 200 : 20));
      setGameState.setItemCosts(prev => ({...prev, urbanRecycler: Math.floor(cost * 1.15)}));
      setGameState.setOwnedItems(prev => ({...prev, urbanRecycler: (prev.urbanRecycler || 0) + (gameState.bulkBuy ? 10 : 1)}));
    }
  };

  const handleBuyScrapDrone = () => {
    if (gameState.junk >= (gameState.bulkBuy ? calculate10xPriceJPS(gameState.itemCosts.scrapDrone) : gameState.itemCosts.scrapDrone)) {
      const cost = gameState.bulkBuy ? calculate10xPriceJPS(gameState.itemCosts.scrapDrone) : gameState.itemCosts.scrapDrone;
      setGameState.setJunk(prev => prev - cost);
      setGameState.setNotifications(prev => [...prev, "Scrap Drone Deployed – +25 JPS"]);
      setGameState.setPassiveIncome(prev => prev + (gameState.bulkBuy ? 250 : 25));
      setGameState.setItemCosts(prev => ({...prev, scrapDrone: Math.floor(cost * 1.15)}));
      setGameState.setOwnedItems(prev => ({...prev, scrapDrone: (prev.scrapDrone || 0) + (gameState.bulkBuy ? 10 : 1)}));
      
      if (!gameState.scrapDrone) {
        window.dispatchEvent(new CustomEvent('nextNews', { 
          detail: { message: "Cogfather: You've got drones now? Look at you, corporate overlord in the making." }
        }));
        window.dispatchEvent(new CustomEvent('addNews', {
          detail: { message: "Automated helper deployed. Don't expect it to take breaks." }
        }));
      }
    }
  };

  const handleBuyHoloBillboard = () => {
    if (gameState.junk >= gameState.bulkBuy ? calculate10xPriceBillBoard(gameState.itemCosts.holoBillboard) : gameState.itemCosts.holoBillboard) {
      const cost = gameState.bulkBuy ? calculate10xPriceBillBoard(gameState.itemCosts.holoBillboard) : gameState.itemCosts.holoBillboard;
      setGameState.setJunk(prev => prev - cost);
      setGameState.setNotifications(prev => [...prev, "Holo Billboard Online – City scrappers stare in awe (+10% Junk/sec globally)!"]);
      setGameState.setGlobalJpsMultiplier(prev => {
        const newValue = prev + (gameState.bulkBuy ? 1 : 0.1);
        localStorage.setItem('globalJpsMultiplier', newValue);
        return newValue;
      });
      setGameState.setItemCosts(prev => ({...prev, holoBillboard: Math.floor(cost * 1.2)}));
      setGameState.setOwnedItems(prev => ({...prev, holoBillboard: (prev.holoBillboard || 0) + (gameState.bulkBuy ? 10 : 1)}));

      if (!gameState.holoBillboard) {
        window.dispatchEvent(new CustomEvent('nextNews', { 
          detail: { message: "Cogfather nods approvingly: 'Advertising your junk empire now? Ambitious, kid. I like it.'" }
        }));
      }
    }
  };

  //Automation
  const handleBuyAutoClicker = () =>{
    if (gameState.junk >= gameState.bulkBuy ? calculate10xPriceJPS(gameState.itemCosts.autoClicker) : gameState.itemCosts.autoClicker) {
      const cost = gameState.bulkBuy ? calculate10xPriceJPS(gameState.itemCosts.autoClicker) : gameState.itemCosts.autoClicker;
      setGameState.setJunk(prev => prev - cost);
      setGameState.setAutoClicks(prev => prev + (gameState.bulkBuy ? 10 : 1));
      setGameState.setAutoClickerV1Count(prev => prev + (gameState.bulkBuy ? 10 : 1)); 
      setGameState.setItemCosts(prev => ({...prev, autoClicker: Math.floor(cost * 1.15)}));
      setGameState.setNotifications(prev => [...prev, "Auto Clicker Bot purchased!"]);
      window.dispatchEvent(new CustomEvent('nextNews', { 
        detail: { message: "Cogfather whispers: 'Sit back, kid. Let the bots handle it from here.'" }
      }));
    }};
  
  const handleBuyAutoClickerV2 = () => { 
    if (gameState.junk >= (gameState.bulkBuy ? calculate10xPriceBillBoard(gameState.itemCosts.autoClickerV2) : gameState.itemCosts.autoClickerV2) && gameState.autoClickerV1Count >= (gameState.bulkBuy ? 10 : 1)) { 
      const cost = gameState.bulkBuy ? calculate10xPriceBillBoard(gameState.itemCosts.autoClickerV2) : gameState.itemCosts.autoClickerV2;
      setGameState.setJunk(prev => prev - cost);
      setGameState.setAutoClicks(prev => prev + (gameState.bulkBuy ? 10 : 1)); 
      setGameState.setAutoClickerV1Count(prev => prev - (gameState.bulkBuy ? 10 : 1)); 
      setGameState.setAutoClickerV2Count(prev => prev + (gameState.bulkBuy ? 10 : 1)); 
        setGameState.setItemCosts(prev => ({
          ...prev, 
          autoClickerV2: Math.floor(cost * 1.2)
        }));
        setGameState.setNotifications(prev => [...prev, "Auto Clicker Bot v2.0 purchased! (Consumed 1 Auto Clicker Bot)"]);
        window.dispatchEvent(new CustomEvent('nextNews', { 
          detail: { message: "Cogfather: 'Twice the clicks, twice the profits. Now that's efficiency!'" }
        }));
      }
  };


  //After Prestige
  const handleBuyJunkRefinery = () => {
    console.log(!localStorage.getItem("modularScrapperPurchased"))
    if (gameState.junk >= gameState.bulkBuy ? calculate10xPriceBillBoard(gameState.itemCosts.junkRefinery) : gameState.itemCosts.junkRefinery) {
      const cost = gameState.bulkBuy ? calculate10xPriceBillBoard(gameState.itemCosts.junkRefinery) : gameState.itemCosts.junkRefinery;
      setGameState.setJunk(prev => prev - cost);
      setGameState.setPassiveIncome(prev => prev + (gameState.bulkBuy ? 500 : 50));
      setGameState.setOwnedItems(prev => ({...prev, junkRefinery: (prev.junkRefinery || 0) + gameState.bulkBuy ? 10:1}));
      setGameState.setItemCosts(prev => ({...prev, junkRefinery: Math.floor(cost * 1.2)}));
      setGameState.setNotifications(prev => [...prev, "Junk Refinery purchased! +50 Junk/sec"]);

      if (!gameState.ownedItems.junkRefinery) {
        window.dispatchEvent(new CustomEvent('nextNews', { 
          detail: { message: "Cogfather: A Refinery? Now you're thinking industrial scale." }
        }));
      }
    }
  };


  const handleBuyModularScrapper = () => {
    if (gameState.junk >= gameState.itemCosts.modularScrapper && !localStorage.getItem("modularScrapperPurchased")){

      setGameState.setJunk(prev => prev - gameState.itemCosts.modularScrapper);
      setGameState.setPassiveIncome(prev => prev * 2);
      setGameState.setOwnedItems(prev => ({...prev, modularScrapper: 1}));
      setGameState.setNotifications(prev => [...prev, "Modular Scrapper Rig installed! Junk/sec doubled!"]);
      localStorage.setItem("modularScrapperPurchased", "true");

      window.dispatchEvent(
        new CustomEvent("nextNews", {
          detail: {
            message:
              "Cogfather: Now that's what I call an upgrade. Your operation just got serious.",
          }
        })
      )
    }
  }
  


  //Tronics Store
  const handleBuyTronicsBoost = () => {
    console.log(gameState.tronics);
    
    if (!localStorage.getItem('unlocked_tronics_boost') === "true" && electroShards >= 3) {
      console.log("Inside Unlock");
      gameState.setElectroShards(prev => {
        const newValue = prev - 3;
        localStorage.setItem('electroShards', newValue.toString());
        return newValue;
      });
      
      setNotifications(prev => [...prev, "Tronics Click Boost I unlocked!"]);
      
      } else if(gameState.tronics >= gameState.itemCosts.tronicsBoost){
      
          setGameState.setTronics(prev => prev - gameState.itemCosts.tronicsBoost);
          setGameState.setClickMultiplier(prev => prev + 1);
          setGameState.setItemCosts(prev => ({...prev, tronicsBoost: Math.floor(gameState.itemCosts.tronicsBoost * 1.1)}));
      
          const newBoostCount = (parseInt(localStorage.getItem('tronics_boost_count') || '0') + 1);
      
          localStorage.setItem('tronics_boost_count', newBoostCount);
          setGameState.setNotifications(prev => [...prev, "Tronics Click Boost I purchased! +1 Tronics per click"]);
    }
  }
       


  return {
    collectJunk,
    handleBuyTrashBag,
    handleBuyPicker,
    calculate10xPriceJunkClicker,
    calculate10xPriceJPS,
    calculate10xPriceBillBoard,
    handleBuyClickEnhancer,
    handleBuyStreetrat,
    handleBuyCart,
    handleBuyJunkMagnet,
    handleBuyUrbanRecycler,
    handleBuyScrapDrone,
    handleBuyHoloBillboard,
    handleBuyAutoClicker,
    handleBuyAutoClickerV2,
    handleBuyJunkRefinery,  
    handleBuyModularScrapper,
    handleBuyTronicsBoost
  };
};