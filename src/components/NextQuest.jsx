
import React, { useState, useEffect } from 'react';

export default function NextQuest() {
  const [nextQuest, setNextQuest] = useState(null);
  const [questStates, setQuestStates] = useState({});
  const [prestige2Active, setPrestige2Active] = useState(localStorage.getItem('prestige2Active') === 'true');
  const hasPrestiged = localStorage.getItem('hasPrestiged') === 'true';

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

  useEffect(() => {
    const updateQuestStates = () => {
      const newQuestStates = {};
      let currentQuestLine = 'prestige0';
      
      // Determine which quest line to use based on prestige count
      const prestigeCount = parseInt(localStorage.getItem('prestigeCount') || '0');
      
      if (prestigeCount >= 4) {
        currentQuestLine = 'prestige4';
      } else if (prestigeCount === 3) {
        currentQuestLine = 'prestige3';
      } else if (prestigeCount === 2) {
        currentQuestLine = 'prestige2';
      } else if (prestigeCount === 1) {
        currentQuestLine = 'prestige1';
      } else {
        currentQuestLine = 'prestige0';
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
  }, [hasPrestiged, prestige2Active]);

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
        </div>
      </div>
    </div>
  );
}
