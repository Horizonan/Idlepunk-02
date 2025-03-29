
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
              const boostICount = parseInt(localStorage.getItem('tronics_boost_count') || '0');
              const boostIICount = parseInt(localStorage.getItem('tronics_boost_II_count') || '0');
              const totalBoost = boostICount + (boostIICount * 2);
              for(let i = 0; i <= totalBoost; i++) {
                collectTronics();
              }
            }} 
            className="tronics" 
          />
        )}
        {activeClicker === 'trash' && (
          <img 
            src="Icons/TrashButtonBig.png" 
            alt="Trash Clicker" 
            id="trashClicker" 
            className={`click-hint ${localStorage.getItem('firstClick') ? 'clicked' : ''}`}
            onClick={(e) => {
              if (!localStorage.getItem('firstClick')) {
                localStorage.setItem('firstClick', 'true');
                e.target.classList.add('clicked');
              }
              collectJunk();
            }} 
          />
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
