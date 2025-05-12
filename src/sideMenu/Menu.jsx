import React, { useState } from 'react';

export default function Menu({ onStoreSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const prestigeCount = parseInt(localStorage.getItem('prestigeCount') || '0');

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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
    <>
      <button className="menu-toggle-button" onClick={toggleMenu}>
        {isOpen ? 'Close Menu' : 'Open Menu'}
      </button>
      <div className={`menu-container ${isOpen ? 'open' : ''}`}>
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
    </>
  );
}