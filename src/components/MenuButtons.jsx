
import { useState } from 'react';

export default function MenuButtons() {
  const [activeMenu, setActiveMenu] = useState(null);

  const handleStore = () => {
    setActiveMenu('store');
    // Store logic will go here
  };

  const handleElectroShop = () => {
    setActiveMenu('electroshop');
    // ElectroShop logic will go here
  };

  const handleCredStore = () => {
    setActiveMenu('credstore');
    // CredStore logic will go here
  };

  const handleStats = () => {
    setActiveMenu('stats');
    // Stats logic will go here
  };

  const handleCraft = () => {
    setActiveMenu('craft');
    // Crafting logic will go here
  };

  return (
    <div className="main">
      <button onClick={handleStore} className={activeMenu === 'store' ? 'active' : ''}>Visit Store</button>
      <button onClick={handleElectroShop} className={activeMenu === 'electroshop' ? 'active' : ''}>Visit ElectroShop</button>
      <button onClick={handleCredStore} className={activeMenu === 'credstore' ? 'active' : ''}>Visit CredStore</button>
      <button onClick={handleStats} className={activeMenu === 'stats' ? 'active' : ''}>Upgrade Stats</button>
      <button onClick={handleCraft} className={activeMenu === 'craft' ? 'active' : ''}>Craft Items</button>
    </div>
  );
}
