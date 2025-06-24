
import { useEffect } from 'react';
import { useCrystalZustand } from './crystalZustand';
import { useFlavorEvents } from './flavorEventsStore';
import { useEmailStore } from './emailStore';
import { useSkillsStore } from './skillsStore';
import { validateQuests } from './questValidation';
import { processOfflineProgress, updateLastActiveTime } from './offlineSimulation';
import { getEffectiveJunkPerSecond } from './junkCalculation';

export const useGameLoopManager = (gameState, gameSetters, purchaseHandlers) => {
  const {
    junk, credits, clickCount, tronics, autoClicks, clickMultiplier, passiveIncome, 
    globalJpsMultiplier, electronicsUnlock, autoClickerV1Count, craftingInventory,
    ownedItems, permanentAutoClicks, electroMultiplier, isSurgeActive, 
    hasFoundCapacitorThisSurge, activeCheatsList, electroShards, beaconCount,
    showSlotMachine, showAchievements, showSettings, showQuestLog, showTooltips,
    showCoinFlip, showCombat, activeStore, isTronicsSurgeActive, bulkBuy,
    tutorialStage, passiveIncome: totalPassiveIncome, prestigeCount, mousePosition,
    quantumTapNotifications, showOfflineProgress, offlineProgressData,
    forceCogfatherEye, showCrewIntroTooltip
  } = gameState;

  const {
    setJunk, setCredits, setClickCount, setTronics, setAutoClicks, setClickMultiplier,
    setPassiveIncome, setGlobalJpsMultiplier, setElectronicsUnlock, setAutoClickerV1Count,
    setCraftingInventory, setOwnedItems, setNotifications, setPermanentAutoClicks,
    setElectroMultiplier, setIsSurgeActive, setHasFoundCapacitorThisSurge,
    setActiveCheatsList, setElectroShards, setMousePosition, setActiveStore,
    setShowUpgradeStats, setShowSlotMachine, setShowAchievements, setShowSettings,
    setShowQuestLog, setShowTooltips, setShowCoinFlip, setShowCombat,
    setTronicsSurgeActive, setSurgeCount, setShowCrystal, setShowTrashBonus,
    setShowPrestigePopup, setShowSurgeExplanation, setQuantumTapNotifications,
    setShowOfflineProgress, setOfflineProgressData, setForceCogfatherEye,
    setShowRelayCascade, setTotalTronicsClicks, setShowMiniGameWindow,
    setShowCheatMenu, setShowActiveCheats, setShowCrewIntroTooltip
  } = gameSetters;

  const { validateAchievements, checkElectroMilestones } = purchaseHandlers;

  // Main game loop effect
  useEffect(() => {
    const handleUpdateSurgeCount = () => {
      setSurgeCount(3);
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('updateSurgeCount', handleUpdateSurgeCount);
    window.addEventListener('mousemove', handleMouseMove);

    const handleAddMaterial = (e) => {
      const { material, amount } = e.detail;
      setCraftingInventory(prev => ({
        ...prev,
        [material]: (prev[material] || 0) + amount
      }));
    };

    const handleValidateAchievements = () => {
      validateQuestsAndAchievements();
      setNotifications(prev => [...prev, "Achievements validated!"]);
    };

    window.addEventListener('addMaterial', handleAddMaterial);
    window.addEventListener('validateAchievements', handleValidateAchievements);

    if (activeCheatsList['Force Triple Win']) {
      window.dispatchEvent(new CustomEvent('slotForceTriple'));
    }
    if (activeCheatsList['Force Double Win']) {
      window.dispatchEvent(new CustomEvent('slotForceDouble'));
    }

    const handleKeyPress = (e) => {
      if (e.shiftKey && e.key === 'H') {
        setShowCheatMenu(prev => !prev);
        setShowActiveCheats(prev => !prev);
      }
    };

    const handleSlotForceTriple = () => {
      if (window.spinSlotMachine) window.spinSlotMachine(true, false);
    };

    const handleSlotForceDouble = () => {
      if (window.spinSlotMachine) window.spinSlotMachine(false, true);
    };

    const handleShowCrystal = () => {
      setShowCrystal(true);
    };

    const handleLaunchRelayCascade = () => {
      setShowRelayCascade(true);
    };

    const handleForcePrestige = () => {
      setShowPrestigePopup(true);
    };

    const handleShowCrewIntroTooltip = () => {
      setShowCrewIntroTooltip(true);
    };

    const handleHideCrewIntroTooltip = () => {
      setShowCrewIntroTooltip(false);
    };

    const handleForceCogfatherEye = () => {
      console.log('Force Cogfather Eye triggered');
      setForceCogfatherEye(true);
    };

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('showCrystal', handleShowCrystal);
    window.addEventListener('slotForceTriple', handleSlotForceTriple);
    window.addEventListener('slotForceDouble', handleSlotForceDouble);
    window.addEventListener('launchRelayCascade', handleLaunchRelayCascade);
    window.addEventListener('forcePrestige', handleForcePrestige);
    window.addEventListener('showCrewIntroTooltip', handleShowCrewIntroTooltip);
    window.addEventListener('hideCrewIntroTooltip', handleHideCrewIntroTooltip);
    window.addEventListener('forceCogfatherEye', handleForceCogfatherEye);

    return () => {
      window.removeEventListener('addMaterial', handleAddMaterial);
      window.removeEventListener('validateAchievements', handleValidateAchievements);
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('showCrystal', handleShowCrystal);
      window.removeEventListener('slotForceTriple', handleSlotForceTriple);
      window.removeEventListener('slotForceDouble', handleSlotForceDouble);
      window.removeEventListener('launchRelayCascade', handleLaunchRelayCascade);
      window.removeEventListener('forcePrestige', handleForcePrestige);
      window.removeEventListener('showCrewIntroTooltip', handleShowCrewIntroTooltip);
      window.removeEventListener('hideCrewIntroTooltip', handleHideCrewIntroTooltip);
      window.removeEventListener('forceCogfatherEye', handleForceCogfatherEye);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('updateSurgeCount', handleUpdateSurgeCount);
    };
  }, []);

  // Upgrade stats management
  useEffect(() => {
    const handleUpgradeStats = () => {
      setShowUpgradeStats(prev => {
        if (!prev) {
          setActiveStore(null);
          setShowSlotMachine(false);
          setShowAchievements(false);
          setShowSettings(false);
          setShowQuestLog(false);
          setShowTooltips(false); 
          setShowCoinFlip(false);
          setShowCombat(false);
        }
        return !prev;
      });
    };

    const handleValidateAchievements = () => {
      console.log('Manual achievement validation triggered');
      validateAchievements();
    };

    window.addEventListener('toggleUpgradeStats', handleUpgradeStats);
    window.addEventListener('validateAchievements', handleValidateAchievements);

    if (showSlotMachine || showAchievements || showSettings || showQuestLog || showTooltips || showCoinFlip || showCombat) {
      setActiveStore(null);
      setShowUpgradeStats(false);
    }

    return () => {
      window.removeEventListener('toggleUpgradeStats', handleUpgradeStats);
      window.removeEventListener('validateAchievements', handleValidateAchievements);
    };
  }, [showSlotMachine, showAchievements, showSettings, showQuestLog, showTooltips, showCoinFlip, showCombat]);

  // Active store management
  useEffect(() => {
    if (activeStore) {
      setShowUpgradeStats(false);
    }
  }, [activeStore]);

  // Crystal and bonus initialization
  useEffect(() => {
    const cleanup = useCrystalZustand.getState().initializeCrystalTimer();
    useFlavorEvents.getState().initializeFlavorEvents();
    useEmailStore.getState().initializeEmailSystem();

    const handleShowCrystal = () => {
      setShowCrystal(true);
    };

    window.addEventListener('showCrystal', handleShowCrystal);

    const spawnTrashBonus = () => {
      setShowTrashBonus(true);
      const nextSpawnTime = 120000 + Math.random() * 360000; 
      setTimeout(spawnTrashBonus, nextSpawnTime);
    };

    const initialSpawnTime = 120000 + Math.random() * 360000;
    const trashBonusTimer = setTimeout(spawnTrashBonus, initialSpawnTime);

    return () => {
      clearTimeout(trashBonusTimer);
      cleanup();
    };
  }, []);

  // Surge management
  useEffect(() => {
    const startSurge = () => {
      window.surgeStartTime = Date.now();
      const isTronicsSurgeUnlocked = localStorage.getItem('electro_surge_node_purchased') === 'true';

      const isTronicsSurge = isTronicsSurgeUnlocked; 

      if (isTronicsSurge) {
        setTronicsSurgeActive(true);
        setTimeout(() => {
          setTronicsSurgeActive(false);
          setSurgeCount(prev => {
            const newCount = prev + 1;
            localStorage.setItem('surgeCount', newCount);
            return newCount;
          });
        }, parseInt(localStorage.getItem('surge_duration_bonus') || '5') * 1000);
      } else {
        setIsSurgeActive(true);
        setHasFoundCapacitorThisSurge(false);

        const hadFirstSurge = localStorage.getItem('hadFirstSurge') === 'true';
        if (!hadFirstSurge) {
          localStorage.setItem('hadFirstSurge', 'true');
          setTimeout(() => {
            setShowSurgeExplanation(true);
          }, 500);
        }

        const surgeDurationBonus = isTronicsSurgeUnlocked ? parseInt(localStorage.getItem('surge_duration_bonus') || '5') : 0;
        const surgeDelayFuseBonus = craftingInventory['Surge Delay Fuse'] ? 10000 : 0;
        const surgeDuration = craftingInventory['Surge Capacitor Module'] ? 10000 : 5000 + (surgeDurationBonus * 1000) + surgeDelayFuseBonus;

        setTimeout(() => {
          setIsSurgeActive(false);
          setHasFoundCapacitorThisSurge(false);
          setSurgeCount(prev => {
            const newCount = prev + 1;
            localStorage.setItem('surgeCount', newCount);
            return newCount;
          });
        }, surgeDuration);
      }
    };

    const handleTriggerSurge = () => startSurge();
    window.addEventListener('triggerSurge', handleTriggerSurge);

    const interval = setInterval(() => {
      if (!isSurgeActive && Math.random() < 0.5) startSurge();
    }, 240000 + Math.random() * 240000);

    return () => {
      clearInterval(interval);
      window.removeEventListener('triggerSurge', handleTriggerSurge);
    };
  }, []);

  // Global auto-spin for slot machine
  useEffect(() => {
    const globalAutoSpin = () => {
      if (localStorage.getItem('autoSlotter') === 'true' && localStorage.getItem('autoSlotterActive') === 'true') {
        const isBigSlots = localStorage.getItem('bigSlots') === 'true';
        const isUltimateSlots = localStorage.getItem('ultimateSlots') === 'true';
        const useShardCost = localStorage.getItem('slotMachineShardCost') === 'true';

        const spinCost = isUltimateSlots ? (useShardCost ? 1 : 10000000) : (isBigSlots ? 1000000 : 1000);
        const canAfford = useShardCost ? electroShards >= 1 : junk >= spinCost;

        if (canAfford) {
          const globalSpin = () => {
            if (useShardCost) {
              setElectroShards(prev => prev - 1);
            } else {
              setJunk(prev => prev - spinCost);
            }

            const symbols = ['💰', '🗑️', '⚡', '🎲','🔧', '🔋'];
            const newSlots = Array(3).fill(0).map(() => 
              symbols[Math.floor(Math.random() * symbols.length)]
            );

            let winMessage = '';

            if (newSlots[0] === newSlots[1] && newSlots[1] === newSlots[2]) {
              // Triple match logic
              if (isUltimateSlots) {
                const symbolType = newSlots[0];
                if (useShardCost) {
                  switch(symbolType) {
                    case '💰':
                      setJunk(prev => prev + 300000000);
                      winMessage = `💰 JACKPOT! Auto-Slotter won 300M Junk!`;
                      break;
                    case '🗑️':
                      setJunk(prev => prev + 250000000);
                      winMessage = `🗑️ JACKPOT! Auto-Slotter won 250M Junk!`;
                      break;
                    case '⚡':
                      setElectroShards(prev => prev + 8);
                      winMessage = `⚡ JACKPOT! Auto-Slotter won 8 Electro Shards!`;
                      break;
                    case '🎲':
                      localStorage.setItem('globalJpsMultiplier', 
                        (parseFloat(localStorage.getItem('globalJpsMultiplier') || '1.0') + 0.1).toString()
                      );
                      winMessage = `🎲 JACKPOT! Auto-Slotter gained +10% Global JPS Boost!`;
                      break;
                    case '🔧':
                      setCraftingInventory(prev => ({
                        ...prev,
                        'Stabilized Capacitor': (prev['Stabilized Capacitor'] || 0) + 2,
                        'Voltage Node': (prev['Voltage Node'] || 0) + 2,
                        'Encrypted Coil': (prev['Encrypted Coil'] || 0) + 2
                      }));
                      winMessage = `🔧 JACKPOT! Auto-Slotter won 2 of each premium material!`;
                      break;
                    case '🔋':
                      setCraftingInventory(prev => ({
                        ...prev,
                        'Glitched Scrap Core': (prev['Glitched Scrap Core'] || 0) + 3
                      }));
                      winMessage = `🔋 JACKPOT! Auto-Slotter won 3 Glitched Scrap Cores!`;
                      break;
                  }
                } else {
                  switch(symbolType) {
                    case '💰':
                      setJunk(prev => prev + 150000000);
                      winMessage = `💰 JACKPOT! Auto-Slotter won 150M Junk!`;
                      break;
                    case '🗑️':
                      setJunk(prev => prev + 120000000);
                      winMessage = `🗑️ JACKPOT! Auto-Slotter won 120M Junk!`;
                      break;
                    case '⚡':
                      setElectroShards(prev => prev + 3);
                      winMessage = `⚡ JACKPOT! Auto-Slotter won 3 Electro Shards!`;
                      break;
                    case '🎲':
                      localStorage.setItem('globalJpsMultiplier', 
                        (parseFloat(localStorage.getItem('globalJpsMultiplier') || '1.0') + 0.1).toString()
                      );
                      winMessage = `🎲 JACKPOT! Auto-Slotter gained +10% Global JPS Boost!`;
                      break;
                    case '🔧':
                      setCraftingInventory(prev => ({
                        ...prev,
                        'Voltage Node': (prev['Voltage Node'] || 0) + 1
                      }));
                      winMessage = `🔧 Auto-Slotter won 1 Voltage Node!`;
                      break;
                    case '🔋':
                      setCraftingInventory(prev => ({
                        ...prev,
                        'Glitched Scrap Core': (prev['Glitched Scrap Core'] || 0) + 1
                      }));
                      winMessage = `🔋 JACKPOT! Auto-Slotter won 1 Glitched Scrap Core!`;
                      break;
                  }
                }
              } else {
                const winnings = isBigSlots ? 10000000 : 10000;
                setJunk(prev => prev + winnings);
                winMessage = `🎰 JACKPOT! Auto-Slotter won ${winnings.toLocaleString()} Junk!`;
              }
            } else if (newSlots[0] === newSlots[1] || newSlots[1] === newSlots[2]) {
              // Double match logic
              if (isUltimateSlots) {
                const symbolType = newSlots[0] === newSlots[1] ? newSlots[0] : newSlots[1];
                switch(symbolType) {
                  case '💰':
                    setJunk(prev => prev + 25000000);
                    winMessage = `💰 Auto-Slotter won 25M Junk!`;
                    break;
                  case '🗑️':
                    setJunk(prev => prev + 30000000);
                    winMessage = `🗑️ Auto-Slotter won 30M Junk!`;
                    break;
                  case '⚡':
                    setElectroShards(prev => prev + 1);
                    winMessage = `⚡ Auto-Slotter won 1 Electro Shard!`;
                    break;
                  case '🔧':
                    setCraftingInventory(prev => ({
                      ...prev,
                      'Gear Bits': (prev['Gear Bits'] || 0) + 25
                    }));
                    winMessage = `🔧 Auto-Slotter won 25 Gear Bits!`;
                    break;
                  case '🔋':
                    setCraftingInventory(prev => ({
                      ...prev,
                      'Capacitor': (prev['Capacitor'] || 0) + 2
                    }));
                    winMessage = `🔋 Auto-Slotter won 2 Capacitors!`;
                    break;
                  default:
                    setJunk(prev => prev + 20000000);
                    winMessage = `🎰 Auto-Slotter won 20M Junk!`;
                }
              } else {
                const winnings = isBigSlots ? 2000000 : 2000;
                setJunk(prev => prev + winnings);
                winMessage = `🎰 Auto-Slotter won ${winnings.toLocaleString()} Junk!`;
              }
            }

            if (winMessage) {
              setNotifications(prev => [...prev, winMessage]);
            }
          };

          globalSpin();
        }
      }
    };

    const autoSpinInterval = setInterval(globalAutoSpin, 15000);

    return () => clearInterval(autoSpinInterval);
  }, [junk, electroShards]);

  // Main update interval
  useEffect(() => {
    const updateInterval = setInterval(() => {
      const skillLevels = JSON.parse(localStorage.getItem('skillLevels')) || { greaseDiscipline: 0 };
      const greaseDisciplineBonus = skillLevels.greaseDiscipline * 0.5 / 100;
      const circuitOptCount = parseInt(localStorage.getItem('circuit_optimization_count') || '0');
      const circuitOptBonus = circuitOptCount * 0.25;
      const hasHoloBillboardUpgrade = localStorage.getItem('holoBillboardUpgrade1') === 'true';
      const holoBillboardBonus = (ownedItems.holoBillboard || 0) * (hasHoloBillboardUpgrade ? 0.15 : 0.10);
      const junkMagnetBonus = craftingInventory['Junk Magnet'] ? 0.15 : 0;
      const totalMultiplier = 1 + circuitOptBonus + (craftingInventory['Compression Pack'] ? 0.25 : 0) + greaseDisciplineBonus + holoBillboardBonus + junkMagnetBonus;
      setGlobalJpsMultiplier(totalMultiplier);

      const effectiveJunkPerSecond = getEffectiveJunkPerSecond(
        passiveIncome, 
        globalJpsMultiplier, 
        0, // Remove auto-clicks from here since we handle them separately
        clickMultiplier,
        isSurgeActive
      );

      if (effectiveJunkPerSecond > 0) {
        setJunk(prev => prev + effectiveJunkPerSecond);

        const currentTotal = parseInt(localStorage.getItem('totalJunkCollected') || '0');
        localStorage.setItem('totalJunkCollected', (currentTotal + effectiveJunkPerSecond).toString());
      } else if (effectiveJunkPerSecond < 0) {
        setJunk(prev => Math.max(0, prev + effectiveJunkPerSecond));
      }

      if (autoClicks > 0) {
        // Check if Click Injector ability is active for auto-clicks
        const clickInjectorActive = localStorage.getItem('clickInjectorActive') === 'true';
        const clickInjectorMultiplier = clickInjectorActive ? 1.5 : 1; // +50% boost
        
        // Apply Click Injector effect to auto-click junk generation
        const autoClickJunk = (autoClicks + permanentAutoClicks) * clickMultiplier * clickInjectorMultiplier;
        setJunk(prev => prev + autoClickJunk);
        
        setClickCount(prev => prev + (autoClicks + permanentAutoClicks));

        if (electronicsUnlock) {
          const boostICount = parseInt(localStorage.getItem('tronics_boost_count') || '0');
          const boostIICount = parseInt(localStorage.getItem('tronics_boost_II_count') || '0');
          const tronicsPerClick = 1 + boostICount + (boostIICount * 2);
          setTronics(prev => prev + ((autoClicks + permanentAutoClicks) * tronicsPerClick));
          setTotalTronicsClicks(prev => prev + (autoClicks + permanentAutoClicks));
        }
      }
    }, 1000);

    return () => clearInterval(updateInterval);
  }, [passiveIncome, autoClicks, clickMultiplier, globalJpsMultiplier, craftingInventory]);

  // Global Skills XP calculation
  useEffect(() => {
    const skillsXpInterval = setInterval(() => {
      const { activeSkill, skillLevels, skillXp, setSkillLevels, setSkillXp } = useSkillsStore.getState();

      if (activeSkill && skillLevels[activeSkill] < 10) {
        const baseXp = 10;
        const requiredXp = Math.floor(baseXp * Math.pow(1.25, skillLevels[activeSkill]));
        const newXp = (skillXp[activeSkill] || 0) + 1;

        if (newXp >= requiredXp) {
          const newSkillLevels = {
            ...skillLevels,
            [activeSkill]: skillLevels[activeSkill] + 1
          };
          const newSkillXp = {
            ...skillXp,
            [activeSkill]: 0
          };

          setSkillLevels(newSkillLevels);
          setSkillXp(newSkillXp);

          localStorage.setItem('skillLevels', JSON.stringify(newSkillLevels));
          localStorage.setItem('skillXp', JSON.stringify(newSkillXp));

          setNotifications(prev => [...prev, `${activeSkill} leveled up to ${newSkillLevels[activeSkill]}!`]);
        } else {
          const newSkillXp = {
            ...skillXp,
            [activeSkill]: newXp
          };

          setSkillXp(newSkillXp);
          localStorage.setItem('skillXp', JSON.stringify(newSkillXp));
        }
      }
    }, 10000);

    return () => clearInterval(skillsXpInterval);
  }, []);

  // Crafting inventory persistence
  useEffect(() => {
    localStorage.setItem('craftingInventory', JSON.stringify(craftingInventory));
  }, [craftingInventory]);

  // Game state persistence
  useEffect(() => {
    const totalPassiveIncome = passiveIncome * globalJpsMultiplier + ((autoClicks + permanentAutoClicks) * clickMultiplier);
    if ((totalPassiveIncome >= 100 || junk >= 1000000)) {
      localStorage.setItem('prestigeUnlocked', 'true');
    }
    if ((totalPassiveIncome >= 100 || junk >= 4000000) && !localStorage.getItem('cogfatherEvent')) {
      setNotifications(prev => [...prev, "The Cogfather wants to speak with you about your progress..."]);
      localStorage.setItem('cogfatherEvent', 'true');
    }

    localStorage.setItem('credits', credits);
    localStorage.setItem('junk', junk);
    localStorage.setItem('electronicsUnlock', electronicsUnlock);
    localStorage.setItem('clickMultiplier', clickMultiplier);
    localStorage.setItem('passiveIncome', passiveIncome);
    localStorage.setItem('itemCosts', JSON.stringify(gameState.itemCosts));
    localStorage.setItem('autoClicks', autoClicks);
    localStorage.setItem('clickCount', clickCount);
    localStorage.setItem('achievements', JSON.stringify(gameState.achievements));
    localStorage.setItem('clickEnhancerLevel', gameState.clickEnhancerLevel);
    localStorage.setItem('ownedItems', JSON.stringify(ownedItems));
    localStorage.setItem('craftingInventory', JSON.stringify(craftingInventory));
    localStorage.setItem('globalJpsMultiplier', globalJpsMultiplier);
    localStorage.setItem('autoClickerV1Count', autoClickerV1Count);
  }, [credits, junk, electronicsUnlock, clickMultiplier, passiveIncome, gameState.itemCosts, autoClicks, clickCount, gameState.achievements, ownedItems, gameState.clickEnhancerLevel, globalJpsMultiplier, autoClickerV1Count]);

  // Electronics unlock logic
  useEffect(() => {
    const checkElectronicsUnlock = () => {
      const hasPrestiged = localStorage.getItem('hasPrestiged') === 'true';

      if (hasPrestiged) {
        setElectronicsUnlock(true);
        localStorage.setItem('electronicsUnlock', 'true');
      }
    };

    checkElectronicsUnlock();

    const handlePrestigeUpdate = () => {
      checkElectronicsUnlock();
    };

    window.addEventListener('prestigeComplete', handlePrestigeUpdate);

    return () => {
      window.removeEventListener('prestigeComplete', handlePrestigeUpdate);
    };
  }, []);

  // Tutorial and achievements validation
  useEffect(() => {
    localStorage.setItem('tutorialStage', tutorialStage);
    validateQuestsAndAchievements();

    if (junk >= 1000000) {
      if (!localStorage.getItem('shown_questlog_hint')) {
        localStorage.setItem('shown_questlog_hint', 'true');

        const questLogBtn = document.querySelector('.quest-log-toggle');
        const mainQuestLog = document.querySelector('.quest-log');
        if (questLogBtn) questLogBtn.classList.add('quest-log-attention');
        if (mainQuestLog) mainQuestLog.classList.add('quest-log-attention');

        const cogfatherMessage = (
          <div className="cogfather-message-popup">
            <img src="Icons/NPCs/Cogfather.jfif" alt="Cogfather" />
            <p>A million pieces of junk? Now that's what I call a beautiful mess. Keep collecting - there's more to discover.</p>
            <button onClick={() => {
              setShowQuestLog(true);
              setNotifications(prev => prev.filter(n => typeof n !== 'object'));
            }}>Open Quest Log</button>
          </div>
        );
        setNotifications(prev => [...prev, cogfatherMessage]);
      }
    }
  }, [tutorialStage, junk]);

  // Periodic achievements validation
  useEffect(() => {
    validateQuestsAndAchievements();
  }, [passiveIncome, gameState.ownedItems?.streetrat, clickMultiplier, globalJpsMultiplier]);

  // Inventory visibility
  useEffect(() => {
    const onetimeItems = ['Click Rig Mk I', 'Auto Toolkit', 'Compression Pack', 'Reinforced Backpack', 'Surge Capacitor Module'];
    const hasCraftedOneTime = onetimeItems.some(item => (craftingInventory[item] || 0) > 0);
    gameSetters.setShowInventory(hasCraftedOneTime);
  }, [craftingInventory]);

  // Prestige quest completion
  useEffect(() => {
    if (localStorage.getItem('quest_sync_Forge the Future') === 'true' || 
        (craftingInventory && craftingInventory['Prestige Crystal'] >= 1)) {
      gameSetters.setPrestigeQuestCompleted(true);
    }
  }, [craftingInventory]);

  // Credits update handling
  useEffect(() => {
    const handleCreditsUpdate = (event) => {
      setCredits(event.detail.credits);
      if (event.detail.message) {
        setNotifications(prev => [...prev, event.detail.message]);
      }
    };

    window.addEventListener('creditsUpdated', handleCreditsUpdate);
    return () => window.removeEventListener('creditsUpdated', handleCreditsUpdate);
  }, []);

  // Offline progress and mini-game management
  useEffect(() => {
    const checkInitialOfflineProgress = () => {
      const offlineResults = processOfflineProgress(
        {
          junk, credits, clickCount, tronics, autoClicks, clickMultiplier, passiveIncome,
          globalJpsMultiplier, electronicsUnlock, clickEnhancerLevel: gameState.clickEnhancerLevel,
          prestigeCount, electroShards, isSurgeActive, cogfatherLore: gameState.cogfatherLore,
          autoClickerV1Count, craftingInventory, ownedItems, permanentAutoClicks, electroMultiplier
        },
        {
          setJunk, setCredits, setClickCount, setTronics, setAutoClicks, setClickMultiplier,
          setPassiveIncome, setGlobalJpsMultiplier, setElectronicsUnlock,
          setClickEnhancerLevel: gameSetters.setClickEnhancerLevel, setPrestigeCount: gameSetters.setPrestigeCount,
          setElectroShards, setIsSurgeActive, setCogfatherLore: gameSetters.setCogfatherLore,
          setAutoClickerV1Count, setCraftingInventory, setOwnedItems, setNotifications,
          setPermanentAutoClicks, setElectroMultiplier, setTotalTronicsClicks
        }
      );

      if (offlineResults && offlineResults.duration >= 30) {
        setOfflineProgressData(offlineResults);
        setShowOfflineProgress(true);
      }
    };

    const initialCheckTimeout = setTimeout(checkInitialOfflineProgress, 1000);

    const handleMiniGameRequest = () => {
      setShowMiniGameWindow(true);
    };

    const processOfflineProgressHandler = () => {
      const offlineResults = processOfflineProgress(
        {
          junk, credits, clickCount, tronics, autoClicks, clickMultiplier,
          passiveIncome, globalJpsMultiplier, electronicsUnlock,
          clickEnhancerLevel: gameState.clickEnhancerLevel, prestigeCount,
          electroShards, isSurgeActive, cogfatherLore: gameState.cogfatherLore,
          autoClickerV1Count, craftingInventory, ownedItems,
          permanentAutoClicks, electroMultiplier
        },
        {
          setJunk, setCredits, setClickCount, setTronics, setAutoClicks, setClickMultiplier,
          setPassiveIncome, setGlobalJpsMultiplier, setElectronicsUnlock,
          setClickEnhancerLevel: gameSetters.setClickEnhancerLevel, setPrestigeCount: gameSetters.setPrestigeCount,
          setElectroShards, setIsSurgeActive, setCogfatherLore: gameSetters.setCogfatherLore,
          setAutoClickerV1Count, setCraftingInventory, setOwnedItems, setNotifications,
          setPermanentAutoClicks, setElectroMultiplier, setTotalTronicsClicks
        }
      );

      if (offlineResults && offlineResults.duration >= 30) {
        setOfflineProgressData(offlineResults);
        setShowOfflineProgress(true);
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        setTimeout(() => {
          if (document.visibilityState === 'visible') {
            processOfflineProgressHandler();
          }
        }, 1000);
      } else {
        updateLastActiveTime();
      }
    };

    const handleWindowFocus = () => {
      setTimeout(() => {
        if (document.hasFocus()) {
          processOfflineProgressHandler();
        }
      }, 1000);
    };

    const handleWindowBlur = () => {
      updateLastActiveTime();
    };

    const handlePageShow = (event) => {
      if (event.persisted || performance.navigation.type === 2) {
        processOfflineProgressHandler();
      }
    };

    const handlePageHide = () => {
      updateLastActiveTime();
    };

    window.addEventListener('showMiniGame', handleMiniGameRequest);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleWindowFocus);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('pageshow', handlePageShow);
    window.addEventListener('pagehide', handlePageHide);

    return () => {
      clearTimeout(initialCheckTimeout);
      window.removeEventListener('showMiniGame', handleMiniGameRequest);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleWindowFocus);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('pageshow', handlePageShow);
      window.removeEventListener('pagehide', handlePageHide);
    };
  }, [junk]);

  // Helper function for quest validation
  const validateQuestsAndAchievements = () => {
    validateQuests({
      junk, clickCount, clickMultiplier, passiveIncome, autoClicks,
      globalJpsMultiplier, surgeCount: gameState.surgeCount, electroShards,
      cogfatherLore: gameState.cogfatherLore, craftingInventory, ownedItems, credits
    }, {
      setElectroShards, setNotifications, setCraftingInventory, setAutoClicks,
      setPermanentAutoClicks, setCredits, setPassiveIncome, setJunk,
      setClickMultiplier, setGlobalJpsMultiplier, setOwnedItems
    });
  };

  return {
    validateQuestsAndAchievements
  };
};
