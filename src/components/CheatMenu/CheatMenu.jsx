import { useState, useRef, useEffect } from 'react';
import ResetProgress from '../ResetProgress/ResetProgress';

function setNextSurgeTimer() {
  // Placeholder implementation. Replace with actual timer logic.
  console.log('Next trash surge timer set to 10 seconds!');
  //  In a real implementation, you'd likely set a timer using setTimeout or a similar mechanism,
  //  and update the game state to reflect the new timer value.  For example:
  //  setTimeout(() => {
  //    // Update game state to trigger the surge after 10 seconds
  //  }, 10000);
}

export default function CheatMenu({ onReset, onAddJunk, onClose, onResetTutorial, onNextTutorial, setShowTrashBonus, onAddTronics, onAddSetPrestige, onAddElectroShard, onShowCrystal, onSetTronicsSurgeActive, onSetSurgeActive }) {
  const [openCategories, setOpenCategories] = useState({
    resources: false,
    events: false,
    tutorial: false,
    reset: false
  });

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const storedPosition = localStorage.getItem('cheatMenuPosition');
    if (storedPosition) {
      setPosition(JSON.parse(storedPosition));
    }
  }, []);

  useEffect(() => {
    const handleMouseUp = () => {
      setIsDragging(false);
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const newPosition = { x: rect.left, y: rect.top };
        setPosition(newPosition);
        localStorage.setItem('cheatMenuPosition', JSON.stringify(newPosition));
      }
    };

    window.addEventListener('mouseup', handleMouseUp);
    return () => window.removeEventListener('mouseup', handleMouseUp);
  }, [isDragging]);


  const toggleCategory = (category) => {
    setOpenCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    const handleMouseMove = (e) => {
      setPosition({
        x: e.clientX - 150, // Adjust offset as needed
        y: e.clientY - 30,  // Adjust offset as needed
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', () => window.removeEventListener('mousemove', handleMouseMove));
  };

  return (
    <div 
      ref={containerRef}
      className="cheat-menu"
      style={{
        left: position.x,
        top: position.y,
        cursor: isDragging ? 'grabbing' : 'default',
        width: '500px', // Increased width
        height: 'auto', // Allow height to adjust
        padding: '10px'
      }}
    >
      <div className="cheat-header" onMouseDown={handleMouseDown}>
        Cheat Menu
        <button id="cheatMenuClose" onClick={onClose}>×</button>
      </div>
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
              <button onClick={() => onAddJunk(1000)}>Add 1k Junk</button>
              <button onClick={() => onAddJunk(10000)}>Add 10k Junk</button>
              <button onClick={() => onAddJunk(100000)}>Add 100k Junk</button>
              <button onClick={() => onAddJunk(1000000)}>Add 1M Junk</button>
              <button onClick={() => onAddJunk(10000000)}>Add 10M Junk</button>
              <button onClick={() => onAddTronics(1000)}>Add 1k Tronics</button>
              <button onClick={() => onAddTronics(10000)}>Add 10k Tronics</button>
              <button onClick={() => onAddSetPrestige(1)}>Set Prestige 1</button>
              <button onClick={() => {
                const materials = ['Wires', 'Metal Plates', 'Gear Bits'];
                materials.forEach(material => {
                  window.dispatchEvent(new CustomEvent('addMaterial', { 
                    detail: { material, amount: 10 }
                  }));
                });
              }}>Add Basic Materials</button>
              <button onClick={() => onAddElectroShard(10)}>Add 10 Electro Shards</button>
              <button onClick={() => {
                localStorage.setItem('surgeCount', '3');
                localStorage.setItem('hadFirstSurge', 'true');
              }}>Set to 3 Surges</button>
            </div>
          )}
        </div>
        <button 
          className="category-header"
          onClick={() => toggleCategory('tools')}
        >
          {openCategories.tools ? '▼' : '▶'} Tools
        </button>
        {openCategories.tools && (
          <div className="category-content">
            <button onClick={() => {
              window.dispatchEvent(new CustomEvent('skipShardTimer'));
            }}>Skip Shard Timer</button>
          </div>
        )}
        <div className="cheat-category">
          <button 
            className="category-header"
            onClick={() => toggleCategory('events')}
          >
            {openCategories.events ? '▼' : '▶'} Events
          </button>
          {openCategories.events && (
            <div className="category-content">
              <button onClick={() => onSetSurgeActive(true)}>Trigger Surge</button>
              <button onClick={() => window.dispatchEvent(new CustomEvent('nextNews'))}>Next News</button>
              <button onClick={() => onShowCrystal(true)}>Trigger Crystal</button>
              <button onClick={() => onSetTronicsSurgeActive(true)}>Trigger Tronic Surge</button>
              <button onClick={() => { setShowTrashBonus(true); }}>Trigger Trash</button>
              <button onClick={() => {
                localStorage.removeItem('unlocked_tronics_boost');
                window.location.reload();
              }}>Lock Tronics Boost</button>
              <button onClick={() => {
                const skillLevels = {
                  scavengingFocus: 10,
                  greaseDiscipline: JSON.parse(localStorage.getItem('skillLevels'))?.greaseDiscipline || 0
                };
                localStorage.setItem('skillLevels', JSON.stringify(skillLevels));
                window.location.reload();
              }}>Max Scavenging Focus</button>
              <button onClick={() => {
                const skillLevels = {
                  scavengingFocus: JSON.parse(localStorage.getItem('skillLevels'))?.scavengingFocus || 0,
                  greaseDiscipline: 10
                };
                localStorage.setItem('skillLevels', JSON.stringify(skillLevels));
                window.location.reload();
              }}>Max Grease Discipline</button>
              <button onClick={setNextSurgeTimer}>Set Next Surge 10s</button>
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
              <ResetProgress onReset={() => onReset('all')} /> {/* Replacing 'Reset Everything' button */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}