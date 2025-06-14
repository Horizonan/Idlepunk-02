
import React, { useState, useEffect } from 'react';
import { useRecruitmentZustand } from '../stores/crewRecruitment/recruitmentZustand';

export default function StaminaTimer() {
  const [timeUntilRecovery, setTimeUntilRecovery] = useState(0);
  const hiredCrew = useRecruitmentZustand(state => state.hiredCrew);
  const lastStaminaUpdate = useRecruitmentZustand(state => state.lastStaminaUpdate);

  useEffect(() => {
    const updateTimer = () => {
      const now = Date.now();
      const timeSinceLastUpdate = now - lastStaminaUpdate;
      
      // Check if Rusted Loyalty Pins are owned for 25% faster recovery
      const craftingInventory = JSON.parse(localStorage.getItem('craftingInventory') || '{}');
      const hasRustedLoyaltyPins = craftingInventory['Rusted Loyalty Pins'] && craftingInventory['Rusted Loyalty Pins'] > 0;
      
      // Base recovery interval is 30 minutes, with pins it's 22.5 minutes (25% faster)
      const recoveryInterval = hasRustedLoyaltyPins ? 22.5 * 60 * 1000 : 30 * 60 * 1000;
      const timeUntilNext = recoveryInterval - (timeSinceLastUpdate % recoveryInterval);
      setTimeUntilRecovery(timeUntilNext);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [lastStaminaUpdate]);

  
  const needsStamina = hiredCrew.some(crew => (crew.stamina || 100) < 100);
  if (hiredCrew.length === 0 || !needsStamina) {
    return null;
  }

  const minutes = Math.floor(timeUntilRecovery / (1000 * 60));
  const seconds = Math.floor((timeUntilRecovery % (1000 * 60)) / 1000);

  // Check if Rusted Loyalty Pins are equipped
  const craftingInventory = JSON.parse(localStorage.getItem('craftingInventory') || '{}');
  const hasRustedLoyaltyPins = craftingInventory['Rusted Loyalty Pins'] && craftingInventory['Rusted Loyalty Pins'] > 0;

  return (
    <div className="stamina-timer">
      <div className="stamina-timer-icon">⚡</div>
      <div className="stamina-timer-text">
        <div className="stamina-timer-label">
          Next Stamina Recovery
          {hasRustedLoyaltyPins && <span style={{color: '#00FF00', marginLeft: '8px'}}>📌 +25% Faster</span>}
        </div>
        <div className="stamina-timer-countdown">
          {minutes}:{seconds.toString().padStart(2, '0')}
        </div>
      </div>
    </div>
  );
}
