
import React, { useState, useEffect, useRef } from 'react';

// Flying junk piece component
function FlyingJunkPiece({ id, onAnimationEnd, clickerPosition }) {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
    opacity: 1,
    scale: 1
  });
  const animationRef = useRef();

  useEffect(() => {
    // Create rainbow arc effect - pieces spread out in a semi-circle downward
    const arcAngle = (Math.random() - 0.5) * Math.PI; // -90 to +90 degrees (semi-circle)
    const dropDistance = 80 + Math.random() * 120; // Shorter, more reasonable distance
    const lateralDistance = Math.sin(arcAngle) * dropDistance;
    const verticalDistance = Math.abs(Math.cos(arcAngle)) * dropDistance + 50; // Always drop down

    // Animation variables
    const startTime = performance.now();
    const duration = 2500; // Much slower - 2.5 seconds
    let animationId;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Gentle easing for a more natural dropping effect
      const easeProgress = progress * progress; // Quadratic ease-in for gravity feel

      setPosition({
        x: lateralDistance * easeProgress,
        y: verticalDistance * easeProgress,
        opacity: Math.max(0, 1 - (progress * 0.6)), // Fade out more gradually
        scale: Math.max(0.3, 1 - (progress * 0.4)) // Don't shrink as much
      });

      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      } else {
        onAnimationEnd(id);
      }
    };

    animationId = requestAnimationFrame(animate);
    animationRef.current = animationId;

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
        left: clickerPosition.x,
        top: clickerPosition.y,
        width: '20px',
        height: '20px',
        transform: `translate(-50%, -50%) translate(${position.x}px, ${position.y}px) scale(${position.scale})`,
        opacity: position.opacity,
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
  const [clickerPosition, setClickerPosition] = useState({ x: 0, y: 0 });
  const clickerRef = useRef(null);

  // Hold-to-click configuration variables
  const [holdClickDelay, setHoldClickDelay] = useState(1000); // ms between clicks when holding
  const [holdClickAmount, setHoldClickAmount] = useState(1); // number of clicks per hold interval

  // Function to update clicker position
  const updateClickerPosition = () => {
    if (clickerRef.current) {
      const rect = clickerRef.current.getBoundingClientRect();
      setClickerPosition({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      });
    }
  };

  // Update clicker position on mount and resize
  useEffect(() => {
    updateClickerPosition();
    window.addEventListener('resize', updateClickerPosition);
    return () => window.removeEventListener('resize', updateClickerPosition);
  }, []);

  // Function to create flying junk pieces
  const createFlyingJunkPieces = () => {
    updateClickerPosition(); // Update position before creating pieces
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
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <img 
              ref={clickerRef}
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
          </div>
        )}
        
        {/* Flying junk pieces - render with clicker position */}
        {flyingJunkPieces.map(piece => (
          <FlyingJunkPiece
            key={piece.id}
            id={piece.id}
            clickerPosition={clickerPosition}
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