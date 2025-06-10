import { useEffect, useState } from 'react';
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
    selectedCrew
  } = useRecruitmentZustand()

  const [showIntroTooltip, setShowIntroTooltip] = useState(() => {
    return !localStorage.getItem('crewGameIntroSeen');
  });

  const dismissIntroTooltip = () => {
    localStorage.setItem('crewGameIntroSeen', 'true');
    setShowIntroTooltip(false);
  };

  useEffect(() => {
    if (isRunning) {
      const timer = setInterval(tick, 1000)
      return () => clearInterval(timer)
    }
  }, [isRunning, tick])

  const profile = profiles[currentIndex]
  let gameEnded = 0;

  if (!isRunning || currentIndex >= 8) {
    const finalScore = score

    if(gameEnded = 0){
      handleGameEnd(finalScore)
      gameEnded +1
      }
      
    
    
    return (
      <div className="game-over">
        <button onClick={resetGame}>Close</button>
        <h2>Game Over</h2>
        <p>Final Score: {finalScore}</p>
        
        {selectedCrew ? (
          <div className="crew-unlock">
            <h3>Crew Member Unlocked!</h3>
            <div className="crew-details">
              <h4>{selectedCrew.name}</h4>
              <p className="crew-role">{selectedCrew.role}</p>
              <p className="crew-rarity">{selectedCrew.rarity}</p>
              <p className="crew-perks">{selectedCrew.perks}</p>
            </div>
          </div>
        ) : (
          <p>No crew member unlocked. Try to get a higher score!</p>
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
      {showIntroTooltip && (
        <div className="intro-tooltip-overlay">
          <div className="intro-tooltip">
            <h3>👥 Crew Recruitment Verification</h3>
            <div className="tooltip-section">
              <p>"Buried in static and noise are identity fragments. Some are real. Most are not."</p>
              <p>🔍 <strong>Your Mission:</strong> Analyze each profile and determine authenticity.</p>
              
              <div className="detection-guide">
                <h4>🚩 Reject If You See:</h4>
                <ul>
                  <li><strong>Suspicious Names:</strong> Gamer tags, system names, corrupted text</li>
                  <li><strong>Impossible Ages:</strong> 0, negative, or extremely old</li>
                  <li><strong>Overpowered Skills:</strong> Time travel, infinite abilities, admin access</li>
                  <li><strong>Fake Locations:</strong> Non-existent kingdoms or dimensions</li>
                  <li><strong>Missing Data:</strong> Corrupted backgrounds or invalid permits</li>
                </ul>

                <h4>✅ Accept If Profile Shows:</h4>
                <ul>
                  <li><strong>Realistic Names:</strong> Human-sounding identities</li>
                  <li><strong>Normal Ages:</strong> 20s-40s range</li>
                  <li><strong>Technical Skills:</strong> Believable engineering/repair abilities</li>
                  <li><strong>Known Locations:</strong> Mars stations, Europa, established settlements</li>
                  <li><strong>Valid Documentation:</strong> Proper work permits</li>
                </ul>
              </div>
              
              <p className="tooltip-tip">💡 <strong>Trust Your Instincts:</strong> If something seems too perfect or too broken, it probably is.</p>
            </div>
            <p className="refresher-note">📚 Check <strong>Game Tips → Crew Recruitment</strong> for detailed examples!</p>
            <button className="intro-tooltip-button" onClick={dismissIntroTooltip}>
              Begin Verification Process
            </button>
          </div>
        </div>
      )}
      
      <button onClick={resetGame}>Close</button>
      <div className="game-stats">
        <div>⏱ {timeLeft}s</div>
        <div>Progress: {currentIndex + 1}/8</div>
      </div>

      <h2>{profile.name}</h2>
      <p><strong>Age:</strong> {profile.age}</p>
      <p><strong>Background:</strong> {profile.background}</p>
      <p><strong>Skills:</strong> {profile.skills.join(', ')}</p>
      <p><strong>Work Permit:</strong> {profile.workPermit.status === 'missing' ? 
        'MISSING DOCUMENTATION' : 
        profile.workPermit.validUntil instanceof Date ? 
          profile.workPermit.validUntil.toLocaleDateString() : 
          profile.workPermit.validUntil
      }</p>

      <div className="buttons">
        <button onClick={() => act('recruit')}>Recruit</button>
        <button onClick={() => act('trash')}>Trash</button>
        <button onClick={() => act('skip')}>Skip</button>
      </div>

       <div>Score: {score}</div>
    </div>

  )
}