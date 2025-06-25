import React, { useState, useEffect } from 'react';
import '../styles/AbilitiesSidebar.css';

export default function AbilitiesSidebar({ craftingInventory, setNotifications }) {
  const [cooldowns, setCooldowns] = useState({});
  const [activeEffects, setActiveEffects] = useState({});
  const [autoGremlinOilActive, setAutoGremlinOilActive] = useState(0);

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
    },
    {
      name: 'Temporal Surge Capsule',
      icon: '⏰',
      abilityKey: 'temporal_surge_capsule_ability',
      condition: () => (craftingInventory['Temporal Surge Capsule'] || 0) > 0,
      cooldownKey: 'temporalSurgeCapsuleLastUsed',
      cooldownDuration: 10 * 60 * 1000 // 10 minutes
    }
  ];

  // Handle ability cooldowns and active effects
  useEffect(() => {
    const intervals = {};

    // Handle cooldowns
    Object.keys(cooldowns).forEach(abilityId => {
      if (cooldowns[abilityId] > 0) {
        intervals[`cooldown_${abilityId}`] = setInterval(() => {
          setCooldowns(prev => ({
            ...prev,
            [abilityId]: Math.max(0, prev[abilityId] - 1000)
          }));
        }, 1000);
      }
    });

    // Handle active effects
    Object.keys(activeEffects).forEach(abilityId => {
      if (activeEffects[abilityId] > 0) {
        intervals[`effect_${abilityId}`] = setInterval(() => {
          setActiveEffects(prev => {
            const newEffects = {
              ...prev,
              [abilityId]: Math.max(0, prev[abilityId] - 1000)
            };

            // Remove localStorage flag when Click Injector effect expires
            if (abilityId === 'click_injector' && newEffects[abilityId] <= 0) {
              localStorage.removeItem('clickInjectorActive');
            }

            return newEffects;
          });
        }, 1000);
      }
    });

    // Check Auto Gremlin Oil status
    const checkAutoGremlinOil = () => {
      const endTime = localStorage.getItem('autoGremlinOilActive');
      if (endTime) {
        const remaining = parseInt(endTime) - Date.now();
        if (remaining > 0) {
          setAutoGremlinOilActive(remaining);
        } else {
          setAutoGremlinOilActive(0);
          localStorage.removeItem('autoGremlinOilActive');
        }
      } else {
        setAutoGremlinOilActive(0);
      }
    };

    // Initial check
    checkAutoGremlinOil();

    // Update Auto Gremlin Oil timer every second
    if (autoGremlinOilActive > 0) {
      intervals['auto_gremlin_oil'] = setInterval(checkAutoGremlinOil, 1000);
    }

    return () => {
      Object.values(intervals).forEach(clearInterval);
    };
  }, [cooldowns, activeEffects, autoGremlinOilActive]);

  // Handle reset ability cooldowns cheat
  useEffect(() => {
    const handleResetCooldowns = () => {
      setCooldowns({});
      setNotifications(prev => [...prev, 'All ability cooldowns reset!']);
    };

    window.addEventListener('resetAbilityCooldowns', handleResetCooldowns);
    return () => window.removeEventListener('resetAbilityCooldowns', handleResetCooldowns);
  }, [setNotifications]);



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
      localStorage.setItem('clickInjectorActive', 'true'); // set local storage

      // Set cooldown
      setCooldowns(prev => ({
        ...prev,
        [ability.id]: ability.cooldown
      }));

      // Set active effect with duration
      setActiveEffects(prev => ({
        ...prev,
        [ability.id]: ability.duration
      }));

      setNotifications(prev => [...prev, 'Click Injector activated! +50% click power for 20 seconds']);
      console.log('Click Injector activated!');
    }
  };

  const formatCooldown = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const formatDuration = (ms) => {
    const seconds = Math.floor(ms / 1000);
    return `${seconds}s`;
  };

  // Only show sidebar if at least one ability is available
  const availableAbilities = abilities.filter(ability => ability.available);

  // Active Click Injector Effect Display
  const clickInjectorActive = localStorage.getItem('clickInjectorActive') === 'true';
  const clickInjectorDisplay = clickInjectorActive && (
    <div className="click-injector-active-display">
      <div className="click-injector-icon">💉</div>
      <div className="click-injector-info">
        <div className="click-injector-title">Click Injector Active</div>
        <div className="click-injector-effect">+50% Click Power</div>
      </div>
    </div>
  );

  // Auto Gremlin Oil active display
  const autoGremlinOilDisplay = autoGremlinOilActive > 0 && (
    <div className="auto-gremlin-oil-active-display">
      <div className="auto-gremlin-oil-icon">🛢️</div>
      <div className="auto-gremlin-oil-info">
        <div className="auto-gremlin-oil-title">Auto Gremlin Oil Active</div>
        <div className="auto-gremlin-oil-effect">+50% Auto Click Rate</div>
        <div className="auto-gremlin-oil-timer">{formatDuration(autoGremlinOilActive)}</div>
      </div>
      <div className="auto-gremlin-oil-progress">
        <div 
          className="auto-gremlin-oil-progress-bar"
          style={{
            width: `${(autoGremlinOilActive / 60000) * 100}%`
          }}
        ></div>
      </div>
    </div>
  );

  // Temporal Surge Capsule active display
  const temporalSurgeCapsuleEndTime = parseInt(localStorage.getItem('temporalSurgeCapsuleActive') || '0');
  const isTemporalSurgeCapsuleActive = temporalSurgeCapsuleEndTime > Date.now();
  const temporalSurgeCapsuleTimeLeft = Math.max(0, Math.ceil((temporalSurgeCapsuleEndTime - Date.now()) / 1000));

  const temporalSurgeCapsuleDisplay = isTemporalSurgeCapsuleActive && (
    <div className="temporal-surge-capsule-active-display">
      <div className="temporal-surge-capsule-icon">⏰</div>
      <div className="temporal-surge-capsule-info">
        <div className="temporal-surge-capsule-title">Temporal Surge Active</div>
        <div className="temporal-surge-capsule-effect">+100% Click Power & Junk/sec</div>
        <div className="temporal-surge-capsule-timer">{temporalSurgeCapsuleTimeLeft}s</div>
      </div>
      <div className="temporal-surge-capsule-progress">
        <div 
          className="temporal-surge-capsule-progress-bar"
          style={{ width: `${(temporalSurgeCapsuleTimeLeft / 30) * 100}%` }}
        />
      </div>
    </div>
  );

  return (
    <>
      {clickInjectorDisplay}
      {autoGremlinOilDisplay}
      {temporalSurgeCapsuleDisplay}
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
    </>
  );
}