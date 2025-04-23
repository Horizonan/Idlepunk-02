
import React, { useState } from 'react';
import './CoinFlip.css';

export default function CoinFlip({ junk, onBet, onClose }) {
  const [betAmount, setBetAmount] = useState('');
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState(null);
  const [comment, setComment] = useState('');

  const ratComments = {
    win: [
      "Nice flip! The junk gods are smiling.",
      "Heh, lucky toss there, scrapper!",
      "Even broken things can bring fortune!"
    ],
    lose: [
      "Tough luck, but that's how the scrap crumbles.",
      "The junk pile giveth, and the junk pile taketh away.",
      "Maybe stick to collecting trash instead?"
    ]
  };

  const flipCoin = () => {
    if (!betAmount || isFlipping || betAmount > junk) return;
    
    setIsFlipping(true);
    const win = Math.random() >= 0.5;
    
    setTimeout(() => {
      setResult(win);
      setComment(win ? 
        ratComments.win[Math.floor(Math.random() * ratComments.win.length)] :
        ratComments.lose[Math.floor(Math.random() * ratComments.lose.length)]
      );
      onBet(win ? Number(betAmount) : -Number(betAmount));
      setIsFlipping(false);
    }, 1500);
  };

  return (
    <div className="coin-flip-container">
      <div className="coin-flip-header">
        <h2>Junk Flip</h2>
        <button className="close-button" onClick={onClose}>×</button>
      </div>
      
      <div className="coin-game">
        <div className={`coin ${isFlipping ? 'flipping' : ''} ${result !== null ? (result ? 'heads' : 'tails') : ''}`}>
          <div className="side front">🗑️</div>
          <div className="side back">💰</div>
        </div>
        
        <div className="bet-controls">
          <input
            type="number"
            value={betAmount}
            onChange={(e) => setBetAmount(e.target.value)}
            placeholder="Enter junk amount"
            min="1"
            max={junk}
          />
          <button onClick={flipCoin} disabled={isFlipping || !betAmount || betAmount > junk}>
            Flip!
          </button>
        </div>
        
        {comment && (
          <div className="street-rat-comment">
            <span className="rat-icon">🐀</span>
            <p>{comment}</p>
          </div>
        )}
      </div>
    </div>
  );
}
