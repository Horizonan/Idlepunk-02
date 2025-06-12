
import React, { useState, useEffect } from 'react';
import { junkCalculationManager } from '../../utils/junkCalculation';

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
  const hasExpandedCapacities = localStorage.getItem('expandedJunkCapacities') === 'true';
  const junkRequired = (hasExpandedCapacities ? 15000 : 10000) * autoRecyclerCount;

  useEffect(() => {
    if (autoRecyclerCount > 0) {
      // Initialize recycler states
      const states = Array(autoRecyclerCount).fill(null).map((_, index) => ({
        id: index,
        progress: 0,
        lastCraftTime: Date.now(),
        lastMaterialTime: Date.now()
      }));
      setRecyclerStates(states);
    }

    // Cleanup function to unregister consumption when component unmounts
    return () => {
      junkCalculationManager.unregisterConsumer('autoRecycler');
    };
  }, [autoRecyclerCount]);

  useEffect(() => {
    if (!isRunning || recyclerStates.length === 0) return;

    const interval = setInterval(() => {
      const now = Date.now();
      
      setRecyclerStates(prevStates => {
        let shouldUpdate = false;
        const newStates = prevStates.map(state => {
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
            shouldUpdate = true;
          } else {
            // Only update progress every 2 seconds to reduce lag
            const newProgress = ((now - state.lastCraftTime) / 30000) * 100;
            if (Math.floor(newProgress) !== Math.floor(state.progress)) {
              newState.progress = newProgress;
              shouldUpdate = true;
            }
          }

          // Enhanced capacity: produce 5 basic materials every 30 seconds
          if (hasExpandedCapacities && now - (state.lastMaterialTime || state.lastCraftTime) >= 30000) {
            const materials = ['Wires', 'Metal Plates', 'Gear Bits'];
            const randomMaterial = materials[Math.floor(Math.random() * materials.length)];
            
            setCraftingInventory(prevInventory => ({
              ...prevInventory,
              [randomMaterial]: (prevInventory[randomMaterial] || 0) + 5
            }));
            
            setNotifications(prevNotifications => [
              ...prevNotifications, 
              `Auto Recycler Unit ${state.id + 1} produced 5 ${randomMaterial}!`
            ]);
            
            newState.lastMaterialTime = now;
            shouldUpdate = true;
          }
          
          return newState;
        });
        
        return shouldUpdate ? newStates : prevStates;
      });
    }, 2000); // Reduced from 1000ms to 2000ms

    return () => clearInterval(interval);
  }, [isRunning, recyclerStates.length, hasExpandedCapacities]);

  const handleStartStop = () => {
    if (!isRunning) {
      setIsRunning(true);
      // Register consumption with centralized manager
      junkCalculationManager.registerConsumer('autoRecycler', junkRequired);
      
      const netJunkPerSecond = totalJunkPerSecond - junkRequired;
      if (netJunkPerSecond < 0) {
        setNotifications(prev => [...prev, `Auto Recycler started! WARNING: Consuming ${junkRequired.toLocaleString()} junk/sec (Net: ${netJunkPerSecond.toLocaleString()} junk/sec)`]);
      } else {
        setNotifications(prev => [...prev, `Auto Recycler started! Consuming ${junkRequired.toLocaleString()} junk/sec`]);
      }
      
      // Reset all progress when starting
      setRecyclerStates(prev => prev.map(state => ({
        ...state,
        progress: 0,
        lastCraftTime: Date.now(),
        lastMaterialTime: Date.now()
      })));
    } else {
      setIsRunning(false);
      // Unregister consumption from centralized manager
      junkCalculationManager.unregisterConsumer('autoRecycler');
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
          {hasExpandedCapacities && <span style={{ color: '#00FF00', fontSize: '10px' }}> ⚙️</span>}
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
        Available: {totalJunkPerSecond.toLocaleString()} junk/sec<br/>
        <span style={{ 
          color: totalJunkPerSecond >= junkRequired ? '#00FF00' : '#FF4444',
          fontWeight: 'bold'
        }}>
          Net: {(totalJunkPerSecond - junkRequired).toLocaleString()} junk/sec
        </span>
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
        {hasExpandedCapacities && (
          <br />
        )}
        {hasExpandedCapacities && (
          <span style={{ color: '#00FF00' }}>
            + 5 basic materials per unit every 30s
          </span>
        )}
      </div>
    </div>
  );
}
