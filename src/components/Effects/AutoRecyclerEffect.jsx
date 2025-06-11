
import React, { useState, useEffect, useRef } from 'react';

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
  const isRunningRef = useRef(isRunning);

  // Keep ref in sync with state
  useEffect(() => {
    isRunningRef.current = isRunning;
  }, [isRunning]);

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
        // Store the recycler running state in localStorage so App.jsx can check it
        localStorage.setItem('autoRecyclerRunning', 'true');
        localStorage.setItem('autoRecyclerConsumption', junkRequired.toString());
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
      // Clear the recycler running state
      localStorage.removeItem('autoRecyclerRunning');
      localStorage.removeItem('autoRecyclerConsumption');
      setNotifications(prev => [...prev, `Auto Recycler stopped! Restored ${junkRequired.toLocaleString()} junk/sec`]);
    }
  };

  if (autoRecyclerCount === 0) return null;

  // Collapsed view - small recycler icon
  if (isCollapsed) {
    return (
      <div 
        onClick={() => setIsCollapsed(false)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '50px',
          height: '50px',
          background: `rgba(0, 0, 0, 0.9)`,
          border: `2px solid ${isRunning ? '#00FF00' : '#9400D3'}`,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 1000,
          transition: 'all 0.3s ease'
        }}
      >
        <div style={{
          fontSize: '20px',
          animation: isRunning ? 'spin 2s linear infinite' : 'none'
        }}>
          🔄
        </div>
        <style>
          {`
            @keyframes spin {
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
      right: '20px',
      background: 'rgba(0, 0, 0, 0.9)',
      border: `2px solid ${isRunning ? '#00FF00' : '#9400D3'}`,
      borderRadius: '8px',
      padding: '15px',
      color: 'white',
      fontSize: '12px',
      minWidth: '250px',
      zIndex: 1000
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px'
      }}>
        <h4 style={{ margin: 0, color: '#9400D3' }}>
          🔄 Auto Recyclers ({autoRecyclerCount})
        </h4>
        <div style={{ display: 'flex', gap: '5px' }}>
          <button
            onClick={() => setIsCollapsed(true)}
            style={{
              padding: '3px 6px',
              backgroundColor: '#666',
              color: 'white',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer',
              fontSize: '8px'
            }}
          >
            −
          </button>
          <button
            onClick={handleStartStop}
            style={{
              padding: '5px 10px',
              backgroundColor: isRunning ? '#FF4444' : '#00AA00',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '10px',
              fontWeight: 'bold'
            }}
          >
            {isRunning ? 'STOP' : 'START'}
          </button>
        </div>
      </div>

      <div style={{ 
        marginBottom: '10px',
        fontSize: '10px',
        color: '#BBB'
      }}>
        Status: <span style={{ 
          color: isRunning ? '#00FF00' : '#FF4444',
          fontWeight: 'bold'
        }}>
          {isRunning ? 'ACTIVE' : 'INACTIVE'}
        </span>
      </div>

      <div style={{ 
        marginBottom: '10px',
        fontSize: '10px',
        color: '#BBB'
      }}>
        Required: {junkRequired.toLocaleString()} junk/sec<br/>
        Available: {totalJunkPerSecond.toLocaleString()} junk/sec
      </div>

      {isRunning && recyclerStates.slice(0, 3).map((state, index) => (
        <div key={state.id} style={{ marginBottom: '8px' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '10px'
          }}>
            <span>Unit {index + 1}:</span>
            <span style={{ color: '#00FF00' }}>
              {Math.floor(state.progress)}%
            </span>
          </div>
          <div style={{
            width: '100%',
            height: '6px',
            background: '#333',
            borderRadius: '3px',
            overflow: 'hidden',
            marginTop: '3px'
          }}>
            <div style={{
              width: `${Math.min(100, state.progress)}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #9400D3, #00FF00)',
              transition: 'width 0.5s ease'
            }} />
          </div>
        </div>
      ))}

      {autoRecyclerCount > 3 && (
        <div style={{ 
          textAlign: 'center', 
          color: '#888',
          marginTop: '8px',
          fontSize: '10px'
        }}>
          +{autoRecyclerCount - 3} more units
        </div>
      )}

      <div style={{ 
        marginTop: '10px', 
        fontSize: '9px', 
        color: '#888',
        borderTop: '1px solid #444',
        paddingTop: '8px'
      }}>
        Output: 1 scrap core per unit every 30s
      </div>
    </div>
  );
}
