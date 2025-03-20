
import React, { useState } from 'react';

export default function Clickers({ collectJunk, collectTronics, electronicsUnlock }) {
  const [activeClicker, setActiveClicker] = useState('trash');

  return (
    <div className="main" id="clickers">
      <div>
        {activeClicker === 'electronics' && electronicsUnlock && (
          <img src="/src/Icons/electroClicker/electronic-waste.png" alt="Electro Clicker" onClick={collectTronics} className="tronics" />
        )}
        {activeClicker === 'trash' && (
          <img src="/src/Icons/TrashButtonBig.png" alt="Trash Clicker" id="trashClicker" onClick={collectJunk} />
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
          className={`clicker-select ${activeClicker === 'electronics' ? 'active' : ''}`}
          disabled={!electronicsUnlock}
        >
          Electronics Clicker
        </button>
      </div>
    </div>
  );
}
