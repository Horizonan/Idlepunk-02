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

  const calculate10xPrice01 = (baseCost, adjustForBulk = false) => {
    let totalCost = 0;
    let currentCost = baseCost;
    let endCost = 0;

    for(let i = 0; i < 10; i++) { 
      totalCost += currentCost;
      currentCost = Math.floor(currentCost * 1.1);
      if(i == 9){
        endCost = currentCost;
      }
    }
    console.log("Total Cost: " + totalCost + " End Cost: " + endCost);
    return {
      totalCost: adjustForBulk ? Math.floor(totalCost * 1.1) : totalCost,
      endCost: endCost
    };
  };

  const calculate10xPriceJPS = (baseCost, adjustForBulk = false) => {
    let totalCost = 0;
    let currentCost = baseCost;
    let endCost = 0;

    for(let i = 0; i < 10; i++) {
      totalCost += currentCost;
      currentCost = Math.floor(currentCost * 1.15);
      if(i == 9) {
        endCost = currentCost;
      }
    }

    return {
      totalCost: adjustForBulk ? Math.floor(totalCost * 1.15) : totalCost,
      endCost: endCost
    };
  };

  const calculate10x02 = (baseCost, adjustForBulk = false) => {
    let totalCost = 0;
    let currentCost = baseCost;
    let endCost = 0;

    for(let i = 0; i < 10; i++) {
      totalCost += currentCost;
      currentCost = Math.floor(currentCost * 1.2);
      if(i == 9) {
        endCost = currentCost;
      }
    }

    return {
      totalCost: adjustForBulk ? Math.floor(totalCost * 1.2) : totalCost,
      endCost: endCost
    };
  };


  //Manual Clicker Upgrades
  const handleBuyTrashBag = () => {
    const costData = gameState.bulkBuy ? calculate10xPrice01(gameState.itemCosts.trashBag) : {
      totalCost: gameState.itemCosts.trashBag,
      endCost: Math.floor(gameState.itemCosts.trashBag * 1.1)
    };

    if (gameState.junk >= costData.totalCost) {
      console.log("Cost: " + costData.totalCost + " End Cost: " + costData.endCost);

      setGameState.setJunk(prev => prev - costData.totalCost);
      setGameState.setNotifications(prev => [...prev, "Scrap Bag purchased!"]);
      setGameState.setClickMultiplier(prev => prev + (gameState.bulkBuy ? 10 : 1));
      setGameState.setItemCosts(prev => ({...prev, trashBag: costData.endCost}));
      setGameState.setOwnedItems(prev => ({...prev, trashBag: (prev.trashBag || 0)  + (gameState.bulkBuy ? 10 : 1)}));
      setGameState.setHasUpgrade(true);
    }
  };

  const handleBuyPicker = () => {
    const costData = gameState.bulkBuy ? calculate10xPrice01(gameState.itemCosts.trashPicker) : {
      totalCost: gameState.itemCosts.trashPicker,
      endCost: Math.floor(gameState.itemCosts.trashPicker * 1.1)
    };

    if (gameState.junk >= costData.totalCost) {
      setGameState.setJunk(prev => prev - costData.totalCost);
      setGameState.setNotifications(prev => [...prev, "Trash Picker purchased!"]);
      setGameState.setClickMultiplier(prev => prev + (gameState.bulkBuy ? 30 : 3));
      setGameState.setItemCosts(prev => ({...prev, trashPicker: costData.endCost}));
      setGameState.setOwnedItems(prev => ({...prev, trashPicker: (prev.trashPicker || 0) + (gameState.bulkBuy ? 10 : 1)}));
    }
  };

  const handleBuyClickEnhancer = () => {
    const costData = gameState.bulkBuy ? calculate10xPrice01(gameState.itemCosts.clickEnhancer) : {
      totalCost: gameState.itemCosts.clickEnhancer,
      endCost: Math.floor(gameState.itemCosts.clickEnhancer * 1.1)
    };

    if (gameState.junk >= costData.totalCost) {
      setGameState.setJunk(prev => prev - costData.totalCost);
      setGameState.setClickMultiplier(prev => prev + (gameState.bulkBuy ? 100 : 10));
      setGameState.setClickEnhancerLevel(prev => prev + 1);
      setGameState.setItemCosts(prev => ({...prev, clickEnhancer: costData.endCost}));
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
    const costData = gameState.bulkBuy ? calculate10xPriceJPS(gameState.itemCosts.streetrat) : {
      totalCost: gameState.itemCosts.streetrat,
      endCost: Math.floor(gameState.itemCosts.streetrat * 1.15)
    };

    if (gameState.junk >= costData.totalCost) {
      setGameState.setJunk(prev => prev - costData.totalCost);
      setGameState.setNotifications(prev => [...prev, "Streetrat hired!"]);
      setGameState.setPassiveIncome(prev => prev + (gameState.bulkBuy ? 10 : 1));
      setGameState.setItemCosts(prev => ({...prev, streetrat: costData.endCost}));
      setGameState.setOwnedItems(prev => ({...prev, streetrat: (prev.streetrat || 0) + (gameState.bulkBuy ? 10 : 1)}));
      setGameState.setHasHelper(true);
    }
  };

  const handleBuyCart = () => {
    const costData = gameState.bulkBuy ? calculate10xPriceJPS(gameState.itemCosts.cart) : {
      totalCost: gameState.itemCosts.cart,
      endCost: Math.floor(gameState.itemCosts.cart * 1.15)
    };

    if (gameState.junk >= costData.totalCost) {
      setGameState.setJunk(prev => prev - costData.totalCost);
      setGameState.setNotifications(prev => [...prev, "Shopping Cart purchased!"]);
      setGameState.setPassiveIncome(prev => prev + (gameState.bulkBuy ? 50 : 5));
      setGameState.setItemCosts(prev => ({...prev, cart: costData.endCost}));
      setGameState.setOwnedItems(prev => ({...prev, cart: (prev.cart || 0) + (gameState.bulkBuy ? 10 : 1)}));
    }
  };

  const handleBuyJunkMagnet = () => {
    const costData = gameState.bulkBuy ? calculate10xPriceJPS(gameState.itemCosts.junkMagnet) : {
      totalCost: gameState.itemCosts.junkMagnet,
      endCost: Math.floor(gameState.itemCosts.junkMagnet * 1.15)
    };

    if (gameState.junk >= costData.totalCost) {
      setGameState.setJunk(prev => prev - costData.totalCost);
      setGameState.setNotifications(prev => [...prev, "Junk Magnet purchased!"]);
      setGameState.setPassiveIncome(prev => prev + (gameState.bulkBuy ? 100 : 10));
      setGameState.setItemCosts(prev => ({...prev, junkMagnet: costData.endCost}));
      setGameState.setOwnedItems(prev => ({...prev, junkMagnet: (prev.junkMagnet || 0) + (gameState.bulkBuy ? 10 : 1)}));
    }
  };

  const handleBuyUrbanRecycler = () => {
    const costData = gameState.bulkBuy ? calculate10xPriceJPS(gameState.itemCosts.urbanRecycler) : {
      totalCost: gameState.itemCosts.urbanRecycler,
      endCost: Math.floor(gameState.itemCosts.urbanRecycler * 1.15)
    };

    if (gameState.junk >= costData.totalCost) {
      setGameState.setJunk(prev => prev - costData.totalCost);
      setGameState.setNotifications(prev => [...prev, "Urban Recycler purchased!"]);
      setGameState.setPassiveIncome(prev => prev + (gameState.bulkBuy ? 200 : 20));
      setGameState.setItemCosts(prev => ({...prev, urbanRecycler: costData.endCost}));
      setGameState.setOwnedItems(prev => ({...prev, urbanRecycler: (prev.urbanRecycler || 0) + (gameState.bulkBuy ? 10 : 1)}));
    }
  };

  const handleBuyScrapDrone = () => {
    const costData = gameState.bulkBuy ? calculate10xPriceJPS(gameState.itemCosts.scrapDrone) : {
      totalCost: gameState.itemCosts.scrapDrone,
      endCost: Math.floor(gameState.itemCosts.scrapDrone * 1.15)
    };

    if (gameState.junk >= costData.totalCost) {
      setGameState.setJunk(prev => prev - costData.totalCost);
      setGameState.setNotifications(prev => [...prev, "Scrap Drone Deployed – +25 JPS"]);
      setGameState.setPassiveIncome(prev => prev + (gameState.bulkBuy ? 250 : 25));
      setGameState.setItemCosts(prev => ({...prev, scrapDrone: costData.endCost}));
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
    const costData = gameState.bulkBuy ? calculate10x02(gameState.itemCosts.holoBillboard) : {
      totalCost: gameState.itemCosts.holoBillboard,
      endCost: Math.floor(gameState.itemCosts.holoBillboard * 1.2)
    };
    
    if (gameState.junk >= costData.totalCost) {
      setGameState.setJunk(prev => prev - costData.totalCost);
      setGameState.setNotifications(prev => [...prev, "Holo Billboard Online – City scrappers stare in awe (+10% Junk/sec globally)!"]);
      setGameState.setGlobalJpsMultiplier(prev => {
        const newValue = prev + (gameState.bulkBuy ? 1 : 0.1);
        localStorage.setItem('globalJpsMultiplier', newValue);
        return newValue;
      });
      setGameState.setItemCosts(prev => ({...prev, holoBillboard: costData.endCost}));
      setGameState.setOwnedItems(prev => ({...prev, holoBillboard: (prev.holoBillboard || 0) + (gameState.bulkBuy ? 10 : 1)}));

      if (!gameState.holoBillboard) {
        window.dispatchEvent(new CustomEvent('nextNews', { 
          detail: { message: "Cogfather nods approvingly: 'Advertising your junk empire now? Ambitious, kid. I like it.'" }
        }));
      }
    }
  };

  //Automation
  const handleBuyAutoClicker = () => {
    const costData = gameState.bulkBuy ? calculate10xPriceJPS(gameState.itemCosts.autoClicker) : {
      totalCost: gameState.itemCosts.autoClicker,
      endCost: Math.floor(gameState.itemCosts.autoClicker * 1.15)
    };

    if (gameState.junk >= costData.totalCost) {
      setGameState.setJunk(prev => prev - costData.totalCost);
      setGameState.setAutoClicks(prev => prev + (gameState.bulkBuy ? 10 : 1));
      setGameState.setAutoClickerV1Count(prev => prev + (gameState.bulkBuy ? 10 : 1)); 
      setGameState.setItemCosts(prev => ({...prev, autoClicker: costData.endCost}));
      setGameState.setNotifications(prev => [...prev, "Auto Clicker Bot purchased!"]);
      window.dispatchEvent(new CustomEvent('nextNews', { 
        detail: { message: "Cogfather whispers: 'Sit back, kid. Let the bots handle it from here.'" }
      }));
    }
  };

  const handleBuyAutoClickerV2 = () => {
    const costData = gameState.bulkBuy ? calculate10x02(gameState.itemCosts.autoClickerV2) : {
      totalCost: gameState.itemCosts.autoClickerV2,
      endCost: Math.floor(gameState.itemCosts.autoClickerV2 * 1.2)
    };

    if (gameState.junk >= costData.totalCost && gameState.autoClickerV1Count >= (gameState.bulkBuy ? 10 : 1)) {
      setGameState.setJunk(prev => prev - costData.totalCost);
      setGameState.setAutoClicks(prev => prev + (gameState.bulkBuy ? 10 : 1)); 
      setGameState.setAutoClickerV1Count(prev => prev - (gameState.bulkBuy ? 10 : 1)); 
      setGameState.setAutoClickerV2Count(prev => prev + (gameState.bulkBuy ? 10 : 1)); 
      setGameState.setItemCosts(prev => ({
        ...prev, 
        autoClickerV2: costData.endCost
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
    if (gameState.junk >= gameState.bulkBuy ? calculate10x02(gameState.itemCosts.junkRefinery) : gameState.itemCosts.junkRefinery) {
      const costData = gameState.bulkBuy ? calculate10x02(gameState.itemCosts.junkRefinery) : {
        totalCost: gameState.itemCosts.junkRefinery,
        endCost: Math.floor(gameState.itemCosts.junkRefinery * 1.2)
      };
      setGameState.setJunk(prev => prev - costData.cost);
      setGameState.setPassiveIncome(prev => prev + (gameState.bulkBuy ? 500 : 50));
      setGameState.setOwnedItems(prev => ({...prev, junkRefinery: (prev.junkRefinery || 0) + gameState.bulkBuy ? 10:1}));
      setGameState.setItemCosts(prev => ({...prev, junkRefinery: Math.floor(costData.endCost * 1.2)}));
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


  const incrementUpgradeCount = () => {
    const upgradeCount = parseInt(localStorage.getItem('upgradeCount') || '0');
    const newCount = upgradeCount + 1;
    localStorage.setItem('upgradeCount', newCount);
  };

  const handleBuyTronicsBoost = () => {
    console.log("Is unlocked:" + !localStorage.getItem('unlocked_tronics_boost') + gameState.electroShards);


    if (!localStorage.getItem('unlocked_tronics_boost') && gameState.electroShards >= 3) {
      localStorage.setItem("unlocked_tronics_boost", true)
      setGameState.setElectroShards(prev => {
        const newValue = prev - 3;
        localStorage.setItem('electroShards', newValue.toString());
        return newValue;
      });

      setGameState.setNotifications(prev => [...prev, "Tronics Click Boost I unlocked!"]);

      } else if(gameState.tronics >= gameState.itemCosts.tronicsBoost){

      const costData = gameState.bulkBuy ? calculate10xPrice01(gameState.itemCosts.tronicsBoost) : {
        totalCost: gameState.itemCosts.tronicsBoost,
        endCost: Math.floor(gameState.itemCosts.tronicsBoost * 1.1)
      };

          setGameState.setTronics(prev => prev - costData.totalCost);
          setGameState.setClickMultiplier(prev => prev + (gameState.bulkBuy ? 10 : 1));
          setGameState.setItemCosts(prev => ({...prev, tronicsBoost: Math.floor(costData.endCost)}));

          const newBoostCount = (parseInt(localStorage.getItem('tronics_boost_count') || '0') + (gameState.bulkBuy ? 10 : 1));

          localStorage.setItem('tronics_boost_count', newBoostCount);
          setGameState.setNotifications(prev => [...prev, "Tronics Click Boost I purchased! +1 Tronics per click"]);
          incrementUpgradeCount();
    }
  }

  {

    const handleBuyTronicsBoostII = () => {

          if (gameState.tronics >= gameState.itemCosts.tronicsBoostII) {
            const cost = gameState.bulkBuy ? calculate10x02(gameState.itemCosts.tronicsBoostII, true) : gameState.itemCosts.tronicsBoostII;

            localStorage.setItem('tronics_boost_II_count', (parseInt(localStorage.getItem('tronics_boost_II_count') || '0') + 1).toString());
            setGameState.setItemCosts(prev => ({...prev, tronicsBoostII: Math.floor(cost * 1.2)}));
            setGameState.setTronics(prev => prev - cost);
            setGameState.setNotifications(prev => [...prev, "Tronics Click Boost II purchased! +2 Tronics per click"]);
            incrementUpgradeCount();
          }
    }


  return {
    collectJunk,
    handleBuyTrashBag,
    handleBuyPicker,
    calculate10xPriceJunkClicker: calculate10xPrice01,
    calculate10xPriceJPS,
    calculate10xPriceBillBoard: calculate10x02,
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
    handleBuyTronicsBoost,
    handleBuyTronicsBoostII
  };
}}