import React, { useState, useEffect, useRef } from 'react';

export default function Clickers({ collectJunk, collectTronics, electronicsUnlock, enableHoldToClick }) {
  const [activeClicker, setActiveClicker] = useState('trash');
  const [showGlitch, setShowGlitch] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [holdTimer, setHoldTimer] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartPos, setDragStartPos] = useState(null);
  const clickInterval = useRef(null);
  const holdIntervalRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPetting, setIsPetting] = useState(false);
  const [petStrokes, setPetStrokes] = useState(0);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const dragStarted = useRef(false);

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

  const handleMouseDown = (e) => {
    setIsDragging(false); // Reset drag state
    setDragStartPos({ x: e.clientX, y: e.clientY });

    if (enableHoldToClick) {
      setIsHolding(true);
      setHoldTimer(setTimeout(() => {
        setIsClicking(true);
        clickInterval.current = setInterval(() => {
          if (activeClicker === 'trash') {
            collectJunk();
          } else {
            collectTronics(1);
          }
        }, 100);
      }, 500));
    }
  };

  const handleMouseMove = (e) => {
    if (dragStartPos) {
      const deltaX = Math.abs(e.clientX - dragStartPos.x);
      const deltaY = Math.abs(e.clientY - dragStartPos.y);

      // If mouse moved more than 5 pixels, consider it a drag
      if (deltaX > 5 || deltaY > 5) {
        setIsDragging(true);
      }
    }
  };

  const handleMouseUp = () => {
    if (enableHoldToClick) {
      setIsHolding(false);
      setIsClicking(false);
      if (holdTimer) {
        clearTimeout(holdTimer);
        setHoldTimer(null);
      }
      if (clickInterval.current) {
        clearInterval(clickInterval.current);
        clickInterval.current = null;
      }
    }

    // Check if this was a drag action on the junk pile
    if (isDragging && activeClicker === 'trash' && dragStartPos) {
      localStorage.setItem('pettedJunkPile', 'true');
      // Trigger achievement validation
      window.dispatchEvent(new CustomEvent('validateAchievements'));
    }

    // Reset drag state
    setIsDragging(false);
    setDragStartPos(null);
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
            onMouseMove={handleMouseMove}
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
            className={`click-hint ${localStorage.getItem('firstClick') ? 'clicked' : ''} ${isAnimating ? 'click-animate' : ''} ${isPetting ? 'petting' : ''}`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
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
          className={`clicker-button ${activeClicker === 'trash' ? 'active' : ''}`}
          onClick={() => {
            if (activeClicker === 'trash' && !isDragging) {
              collectJunk();
            }
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          Trash Clicker
        </button>
        <button
          className={`clicker-button ${activeClicker === 'electronics' ? 'active' : ''}`}
          onClick={() => {
            if (activeClicker === 'electronics' && !isDragging) {
              collectTronics(1);
            }
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          Electronics Clicker
        </button>
      </div>
    </div>
  );
}