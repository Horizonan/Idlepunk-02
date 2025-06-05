
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
      { id: 1, title: "First Steps", task: "Click on the junk pile to collect some scrap", category: "tutorial", difficulty: "easy" },
      { id: 2, title: "Shopping Time", task: "Visit the store and buy your first upgrade", category: "tutorial", difficulty: "easy" },
      { id: 3, title: "Tool Master", task: "Keep collecting and upgrading your tools", reward: "1x Electro Shard", category: "progression", difficulty: "easy" },
      { id: 4, title: "Passive Income", task: "Purchase some junk to generate passive junk", category: "progression", difficulty: "medium" },
      { id: 5, title: "Begin Crafting", task: "Start crafting items from your collected junk", category: "progression", difficulty: "medium" },
      { id: 6, title: "Surge Rider", task: "Take advantage of the surge to collect extra junk", reward: "1x Electro Shard", category: "advanced", difficulty: "medium" },
      { id: 7, title: "Scratz $$$", task: "Buy a miner and create cash from air... and uh junk cells", reward: "30 Scratz", category: "advanced", difficulty: "medium" },
      { id: 8, title: "Alone or Lonely?", task: "Dont waste those Scratz you just got! Go recruit some crew members...", reward: "30 Scratz again!", category: "advanced", difficulty: "medium" },
      { id: 9, title: "Automation Punk", task: "Tired of clicking? Buy 10 Autoclickers!", reward: "+1 Permanent Autoclick", category: "advanced", difficulty: "hard" },
      { id: 10, title: "Unlock Ascension Protocol", task: "Reach 4 million junk to unlock the path to prestige", reward: "Unlocks the Ascension Protocol Questline", category: "milestone", difficulty: "hard" },
      { id: 11, title: "Gambling Addiction", task: "Buy the Big Slot Machine", reward: "Become a gambler", category: "side", difficulty: "medium" }
    ],
    ascension: [ 
      { id: 7, title: "Surge Overflow", task: "Trigger 3 Trash Surges", reward: "1x Stabilized Capacitor", category: "challenge", difficulty: "medium" },
      { id: 8, title: "The Circuit Speaks", task: "Collect 4 Electro Shards", reward: "1x Voltage Node", category: "collection", difficulty: "medium" },
      { id: 9, title: "Whispers in the Scrap", task: "Collect  20M Junk", reward: "1x Synthcore Fragment", category: "collection", difficulty: "hard" },
      { id: 10, title: "Scratz to Riches", task: "Collect  200 Scratz and Complete 5 Crew Missions", reward: "1x Quantum Entangler", category: "collection", difficulty: "epic" },
      { id: 11, title: "Forge the Future", task: "Craft the Prestige Crystal", reward: "Unlocks Ascension", category: "milestone", difficulty: "legendary" }
    ],
    awakenTheCore: [
      { id: 1, title: "System Memory Detected", task: "Reach 50M Junk (post-prestige)", reward: "Encrypted Coil", category: "milestone", difficulty: "hard" },
      { id: 2, title: "Tap the Pulse", task: "Click the Tronics Clicker 10000 times", reward: "+5 Auto clicks", category: "challenge", difficulty: "medium" },
      { id: 3, title: "Upgrade Cascade", task: "Purchase 10 ElectroShop Upgrades", reward: "Surge Capacitor Fragment", category: "progression", difficulty: "hard" },
      { id: 4, title: "Beacon Protocol", task: "Own 10 Electro Shard Beacons", reward: "Unlocks crafting recipe for Overcharged Prestige Crystal", category: "collection", difficulty: "epic" },
      { id: 5, title: "Mission Obsessed", task: "Complete 20 Missions and gather 2000 Scratz", reward: "Unlocks multiple new Missions and Gear", category: "collection", difficulty: "legendary" },
      { id: 6, title: "Forge the Overcrystal", task: "Craft the Overcharged Prestige Crystal", reward: "Unlocks Second Prestige", category: "milestone", difficulty: "legendary" }
    ]
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'easy': return '#00FF00';
      case 'medium': return '#FFFF00';
      case 'hard': return '#FF8000';
      case 'epic': return '#9400D3';
      case 'legendary': return '#FF00FF';
      default: return '#CCCCCC';
    }
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'tutorial': return '📚';
      case 'progression': return '⚡';
      case 'advanced': return '🔧';
      case 'milestone': return '🏆';
      case 'challenge': return '💪';
      case 'collection': return '📦';
      case 'side': return '🎲';
      default: return '⭐';
    }
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
        <div className="quest-header sticky">
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
              className={`quest-tab ${selectedQuestLine === 'awakenTheCore' ? 'active' : ''}`}
              onClick={() => setSelectedQuestLine('awakenTheCore')}
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
              <div className="quest-title">
                <span className="quest-category-icon">{getCategoryIcon(quest.category)}</span>
                <span className="quest-title-text">{quest.title}</span>
                <span 
                  className="quest-difficulty" 
                  style={{ 
                    color: getDifficultyColor(quest.difficulty),
                    fontSize: '0.8em',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    marginLeft: '8px'
                  }}
                >
                  {quest.difficulty}
                </span>
              </div>
              {!questStates[quest.title] && (
                <>
                  <div className="quest-task">{quest.task}</div>
                  {quest.reward && <div className="quest-reward">🎁 {quest.reward}</div>}
                </>
              )}
              {questStates[quest.title] && (
                <div className="quest-completed-text">Quest Completed! ✨</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
