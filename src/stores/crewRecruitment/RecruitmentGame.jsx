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
  let gameEnded = 0;

  const recruitedCrew = useRecruitmentZustand(state => state.recruitedCrew);

  if (!isRunning || currentIndex >= 8) {
    const finalScore = score

    if(gameEnded === 0){
      handleGameEnd(finalScore)
      gameEnded += 1
    }
    
    return (
      <div className="game-over">
        <button onClick={resetGame}>Close</button>
        <h2>Game Over</h2>
        <p>Final Score: {finalScore}</p>

        {recruitedCrew ? (
          <div className="recruited-crew">
            <h3>🎉 New Crew Member Recruited!</h3>
            <div className="crew-card">
              <h4>{recruitedCrew.name}</h4>
              <p className="crew-role">{recruitedCrew.role}</p>
              <p className="crew-rarity">{recruitedCrew.rarity}</p>
              <div className="crew-perks">
                {recruitedCrew.perks.map((perk, index) => (
                  <p key={index}>{perk}</p>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p>❌ No crew member recruited this time</p>
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
      <p><strong>Age:</strong> {profile.age}</p>
      <p><strong>Background:</strong> {profile.background}</p>
      <p><strong>Skills:</strong> {profile.skills.join(', ')}</p>
      <p><strong>Work Permit:</strong> {profile.workPermit.validUntil instanceof Date ? profile.workPermit.validUntil.toLocaleDateString() : profile.workPermit.validUntil}</p>

      <div className="buttons">
        <button onClick={() => act('recruit')}>Recruit</button>
        <button onClick={() => act('trash')}>Trash</button>
        <button onClick={() => act('skip')}>Skip</button>
      </div>

       <div>Score: {score}</div>
    </div>

  )
}