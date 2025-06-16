import React, { useEffect, useState } from 'react';
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
    selectedCrew,
    lastFeedback
  } = useRecruitmentZustand()

  // Check if intro should be shown and trigger App-level popup
  React.useEffect(() => {
    if (!localStorage.getItem('crewGameIntroSeen')) {
      window.dispatchEvent(new CustomEvent('showCrewIntroTooltip'));
    }
  }, []);

  useEffect(() => {
    if (isRunning) {
      const timer = setInterval(tick, 1000)
      return () => clearInterval(timer)
    }
  }, [isRunning, tick])

  const profile = profiles[currentIndex]
  let gameEnded = 0;

  const profileCount = localStorage.getItem('signal_expander_purchased') ? 10 : 8;
  if (!isRunning || currentIndex >= profileCount) {
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
        
        {selectedCrew && selectedCrew.name ? (
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
      <button onClick={resetGame}>Close</button>
      <div className="game-stats">
        <div>⏱ {timeLeft}s</div>
        <div>Progress: {currentIndex + 1}/{profileCount}</div>
      </div>

      {lastFeedback && (
        <div className={`feedback-panel-compact ${lastFeedback.correct ? 'correct' : 'incorrect'}`}>
          <span className="feedback-compact">
            {lastFeedback.correct ? '✅ CORRECT' : '❌ INCORRECT'} ({lastFeedback.points} pts) - {lastFeedback.correct ? 'Good job!' : `Mistake: ${lastFeedback.explanation}`}
          </span>
        </div>
      )}

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