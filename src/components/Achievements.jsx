import React, { useState, useEffect } from 'react';

export default function Achievements({ achievements, onClose }) {
  const [position, setPosition] = useState(() => {
    const saved = localStorage.getItem('achievementsPosition');
    if (saved) return JSON.parse(saved);

    // Center on screen by default
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    return {
      x: (screenWidth - 400) / 2, // 400 is the approximate width of the achievements menu
      y: (screenHeight - 500) / 2 // 500 is the approximate height of the achievements menu
    };
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [showBadges, setShowBadges] = useState(true); // Added state for badges toggle

  useEffect(() => {
    localStorage.setItem('achievementsPosition', JSON.stringify(position));
  }, [position]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div 
      className="achievements-container"
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        userSelect: 'none'
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div 
        className="achievements-header"
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        onMouseDown={handleMouseDown}
      >
        <h2>Achievements</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('validateAchievements'))}
            style={{ padding: '4px 8px', fontSize: '12px', backgroundColor: '#4a4a4a' }}
          >
            Validate Achievements
          </button>
          {!showBadges && (
            <button 
              onClick={() => setShowBadges(true)}
              style={{ padding: '4px 8px', fontSize: '12px' }}
            >Show Badges</button>
          )}
          <button onClick={onClose}>Close</button>
        </div>
      </div>
      <div className="achievements-tabs">
        <div className="achievements-list">
          <h3>Progress</h3>
          <div className="achievements-section">
            {achievements.map((achievement, index) => {
              if (achievement.category) return null;
              return (
                <div key={achievement.title} className={`achievement ${achievement.unlocked ? 'unlocked' : ''}`}>
                  <h3>{achievement.title}</h3>
                  <p className="flavor-text">"{achievement.flavorText}"</p>
                  <p className="requirement">Requirement: {achievement.requirement}</p>
                  <p className="reward">Reward: {achievement.reward}</p>
                  <p className="status">{achievement.unlocked ? '✓ Completed' : '⋯ In Progress'}</p>
                </div>
              );
            })}
          </div>

          <h3 className="electro-title">Electro Shard Milestones</h3>
          <div className="achievements-section">
            {achievements.filter(a => a.category === 'electroShard').map((achievement, index) => (
              <div key={index} className={`achievement ${achievement.unlocked ? 'unlocked' : ''}`}>
                <h3>{achievement.title}</h3>
                <p className="flavor-text">"{achievement.flavorText}"</p>
                <p className="requirement">Requirement: {achievement.requirement}</p>
                <p className="reward">Reward: {achievement.reward}</p>
                <p className="status">{achievement.unlocked ? '✓ Completed' : '⋯ In Progress'}</p>
              </div>
            ))}
          </div>
        </div>
        {showBadges && ( // Added conditional rendering for badges
          <div className="achievements-badges">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3>Badges</h3>
              <button 
                onClick={() => setShowBadges(false)}
                style={{ padding: '4px 8px', fontSize: '12px' }}
              >Hide</button>
            </div>
            <div className="badges-grid">
              {achievements.filter(a => a.unlocked && a.badge).map((achievement, index) => (
                <div key={index} className="badge" title={achievement.title}>
                  {achievement.badge}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}