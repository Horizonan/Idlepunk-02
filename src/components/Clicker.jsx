import React, { useState, useEffect, useRef } from 'react';

export default function Clickers({ collectJunk, collectTronics, electronicsUnlock }) {
  const [activeClicker, setActiveClicker] = useState('trash');
  const [showGlitch, setShowGlitch] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const holdIntervalRef = useRef(null);

  // Handle hold-to-click functionality
  useEffect(() => {
    if (isHolding && activeClicker === 'trash') {
      // Start clicking every second while holding
      holdIntervalRef.current = setInterval(() => {
        setClickCount(prev => {
          const newCount = prev + 1;
          if (newCount === 50) {
            setShowGlitch(true);
            setTimeout(() => setShowGlitch(false), 5000);
          }
          return newCount;
        });
        collectJunk();
      }, 1000);
    } else if (isHolding && activeClicker === 'electronics' && electronicsUnlock) {
      // Handle electronics hold-to-click
      holdIntervalRef.current = setInterval(() => {
        const boostICount = parseInt(localStorage.getItem('tronics_boost_count') || '0');
        const boostIICount = parseInt(localStorage.getItem('tronics_boost_II_count') || '0');
        const amount = 1;
        const totalBoost = boostICount + (boostIICount * 2);

        // Update manual click count and total clicks
        window.dispatchEvent(new CustomEvent('manualTronicsClick'));
        const currentTotal = parseInt(localStorage.getItem('totalTronicsClicks') || '0');
        localStorage.setItem('totalTronicsClicks', (currentTotal + 1).toString());

        if(totalBoost >= 1){
          const amount = (1 * totalBoost) + 1;
          collectTronics(amount);
        } else {
          collectTronics(amount);
        }
      }, 1000);
    } else {
      // Clear interval when not holding
      if (holdIntervalRef.current) {
        clearInterval(holdIntervalRef.current);
        holdIntervalRef.current = null;
      }
    }

    // Cleanup on component unmount
    return () => {
      if (holdIntervalRef.current) {
        clearInterval(holdIntervalRef.current);
      }
    };
  }, [isHolding, activeClicker, electronicsUnlock, collectJunk, collectTronics]);

  const handleMouseDown = () => {
    setIsHolding(true);
  };

  const handleMouseUp = () => {
    setIsHolding(false);
  };

  const handleMouseLeave = () => {
    setIsHolding(false);
  };

  return (
    <div className={`main ${showGlitch ? 'glitch-effect' : ''}`} id="clickers">
      {showGlitch && (
        <div className="glitch-message">
          Click faster to gather more j̷͓̀u̷͉̿n̷̰̚k̸̪̓...
        </div>
      )}
      <div>

        {activeClicker === 'electronics' && electronicsUnlock && (
          <img 
            src="public/Icons/electroClicker/electricIcon.svg" 
            alt="Electro Clicker" 
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onClick={() => {       
              const boostICount = parseInt(localStorage.getItem('tronics_boost_count') || '0');
              const boostIICount = parseInt(localStorage.getItem('tronics_boost_II_count') || '0');
              const amount = 1;
              const totalBoost = boostICount + (boostIICount * 2);

              // Update manual click count and total clicks
              window.dispatchEvent(new CustomEvent('manualTronicsClick'));
              const currentTotal = parseInt(localStorage.getItem('totalTronicsClicks') || '0');
              localStorage.setItem('totalTronicsClicks', (currentTotal + 1).toString());

              if(totalBoost >= 1){
                  const amount = (1 * totalBoost) + 1;
                  collectTronics(amount);
              } else {
                collectTronics(amount);
              }
            }} 
            className="tronics" 
          />
        )}  
        {activeClicker === 'trash' && (
          <img 
            src="Icons/TrashButtonBig.svg" 
            alt="Trash Clicker" 
            id="trashClicker" 
            className={`click-hint ${localStorage.getItem('firstClick') ? 'clicked' : ''}`}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onClick={(e) => {
              if (!localStorage.getItem('firstClick')) {
                localStorage.setItem('firstClick', 'true');
                e.target.classList.add('clicked');
              }
              setClickCount(prev => {
                const newCount = prev + 1;
                if (newCount === 50) {
                  setShowGlitch(true);
                  setTimeout(() => setShowGlitch(false), 5000);
                }
                return newCount;
              });
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