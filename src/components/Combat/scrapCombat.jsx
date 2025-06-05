import React, { useState, useEffect } from 'react';
import './scrapCombat.css'

export default function ScraptagonCombat({ playerStats, equipment, onCombatEnd, onClose }) {
  const [selectedStage, setSelectedStage] = useState(null);
  const [winStreak, setWinStreak] = useState(() => {
    return parseInt(localStorage.getItem('trainingWinStreak') || '0');
  });
  const [combatState, setCombatState] = useState({
    inProgress: false,
    playerHealth: playerStats?.maxHealth || 100,
    enemyHealth: 150,
    combatLog: [],
    victory: false,
    statusEffects: [],
    playerAttacking: false,
    criticalHit: false
  });

  const triggerPlayerAttack = (isCritical = false) => {
    setCombatState(prev => ({ ...prev, playerAttacking: true, criticalHit: isCritical }));
    setTimeout(() => {
      setCombatState(prev => ({ ...prev, playerAttacking: false, criticalHit: false }));
    }, isCritical ? 700 : 500);
  };

  const stages = {
    training: {
      name: "Training Dummy",
      description: "Practice your combat skills against a basic training dummy",
      unlocked: true,
      enemy: {
        name: "TRAINING DUMMY v1.0",
        maxHealth: 75,
        damage: 2,
        attackSpeed: 1500, // slower attacks
        defense: 5
      },
      rewards: {
        junk: 100,
        credits: 5
      }
    },
    scrapper: {
      name: "Cyber Scrapper",
      description: "Battle against a dangerous cyber-enhanced scrapper",
      unlocked: winStreak >= 15,
      unlockRequirement: "Defeat 15 Training Dummies in a row",
      enemy: {
        name: "CYBER-SCRAPPER MK.III",
        maxHealth: 150,
        damage: 5,
        attackSpeed: 1000,
        defense: 10
      },
      rewards: {
        junk: 500,
        credits: 25
      }
    }
  };

  const currentStage = selectedStage ? stages[selectedStage] : null;
  const enemy = currentStage?.enemy || stages.training.enemy;

  const startCombat = () => {
    if (!selectedStage) return;
    
    setCombatState({
      inProgress: true,
      playerHealth: playerStats.maxHealth,
      enemyHealth: enemy.maxHealth,
      combatLog: [`Combat started against ${enemy.name}!`],
      victory: false,
      statusEffects: [],
      playerAttacking: false,
      criticalHit: false
    });
  };

  useEffect(() => {
    if (combatState.inProgress) {
      const playerInterval = setInterval(() => {
        setCombatState(prev => {
          const isCritical = Math.random() < 0.2;
          const damage = playerStats.attack * (1 - enemy.defense / 100) * (isCritical ? 1.5 : 1);
          const newEnemyHealth = Math.max(0, prev.enemyHealth - damage);
          
          triggerPlayerAttack(isCritical);

          return {
            ...prev,
            enemyHealth: newEnemyHealth,
            combatLog: [...prev.combatLog, 
              isCritical 
                ? `CRITICAL HIT! Player deals ${damage.toFixed(1)} damage!` 
                : `Player deals ${damage.toFixed(1)} damage!`
            ]
          };
        });
      }, 1000 / playerStats.attackSpeed);

      const enemyInterval = setInterval(() => {
        setCombatState(prev => {
          const damage = enemy.damage * (1 - playerStats.defense / 100);
          const newPlayerHealth = Math.max(0, prev.playerHealth - damage);

          return {
            ...prev,
            playerHealth: newPlayerHealth,
            combatLog: [...prev.combatLog, `Enemy deals ${damage.toFixed(1)} damage!`]
          };
        });
      }, enemy.attackSpeed);

      return () => {
        clearInterval(playerInterval);
        clearInterval(enemyInterval);
      };
    }
  }, [combatState.inProgress]);

  useEffect(() => {
    if (combatState.playerHealth <= 0) {
      // Reset win streak on defeat if in training stage
      if (selectedStage === 'training') {
        setWinStreak(0);
        localStorage.setItem('trainingWinStreak', '0');
      }
      setCombatState(prev => ({
        ...prev,
        inProgress: false,
        victory: false,
        combatLog: [...prev.combatLog, "Defeat! You have been defeated. Training win streak reset!"]
      }));
      onCombatEnd(false);
    } else if (combatState.enemyHealth <= 0 && selectedStage) {
      const rewards = stages[selectedStage].rewards;
      let newWinStreak = winStreak;
      
      // Increment win streak for training stage
      if (selectedStage === 'training') {
        newWinStreak = winStreak + 1;
        setWinStreak(newWinStreak);
        localStorage.setItem('trainingWinStreak', newWinStreak.toString());
      }
      
      const streakMessage = selectedStage === 'training' ? 
        ` Training win streak: ${newWinStreak}/15` : '';
      
      setCombatState(prev => ({
        ...prev,
        inProgress: false,
        victory: true,
        combatLog: [...prev.combatLog, `Victory! Enemy defeated! Earned ${rewards.junk} junk and ${rewards.credits} credits!${streakMessage}`]
      }));
      onCombatEnd(true, rewards);
    }
  }, [combatState.playerHealth, combatState.enemyHealth, selectedStage, winStreak]);

  return (
    <div className="scraptagon-combat">
      <div className="combat-header">
        <h2>SCRAPTAGON COMBAT v2.077</h2>
        <button className="close-combat" onClick={onClose}>Close</button>
      </div>
      <div className="combat-stats">
        <div>PLAYER: [LVL {playerStats?.level || 1}] {playerStats?.name || 'UNKNOWN'}</div>
        <div>COMBAT RATING: {playerStats?.attack || 0} DMG / {playerStats?.defense || 0} DEF</div>
      </div>
      
      {!selectedStage && (
        <div className="stage-selection">
          <h3>SELECT COMBAT STAGE</h3>
          <div className="combat-stats">
            <div>Training Win Streak: {winStreak}/15</div>
          </div>
          <div className="stage-list">
            {Object.entries(stages).map(([stageKey, stage]) => (
              <div 
                key={stageKey} 
                className={`stage-option ${!stage.unlocked ? 'locked' : ''}`} 
                onClick={() => stage.unlocked && setSelectedStage(stageKey)}
              >
                <div className="stage-name">
                  {stage.name} {!stage.unlocked && '🔒'}
                </div>
                <div className="stage-description">{stage.description}</div>
                {!stage.unlocked && stage.unlockRequirement && (
                  <div className="unlock-requirement">Unlock: {stage.unlockRequirement}</div>
                )}
                <div className="stage-enemy">Enemy: {stage.enemy.name} (HP: {stage.enemy.maxHealth})</div>
                <div className="stage-rewards">Rewards: {stage.rewards.junk} Junk, {stage.rewards.credits} Credits</div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {selectedStage && (
        <div className="stage-info">
          <div className="current-stage">
            <span>Current Stage: {stages[selectedStage].name}</span>
            <button className="back-to-stages" onClick={() => setSelectedStage(null)}>Change Stage</button>
          </div>
        </div>
      )}
      {selectedStage && (
        <div className="combat-arena">
          <div className="health-bars">
            <div className="health-bar player">
              <div className="health-fill" style={{ width: `${(combatState.playerHealth / playerStats.maxHealth) * 100}%` }}></div>
              <span className="health-text">{Math.ceil(combatState.playerHealth)} / {playerStats.maxHealth}</span>
            </div>
            <div className="health-bar enemy">
              <div className="health-fill" style={{ width: `${(combatState.enemyHealth / enemy.maxHealth) * 100}%` }}></div>
              <span className="health-text">{Math.ceil(combatState.enemyHealth)} / {enemy.maxHealth}</span>
            </div>
          </div>

          <div className="combat-visuals">
            <div className={`player-sprite ${
              combatState.victory ? 'victory' : 
              combatState.playerAttacking ? 'attacking' :
              combatState.criticalHit ? 'critical' : ''
            }`}></div>
            <div className={`enemy-sprite ${combatState.inProgress ? 'animated' : ''} ${selectedStage === 'training' ? 'training-dummy' : ''}`}></div>
          </div>

          <div className="combat-log">
            {combatState.combatLog.slice(-5).map((log, index) => (
              <div key={index} className="log-entry">
                {log.includes('CRITICAL') || log.includes('SYSTEM') || log.includes('Victory') ? (
                  <span className="status-effect">{log}</span>
                ) : (
                  log
                )}
              </div>
            ))}
          </div>

          {!combatState.inProgress && (
            <button className="start-combat" onClick={startCombat}>
              Start Combat
            </button>
          )}
        </div>
      )}
    </div>
  );
}