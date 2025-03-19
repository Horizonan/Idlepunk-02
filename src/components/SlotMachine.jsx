
import React, { useState } from 'react';

export default function SlotMachine({ junk, onSpin, onClose }) {
  const [spinning, setSpinning] = useState(false);
  const [slots, setSlots] = useState(['?', '?', '?']);
  const spinCost = 100;
  
  const symbols = ['💰', '🗑️', '⚡', '🔧', '🎲'];
  
  const spin = () => {
    if (junk < spinCost) return;
    
    setSpinning(true);
    onSpin(spinCost);
    
    setTimeout(() => {
      const newSlots = Array(3).fill(0).map(() => 
        symbols[Math.floor(Math.random() * symbols.length)]
      );
      setSlots(newSlots);
      setSpinning(false);
      
      // Calculate winnings
      let winnings = 0;
      if (newSlots[0] === newSlots[1] && newSlots[1] === newSlots[2]) {
        winnings = 1000; // Jackpot for all 3 matching
      } else if (newSlots[0] === newSlots[1] || newSlots[1] === newSlots[2]) {
        winnings = 200; // Small win for 2 matching
      }
      
      if (winnings > 0) {
        onSpin(-winnings); // Negative cost means player wins
      }
    }, 1000);
  };

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
