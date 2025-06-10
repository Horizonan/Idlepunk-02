
import React from 'react';
import '../styles/popups/SkillsCenterIntro.css';

export default function SkillsCenterIntro({ onClose }) {
  return (
    <div className="skills-intro-overlay">
      <div className="skills-intro-popup">
        <div className="skills-intro-header">
          <h2>🧠 Skills Center</h2>
          <button className="skills-intro-close" onClick={onClose}>×</button>
        </div>
        <div className="skills-intro-content">
          <div className="skills-intro-icon">🧠</div>
          <h3>Welcome to the Skills Center!</h3>
          <p>
            Train your abilities to become a more efficient scavenger and unlock powerful passive bonuses.
          </p>
          
          <div className="skills-benefits">
            <h4>How Skills Work:</h4>
            <ul>
              <li>🎯 <strong>Select a Skill</strong> - Choose which skill you want to train</li>
              <li>⏱️ <strong>Passive Training</strong> - Skills gain XP automatically every 10 seconds while selected</li>
              <li>📈 <strong>Level Up</strong> - Each level provides permanent bonuses to your abilities</li>
              <li>🔓 <strong>Unlock New Skills</strong> - Advanced skills unlock as you progress</li>
            </ul>
          </div>

          <div className="available-skills">
            <h4>Available Skills:</h4>
            <div className="skill-preview">
              <strong>🔍 Scavenging Focus</strong>
              <p>Increases Junk per Click by +1% per level (Max: 10 levels)</p>
              <em>"Eyes sharp, hands faster."</em>
            </div>
            <div className="skill-preview">
              <strong>🔧 Grease Discipline</strong>
              <p>Increases passive Junk/sec by +0.5% per level (Unlocks at Scavenging Focus Level 5)</p>
              <em>"The pile works harder when you do."</em>
            </div>
          </div>

          <div className="skills-tips">
            <h4>💡 Pro Tips:</h4>
            <ul>
              <li>Only one skill can be trained at a time - choose wisely!</li>
              <li>Training continues even when the Skills Center is closed</li>
              <li>Higher level skills take more XP to advance</li>
              <li>Skills provide permanent bonuses that persist through prestige</li>
            </ul>
          </div>

          <button className="skills-intro-got-it" onClick={onClose}>
            Start Training!
          </button>
        </div>
      </div>
    </div>
  );
}
