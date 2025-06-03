
import React, { useState, useEffect } from 'react';
import { useRecruitmentZustand } from '../stores/crewRecruitment/recruitmentZustand';

export default function StaminaTimer() {
  const [timeLeft, setTimeLeft] = useState(0);
  const getTimeToNextStaminaRecovery = useRecruitmentZustand(state => state.getTimeToNextStaminaRecovery);
  const hasCrewWithLowStamina = useRecruitmentZustand(state => state.hasCrewWithLowStamina);
  const updateStamina = useRecruitmentZustand(state => state.updateStamina);

  useEffect(() => {
    const updateTimer = () => {
      updateStamina(); // Update stamina first
      const remaining = getTimeToNextStaminaRecovery();
      setTimeLeft(remaining);
    };

    // Update immediately
    updateTimer();

    // Then update every second
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [getTimeToNextStaminaRecovery, updateStamina]);

  // Only show timer if there are crew members with less than 100% stamina
  if (!hasCrewWithLowStamina()) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="stamina-timer">
      <div className="stamina-timer-content">
        <span className="stamina-icon">⚡</span>
        <span className="stamina-text">
          Next stamina recovery: {minutes}:{seconds.toString().padStart(2, '0')}
        </span>
      </div>
    </div>
  );
}
