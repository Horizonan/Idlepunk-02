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
    act,
    tick,
  } = useRecruitmentZustand()

  useEffect(() => {
    if (isRunning) {
      const timer = setInterval(tick, 1000)
      return () => clearInterval(timer)
    }
  }, [isRunning, tick])

  const profile = profiles[currentIndex]

  if(!isRunning) {
    return(
      <div>
        <h2>Crinder</h2>
        <p>Final Score: {score}</p>
        <button onClick={startGame}>Start Swiping</button>
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
      <p><strong>Skills:</strong> {profile.workPermit.join(', ')}</p>

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