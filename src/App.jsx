import { useState, useEffect } from 'react';
import './App.css';
import Clicker from './components/Clicker';
import Achievements from './components/Achievements';
import CheatMenu from './components/CheatMenu';
import Store from './components/Store';
import ElectroStore from './components/ElectroStore';
import CredStore from './components/CredStore';
import AutomationStore from './components/AutomationStore';
import MenuButtons from './components/MenuButtons';
import NewsContainer from './components/NewsContainer';
import TrashSurge from './components/TrashSurge';
import Notifications from './components/Notifications';
import TutorialSystem from './components/TutorialSystem';
import QuestLog from './components/QuestLog';
import SlotMachine from './components/SlotMachine';
import ClickEnhancerEffect from './components/ClickEnhancerEffect';
import DroneEffect from './components/DroneEffect';
import Menu from './components/Menu';
import CraftingStore from './components/CraftingStore';
import ActiveCheats from './components/ActiveCheats';

export default function App() {
  const [showSlotMachine, setShowSlotMachine] = useState(false);
  const [showCheatMenu, setShowCheatMenu] = useState(false);
  const [showActiveCheats, setShowActiveCheats] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showQuestLog, setShowQuestLog] = useState(false);
  const [showClickEnhancerUI, setShowClickEnhancerUI] = useState(true);
  const [credits, setCredits] = useState(() => Math.floor(Number(localStorage.getItem('credits')) || 0));
  const [junk, setJunk] = useState(() => Math.floor(Number(localStorage.getItem('junk')) || 0));
  const [clickCount, setClickCount] = useState(() => Math.floor(Number(localStorage.getItem('clickCount')) || 0));
  const defaultAchievements = [
    {
      title: "Junkie Starter",
      requirement: "Collect 1,000 Junk",
      reward: "+500 Junk",
      flavorText: "Now you're hoarding like a real scavver.",
      unlocked: false,
      checked: false
    },
    {
      title: "The First Clicks",
      requirement: "Click 500 times",
      reward: "+5% Click Power",
      flavorText: "That mouse is starting to look worn...",
      unlocked: false,
      checked: false
    },
    {
      title: "Greasy Milestone",
      requirement: "Reach 10 Junk/sec",
      reward: "+1 Auto Click/sec",
      flavorText: "The gears are turning smoothly now.",
      unlocked: false,
      checked: false
    }
  ];

  const [achievements, setAchievements] = useState(() => {
    const stored = localStorage.getItem('achievements');
    if (!stored) {
      localStorage.setItem('achievements', JSON.stringify(defaultAchievements));
      return defaultAchievements;
    }
    const loadedAchievements = JSON.parse(stored);
    console.log('Loaded achievements:', loadedAchievements);
    return loadedAchievements.length === defaultAchievements.length ? loadedAchievements : defaultAchievements;
  });
  const [autoClicks, setAutoClicks] = useState(0); // Added state for auto clicks

  useEffect(() => {
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

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('slotForceTriple', handleSlotForceTriple);
    window.addEventListener('slotForceDouble', handleSlotForceDouble);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('slotForceTriple', handleSlotForceTriple);
      window.removeEventListener('slotForceDouble', handleSlotForceDouble);
    };
  }, []);

  const handleReset = (type) => {
    switch(type) {
      case 'junk':
        setJunk(0);
        break;
      case 'credits':
        setCredits(0);
        break;
      case 'achievements':
        setAchievements(prevAchievements => 
          prevAchievements.map(achievement => ({
            ...achievement,
            unlocked: false,
            checked: false
          }))
        );
        break;
      case 'all':
        setJunk(0);
        setCredits(0);
        setClickCount(0);
        localStorage.setItem('clickCount', '0');
        setClickMultiplier(1);
        setPassiveIncome(0);
        setElectronicsUnlock(false);
        setClickEnhancerLevel(0);
        setItemCosts({
          trashBag: 10,
          trashPicker: 100,
          streetrat: 100,
          cart: 500,
          junkMagnet: 1500,
          clickEnhancer: 2500,
          urbanRecycler: 3000,
          autoClicker: 5000,
          scrapDrone: 7500
        });
        setAutoClicks(0);
        setAchievements(prevAchievements => 
          prevAchievements.map(achievement => ({
            ...achievement,
            unlocked: false,
            checked: false
          }))
        );
        break;
    }
  };
  const [electronicsUnlock, setElectronicsUnlock] = useState(() => localStorage.getItem('electronicsUnlock') === 'true');
  const [notifications, setNotifications] = useState([]);
  const [activeStore, setActiveStore] = useState(null);
  const [clickMultiplier, setClickMultiplier] = useState(() => Number(localStorage.getItem('clickMultiplier')) || 1);
  const [clickEnhancerLevel, setClickEnhancerLevel] = useState(() => Number(localStorage.getItem('clickEnhancerLevel')) || 0);
  const [isSurgeActive, setIsSurgeActive] = useState(false);
