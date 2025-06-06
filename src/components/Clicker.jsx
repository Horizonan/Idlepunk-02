import React, { useState, useEffect, useRef } from 'react';

export default function Clickers({ collectJunk, collectTronics, electronicsUnlock, enableHoldToClick }) {
  const [activeClicker, setActiveClicker] = useState('trash');
  const [showGlitch, setShowGlitch] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const holdIntervalRef = useRef(null);

  // Hold-to-click configuration variables
  const [holdClickDelay, setHoldClickDelay] = useState(1000); // ms between clicks when holding
  const [holdClickAmount, setHoldClickAmount] = useState(1); // number of clicks per hold interval

  // Handle keyboard events for Enter key hold-to-click
  useEffect(() => {
    if (!enableHoldToClick) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && !isHolding) {
        e.preventDefault();
        setIsHolding(true);
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === 'Enter' && isHolding) {
        e.preventDefault();
        setIsHolding(false);
      }
    };

    // Add event listeners
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Cleanup event listeners
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isHolding, enableHoldToClick]);

  // Handle hold-to-click functionality
  useEffect(() => {
    if (isHolding && activeClicker === 'trash') {
      // Start clicking based on configured delay and amount
      holdIntervalRef.current = setInterval(() => {
        // Trigger animation
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 200);

        // Process multiple clicks if holdClickAmount > 1
        for (let i = 0; i < holdClickAmount; i++) {
          setClickCount(prev => {
            const newCount = prev + 1;
            if (newCount === 50) {
              setShowGlitch(true);
              setTimeout(() => setShowGlitch(false), 5000);
            }
            return newCount;
          });
          collectJunk();
        }
      }, holdClickDelay);
    } else if (isHolding && activeClicker === 'electronics' && electronicsUnlock) {
      // Handle electronics hold-to-click
      holdIntervalRef.current = setInterval(() => {
        // Trigger animation
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 200);

        // Process multiple clicks if holdClickAmount > 1
        for (let i = 0; i < holdClickAmount; i++) {
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
      }, holdClickDelay);
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
  }, [isHolding, activeClicker, electronicsUnlock, collectJunk, collectTronics, holdClickDelay, holdClickAmount]);

  const handleMouseDown = () => {
    if (enableHoldToClick) {
      setIsHolding(true);
    }
  };

  const handleMouseUp = () => {
    if (enableHoldToClick) {
      setIsHolding(false);
    }
  };

  const handleMouseLeave = () => {
    if (enableHoldToClick) {
      setIsHolding(false);
    }
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
            src="/Icons/electroClicker/electricIcon.svg" 
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
            className={`tronics ${isAnimating ? 'click-animate' : ''}`} 
          />
        )}  
        {activeClicker === 'trash' && (
          <img 
            src="Icons/TrashButtonBig.svg" 
            alt="Trash Clicker" 
            id="trashClicker" 
            className={`click-hint ${localStorage.getItem('firstClick') ? 'clicked' : ''} ${isAnimating ? 'click-animate' : ''}`}
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
      <div className={`clicker-buttons ${localStorage.getItem('hasPrestiged') === 'true' ? 'prestige-unlocked' : ''}`}>
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