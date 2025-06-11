
import React, { useEffect, useState } from 'react';
import { useRecruitmentZustand } from './recruitmentZustand';
import './SkillsAssessmentGame.css';

export function SkillsAssessmentGame() {
  const {
    resetGame,
    skillsChallenges,
    currentChallengeIndex,
    score,
    timeLeft,
    isRunning,
    startSkillsGame,
    handleSkillsGameEnd,
    solveChallenge,
    tick,
    selectedCrew,
    lastFeedback
  } = useRecruitmentZustand();

  const [userAnswer, setUserAnswer] = useState('');

  // Check if intro should be shown and trigger App-level popup
  React.useEffect(() => {
    if (!localStorage.getItem('skillsGameIntroSeen')) {
      window.dispatchEvent(new CustomEvent('showSkillsIntroTooltip'));
    }
  }, []);

  useEffect(() => {
    if (isRunning) {
      const timer = setInterval(tick, 1000);
      return () => clearInterval(timer);
    }
  }, [isRunning, tick]);

  const challenge = skillsChallenges[currentChallengeIndex];

  // Check if game should end (8 challenges total, indexed 0-7)
  if (!isRunning || currentChallengeIndex >= 8) {
    const handleClose = () => {
      resetGame();
      // Also trigger the game end to ensure proper state cleanup
      handleSkillsGameEnd(score);
    };

    return (
      <div className="skills-game-over">
        <button onClick={handleClose}>Close</button>
        <h2>Skills Assessment Complete</h2>
        <p>Final Score: {score}</p>
        
        {selectedCrew ? (
          <div className="crew-unlock">
            <h3>Crew Member Recruited!</h3>
            <div className="crew-details">
              <h4>{selectedCrew.name}</h4>
              <p className="crew-role">{selectedCrew.role}</p>
              <p className="crew-rarity">{selectedCrew.rarity}</p>
              <p className="crew-perks">{selectedCrew.perks}</p>
            </div>
          </div>
        ) : (
          <p>No crew member recruited. Try to get a higher score!</p>
        )}

        <button onClick={handleClose}>
          Try Again
        </button>
      </div>
    );
  }

  if (!challenge) return <p>Loading Challenge...</p>;

  const handleSubmit = () => {
    if (challenge.type === 'multiple_choice') {
      solveChallenge(userAnswer);
    } else if (challenge.type === 'calculation') {
      const numAnswer = parseInt(userAnswer) || 0;
      solveChallenge(numAnswer);
    } else if (challenge.type === 'sequence') {
      solveChallenge(userAnswer.toLowerCase().trim());
    }
    setUserAnswer('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="skills-game-card">
      <button onClick={() => {
        resetGame();
        handleSkillsGameEnd(score);
      }}>Close</button>
      <div className="skills-game-stats">
        <div>⏱ {timeLeft}s</div>
        <div>Challenge: {currentChallengeIndex + 1}/8</div>
      </div>

      {lastFeedback && (
        <div className={`skills-feedback-panel ${lastFeedback.correct ? 'correct' : 'incorrect'}`}>
          <span className="skills-feedback">
            {lastFeedback.correct ? '✅ CORRECT' : '❌ INCORRECT'} ({lastFeedback.points} pts)
            {lastFeedback.explanation && ` - ${lastFeedback.explanation}`}
          </span>
        </div>
      )}

      <div className="skills-challenge">
        <h3>{challenge.title}</h3>
        <div className="challenge-skill-type">Skill: {challenge.skillType}</div>
        <p className="challenge-description">{challenge.description}</p>

        {challenge.type === 'multiple_choice' && (
          <div className="multiple-choice-options">
            {challenge.options.map((option, index) => (
              <button
                key={index}
                className={`choice-button ${userAnswer === option ? 'selected' : ''}`}
                onClick={() => setUserAnswer(option)}
              >
                {option}
              </button>
            ))}
            <button 
              className="submit-answer-btn"
              onClick={handleSubmit}
              disabled={!userAnswer}
            >
              Submit Answer
            </button>
          </div>
        )}

        {challenge.type === 'calculation' && (
          <div className="calculation-input">
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter your answer"
              className="calc-input"
            />
            <button 
              className="submit-answer-btn"
              onClick={handleSubmit}
              disabled={!userAnswer}
            >
              Submit
            </button>
          </div>
        )}

        {challenge.type === 'sequence' && (
          <div className="sequence-input">
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type the sequence"
              className="sequence-input-field"
            />
            <button 
              className="submit-answer-btn"
              onClick={handleSubmit}
              disabled={!userAnswer}
            >
              Submit
            </button>
          </div>
        )}
      </div>

      <div>Score: {score}</div>
    </div>
  );
}
