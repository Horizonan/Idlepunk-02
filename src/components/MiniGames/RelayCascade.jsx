
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
    
    // Create a guaranteed solvable path first
    // Place relay nodes to ensure column switching is possible
    const guaranteedPath = [
      { x: 0, y: 1 }, // Down from start
      { x: 0, y: 2 }, // Continue down
      { x: 1, y: 2 }, // Switch column (needs relay at 0,2)
      { x: 1, y: 3 }, // Continue down
      { x: 2, y: 3 }, // Switch column (needs relay at 1,3)
      { x: 3, y: 3 }, // Switch column (needs relay at 2,3)
      { x: 4, y: 3 }, // Switch column (needs relay at 3,3)
      { x: 4, y: 4 }  // Reach target
    ];
    
    // Place essential relays for column switching
    newGrid[0][2] = cellTypes.relay; // Essential for first column switch
    newGrid[1][3] = cellTypes.relay; // Essential for second column switch
    newGrid[2][3] = cellTypes.relay; // Essential for third column switch
    newGrid[3][3] = cellTypes.relay; // Essential for fourth column switch
    
    // Get remaining available positions
    const usedPositions = new Set(['0,0', '4,4', '0,2', '1,3', '2,3', '3,3']);
    const availablePositions = [];
    
    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 5; x++) {
        const key = `${x},${y}`;
        if (!usedPositions.has(key)) {
          availablePositions.push({ x, y });
        }
      }
    }
    
    // Shuffle remaining positions
    const shuffledPositions = [...availablePositions].sort(() => Math.random() - 0.5);
    
    // Add 2-4 additional relays randomly
    const numAdditionalRelays = 2 + Math.floor(Math.random() * 3);
    for (let i = 0; i < numAdditionalRelays && i < shuffledPositions.length; i++) {
      const pos = shuffledPositions[i];
      newGrid[pos.y][pos.x] = cellTypes.relay;
    }
    
    // Add 1-2 blacklisted nodes (not on the guaranteed path)
    const numBlacklisted = 1 + Math.floor(Math.random() * 2);
    const remainingPositions = shuffledPositions.slice(numAdditionalRelays);
    
    // Filter out positions that would block the guaranteed path
    const safePositions = remainingPositions.filter(pos => {
      // Don't place blacklisted nodes on vertical paths in columns 0 and 4
      if ((pos.x === 0 && pos.y < 3) || (pos.x === 4 && pos.y > 2)) {
        return false;
      }
      return true;
    });
    
    for (let i = 0; i < numBlacklisted && i < safePositions.length; i++) {
      const pos = safePositions[i];
      newGrid[pos.y][pos.x] = cellTypes.blacklisted;
    }
    
    // Add 1 rotating relay
    const rotatingPositions = safePositions.slice(numBlacklisted);
    const newRotatingRelays = [];
    const directions = ['up', 'right', 'down', 'left'];
    
    if (rotatingPositions.length > 0) {
      const pos = rotatingPositions[0];
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
    setMovesLeft(10); // Increased moves since relays add moves
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

    // Check if trying to move horizontally (change columns)
    if (direction === 'left' || direction === 'right') {
      const currentCellType = grid[playerPos.y][playerPos.x];
      // Can only change columns from relay nodes, rotating relays, start, or target
      if (currentCellType !== cellTypes.relay && 
          currentCellType !== cellTypes.rotating && 
          currentCellType !== cellTypes.start && 
          currentCellType !== cellTypes.target) {
        return; // Block horizontal movement
      }
    }

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
    
    // Relay nodes and rotating relays add one move
    if (cellType === cellTypes.relay || cellType === cellTypes.rotating) {
      setMovesLeft(prev => prev); // Don't decrease moves, effectively adding one
    } else {
      setMovesLeft(prev => prev - 1);
    }
    
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
    if (movesLeft <= 1 && cellType !== cellTypes.relay && cellType !== cellTypes.rotating) {
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
          <div className="legend-item">🛰️ Relay (+1 move)</div>
          <div className="legend-item">❌ Blacklisted</div>
          <div className="legend-item">↑↓←→ Rotating Relay (+1 move)</div>
        </div>
        
        <div className="game-rules">
          <div className="rules-title">Rules:</div>
          <div className="rule-item">• Can only switch columns from relay nodes</div>
          <div className="rule-item">• Relay nodes grant +1 move</div>
          <div className="rule-item">• Avoid blacklisted nodes</div>
        </div>
      </div>
    </div>
  );
}
