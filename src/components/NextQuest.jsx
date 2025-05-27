
import React, { useState, useEffect } from 'react';

export default function NextQuest() {
  const [nextQuest, setNextQuest] = useState(null);
  const [questStates, setQuestStates] = useState({});
  const hasPrestiged = localStorage.getItem('hasPrestiged') === 'true';

  const questLines = {
    progression: [
      { id: 1, title: "First Steps", task: "Click on the junk pile to collect some scrap", category: "tutorial", difficulty: "easy" },
      { id: 2, title: "Shopping Time", task: "Visit the store and buy your first upgrade", category: "tutorial", difficulty: "easy" },
      { id: 3, title: "Tool Master", task: "Keep collecting and upgrading your tools", reward: "1x Electro Shard", category: "progression", difficulty: "easy" },
      { id: 4, title: "Passive Income", task: "Purchase something that generates passive income", category: "progression", difficulty: "medium" },
      { id: 5, title: "Begin Crafting", task: "Start crafting items from your collected junk", category: "progression", difficulty: "medium" },
      { id: 6, title: "Surge Rider", task: "Take advantage of the surge to collect extra junk", reward: "1x Electro Shard", category: "advanced", difficulty: "medium" },
      { id: 7, title: "Automation Punk", task: "Tired of clicking? Buy 10 Autoclickers!", reward: "+1 Permanent Autoclick", category: "advanced", difficulty: "hard" },
      { id: 8, title: "Unlock Ascension Protocol", task: "Reach 1 million junk to unlock the path to prestige", reward: "Unlocks the Ascension Protocol Questline", category: "milestone", difficulty: "hard" },
      { id: 9, title: "Gambling Addiction", task: "Buy the Big Slot Machine", reward: "Become a gambler", category: "side", difficulty: "medium" }
    ],
    ascension: [ 
      { id: 7, title: "Surge Overflow", task: "Trigger 3 Trash Surges", reward: "1x Stabilized Capacitor", category: "challenge", difficulty: "medium" },
      { id: 8, title: "The Circuit Speaks", task: "Collect 4 Electro Shards", reward: "1x Voltage Node", category: "collection", difficulty: "medium" },
      { id: 9, title: "Whispers in the Scrap", task: "Collect 10 Lore Logs or reach 12.5M Junk", reward: "1x Synthcore Fragment", category: "collection", difficulty: "hard" },
      { id: 10, title: "Forge the Future", task: "Craft the Prestige Crystal", reward: "Unlocks Ascension", category: "milestone", difficulty: "epic" }
    ],
    awakenTheCore: [
      { id: 1, title: "System Memory Detected", task: "Reach 25M Junk (post-prestige)", reward: "Encrypted Coil", category: "milestone", difficulty: "hard" },
      { id: 2, title: "Tap the Pulse", task: "Click the Tronics Clicker 5000 times", reward: "+5 Auto clicks", category: "challenge", difficulty: "medium" },
      { id: 3, title: "Upgrade Cascade", task: "Purchase 10 ElectroShop Upgrades", reward: "Surge Capacitor Fragment", category: "progression", difficulty: "hard" },
      { id: 4, title: "Beacon Protocol", task: "Own 10 Electro Shard Beacons", reward: "Unlocks crafting recipe for Overcharged Prestige Crystal", category: "collection", difficulty: "epic" },
      { id: 5, title: "Forge the Overcrystal", task: "Craft the Overcharged Prestige Crystal", reward: "Unlocks Second Prestige", category: "milestone", difficulty: "legendary" }
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

  useEffect(() => {
    const updateQuestStates = () => {
      const newQuestStates = {};
      let currentQuestLine = 'progression';
      
      // Determine which quest line to use
      if (hasPrestiged) {
        currentQuestLine = 'awakenTheCore';
      } else if (localStorage.getItem('cogfatherEvent') === 'true') {
        currentQuestLine = 'ascension';
      }
      
      const quests = questLines[currentQuestLine] || [];
      
      // Get quest completion states
      quests.forEach(quest => {
        newQuestStates[quest.title] = localStorage.getItem(`quest_sync_${quest.title}`) === 'true';
      });
      
      setQuestStates(newQuestStates);
      
      // Find the first incomplete quest
      const incompleteQuest = quests.find(quest => !newQuestStates[quest.title]);
      setNextQuest(incompleteQuest || null);
    };

    updateQuestStates();
    
    // Listen for quest updates
    const interval = setInterval(updateQuestStates, 1000);
    window.addEventListener('storage', updateQuestStates);
    window.addEventListener('questUpdate', updateQuestStates);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', updateQuestStates);
      window.removeEventListener('questUpdate', updateQuestStates);
    };
  }, [hasPrestiged]);

  if (!nextQuest) {
    return (
      <div className="next-quest-container">
        <div className="next-quest-content completed">
          <span className="quest-icon">🎉</span>
          <div className="quest-info">
            <div className="quest-title">All Quests Complete!</div>
            <div className="quest-task">You've finished all available quests</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="next-quest-container">
      <div className="next-quest-content">
        <span className="quest-icon">{getCategoryIcon(nextQuest.category)}</span>
        <div className="quest-info">
          <div className="quest-title">
            {nextQuest.title}
            <span 
              className="quest-difficulty" 
              style={{ color: getDifficultyColor(nextQuest.difficulty) }}
            >
              {nextQuest.difficulty}
            </span>
          </div>
          <div className="quest-task">{nextQuest.task}</div>
          {nextQuest.reward && (
            <div className="quest-reward">🎁 {nextQuest.reward}</div>
          )}
        </div>
      </div>
    </div>
  );
}
