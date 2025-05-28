
import React, { useState, useEffect } from 'react';
import './RelayCascade.css';

export default function RelayCascade({ onClose, onComplete }) {
  const [grid, setGrid] = useState([]);
  const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 });
  const [targetPos, setTargetPos] = useState({ x: 4, y: 4 });
  const [signal, setSignal] = useState([]);
  const [movesLeft, setMovesLeft] = useState(8);
  const [rotatingRelays, setRotatingRelays] = useState([]);
  const [movingBlacklisted, setMovingBlacklisted] = useState([]);
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
      
      // Move blacklisted nodes every 4 seconds
      setMovingBlacklisted(prev => prev.map(blacklisted => {
        const possibleMoves = [
          { x: blacklisted.x + 1, y: blacklisted.y },
          { x: blacklisted.x - 1, y: blacklisted.y },
          { x: blacklisted.x, y: blacklisted.y + 1 },
          { x: blacklisted.x, y: blacklisted.y - 1 }
        ].filter(pos => 
          pos.x >= 0 && pos.x < 5 && pos.y >= 0 && pos.y < 5 &&
          !(pos.x === 0 && pos.y === 0) && !(pos.x === 4 && pos.y === 4)
        );
        
        if (possibleMoves.length > 0) {
          const newPos = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
          return { ...blacklisted, ...newPos };
        }
        return blacklisted;
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getNextDirection = (currentDir) => {
    const dirs = ['up', 'right', 'down', 'left'];
    const currentIndex = dirs.indexOf(currentDir);
    return dirs[(currentIndex + 1) % dirs.length];
  };

  const validatePath = (grid, start, target) => {
    // Advanced pathfinding with proper move counting
    const visited = new Map(); // Use Map to track best moves for each position
    const queue = [{ x: start.x, y: start.y, moves: 10 }];
    
    while (queue.length > 0) {
      const { x, y, moves } = queue.shift();
      const key = `${x},${y}`;
      
      // Skip if we've been here with more moves
      if (visited.has(key) && visited.get(key) >= moves) continue;
      if (moves < 0) continue;
      
      visited.set(key, moves);
      
      if (x === target.x && y === target.y) return true;
      
      // Check all directions
      for (const [dx, dy] of [[0, 1], [0, -1], [1, 0], [-1, 0]]) {
        const newX = x + dx;
        const newY = y + dy;
        
        if (newX >= 0 && newX < 5 && newY >= 0 && newY < 5) {
          const cellType = grid[newY][newX];
          
          // Skip blacklisted cells
          if (cellType === cellTypes.blacklisted) continue;
          
          // Check if horizontal movement is allowed (column switching)
          if (dx !== 0) { // Moving left or right
            const currentCellType = grid[y][x];
            if (currentCellType !== cellTypes.relay && 
                currentCellType !== cellTypes.rotating && 
                currentCellType !== cellTypes.start && 
                currentCellType !== cellTypes.target) {
              continue; // Block horizontal movement
            }
          }
          
          // Calculate moves for next position
          let newMoves;
          if (cellType === cellTypes.relay || cellType === cellTypes.rotating) {
            newMoves = moves; // Relay nodes don't cost moves (effectively +1)
          } else {
            newMoves = moves - 1; // Regular move costs 1
          }
          
          queue.push({ x: newX, y: newY, moves: newMoves });
        }
      }
    }
    
    return false;
  };

  const generateSimpleLevel = () => {
    const newGrid = Array(5).fill().map(() => Array(5).fill(cellTypes.empty));
    
    // Set start and target
    newGrid[0][0] = cellTypes.start;
    newGrid[4][4] = cellTypes.target;
    
    // Create a simple guaranteed path with relays
    newGrid[1][0] = cellTypes.relay; // Column 0
    newGrid[2][1] = cellTypes.relay; // Column 1
    newGrid[3][2] = cellTypes.relay; // Column 2
    newGrid[4][3] = cellTypes.relay; // Column 3
    
    // Add minimal obstacles
    newGrid[0][2] = cellTypes.blacklisted;
    newGrid[2][4] = cellTypes.blacklisted;
    
    setGrid(newGrid);
    setPlayerPos({ x: 0, y: 0 });
    setSignal([{ x: 0, y: 0 }]);
    setMovesLeft(10);
    setGameState('playing');
    setRotatingRelays([]);
    setMovingBlacklisted([]);
  };

  const initializeLevel = () => {
    const newGrid = Array(5).fill().map(() => Array(5).fill(cellTypes.empty));
    
    // Set start and target (always same positions)
    newGrid[0][0] = cellTypes.start;
    newGrid[4][4] = cellTypes.target;
    
    // Ensure at least one relay per column (excluding start/target columns)
    // Column 0 already has start, Column 4 already has target
    const guaranteedRelays = [];
    
    // For columns 1, 2, 3 - place at least one relay each
    for (let col = 1; col <= 3; col++) {
      const availableRows = [];
      for (let row = 0; row < 5; row++) {
        // Skip positions that would conflict with start/target
        if (!(col === 0 && row === 0) && !(col === 4 && row === 4)) {
          availableRows.push(row);
        }
      }
      
      const randomRow = availableRows[Math.floor(Math.random() * availableRows.length)];
      newGrid[randomRow][col] = cellTypes.relay;
      guaranteedRelays.push({ x: col, y: randomRow });
    }
    
    // Also ensure column 0 and 4 have at least one relay (excluding start/target)
    // Column 0 - place one relay somewhere other than start position
    const col0Rows = [1, 2, 3, 4];
    const col0Row = col0Rows[Math.floor(Math.random() * col0Rows.length)];
    newGrid[col0Row][0] = cellTypes.relay;
    guaranteedRelays.push({ x: 0, y: col0Row });
    
    // Column 4 - place one relay somewhere other than target position
    const col4Rows = [0, 1, 2, 3];
    const col4Row = col4Rows[Math.floor(Math.random() * col4Rows.length)];
    newGrid[col4Row][4] = cellTypes.relay;
    guaranteedRelays.push({ x: 4, y: col4Row });
    
    // Get remaining available positions
    const usedPositions = new Set(['0,0', '4,4']);
    guaranteedRelays.forEach(relay => {
      usedPositions.add(`${relay.x},${relay.y}`);
    });
    
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
    
    // Add 0-2 additional relays randomly (fewer relays = harder)
    const numAdditionalRelays = Math.floor(Math.random() * 3);
    for (let i = 0; i < numAdditionalRelays && i < shuffledPositions.length; i++) {
      const pos = shuffledPositions[i];
      newGrid[pos.y][pos.x] = cellTypes.relay;
    }
    
    // Add 2-4 blacklisted nodes (but not adjacent to relays)
    const numBlacklisted = 2 + Math.floor(Math.random() * 3);
    const remainingPositions = shuffledPositions.slice(numAdditionalRelays);
    
    // Filter out positions that are adjacent to relay nodes
    const isAdjacentToRelay = (x, y) => {
      const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // left, right, up, down
      return directions.some(([dx, dy]) => {
        const newX = x + dx;
        const newY = y + dy;
        if (newX >= 0 && newX < 5 && newY >= 0 && newY < 5) {
          const cellType = newGrid[newY][newX];
          return cellType === cellTypes.relay || cellType === cellTypes.rotating;
        }
        return false;
      });
    };
    
    const safeBlacklistedPositions = remainingPositions.filter(pos => 
      !isAdjacentToRelay(pos.x, pos.y)
    );
    
    const newMovingBlacklisted = [];
    for (let i = 0; i < numBlacklisted && i < safeBlacklistedPositions.length; i++) {
      const pos = safeBlacklistedPositions[i];
      newGrid[pos.y][pos.x] = cellTypes.blacklisted;
      
      // 30% chance this blacklisted node will be moving
      if (Math.random() < 0.3) {
        newMovingBlacklisted.push({ x: pos.x, y: pos.y });
      }
    }
    
    // Add 1 rotating relay (after blacklisted nodes are placed)
    const rotatingPositions = safeBlacklistedPositions.slice(numBlacklisted);
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
    
    // Validate that a path exists from start to target
    const isLevelSolvable = validatePath(newGrid, { x: 0, y: 0 }, { x: 4, y: 4 });
    
    if (!isLevelSolvable) {
      // If not solvable, retry generation (with counter to prevent infinite loops)
      const retryCount = (initializeLevel.retryCount || 0) + 1;
      if (retryCount < 10) {
        initializeLevel.retryCount = retryCount;
        initializeLevel();
        return;
      } else {
        // After 10 attempts, force a simpler layout
        console.warn("Generating simpler level after multiple attempts");
        initializeLevel.retryCount = 0;
        generateSimpleLevel();
        return;
      }
    }
    
    initializeLevel.retryCount = 0;
    
    setGrid(newGrid);
    setPlayerPos({ x: 0, y: 0 });
    setSignal([{ x: 0, y: 0 }]);
    setMovesLeft(10); // Increased to ensure solvability
    setGameState('playing');
    setRotatingRelays(newRotatingRelays);
    setMovingBlacklisted(newMovingBlacklisted);
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
    
    // Check if hitting blacklisted node (static or moving)
    const isOnMovingBlacklisted = movingBlacklisted.some(mb => mb.x === newPos.x && mb.y === newPos.y);
    if (cellType === cellTypes.blacklisted || isOnMovingBlacklisted) {
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
    const isMovingBlacklisted = movingBlacklisted.some(mb => mb.x === x && mb.y === y);

    if (cellType === cellTypes.start) {
      return <span className="start-node">📡</span>;
    }
    if (cellType === cellTypes.target) {
      return <span className="target-node">🎯</span>;
    }
    if (cellType === cellTypes.blacklisted || isMovingBlacklisted) {
      return <span className={`blacklisted-node ${isMovingBlacklisted ? 'moving' : ''}`}>❌</span>;
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

  const removeRandomBlacklisted = () => {
    const blacklistedPositions = [];
    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 5; x++) {
        if (grid[y][x] === cellTypes.blacklisted) {
          blacklistedPositions.push({ x, y });
        }
      }
    }
    
    if (blacklistedPositions.length > 0) {
      const randomIndex = Math.floor(Math.random() * blacklistedPositions.length);
      const posToRemove = blacklistedPositions[randomIndex];
      
      setGrid(prevGrid => {
        const newGrid = [...prevGrid];
        newGrid[posToRemove.y][posToRemove.x] = cellTypes.empty;
        return newGrid;
      });
      
      return true; // Successfully removed a blacklisted node
    }
    return false; // No blacklisted nodes to remove
  };

  // Expose the function globally for slot machine access
  React.useEffect(() => {
    window.removeBlacklistedFromRelay = removeRandomBlacklisted;
    return () => {
      delete window.removeBlacklistedFromRelay;
    };
  }, [grid]);

  const getCellClass = (x, y) => {
    const cellType = grid[y][x];
    const isPlayerHere = playerPos.x === x && playerPos.y === y;
    const isInSignalPath = signal.some(pos => pos.x === x && pos.y === y);
    const isMovingBlacklisted = movingBlacklisted.some(mb => mb.x === x && mb.y === y);

    let classes = ['grid-cell'];
    
    if (cellType === cellTypes.blacklisted || isMovingBlacklisted) classes.push('blacklisted');
    if (isMovingBlacklisted) classes.push('moving-blacklisted');
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
          <div className="legend-item">❌ Blacklisted (some move!)</div>
          <div className="legend-item">↑↓←→ Rotating Relay (+1 move)</div>
        </div></div>
        
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
