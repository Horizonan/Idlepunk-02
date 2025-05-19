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
    set,
    get
  } = useRecruitmentZustand()

  useEffect(() => {
    if (isRunning) {
      const timer = setInterval(tick, 1000)
      return () => clearInterval(timer)
    }
  }, [isRunning, tick])

  const profile = profiles[currentIndex]

  if (!isRunning) {
    const isGameOver = currentIndex >= profiles.length

    return (
      <div>
        <h2>{isGameOver ? 'Game Over' : 'Crinder'}</h2>
        <p>Final Score: {score}</p>

        {isGameOver && score >= 10 && (
          <p>🎉 You unlocked a legendary crew member!</p>
        )}

        <button onClick={isGameOver ? resetGame : startGame}>
          {isGameOver ? 'Try Again' : 'Start Swiping'}
        </button>
      </div>
    )
  }

  if (!profile) return <p>Loading Profile....</p>

  const isPermitExpired = new Date(profile.workPermit.validUntil) < new Date()
  let delta = 0

  if(!isPermitExpired){
    delta = profile.isReal ? 2 : -2
  } else {
    delta -= 2
  }

  const finalScore = score + delta
  if (currentIndex === 7) {
    console.log("🎉 Game finished! Final score:", finalScore)
    set({ isRunning: false })
    get().handleGameEnd(finalScore)
    return
  }

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