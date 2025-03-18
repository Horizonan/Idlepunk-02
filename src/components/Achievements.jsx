
import React from 'react';

export default function Achievements({ achievements, onClose }) {
  return (
    <div className="achievements-container">
      <div className="achievements-header">
        <h2>Achievements</h2>
        <button onClick={onClose}>Close</button>
      </div>
      <div className="achievements-list">
        {achievements.map((achievement) => (
          <div key={achievement.title} className={`achievement ${achievement.unlocked ? 'unlocked' : ''}`}>
            <h3>{achievement.title}</h3>
            <p className="flavor-text">"{achievement.flavorText}"</p>
            <p className="requirement">Requirement: {achievement.requirement}</p>
            <p className="reward">Reward: {achievement.reward}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
