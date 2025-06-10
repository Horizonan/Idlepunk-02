import React, { useState, useEffect, useRef } from 'react';
import './ScratzMiner.css';

export default function ScratzMiner({ ownedMiners, junkCells, onConsumeFuel, onGenerateCredits, setNotifications }) {
  const [timeUntilNextCredit, setTimeUntilNextCredit] = useState(3600); // 1 hour in seconds
  const [fuelRemaining, setFuelRemaining] = useState(0);
  const [isPowered, setIsPowered] = useState(false);
  const [showRefuelDialog, setShowRefuelDialog] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(() => localStorage.getItem('scratzMinerCollapsed') === 'true');
  const [lastUpdateTime, setLastUpdateTime] = useState(Date.now());
  const [creditLog, setCreditLog] = useState([]);

  // Use refs to track current values
  const fuelRef = useRef(0);
  const timeRef = useRef(3600);

  // Calculate total generation rate (diminishing returns)
  const getTotalGeneration = () => {
    let total = 0;
    for (let i = 0; i < ownedMiners; i++) {
      total += Math.pow(0.794, i); // 1, 0.794, 0.631, etc. (1/3 less aggressive than 0.5)
    }
    return total;
  };

  // Calculate fuel consumption rate per hour
  const getFuelConsumptionRate = () => {
    return ownedMiners * 0.25; // 0.25 cells per hour per miner
  };

  // Process offline progress
  const processOfflineProgress = () => {
    const savedLastUpdate = parseInt(localStorage.getItem('scratzMinerLastUpdate') || Date.now().toString());
    const savedTimeUntilNext = parseInt(localStorage.getItem('scratzMinerTimeUntilNext') || '3600');
    const currentTime = Date.now();
    const timeElapsed = Math.floor((currentTime - savedLastUpdate) / 1000); // seconds

    if (timeElapsed > 0 && ownedMiners > 0) {
      const savedFuel = parseFloat(localStorage.getItem('scratzMinerFuel') || '0');

      if (savedFuel > 0) {
        const fuelConsumptionPerSecond = getFuelConsumptionRate() / 3600;
        let remainingFuel = savedFuel;
        let remainingTime = timeElapsed;
        let timeUntilNext = savedTimeUntilNext;
        let creditsGenerated = 0;

        // Calculate how long the miner could run with available fuel
        const maxRunTime = Math.floor(remainingFuel / fuelConsumptionPerSecond);
        const actualRunTime = Math.min(remainingTime, maxRunTime);

        if (actualRunTime > 0) {
          // Calculate fuel consumption
          remainingFuel = Math.max(0, remainingFuel - (actualRunTime * fuelConsumptionPerSecond));

          // Calculate credit generation cycles
          let timeProcessed = 0;
          while (timeProcessed < actualRunTime) {
            const timeToNextCredit = Math.min(timeUntilNext, actualRunTime - timeProcessed);
            timeProcessed += timeToNextCredit;
            timeUntilNext -= timeToNextCredit;

            if (timeUntilNext <= 0) {
              creditsGenerated += Math.floor(getTotalGeneration());
              timeUntilNext = 3600; // Reset to 1 hour
            }
          }

          // Update states
          setFuelRemaining(remainingFuel);
          setTimeUntilNextCredit(timeUntilNext);
          setIsPowered(remainingFuel > 0);

          // Save updated values
          localStorage.setItem('scratzMinerFuel', remainingFuel.toString());
          localStorage.setItem('scratzMinerTimeUntilNext', timeUntilNext.toString());

          // Generate credits and show notification
          if (creditsGenerated > 0) {
            onGenerateCredits(creditsGenerated);
            const hoursOffline = Math.floor(actualRunTime / 3600);
            const minutesOffline = Math.floor((actualRunTime % 3600) / 60);
            let timeString = '';
            if (hoursOffline > 0) {
              timeString = `${hoursOffline}h ${minutesOffline}m`;
            } else {
              timeString = `${minutesOffline}m`;
            }
            setNotifications(prevNotifs => [...prevNotifs, `Scratz Miner generated ${creditsGenerated} Credits while offline! (${timeString})`]);

            // Add to credit log
            setCreditLog(prev => [...prev.slice(-4), {
              amount: creditsGenerated,
              time: new Date().toLocaleTimeString(),
              type: 'offline'
            }]);
          }
        } else {
          // No fuel, miner was offline
          setFuelRemaining(remainingFuel);
          setTimeUntilNextCredit(3600);
          setIsPowered(false);
          localStorage.setItem('scratzMinerFuel', remainingFuel.toString());
        }
      } else {
        // No fuel available
        setTimeUntilNextCredit(3600);
        setIsPowered(false);
      }
    }

    setLastUpdateTime(currentTime);
    localStorage.setItem('scratzMinerLastUpdate', currentTime.toString());
  };

  useEffect(() => {
    // Initialize fuel from localStorage and process offline progress
    const savedFuel = parseFloat(localStorage.getItem('scratzMinerFuel') || '0');
    const savedTime = parseInt(localStorage.getItem('scratzMinerTimeUntilNext') || '3600');

    setFuelRemaining(savedFuel);
    setTimeUntilNextCredit(savedTime);
    setIsPowered(savedFuel > 0);

    fuelRef.current = savedFuel;
    timeRef.current = savedTime;

    if (ownedMiners > 0) {
      processOfflineProgress();
    }
  }, [ownedMiners]);

  // Update refs when state changes
  useEffect(() => {
    fuelRef.current = fuelRemaining;
  }, [fuelRemaining]);

  useEffect(() => {
    timeRef.current = timeUntilNextCredit;
  }, [timeUntilNextCredit]);

  useEffect(() => {
    localStorage.setItem('scratzMinerCollapsed', isCollapsed);
  }, [isCollapsed]);

  useEffect(() => {
    if (ownedMiners === 0) return;

    let intervalId;

    const updateMiner = () => {
      const currentTime = Date.now();
      const currentFuel = fuelRef.current;
      const currentTimeRemaining = timeRef.current;

      if (currentFuel > 0) {
        // Update fuel
        const fuelConsumptionPerSecond = getFuelConsumptionRate() / 3600;
        const newFuel = Math.max(0, currentFuel - fuelConsumptionPerSecond);

        // Update timer
        let newTime = Math.max(0, currentTimeRemaining - 1);

        // Batch state updates
        setFuelRemaining(newFuel);
        setTimeUntilNextCredit(newTime);
        setIsPowered(true);
        setLastUpdateTime(currentTime);

        // Update localStorage once per update
        localStorage.setItem('scratzMinerFuel', newFuel.toString());
        localStorage.setItem('scratzMinerTimeUntilNext', newTime.toString());
        localStorage.setItem('scratzMinerLastUpdate', currentTime.toString());

        if (newTime <= 0) {
          // Generate credits
          const creditsGenerated = Math.floor(getTotalGeneration());
          onGenerateCredits(creditsGenerated);
          setNotifications(prevNotifs => [...prevNotifs, `Scratz Miner generated ${creditsGenerated} Credits!`]);

          // Add to credit log
          setCreditLog(prev => [...prev.slice(-4), {
            amount: creditsGenerated,
            time: new Date().toLocaleTimeString(),
            type: 'active'
          }]);

          // Reset timer
          const resetTime = 3600;
          setTimeUntilNextCredit(resetTime);
          localStorage.setItem('scratzMinerTimeUntilNext', resetTime.toString());
        }
      } else {
        // No fuel - batch updates
        setIsPowered(false);
        setTimeUntilNextCredit(3600);
        setLastUpdateTime(currentTime);
        localStorage.setItem('scratzMinerTimeUntilNext', '3600');
        localStorage.setItem('scratzMinerLastUpdate', currentTime.toString());
      }
    };

    intervalId = setInterval(updateMiner, 1000);

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [ownedMiners]);

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

  useEffect(() => {
    const handleUpdateTimer = () => {
      const newTime = parseInt(localStorage.getItem('scratzMinerTimeUntilNext') || '3600');
      setTimeUntilNextCredit(newTime);
    };
    window.addEventListener('updateScratzMinerTimer', handleUpdateTimer);
    return () => window.removeEventListener('updateScratzMinerTimer', handleUpdateTimer);
  }, []);

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
        {creditLog.length > 0 && (
          <div className="credit-log">
            <div className="log-header">Recent Credits:</div>
            {creditLog.map((entry, index) => (
              <div key={index} className="log-entry">
                <span className="log-time">{entry.time}</span>
                <span className="log-amount">+{entry.amount}</span>
                {entry.type === 'offline' && <span className="log-offline">📴</span>}
              </div>
            ))}
          </div>
        )}
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