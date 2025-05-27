
import React, { useState, useEffect } from 'react';
import './ScratzMiner.css';

export default function ScratzMiner({ ownedMiners, junkCells, onConsumeFuel, onGenerateCredits, setNotifications }) {
  const [timeUntilNextCredit, setTimeUntilNextCredit] = useState(3600); // 1 hour in seconds
  const [fuelRemaining, setFuelRemaining] = useState(0);
  const [isPowered, setIsPowered] = useState(false);
  const [showRefuelDialog, setShowRefuelDialog] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(() => localStorage.getItem('scratzMinerCollapsed') === 'true');

  // Calculate total generation rate (diminishing returns)
  const getTotalGeneration = () => {
    let total = 0;
    for (let i = 0; i < ownedMiners; i++) {
      total += Math.pow(0.5, i); // 1, 0.5, 0.25, etc.
    }
    return total;
  };

  // Calculate fuel consumption rate per hour
  const getFuelConsumptionRate = () => {
    return ownedMiners * 0.25; // 0.25 cells per hour per miner
  };

  useEffect(() => {
    // Initialize fuel from localStorage
    const savedFuel = parseFloat(localStorage.getItem('scratzMinerFuel') || '0');
    setFuelRemaining(savedFuel);
    setIsPowered(savedFuel > 0);
  }, []);

  useEffect(() => {
    localStorage.setItem('scratzMinerCollapsed', isCollapsed);
  }, [isCollapsed]);

  useEffect(() => {
    if (ownedMiners === 0) return;

    const interval = setInterval(() => {
      const fuelConsumptionPerSecond = getFuelConsumptionRate() / 3600;
      
      if (fuelRemaining > 0) {
        setFuelRemaining(prev => {
          const newFuel = Math.max(0, prev - fuelConsumptionPerSecond);
          localStorage.setItem('scratzMinerFuel', newFuel.toString());
          return newFuel;
        });
        
        setTimeUntilNextCredit(prev => {
          if (prev <= 1) {
            // Generate credits
            const creditsGenerated = Math.floor(getTotalGeneration());
            onGenerateCredits(creditsGenerated);
            setNotifications(prevNotifs => [...prevNotifs, `Scratz Miner generated ${creditsGenerated} Credits!`]);
            return 3600; // Reset to 1 hour
          }
          return prev - 1;
        });
        
        setIsPowered(true);
      } else {
        setIsPowered(false);
        setTimeUntilNextCredit(3600);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [ownedMiners, fuelRemaining, onGenerateCredits, setNotifications]);

  const handleRefuel = () => {
    if (junkCells > 0) {
      onConsumeFuel(1);
      setFuelRemaining(prev => {
        const newFuel = prev + 4; // 4 hours of fuel
        localStorage.setItem('scratzMinerFuel', newFuel.toString());
        return newFuel;
      });
      setNotifications(prev => [...prev, "Scratz Miner refueled for 4 hours!"]);
      setShowRefuelDialog(false);
    }
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  const formatFuelTime = (hours) => {
    const h = Math.floor(hours);
    const m = Math.floor((hours - h) * 60);
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  };

  if (ownedMiners === 0) return null;

  // Show collapsed mining rack if collapsed
  if (isCollapsed) {
    return (
      <div 
        className="mining-rack-collapsed"
        onClick={() => setIsCollapsed(false)}
        title="Click to expand Scratz Miner"
      >
        <div className="rack-body">
          <div className="rack-server"></div>
          <div className="rack-server"></div>
          <div className="rack-server"></div>
        </div>
        <div className="rack-status">
          <span className={`status-light ${isPowered ? 'powered' : 'unpowered'}`}></span>
          <span className="rack-count">x{ownedMiners}</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={`scratz-miner ${isPowered ? 'powered' : 'unpowered'}`}>
        <div className="miner-header">
          <span className="miner-title">💻 Scratz Miner</span>
          <div className="miner-controls">
            <span className="miner-count">x{ownedMiners}</span>
            <button 
              className="close-button-scratzMiner"
              onClick={() => setIsCollapsed(true)}
              title="Minimize to rack"
            >
              ─
            </button>
          </div>
        </div>
        
        <div className="miner-status">
          <div className="generation-info">
            <span className="generation-rate">
              {getTotalGeneration().toFixed(2)} Credits/hour
            </span>
          </div>
          
          <div className="timer-section">
            <span className="timer-label">Next Credits:</span>
            <span className={`timer ${isPowered ? 'active' : 'inactive'}`}>
              {isPowered ? formatTime(timeUntilNextCredit) : "OFFLINE"}
            </span>
          </div>
        </div>

        <div className="fuel-section">
          <button 
            className={`fuel-button ${fuelRemaining > 0 ? 'fueled' : 'empty'}`}
            onClick={() => setShowRefuelDialog(true)}
            title="Click to refuel with Junk Cells"
          >
            🔋
          </button>
          <div className="fuel-info">
            <span className="fuel-remaining">
              {fuelRemaining > 0 ? formatFuelTime(fuelRemaining) : "Empty"}
            </span>
            <span className="fuel-consumption">
              -{getFuelConsumptionRate().toFixed(2)}/hour
            </span>
          </div>
        </div>
        <div className="miner-lore">
          "The Scratz Miner hums to life… burning through Junk Cells like popcorn on a reactor core."
        </div>
      </div>

      {showRefuelDialog && (
        <div className="refuel-dialog">
          <div className="dialog-content">
            <h3>Refuel Scratz Miner</h3>
            <p>Use 1 Junk Cell to power the miner for 4 hours?</p>
            <p>Available Junk Cells: {junkCells}</p>
            <div className="dialog-buttons">
              <button 
                onClick={handleRefuel} 
                disabled={junkCells === 0}
                className="refuel-confirm"
              >
                Refuel (+4 hours)
              </button>
              <button 
                onClick={() => setShowRefuelDialog(false)}
                className="refuel-cancel"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
