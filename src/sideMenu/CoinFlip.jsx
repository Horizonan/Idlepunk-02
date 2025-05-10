
import React, { useState } from 'react';

export default function CoinFlip({ junk, onBet, onClose }) {
  const [betAmount, setBetAmount] = useState('');
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState(null);
  const [comment, setComment] = useState('');
  const [stats, setStats] = useState({
    wins: parseInt(localStorage.getItem('coinflip_wins') || '0'),
    losses: parseInt(localStorage.getItem('coinflip_losses') || '0'),
    highestWin: parseInt(localStorage.getItem('coinflip_highest_win') || '0')
  });

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
      
      // Update stats
      const newStats = {
        wins: stats.wins + (win ? 1 : 0),
        losses: stats.losses + (win ? 0 : 1),
        highestWin: win ? Math.max(stats.highestWin, Number(betAmount)) : stats.highestWin
      };
      setStats(newStats);
      
      // Save stats to localStorage
      localStorage.setItem('coinflip_wins', newStats.wins.toString());
      localStorage.setItem('coinflip_losses', newStats.losses.toString());
      localStorage.setItem('coinflip_highest_win', newStats.highestWin.toString());
      
      onBet(win ? Number(betAmount) : -Number(betAmount));
      setIsFlipping(false);
    }, 1500);
  };

  return (
    <div className="coin-flip-container">
      <div className="coin-flip-header">
        <h2>🎲 Junk Flip 🎲</h2>
        <button className="close-button" onClick={onClose}>Close</button>
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
            {isFlipping ? 'Flipping...' : 'Flip!'}
          </button>
        </div>
        
        {comment && (
          <div className="street-rat-comment">
            <span className="rat-icon">🐀</span>
            <p>{comment}</p>
          </div>
        )}

        <div className="stats-display">
          <div className="stat-item">
            <div>Wins</div>
            <div className="stat-value">{stats.wins}</div>
          </div>
          <div className="stat-item">
            <div>Losses</div>
            <div className="stat-value">{stats.losses}</div>
          </div>
          <div className="stat-item">
            <div>Best Win</div>
            <div className="stat-value">{stats.highestWin}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
