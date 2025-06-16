
import React, { useState, useEffect } from 'react';
import '../styles/mobile/QuestLogMobile.css';
import { getAvailableQuestLines, getCurrentQuestLine, QUEST_LINES } from '../utils/questValidation';

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

  // Get available quest lines dynamically
  const availableQuestLines = getAvailableQuestLines();
  const questLinesMap = {};
  
  availableQuestLines.forEach(({ key, quests }) => {
    questLinesMap[key] = quests.map((quest, index) => ({
      id: index + 1,
      title: quest.title,
      task: quest.description,
      reward: (() => {
        const reward = quest.reward;
        if (!reward) return 'No reward';
        
        // Check for specific extracted rewards first
        if (reward.message?.includes('Received: ')) {
          return reward.message.split('Received: ')[1];
        }
        if (reward.extraMessage?.includes('Obtained: ')) {
          return reward.extraMessage.split('Obtained: ')[1];
        }
        if (reward.extraMessage?.includes('Unlocked: ')) {
          return reward.extraMessage.split('Unlocked: ')[1];
        }
        
        // Handle different reward types
        switch (reward.type) {
          case 'electroShards':
            return `${reward.amount}x Electro Shard${reward.amount > 1 ? 's' : ''}`;
          case 'credits':
            return `${reward.amount} Scratz`;
          case 'autoClicks':
            return `+${reward.amount} Auto Click${reward.amount > 1 ? 's' : ''}`;
          case 'permanentAutoClicks':
            return `+${reward.amount} Permanent Auto Click${reward.amount > 1 ? 's' : ''}`;
          case 'craftingMaterial':
            return `${reward.amount}x ${reward.material}`;
          case 'special':
            // For special rewards, show what they unlock
            switch (reward.action) {
              case 'unlockPrestige':
                return 'Prestige System Unlock';
              case 'unlockPrestige1':
                return 'Advanced Prestige Unlock';
              case 'unlockAdvancedMissions':
                return 'Advanced Missions & Elite Gear';
              case 'unlockSuperOvercharged':
                return 'Super Overcharged Crystal Recipe';
              default:
                return 'Special Unlock';
            }
          case 'notification':
            return 'Achievement Badge';
          default:
            return 'Special Reward';
        }
      })(),
      category: quest.category,
      difficulty: quest.difficulty
    }));
  });
  
  const questLines = questLinesMap;

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
    const currentQuestLine = getCurrentQuestLine();
    if (selectedQuestLine !== currentQuestLine && questLines[currentQuestLine]) {
      setSelectedQuestLine(currentQuestLine);
    }
  }, [selectedQuestLine, questLines]);

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
          {availableQuestLines.map(({ key, name }) => (
            <button
              key={key}
              className={`quest-tab ${selectedQuestLine === key ? 'active' : ''} ${
                key === 'ascension' && localStorage.getItem('cogfatherEvent') === 'true' && !localStorage.getItem('ascension_tab_clicked') ? 'highlight' : ''
              }`}
              onClick={() => {
                setSelectedQuestLine(key);
                if (key === 'ascension') {
                  localStorage.setItem('ascension_tab_clicked', 'true');
                }
              }}
            >
              {name}
            </button>
          ))}
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
