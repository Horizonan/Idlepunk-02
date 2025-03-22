
import React, { useState, useEffect } from 'react';

export default function QuestLog({ tutorialStage, onClose }) {
  const [showQuestLog, setShowQuestLog] = useState(true);
  const [selectedQuestLine, setSelectedQuestLine] = useState('progression');
  const [position, setPosition] = useState(() => {
    const saved = localStorage.getItem('questLogPosition');
    return saved ? JSON.parse(saved) : { x: 0, y: 0 };
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const questLines = {
    progression: [
      { id: 1, title: "First Steps", task: "Click on the junk pile to collect some scrap" },
      { id: 2, title: "Shopping Time", task: "Visit the store and buy your first upgrade" },
      { id: 3, title: "Tool Master", task: "Keep collecting and upgrading your tools" },
      { id: 4, title: "Passive Income", task: "Purchase something that generates passive income" },
      { id: 5, title: "Crafting Begin", task: "Start crafting items from your collected junk" },
      { id: 6, title: "Surge Rider", task: "Take advantage of the surge to collect extra junk", reward: "1x Electro Shard" }
    ],
    ascension: [
      { id: 7, title: "Surge Overflow", task: "Trigger 3 Trash Surges", reward: "1x Stabilized Capacitor" },
      { id: 8, title: "The Circuit Speaks", task: "Collect 5 Electro Shards", reward: "Voltage Node" },
      { id: 9, title: "Whispers in the Scrap", task: "Collect 10 Lore Logs or reach 7.5M Junk", reward: "Synthcore Fragment" },
      { id: 10, title: "Forge the Future", task: "Craft the Prestige Crystal", reward: "Unlocks Ascension" }
    ]
  };

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
        <div className="quest-header">
          <h3>Quest Log</h3>
          <button className="close-button" onClick={onClose}>Close</button>
        </div>
        <div className="quest-tabs">
          <button 
            className={`quest-tab ${selectedQuestLine === 'progression' ? 'active' : ''}`}
            onClick={() => setSelectedQuestLine('progression')}
          >
            Early Progression
          </button>
          {localStorage.getItem('cogfatherEvent') === 'true' && (
            <button 
              className={`quest-tab ${selectedQuestLine === 'ascension' ? 'active' : ''}`}
              onClick={() => setSelectedQuestLine('ascension')}
            >
              Ascension Protocol
            </button>
          )}
        </div>
        <div className="quest-list">
          {questLines[selectedQuestLine].map((quest) => (
            <div 
              key={quest.id} 
              className={`quest-item ${
                quest.id < tutorialStage ? 'completed' : 
                quest.id === tutorialStage ? 'active' : 'pending'
              }`}
            >
              <div className="quest-title">{quest.title}</div>
              <div className="quest-task">{quest.task}</div>
              {quest.reward && <div className="quest-reward">Reward: {quest.reward}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
