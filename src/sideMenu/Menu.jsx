import React, { useState } from 'react';

export default function Menu({ onStoreSelect }) {
  const [showMenu, setShowMenu] = useState(true);
  const prestigeCount = parseInt(localStorage.getItem('prestigeCount') || '0');
  const junk = parseInt(localStorage.getItem('junk') || '0');

  const menuCategories = {
    progress: {
      header: 'Progress',
      buttons: [
        { id: 'questLog', label: 'Quest Log' },
        { id: 'achievements', label: 'Achievements' },
        ...(prestigeCount > 0 ? [{ id: 'techTree', label: 'Tech Tree' }] : [])
      ]
    },
    activities: {
      header: 'Activities',
      buttons: [
        { id: 'marketplace', label: 'Junktown Nexus', prestige: 0 },
        { id: 'slotMachine', label: 'Slot Machine', prestige: 0 },
        { id: 'coinflip', label: 'Junk Flip', prestige: 0 },
        { id: 'combat', label: 'Scraptagon Combat', prestige: 4 }
      ]
    },
    help: {
      header: 'Help & Settings',
      buttons: [
        { id: 'tooltips', label: 'Game Tips' },
        { id: 'stats', label: 'Statistics' },
        { id: 'settings', label: 'Settings' },
      ]
    }
  };

  const isUnlocked = (itemId) => {
    const item = Object.values(menuCategories)
      .flatMap(category => category.buttons)
      .find(button => button.id === itemId);

    if (!item) {
      return true; // Default to unlocked if item not found
    }

    const prestigeRequired = item.prestige || 0;
    const currentPrestige = parseInt(localStorage.getItem('prestigeCount') || '0');

    switch(itemId) {
      case 'marketplace':
        return true; // Always unlocked
      case 'slotMachine':
        return junk >= 10000 && currentPrestige >= prestigeRequired;
      case 'coinflip':
        return junk >= 1000 && currentPrestige >= prestigeRequired;
      case 'combat':
        return localStorage.getItem('scraptagon') === 'true' && currentPrestige >= prestigeRequired;
      default:
        return currentPrestige >= prestigeRequired;
    }
  };

  return (
    <div className={`menu-container ${showMenu ? '' : 'collapsed'}`}>
      <button className="menu-toggle" onClick={() => setShowMenu(prev => !prev)}>
        {showMenu ? 'Close' : '≡'}
      </button>
      <div className="menu-buttons">
        {Object.entries(menuCategories).map(([category, { header, buttons }]) => {
          const visibleButtons = buttons.filter(button => isUnlocked(button.id));
          
          // Only render the section if it has visible buttons
          if (visibleButtons.length === 0) return null;
          
          return (
            <div key={category} className="menu-category">
              <h3 className="menu-category-header">{header}</h3>
              {buttons.map(button => (
                isUnlocked(button.id) && (
                  <button
                    key={button.id}
                    className={`menu-button ${button.id}-btn`}
                    onClick={() => onStoreSelect(button.id)}>
                    {button.label}
                  </button>
                )
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}