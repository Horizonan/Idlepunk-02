import React, { useState, useEffect } from 'react';

export default function Clickers({ collectJunk, collectTronics, electronicsUnlock }) {
  const [activeClicker, setActiveClicker] = useState('trash');
  const [showGlitch, setShowGlitch] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [isHolding, setIsHolding] = useState(false); // Added state for hold-to-click

  useEffect(() => {
    let lastClickTime = 0;
    let isKeyHeld = false;
    let holdInterval = null;

    const performClick = () => {
      if (activeClicker === 'trash') {
        // Trigger visual animation
        const clickerElement = document.getElementById('trashClicker');
        if (clickerElement) {
          // Add scale animation
          clickerElement.style.transform = 'scale(0.95)';
          setTimeout(() => {
            clickerElement.style.transform = 'scale(1)';
          }, 100);
          
          if (!localStorage.getItem('firstClick')) {
            localStorage.setItem('firstClick', 'true');
            clickerElement.classList.add('clicked');
          }
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
      } else if (activeClicker === 'electronics' && electronicsUnlock) {
        // Trigger visual animation for electronics clicker
        const electroElement = document.querySelector('.tronics');
        if (electroElement) {
          electroElement.style.transform = 'scale(0.95)';
          setTimeout(() => {
            electroElement.style.transform = 'scale(1)';
          }, 100);
        }
        
        // Simulate electronics clicker click
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
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        
        const currentTime = Date.now();
        
        // Perform immediate click if not held or if 1 second has passed
        if (!isKeyHeld || currentTime - lastClickTime >= 1000) {
          performClick();
          lastClickTime = currentTime;
          
          // If not already holding, start the interval
          if (!isKeyHeld) {
            isKeyHeld = true;
            holdInterval = setInterval(() => {
              performClick();
              lastClickTime = Date.now();
            }, 1000); // 1 click per second
          }
        }
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        isKeyHeld = false;
        if (holdInterval) {
          clearInterval(holdInterval);
          holdInterval = null;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (holdInterval) {
        clearInterval(holdInterval);
      }
    };
  }, [activeClicker, electronicsUnlock, collectJunk, collectTronics]);

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
            onMouseDown={() => setIsHolding(true)}
            onMouseUp={() => setIsHolding(false)}
            onMouseLeave={() => setIsHolding(false)}
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