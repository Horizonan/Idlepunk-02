
import React, { useState, useEffect, useRef } from 'react';

// Flying junk piece component - Cookie Clicker style
function FlyingJunkPiece({ id, onAnimationEnd, position }) {
  const pieceRef = useRef();

  useEffect(() => {
    if (!pieceRef.current) return;

    // Random direction and distance like Cookie Clicker
    const angle = Math.random() * Math.PI * 2; // Random angle 0-360 degrees
    const distance = 60 + Math.random() * 80; // Random distance 60-140px
    const finalX = Math.cos(angle) * distance;
    const finalY = Math.sin(angle) * distance;

    // Set CSS animation
    pieceRef.current.style.setProperty('--final-x', `${finalX}px`);
    pieceRef.current.style.setProperty('--final-y', `${finalY}px`);
    pieceRef.current.classList.add('flying-junk-animate');

    // Remove after animation completes
    const timer = setTimeout(() => {
      onAnimationEnd(id);
    }, 1000); // 1 second animation

    return () => {
      clearTimeout(timer);
    };
  }, [id, onAnimationEnd]);

  return (
    <img
      ref={pieceRef}
      src="/clicker/tinyGear.png"
      alt="Junk piece"
      className="flying-junk-piece"
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        width: '16px',
        height: '16px',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 10000,
        imageRendering: 'pixelated'
      }}
    />
  );
}

export default function Clickers({ collectJunk, collectTronics, electronicsUnlock, enableHoldToClick }) {
  const [activeClicker, setActiveClicker] = useState('trash');
  const [showGlitch, setShowGlitch] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const holdIntervalRef = useRef(null);
  const [isPetting, setIsPetting] = useState(false);
  const [petStrokes, setPetStrokes] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const dragStarted = useRef(false);
  const [flyingJunkPieces, setFlyingJunkPieces] = useState([]);
  const junkPieceIdRef = useRef(0);

  // Hold-to-click configuration variables
  const [holdClickDelay, setHoldClickDelay] = useState(1000); // ms between clicks when holding
  const [holdClickAmount, setHoldClickAmount] = useState(1); // number of clicks per hold interval

  // Function to create flying junk pieces at mouse position
  const createFlyingJunkPieces = (mouseEvent) => {
    const newPiece = {
      id: junkPieceIdRef.current++,
      createdAt: Date.now(),
      position: {
        x: mouseEvent.clientX,
        y: mouseEvent.clientY
      }
    };

    setFlyingJunkPieces(prev => [...prev, newPiece]);
  };

  // Function to remove finished animation pieces
  const removeFlyingJunkPiece = (id) => {
    setFlyingJunkPieces(prev => prev.filter(piece => piece.id !== id));
  };

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
          
          // Track click for Click Ritual quest
          const now = Date.now();
          const clickRitualData = JSON.parse(localStorage.getItem('clickRitualData') || '{"clicks": [], "lastReset": 0}');
          clickRitualData.clicks.push(now);
          localStorage.setItem('clickRitualData', JSON.stringify(clickRitualData));
          
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

  const handleMouseDown = (event) => {
    if (activeClicker === 'trash') {
      dragStarted.current = true;
      setIsDragging(false);
      lastMousePos.current = { x: event.clientX, y: event.clientY };
    }
    if (enableHoldToClick) {
      setIsHolding(true);
    }
  };

  const handleMouseMove = (event) => {
    if(activeClicker === 'trash' && dragStarted.current){
      if (event.buttons === 1) { // Left mouse button is pressed
        const deltaX = Math.abs(event.clientX - lastMousePos.current.x);
        const deltaY = Math.abs(event.clientY - lastMousePos.current.y);
        const totalDelta = deltaX + deltaY;

        if (totalDelta > 5) { // Minimum movement required
          if (!isDragging) {
            setIsDragging(true);
            setIsPetting(true);
            console.log('Started petting the junk pile!');
          }

          // Only count significant movements as strokes
          if (totalDelta > 15) {
            setPetStrokes(prev => {
              const newStrokes = prev + 1;
              console.log('Pet stroke:', newStrokes);
              return newStrokes;
            });
          }

          lastMousePos.current = { x: event.clientX, y: event.clientY };
        }
      }
    }
  };

  const handleMouseUp = () => {
    if(activeClicker === 'trash' && dragStarted.current){
      if (petStrokes >= 3) {
        // Achievement unlocked after 3+ pet strokes (lowered threshold)
        localStorage.setItem('pettedJunkPile', 'true');
        console.log('Petting achievement unlocked!', petStrokes, 'strokes');
        console.log('localStorage pettedJunkPile set to:', localStorage.getItem('pettedJunkPile'));

        // Show feedback to user
        const junkPile = document.getElementById('trashClicker');
        if (junkPile) {
          junkPile.style.filter = 'hue-rotate(120deg)';
          setTimeout(() => {
            junkPile.style.filter = '';
          }, 1000);
        }

        // Force immediate achievement validation with multiple attempts
        for (let i = 0; i < 3; i++) {
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent('validateAchievements'));
          }, i * 100);
        }
      }

      // Reset drag state
      setIsDragging(false);
      setIsPetting(false);
      setPetStrokes(0);
      dragStarted.current = false;
    }
    if (enableHoldToClick) {
      setIsHolding(false);
    }
  };

  const handleMouseLeave = () => {
    if (enableHoldToClick) {
      setIsHolding(false);
    }
  };

  // Clean up old pieces periodically to prevent memory leaks and stuck animations
  useEffect(() => {
    const cleanup = setInterval(() => {
      const now = Date.now();
      setFlyingJunkPieces(prev => {
        const filtered = prev.filter(piece => now - piece.createdAt < 1500); // Remove pieces older than 1.5 seconds
        return filtered;
      });
    }, 1000);

    return () => clearInterval(cleanup);
  }, []);

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
          <div style={{ 
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
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

                // Track click for Click Ritual quest
                const now = Date.now();
                const clickRitualData = JSON.parse(localStorage.getItem('clickRitualData') || '{"clicks": [], "lastReset": 0}');
                clickRitualData.clicks.push(now);
                localStorage.setItem('clickRitualData', JSON.stringify(clickRitualData));

                // Create flying junk pieces animation at mouse cursor
                createFlyingJunkPieces(e);

                collectJunk();
              }} 
            />
          </div>
        )}
        
        {/* Flying junk pieces - render at mouse click position */}
        {flyingJunkPieces.map(piece => (
          <FlyingJunkPiece
            key={piece.id}
            id={piece.id}
            position={piece.position}
            onAnimationEnd={removeFlyingJunkPiece}
          />
        ))}
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