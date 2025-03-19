import { useState, useEffect } from 'react';
import './App.css';
import Clicker from './components/Clicker';
import Achievements from './components/Achievements';
import CheatMenu from './components/CheatMenu';
import Store from './components/Store';
import ElectroStore from './components/ElectroStore';
import CredStore from './components/CredStore';
import AutomationStore from './components/AutomationStore';
import Inventory from './components/Inventory';
import MenuButtons from './components/MenuButtons';
import NewsContainer from './components/NewsContainer';
import TrashSurge from './components/TrashSurge';
import Notifications from './components/Notifications';
import UnlockedItems from './components/UnlockedItems';
import TutorialSystem from './components/TutorialSystem';
import QuestLog from './components/QuestLog';
import SlotMachine from './components/SlotMachine';
import ClickEnhancerEffect from './components/ClickEnhancerEffect';

export default function App() {
  const [showSlotMachine, setShowSlotMachine] = useState(false);
  const [showCheatMenu, setShowCheatMenu] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showClickEnhancerUI, setShowClickEnhancerUI] = useState(true);
  const [credits, setCredits] = useState(() => Number(localStorage.getItem('credits')) || 0);
  const [junk, setJunk] = useState(() => Number(localStorage.getItem('junk')) || 0);
  const [clickCount, setClickCount] = useState(() => Number(localStorage.getItem('clickCount')) || 0);
  const [achievements, setAchievements] = useState(() => JSON.parse(localStorage.getItem('achievements')) || [
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
    }
  ]);
  const [autoClicks, setAutoClicks] = useState(0); // Added state for auto clicks

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.shiftKey && e.key === 'H') {
        setShowCheatMenu(prev => !prev);
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
      case 'all':
        setJunk(0);
        setCredits(0);
        setClickMultiplier(1);
        setPassiveIncome(0);
        setElectronicsUnlock(false);
        setItemCosts({
          trashBag: 10,
          trashPicker: 100,
          streetrat: 100,
          cart: 500,
          junkMagnet: 1500,
          clickEnhancer: 2500,
          urbanRecycler: 3000,
          autoClicker: 5000 
        });
        setAutoClicks(0); //Reset autoclicks
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
      setTimeout(() => setIsSurgeActive(false), 5000);
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
  const [itemCosts, setItemCosts] = useState(() => JSON.parse(localStorage.getItem('itemCosts')) || {
    trashBag: 10,
    trashPicker: 100,
    streetrat: 100,
    cart: 500,
    junkMagnet: 1500,
    urbanRecycler: 3000,
    autoClicker: 5000,
    clickEnhancer: 2500
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
  }, [credits, junk, electronicsUnlock, clickMultiplier, passiveIncome, itemCosts, autoClicks, clickCount, achievements]);

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

      if (rewardGiven) {
        localStorage.setItem('achievements', JSON.stringify(newAchievements));
      }
      return newAchievements;
    });
  };

  const collectJunk = () => {
    const surgeMultiplier = isSurgeActive ? 2 : 1;
    setJunk(prev => prev + (clickMultiplier * surgeMultiplier));
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
      setHasUpgrade(true);
    }
  };

  const handleBuyPicker = () => {
    if (junk >= itemCosts.trashPicker) {
      setJunk(prev => prev - itemCosts.trashPicker);
      setNotifications(prev => [...prev, "Trash Picker gekauft!"]);
      setClickMultiplier(prev => prev + 3);
      setItemCosts(prev => ({...prev, trashPicker: Math.floor(prev.trashPicker * 1.1)}));
    }
  };

  const handleBuyStreetrat = () => {
    if (junk >= itemCosts.streetrat) {
      setJunk(prev => prev - itemCosts.streetrat);
      setNotifications(prev => [...prev, "Streetrat angeheuert!"]);
      setPassiveIncome(prev => prev + 1);
      setItemCosts(prev => ({...prev, streetrat: Math.floor(prev.streetrat * 1.15)}));
      setHasHelper(true);
    }
  };

  const handleBuyCart = () => {
    if (junk >= itemCosts.cart) {
      setJunk(prev => prev - itemCosts.cart);
      setNotifications(prev => [...prev, "Shopping Cart gekauft!"]);
      setPassiveIncome(prev => prev + 5);
      setItemCosts(prev => ({...prev, cart: Math.floor(prev.cart * 1.15)}));
    }
  };

  const handleBuyJunkMagnet = () => {
    if (junk >= itemCosts.junkMagnet) {
      setJunk(prev => prev - itemCosts.junkMagnet);
      setNotifications(prev => [...prev, "Junk Magnet gekauft!"]);
      setPassiveIncome(prev => prev + 10);
      setItemCosts(prev => ({...prev, junkMagnet: Math.floor(prev.junkMagnet * 1.15)}));
    }
  };

  const handleBuyUrbanRecycler = () => {
    if (junk >= itemCosts.urbanRecycler) {
      setJunk(prev => prev - itemCosts.urbanRecycler);
      setNotifications(prev => [...prev, "Urban Recycler gekauft!"]);
      setPassiveIncome(prev => prev + 20);
      setItemCosts(prev => ({...prev, urbanRecycler: Math.floor(prev.urbanRecycler * 1.15)}));
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
      <QuestLog tutorialStage={tutorialStage} />
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
        <p>Junk: {junk}</p>
        <p>Junk/sec: {(passiveIncome + (autoClicks * clickMultiplier)).toFixed(1)}</p>
      </div>
      <div className="button-container">
        <button className="achievements-btn" onClick={() => setShowAchievements(true)}>Achievements</button>
        <button className="quest-log-toggle" onClick={() => setShowQuestLog(prev => !prev)}>Quest Log</button>
        <button className="slot-machine-btn" onClick={() => setShowSlotMachine(true)}>Slot Machine</button>
        <button className="settings-btn" onClick={() => setShowSettings(true)}>Settings</button> {/* Added settings button */}
        {showSlotMachine && (
          <SlotMachine
            junk={junk}
            onSpin={(cost) => setJunk(prev => prev - cost)}
            onClose={() => setShowSlotMachine(false)}
          />
        )}
      </div>
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
          onBuyTrashBag={handleBuyTrashBag}
          onBuyPicker={handleBuyPicker}
          onBuyStreetrat={handleBuyStreetrat}
          onBuyCart={handleBuyCart}
          onBuyJunkMagnet={handleBuyJunkMagnet}
          onBuyUrbanRecycler={handleBuyUrbanRecycler}
          onBuyClickEnhancer={() => {
            if (junk >= itemCosts.clickEnhancer) {
              setJunk(prev => prev - itemCosts.clickEnhancer);
              setClickMultiplier(prev => prev + 10);
              setClickEnhancerLevel(prev => prev + 1);
              setItemCosts(prev => ({...prev, clickEnhancer: Math.floor(prev.clickEnhancer * 1.1)}));
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
      {showClickEnhancerUI && clickEnhancerLevel > 0 && <ClickEnhancerEffect />} {/*Conditional rendering of ClickEnhancerEffect */}
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
      {showSettings && (
        <div className="settings-menu">
          <h2>Settings</h2>
          <label>
            <input type="checkbox" checked={showClickEnhancerUI} onChange={() => setShowClickEnhancerUI(prev => !prev)} />
            Show Click Enhancer UI
          </label>
          <button onClick={() => setShowSettings(false)}>Close</button>
        </div>
      )}
      <Notifications notifications={notifications} />
    </main>
  );
}