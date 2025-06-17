
import React from 'react';
import './CrewRecruitmentTooltip.css';

const CrewRecruitmentTooltip = ({ 
  showCrewIntroTooltip, 
  setShowCrewIntroTooltip, 
  setCredits, 
  setNotifications 
}) => {
  if (!showCrewIntroTooltip) return null;

  return (
    <div className="intro-tooltip-overlay">
      <div className="intro-tooltip">
        <h3>👥 Crew Recruitment</h3>
        <div className="tooltip-section">
          <p>"Buried in static and noise are identity fragments. Some are real. Most are not."</p>
          <p>🔍 <strong>Objective:</strong> Sort through intercepted profiles and decide who's real.</p>
          <p className="tooltip-tip">💡 <strong>Tip:</strong> You can disable this mini-game in Settings &gt; Gameplay if you prefer to automatically get median points instead of playing.</p>
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

        {localStorage.getItem('skipRecruitmentMiniGame') === null && (
          <div className="mini-game-choice-section">
            <h4>🎮 Mini-Game Preference</h4>
            <p>Would you like to play the mini-game or automatically get median points?</p>
            <div className="choice-buttons">
              <button className="intro-tooltip-button play-button" onClick={() => {
                localStorage.setItem('skipRecruitmentMiniGame', 'false');
                localStorage.setItem('crewGameIntroSeen', 'true');
                setShowCrewIntroTooltip(false);
              }}>
                🎯 Play Mini-Game
              </button>
              <button className="intro-tooltip-button skip-button" onClick={() => {
                localStorage.setItem('skipRecruitmentMiniGame', 'true');
                localStorage.setItem('crewGameIntroSeen', 'true');
                setShowCrewIntroTooltip(false);

                // Import and close any active recruitment games
                const { useRecruitmentZustand } = require('../stores/crewRecruitment/recruitmentZustand');
                const store = useRecruitmentZustand.getState();

                // Close any open mini-game windows
                store.resetGame();

                // Auto-complete with median score
                const profileCount = localStorage.getItem('signal_expander_purchased') ? 10 : 8;
                const medianScore = Math.floor(profileCount * 0.6);

                // Randomly select game variant for unlocks
                const random = Math.random();
                if (random < 0.7) {
                  store.handleGameEnd(medianScore);
                } else {
                  store.handleSkillsGameEnd(medianScore);
                }
              }}>
                ⚡ Skip & Get Median Points (~60%)
              </button>
            </div>
            <p className="choice-note">💡 You can change this later in Settings &gt; Gameplay</p>
          </div>
        )}

        {localStorage.getItem('skipRecruitmentMiniGame') !== null && (
          <button className="intro-tooltip-button" onClick={() => {
            localStorage.setItem('crewGameIntroSeen', 'true');
            setShowCrewIntroTooltip(false);
          }}>
            Begin Verification
          </button>
        )}
      </div>
    </div>
  );
};

export default CrewRecruitmentTooltip;
