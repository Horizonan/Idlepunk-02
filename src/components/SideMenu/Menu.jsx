import React, { useState } from 'react';

export default function Menu({ onStoreSelect }) {
  const [showMenu, setShowMenu] = useState(true);

  const buttons = [
    { id: 'achievements', label: 'Achievements' },
    { id: 'marketplace', label: 'Marketplace' },
    { id: 'questLog', label: 'Quest Log' },
    { id: 'slotMachine', label: 'Slot Machine' },
    { id: 'settings', label: 'Settings' },
    { id: 'changelog', label: 'Changelog' }
  ];

  return (
    <div className={`menu-container ${showMenu ? '' : 'collapsed'}`}>
      <button className="menu-toggle" onClick={() => setShowMenu(prev => !prev)}>
        {showMenu ? 'Close' : '≡'}
      </button>
      <div className="menu-buttons">
        {buttons.map(button => (
          <button
            key={button.id}
            className={`menu-button ${button.id}-btn`}
            onClick={() => onStoreSelect(button.id)}>
            {button.label}
          </button>
        ))}
      </div>
    </div>
  );
}