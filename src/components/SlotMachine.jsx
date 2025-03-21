
import React, { useState, useEffect, useRef } from 'react';

export default function SlotMachine({ onClose, credits, setCredits }) {
  const [position, setPosition] = useState(() => {
    const saved = localStorage.getItem('slotMachinePosition');
    return saved ? JSON.parse(saved) : { x: window.innerWidth / 2 - 200, y: window.innerHeight / 2 - 150 };
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(['?', '?', '?']);
  const symbols = ['💎', '💰', '⚡', '🎲'];
  const betAmount = 50;

  useEffect(() => {
    localStorage.setItem('slotMachinePosition', JSON.stringify(position));
  }, [position]);

  const handleMouseDown = (e) => {
    if (e.target.tagName === 'BUTTON') return;
    setIsDragging(true);
    const rect = containerRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
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

  const spin = () => {
    if (credits < betAmount) return;
    setCredits(prevCredits => prevCredits - betAmount);
    setSpinning(true);
    setResult(['?', '?', '?']);

    const spinDuration = 2000;
    const intervalDuration = 100;
    let spinsRemaining = spinDuration / intervalDuration;
    
    const spinInterval = setInterval(() => {
      setResult(symbols.map(() => symbols[Math.floor(Math.random() * symbols.length)]));
      spinsRemaining--;
      
      if (spinsRemaining <= 0) {
        clearInterval(spinInterval);
        const finalResult = symbols.map(() => symbols[Math.floor(Math.random() * symbols.length)]);
        setResult(finalResult);
        setSpinning(false);
        
        // Calculate winnings
        const uniqueSymbols = new Set(finalResult);
        if (uniqueSymbols.size === 1) {
          // Jackpot - all symbols match
          setCredits(prevCredits => prevCredits + betAmount * 10);
        } else if (uniqueSymbols.size === 2) {
          // Two matching symbols
          setCredits(prevCredits => prevCredits + betAmount * 2);
        }
      }
    }, intervalDuration);
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        background: 'rgba(26, 26, 26, 0.95)',
        border: '2px solid #9400D3',
        borderRadius: '8px',
        padding: '20px',
        width: '400px',
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        zIndex: 1000
      }}
      onMouseDown={handleMouseDown}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0 }}>Slot Machine</h2>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'white', fontSize: '20px', cursor: 'pointer' }}>×</button>
      </div>
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '20px', 
        fontSize: '40px', 
        margin: '20px 0',
        background: '#222',
        padding: '20px',
        borderRadius: '4px'
      }}>
        {result.map((symbol, index) => (
          <div key={index} style={{ 
            width: '60px', 
            height: '60px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            background: '#333',
            borderRadius: '4px'
          }}>
            {symbol}
          </div>
        ))}
      </div>
      
      <div style={{ textAlign: 'center' }}>
        <p>Bet Amount: {betAmount} credits</p>
        <button 
          onClick={spin} 
          disabled={spinning || credits < betAmount}
          style={{
            padding: '10px 20px',
            fontSize: '18px',
            background: spinning ? '#444' : '#9400D3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: spinning ? 'not-allowed' : 'pointer'
          }}
        >
          {spinning ? 'Spinning...' : 'Spin!'}
        </button>
      </div>
    </div>
  );
}
