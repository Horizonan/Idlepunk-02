
import React, { useState, useEffect } from 'react';

export default function Achievements({ achievements, onClose }) {
  const [position, setPosition] = useState(() => {
    const saved = localStorage.getItem('achievementsPosition');
    return saved ? JSON.parse(saved) : { x: 20, y: 20 };
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    localStorage.setItem('achievementsPosition', JSON.stringify(position));
  }, [position]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
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
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none'
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="achievements-header">
        <h2>Achievements</h2>
        <button onClick={onClose}>Close</button>
      </div>
      <div className="achievements-list">
        {achievements.map((achievement, index) => (
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
  );
}
