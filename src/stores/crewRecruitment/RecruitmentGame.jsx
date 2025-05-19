
import { useEffect } from 'react';
import { useRecruitmentZustand } from './recruitmentZustand';
import './RecruitmentGame.css';

export function RecruitmentGame() {
  const {
    profiles,
    currentIndex,
    score,
    timeLeft,
    isRunning,
    startGame,
    act,
    tick,
    resetGame
  } = useRecruitmentZustand();

  useEffect(() => {
    if (isRunning) {
      const timer = setInterval(tick, 1000);
      return () => clearInterval(timer);
    }
  }, [isRunning, tick]);

  const profile = profiles[currentIndex];

  if(!isRunning) {
    return(
      <div className="crinder-container">
        <div className="crinder-header">
          <h2>Crinder</h2>
          <button className="close-button" onClick={resetGame}>×</button>
        </div>
        <p>Final Score: {score}</p>
        <button className="start-button" onClick={startGame}>Start Swiping</button>
      </div>
    );
  }

  if (!profile) return <p>Loading Profile....</p>;

  return (
    <div className="crinder-container">
      <div className="crinder-header">
        <div className="timer">⏱ {timeLeft}s</div>
        <div className="score">Score: {score}</div>
        <button className="close-button" onClick={resetGame}>×</button>
      </div>

      <div className="profile-card">
        <h2>{profile.name}</h2>
        <div className="profile-info">
          <p><strong>Background:</strong> {profile.background}</p>
          <p><strong>Skills:</strong> {profile.skills.join(', ')}</p>
        </div>

        {profile.flags && (
          <div className="warning-flags">
            {profile.flags.map((flag, index) => (
              <p key={index}>⚠️ {flag}</p>
            ))}
          </div>
        )}
      </div>

      <div className="swipe-buttons">
        <button className="swipe-left" onClick={() => act('trash')}>✗</button>
        <button className="swipe-skip" onClick={() => act('skip')}>⟳</button>
        <button className="swipe-right" onClick={() => act('recruit')}>✓</button>
      </div>
    </div>
  );
}
