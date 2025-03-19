
import React from 'react';

export default function CheatMenu({ onReset, onAddJunk, onClose, onResetTutorial, onNextTutorial }) {
  return (
    <div className="cheat-menu">
      <h2>Cheat Menu</h2>
      <div className="cheat-buttons">
        <button onClick={() => onAddJunk(1000)}>Add 1000 Junk</button>
        <button onClick={() => onAddJunk(10000)}>Add 10000 Junk</button>
        <button onClick={() => onReset('junk')}>Reset Junk</button>
        <button onClick={() => onReset('credits')}>Reset Credits</button>
        <button onClick={() => onReset('all')}>Reset Everything</button>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={onResetTutorial}
            style={{ flex: 1, padding: '8px', fontSize: '14px' }}>
            Reset Tutorial
          </button>
          <button 
            onClick={onNextTutorial}
            style={{ flex: 1, padding: '8px', fontSize: '14px' }}>
            Next Tutorial
          </button>
        </div>
        <button onClick={() => window.dispatchEvent(new CustomEvent('triggerSurge'))}>Trigger Surge</button>
        <button onClick={() => window.dispatchEvent(new CustomEvent('nextNews'))}>Next News</button>
        <button onClick={() => window.dispatchEvent(new CustomEvent('slotForceTriple'))}>Force Slot Triple Win</button>
        <button onClick={() => window.dispatchEvent(new CustomEvent('slotForceDouble'))}>Force Slot Double Win</button>
        <button onClick={() => {
          localStorage.clear();
          onReset('all');
          window.location.reload();
        }} style={{backgroundColor: '#800000'}}>Delete Save</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
