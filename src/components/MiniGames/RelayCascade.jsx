
import React, { useState, useEffect } from 'react';
import './RelayCascade.css';

export default function RelayCascade({ onClose, onComplete }) {
  const [grid, setGrid] = useState([]);
  const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 });
  const [targetPos, setTargetPos] = useState({ x: 4, y: 4 });
  const [signal, setSignal] = useState([]);
  const [movesLeft, setMovesLeft] = useState(8);
  const [rotatingRelays, setRotatingRelays] = useState([]);
  const [gameState, setGameState] = useState('playing'); // playing, won, lost
  const [currentDirection, setCurrentDirection] = useState('right');

  const directions = {
    up: { x: 0, y: -1, symbol: '↑' },
    down: { x: 0, y: 1, symbol: '↓' },
    left: { x: -1, y: 0, symbol: '←' },
    right: { x: 1, y: 0, symbol: '→' }
  };

  const cellTypes = {
    empty: 0,
    relay: 1,
    blacklisted: 2,
    rotating: 3,
    target: 4,
    start: 5
  };

  useEffect(() => {
    initializeLevel();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotatingRelays(prev => prev.map(relay => ({
        ...relay,
        direction: getNextDirection(relay.direction)
      })));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getNextDirection = (currentDir) => {
    const dirs = ['up', 'right', 'down', 'left'];
    const currentIndex = dirs.indexOf(currentDir);
    return dirs[(currentIndex + 1) % dirs.length];
  };

  const initializeLevel = () => {
    const newGrid = Array(5).fill().map(() => Array(5).fill(cellTypes.empty));
    
    // Set start and target (always same positions)
    newGrid[0][0] = cellTypes.start;
    newGrid[4][4] = cellTypes.target;
    
    // Get all available positions (excluding start and target)
    const availablePositions = [];
    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 5; x++) {
        if (!(x === 0 && y === 0) && !(x === 4 && y === 4)) {
          availablePositions.push({ x, y });
        }
      }
    }
    
    // Shuffle available positions
    const shuffledPositions = [...availablePositions].sort(() => Math.random() - 0.5);
    
    // Randomly place 4-6 regular relays
    const numRelays = 4 + Math.floor(Math.random() * 3);
    for (let i = 0; i < numRelays && i < shuffledPositions.length; i++) {
      const pos = shuffledPositions[i];
      newGrid[pos.y][pos.x] = cellTypes.relay;
    }
    
    // Randomly place 1-3 blacklisted nodes
    const numBlacklisted = 1 + Math.floor(Math.random() * 3);
    const remainingPositions = shuffledPositions.slice(numRelays);
    for (let i = 0; i < numBlacklisted && i < remainingPositions.length; i++) {
      const pos = remainingPositions[i];
      newGrid[pos.y][pos.x] = cellTypes.blacklisted;
    }
    
    // Randomly place 1-2 rotating relays
    const numRotating = 1 + Math.floor(Math.random() * 2);
    const finalPositions = remainingPositions.slice(numBlacklisted);
    const newRotatingRelays = [];
    const directions = ['up', 'right', 'down', 'left'];
    
    for (let i = 0; i < numRotating && i < finalPositions.length; i++) {
      const pos = finalPositions[i];
      newGrid[pos.y][pos.x] = cellTypes.rotating;
      newRotatingRelays.push({
        x: pos.x,
        y: pos.y,
        direction: directions[Math.floor(Math.random() * directions.length)]
      });
    }
    
    setGrid(newGrid);
    setPlayerPos({ x: 0, y: 0 });
    setSignal([{ x: 0, y: 0 }]);
    setMovesLeft(8);
    setGameState('playing');
    setRotatingRelays(newRotatingRelays);
  };

  const moveSignal = (direction) => {
    if (gameState !== 'playing' || movesLeft <= 0) return;

    const newPos = {
      x: playerPos.x + directions[direction].x,
      y: playerPos.y + directions[direction].y
    };

    // Check bounds
    if (newPos.x < 0 || newPos.x >= 5 || newPos.y < 0 || newPos.y >= 5) return;

    const cellType = grid[newPos.y][newPos.x];
    
    // Check if hitting blacklisted node
    if (cellType === cellTypes.blacklisted) {
      setGameState('lost');
      return;
    }

    // Update signal path
    const newSignal = [...signal, newPos];
    setSignal(newSignal);
    setPlayerPos(newPos);
    setMovesLeft(prev => prev - 1);
    setCurrentDirection(direction);

    // Check if reached target
    if (newPos.x === targetPos.x && newPos.y === targetPos.y) {
      setGameState('won');
      if (onComplete) {
        onComplete(true);
      }
      return;
    }

    // Check if out of moves
    if (movesLeft <= 1) {
      setGameState('lost');
      if (onComplete) {
        onComplete(false);
      }
    }
  };

  const getCellContent = (x, y) => {
    const cellType = grid[y][x];
    const isPlayerHere = playerPos.x === x && playerPos.y === y;
    const isInSignalPath = signal.some(pos => pos.x === x && pos.y === y);
    const rotatingRelay = rotatingRelays.find(r => r.x === x && r.y === y);

    if (cellType === cellTypes.start) {
      return <span className="start-node">📡</span>;
    }
    if (cellType === cellTypes.target) {
      return <span className="target-node">🎯</span>;
    }
    if (cellType === cellTypes.blacklisted) {
      return <span className="blacklisted-node">❌</span>;
    }
    if (cellType === cellTypes.relay) {
      return <span className="relay-node">🛰️</span>;
    }
    if (cellType === cellTypes.rotating && rotatingRelay) {
      return <span className="rotating-relay">{directions[rotatingRelay.direction].symbol}</span>;
    }
    if (isPlayerHere) {
      return <span className="signal-current">⚡</span>;
    }
    if (isInSignalPath) {
      return <span className="signal-path">•</span>;
    }
    return '';
  };

  const getCellClass = (x, y) => {
    const cellType = grid[y][x];
    const isPlayerHere = playerPos.x === x && playerPos.y === y;
    const isInSignalPath = signal.some(pos => pos.x === x && pos.y === y);

    let classes = ['grid-cell'];
    
    if (cellType === cellTypes.blacklisted) classes.push('blacklisted');
    if (cellType === cellTypes.relay) classes.push('relay');
    if (cellType === cellTypes.rotating) classes.push('rotating');
    if (cellType === cellTypes.target) classes.push('target');
    if (cellType === cellTypes.start) classes.push('start');
    if (isPlayerHere) classes.push('current-position');
    if (isInSignalPath) classes.push('signal-path');

    return classes.join(' ');
  };

  return (
    <div className="relay-cascade-overlay">
      <div className="relay-cascade-container">
        <div className="relay-cascade-header">
          <h2>🛰️ Relay Cascade - Signal Hijack</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="game-info">
          <div className="moves-left">Moves: {movesLeft}</div>
          <div className="objective">Route signal from 📡 to 🎯</div>
        </div>

        <div className="game-grid">
          {grid.map((row, y) => 
            row.map((cell, x) => (
              <div
                key={`${x}-${y}`}
                className={getCellClass(x, y)}
              >
                {getCellContent(x, y)}
              </div>
            ))
          )}
        </div>

        <div className="controls">
          <div className="control-row">
            <button 
              className="move-btn"
              onClick={() => moveSignal('up')}
              disabled={gameState !== 'playing' || movesLeft <= 0}
            >
              ↑
            </button>
          </div>
          <div className="control-row">
            <button 
              className="move-btn"
              onClick={() => moveSignal('left')}
              disabled={gameState !== 'playing' || movesLeft <= 0}
            >
              ←
            </button>
            <button 
              className="move-btn"
              onClick={() => moveSignal('down')}
              disabled={gameState !== 'playing' || movesLeft <= 0}
            >
              ↓
            </button>
            <button 
              className="move-btn"
              onClick={() => moveSignal('right')}
              disabled={gameState !== 'playing' || movesLeft <= 0}
            >
              →
            </button>
          </div>
        </div>

        {gameState === 'won' && (
          <div className="game-result success">
            <h3>Signal Successfully Routed!</h3>
            <p>You've hijacked the planetary network!</p>
          </div>
        )}

        {gameState === 'lost' && (
          <div className="game-result failure">
            <h3>Signal Lost!</h3>
            <p>Either hit a blacklisted node or ran out of moves.</p>
            <button onClick={initializeLevel}>Try Again</button>
          </div>
        )}

        <div className="game-legend">
          <div className="legend-item">📡 Start Point</div>
          <div className="legend-item">🎯 Target</div>
          <div className="legend-item">🛰️ Relay</div>
          <div className="legend-item">❌ Blacklisted</div>
          <div className="legend-item">↑↓←→ Rotating Relay</div>
        </div>
      </div>
    </div>
  );
}
