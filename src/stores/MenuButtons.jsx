import { useState, useEffect } from 'react';

export default function MenuButtons({ onStoreSelect, showInventory }) {
  const [showMenu, setShowMenu] = useState(true);

  return (
    <div className={`mainStore ${!showMenu ? 'collapsed' : ''}`}>
      <button className="menu-toggle" onClick={() => setShowMenu(prev => !prev)}>
        {showMenu ? 'Close' : '≡'}
      </button>
      <button onClick={() => {
        const activeStore = localStorage.getItem('activeStore');
        onStoreSelect(activeStore === 'store' ? null : 'store');
      }}>Junk Store</button>
      <button 
        onClick={() => {
          const activeStore = localStorage.getItem('activeStore');
          onStoreSelect(activeStore === 'electrostore' ? null : 'electrostore');
        }}
        className={!localStorage.getItem('hasPrestiged') ? 'locked-store' : ''}
        disabled={!localStorage.getItem('hasPrestiged')}
      >
        Electro Store {!localStorage.getItem('hasPrestiged') && '🔒'}
      </button>
      <button onClick={() => {
        const activeStore = localStorage.getItem('activeStore');
        onStoreSelect(activeStore === 'credstore' ? null : 'credstore');
      }}>Credit Store</button>
      <button onClick={() => {
        const event = new CustomEvent('toggleUpgradeStats');
        window.dispatchEvent(event);
      }}>Skills Center</button>
      <button onClick={() => {
        const activeStore = localStorage.getItem('activeStore');
        onStoreSelect(activeStore === 'craft' ? null : 'craft');
      }}>Crafting Menu</button>
      {showInventory && <button onClick={() => {
        const activeStore = localStorage.getItem('activeStore');
        onStoreSelect(activeStore === 'inventory' ? null : 'inventory');
      }}>Item Inventory</button>}
    </div>
  );
}