const [tutorialStage, setTutorialStage] = useState(() => Number(localStorage.getItem('tutorialStage')) || 0);
const [hasUpgrade, setHasUpgrade] = useState(false);
const [hasHelper, setHasHelper] = useState(false);

  useEffect(() => {
    const startSurge = () => {
      window.surgeStartTime = Date.now();
      setIsSurgeActive(true);
      setHasFoundCapacitorThisSurge(false);
      setTimeout(() => {
        setIsSurgeActive(false);
        setHasFoundCapacitorThisSurge(false);
      }, 5000);
    };

    const handleTriggerSurge = () => startSurge();
    window.addEventListener('triggerSurge', handleTriggerSurge);

    const interval = setInterval(() => {
      if (Math.random() < 0.5) startSurge();
    }, 240000 + Math.random() * 240000);

    return () => {
      clearInterval(interval);
      window.removeEventListener('triggerSurge', handleTriggerSurge);
    };
  }, []);
  const [passiveIncome, setPassiveIncome] = useState(() => Number(localStorage.getItem('passiveIncome')) || 0);
  const [craftingInventory, setCraftingInventory] = useState(() => JSON.parse(localStorage.getItem('craftingInventory')) || {});
  const [hasFoundCapacitorThisSurge, setHasFoundCapacitorThisSurge] = useState(false);
  const [activeCheatsList, setActiveCheatsList] = useState(() => ({
    'Guaranteed Capacitor': false,
    'Force Triple Win': false,
    'Force Double Win': false
  }));
