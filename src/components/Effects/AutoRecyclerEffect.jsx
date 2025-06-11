
import React, { useState, useEffect } from 'react';

export default function AutoRecyclerEffect({ 
  ownedRecyclers, 
  junk, 
  onConsumeJunk, 
  onGenerateScrapCore, 
  setNotifications 
}) {
  const [recyclerStates, setRecyclerStates] = useState([]);

  useEffect(() => {
    if (ownedRecyclers > 0) {
      // Initialize recycler states
      const states = Array(ownedRecyclers).fill(null).map((_, index) => ({
        id: index,
        isActive: false,
        progress: 0,
        lastConsumeTime: Date.now(),
        lastCraftTime: Date.now()
      }));
      setRecyclerStates(states);
    }
  }, [ownedRecyclers]);

  useEffect(() => {
    if (recyclerStates.length === 0) return;

    const interval = setInterval(() => {
      const now = Date.now();
      
      setRecyclerStates(prevStates => {
        return prevStates.map(state => {
          const newState = { ...state };
          
          // Check if we can consume junk (every 1 second = 10k junk)
          if (now - state.lastConsumeTime >= 1000) {
            if (junk >= 10000) {
              onConsumeJunk(10000);
              newState.lastConsumeTime = now;
              newState.isActive = true;
            } else {
              newState.isActive = false;
            }
          }
          
          // Check if we can craft a scrap core (every 30 seconds)
          if (state.isActive && now - state.lastCraftTime >= 30000) {
            onGenerateScrapCore(1);
            newState.lastCraftTime = now;
            setNotifications(prev => [...prev, "Auto Recycler Unit crafted 1 Scrap Core!"]);
          }
          
          // Update progress (0-100% over 30 seconds)
          if (state.isActive) {
            newState.progress = Math.min(100, ((now - state.lastCraftTime) / 30000) * 100);
          } else {
            newState.progress = 0;
          }
          
          return newState;
        });
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [recyclerStates.length, junk, onConsumeJunk, onGenerateScrapCore, setNotifications]);

  if (ownedRecyclers === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      background: 'rgba(0, 0, 0, 0.8)',
      border: '2px solid #9400D3',
      borderRadius: '8px',
      padding: '10px',
      color: 'white',
      fontSize: '12px',
      minWidth: '200px',
      zIndex: 1000
    }}>
      <h4 style={{ margin: '0 0 10px 0', color: '#9400D3' }}>
        🔄 Auto Recyclers ({ownedRecyclers})
      </h4>
      {recyclerStates.slice(0, 3).map((state, index) => (
        <div key={state.id} style={{ marginBottom: '5px' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span>Unit {index + 1}:</span>
            <span style={{ 
              color: state.isActive ? '#00FF00' : '#FF4444' 
            }}>
              {state.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
          <div style={{
            width: '100%',
            height: '4px',
            background: '#333',
            borderRadius: '2px',
            overflow: 'hidden',
            marginTop: '2px'
          }}>
            <div style={{
              width: `${state.progress}%`,
              height: '100%',
              background: state.isActive 
                ? 'linear-gradient(90deg, #9400D3, #00FF00)'
                : '#666',
              transition: 'width 0.5s ease'
            }} />
          </div>
        </div>
      ))}
      {ownedRecyclers > 3 && (
        <div style={{ 
          textAlign: 'center', 
          color: '#888',
          marginTop: '5px' 
        }}>
          +{ownedRecyclers - 3} more units
        </div>
      )}
      <div style={{ 
        marginTop: '10px', 
        fontSize: '10px', 
        color: '#888' 
      }}>
        Consumes: 10k junk/sec<br/>
        Produces: 1 scrap core/30sec
      </div>
    </div>
  );
}
