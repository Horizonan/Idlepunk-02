
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

  const collectJunk = () => {
    setJunk(prev => prev + 1);
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

  const handleBuyTrashBag = () => buyItem(50, "Bought a Trash Bag!");
  const handleBuyPicker = () => buyItem(150, "Bought a Trash Picker!");
  const handleBuyCart = () => buyItem(500, "Bought a Shopping Cart!");
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
          credits={credits}
          junk={junk}
          onBuyTrashBag={handleBuyTrashBag}
          onBuyPicker={handleBuyPicker}
          onBuyCart={handleBuyCart}
        />
      )}
      {activeStore === 'electrostore' && (
        <ElectroStore 
          credits={credits}
          onBuySolderingIron={handleBuySolderingIron}
          onBuyMultimeter={handleBuyMultimeter}
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
