import React, { useState, useEffect } from 'react';
import { getAvailableQuests, getQuestProgress, completeQuest } from '../utils/questValidation';
import '../styles/mobile/QuestLogMobile.css';

const QuestLog = ({ 
  junk, 
  tronics, 
  electroShards, 
  craftingInventory, 
  ownedItems, 
  onClose,
  onAddJunk,
  onAddTronics,
  onAddElectroShard,
  setCraftingInventory,
  skillLevels 
}) => {
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
  const [availableQuests, setAvailableQuests] = useState([]);
  const [questProgress, setQuestProgress] = useState({ completed: 0, total: 0, percentage: 0, header: 'Unknown' });

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

  useEffect(() => {
    const gameState = {
      junk,
      tronics,
      scratz: electroShards, // Using electroShards as scratz for now
      electroShards,
      quantumFlux: 0,
      prestigeCount: parseInt(localStorage.getItem('prestigeCount') || '0'),
      craftingInventory,
      ownedItems,
      maxSkillLevel: Math.max(...Object.values(skillLevels)),
      skillPointsSpent: Object.values(skillLevels).reduce((sum, level) => sum + level, 0),
      skillsInvested: Object.values(skillLevels).filter(level => level > 0).length,
      crewMembers: 0,
      missionsCompleted: 0,
      hasPurchasedUpgrade: Object.values(ownedItems).some(count => count > 0),
      techUnlocked: Object.values(ownedItems).filter(count => count > 0).length,
      hasCraftedItem: Object.values(craftingInventory).some(count => count > 0)
    };

    const quests = getAvailableQuests(gameState);
    const progress = getQuestProgress(gameState);

    setAvailableQuests(quests);
    setQuestProgress(progress);
  }, [junk, tronics, electroShards, craftingInventory, ownedItems, skillLevels]);

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
    ],
    prestige2: [
      { id: 1, title: "Beyond the Heap", task: "Reach 100M Junk post-Overcrystal", reward: "1x Dimensional Residue", category: "milestone", difficulty: "hard" },
      { id: 2, title: "Quantum Resonance", task: "Activate the Quantum Stabilizer 10 times", reward: "1x Quantum Fragment", category: "progression", difficulty: "medium" },
      { id: 3, title: "Crafted Ascendancy", task: "Craft 3 Advanced Prestige Items", reward: "+2 Permanent Autoclicks", category: "progression", difficulty: "epic" },
      { id: 4, title: "Surge Harvester", task: "Harvest Junk during 3 Trash Surges", reward: "1x Surge Core Stabilizer", category: "collection", difficulty: "hard" },
      { id: 5, title: "Become A Scratzionaire", task: "Reach 1mil Scratz", reward: "Unlocks Super Overcharged Crystal", category: "milestone", difficulty: "legendary" }
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
    const prestige2Active = localStorage.getItem('prestige2Active') === 'true';

    if (prestige2Active && selectedQuestLine !== 'prestige2') {
      setSelectedQuestLine('prestige2');
    } else if (hasPrestiged && !prestige2Active && selectedQuestLine !== 'awakenTheCore') {
      setSelectedQuestLine('awakenTheCore');
    } else if (!hasPrestiged && (selectedQuestLine === 'awakenTheCore' || selectedQuestLine === 'prestige2')) {
      setSelectedQuestLine('progression');
    }
  }, [hasPrestiged, selectedQuestLine]);

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
        <div className="quest-progress-summary">
          <h3>{questProgress.header}</h3>
          <div className="progress-bar-container">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${questProgress.percentage}%` }}
              />
            </div>
            <span>{questProgress.completed}/{questProgress.total} Completed</span>
          </div>
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
          {hasPrestiged && localStorage.getItem('prestige2Active') !== 'true' && (
            <button
              className={`quest-tab ${selectedQuestLine === 'awakenTheCore' ? 'active' : ''}`}
              onClick={() => setSelectedQuestLine('awakenTheCore')}
            >
              Awaken the Core
            </button>
          )}
          {localStorage.getItem('prestige2Active') === 'true' && (
            <button
              className={`quest-tab ${selectedQuestLine === 'prestige2' ? 'active' : ''}`}
              onClick={() => setSelectedQuestLine('prestige2')}
            >
              Beyond Ascension
            </button>
          )}
        </div>
        <div className="quest-list">
          {availableQuests.length > 0 ? (
            <div className="quest-category">
              <h3>🎯 Active Quests</h3>
              {availableQuests.map(quest => (
                <div key={quest.id} className="quest-item active">
                  <div className="quest-header">
                    <h4>{quest.name}</h4>
                  </div>
                  <p className="quest-description">{quest.description}</p>
                  <div className="quest-requirements">
                    <strong>Requirements:</strong>
                    <ul>
                      {Object.entries(quest.requirements).map(([req, value]) => (
                        <li key={req}>
                          {req === 'junk' && `${value.toLocaleString()} Junk`}
                          {req === 'tronics' && `${value.toLocaleString()} Tronics`}
                          {req === 'electroShards' && `${value.toLocaleString()} Electro Shards`}
                          {req === 'scratz' && `${value.toLocaleString()} Scratz`}
                          {req === 'prestigeCount' && `Prestige ${value}`}
                          {req === 'ownedItems' && Object.entries(value).map(([item, count]) => 
                            `${count}x ${item}`
                          ).join(', ')}
                          {req === 'craftingInventory' && Object.entries(value).map(([item, count]) => 
                            `${count}x ${item}`
                          ).join(', ')}
                          {req === 'skillLevel' && `Skill Level ${value}`}
                          {req === 'purchaseAnyUpgrade' && 'Purchase any upgrade'}
                          {req === 'techUnlocked' && `Unlock ${value} technologies`}
                          {req === 'craftItem' && `Craft ${value}`}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="quest-rewards">
                    <strong>Rewards:</strong>
                    <ul>
                      {quest.rewards.junk && <li>💰 {quest.rewards.junk.toLocaleString()} Junk</li>}
                      {quest.rewards.tronics && <li>⚡ {quest.rewards.tronics.toLocaleString()} Tronics</li>}
                      {quest.rewards.electroShards && <li>💎 {quest.rewards.electroShards.toLocaleString()} Electro Shards</li>}
                      {quest.rewards.scratz && <li>🪙 {quest.rewards.scratz.toLocaleString()} Scratz</li>}
                      {quest.rewards.craftingInventory && Object.entries(quest.rewards.craftingInventory).map(([item, count]) => (
                        <li key={item}>🔧 {count}x {item}</li>
                      ))}
                      {quest.rewards.prestige && <li>🔮 Enables Prestige</li>}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-quests">
              <h3>✅ All Available Quests Completed!</h3>
              <p>Continue progressing to unlock new challenges.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuestLog;