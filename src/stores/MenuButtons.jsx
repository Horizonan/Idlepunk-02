import { useState, useEffect } from 'react';

export default function MenuButtons({ onStoreSelect, showInventory }) {
  const [showMenu, setShowMenu] = useState(true);

  return (
    <div className={`main ${!showMenu ? 'collapsed' : ''}`}>
      <button className="menu-toggle" onClick={() => setShowMenu(prev => !prev)}>
        {showMenu ? 'Close' : '≡'}
      </button>
      <button onClick={() => {
        const activeStore = localStorage.getItem('activeStore');
        onStoreSelect(activeStore === 'store' ? null : 'store');
      }}>Open Junk Store</button>
      <button 
        onClick={() => {
          const activeStore = localStorage.getItem('activeStore');
          onStoreSelect(activeStore === 'electrostore' ? null : 'electrostore');
        }}
        className={!localStorage.getItem('hasPrestiged') ? 'locked-store' : ''}
        disabled={!localStorage.getItem('hasPrestiged')}
      >
        Open Electro Store {!localStorage.getItem('hasPrestiged') && '🔒'}
      </button>
      <button onClick={() => {
        const activeStore = localStorage.getItem('activeStore');
        onStoreSelect(activeStore === 'credstore' ? null : 'credstore');
      }}>Open Credit Store</button>
      <button onClick={() => {
        const event = new CustomEvent('toggleUpgradeStats');
        window.dispatchEvent(event);
      }}>Open Skills Center</button>
      <button onClick={() => {
        const activeStore = localStorage.getItem('activeStore');
        onStoreSelect(activeStore === 'craft' ? null : 'craft');
      }}>Open Crafting Menu</button>
      {showInventory && <button onClick={() => {
        const activeStore = localStorage.getItem('activeStore');
        onStoreSelect(activeStore === 'inventory' ? null : 'inventory');
      }}>Open Item Inventory</button>}
    </div>
  );
}