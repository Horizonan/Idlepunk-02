
import React, { useState, useEffect } from 'react';

export default function QuestLog({ tutorialStage }) {
  const [position, setPosition] = useState(() => {
    const saved = localStorage.getItem('questLogPosition');
    return saved ? JSON.parse(saved) : { x: 0, y: 0 };
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    localStorage.setItem('questLogPosition', JSON.stringify(position));
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

  const quests = [
    { id: 1, title: "First Steps", task: "Click on the junk pile to collect some scrap" },
    { id: 2, title: "Shopping Time", task: "Visit the store and buy your first upgrade" },
    { id: 3, title: "Tool Master", task: "Keep collecting and upgrading your tools" },
    { id: 4, title: "Passive Income", task: "Purchase something that generates passive income" },
    { id: 5, title: "Helping Hand", task: "Hire your first helper to collect junk for you" },
    { id: 6, title: "Crafting Begin", task: "Start crafting items from your collected junk" },
    { id: 7, title: "Surge Rider", task: "Take advantage of the surge to collect extra junk" }
  ];

  return (
    <div 
      className="quest-log open"
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
      <div className="quest-log-content">
        <h3>Quest Log</h3>
        <div className="quest-list">
          {quests.map((quest) => (
            <div 
              key={quest.id} 
              className={`quest-item ${
                quest.id < tutorialStage ? 'completed' : 
                quest.id === tutorialStage ? 'active' : 'pending'
              }`}
            >
              <div className="quest-title">{quest.title}</div>
              <div className="quest-task">{quest.task}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
