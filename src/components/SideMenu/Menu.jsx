
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
        { id: 'slotMachine', label: 'Slot Machine' }
      ]
    },
    help: {
      header: 'Help & Settings',
      buttons: [
        { id: 'tooltips', label: 'Tooltips' },
        { id: 'settings', label: 'Settings' },
        { id: 'changelog', label: 'Changelog' }
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
                className={`menu-button ${button.id}-btn`}
                onClick={() => onStoreSelect(button.id)}>
                {button.label}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
