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

      // Check if reinforcement upgrade is purchased to determine click power per bag
      const hasReinforcementUpgrade = localStorage.getItem('scrapBagUpgrade') === 'true';
      const clickPowerPerBag = hasReinforcementUpgrade ? 2 : 1;
      const bagsToAdd = gameState.bulkBuy ? 10 : 1;

      setGameState.setClickMultiplier(prev => prev + (bagsToAdd * clickPowerPerBag));
      setGameState.setItemCosts(prev => ({...prev, trashBag: costData.endCost}));
      setGameState.setOwnedItems(prev => ({...prev, trashBag: (prev.trashBag || 0) + bagsToAdd}));
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

      // Check if wrist braces upgrade is purchased to determine click power per picker
      const hasWristBracesUpgrade = localStorage.getItem('trashPickerUpgrade') === 'true';
      const clickPowerPerPicker = hasWristBracesUpgrade ? 6 : 5; // +1 from upgrade
      const pickersToAdd = gameState.bulkBuy ? 10 : 1;

      setGameState.setClickMultiplier(prev => prev + (pickersToAdd * clickPowerPerPicker));
      setGameState.setItemCosts(prev => ({...prev, trashPicker: costData.endCost}));
      setGameState.setOwnedItems(prev => ({...prev, trashPicker: (prev.trashPicker || 0) + pickersToAdd}));
    }
  };

  const handleBuyClickEnhancer = () => {
    const costData = gameState.bulkBuy ? calculate10xPrice01(gameState.itemCosts.clickEnhancer) : {
      totalCost: gameState.itemCosts.clickEnhancer,
      endCost: Math.floor(gameState.itemCosts.clickEnhancer * 1.1)
    };

    if (gameState.junk >= costData.totalCost) {
      setGameState.setJunk(prev => prev - costData.totalCost);

      // Check if overclock upgrade is purchased to determine click power per enhancer
      const hasOverclockUpgrade = localStorage.getItem('clickEnhancerUpgrade') === 'true';
      const clickPowerPerEnhancer = hasOverclockUpgrade ? 13 : 10; // +3 from upgrade
      const enhancersToAdd = gameState.bulkBuy ? 10 : 1;

      setGameState.setClickMultiplier(prev => prev + (enhancersToAdd * clickPowerPerEnhancer));
      setGameState.setClickEnhancerLevel(prev => prev + 1);
      setGameState.setItemCosts(prev => ({...prev, clickEnhancer: costData.endCost}));
      setGameState.setOwnedItems(prev => ({...prev, clickEnhancer: (prev.clickEnhancer || 0) + enhancersToAdd}));
      setGameState.setNotifications(prev => [...prev, "Click Enhancer purchased!"]);
      if (setGameState.clickEnhancerLevel === 0) {
        setGameState.setNotifications(prev => [...prev, "Finger strength increasing! Bet you never thought clicking would become your day job."]);
        window.dispatchEvent(new CustomEvent('nextNews', { 
          detail: { message: "Cogfather nods approvingly: 'Clicks mean business. Keep 'em coming.'" }
        }));
      }
    }
  }

  const handleBuyClampjawRig = () => {
    const costData = gameState.bulkBuy ? calculate10xPrice01(gameState.itemCosts.clampjawRig) : {
      totalCost: gameState.itemCosts.clampjawRig,
      endCost: Math.floor(gameState.itemCosts.clampjawRig * 1.1)
    };

    if (gameState.junk >= costData.totalCost) {
      setGameState.setJunk(prev => prev - costData.totalCost);
      setGameState.setClickMultiplier(prev => prev + (gameState.bulkBuy ? 120 : 12));
      setGameState.setItemCosts(prev => ({...prev, clampjawRig: costData.endCost}));
      setGameState.setOwnedItems(prev => ({...prev, clampjawRig: (prev.clampjawRig || 0) + (gameState.bulkBuy ? 10 : 1)}));
      setGameState.setNotifications(prev => [...prev, "Clampjaw Rig purchased!"]);
      window.dispatchEvent(new CustomEvent('nextNews', { 
        detail: { message: "Cogfather: 'Loader bot parts? That's some serious salvage work, kid.'" }
      }));
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

      // Check if efficiency upgrade is purchased to determine income per streetrat
      const hasEfficiencyUpgrade = localStorage.getItem('streetratUpgrade') === 'true';
      const incomePerStreetrat = hasEfficiencyUpgrade ? 2 : 1;
      const streetratsToAdd = gameState.bulkBuy ? 10 : 1;

      setGameState.setPassiveIncome(prev => prev + (streetratsToAdd * incomePerStreetrat));
      setGameState.setItemCosts(prev => ({...prev, streetrat: costData.endCost}));
      setGameState.setOwnedItems(prev => ({...prev, streetrat: (prev.streetrat || 0) + streetratsToAdd}));
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

      // Check if suspension mods upgrade is purchased to determine income per cart
      const hasSuspensionUpgrade = localStorage.getItem('cartUpgrade') === 'true';
      const incomePerCart = hasSuspensionUpgrade ? 10 : 5; // +5 from upgrade
      const cartsToAdd = gameState.bulkBuy ? 10 : 1;

      setGameState.setPassiveIncome(prev => prev + (cartsToAdd * incomePerCart));
      setGameState.setItemCosts(prev => ({...prev, cart: costData.endCost}));
      setGameState.setOwnedItems(prev => ({...prev, cart: (prev.cart || 0) + cartsToAdd}));
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

      // Check if overcharge upgrade is purchased to determine income per magnet
      const hasOverchargeUpgrade = localStorage.getItem('junkMagnetUpgrade') === 'true';
      const incomePerMagnet = hasOverchargeUpgrade ? 20 : 10; // +10 from upgrade
      const magnetsToAdd = gameState.bulkBuy ? 10 : 1;

      setGameState.setPassiveIncome(prev => prev + (magnetsToAdd * incomePerMagnet));
      setGameState.setItemCosts(prev => ({...prev, junkMagnet: costData.endCost}));
      setGameState.setOwnedItems(prev => ({...prev, junkMagnet: (prev.junkMagnet || 0) + magnetsToAdd}));
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

      // Check if flame boost upgrade is purchased to determine income per recycler
      const hasFlameBoostUpgrade = localStorage.getItem('urbanRecyclerUpgrade') === 'true';
      const incomePerRecycler = hasFlameBoostUpgrade ? 30 : 20; // +10 from upgrade
      const recyclersToAdd = gameState.bulkBuy ? 10 : 1;

      setGameState.setPassiveIncome(prev => prev + (recyclersToAdd * incomePerRecycler));
      setGameState.setItemCosts(prev => ({...prev, urbanRecycler: costData.endCost}));
      setGameState.setOwnedItems(prev => ({...prev, urbanRecycler: (prev.urbanRecycler || 0) + recyclersToAdd}));
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
      endCost: Math.floor(gameState.itemCosts.autoClicker * 3)
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
      endCost: Math.floor(gameState.itemCosts.autoClickerV2 * 3)
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
      setGameState.setJunk(prev => prev - costData.totalCost);
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


  const handleBuyTronicsBoost = () => {

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

            const costData = gameState.bulkBuy ? calculate10xPrice01(gameState.itemCosts.tronicsBoostII) : {
              totalCost: gameState.itemCosts.tronicsBoostII,
              endCost: Math.floor(gameState.itemCosts.tronicsBoostII * 1.2)
            };

            localStorage.setItem('tronics_boost_II_count', (parseInt(localStorage.getItem('tronics_boost_II_count') || '0') + (gameState.bulkBuy ? 10 : 1)).toString());
            setGameState.setItemCosts(prev => ({...prev, tronicsBoostII: Math.floor(costData.endCost)}));
            setGameState.setTronics(prev => prev - costData.totalCost);
            setGameState.setNotifications(prev => [...prev, "Tronics Click Boost II purchased! +2 Tronics per click"]);
            incrementUpgradeCount();
          }
    }

    const handleBuyFlowRegulator = () => {
      if (gameState.tronics >= 3000 && !localStorage.getItem('flow_regulator_purchased')) {
        setGameState.setTronics(prev => prev - gameState.itemCosts.flowRegulator);
        localStorage.setItem('flow_regulator_purchased', 'true');
        setGameState.setOwnedItems(prev => ({...prev, flowRegulator: (prev.flowRegulator) + 1}));
        setGameState.setElectroMultiplier(prev => prev + 0.1)
        setGameState.setNotifications(prev => [...prev, "Flow Regulator purchased! +10% Tronics per click"]);
        incrementUpgradeCount();
      }
    }

    const handleBuyQuantumTap = () => {
      if (gameState.tronics >= 1250 && !localStorage.getItem('quantum_tap_purchased')) {
        setGameState.setTronics(prev => prev - 1250);
        localStorage.setItem('quantum_tap_purchased', 'true');
        setGameState.setNotifications(prev => [...prev, "Quantum Tap Circuit purchased! You now have a 3% chance to get 3x Tronics per click."]);
        incrementUpgradeCount();
      }
    }

    const handleBuyElectroSurgeNode = () => {
      if (!localStorage.getItem('electro_surge_node_unlocked') && gameState.electroShards >= 8) {
        localStorage.setItem("electro_surge_node_unlocked", 'true')
        setGameState.setElectroShards(prev => {
          const newValue = prev - 8;
          localStorage.setItem('electroShards', newValue.toString());
          return newValue;
        });
        return;
      }

      if (gameState.tronics >= 35000 && localStorage.getItem('electro_surge_node_unlocked')) {
        setGameState.setTronics(prev => prev - 35000);
        localStorage.setItem("electro_surge_node_purchased", 'true')
        localStorage.setItem('surge_duration_bonus', '5');
        setGameState.setNotifications(prev => [...prev, "⚡ Electro Surge Node installed! All surge durations increased by 5 seconds."]);
        incrementUpgradeCount();
      }
    }

    const handleBuyElectroBeaconCore = () => {

        if (!localStorage.getItem('beacon_core_purchased')  && gameState.electroShards >= 15) {
          localStorage.setItem('beacon_core_purchased', 'true');
          setGameState.setElectroShards(prev => prev - 15);
          setGameState.setNotifications(prev => [...prev, "⚡ Electro Beacon Core Unlocked"]);
          return;
        }


      if (gameState.tronics >= 500000 && parseInt(localStorage.getItem('beaconCount') || '0') >= 10) {
        setGameState.setTronics(prev => prev - 500000);
        setGameState.setNotifications(prev => [...prev, "⚡ Electro Beacon Core installed! Electro Shard spawn time decreased by 25%"]);
        window.dispatchEvent(new Event('storage'));
        incrementUpgradeCount();
      }
    }

    const handleBuyCircuitOptimization = () => {

      if (!localStorage.getItem('circuit_optimization_purchased')  && gameState.electroShards >= 5) {
        localStorage.setItem('circuit_optimization_purchased', 'true');
        setGameState.setElectroShards(prev => prev - 5);
        setGameState.setNotifications(prev => [...prev, "⚡ Circuit Optimization Unit Unlocked"]);
        return;
      }


      const currentCost = parseInt(localStorage.getItem('circuit_optimization_cost') || '25000');
      const currentCount = parseInt(localStorage.getItem('circuit_optimization_count') || '0');

      if (gameState.tronics >= currentCost && currentCount < 4) {
        setGameState.setTronics(prev => prev - currentCost);
        const newCount = currentCount + 1;
        localStorage.setItem('circuit_optimization_count', newCount);
        const newCost = Math.floor(currentCost * 1.2);
        localStorage.setItem('circuit_optimization_cost', newCost);
        setGameState.setNotifications(prev => [...prev, "Circuit Optimization Unit installed! Global Junk/sec increased by 25%"]);
        window.dispatchEvent(new Event('storage'));
        incrementUpgradeCount();
      }
    }

    const handleBuyHighFreqTap = () => {

      if (!localStorage.getItem('high_freq_tap_unlocked') && gameState.electroShards >= 2) {
        localStorage.setItem('high_freq_tap_unlocked', 'true');
        setGameState.setElectroShards(prev => prev - 2);
        setGameState.setNotifications(prev => [...prev, "⚡ High Frequency Tapper Unlocked"]);
        return;
      }

      if (gameState.tronics >= 10000 && localStorage.getItem('tronics_boost_II_count')) {
        setGameState.setTronics(prev => prev - 10000);
        localStorage.setItem('high_freq_tap_purchased', 'true');
        setGameState.setNotifications(prev => [...prev, 'High-Frequency Tap Chip installed!']);
        incrementUpgradeCount();
      }
    }

  const handleBuyReactiveFeedback = () => {
    if (!localStorage.getItem('reactive_feedback_purchased') && gameState.electroShards >= 12 && gameState.tronics >= 40000) {
    setGameState.setElectroShards(prev => prev - 12);
    setGameState.setTronics(prev =>  prev - 40000 );
      localStorage.setItem("reactive_feedback_purchased", "true");
    setGameState.setElectroMultiplier(prev => prev + 0.15)
      setGameState.setClickMultiplier(prev => prev * 1.025)
      setGameState.setNotifications(prev => [...prev, "Reactive Feedback Loop installed! +15% Tronics per click + 2.5% of Junk/sec from clicks!"]);
    }
  };

  const handleBuyPickupMagnetArray = () => {
    if (!localStorage.getItem('pickup_magnet_array_purchased') && gameState.electroShards >= 10 && gameState.tronics >= 200000) {
      setGameState.setElectroShards(prev => prev - 10);
      setGameState.setTronics(prev => prev - 200000);
      localStorage.setItem("pickup_magnet_array_purchased", "true");
      setGameState.setNotifications(prev => [...prev, "Pickup Magnet Array installed! Pickup duration extended by 8s and auto-collects near cursor!"]);
      incrementUpgradeCount();
    }
  };

  const handleBuyScratzMiner = () => {
    if (gameState.junk >= gameState.itemCosts.scratzMiner) {
      setGameState.setJunk(prev => prev - gameState.itemCosts.scratzMiner);
      setGameState.setItemCosts(prev => ({...prev, scratzMiner: Math.floor(gameState.itemCosts.scratzMiner * 3)}))
      setGameState.setOwnedItems(prev => ({...prev, scratzMiner: (prev.scratzMiner || 0) + 1}));
      setGameState.setNotifications(prev => [...prev, "Scratz Miner purchased!"]);
     }
    }

  const handleBuyAutoRecycler = () => {
    if (gameState.junk >= gameState.itemCosts.autoRecycler) {
      setGameState.setJunk(prev => prev - gameState.itemCosts.autoRecycler);
      setGameState.setOwnedItems(prev => ({...prev, autoRecycler: (prev.autoRecycler || 0) + 1}));
      setGameState.setNotifications(prev => [...prev, "Auto Recycler Unit purchased!"]);
    }
  };

  const handleBuyShardMiner = () => {
    const cost = 10000000;
    if (gameState.junk >= cost && gameState.craftingInventory['Scrap Core'] >= 5 && !gameState.ownedItems.shardMiner) {
      setGameState.setJunk(prev => prev - cost);
      setGameState.setCraftingInventory(prev => ({
        ...prev,
        'Scrap Core': prev['Scrap Core'] - 5
      }));
      setGameState.setOwnedItems(prev => ({...prev, shardMiner: 1}));
      setGameState.setNotifications(prev => [...prev, "Shard Miner purchased!"]);
      window.dispatchEvent(new CustomEvent('nextNews', { 
        detail: { message: "A new frequency resonates through your junkyard..." }
      }));
    }
  };

//Upgrades
const handleBuyStreetratUpgrade = () => {
      const streetratCount = ownedItems.streetrat || 0;
      const additionalIncome = streetratCount * 1; // +1 JPS per streetrat
      setGameState.setPassiveIncome(prev => prev + additionalIncome);
      setGameState.setNotifications(prev => [...prev, `Streetrat Efficiency Training purchased! Each Streetrat now produces +1 additional Junk/sec (+${additionalIncome} JPS).`]);
    };

    const handleBuyScrapBagUpgrade = () => {
      setGameState.setNotifications(prev => [...prev, "Trash Bag Reinforcement purchased! Trash Bags now give +1 additional Junk/click."]);
    };

    const handleBuyTrashPickerUpgrade = () => {
      setGameState.setNotifications(prev => [...prev, "Trash Picker Wrist Braces purchased! Trash Pickers now give +1 additional Junk/click."]);
    };

    const handleBuyCartUpgrade = () => {
      const cartCount = ownedItems.cart || 0;
      const additionalIncome = cartCount * 5; // +5 JPS per cart
      setGameState.setPassiveIncome(prev => prev + additionalIncome);
      setGameState.setNotifications(prev => [...prev, `Cart Suspension Mods purchased! Each Cart now produces +5 additional Junk/sec (+${additionalIncome} JPS).`]);
    };

    const handleBuyUrbanRecyclerUpgrade = () => {
      const recyclerCount = ownedItems.urbanRecycler || 0;
      const additionalIncome = recyclerCount * 10; // +10 JPS per recycler
      setGameState.setPassiveIncome(prev => prev + additionalIncome);
      setGameState.setNotifications(prev => [...prev, `Recycler Flame Boost purchased! Each Urban Recycler now produces +10 additional Junk/sec (+${additionalIncome} JPS).`]);
    };

    const handleBuyClickEnhancerUpgrade = () => {
      setGameState.setNotifications(prev => [...prev, "Click Enhancer Overclock purchased! Click Enhancers now give +3 additional Junk/click."]);
    };

    const handleBuyJunkMagnetUpgrade = () => {
      const magnetCount = ownedItems.junkMagnet || 0;
      const additionalIncome = magnetCount * 10; // +10 JPS per magnet
      setGameState.setPassiveIncome(prev => prev + additionalIncome);
      setGameState.setNotifications(prev => [...prev, `Junk Magnet Overcharge purchased! Each Junk Magnet now produces +10 additional Junk/sec (+${additionalIncome} JPS).`]);
    };

    // Tier 2 upgrades
    const handleBuyStreetratUpgrade2 = () => {
      const streetratCount = ownedItems.streetrat || 0;
      // For unionization, increase by 50% of current base production
      const baseProduction = localStorage.getItem('streetratUpgrade') ? 2 : 1; // 2 if already upgraded, 1 if not
      const additionalIncome = Math.floor(streetratCount * baseProduction * 0.5); // 50% increase
      setGameState.setPassiveIncome(prev => prev + additionalIncome);
      setGameState.setNotifications(prev => [...prev, `Streetrat Unionization purchased! Streetrats work 50% faster (+${additionalIncome} JPS).`]);
    };

    const handleBuyCartUpgrade2 = () => {
      const cartCount = ownedItems.cart || 0;
      // For racing league, add 25% more production
      const baseProduction = localStorage.getItem('cartUpgrade') ? 10 : 5; // 10 if already upgraded, 5 if not
      const additionalIncome = Math.floor(cartCount * baseProduction * 0.25); // 25% increase
      setGameState.setPassiveIncome(prev => prev + additionalIncome);
      setGameState.setNotifications(prev => [...prev, `Cart Racing League Sponsorship purchased! Carts generate +25% more Junk/sec (+${additionalIncome} JPS).`]);
    };

    const handleBuyUrbanRecyclerUpgrade2 = () => {
      const recyclerCount = ownedItems.urbanRecycler || 0;
      const additionalIncome = recyclerCount * 15; // +15 JPS per recycler
      setGameState.setPassiveIncome(prev => prev + additionalIncome);
      setGameState.setNotifications(prev => [...prev, `Urban Recycler Flame Jets purchased! Each Urban Recycler now produces +15 additional Junk/sec (+${additionalIncome} JPS).`]);
    };

    const handleBuyTrashPickerUpgrade2 = () => {
      setGameState.setNotifications(prev => [...prev, "Trash Picker Holster Belt purchased! Trash Pickers now give +2 additional Junk/click."]);
    };

    const handleBuyTrashBagUpgrade2 = () => {
      setGameState.setNotifications(prev => [...prev, "Trash Bag Max-Patch purchased! Trash Bags now give +2 additional Junk/click."]);
    };

  return {
    collectJunk,handleBuyTrashBag,handleBuyPicker,
    calculate10xPriceJunkClicker: calculate10xPrice01, calculate10xPriceJPS,
    calculate10xPriceBillBoard: calculate10x02,handleBuyClickEnhancer,handleBuyClampjawRig,handleBuyStreetrat,
    handleBuyCart,handleBuyJunkMagnet,handleBuyUrbanRecycler,handleBuyScrapDrone,handleBuyHoloBillboard,
    handleBuyAutoClicker,handleBuyAutoClickerV2,handleBuyJunkRefinery,     handleBuyModularScrapper,handleBuyTronicsBoost,handleBuyTronicsBoostII,handleBuyFlowRegulator,handleBuyQuantumTap,
    handleBuyElectroSurgeNode,
    handleBuyElectroBeaconCore,
    handleBuyCircuitOptimization,
    handleBuyHighFreqTap,
    handleBuyReactiveFeedback,
    handleBuyPickupMagnetArray,
    handleBuyScratzMiner,
    handleBuyAutoRecycler,
    handleBuyShardMiner, handleBuyStreetratUpgrade, handleBuyScrapBagUpgrade, handleBuyTrashPickerUpgrade, handleBuyCartUpgrade, handleBuyUrbanRecyclerUpgrade, handleBuyClickEnhancerUpgrade,handleBuyJunkMagnetUpgrade,
    handleBuyGutterlineExtractor, handleBuyStreetratUpgrade2, handleBuyCartUpgrade2, handleBuyUrbanRecyclerUpgrade2, handleBuyTrashPickerUpgrade2, handleBuyTrashBagUpgrade2
  };
}
}