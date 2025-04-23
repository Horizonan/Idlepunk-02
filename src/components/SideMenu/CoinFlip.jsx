
import React, { useState } from 'react';
import './CoinFlip.css';

export default function CoinFlip({ junk, onBet, onClose }) {
  const [betAmount, setBetAmount] = useState('');
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState(null);
  const [ratComment, setRatComment] = useState('');

  const comments = [
    "Tough luck, pal. The streets are harsh.",
    "Ha! Even I could've called that one!",
    "The junk gods smile upon you today!",
    "Keep playing, I need entertainment!",
    "That flip was as rusty as my whiskers!"
  ];

  const flip = () => {
    const amount = parseInt(betAmount);
    if (isNaN(amount) || amount <= 0 || amount > junk) return;

    setIsFlipping(true);
    const win = Math.random() >= 0.5;
    
    setTimeout(() => {
      setIsFlipping(false);
      setResult(win);
      setRatComment(comments[Math.floor(Math.random() * comments.length)]);
      onBet(win ? amount : -amount);
    }, 1500);
  };

  return (
    <div className="coinflip-container">
      <div className="coinflip-header">
        <h2>Junk Flip</h2>
        <button onClick={onClose}>Close</button>
      </div>
      <div className="coin-game">
        <div className={`coin ${isFlipping ? 'flipping' : ''}`}>
          <div className="side front">🗑️</div>
          <div className="side back">💰</div>
        </div>
        <input
          type="number"
          value={betAmount}
          onChange={(e) => setBetAmount(e.target.value)}
          placeholder="Enter bet amount"
          disabled={isFlipping}
        />
        <button 
          onClick={flip}
          disabled={isFlipping || !betAmount || parseInt(betAmount) > junk}
        >
          Flip! ({betAmount} Junk)
        </button>
        {result !== null && !isFlipping && (
          <div className={`result ${result ? 'win' : 'lose'}`}>
            {result ? 'You won!' : 'You lost!'} {betAmount} Junk
          </div>
        )}
        {ratComment && (
          <div className="rat-comment">
            <img src="/Icons/Upgrades/autoClickerV1.png" alt="Street Rat" />
            <p>{ratComment}</p>
          </div>
        )}
      </div>
    </div>
  );
}
