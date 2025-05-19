
import { useEffect } from 'react';
import { useRecruitmentZustand } from './recruitmentZustand';
import './RecruitmentGame.css';

export function RecruitmentGame() {
  const {
    resetGame,
    profiles,
    currentIndex,
    score,
    timeLeft,
    isRunning,
    startGame,
    handleGameEnd,
    act,
    tick,
  } = useRecruitmentZustand();

  useEffect(() => {
    if (isRunning) {
      const timer = setInterval(tick, 1000);
      return () => clearInterval(timer);
    }
  }, [isRunning, tick]);

  const profile = profiles[currentIndex];

  if (!isRunning) {
    const isGameOver = currentIndex >= 8;

    return (
      <div className="game-card">
        <button onClick={resetGame} className="close-button">×</button>
        <div className="game-over-screen">
          <h2>{isGameOver ? 'Game Over!' : 'Crinder'}</h2>
          <p>Final Score: {score}</p>

          {isGameOver && score >= 10 && (
            <div className="reward-message">
              <p>🎉 Congratulations!</p>
              <p>You unlocked a legendary crew member!</p>
            </div>
          )}

          {isGameOver && score >= 5 && score < 10 && (
            <div className="reward-message">
              <p>✨ Well done!</p>
              <p>A new crew member joined your team!</p>
            </div>
          )}

          {isGameOver && score < 5 && (
            <div className="reward-message">
              <p>😔 Better luck next time!</p>
              <p>Keep practicing to improve your recruiting skills.</p>
            </div>
          )}

          <button 
            onClick={isGameOver ? resetGame : startGame}
            className="game-button"
          >
            {isGameOver ? 'Try Again' : 'Start Swiping'}
          </button>
        </div>
      </div>
    );
  }

  if (!profile) return <p>Loading Profile....</p>;

  return (
    <div className="game-card">
      <button onClick={resetGame} className="close-button">×</button>
      <div>⏱ {timeLeft}s</div>

      <h2>{profile.name}</h2>
      <p><strong>Background:</strong> {profile.background}</p>
      <p><strong>Skills:</strong> {profile.skills.join(', ')}</p>
      <p><strong>Work Permit:</strong> {profile.workPermit.validUntil}</p>

      {profile.flags && (
        <p style={{ color: 'red' }}>⚠️ {profile.flags.join(', ')}</p>
      )}

      <div className="buttons">
        <button onClick={() => act('recruit')}>Recruit</button>
        <button onClick={() => act('trash')}>Trash</button>
        <button onClick={() => act('skip')}>Skip</button>
      </div>

      <div>Score: {score}</div>
    </div>
  );
}
