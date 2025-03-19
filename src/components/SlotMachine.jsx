
import React, { useState } from 'react';

export default function SlotMachine({ junk, onSpin, onClose }) {
  const [spinning, setSpinning] = useState(false);
  const [slots, setSlots] = useState(['?', '?', '?']);
  const spinCost = 100;
  
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
      
      // Set the slots first
      setSlots(newSlots);
      
      // Calculate winnings immediately
      let winnings = 0;
      if (newSlots[0] === newSlots[1] && newSlots[1] === newSlots[2]) {
        winnings = 1000; // Jackpot for all 3 matching
      } else if (newSlots[0] === newSlots[1] || newSlots[1] === newSlots[2]) {
        winnings = 200; // Small win for 2 matching
      }
      
      if (winnings > 0) {
        // Play win sound immediately
        const audio = new Audio(newSlots[0] === newSlots[1] && newSlots[1] === newSlots[2] 
          ? '/src/sounds/casino_winning.wav' 
          : 'https://assets.mixkit.co/active_storage/sfx/2019/casino-notification-sound.wav');
        audio.play();
      }
      
      // Short delay before showing results
      setTimeout(() => {
        setSpinning(false);
        
        if (winnings > 0) {
          onSpin(-winnings); // Negative cost means player wins
          // Play win sound and show popup after a short delay
          setTimeout(() => {
            alert(`Congratulations! You won ${winnings} Junk!`);
          }, 100);
        }
      }, 100);
    }, 1000);
  };

  // Make spin function globally accessible for cheats
  window.spinSlotMachine = (forceTriple, forceDouble) => spin(forceTriple, forceDouble);
  
  return (
    <div className="slot-machine-container">
      <div className="slot-machine-header">
        <h2>Junk Slots</h2>
        <button onClick={onClose}>Close</button>
      </div>
      <div className="slot-display">
        {slots.map((symbol, index) => (
          <div key={index} className={`slot ${spinning ? 'spinning' : ''}`}>
            {symbol}
          </div>
        ))}
      </div>
      <p>Cost per spin: {spinCost} Junk</p>
      <button 
        onClick={spin} 
        disabled={spinning || junk < spinCost}
      >
        {spinning ? 'Spinning...' : 'Spin!'}
      </button>
    </div>
  );
}
