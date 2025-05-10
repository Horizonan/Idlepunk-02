
import React from 'react';
import { useCrystalZustand } from '../utils/crystalZustand';
import '../styles/UiTimers/crystalTimer.css';

export default function CrystalTimer() {
  const timeUntilNext = useCrystalZustand(state => state.timeUntilNext);
  const hasChronoCrystalTimer = useCrystalZustand(state => state.hasChronoCrystalTimer);

  if (!hasChronoCrystalTimer || timeUntilNext === null) return null;

  const minutes = Math.floor(timeUntilNext / 60);
  const seconds = timeUntilNext % 60;

  return (
    <div className="crystal-timer">
      <img src="/Icons/electroClicker/crystals.png" alt="Crystal" style={{ width: '24px', height: '24px', marginRight: '8px' }} />
      <span>Next crystal in: {minutes}:{seconds.toString().padStart(2, '0')}</span>
    </div>
  );
}
