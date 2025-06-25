import React, { useState, useEffect } from 'react';
import '../styles/AbilitiesSidebar.css';

// Temporal Surge Capsule Active Display Component
function TemporalSurgeActiveDisplay() {
  const [timeLeft, setTimeLeft] = useState(30);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, Math.ceil((30000 - elapsed) / 1000));
      setTimeLeft(remaining);

      if (remaining === 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  const progressPercentage = (timeLeft / 30) * 100;

  return (
    <div className="temporal-surge-active-display">
      <div className="temporal-surge-icon">⏰</div>
      <div className="temporal-surge-info">
        <div className="temporal-surge-title">Temporal Surge Active</div>
        <div className="temporal-surge-effect">+100% Click Power & Junk/sec</div>
        <div className="temporal-surge-timer">{timeLeft}s</div>
      </div>
      <div className="temporal-surge-progress">
        <div 
          className="temporal-surge-progress-bar" 
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
}

// Auto Gremlin Oil Active Display Component
function AutoGremlinOilActiveDisplay() {
  const [timeLeft, setTimeLeft] = useState(60);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, Math.ceil((60000 - elapsed) / 1000));
      setTimeLeft(remaining);

      if (remaining === 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  const progressPercentage = (timeLeft / 60) * 100;

  return (
    <div className="auto-gremlin-oil-active-display">
      <div className="auto-gremlin-oil-icon">🛢️</div>
      <div className="auto-gremlin-oil-info">
        <div className="auto-gremlin-oil-title">Auto Gremlin Oil Active</div>
        <div className="auto-gremlin-oil-effect">+50% Auto Click Rate</div>
        <div className="auto-gremlin-oil-timer">{timeLeft}s</div>
      </div>
      <div className="auto-gremlin-oil-progress">
        <div 
          className="auto-gremlin-oil-progress-bar"
          style={{
            width: `${progressPercentage}%`
          }}
        ></div>
      </div>
    </div>
  );
}

export default function AbilitiesSidebar({ 
  craftingInventory, 
  setClickMultiplier, 
  setAutoClicks,
  setIsClickInjectorActive,
  setIsAutoGremlinOilActive,
  setIsTemporalSurgeActive,
  isClickInjectorActive,
  isAutoGremlinOilActive,
  isTemporalSurgeActive
}) {
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

  const isAutoGremlinOilUnlocked = () => {
    return (craftingInventory['Auto Gremlin Oil'] || 0) > 0;
  };

    const isTemporalSurgeCapsuleUnlocked = () => {
    return (craftingInventory['Temporal Surge Capsule'] || 0) > 0;
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
      id: 'auto_gremlin_oil',
      name: 'Auto Gremlin Oil',
      icon: '🛢️',
      description: '+50% Auto Click Rate for 60 seconds (600s cooldown)',
      available: isAutoGremlinOilUnlocked(),
      cooldown: 600000, // 10 minutes
      duration: 60000,  // 60 seconds
      unlockItem: 'Auto Gremlin Oil'
    },
    {
      id: 'temporal_surge_capsule',
      name: 'Temporal Surge Capsule',
      icon: '⏰',
      description: '+100% Click Power and +100% Junk/sec for 30 seconds (600s cooldown)',
      available: isTemporalSurgeCapsuleUnlocked(),
      cooldown: 600000, // 10 minutes
      duration: 30000,  // 30 seconds
      unlockItem: 'Temporal Surge Capsule'
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

    if (ability.id === 'auto_gremlin_oil') {
      // Trigger auto gremlin oil effect
      localStorage.setItem('autoGremlinOilActive', Date.now() + ability.duration);

      // Set cooldown
      setCooldowns(prev => ({
        ...prev,
        [ability.id]: ability.cooldown
      }));
      setNotifications(prev => [...prev, 'Auto Gremlin Oil activated! +50% auto click rate for 60 seconds']);

      console.log('Auto Gremlin Oil activated!');
    }

        if (ability.id === 'temporal_surge_capsule') {
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

      setNotifications(prev => [...prev, 'Temporal Surge Capsule activated! +100% click power and junk/sec for 30 seconds']);
      console.log('Temporal Surge Capsule activated!');
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

  return (
    <>
      {/* Active Click Injector Effect Display */}
      {activeEffects['click_injector'] > 0 && (
        <div className="click-injector-active-display">
          <div className="click-injector-icon">💉</div>
          <div className="click-injector-info">
            <div className="click-injector-title">Click Injector Active</div>
            <div className="click-injector-effect">+50% Click Power</div>
            <div className="click-injector-timer">{formatDuration(activeEffects['click_injector'])}</div>
          </div>
          <div className="click-injector-progress">
            <div 
              className="click-injector-progress-bar"
              style={{
                width: `${(activeEffects['click_injector'] / 20000) * 100}%`
              }}
            ></div>
          </div>
        </div>
      )}

      {/* Active Auto Gremlin Oil Effect Display */}
      {autoGremlinOilActive > 0 && (
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
      )}

            {/* Temporal Surge Capsule Active Display */}
      {isTemporalSurgeActive && (
        <TemporalSurgeActiveDisplay />
      )}

      {availableAbilities.length > 0 && (
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
      )}
    </>
  );
}