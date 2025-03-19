import { useState, useEffect } from 'react';
import './App.css';
import Clicker from './components/Clicker';
import Achievements from './components/Achievements';
import CheatMenu from './components/CheatMenu';
import Store from './components/Store';
import ElectroStore from './components/ElectroStore';
import CredStore from './components/CredStore';
import Inventory from './components/Inventory';
import MenuButtons from './components/MenuButtons';
import NewsContainer from './components/NewsContainer';
import TrashSurge from './components/TrashSurge';
import Notifications from './components/Notifications';
import UnlockedItems from './components/UnlockedItems';
import TutorialSystem from './components/TutorialSystem';

export default function App() {
  const [showCheatMenu, setShowCheatMenu] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
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

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.shiftKey && e.key === 'H') {
        setShowCheatMenu(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
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
          cart: 500
        });
        break;
    }
  };
  const [electronicsUnlock, setElectronicsUnlock] = useState(() => localStorage.getItem('electronicsUnlock') === 'true');
  const [notifications, setNotifications] = useState([]);
  const [activeStore, setActiveStore] = useState(null);
  const [clickMultiplier, setClickMultiplier] = useState(() => Number(localStorage.getItem('clickMultiplier')) || 1);
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
    urbanRecycler: 3000
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setJunk(prev => prev + passiveIncome);
    }, 1000);
    return () => clearInterval(interval);
  }, [passiveIncome]);

  useEffect(() => {
    localStorage.setItem('credits', credits);
    localStorage.setItem('junk', junk);
    localStorage.setItem('electronicsUnlock', electronicsUnlock);
    localStorage.setItem('clickMultiplier', clickMultiplier);
    localStorage.setItem('passiveIncome', passiveIncome);
    localStorage.setItem('itemCosts', JSON.stringify(itemCosts));
  }, [credits, junk, electronicsUnlock, clickMultiplier, passiveIncome, itemCosts]);

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
      </div>
      <button className="achievements-btn" onClick={() => setShowAchievements(true)}>Achievements</button>
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
      <Notifications notifications={notifications} />
    </main>
  );
}