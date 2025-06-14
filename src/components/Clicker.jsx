The flying junk animation logic is improved with better physics and cleanup mechanisms to prevent getting stuck.
```

```replit_final_file
import React, { useState, useEffect, useRef } from 'react';

// Flying junk piece component
function FlyingJunkPiece({ id, onAnimationEnd }) {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
    opacity: 1,
    scale: 1
  });
  const animationRef = useRef();

  useEffect(() => {
    // Random direction and distance
    const angle = Math.random() * 2 * Math.PI;
    const distance = 60 + Math.random() * 40;
    const targetX = Math.cos(angle) * distance;
    const targetY = Math.sin(angle) * distance;

    // Animation variables
    const startTime = performance.now();
    const duration = 800; // Shorter, snappier animation
    let animationId;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Simple linear easing to avoid getting stuck
      const easeProgress = progress;

      setPosition({
        x: targetX * easeProgress,
        y: targetY * easeProgress - (easeProgress * 15), // Slight upward arc
        opacity: Math.max(0, 1 - (progress * 1.2)), // Fade out faster
        scale: Math.max(0.1, 1 - (progress * 0.8))
      });

      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      } else {
        // Ensure cleanup happens
        onAnimationEnd(id);
      }
    };

    animationId = requestAnimationFrame(animate);
    animationRef.current = animationId;

    // Cleanup function
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [id, onAnimationEnd]);

  return (
    <img
      src="/clicker/tinyGear.png"
      alt="Junk piece"
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        width: '20px',
        height: '20px',
        transform: `translate(-50%, -50%) translate(${position.x}px, ${position.y}px) scale(${position.scale})`,
        opacity: position.opacity,
        pointerEvents: 'none',
        zIndex: 1000,
        imageRendering: 'pixelated' // Better rendering for small images
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

  // Function to create flying junk pieces
  const createFlyingJunkPieces = () => {
    const newPiece = {
      id: junkPieceIdRef.current++,
      createdAt: Date.now()
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
            overflow: 'visible',
            minHeight: '200px',
            minWidth: '200px',
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

                // Create flying junk pieces animation
                createFlyingJunkPieces();

                collectJunk();
              }} 
            />

            {/* Flying junk pieces container */}
            {flyingJunkPieces.map(piece => (
              <FlyingJunkPiece
                key={piece.id}
                id={piece.id}
                onAnimationEnd={removeFlyingJunkPiece}
              />
            ))}
          </div>
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