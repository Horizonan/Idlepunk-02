
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
    <div className="sidebar">
      <button className="lock-button" onClick={() => setShowMenu(prev => !prev)}>
        {showMenu ? '← Close Menu' : 'Open Menu →'}
      </button>
      {showMenu && (
        <div className="sidebar-buttons">
          {Object.entries(menuCategories).map(([category, { header, buttons }]) => (
            <div key={category} className="sidebar-category">
              <h3 className="sidebar-category-header">{header}</h3>
              {buttons.map(button => (
                <button
                  key={button.id}
                  className="sidebar-button"
                  onClick={() => onStoreSelect(button.id)}>
                  {button.label}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
