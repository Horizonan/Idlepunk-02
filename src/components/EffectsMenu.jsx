
import React, { useState } from 'react';
import '../styles/EffectsMenu.css';

export default function EffectsMenu({ onClose, setNotifications }) {
  const [selectedCategory, setSelectedCategory] = useState('visual');

  const effectsCategories = {
    visual: {
      name: 'Visual Effects',
      icon: '✨',
      items: [
        {
          id: 'sparkle_burst',
          name: 'Sparkle Burst',
          image: '/Icons/cyberpunk.png',
          description: 'Creates a burst of sparkles across the screen',
          cooldown: 10,
          effect: () => {
            setNotifications(prev => [...prev, "✨ Sparkles burst across the screen!"]);
          }
        },
        {
          id: 'neon_pulse',
          name: 'Neon Pulse',
          image: '/Icons/electroClicker/electricIcon.svg',
          description: 'Sends a neon pulse through all UI elements',
          cooldown: 15,
          effect: () => {
            setNotifications(prev => [...prev, "⚡ Neon pulse activated!"]);
          }
        },
        {
          id: 'hologram_flicker',
          name: 'Hologram Flicker',
          image: '/Icons/Upgrades/hover-drone.svg',
          description: 'Makes the interface flicker like a hologram',
          cooldown: 20,
          effect: () => {
            setNotifications(prev => [...prev, "📡 Holographic interference detected!"]);
          }
        }
      ]
    },
    audio: {
      name: 'Audio Effects',
      icon: '🔊',
      items: [
        {
          id: 'cyber_beep',
          name: 'Cyber Beep',
          image: '/Icons/crafting/encryptedCoil.png',
          description: 'Plays futuristic beeping sounds',
          cooldown: 5,
          effect: () => {
            setNotifications(prev => [...prev, "🔊 *BEEP BOOP*"]);
          }
        },
        {
          id: 'static_burst',
          name: 'Static Burst',
          image: '/Icons/crafting/signalMesh.png',
          description: 'Brief static noise overlay',
          cooldown: 12,
          effect: () => {
            setNotifications(prev => [...prev, "📻 Static interference!"]);
          }
        }
      ]
    },
    environmental: {
      name: 'Environment',
      icon: '🌆',
      items: [
        {
          id: 'rain_effect',
          name: 'Acid Rain',
          image: '/Icons/crafting/capacitor.png',
          description: 'Simulates acid rain falling on the interface',
          cooldown: 30,
          effect: () => {
            setNotifications(prev => [...prev, "🌧️ Acid rain begins to fall..."]);
          }
        },
        {
          id: 'fog_overlay',
          name: 'Cyber Fog',
          image: '/Icons/crafting/chronoRegulator.png',
          description: 'Adds a mysterious fog overlay',
          cooldown: 25,
          effect: () => {
            setNotifications(prev => [...prev, "🌫️ Cyber fog rolls in..."]);
          }
        }
      ]
    }
  };

  const [cooldowns, setCooldowns] = useState({});

  const handleEffectClick = (item) => {
    const cooldownKey = item.id;
    const currentTime = Date.now();
    const lastUsed = cooldowns[cooldownKey] || 0;
    const timeSinceLastUse = (currentTime - lastUsed) / 1000;

    if (timeSinceLastUse >= item.cooldown) {
      // Activate the effect
      item.effect();
      
      // Set cooldown
      setCooldowns(prev => ({
        ...prev,
        [cooldownKey]: currentTime
      }));
    } else {
      const timeRemaining = Math.ceil(item.cooldown - timeSinceLastUse);
      setNotifications(prev => [...prev, `⏱️ ${item.name} on cooldown for ${timeRemaining}s`]);
    }
  };

  const isOnCooldown = (item) => {
    const cooldownKey = item.id;
    const currentTime = Date.now();
    const lastUsed = cooldowns[cooldownKey] || 0;
    const timeSinceLastUse = (currentTime - lastUsed) / 1000;
    return timeSinceLastUse < item.cooldown;
  };

  const getCooldownTime = (item) => {
    const cooldownKey = item.id;
    const currentTime = Date.now();
    const lastUsed = cooldowns[cooldownKey] || 0;
    const timeSinceLastUse = (currentTime - lastUsed) / 1000;
    return Math.ceil(item.cooldown - timeSinceLastUse);
  };

  return (
    <div className="effects-menu-container">
      <div className="effects-menu-header">
        <h2>Effects Panel</h2>
        <button onClick={onClose} className="effects-menu-close">Close</button>
      </div>

      <div className="effects-menu-tabs">
        {Object.entries(effectsCategories).map(([key, category]) => (
          <button
            key={key}
            className={`effects-tab ${selectedCategory === key ? 'active' : ''}`}
            onClick={() => setSelectedCategory(key)}
          >
            <span className="tab-icon">{category.icon}</span>
            <span className="tab-name">{category.name}</span>
          </button>
        ))}
      </div>

      <div className="effects-menu-content">
        <div className="effects-grid">
          {effectsCategories[selectedCategory].items.map((item) => (
            <div
              key={item.id}
              className={`effect-item ${isOnCooldown(item) ? 'on-cooldown' : ''}`}
              onClick={() => handleEffectClick(item)}
            >
              <div className="effect-image">
                <img src={item.image} alt={item.name} />
                {isOnCooldown(item) && (
                  <div className="cooldown-overlay">
                    <span className="cooldown-timer">{getCooldownTime(item)}s</span>
                  </div>
                )}
              </div>
              <div className="effect-info">
                <h4 className="effect-name">{item.name}</h4>
                <p className="effect-description">{item.description}</p>
                <div className="effect-cooldown">
                  Cooldown: {item.cooldown}s
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="effects-menu-footer">
        <p className="effects-hint">Click on effects to activate them! Each effect has a cooldown period.</p>
      </div>
    </div>
  );
}
