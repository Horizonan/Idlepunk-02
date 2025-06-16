
import React, { useState, useEffect } from 'react';
import '../styles/mobile/QuestLogMobile.css';

export default function QuestLog({ tutorialStage, onClose }) {
  const [showQuestLog, setShowQuestLog] = useState(true);
  const [selectedQuestLine, setSelectedQuestLine] = useState('prestige0');
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
    if (isMobile) return;
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e) => {
    if (isMobile || !isDragging) return;
    const newPosition = {
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y
    };
    setPosition(newPosition);
    localStorage.setItem('questLogPosition', JSON.stringify(newPosition));
  };

  const handleMouseUp = () => {
    if (isMobile) return;
    setIsDragging(false);
  };

  const questLines = {
    prestige0: [
      { id: 1, title: "First Contact with Junk", task: "Click the junk pile 10 times to start your scavenging career", category: "tutorial", difficulty: "easy" },
      { id: 2, title: "Window Shopping Spree", task: "Visit the store and buy your first upgrade", category: "tutorial", difficulty: "easy" },
      { id: 3, title: "Tool Supremacy", task: "Upgrade your click multiplier to 5x or higher", reward: "1x Electro Shard", category: "progression", difficulty: "easy" },
      { id: 4, title: "Passive Aggressive Income", task: "Purchase something that generates passive junk income", category: "progression", difficulty: "medium" },
      { id: 5, title: "Crafting for Dummies", task: "Craft your first item from collected junk", category: "progression", difficulty: "medium" },
      { id: 6, title: "Surge Surfer", task: "Ride the trash surge wave and collect bonus junk", reward: "1x Electro Shard", category: "advanced", difficulty: "medium" },
      { id: 7, title: "Crystal Forge Master", task: "Craft the Basic Prestige Crystal to unlock the next tier", reward: "Unlocks Prestige 1", category: "milestone", difficulty: "hard" }
    ],
    prestige1: [
      { id: 1, title: "Reboot Protocols", task: "Reach 1M junk in your first prestige run", category: "milestone", difficulty: "medium" },
      { id: 2, title: "Automation Station", task: "Buy 5 Auto-Clickers to reduce manual labor", reward: "+1 Permanent Autoclick", category: "progression", difficulty: "medium" },
      { id: 3, title: "Tech Tree Climber", task: "Purchase 3 different tech tree upgrades", reward: "2x Tech Points", category: "progression", difficulty: "medium" },
      { id: 4, title: "Efficiency Expert", task: "Reach 10x click multiplier through upgrades", reward: "1x Voltage Capacitor", category: "progression", difficulty: "hard" },
      { id: 5, title: "Mass Production", task: "Trigger 3 trash surges for maximum efficiency", reward: "1x Stabilized Core", category: "challenge", difficulty: "hard" },
      { id: 6, title: "Advanced Crystal Synthesis", task: "Craft the Enhanced Prestige Crystal", reward: "Unlocks Prestige 2", category: "milestone", difficulty: "hard" }
    ],
    prestige2: [
      { id: 1, title: "Second Wind", task: "Reach 5M junk after your second prestige", category: "milestone", difficulty: "medium" },
      { id: 2, title: "Scratz Entrepreneur", task: "Earn your first 50 Scratz from mining", category: "progression", difficulty: "medium" },
      { id: 3, title: "People Manager", task: "Recruit your first crew member", reward: "30 Scratz", category: "progression", difficulty: "medium" },
      { id: 4, title: "Mission Commander", task: "Complete 5 crew missions successfully", reward: "1x Quantum Relay", category: "progression", difficulty: "hard" },
      { id: 5, title: "Gambling Problem", task: "Buy the Big Slot Machine for some risky fun", reward: "Addiction Achievement", category: "side", difficulty: "medium" },
      { id: 6, title: "Crew Chief", task: "Have 3 active crew members working for you", reward: "1x Neural Interface", category: "progression", difficulty: "hard" },
      { id: 7, title: "Superior Crystal Engineering", task: "Craft the Superior Prestige Crystal", reward: "Unlocks Prestige 3", category: "milestone", difficulty: "epic" }
    ],
    prestige3: [
      { id: 1, title: "Third Time's the Charm", task: "Reach 20M junk in your third prestige cycle", category: "milestone", difficulty: "hard" },
      { id: 2, title: "Skills Assessment", task: "Unlock the Skills Menu and train your first skill", category: "progression", difficulty: "medium" },
      { id: 3, title: "Multi-Talented", task: "Train 3 different skills to level 5", reward: "1x Skill Amplifier", category: "progression", difficulty: "hard" },
      { id: 4, title: "Elite Crew Operations", task: "Complete 15 crew missions with skilled members", reward: "1x Command Matrix", category: "progression", difficulty: "hard" },
      { id: 5, title: "Resource Tycoon", task: "Accumulate 500 Scratz through various means", reward: "1x Wealth Converter", category: "collection", difficulty: "epic" },
      { id: 6, title: "Perfect Crystal Mastery", task: "Craft the Perfect Prestige Crystal", reward: "Unlocks Prestige 4", category: "milestone", difficulty: "epic" }
    ],
    prestige4: [
      { id: 1, title: "Fourth Dimension", task: "Reach 100M junk in your fourth prestige run", category: "milestone", difficulty: "hard" },
      { id: 2, title: "Scraptagon Initiate", task: "Access the Scraptagon battle system", category: "progression", difficulty: "medium" },
      { id: 3, title: "Combat Training", task: "Win 5 battles in the Scraptagon arena", reward: "1x Battle Core", category: "progression", difficulty: "hard" },
      { id: 4, title: "Skill Master", task: "Max out 2 different skills to level 10", reward: "1x Mastery Gem", category: "progression", difficulty: "epic" },
      { id: 5, title: "Arena Champion", task: "Win 25 Scraptagon battles with different strategies", reward: "1x Victory Essence", category: "challenge", difficulty: "epic" },
      { id: 6, title: "Legendary Status", task: "Accumulate 2000 Scratz and complete 50 crew missions", reward: "1x Legend Fragment", category: "collection", difficulty: "legendary" },
      { id: 7, title: "Ultimate Crystal Creation", task: "Craft the Ultimate Prestige Crystal", reward: "Unlocks Prestige 5", category: "milestone", difficulty: "legendary" }
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

  // Determine current questline based on prestige count
  const prestigeCount = parseInt(localStorage.getItem('prestigeCount') || '0');
  
  useEffect(() => {
    const currentQuestLine = `prestige${Math.min(prestigeCount, 4)}`;
    if (selectedQuestLine !== currentQuestLine) {
      setSelectedQuestLine(currentQuestLine);
    }
  }, [prestigeCount, selectedQuestLine]);

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
          {[0, 1, 2, 3, 4].map(tier => {
            const isUnlocked = prestigeCount >= tier;
            const questLineKey = `prestige${tier}`;
            return (
              <button 
                key={tier}
                className={`quest-tab ${selectedQuestLine === questLineKey ? 'active' : ''} ${!isUnlocked ? 'locked' : ''}`}
                onClick={() => isUnlocked && setSelectedQuestLine(questLineKey)}
                disabled={!isUnlocked}
              >
                {tier === 0 ? 'Tutorial' : `Prestige ${tier}`}
              </button>
            );
          })}
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
