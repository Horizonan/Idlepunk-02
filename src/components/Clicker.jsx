
import React, { useState } from 'react';

export default function Clickers({ collectJunk, collectTronics, electronicsUnlock }) {
  const [activeClicker, setActiveClicker] = useState('trash');

  return (
    <div className="main" id="clickers">
      <div>
        {activeClicker === 'electronics' && electronicsUnlock && (
          <img 
            src="Icons/electroClicker/electronic-waste.png" 
            alt="Electro Clicker" 
            onClick={() => {
              const boostCount = parseInt(localStorage.getItem('tronics_boost_count') || '0');
              for(let i = 0; i <= boostCount; i++) {
                collectTronics();
              }
            }} 
            className="tronics" 
          />
        )}
        {activeClicker === 'trash' && (
          <img src="Icons/TrashButtonBig.png" alt="Trash Clicker" id="trashClicker" onClick={collectJunk} />
        )}
      </div>
      <div className="clicker-buttons">
        <button 
          onClick={() => setActiveClicker('trash')}
          className={`clicker-select ${activeClicker === 'trash' ? 'active' : ''}`}
        >
          Trash Clicker
        </button>
        <button 
          onClick={() => electronicsUnlock && setActiveClicker('electronics')}
          className={`clicker-select ${activeClicker === 'electronics' ? 'active' : ''} ${!electronicsUnlock ? 'locked' : ''}`}
          disabled={!electronicsUnlock}
        >
          Electronics Clicker
        </button>
      </div>
    </div>
  );
}
