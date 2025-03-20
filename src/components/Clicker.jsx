
import React from 'react';

export default function Clickers({ collectJunk, collectTronics, electronicsUnlock }) {
  const [activeClicker, setActiveClicker] = React.useState('trash');

  return (
    <div className="main" id="clickers">
      {activeClicker === 'electronics' && electronicsUnlock && (
        <img src="/src/Icons/electroClicker/electronic-waste.png" alt="Electro Clicker" onClick={collectTronics} className="tronics" />
      )}
      {activeClicker === 'trash' && (
        <img src="/src/Icons/TrashButtonBig.png" alt="Trash Clicker" id="trashClicker" onClick={collectJunk} />
      )}
      <div className="clicker-buttons">
        <button 
          onClick={() => setActiveClicker('trash')}
          className={`clicker-select ${activeClicker === 'trash' ? 'active' : ''}`}
        >
          Trash Clicker
        </button>
        {electronicsUnlock && (
          <button 
            onClick={() => setActiveClicker('electronics')}
            className={`clicker-select ${activeClicker === 'electronics' ? 'active' : ''}`}
          >
            Electronics Clicker
          </button>
        )}
      </div>
    </div>
  );
}
