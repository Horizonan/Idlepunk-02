
import React, { useState, useRef, useEffect } from 'react';

export default function SlotMachine({ junk, onSpin, onClose }) {
  const [spinning, setSpinning] = useState(false);
  const [slots, setSlots] = useState(['?', '?', '?']);
  const spinCost = 100;
  const containerRef = useRef(null);
  
  const [position, setPosition] = useState(() => {
    const saved = localStorage.getItem('slotMachinePosition');
    return saved ? JSON.parse(saved) : { x: 100, y: 100 };
  });
  
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    localStorage.setItem('slotMachinePosition', JSON.stringify(position));
  }, [position]);

  const handleMouseDown = (e) => {
    if (e.target.classList.contains('slot-machine-header')) {
      setIsDragging(true);
      const rect = containerRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);
  
  const symbols = ['💰', '🗑️', '⚡', '🔧', '🎲'];
  
  const spin = (forceTriple = false, forceDouble = false) => {
    if (junk < spinCost) return;
    
    setSpinning(true);
    onSpin(spinCost);
    
    setTimeout(() => {
      let newSlots;
      if (forceTriple) {
        const symbol = symbols[Math.floor(Math.random() * symbols.length)];
        newSlots = [symbol, symbol, symbol];
      } else if (forceDouble) {
        const symbol = symbols[Math.floor(Math.random() * symbols.length)];
        const differentSymbol = symbols.filter(s => s !== symbol)[Math.floor(Math.random() * (symbols.length - 1))];
        newSlots = [symbol, symbol, differentSymbol];
      } else {
        newSlots = Array(3).fill(0).map(() => 
          symbols[Math.floor(Math.random() * symbols.length)]
        );
      }
      
      setSlots(newSlots);
      
      let winnings = 0;
      if (newSlots[0] === newSlots[1] && newSlots[1] === newSlots[2]) {
        winnings = 1000;
      } else if (newSlots[0] === newSlots[1] || newSlots[1] === newSlots[2]) {
        winnings = 200;
      }
      
      if (winnings > 0) {
        const audio = new Audio(newSlots[0] === newSlots[1] && newSlots[1] === newSlots[2] 
          ? '/src/sounds/casino_winning.wav' 
          : 'https://assets.mixkit.co/active_storage/sfx/2019/casino-notification-sound.wav');
        audio.play();
      }
      
      setTimeout(() => {
        setSpinning(false);
        
        if (winnings > 0) {
          onSpin(-winnings);
          setTimeout(() => {
            alert(`Congratulations! You won ${winnings} Junk!`);
          }, 100);
        }
      }, 100);
    }, 1000);
  };

  window.spinSlotMachine = (forceTriple, forceDouble) => spin(forceTriple, forceDouble);
  
  return (
    <div 
      ref={containerRef}
      className="slot-machine-container"
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        cursor: isDragging ? 'grabbing' : 'auto',
        transform: 'none',
        minWidth: '350px'
      }}
    >
      <div 
        className="slot-machine-header"
        style={{ cursor: 'grab' }}
        onMouseDown={handleMouseDown}
      >
        <h2>Junk Slots</h2>
        <button onClick={onClose}>Close</button>
      </div>
      <div className="slot-display" style={{ padding: '20px 0' }}>
        {slots.map((symbol, index) => (
          <div 
            key={index} 
            className={`slot ${spinning ? 'spinning' : ''}`}
            style={{ width: '80px', height: '80px', fontSize: '2.5em' }}
          >
            {symbol}
          </div>
        ))}
      </div>
      <button 
        onClick={() => spin()} 
        disabled={spinning || junk < spinCost}
        style={{ width: '80%', margin: '10px auto', display: 'block' }}
      >
        Spin ({spinCost} Junk)
      </button>
    </div>
  );
}
