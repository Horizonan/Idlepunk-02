import { useState, useEffect } from 'react';
import './App.css';
import Clicker from './components/Clicker';
import Store from './components/Store';
import ElectroStore from './components/ElectroStore';
import Inventory from './components/Inventory';
import MenuButtons from './components/MenuButtons';
import NewsContainer from './components/NewsContainer';
import Notifications from './components/Notifications';
import UnlockedItems from './components/UnlockedItems';

export default function App() {
  const [credits, setCredits] = useState(0);
  const [junk, setJunk] = useState(1300);
  const [electronicsUnlock, setElectronicsUnlock] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [activeStore, setActiveStore] = useState(null);
  const [clickMultiplier, setClickMultiplier] = useState(1);
  const [passiveIncome, setPassiveIncome] = useState(0);
  const [itemCosts, setItemCosts] = useState({
    trashBag: 10,
    trashPicker: 100,
    streetrat: 100,
    cart: 500
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setJunk(prev => prev + passiveIncome);
    }, 1000);
    return () => clearInterval(interval);
  }, [passiveIncome]);

  const collectJunk = () => {
    setJunk(prev => prev + clickMultiplier);
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
    if (credits >= itemCosts.trashBag) {
      setCredits(prev => prev - itemCosts.trashBag);
      setNotifications(prev => [...prev, "Scrap Bag gekauft!"]);
      setClickMultiplier(prev => prev + 1);
      setItemCosts(prev => ({...prev, trashBag: Math.floor(prev.trashBag * 1.1)}));
    }
  };

  const handleBuyPicker = () => {
    if (credits >= itemCosts.trashPicker) {
      setCredits(prev => prev - itemCosts.trashPicker);
      setNotifications(prev => [...prev, "Trash Picker gekauft!"]);
      setClickMultiplier(prev => prev + 3);
      setItemCosts(prev => ({...prev, trashPicker: Math.floor(prev.trashPicker * 1.1)}));
    }
  };

  const handleBuyStreetrat = () => {
    if (credits >= itemCosts.streetrat) {
      setCredits(prev => prev - itemCosts.streetrat);
      setNotifications(prev => [...prev, "Streetrat angeheuert!"]);
      setPassiveIncome(prev => prev + 1);
      setItemCosts(prev => ({...prev, streetrat: Math.floor(prev.streetrat * 1.15)}));
    }
  };

  const handleBuyCart = () => {
    if (credits >= itemCosts.cart) {
      setCredits(prev => prev - itemCosts.cart);
      setNotifications(prev => [...prev, "Shopping Cart gekauft!"]);
      setPassiveIncome(prev => prev + 5);
      setItemCosts(prev => ({...prev, cart: Math.floor(prev.cart * 1.15)}));
    }
  };

  const handleBuySolderingIron = () => {
    buyItem(1000, "Bought a Soldering Iron!");
    setElectronicsUnlock(true);
  };
  const handleBuyMultimeter = () => buyItem(2000, "Bought a Multimeter!");

  return (
    <main>
      <NewsContainer />
      <div className="stats">
        <p>Money: {credits.toFixed(2)}C</p>
        <p>Junk: {junk}</p>
      </div>
      <MenuButtons onStoreSelect={setActiveStore} />
      {activeStore === 'store' && (
        <Store 
          credits={junk}
          itemCosts={itemCosts}
          onBuyTrashBag={handleBuyTrashBag}
          onBuyPicker={handleBuyPicker}
          onBuyStreetrat={handleBuyStreetrat}
          onBuyCart={handleBuyCart}
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
      <Clicker 
        collectJunk={collectJunk} 
        collectTronics={collectTronics}
        electronicsUnlock={electronicsUnlock}
      />
      <Notifications notifications={notifications} />
    </main>
  );
}