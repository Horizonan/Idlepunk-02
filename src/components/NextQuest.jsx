
import React, { useState, useEffect } from 'react';

export default function NextQuest() {
  const [nextQuest, setNextQuest] = useState(null);
  const [questStates, setQuestStates] = useState({});

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

  useEffect(() => {
    const updateQuestStates = () => {
      const prestigeCount = parseInt(localStorage.getItem('prestigeCount') || '0');
      const currentQuestLine = `prestige${Math.min(prestigeCount, 4)}`;
      
      const newQuestStates = {};
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
  }, []);

  if (!nextQuest) {
    return (
      <div className="next-quest-container">
        <div className="next-quest-content completed">
          <span className="quest-icon">🎉</span>
          <div className="quest-info">
            <div className="quest-title">Prestige Tier Complete!</div>
            <div className="quest-task">Ready for the next prestige level</div>
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
