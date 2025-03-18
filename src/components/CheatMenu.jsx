
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