const [itemCosts, setItemCosts] = useState(() => JSON.parse(localStorage.getItem('itemCosts')) || {
    trashBag: 10,
    trashPicker: 100,
    streetrat: 100,
    cart: 500,
    junkMagnet: 1500,
    urbanRecycler: 3000,
    autoClicker: 5000,
    clickEnhancer: 2500,
    scrapDrone: 7500
  });

  const [ownedItems, setOwnedItems] = useState(() => JSON.parse(localStorage.getItem('ownedItems')) || {
    trashBag: 0,
    trashPicker: 0,
    streetrat: 0,
    cart: 0,
    junkMagnet: 0,
    urbanRecycler: 0,
    clickEnhancer: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setJunk(prev => prev + passiveIncome + (autoClicks * clickMultiplier)); // Auto clicks use click multiplier
    }, 1000);
    return () => clearInterval(interval);
  }, [passiveIncome, autoClicks, clickMultiplier]);

  useEffect(() => {
    localStorage.setItem('credits', credits);
    localStorage.setItem('junk', junk);
    localStorage.setItem('electronicsUnlock', electronicsUnlock);
    localStorage.setItem('clickMultiplier', clickMultiplier);
    localStorage.setItem('passiveIncome', passiveIncome);
    localStorage.setItem('itemCosts', JSON.stringify(itemCosts));
    localStorage.setItem('autoClicks', autoClicks);
    localStorage.setItem('clickCount', clickCount);
    localStorage.setItem('achievements', JSON.stringify(achievements));
    localStorage.setItem('clickEnhancerLevel', clickEnhancerLevel);
    localStorage.setItem('ownedItems', JSON.stringify(ownedItems));
  localStorage.setItem('craftingInventory', JSON.stringify(craftingInventory));
  }, [credits, junk, electronicsUnlock, clickMultiplier, passiveIncome, itemCosts, autoClicks, clickCount, achievements, ownedItems, clickEnhancerLevel]);

  const checkAchievements = () => {
    setAchievements(prev => {
      const newAchievements = [...prev];
      let rewardGiven = false;

      // Check Junkie Starter
      if (!newAchievements[0].unlocked && junk >= 1000) {
        newAchievements[0].unlocked = true;
        if (!newAchievements[0].checked) {
          setJunk(prev => prev + 500);
          setNotifications(prev => [...prev, "Achievement Unlocked: Junkie Starter!"]);
          newAchievements[0].checked = true;
          rewardGiven = true;
        }
      }

      // Check The First Clicks
      if (!newAchievements[1].unlocked && clickCount >= 500) {
        newAchievements[1].unlocked = true;
        if (!newAchievements[1].checked) {
          setClickMultiplier(prev => prev * 1.05);
          setNotifications(prev => [...prev, "Achievement Unlocked: The First Clicks!"]);
          newAchievements[1].checked = true;
          rewardGiven = true;
        }
      }

      // Check Greasy Milestone
      if (!newAchievements[2].unlocked && (passiveIncome + (autoClicks * clickMultiplier)) >= 10) {
        newAchievements[2].unlocked = true;
        if (!newAchievements[2].checked) {
          setAutoClicks(prev => prev + 1);
          setNotifications(prev => [...prev, "Achievement Unlocked: Greasy Milestone!"]);
          newAchievements[2].checked = true;
          rewardGiven = true;
        }
      }

      if (rewardGiven) {
        localStorage.setItem('achievements', JSON.stringify(newAchievements));
      }
      return newAchievements;
    });
  };

  const collectJunk = () => {
    const surgeMultiplier = isSurgeActive ? 2 : 1;
    setJunk(prev => prev + (clickMultiplier * surgeMultiplier));
    
    // Random material finding
    const random = Math.random();
    if (random < 0.0001) { // 0.01% chance for basic materials
      const materials = ['Wires', 'Metal Plates', 'Gear Bits'];
      const randomMaterial = materials[Math.floor(Math.random() * materials.length)];
      setCraftingInventory(prev => ({
        ...prev,
        [randomMaterial]: (prev[randomMaterial] || 0) + 1
      }));
      setNotifications(prev => [...prev, `Found a ${randomMaterial}!`]);
    } else if (random < 0.00001) { // 0.001% chance for power core
      setCraftingInventory(prev => ({
        ...prev,
        'Scrap Core': (prev['Scrap Core'] || 0) + 1
      }));
      setNotifications(prev => [...prev, 'Found a Scrap Core!']);
    }
    
    // Check for capacitor during surge
    if (isSurgeActive && !hasFoundCapacitorThisSurge && (activeCheatsList['Guaranteed Capacitor'] || Math.random() < 0.01)) {
      setCraftingInventory(prev => ({
        ...prev,
        'Capacitor': (prev['Capacitor'] || 0) + 1
      }));
      setHasFoundCapacitorThisSurge(true);
      setNotifications(prev => [...prev, 'Found a Capacitor from the surge!']);
    }

    setClickCount(prev => {
      const newCount = prev + 1;
      localStorage.setItem('clickCount', newCount);
      return newCount;
    });
    checkAchievements();
  };

  const collectTronics = () => {
    if (electronicsUnlock) {
      setCredits(prev => prev + 1);
    }
  };

  const buyItem = (cost, message) => {
    if (credits >= cost) {
      setCredits(prev => prev - cost);
      setNotifications(prev => [...prev, message]);
    }
  };

  const handleBuyTrashBag = () => {
    if (junk >= itemCosts.trashBag) {
      setJunk(prev => prev - itemCosts.trashBag);
      setNotifications(prev => [...prev, "Scrap Bag gekauft!"]);
      setClickMultiplier(prev => prev + 1);
      setItemCosts(prev => ({...prev, trashBag: Math.floor(prev.trashBag * 1.1)}));
      setOwnedItems(prev => ({...prev, trashBag: prev.trashBag + 1}));
      setHasUpgrade(true);
    }
  };

  const handleBuyPicker = () => {
    if (junk >= itemCosts.trashPicker) {
      setJunk(prev => prev - itemCosts.trashPicker);
      setNotifications(prev => [...prev, "Trash Picker gekauft!"]);
      setClickMultiplier(prev => prev + 3);
      setItemCosts(prev => ({...prev, trashPicker: Math.floor(prev.trashPicker * 1.1)}));
      setOwnedItems(prev => ({...prev, trashPicker: prev.trashPicker + 1}));
    }
  };

  const handleBuyStreetrat = () => {
    if (junk >= itemCosts.streetrat) {
      setJunk(prev => prev - itemCosts.streetrat);
      setNotifications(prev => [...prev, "Streetrat angeheuert!"]);
      setPassiveIncome(prev => prev + 1);
      setItemCosts(prev => ({...prev, streetrat: Math.floor(prev.streetrat * 1.15)}));
      setOwnedItems(prev => ({...prev, streetrat: prev.streetrat + 1}));
      setHasHelper(true);
    }
  };

  const handleBuyCart = () => {
    if (junk >= itemCosts.cart) {
      setJunk(prev => prev - itemCosts.cart);
      setNotifications(prev => [...prev, "Shopping Cart gekauft!"]);
      setPassiveIncome(prev => prev + 5);
      setItemCosts(prev => ({...prev, cart: Math.floor(prev.cart * 1.15)}));
      setOwnedItems(prev => ({...prev, cart: prev.cart + 1}));
    }
  };

  const handleBuyJunkMagnet = () => {
    if (junk >= itemCosts.junkMagnet) {
      setJunk(prev => prev - itemCosts.junkMagnet);
      setNotifications(prev => [...prev, "Junk Magnet gekauft!"]);
      setPassiveIncome(prev => prev + 10);
      setItemCosts(prev => ({...prev, junkMagnet: Math.floor(prev.junkMagnet * 1.15)}));
      setOwnedItems(prev => ({...prev, junkMagnet: prev.junkMagnet + 1}));
    }
  };

  const handleBuyUrbanRecycler = () => {
    if (junk >= itemCosts.urbanRecycler) {
      setJunk(prev => prev - itemCosts.urbanRecycler);
      setNotifications(prev => [...prev, "Urban Recycler gekauft!"]);
      setPassiveIncome(prev => prev + 20);
      setItemCosts(prev => ({...prev, urbanRecycler: Math.floor(prev.urbanRecycler * 1.15)}));
      setOwnedItems(prev => ({...prev, urbanRecycler: prev.urbanRecycler + 1}));
    }
  };

  const handleBuyScrapDrone = () => {
    if (junk >= itemCosts.scrapDrone) {
      setJunk(prev => prev - itemCosts.scrapDrone);
      setNotifications(prev => [...prev, "Scrap Drone Deployed – +25 JPS"]);
      setPassiveIncome(prev => prev + 25);
      setItemCosts(prev => ({...prev, scrapDrone: Math.floor(prev.scrapDrone * 1.15)}));
      setOwnedItems(prev => ({...prev, scrapDrone: (prev.scrapDrone || 0) + 1}));
      
      if (!ownedItems.scrapDrone) {
        window.dispatchEvent(new CustomEvent('nextNews', { 
          detail: { message: "Cogfather: You've got drones now? Look at you, corporate overlord in the making." }
        }));
        setDefaultNews(prev => [...prev, "Automated helper deployed. Don't expect it to take breaks."]);
      }
    }
  };

  const handleBuySolderingIron = () => {
    buyItem(1000, "Bought a Soldering Iron!");
    setElectronicsUnlock(true);
  };
  const handleBuyMultimeter = () => buyItem(2000, "Bought a Multimeter!");

  useEffect(() => {
    localStorage.setItem('tutorialStage', tutorialStage);
  }, [tutorialStage]);

  return (
    <main>
      {showQuestLog && <QuestLog tutorialStage={tutorialStage} />}
      <TutorialSystem
        junk={junk}
        hasUpgrade={hasUpgrade}
        passiveIncome={passiveIncome}
        hasHelper={hasHelper}
        hasCrafting={false}
        isSurgeActive={isSurgeActive}
        tutorialStage={tutorialStage}
        onTutorialProgress={(stage) => setTutorialStage(stage)}
      />
      <NewsContainer isSurgeActive={isSurgeActive} />
      <TrashSurge isActive={isSurgeActive} />
      <div className="stats">
        <p>Money: {credits.toFixed(2)}C</p>
        <p>Junk: {Math.floor(junk).toLocaleString('en-US', {maximumFractionDigits: 0})}</p>
        <p>Junk/sec: {Math.floor(passiveIncome + (autoClicks * clickMultiplier)).toLocaleString('en-US', {maximumFractionDigits: 0})}</p>
      </div>
      <Menu onStoreSelect={(type) => {
        switch(type) {
          case 'achievements':
            setShowAchievements(true);
            break;
          case 'questLog':
            setShowQuestLog(prev => !prev);
            break;
          case 'slotMachine':
            setShowSlotMachine(true);
            break;
          case 'settings':
            setShowSettings(true);
            break;
        }
      }} />
      {showSlotMachine && (
        <SlotMachine
          junk={junk}
          onSpin={(cost) => setJunk(prev => prev - cost)}
          onClose={() => setShowSlotMachine(false)}
        />
      )}
      {showAchievements && (
        <Achievements 
          achievements={achievements}
          onClose={() => setShowAchievements(false)}
        />
      )}
      <div className={`burger-menu ${activeStore ? 'open' : ''}`} onClick={() => setActiveStore(activeStore ? null : 'store')}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className={`sidebar ${activeStore ? 'open' : ''}`}>
        <MenuButtons onStoreSelect={(store) => {
          setActiveStore(store);
        }} />
      </div>
      {activeStore === 'store' && (
        <Store 
          credits={junk}
          itemCosts={itemCosts}
          ownedItems={ownedItems}
          onBuyTrashBag={handleBuyTrashBag}
          onBuyPicker={handleBuyPicker}
          onBuyStreetrat={handleBuyStreetrat}
          onBuyCart={handleBuyCart}
          onBuyJunkMagnet={handleBuyJunkMagnet}
          onBuyUrbanRecycler={handleBuyUrbanRecycler}
          onBuyScrapDrone={handleBuyScrapDrone}
          passiveIncome={passiveIncome}
          onBuyClickEnhancer={() => {
            if (junk >= itemCosts.clickEnhancer) {
              setJunk(prev => prev - itemCosts.clickEnhancer);
              setClickMultiplier(prev => prev + 10);
              setClickEnhancerLevel(prev => prev + 1);
              setItemCosts(prev => ({...prev, clickEnhancer: Math.floor(prev.clickEnhancer * 1.1)}));
              setOwnedItems(prev => ({...prev, clickEnhancer: (prev.clickEnhancer || 0) + 1}));
              setNotifications(prev => [...prev, "Click Enhancer purchased!"]);
              if (clickEnhancerLevel === 0) {
                setNotifications(prev => [...prev, "Finger strength increasing! Bet you never thought clicking would become your day job."]);
                window.dispatchEvent(new CustomEvent('nextNews', { 
                  detail: { message: "Cogfather nods approvingly: 'Clicks mean business. Keep 'em coming.'" }
                }));
              }
            }
          }}
          clickCount={clickCount}
          purchasedUpgrades={Object.values(itemCosts).filter(cost => cost > 0).length}
          onBack={() => setActiveStore(null)}
        />
      )}
      {activeStore === 'electrostore' && (
        <ElectroStore 
          credits={credits}
          onBuySolderingIron={handleBuySolderingIron}
          onBuyMultimeter={handleBuyMultimeter}
          onBack={() => setActiveStore(null)}
        />
      )}
      {activeStore === 'automation' && (
        <AutomationStore
          junk={junk}
          itemCosts={itemCosts}
          onBuyAutoClicker={() => {
            if (junk >= itemCosts.autoClicker) {
              setJunk(prev => prev - itemCosts.autoClicker);
              setAutoClicks(prev => prev + 1);
              setItemCosts(prev => ({...prev, autoClicker: Math.floor(prev.autoClicker * 1.15)}));
              setNotifications(prev => [...prev, "Auto Clicker Bot purchased!"]);
              window.dispatchEvent(new CustomEvent('nextNews', { 
                detail: { message: "Cogfather whispers: 'Sit back, kid. Let the bots handle it from here.'" }
              }));
            }
          }}
          onBack={() => setActiveStore(null)}
        />
      )}
      {activeStore === 'craft' && (
        <CraftingStore
          junk={junk}
          craftingInventory={craftingInventory}
          onCraft={(item) => {
            if (item.type === 'basic') {
              if (junk >= item.cost) {
                setJunk(prev => prev - item.cost);
                setCraftingInventory(prev => ({
                  ...prev,
                  [item.name]: (prev[item.name] || 0) + 1
                }));
                setNotifications(prev => [...prev, `Crafted ${item.name}!`]);
              }
            } else {
              const canCraft = Object.entries(item.requirements).every(
                ([mat, count]) => (craftingInventory[mat] || 0) >= count
              );
              if (canCraft) {
                setCraftingInventory(prev => {
                  const newInventory = { ...prev };
                  Object.entries(item.requirements).forEach(([mat, count]) => {
                    newInventory[mat] -= count;
                  });
                  newInventory[item.name] = (newInventory[item.name] || 0) + 1;
                  return newInventory;
                });
                setNotifications(prev => [...prev, `Crafted ${item.name}!`]);
              }
            }
          }}
          onBack={() => setActiveStore(null)}
        />
      )}
      {activeStore === 'credstore' && (
        <CredStore
          junk={junk}
          onSellJunk={(rate) => {
            if (junk >= rate) {
              setJunk(prev => prev - rate);
              setCredits(prev => prev + 1);
              setNotifications(prev => [...prev, `Sold ${rate} junk for 1 credit!`]);
            }
          }}
          onBack={() => setActiveStore(null)}
        />
      )}
      <Clicker 
        collectJunk={collectJunk} 
        collectTronics={collectTronics}
        electronicsUnlock={electronicsUnlock}
      />
      {showClickEnhancerUI && clickEnhancerLevel > 0 && <ClickEnhancerEffect level={clickEnhancerLevel} />}
      {ownedItems.scrapDrone > 0 && <DroneEffect numDrones={ownedItems.scrapDrone} />}
      <Notifications notifications={notifications} />
      {showCheatMenu && (
        <CheatMenu 
          onReset={handleReset}
          onAddJunk={(amount) => setJunk(prev => prev + amount)}
          onClose={() => setShowCheatMenu(false)}
          onResetTutorial={() => setTutorialStage(0)}
          onNextTutorial={() => setTutorialStage(prev => prev + 1)}
        />
      )}
      {showActiveCheats && (
        <ActiveCheats
          cheats={activeCheatsList}
          onToggleCheat={(cheatName) => setActiveCheatsList(prev => ({
            ...prev,
            [cheatName]: !prev[cheatName]
          }))}
          onClose={() => setShowActiveCheats(false)}
        />
      )}
      {showSettings && (
        <div className="store-container settings-menu">
          <div className="settings-header">
            <h2>Settings</h2>
            <button onClick={() => setShowSettings(false)}>Close</button>
          </div>
          <div className="settings-options">
            <label className="setting-option">
              <span>Show Click Enhancer Effect</span>
              <input
                type="checkbox"
                checked={showClickEnhancerUI}
                onChange={() => setShowClickEnhancerUI(prev => !prev)}
              />
            </label>
            <label className="setting-option">
              <span>Max Click Enhancers</span>
              <input
                type="number"
                min="1"
                max="10"
                value={localStorage.getItem('maxClickEnhancers') || 3}
                onChange={(e) => localStorage.setItem('maxClickEnhancers', e.target.value)}
              />
            </label>
            <label className="setting-option">
              <span>Show Drones</span>
              <input
                type="checkbox"
                checked={localStorage.getItem('showDrones') !== 'false'}
                onChange={(e) => localStorage.setItem('showDrones', e.target.checked)}
              />
            </label>
            <label className="setting-option">
              <span>Max Visible Drones</span>
              <input
                type="number"
                min="1"
                max="20"
                value={localStorage.getItem('maxVisibleDrones') || 10}
                onChange={(e) => localStorage.setItem('maxVisibleDrones', e.target.value)}
              />
            </label>
          </div>
        </div>
      )}
      <Notifications notifications={notifications} />
    </main>
  );
}