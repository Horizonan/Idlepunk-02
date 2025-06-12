
import React, { useState, useEffect } from 'react';
import '../styles/Achievements.css';
import '../styles/mobile/AchievementsMobile.css';

export default function Achievements({ achievements, onClose }) {
  const [position, setPosition] = useState(() => {
    const saved = localStorage.getItem('achievementsPosition');
    if (saved) return JSON.parse(saved);

    // Center on screen by default
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    return {
      x: (screenWidth - 900) / 2,
      y: (screenHeight - 600) / 2
    };
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [showBadges, setShowBadges] = useState(true);

  useEffect(() => {
    localStorage.setItem('achievementsPosition', JSON.stringify(position));
  }, [position]);

  const handleMouseDown = (e) => {
    // Only allow dragging on desktop
    if (window.innerWidth <= 768) return;
    
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging && window.innerWidth > 768) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Calculate achievement stats
  const totalAchievements = achievements.length;
  const unlockedAchievements = achievements.filter(a => a.unlocked).length;
  const completionPercentage = Math.round((unlockedAchievements / totalAchievements) * 100);
  const electroShardAchievements = achievements.filter(a => a.category === 'electroShard');
  const unlockedElectroAchievements = electroShardAchievements.filter(a => a.unlocked).length;

  // Group achievements by category
  const progressAchievements = achievements.filter(a => !a.category);
  const electroAchievements = achievements.filter(a => a.category === 'electroShard');

  return (
    <div 
      className="achievements-container"
      style={window.innerWidth > 768 ? {
        left: position.x,
        top: position.y,
        transform: 'none'
      } : {}}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div 
        className="achievements-header"
        style={{ cursor: isDragging ? 'grabbing' : (window.innerWidth > 768 ? 'grab' : 'default') }}
        onMouseDown={handleMouseDown}
      >
        <h2>🏆 Achievements</h2>
        <div className="achievements-header-controls">
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('validateAchievements'))}
            title="Refresh achievements"
          >
            🔄 Validate
          </button>
          {!showBadges && (
            <button 
              onClick={() => setShowBadges(true)}
              title="Show badge collection"
            >
              🏅 Show Badges
            </button>
          )}
          <button onClick={onClose} title="Close achievements">✕</button>
        </div>
      </div>
      
      <div className="achievements-content">
        <div className="achievements-main">
          <div className="achievements-section">
            <h3>
              📈 Progress Achievements
              <span style={{ fontSize: '0.8rem', fontWeight: 'normal', color: '#ccc' }}>
                ({progressAchievements.filter(a => a.unlocked).length}/{progressAchievements.length})
              </span>
            </h3>
            <div className="achievements-grid">
              {progressAchievements.map((achievement) => (
                <div 
                  key={achievement.title} 
                  className={`achievement ${achievement.unlocked ? 'unlocked' : ''}`}
                  data-achievement-id={achievement.title}
                >
                  <h3>{achievement.title}</h3>
                  <div className="achievement-content">
                    <p className="flavor-text">"{achievement.flavorText}"</p>
                    <p className="requirement">📋 {achievement.requirement}</p>
                    <p className="reward">🎁 {achievement.reward}</p>
                    <p className={`status ${achievement.unlocked ? 'completed' : 'in-progress'}`}>
                      {achievement.unlocked ? '✅ Completed' : '⏳ In Progress'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {electroAchievements.length > 0 && (
            <div className="achievements-section">
              <h3 className="electro-title">
                ⚡ Electro Shard Milestones
                <span style={{ fontSize: '0.8rem', fontWeight: 'normal', color: '#00cccc' }}>
                  ({unlockedElectroAchievements}/{electroAchievements.length})
                </span>
              </h3>
              <div className="achievements-grid">
                {electroAchievements.map((achievement, index) => (
                  <div 
                    key={index} 
                    className={`achievement ${achievement.unlocked ? 'unlocked' : ''}`}
                  >
                    <h3>{achievement.title}</h3>
                    <div className="achievement-content">
                      <p className="flavor-text">"{achievement.flavorText}"</p>
                      <p className="requirement">📋 {achievement.requirement}</p>
                      <p className="reward">🎁 {achievement.reward}</p>
                      <p className={`status ${achievement.unlocked ? 'completed' : 'in-progress'}`}>
                        {achievement.unlocked ? '✅ Completed' : '⏳ In Progress'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {showBadges && (
          <div className="achievements-sidebar">
            <div className="badges-section">
              <h3>
                🏅 Badge Collection
                <button 
                  className="badges-toggle"
                  onClick={() => setShowBadges(false)}
                  title="Hide badges"
                >
                  Hide
                </button>
              </h3>
              <div className="badges-grid">
                {achievements.filter(a => a.unlocked && a.badge).map((achievement, index) => (
                  <div 
                    key={index} 
                    className="badge" 
                    title={`${achievement.title}: ${achievement.flavorText}`}
                  >
                    {achievement.badge}
                  </div>
                ))}
                {achievements.filter(a => a.unlocked && a.badge).length === 0 && (
                  <div style={{ 
                    gridColumn: '1 / -1', 
                    textAlign: 'center', 
                    color: '#888', 
                    fontSize: '0.9rem',
                    padding: '20px 0'
                  }}>
                    No badges earned yet
                  </div>
                )}
              </div>
            </div>
            
            <div className="achievements-stats">
              <h4>📊 Statistics</h4>
              <div className="stat-item">
                <span className="stat-label">Progress:</span>
                <span className="stat-value">{completionPercentage}%</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Completed:</span>
                <span className="stat-value">{unlockedAchievements}/{totalAchievements}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Badges:</span>
                <span className="stat-value">{achievements.filter(a => a.unlocked && a.badge).length}</span>
              </div>
              {electroAchievements.length > 0 && (
                <div className="stat-item">
                  <span className="stat-label">Electro:</span>
                  <span className="stat-value">{unlockedElectroAchievements}/{electroAchievements.length}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
