
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
        { id: 'combat', label: 'The Scraptagon 🔒' },
        { id: 'slotMachine', label: 'Slot Machine' },
        { id: 'coinflip', label: 'Junk Flip' }
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
    <div className="menu-container">
      <button className="store-control-button menu-toggle" onClick={() => setShowMenu(prev => !prev)}>
        {showMenu ? '← Close Menu' : 'Open Menu →'}
      </button>
      {showMenu && (
        <div className="menu-buttons store-container">
          {Object.entries(menuCategories).map(([category, { header, buttons }]) => (
            <div key={category} className="store-category">
              <h3>{header}</h3>
              <div className="store-items">
                {buttons.map(button => (
                  <button
                    key={button.id}
                    className="store-item"
                    onClick={() => onStoreSelect(button.id)}>
                    <div className="item-header">
                      <strong>{button.label}</strong>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
