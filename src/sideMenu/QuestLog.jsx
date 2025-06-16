
import React, { useState, useEffect } from 'react';
import '../styles/mobile/QuestLogMobile.css';

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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    if (isMobile) return; // Disable dragging on mobile
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e) => {
    if (isMobile || !isDragging) return; // Disable dragging on mobile
    const newPosition = {
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y
    };
    setPosition(newPosition);
    localStorage.setItem('questLogPosition', JSON.stringify(newPosition));
  };

  const handleMouseUp = () => {
    if (isMobile) return; // Disable dragging on mobile
    setIsDragging(false);
  };

  const questLines = {
    prestige0: [
      { id: 1, title: "First Steps", task: "Click on the junk pile to collect some scrap", category: "tutorial", difficulty: "easy" },
      { id: 2, title: "Shopping Time", task: "Visit the store and buy your first upgrade", category: "tutorial", difficulty: "easy" },
      { id: 3, title: "Tool Master", task: "Keep collecting and upgrading your tools", reward: "1x Electro Shard", category: "progression", difficulty: "easy" },
      { id: 4, title: "Passive Income Paradise", task: "Purchase something that generates passive income", category: "progression", difficulty: "medium" },
      { id: 5, title: "Begin Crafting", task: "Start crafting items from your collected junk", category: "progression", difficulty: "medium" },
      { id: 6, title: "Surge Rider", task: "Take advantage of the surge to collect extra junk", reward: "1x Electro Shard", category: "advanced", difficulty: "medium" },
      { id: 7, title: "Automation Punk", task: "Tired of clicking? Buy 10 Autoclickers!", reward: "+1 Permanent Autoclick", category: "advanced", difficulty: "hard" },
      { id: 8, title: "Gambling Addiction", task: "Buy the Big Slot Machine", reward: "Become a gambler", category: "side", difficulty: "medium" },
      { id: 9, title: "Surge Overflow", task: "Trigger 3 Trash Surges", reward: "1x Stabilized Capacitor", category: "advanced", difficulty: "medium" },
      { id: 10, title: "The Circuit Speaks", task: "Collect 4 Electro Shards", reward: "1x Voltage Node", category: "advanced", difficulty: "medium" },
      { id: 11, title: "Whispers in the Scrap", task: "Reach 20M Junk", reward: "1x Synthcore Fragment", category: "milestone", difficulty: "hard" },
      { id: 12, title: "Unlock Ascension Protocol", task: "Reach 4 million junk to unlock the path to prestige", reward: "Unlocks the Ascension Protocol Questline", category: "milestone", difficulty: "hard" },
      { id: 13, title: "Forge the Future", task: "Craft the Prestige Crystal", reward: "Unlocks First Prestige", category: "prestige", difficulty: "epic" }
    ],
    prestige1: [
      { id: 1, title: "System Memory Detected", task: "Reach 50M Junk (enhanced automation)", reward: "Encrypted Coil", category: "milestone", difficulty: "hard" },
      { id: 2, title: "Tap the Pulse", task: "Click the Tronics Clicker 5000 times", reward: "+5 Auto clicks", category: "challenge", difficulty: "medium" },
      { id: 3, title: "Upgrade Cascade", task: "Purchase 8 ElectroShop Upgrades", reward: "Surge Capacitor Fragment", category: "progression", difficulty: "hard" },
      { id: 4, title: "Forge the Overcrystal", task: "Craft the Overcharged Prestige Crystal", reward: "Unlocks Crew & Scratz systems", category: "milestone", difficulty: "legendary" }
    ],
    prestige2: [
      { id: 1, title: "Beyond the Heap", task: "Reach 100M Junk (crew operations)", reward: "1x Dimensional Residue", category: "milestone", difficulty: "hard" },
      { id: 2, title: "Recruitment Drive", task: "Hire 3 crew members", reward: "100 Scratz", category: "progression", difficulty: "medium" },
      { id: 3, title: "Mission Control", task: "Complete 10 successful missions", reward: "Unlocks elite gear & advanced missions", category: "progression", difficulty: "hard" },
      { id: 4, title: "Scratz Empire", task: "Accumulate 5000 Scratz", reward: "Unlocks Skills Menu", category: "milestone", difficulty: "epic" }
    ],
    prestige3: [
      { id: 1, title: "Neural Pattern Recognition", task: "Reach 200M Junk (skills era)", reward: "1x Cognitive Enhancer", category: "milestone", difficulty: "hard" },
      { id: 2, title: "Jack of All Trades", task: "Reach 25 total skill levels", reward: "+3 Permanent Autoclicks", category: "progression", difficulty: "medium" },
      { id: 3, title: "Cognitive Overflow", task: "Unlock 3 advanced skills", reward: "1x Quantum Processor", category: "progression", difficulty: "hard" },
      { id: 4, title: "Prepare the Scraptagon", task: "Craft 3 neural enhancement items", reward: "Unlocks the Scraptagon", category: "milestone", difficulty: "legendary" }
    ],
    prestige4: [
      { id: 1, title: "The Scraptagon Awakens", task: "Reach 500M Junk (transcendent power)", reward: "3x Void Essence", category: "milestone", difficulty: "legendary" },
      { id: 2, title: "Dimensional Engineering", task: "Craft 5 dimensional/quantum items", reward: "Unlocks Void Expeditions", category: "progression", difficulty: "epic" },
      { id: 3, title: "Master of the Void", task: "Complete 3 Void Expeditions", reward: "Unlocks Reality Hacking", category: "milestone", difficulty: "legendary" }
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
    const prestigeCount = parseInt(localStorage.getItem('prestigeCount') || '0');
    let targetQuestLine = 'prestige0';
    
    if (prestigeCount >= 4) {
      targetQuestLine = 'prestige4';
    } else if (prestigeCount === 3) {
      targetQuestLine = 'prestige3';
    } else if (prestigeCount === 2) {
      targetQuestLine = 'prestige2';
    } else if (prestigeCount === 1) {
      targetQuestLine = 'prestige1';
    }
    
    if (selectedQuestLine !== targetQuestLine) {
      setSelectedQuestLine(targetQuestLine);
    }
  }, [selectedQuestLine]);

  return (
    <div 
      className="quest-log open"
      style={isMobile ? {} : {
        position: 'fixed',
        left: position.x,
        top: position.y,
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none'
      }}
      onMouseDown={!isMobile ? handleMouseDown : undefined}
      onMouseMove={!isMobile ? handleMouseMove : undefined}
      onMouseUp={!isMobile ? handleMouseUp : undefined}
      onMouseLeave={!isMobile ? handleMouseUp : undefined}
    >
      <div className="quest-log-content">
        <div className="quest-header sticky">
          <h3>Quest Log</h3>
          <button className="close-button" onClick={onClose}>Close</button>
        </div>
        <div className="quest-tabs">
          <button 
            className={`quest-tab ${selectedQuestLine === 'prestige0' ? 'active' : ''}`}
            onClick={() => setSelectedQuestLine('prestige0')}
          >
            Scrap Beginner
          </button>
          {parseInt(localStorage.getItem('prestigeCount') || '0') >= 1 && (
            <button 
              className={`quest-tab ${selectedQuestLine === 'prestige1' ? 'active' : ''}`}
              onClick={() => setSelectedQuestLine('prestige1')}
            >
              Enhanced Systems
            </button>
          )}
          {parseInt(localStorage.getItem('prestigeCount') || '0') >= 2 && (
            <button 
              className={`quest-tab ${selectedQuestLine === 'prestige2' ? 'active' : ''}`}
              onClick={() => setSelectedQuestLine('prestige2')}
            >
              Crew Operations
            </button>
          )}
          {parseInt(localStorage.getItem('prestigeCount') || '0') >= 3 && (
            <button 
              className={`quest-tab ${selectedQuestLine === 'prestige3' ? 'active' : ''}`}
              onClick={() => setSelectedQuestLine('prestige3')}
            >
              Neural Enhancement
            </button>
          )}
          {parseInt(localStorage.getItem('prestigeCount') || '0') >= 4 && (
            <button 
              className={`quest-tab ${selectedQuestLine === 'prestige4' ? 'active' : ''}`}
              onClick={() => setSelectedQuestLine('prestige4')}
            >
              Scraptagon Era
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
