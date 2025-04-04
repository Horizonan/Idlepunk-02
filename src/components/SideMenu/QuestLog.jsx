
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
  const [questStates, setQuestStates] = useState({});

  useEffect(() => {
    const handleStorageChange = () => {
      const newQuestStates = {};
      if (questLines[selectedQuestLine]) {
        questLines[selectedQuestLine].forEach(quest => {
          newQuestStates[quest.title] = localStorage.getItem(`quest_sync_${quest.title}`) === 'true';
        });
      }
      setQuestStates(newQuestStates);
    };

    handleStorageChange();
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('questUpdate', handleStorageChange);
    const interval = setInterval(handleStorageChange, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('questUpdate', handleStorageChange);
      clearInterval(interval);
    };
  }, [selectedQuestLine]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newPosition = {
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      };
      setPosition(newPosition);
      localStorage.setItem('questLogPosition', JSON.stringify(newPosition));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const questLines = {
    progression: [
      { id: 1, title: "First Steps", task: "Click on the junk pile to collect some scrap" },
      { id: 2, title: "Shopping Time", task: "Visit the store and buy your first upgrade" },
      { id: 3, title: "Tool Master", task: "Keep collecting and upgrading your tools", reward: "1x Electro Shard" },
      { id: 4, title: "Passive Income", task: "Purchase something that generates passive income" },
      { id: 5, title: "Begin Crafting", task: "Start crafting items from your collected junk" },
      { id: 6, title: "Surge Rider", task: "Take advantage of the surge to collect extra junk", reward: "1x Electro Shard" },
      { id: 7, title: "Automation Punk", task: "Tired of clicking? Buy 10 Autoclickers!", reward: "+1 Permanent Autoclick" },
      { id: 8, title: "Unlock Ascension Protocol", task: "Reach 1 million junk to unlock the path to prestige", reward: "Unlocks the Ascension Protocol Questline" },
      { id: 9, title: "Gambling Addiction", task: "Buy the Big Slot Machine", reward: "Become a gambler" }
    ],
    ascension: [ 
      { id: 7, title: "Surge Overflow", task: "Trigger 3 Trash Surges", reward: "1x Stabilized Capacitor" },
      { id: 8, title: "The Circuit Speaks", task: "Collect 4 Electro Shards", reward: "1x Voltage Node" },
      { id: 9, title: "Whispers in the Scrap", task: "Collect 10 Lore Logs or reach 12.5M Junk", reward: "1x Synthcore Fragment" },
      { id: 10, title: "Forge the Future", task: "Craft the Prestige Crystal", reward: "Unlocks Ascension" }
    ],
    awakenTheCore: [
      { id: 1, title: "System Memory Detected", task: "Reach 25M Junk (post-prestige)", reward: "Encrypted Coil" },
      { id: 2, title: "Tap the Pulse", task: "Click the Tronics Clicker 5000 times", reward: "+5 Auto clicks" },
      { id: 3, title: "Upgrade Cascade", task: "Purchase 10 ElectroShop Upgrades", reward: "Surge Capacitor Fragment"},
      { id: 4, title: "Beacon Protocol", task: "Own 10 Electro Shard Beacons", reward: "Unlocks crafting recipe for Overcharged Prestige Crystal" },
      { id: 5, title: "Forge the Overcrystal", task: "Craft the Overcharged Prestige Crystal", reward: "Unlocks Second Prestige"}
      
    ]
  };

  const hasPrestiged = localStorage.getItem('hasPrestiged') === 'true';

  // Set initial questline based on prestige status
  useEffect(() => {
    if (hasPrestiged && selectedQuestLine !== 'awakenTheCore') {
      setSelectedQuestLine('awakenTheCore');
    } else if (!hasPrestiged && selectedQuestLine === 'awakenTheCore') {
      setSelectedQuestLine('progression');
    }
  }, [hasPrestiged]);

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
          {!hasPrestiged && (
            <>
              <button 
                className={`quest-tab ${selectedQuestLine === 'progression' ? 'active' : ''}`}
                onClick={() => setSelectedQuestLine('progression')}
              >
                Early Progression
              </button>
              {localStorage.getItem('cogfatherEvent') === 'true' && (
                <button 
                  className={`quest-tab ${selectedQuestLine === 'ascension' ? 'active' : ''} ${localStorage.getItem('cogfatherEvent') === 'true' && !localStorage.getItem('ascension_tab_clicked') ? 'highlight' : ''}`}
                  onClick={() => {
                    setSelectedQuestLine('ascension');
                    localStorage.setItem('ascension_tab_clicked', 'true');
                  }}
                >
                  Ascension Protocol
                </button>
              )}
            </>
          )}
          {hasPrestiged && (
            <button
              className={`quest-tab ${selectedQuestLine === 'postPrestige' ? 'active' : ''}`}
              onClick={() => setSelectedQuestLine('postPrestige')}
            >
              Awaken the Core
            </button>
          )}
        </div>
        <div className="quest-list">
          {questLines[selectedQuestLine]?.map((quest) => (
            <div 
              key={quest.id} 
              className={`quest-item ${questStates[quest.title] ? 'completed' : 'active'}`}
            >
              <div className="quest-title">{quest.title}</div>
              {!questStates[quest.title] && (
                <>
                  <div className="quest-task">{quest.task}</div>
                  {quest.reward && <div className="quest-reward">Reward: {quest.reward}</div>}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
