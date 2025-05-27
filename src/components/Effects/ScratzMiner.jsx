
import React, { useState, useEffect } from 'react';
import './ScratzMiner.css';

export default function ScratzMiner({ scratzMinersOwned, craftingInventory, onConsumeJunkCell, onCollectScratz }) {
  const [miners, setMiners] = useState(() => {
    const saved = localStorage.getItem('scratzMiners');
    if (saved) {
      return JSON.parse(saved);
    }
    // Initialize miners based on owned count
    const initialMiners = [];
    for (let i = 0; i < scratzMinersOwned; i++) {
      initialMiners.push({
        id: i,
        powered: false,
        lastGenerated: Date.now(),
        energyStartTime: null,
        scratzGenerated: 0
      });
    }
    return initialMiners;
  });

  const [notifications, setNotifications] = useState([]);

  // Sync miners with owned count
  useEffect(() => {
    setMiners(prevMiners => {
      const newMiners = [...prevMiners];
      
      // Add new miners if count increased
      while (newMiners.length < scratzMinersOwned) {
        newMiners.push({
          id: newMiners.length,
          powered: false,
          lastGenerated: Date.now(),
          energyStartTime: null,
          scratzGenerated: 0
        });
      }
      
      // Remove miners if count decreased
      while (newMiners.length > scratzMinersOwned) {
        newMiners.pop();
      }
      
      return newMiners;
    });
  }, [scratzMinersOwned]);

  // Save miners state
  useEffect(() => {
    localStorage.setItem('scratzMiners', JSON.stringify(miners));
  }, [miners]);

  const powerMiner = (minerId) => {
    if ((craftingInventory?.["Junk Cells"] || 0) < 1) {
      setNotifications(prev => [...prev, "Need at least 1 Junk Cell to power miner!"]);
      return;
    }

    setMiners(prevMiners => 
      prevMiners.map(miner => 
        miner.id === minerId 
          ? { 
              ...miner, 
              powered: true, 
              energyStartTime: Date.now(),
              lastGenerated: Date.now() 
            }
          : miner
      )
    );

    onConsumeJunkCell();
    setNotifications(prev => [...prev, `Miner ${minerId + 1} powered up!`]);
  };

  // Main generation and energy consumption logic
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      
      setMiners(prevMiners => {
        let updated = false;
        const newMiners = prevMiners.map(miner => {
          if (!miner.powered || !miner.energyStartTime) return miner;

          const hoursSinceStart = (now - miner.energyStartTime) / (1000 * 60 * 60);
          const hoursSinceLastGen = (now - miner.lastGenerated) / (1000 * 60 * 60);

          // Check if energy expired (4 hours)
          if (hoursSinceStart >= 4) {
            updated = true;
            setNotifications(prev => [...prev, `Miner ${miner.id + 1} ran out of energy!`]);
            return {
              ...miner,
              powered: false,
              energyStartTime: null
            };
          }

          // Generate Scratz every hour
          if (hoursSinceLastGen >= 1) {
            const efficiency = Math.pow(0.5, miner.id); // 1, 0.5, 0.25, etc.
            const scratzToGenerate = Math.floor(efficiency);
            
            if (scratzToGenerate > 0) {
              updated = true;
              onCollectScratz(scratzToGenerate);
              setNotifications(prev => [...prev, `Miner ${miner.id + 1} generated ${scratzToGenerate} Scratz!`]);
              
              return {
                ...miner,
                lastGenerated: now,
                scratzGenerated: miner.scratzGenerated + scratzToGenerate
              };
            }
          }

          return miner;
        });

        return updated ? newMiners : prevMiners;
      });
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [onCollectScratz, onConsumeJunkCell]);

  // Clear notifications after 3 seconds
  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        setNotifications([]);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notifications]);

  if (scratzMinersOwned === 0) return null;

  return (
    <div className="scratz-miner-container">
      <div className="scratz-miner-header">
        <h3>💻 Scratz Miners ({scratzMinersOwned})</h3>
        <div className="energy-status">
          Junk Cells: {craftingInventory?.["Junk Cells"] || 0}
        </div>
      </div>
      
      <div className="miners-grid">
        {miners.map(miner => {
          const efficiency = Math.pow(0.5, miner.id);
          const hoursRemaining = miner.powered && miner.energyStartTime 
            ? Math.max(0, 4 - (Date.now() - miner.energyStartTime) / (1000 * 60 * 60))
            : 0;

          return (
            <div key={miner.id} className={`miner ${miner.powered ? 'powered' : 'unpowered'}`}>
              <div className="miner-header">
                <span>Miner #{miner.id + 1}</span>
                <span className="efficiency">{(efficiency * 100).toFixed(0)}%</span>
              </div>
              
              {miner.powered ? (
                <div className="miner-status">
                  <div className="power-indicator">⚡ ACTIVE</div>
                  <div className="energy-remaining">
                    Energy: {hoursRemaining.toFixed(1)}h
                  </div>
                  <div className="total-generated">
                    Generated: {miner.scratzGenerated} Scratz
                  </div>
                </div>
              ) : (
                <div className="miner-controls">
                  <button 
                    onClick={() => powerMiner(miner.id)}
                    disabled={(craftingInventory?.["Junk Cells"] || 0) < 1}
                    className="power-button"
                  >
                    Power Up (1 Junk Cell)
                  </button>
                  <div className="miner-info">
                    Generates {efficiency} Scratz/hour
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {notifications.length > 0 && (
        <div className="miner-notifications">
          {notifications.map((notif, index) => (
            <div key={index} className="miner-notification">
              {notif}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
