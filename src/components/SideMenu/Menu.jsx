import React, { useState } from 'react';

export default function Menu({ onStoreSelect }) {
  const [showMenu, setShowMenu] = useState(true);
  const prestigeCount = parseInt(localStorage.getItem('prestigeCount') || '0');

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
        { id: 'marketplace', label: 'Junktown Nexus' },
        { id: 'scraptagon', label: 'The Scraptagon 🔒', disabled: true, tooltip: 'Under Construction' },
        { id: 'slotMachine', label: 'Slot Machine' },
        { id: 'coinFlip', label: 'Junk Flip' } // Added coinFlip button
      ]
    },
    help: {
      header: 'Help & Settings',
      buttons: [
        { id: 'tooltips', label: 'Game Tips' },
        { id: 'settings', label: 'Settings' },
      ]
    }
  };

  return (
    <div className={`menu-container ${showMenu ? '' : 'collapsed'}`}>
      <button className="menu-toggle" onClick={() => setShowMenu(prev => !prev)}>
        {showMenu ? 'Close' : '≡'}
      </button>
      <div className="menu-buttons">
        {Object.entries(menuCategories).map(([category, { header, buttons }]) => (
          <div key={category} className="menu-category">
            <h3 className="menu-category-header">{header}</h3>
            {buttons.map(button => (
              <button
                key={button.id}
                className={`menu-button ${button.id}-btn ${button.disabled ? 'disabled' : ''}`}
                onClick={() => {
                  if (!button.disabled) {
                    onStoreSelect(button.id);
                  }
                }}
                disabled={button.disabled}
                title={button.tooltip}
              >
                {button.label}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}