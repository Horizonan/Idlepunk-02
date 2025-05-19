
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
      <div className="recruitment-start">
        <h2>Crinder</h2>
        <p>Final Score: {score}</p>
        <button onClick={startGame} className="start-button">Start Swiping</button>
      </div>
    );
  }

  if (!profile) return <p>Loading Profile....</p>;

  return (
    <div className="tinder-card">
      <div className="timer">{timeLeft}s</div>
      
      <div className="profile-card">
        <div className="profile-image">
          <div className="profile-stats">
            <span className="stat">🎯 Skills: {profile.skills.length}</span>
            <span className="stat">👤 Age: {profile.age}</span>
          </div>
        </div>
        
        <div className="profile-info">
          <h2>{profile.name}</h2>
          <p className="background">{profile.background}</p>
          <div className="skills-list">
            {profile.skills.map((skill, index) => (
              <span key={index} className="skill-tag">{skill}</span>
            ))}
          </div>
        </div>

        {profile.flags && (
          <div className="warning-flags">
            {profile.flags.map((flag, index) => (
              <span key={index} className="warning">⚠️ {flag}</span>
            ))}
          </div>
        )}
      </div>

      <div className="action-buttons">
        <button onClick={() => act('trash')} className="reject-button">✖</button>
        <button onClick={() => act('skip')} className="skip-button">⟳</button>
        <button onClick={() => act('recruit')} className="accept-button">✓</button>
      </div>

      <div className="score">Score: {score}</div>
    </div>
  );
}
