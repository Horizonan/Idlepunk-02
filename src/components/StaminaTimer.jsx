
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
      const recoveryInterval = 30 * 60 * 1000; 
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

  return (
    <div className="stamina-timer">
      <div className="stamina-timer-icon">⚡</div>
      <div className="stamina-timer-text">
        <div className="stamina-timer-label">Next Stamina Recovery</div>
        <div className="stamina-timer-countdown">
          {minutes}:{seconds.toString().padStart(2, '0')}
        </div>
      </div>
    </div>
  );
}
