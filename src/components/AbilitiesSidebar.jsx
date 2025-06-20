
import React, { useState, useEffect } from 'react';
import '../styles/AbilitiesSidebar.css';

export default function AbilitiesSidebar({ craftingInventory, setNotifications }) {
  const [cooldowns, setCooldowns] = useState({});

  // Define abilities based on crafted items
  const abilities = [
    {
      id: 'surge_overcharge',
      name: 'Surge Overcharge',
      icon: '⚡',
      description: 'Double all income for 30 seconds',
      cooldown: 300,
      requiredItem: 'Surge Capacitor Module',
      effect: () => {
        // Implement surge overcharge effect
        setNotifications(prev => [...prev, "⚡ Surge Overcharge activated! Double income for 30s!"]);
      }
    },
    {
      id: 'scrap_burst',
      name: 'Scrap Burst',
      icon: '💥',
      description: 'Instantly gain 10x current passive income',
      cooldown: 180,
      requiredItem: 'Compression Pack',
      effect: () => {
        // Implement scrap burst effect
        setNotifications(prev => [...prev, "💥 Scrap Burst activated!"]);
      }
    },
    {
      id: 'auto_salvage',
      name: 'Auto Salvage',
      icon: '🔧',
      description: 'Automatically collect materials for 60 seconds',
      cooldown: 240,
      requiredItem: 'Auto Toolkit',
      effect: () => {
        // Implement auto salvage effect
        setNotifications(prev => [...prev, "🔧 Auto Salvage activated!"]);
      }
    },
    {
      id: 'echo_pulse',
      name: 'Echo Pulse',
      icon: '📡',
      description: 'Reveal hidden opportunities for 45 seconds',
      cooldown: 200,
      requiredItem: 'Echo Helmets',
      effect: () => {
        // Implement echo pulse effect
        setNotifications(prev => [...prev, "📡 Echo Pulse activated!"]);
      }
    }
  ];

  // Filter abilities based on owned items
  const availableAbilities = abilities.filter(ability => 
    craftingInventory[ability.requiredItem] > 0
  );

  const handleAbilityClick = (ability) => {
    const cooldownKey = ability.id;
    const currentTime = Date.now();
    const lastUsed = cooldowns[cooldownKey] || 0;
    const timeSinceLastUse = (currentTime - lastUsed) / 1000;

    if (timeSinceLastUse >= ability.cooldown) {
      // Activate the ability
      ability.effect();
      
      // Set cooldown
      setCooldowns(prev => ({
        ...prev,
        [cooldownKey]: currentTime
      }));
    } else {
      const timeRemaining = Math.ceil(ability.cooldown - timeSinceLastUse);
      setNotifications(prev => [...prev, `⏱️ ${ability.name} on cooldown for ${timeRemaining}s`]);
    }
  };

  const isOnCooldown = (ability) => {
    const cooldownKey = ability.id;
    const currentTime = Date.now();
    const lastUsed = cooldowns[cooldownKey] || 0;
    const timeSinceLastUse = (currentTime - lastUsed) / 1000;
    return timeSinceLastUse < ability.cooldown;
  };

  const getCooldownTime = (ability) => {
    const cooldownKey = ability.id;
    const currentTime = Date.now();
    const lastUsed = cooldowns[cooldownKey] || 0;
    const timeSinceLastUse = (currentTime - lastUsed) / 1000;
    return Math.ceil(ability.cooldown - timeSinceLastUse);
  };

  // Don't render if no abilities are available
  if (availableAbilities.length === 0) {
    return null;
  }

  return (
    <div className="abilities-sidebar">
      <div className="abilities-header">
        <h3>Abilities</h3>
      </div>
      <div className="abilities-list">
        {availableAbilities.map((ability) => (
          <div
            key={ability.id}
            className={`ability-icon ${isOnCooldown(ability) ? 'on-cooldown' : ''}`}
            onClick={() => handleAbilityClick(ability)}
            title={`${ability.name}: ${ability.description}${isOnCooldown(ability) ? ` (${getCooldownTime(ability)}s)` : ''}`}
          >
            <div className="ability-icon-symbol">
              {ability.icon}
            </div>
            {isOnCooldown(ability) && (
              <div className="ability-cooldown-overlay">
                <span className="ability-cooldown-timer">{getCooldownTime(ability)}</span>
              </div>
            )}
            <div className="ability-name">{ability.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
