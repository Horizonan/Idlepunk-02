
import { useState } from 'react';

export default function CheatMenu({ onReset, onAddJunk, onClose, onResetTutorial, onNextTutorial }) {
  const [openCategories, setOpenCategories] = useState({
    resources: true,
    events: true,
    tutorial: true,
    reset: true
  });

  const toggleCategory = (category) => {
    setOpenCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  return (
    <div className="cheat-menu">
      <h2>Cheat Menu</h2>
      <div className="cheat-categories">
        <div className="cheat-category">
          <button 
            className="category-header"
            onClick={() => toggleCategory('resources')}
          >
            {openCategories.resources ? '▼' : '▶'} Resources
          </button>
          {openCategories.resources && (
            <div className="category-content">
              <button onClick={() => onAddJunk(1000)}>Add 1000 Junk</button>
              <button onClick={() => onAddJunk(10000)}>Add 10000 Junk</button>
              <button onClick={() => onAddJunk(100000)}>Add 100k Junk</button>
              <button onClick={() => onAddJunk(1000000)}>Add 1M Junk</button>
              <button onClick={() => {
                const materials = ['Wires', 'Metal Plates', 'Gear Bits'];
                materials.forEach(material => {
                  window.dispatchEvent(new CustomEvent('addMaterial', { 
                    detail: { material, amount: 10 }
                  }));
                });
              }}>Add Basic Materials</button>
              <button onClick={() => {
                const stored = localStorage.getItem('electroShards') || '0';
                const current = parseInt(stored);
                localStorage.setItem('electroShards', current + 10);
                window.location.reload();
              }}>Add 10 Crystals</button>
            </div>
          )}
        </div>

        <div className="cheat-category">
          <button 
            className="category-header"
            onClick={() => toggleCategory('events')}
          >
            {openCategories.events ? '▼' : '▶'} Events
          </button>
          {openCategories.events && (
            <div className="category-content">
              <button onClick={() => window.dispatchEvent(new CustomEvent('triggerSurge'))}>Trigger Surge</button>
              <button onClick={() => window.dispatchEvent(new CustomEvent('nextNews'))}>Next News</button>
              <button onClick={() => {
                const event = new CustomEvent('showCrystal');
                window.dispatchEvent(event);
              }}>Trigger Crystal</button>
            </div>
          )}
        </div>

        <div className="cheat-category">
          <button 
            className="category-header"
            onClick={() => toggleCategory('tutorial')}
          >
            {openCategories.tutorial ? '▼' : '▶'} Tutorial
          </button>
          {openCategories.tutorial && (
            <div className="category-content">
              <button onClick={onResetTutorial}>Reset Tutorial</button>
              <button onClick={onNextTutorial}>Next Tutorial</button>
            </div>
          )}
        </div>

        <div className="cheat-category">
          <button 
            className="category-header"
            onClick={() => toggleCategory('reset')}
          >
            {openCategories.reset ? '▼' : '▶'} Reset
          </button>
          {openCategories.reset && (
            <div className="category-content">
              <button onClick={() => onReset('junk')}>Reset Junk</button>
              <button onClick={() => onReset('credits')}>Reset Credits</button>
              <button onClick={() => onReset('achievements')}>Reset Achievements</button>
              <button onClick={() => onReset('all')} className="full-width">Reset Everything</button>
            </div>
          )}
        </div>
      </div>
      <button onClick={onClose} className="close-btn">Close</button>
    </div>
  );
}
