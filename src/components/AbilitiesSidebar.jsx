import React, { useState, useEffect } from 'react';
import '../styles/AbilitiesSidebar.css';

export default function AbilitiesSidebar({ craftingInventory }) {
  const [cooldowns, setCooldowns] = useState({});

  // Check if abilities are unlocked based on crafted items
  const isTrashSurgeUnlocked = () => {
    return (craftingInventory['Reactor Grease'] || 0) > 0;
  };

  const isClickInjectorUnlocked = () => {
    return (craftingInventory['Click Injector'] || 0) > 0;
  };

  const abilities = [
    {
      id: 'trash_surge',
      name: 'Trash Surge',
      icon: '⚡',
      description: 'Activate a 30-second Trash Surge (900s cooldown)',
      available: isTrashSurgeUnlocked(),
      cooldown: 900000, // 900 seconds in milliseconds
      duration: 30000   // 30 seconds in milliseconds
    },
    {
      id: 'click_injector',
      name: 'Click Injector',
      icon: '💉',
      description: '+50% Click Power for 20 seconds (600s cooldown)',
      available: isClickInjectorUnlocked(),
      cooldown: 600000, // 600 seconds in milliseconds
      duration: 20000   // 20 seconds in milliseconds
    }
  ];

  // Handle ability cooldowns
  useEffect(() => {
    const intervals = {};

    Object.keys(cooldowns).forEach(abilityId => {
      if (cooldowns[abilityId] > 0) {
        intervals[abilityId] = setInterval(() => {
          setCooldowns(prev => ({
            ...prev,
            [abilityId]: Math.max(0, prev[abilityId] - 1000)
          }));
        }, 1000);
      }
    });

    return () => {
      Object.values(intervals).forEach(interval => clearInterval(interval));
    };
  }, [cooldowns]);

  const handleAbilityClick = (ability) => {
    if (!ability.available || cooldowns[ability.id] > 0) return;

    if (ability.id === 'trash_surge') {
      // Trigger trash surge
      window.dispatchEvent(new Event('triggerSurge'));

      // Set cooldown
      setCooldowns(prev => ({
        ...prev,
        [ability.id]: ability.cooldown
      }));

      console.log('Trash Surge activated!');
    }

    if (ability.id === 'click_injector') {
      // Trigger click injector effect
      window.dispatchEvent(new CustomEvent('triggerClickInjector', {
        detail: { duration: ability.duration }
      }));

      // Set cooldown
      setCooldowns(prev => ({
        ...prev,
        [ability.id]: ability.cooldown
      }));

      console.log('Click Injector activated!');
    }
  };

  const formatCooldown = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Only show sidebar if at least one ability is available
  const availableAbilities = abilities.filter(ability => ability.available);
  if (availableAbilities.length === 0) {
    return null;
  }

  return (
    <div className="abilities-sidebar">
      <div className="abilities-header">
        <h3>Abilities</h3>
      </div>

      <div className="abilities-list">
        {availableAbilities.map((ability) => {
          const onCooldown = cooldowns[ability.id] > 0;
          return (
            <div
              key={ability.id}
              className={`ability-item ${onCooldown ? 'on-cooldown' : ''}`}
              onClick={() => handleAbilityClick(ability)}
              title={onCooldown ? `Cooldown: ${formatCooldown(cooldowns[ability.id])}` : ability.description}
            >
              <div className="ability-icon">{ability.icon}</div>
              <div className="ability-name">{ability.name}</div>
              {onCooldown && (
                <div className="cooldown-timer">
                  {formatCooldown(cooldowns[ability.id])}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}