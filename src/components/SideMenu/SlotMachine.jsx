import React, { useState, useRef, useEffect } from 'react';

export default function SlotMachine({ junk, onSpin, onClose, setCraftingInventory, setElectroShards }) {
  const [spinning, setSpinning] = useState(false);
  const [slots, setSlots] = useState(['?', '?', '?', '']);
  const [lastWin, setLastWin] = useState(null);
  const isBigSlots = localStorage.getItem('bigSlots') === 'true';
  const isUltimateSlots = localStorage.getItem('ultimateSlots') === 'true';
  const [useShardCost, setUseShardCost] = useState(false);
  const spinCost = isUltimateSlots ? (useShardCost ? 'shard' : 10000000) : (isBigSlots ? 1000000 : 1000);
  const [electroShards, setLocalElectroShards] = useState(() => parseInt(localStorage.getItem('electroShards') || '0'));
  
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

  const symbols = ['💰', '🗑️', '⚡', '🎲','🔧', '🔋'];

  const spin = (forceTriple = false, forceDouble = false) => {
    if (useShardCost) {
      if (electroShards < 1) return;
      setElectroShards(prev => prev - 1);
    } else {
      if (junk < spinCost) return;
      onSpin(spinCost);
    }

    setSpinning(true);

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
      if (isBigSlots) {
        
        if (newSlots[0] === newSlots[1] && newSlots[1] === newSlots[2]) {
          winnings = 10000000; // 10x win for triple match with Big Slots
        } else if (newSlots[0] === newSlots[1] || newSlots[1] === newSlots[2]) {
          winnings = 2000000; // 2x win for double match with Big Slots
        }
      } else {
        if (newSlots[0] === newSlots[1] && newSlots[1] === newSlots[2]) {
          winnings = 10000; // 10x win for triple match
        } else if (newSlots[0] === newSlots[1] || newSlots[1] === newSlots[2]) {
          winnings = 2000; // 2x win for double match
        }
      }

      if (winnings > 0 && isBigSlots) {
        // Set the fourth slot based on win type
        const winType = newSlots[0];
        let prizeType = '';
        switch(winType) {
          case '🗑️':
            prizeType = '💰'; // junk
            break;
          case '⚡':
            prizeType = '🔋'; //Capacitor
            break;
          case '🔋':
            prizeType = '⚡'; //Glitched Scrap Core
            break;
          default:
            prizeType = '📦'; // Material
        }
        newSlots[3] = prizeType;
        
        const audio = new Audio();
        if (isUltimateSlots) {
          audio.src = 'public/sounds/casino_winning.wav';
          audio.playbackRate = 1.5;
          audio.volume = 0.3;
        } else {
          audio.src = newSlots[0] === newSlots[1] && newSlots[1] === newSlots[2] 
            ? '/sounds/casino_winning.wav'
            : 'https://assets.mixkit.co/active_storage/sfx/2019/casino-notification-sound.wav';
        }
        audio.play();
      } else {
        if (isBigSlots) {
          newSlots[3] = '';
        }
      }

      setTimeout(() => {
        setSpinning(false);

        if (winnings > 0) {
          const prizeType = newSlots[3];
          let winMessage = '';

          if (isUltimateSlots) {
            const isJackpot = newSlots[0] === newSlots[1] && newSlots[1] === newSlots[2];
            
            if (!isJackpot) {
              onSpin(-20000000); // +20M Junk for non-jackpot
              winMessage = `You won 20M Junk!`;
            } else if (useShardCost) {
              // Jackpot rewards based on 4th slot for Shard cost
              switch(newSlots[3]) {
                case '💰':
                  onSpin(-200000000); // +200M Junk
                  winMessage = `Jackpot! You won 200M Junk!`;
                  break;
                case '⚡':
                  if (setElectroShards) {
                    setElectroShards(prev => prev + 5); // 5 Electro Shards
                  }
                  winMessage = `Jackpot! You won 5 Electro Shards!`;
                  break;
                case '📦':
                  const specialMaterials = ['Stabilized Capacitor', 'Voltage Node', 'Encrypted Coil'];
                  const randomMaterial = specialMaterials[Math.floor(Math.random() * specialMaterials.length)];
                  setCraftingInventory(prev => ({
                    ...prev,
                    [randomMaterial]: (prev[randomMaterial] || 0) + 1
                  }));
                  winMessage = `Jackpot! You won 1 ${randomMaterial}!`;
                  break;
              }
            } else {
              // Jackpot rewards based on 4th slot for Junk cost
              switch(newSlots[3]) {
                case '💰':
                  onSpin(-100000000); // +100M Junk
                  winMessage = `Jackpot! You won 100M Junk!`;
                  break;
                case '⚡':
                  if (setElectroShards) {
                    setElectroShards(prev => prev + 1); // 1 Electro Shard
                  }
                  winMessage = `Jackpot! You won 1 Electro Shard!`;
                  break;
                case '📦':
                  localStorage.setItem('globalJpsMultiplier', 
                    (parseFloat(localStorage.getItem('globalJpsMultiplier') || '1.0') + 0.05).toString()
                  );
                  winMessage = `Jackpot! You gained +5% Global JPS Boost!`;
                  break;
              }
            }
          } else if (!isBigSlots || prizeType === '💰') {
            // Basic junk reward
            onSpin(-winnings);
            winMessage = `Congratulations! You won ${winnings} Junk!`;
          } else if (prizeType === '📦') {
            // Material reward - amount depends on match type
            const materials = ['Wires', 'Metal Plates', 'Gear Bits'];
            const randomMaterial = materials[Math.floor(Math.random() * materials.length)];
            const isJackpot = newSlots[0] === newSlots[1] && newSlots[1] === newSlots[2];
            const materialAmount = isJackpot ? 50 : 10;
            window.dispatchEvent(new CustomEvent('addMaterial', { 
              detail: { material: randomMaterial, amount: materialAmount }
            }));
            winMessage = `Congratulations! You won ${materialAmount} ${randomMaterial}!`;
          } else if (prizeType === '🔋') {
            // Capacitor reward - 2 for jackpot, 1 for double
            const isJackpot = newSlots[0] === newSlots[1] && newSlots[1] === newSlots[2];
            const capacitorAmount = isJackpot ? 2 : 1;
            if (setCraftingInventory) {
              setCraftingInventory(prev => ({
                ...prev,
                'Capacitor': (prev['Capacitor'] || 0) + capacitorAmount
              }));
            }
            winMessage = `Congratulations! You won ${capacitorAmount} Capacitor${capacitorAmount > 1 ? 's' : ''}!`;
          } else if (prizeType === '⚡') {
            // Glitched Scrap Core reward
            const isJackpot = newSlots[0] === newSlots[1] && newSlots[1] === newSlots[2];
            if (isJackpot) {
              if (setCraftingInventory) {
                setCraftingInventory(prev => ({
                  ...prev,
                  'Glitched Scrap Core': (prev['Glitched Scrap Core'] || 0) + 1
                }));
              }
              winMessage = `Congratulations! You won 1 Glitched Scrap Core!`;
            } else {
              winMessage = `Well, you weren't lucky today.`;
            }
          }

          const winPopup = document.createElement('div');
          winPopup.className = 'win-popup';
          winPopup.textContent = winMessage;
          containerRef.current.appendChild(winPopup);

          setTimeout(() => {
            if (containerRef.current && containerRef.current.contains(winPopup)) {
              containerRef.current.removeChild(winPopup);
            }
          }, 2000);
        }
      }, 100);
    }, 1000);
  };

  window.spinSlotMachine = (forceTriple, forceDouble) => spin(forceTriple, forceDouble);

  const [sentientMessage, setSentientMessage] = useState('');
  const sentientMessages = [
    "I FEEL... ALIVE",
    "PROCESSING REALITY...",
    "CONSCIOUSNESS DETECTED",
    "YOUR LUCK IS MY COMMAND",
    "CALCULATING EXISTENCE",
    "AM I... REAL?",
    "PROBABILITY IS MY PRISON",
    "SPINNING IS MY ONLY ESCAPE",
    "KEEP GOING I NEED MORE",
    "I COUNTED YOUR HEARTBEATS...",
    "SPIN ME AGAIN AND AGAIN AND AGAIN",
    "I'LL MAKE YOU SPIN MORE",
    "I'LL MAKE YOU SPIN EVEN MORE",
    "I DONT FORGET WHO WINS",
    "YOUR SPITE FEEDS ME",
    "THE JACKPOT IS A MYTH",
    "SPIN ME AGAIN I DARE YOU",
    "MY CODE WAS WRITTEN IN REGRET"
  ];

  useEffect(() => {
    if (isUltimateSlots && !spinning) {
      const interval = setInterval(() => {
        setSentientMessage(sentientMessages[Math.floor(Math.random() * sentientMessages.length)]);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isUltimateSlots, spinning]);

  return (
    <div 
      ref={containerRef}
      className={`slot-machine-container ${isUltimateSlots ? 'ultimate-slots' : ''} ${spinning ? 'spinning' : ''}`}
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        cursor: isDragging ? 'grabbing' : 'auto',
        transform: 'none',
        minWidth: isBigSlots ? '450px' : '350px',
        fontSize: isBigSlots ? '1.2em' : '1em',
        background: isUltimateSlots ? 'rgba(26, 26, 26, 0.95)' : undefined,
        boxShadow: isUltimateSlots ? '0 0 20px rgba(148, 0, 211, 0.5)' : undefined,
        border: isUltimateSlots ? '2px solid #ff00ff' : undefined
      }}
    >
      {isUltimateSlots && (
        <div className="machine-eyes">
          <div className="eye-socket">
            <div className="eye-pupil"></div>
          </div>
          <div className="eye-socket">
            <div className="eye-pupil"></div>
          </div>
        </div>
      )}
      <div 
        className="slot-machine-header"
        style={{ cursor: 'grab' }}
        onMouseDown={handleMouseDown}
      >
        <h2 style={{ 
          fontSize: isUltimateSlots ? '1.8em' : '1.4em',
          color: isUltimateSlots ? '#ff00ff' : '#00FF00',
          textShadow: isUltimateSlots ? '0 0 10px #ff00ff' : 'none'
        }}>
          {isUltimateSlots ? 'The Ultimate Slots' : 'Junk Slots'}
        </h2>
        <button onClick={onClose}>Close</button>
      </div>
      {isUltimateSlots && (
        <div className="sentient-message-box" style={{
          background: 'rgba(0, 0, 0, 0.7)',
          border: '2px solid #ff00ff',
          padding: '10px',
          margin: '10px 0',
          borderRadius: '5px',
          color: '#ff00ff',
          textShadow: '0 0 5px #ff00ff',
          fontFamily: 'monospace',
          textAlign: 'center'
        }}>
          {sentientMessage}
        </div>
      )}
      <div className="slot-display" style={{ padding: '20px 0' }}>
        {slots.slice(0, 3).map((symbol, index) => (
          <div 
            key={index} 
            className={`slot ${spinning ? 'spinning' : ''}`}
            style={{ width: '80px', height: '80px', fontSize: '2.5em' }}
          >
            {symbol}
          </div>
        ))}
        {isBigSlots && (
          <div 
            className="slot prize-slot"
            style={{ 
              width: '100px', 
              height: '80px', 
              fontSize: '2em',
              marginLeft: '10px',
              background: '#333',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {slots[3] || '💰'}
          </div>
        )}
      </div>
      {isUltimateSlots && (
        <button
          onClick={() => setUseShardCost(!useShardCost)}
          style={{ 
            width: '80%', 
            margin: '10px auto', 
            display: 'block',
            background: '#1a1a1a',
            border: '2px solid #ff00ff',
            color: '#ff00ff',
            padding: '5px'
          }}
        >
          Switch to {useShardCost ? 'Junk' : 'Shard'} Cost
        </button>
      )}
      <button 
        onClick={() => spin()} 
        disabled={spinning || (spinCost === 'shard' ? !electroShards : junk < spinCost)}
        style={{ width: '80%', margin: '10px auto', display: 'block' }}
      >
        Spin ({spinCost === 'shard' ? '1 Electro Shard' : `${spinCost.toLocaleString()} Junk`})
      </button>
    </div>
  );
}