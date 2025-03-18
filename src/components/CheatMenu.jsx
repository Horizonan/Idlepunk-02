
import React from 'react';

export default function CheatMenu({ onReset, onAddJunk, onClose }) {
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
            onClick={() => localStorage.setItem('tutorialStage', '0')} 
            style={{ flex: 1, padding: '8px', fontSize: '14px' }}>
            Reset Tutorial
          </button>
          <button 
            onClick={() => localStorage.setItem('tutorialStage', String(Number(localStorage.getItem('tutorialStage') || 0) + 1))} 
            style={{ flex: 1, padding: '8px', fontSize: '14px' }}>
            Next Tutorial
          </button>
        </div>
        <button onClick={() => window.dispatchEvent(new CustomEvent('triggerSurge'))}>Trigger Surge</button>
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
