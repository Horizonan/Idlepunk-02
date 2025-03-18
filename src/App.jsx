
import { useState, useEffect } from 'react';
import './App.css';
import Clicker from './components/Clicker';
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

  const collectJunk = () => {
    setJunk(prev => prev + 1);
  };

  const collectTronics = () => {
    if (electronicsUnlock) {
      setCredits(prev => prev + 1);
    }
  };

  return (
    <main>
      <NewsContainer />
      <div className="stats">
        <p>Money: {credits.toFixed(2)}C</p>
        <p>Junk: {junk}</p>
      </div>
      <MenuButtons />
      <Clicker 
        collectJunk={collectJunk} 
        collectTronics={collectTronics}
        electronicsUnlock={electronicsUnlock}
      />
      <Notifications notifications={notifications} />
    </main>
  );
}
