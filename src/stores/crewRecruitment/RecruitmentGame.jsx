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
            <h3>👥 Crew Recruitment</h3>
            <div className="tooltip-section">
              <p>"Buried in static and noise are identity fragments. Some are real. Most are not."</p>
              <p>🔍 <strong>Objective:</strong> Sort through intercepted profiles and decide who's real.</p>
              <ul>
                <li>Accept real candidates</li>
                <li>Reject fake ones</li>
                <li>The better your accuracy, the higher your chance of recruiting a useful crew member.</li>
                <li>Fakes can be convincing. Watch for suspicious skills, missing data, or impossible backstories.</li>
              </ul>
              
              <h4>🕵️ Key Things to Check:</h4>
              <ul>
                <li><strong>Age vs Experience:</strong> Does their age match their claimed experience?</li>
                <li><strong>Skill Logic:</strong> Do their skills make sense together?</li>
                <li><strong>Work Permits:</strong> Are documents current and valid?</li>
                <li><strong>Background Consistency:</strong> Does their story add up?</li>
                <li><strong>Timeline Logic:</strong> Do dates and events make chronological sense?</li>
              </ul>
              
              <div className="detection-examples">
                <p><strong>⚠️ Red Flags:</strong> 19-year-old "veterans", impossible skill combos, missing permits, contradictory stories</p>
                <p><strong>✅ Good Signs:</strong> Realistic ages, complementary skills, valid documentation, coherent backgrounds</p>
              </div>
              
              <p className="tooltip-tip">💡 Tip: "Some mail is harmless. Some rewrites the map."</p>
              <p className="tooltip-tip">🎯 Pro Tip: When in doubt, look for internal consistency - real profiles tell a coherent story.</p>
            </div>
            <p className="refresher-note">📚 You can always check <strong>Game Tips</strong> in the main menu for a refresher!</p>
            <button className="intro-tooltip-button" onClick={dismissIntroTooltip}>
              Begin Verification
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