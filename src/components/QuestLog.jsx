
import React, { useState } from 'react';

export default function QuestLog({ tutorialStage }) {
  const [isOpen, setIsOpen] = useState(false);
  
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
    <div className={`quest-log ${isOpen ? 'open' : ''}`}>
      <button className="quest-log-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Close Quests' : 'Quest Log'}
      </button>
      {isOpen && (
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
      )}
    </div>
  );
}
