
import { useState } from 'react';

export default function MenuButtons({ onStoreSelect, showInventory }) {
  const [showMenu, setShowMenu] = useState(true);

  const menuCategories = {
    stores: {
      header: 'STORES',
      buttons: [
        {
          label: 'Junk Store',
          onClick: () => {
            const activeStore = localStorage.getItem('activeStore');
            onStoreSelect(activeStore === 'store' ? null : 'store');
          }
        },
        {
          label: 'Electro Store',
          onClick: () => {
            const activeStore = localStorage.getItem('activeStore');
            onStoreSelect(activeStore === 'electrostore' ? null : 'electrostore');
          },
          locked: !localStorage.getItem('hasPrestiged')
        },
        {
          label: 'Credit Store',
          onClick: () => {
            const activeStore = localStorage.getItem('activeStore');
            onStoreSelect(activeStore === 'credstore' ? null : 'credstore');
          }
        }
      ]
    },
    skills: {
      header: 'SKILLS',
      buttons: [
        {
          label: 'Skills Center',
          onClick: () => {
            const event = new CustomEvent('toggleUpgradeStats');
            window.dispatchEvent(event);
          }
        }
      ]
    },
    crafting: {
      header: 'CRAFTING',
      buttons: [
        {
          label: 'Crafting Menu',
          onClick: () => {
            const activeStore = localStorage.getItem('activeStore');
            onStoreSelect(activeStore === 'craft' ? null : 'craft');
          }
        },
        ...(showInventory ? [{
          label: 'Item Inventory',
          onClick: () => {
            const activeStore = localStorage.getItem('activeStore');
            onStoreSelect(activeStore === 'inventory' ? null : 'inventory');
          }
        }] : [])
      ]
    }
  };

  return (
    <div className={`mainStore ${!showMenu ? 'collapsed' : ''}`}>
      <button className="menu-toggle" onClick={() => setShowMenu(prev => !prev)}>
        {showMenu ? 'Close' : '≡'}
      </button>
      {Object.entries(menuCategories).map(([category, { header, buttons }]) => (
        <div key={category} className="menu-category">
          <h3 className="menu-category-header">{header}</h3>
          {buttons.map((button, index) => (
            <button
              key={index}
              onClick={button.onClick}
              className={`menu-button ${button.locked ? 'locked-store' : ''}`}
              disabled={button.locked}
            >
              {button.label} {button.locked && '🔒'}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
