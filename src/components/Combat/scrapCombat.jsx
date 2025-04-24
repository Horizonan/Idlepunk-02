import React, { useState, useEffect } from 'react';
import './scrapCombat.css'

export default function ScraptagonCombat({ playerStats, equipment, onCombatEnd, onClose }) {
  const [combatState, setCombatState] = useState({
    inProgress: false,
    playerHealth: playerStats?.maxHealth || 100,
    enemyHealth: 150,
    combatLog: [],
    victory: false,
    statusEffects: []
  });

  const enemy = {
    name: "CYBER-SCRAPPER MK.III",
    maxHealth: 150,
    damage: 5,
    attackSpeed: 1000, // 1 attack per second
    defense: 10
  };

  const startCombat = () => {
    setCombatState({
      inProgress: true,
      playerHealth: playerStats.maxHealth,
      enemyHealth: enemy.maxHealth,
      combatLog: ["Combat started!"],
      victory: false
    });
  };

  useEffect(() => {
    if (combatState.inProgress) {
      const playerInterval = setInterval(() => {
        setCombatState(prev => {
          const damage = playerStats.attack * (1 - enemy.defense / 100);
          const newEnemyHealth = Math.max(0, prev.enemyHealth - damage);

          return {
            ...prev,
            enemyHealth: newEnemyHealth,
            combatLog: [...prev.combatLog, `Player deals ${damage.toFixed(1)} damage!`]
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
      setCombatState(prev => ({
        ...prev,
        inProgress: false,
        victory: false,
        combatLog: [...prev.combatLog, "Defeat! You have been defeated."]
      }));
      onCombatEnd(false);
    } else if (combatState.enemyHealth <= 0) {
      setCombatState(prev => ({
        ...prev,
        inProgress: false,
        victory: true,
        combatLog: [...prev.combatLog, "Victory! Enemy defeated!"]
      }));
      onCombatEnd(true);
    }
  }, [combatState.playerHealth, combatState.enemyHealth]);

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
          <div className="player-sprite"></div>
          <div className={`enemy-sprite ${combatState.inProgress ? 'animated' : ''}`}></div>
        </div>

        <div className="combat-log">
          {combatState.combatLog.slice(-5).map((log, index) => (
            <div key={index} className="log-entry">
              {log.includes('CRITICAL') || log.includes('SYSTEM') ? (
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
    </div>
  );
}