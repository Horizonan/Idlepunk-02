
import React, { useState, useEffect } from 'react';

export default function AutoRecyclerEffect({ 
  ownedItems, 
  passiveIncome,
  globalJpsMultiplier,
  setPassiveIncome,
  setCraftingInventory, 
  setNotifications,
  autoClicks,
  clickMultiplier
}) {
  const [recyclerStates, setRecyclerStates] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const autoRecyclerCount = ownedItems.autoRecycler || 0;
  const passiveJunkPerSecond = Math.floor(passiveIncome * globalJpsMultiplier);
  const autoClickerJunkPerSecond = Math.floor((autoClicks || 0) * (clickMultiplier || 1));
  const totalJunkPerSecond = passiveJunkPerSecond + autoClickerJunkPerSecond;
  const junkRequired = 10000 * autoRecyclerCount;

  useEffect(() => {
    if (autoRecyclerCount > 0) {
      // Initialize recycler states
      const states = Array(autoRecyclerCount).fill(null).map((_, index) => ({
        id: index,
        progress: 0,
        lastCraftTime: Date.now()
      }));
      setRecyclerStates(states);
    }
  }, [autoRecyclerCount]);

  useEffect(() => {
    if (!isRunning || recyclerStates.length === 0) return;

    const interval = setInterval(() => {
      const now = Date.now();
      
      setRecyclerStates(prevStates => {
        return prevStates.map(state => {
          const newState = { ...state };
          
          // Check if we can craft a scrap core (every 30 seconds)
          if (now - state.lastCraftTime >= 30000) {
            setCraftingInventory(prevInventory => ({
              ...prevInventory,
              "Scrap Core": (prevInventory["Scrap Core"] || 0) + 1
            }));
            setNotifications(prevNotifications => [
              ...prevNotifications, 
              `Auto Recycler Unit ${state.id + 1} crafted 1 Scrap Core!`
            ]);
            newState.lastCraftTime = now;
            newState.progress = 0;
          } else {
            // Update progress (0-100% over 30 seconds)
            newState.progress = ((now - state.lastCraftTime) / 30000) * 100;
          }
          
          return newState;
        });
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, recyclerStates.length, setCraftingInventory, setNotifications]);

  const handleStartStop = () => {
    if (!isRunning) {
      // Check if we have enough passive income
      if (totalJunkPerSecond >= junkRequired) {
        setIsRunning(true);
        setPassiveIncome(prev => prev - (junkRequired / globalJpsMultiplier));
        setNotifications(prev => [...prev, `Auto Recycler started! Consuming ${junkRequired.toLocaleString()} junk/sec`]);
        
        // Reset all progress when starting
        setRecyclerStates(prev => prev.map(state => ({
          ...state,
          progress: 0,
          lastCraftTime: Date.now()
        })));
      } else {
        setNotifications(prev => [...prev, `Need ${junkRequired.toLocaleString()} junk/sec to run Auto Recycler! You have ${totalJunkPerSecond.toLocaleString()}`]);
      }
    } else {
      setIsRunning(false);
      setPassiveIncome(prev => prev + (junkRequired / globalJpsMultiplier));
      setNotifications(prev => [...prev, `Auto Recycler stopped! Restored ${junkRequired.toLocaleString()} junk/sec`]);
    }
  };

  if (autoRecyclerCount === 0) return null;

  // Collapsed view - recycler-style UI element
  if (isCollapsed) {
    return (
      <div 
        onClick={() => setIsCollapsed(false)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '200px', // Moved further left to avoid prestige button
          width: '120px',
          height: '80px',
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          border: `2px solid ${isRunning ? '#00FF00' : '#9400D3'}`,
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 1000,
          transition: 'all 0.3s ease',
          boxShadow: isRunning 
            ? '0 0 20px rgba(0, 255, 0, 0.3), inset 0 0 15px rgba(0, 255, 0, 0.1)' 
            : '0 0 20px rgba(148, 0, 211, 0.3), inset 0 0 15px rgba(148, 0, 211, 0.1)',
          fontFamily: '"Courier New", monospace',
          color: '#00FF41'
        }}
      >
        <div style={{
          fontSize: '24px',
          animation: isRunning ? 'recyclerSpin 2s linear infinite' : 'none',
          marginBottom: '5px',
          filter: 'drop-shadow(0 0 3px currentColor)'
        }}>
          🔄
        </div>
        <div style={{
          fontSize: '8px',
          textAlign: 'center',
          fontWeight: 'bold',
          textShadow: '0 0 5px currentColor',
          lineHeight: '1.2'
        }}>
          AUTO RECYCLER
          <br />
          {isRunning ? 'ACTIVE' : 'STANDBY'}
        </div>
        <div style={{
          position: 'absolute',
          bottom: '3px',
          right: '3px',
          fontSize: '10px',
          color: '#666',
          fontWeight: 'bold'
        }}>
          {autoRecyclerCount}
        </div>
        <style>
          {`
            @keyframes recyclerSpin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '200px', // Moved further left to avoid prestige button
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      border: `2px solid ${isRunning ? '#00FF00' : '#9400D3'}`,
      borderRadius: '10px',
      padding: '15px',
      color: '#00FF41',
      fontSize: '12px',
      minWidth: '280px',
      zIndex: 1000,
      boxShadow: isRunning 
        ? '0 0 25px rgba(0, 255, 0, 0.4), inset 0 0 20px rgba(0, 255, 0, 0.1)' 
        : '0 0 25px rgba(148, 0, 211, 0.4), inset 0 0 20px rgba(148, 0, 211, 0.1)',
      fontFamily: '"Courier New", monospace'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12px'
      }}>
        <h4 style={{ 
          margin: 0, 
          color: '#9400D3',
          textShadow: '0 0 8px currentColor',
          fontSize: '14px',
          fontWeight: 'bold'
        }}>
          🔄 AUTO RECYCLER ARRAY ({autoRecyclerCount})
        </h4>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setIsCollapsed(true)}
            style={{
              padding: '4px 8px',
              backgroundColor: 'rgba(102, 102, 102, 0.8)',
              color: '#00FF41',
              border: '1px solid #666',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '10px',
              fontFamily: '"Courier New", monospace',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(102, 102, 102, 1)'}
            onMouseOut={(e) => e.target.style.backgroundColor = 'rgba(102, 102, 102, 0.8)'}
          >
            MINIMIZE
          </button>
          <button
            onClick={handleStartStop}
            style={{
              padding: '6px 12px',
              backgroundColor: isRunning ? 'rgba(255, 68, 68, 0.8)' : 'rgba(0, 170, 0, 0.8)',
              color: 'white',
              border: `2px solid ${isRunning ? '#FF4444' : '#00AA00'}`,
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '10px',
              fontWeight: 'bold',
              fontFamily: '"Courier New", monospace',
              textShadow: '0 0 5px currentColor',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
          >
            {isRunning ? 'SHUTDOWN' : 'INITIATE'}
          </button>
        </div>
      </div>

      <div style={{ 
        marginBottom: '12px',
        fontSize: '11px',
        color: '#BBB',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span>SYSTEM STATUS:</span>
        <span style={{ 
          color: isRunning ? '#00FF00' : '#FF4444',
          fontWeight: 'bold',
          textShadow: '0 0 5px currentColor'
        }}>
          {isRunning ? 'OPERATIONAL' : 'OFFLINE'}
        </span>
      </div>

      <div style={{ 
        marginBottom: '12px',
        fontSize: '10px',
        color: '#BBB',
        background: 'rgba(0, 0, 0, 0.3)',
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #333'
      }}>
        <div>JUNK REQUIREMENT: {junkRequired.toLocaleString()}/sec</div>
        <div>AVAILABLE SUPPLY: {totalJunkPerSecond.toLocaleString()}/sec</div>
        <div style={{ 
          color: totalJunkPerSecond >= junkRequired ? '#00FF00' : '#FF4444',
          fontWeight: 'bold'
        }}>
          STATUS: {totalJunkPerSecond >= junkRequired ? 'SUFFICIENT' : 'INSUFFICIENT'}
        </div>
      </div>

      {isRunning && recyclerStates.slice(0, 3).map((state, index) => (
        <div key={state.id} style={{ marginBottom: '10px' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '10px',
            marginBottom: '4px'
          }}>
            <span style={{ color: '#9400D3', fontWeight: 'bold' }}>
              UNIT-{(index + 1).toString().padStart(2, '0')}:
            </span>
            <span style={{ 
              color: '#00FF00',
              fontWeight: 'bold',
              textShadow: '0 0 3px currentColor'
            }}>
              {Math.floor(state.progress)}% COMPLETE
            </span>
          </div>
          <div style={{
            width: '100%',
            height: '8px',
            background: 'rgba(0, 0, 0, 0.5)',
            borderRadius: '4px',
            overflow: 'hidden',
            border: '1px solid #333'
          }}>
            <div style={{
              width: `${Math.min(100, state.progress)}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #9400D3 0%, #00FF41 50%, #00FF00 100%)',
              transition: 'width 0.5s ease',
              boxShadow: 'inset 0 0 5px rgba(255, 255, 255, 0.3)'
            }} />
          </div>
        </div>
      ))}

      {autoRecyclerCount > 3 && (
        <div style={{ 
          textAlign: 'center', 
          color: '#888',
          marginTop: '10px',
          fontSize: '10px',
          fontStyle: 'italic'
        }}>
          +{autoRecyclerCount - 3} additional units operating
        </div>
      )}

      <div style={{ 
        marginTop: '12px', 
        fontSize: '9px', 
        color: '#666',
        borderTop: '1px solid #444',
        paddingTop: '8px',
        textAlign: 'center',
        fontStyle: 'italic'
      }}>
        OUTPUT RATE: 1 scrap core per unit every 30 seconds
      </div>
    </div>
  );
}
