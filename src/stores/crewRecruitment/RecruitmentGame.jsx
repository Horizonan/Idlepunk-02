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
    tick
  } = useRecruitmentZustand()

  useEffect(() => {
    if (isRunning) {
      const timer = setInterval(tick, 1000)
      return () => clearInterval(timer)
    }
  }, [isRunning, tick])

  const profile = profiles[currentIndex]

  if (!isRunning || currentIndex >= 8) {
    const finalScore = score
    handleGameEnd(finalScore)

    return (
      <div>
        <h2>Game Over</h2>
        <p>Final Score: {finalScore}</p>

        {finalScore >= 10 && (
          <p>🎉 You unlocked a legendary crew member!</p>
        )}

        <button onClick={resetGame}>
          Try Again
        </button>
      </div>
    )
  }

  if (!profile) return <p>Loading Profile....</p>

  return (
    <div className="game-card">
      <button onClick={resetGame}>Close</button>
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

  )
}