

import React, { useState } from 'react';
import '../styles/JunkUpgrades.css';

export default function JunkUpgrades({ onClose }) {
  const [mobileInfoModal, setMobileInfoModal] = useState(null);
  const junk = parseInt(localStorage.getItem('junk') || '0');
  const credits = parseInt(localStorage.getItem('credits') || '0');

  const upgradeItems = [
    {
      name: "Basic Junk Magnet",
      cost: 50000,
      description: "+5% Junk Collection Rate",
      info: "A simple magnetic device that attracts nearby junk. Perfect for beginners looking to boost their collection efficiency.",
      owned: parseInt(localStorage.getItem('basicJunkMagnet') || '0'),
      category: "collection",
      tier: "basic"
    },
    {
      name: "Advanced Picker Kit",
      cost: 150000,
      description: "+10% Click Power",
      info: "Professional-grade tools for enhanced junk collection. Includes reinforced grabbers and precision targeting.",
      owned: parseInt(localStorage.getItem('advancedPickerKit') || '0'),
      category: "clicking",
      tier: "advanced"
    },
    {
      name: "Quantum Sorter",
      cost: 500000,
      description: "+15% Passive Income",
      info: "Quantum technology that optimizes junk sorting processes at the molecular level for maximum efficiency.",
      owned: parseInt(localStorage.getItem('quantumSorter') || '0'),
      category: "passive",
      tier: "quantum"
    },
    {
      name: "Neural Interface",
      cost: 1000000,
      description: "+20% All Bonuses",
      info: "Direct neural connection for maximum efficiency. Interfaces with your brain to optimize all junk operations.",
      owned: parseInt(localStorage.getItem('neuralInterface') || '0'),
      category: "universal",
      tier: "neural"
    },
    {
      name: "Plasma Field Generator",
      cost: 2500000,
      description: "+25% Collection Speed",
      info: "Creates an electromagnetic field that accelerates junk collection in a wide radius around your operations.",
      owned: parseInt(localStorage.getItem('plasmaFieldGenerator') || '0'),
      category: "collection",
      tier: "plasma"
    },
    {
      name: "Cybernetic Enhancement Suite",
      cost: 5000000,
      description: "+30% Click Efficiency",
      info: "Permanent cybernetic modifications that enhance your clicking capabilities beyond human limits.",
      owned: parseInt(localStorage.getItem('cyberneticEnhancement') || '0'),
      category: "clicking",
      tier: "cybernetic"
    }
  ];

  const handlePurchase = (item) => {
    if (junk >= item.cost) {
      const newJunk = junk - item.cost;
      const newOwned = item.owned + 1;
      const storageKey = item.name.toLowerCase().replace(/\s+/g, '');

      localStorage.setItem('junk', newJunk.toString());
      localStorage.setItem(storageKey, newOwned.toString());

      // Trigger UI update
      window.dispatchEvent(new Event('storage'));
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(2)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(2)}K`;
    }
    return num.toLocaleString();
  };

  const getTierIcon = (tier) => {
    switch(tier) {
      case 'basic': return '🔧';
      case 'advanced': return '⚡';
      case 'quantum': return '🌀';
      case 'neural': return '🧠';
      case 'plasma': return '⚛️';
      case 'cybernetic': return '🤖';
      default: return '🔹';
    }
  };

  const getTierColor = (tier) => {
    switch(tier) {
      case 'basic': return '#00FF00';
      case 'advanced': return '#00FFFF';
      case 'quantum': return '#9400D3';
      case 'neural': return '#FF00FF';
      case 'plasma': return '#FF4500';
      case 'cybernetic': return '#FFD700';
      default: return '#CCCCCC';
    }
  };

  const openMobileInfo = (item) => {
    setMobileInfoModal(item);
  };

  const closeMobileInfo = () => {
    setMobileInfoModal(null);
  };

  return (
    <div className="junk-upgrades-container">
      <div className="junk-upgrades-header">
        <h2>Junk Upgrades</h2>
        <div className="junk-upgrades-controls">
          <div className="junk-upgrades-currency-display">
            <span className="junk-upgrades-currency-amount">{formatNumber(junk)} Junk</span>
          </div>
          <button onClick={onClose} className="junk-upgrades-close-button">Close</button>
        </div>
      </div>

      <div className="junk-upgrades-content">
        <div className="junk-upgrades-description">
          <p>Enhance your junk collection capabilities with advanced technological upgrades. Each upgrade provides permanent bonuses to boost your efficiency.</p>
        </div>

        <div className="junk-upgrades-items">
          {upgradeItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handlePurchase(item)}
              disabled={junk < item.cost}
              className={`junk-upgrade-item ${junk < item.cost ? 'junk-upgrade-disabled' : ''}`}
            >
              <div className="junk-upgrade-item-header">
                <div className="junk-upgrade-item-title-section">
                  <span className="junk-upgrade-tier-icon" style={{ color: getTierColor(item.tier) }}>
                    {getTierIcon(item.tier)}
                  </span>
                  <strong>{item.name}</strong>
                  <button 
                    className="junk-upgrades-mobile-info-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openMobileInfo(item);
                    }}
                  >
                    ℹ️
                  </button>
                </div>
                <span className="junk-upgrade-cost">({formatNumber(item.cost)} Junk)</span>
              </div>
              <div className="junk-upgrade-item-info">
                <p className="junk-upgrade-item-description">{item.description}</p>
                <p className="junk-upgrade-item-details">{item.info}</p>
                <div className="junk-upgrade-item-footer">
                  <span className="junk-upgrade-category-tag">{item.category}</span>
                  <span className="junk-upgrade-owned">Owned: {item.owned}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {mobileInfoModal && (
        <div className="junk-upgrades-mobile-item-info-modal" onClick={closeMobileInfo}>
          <div className="junk-upgrades-mobile-item-info-content" onClick={(e) => e.stopPropagation()}>
            <div className="junk-upgrades-mobile-item-info-header">
              <span className="junk-upgrade-tier-icon" style={{ color: getTierColor(mobileInfoModal.tier) }}>
                {getTierIcon(mobileInfoModal.tier)}
              </span>
              <h3>{mobileInfoModal.name}</h3>
              <button className="junk-upgrades-mobile-info-close" onClick={closeMobileInfo}>
                ×
              </button>
            </div>
            <div className="junk-upgrades-mobile-item-info-body">
              <p><strong>Cost:</strong> {formatNumber(mobileInfoModal.cost)} Junk</p>
              <p><strong>Effect:</strong> {mobileInfoModal.description}</p>
              <p>{mobileInfoModal.info}</p>
              <p><strong>Category:</strong> {mobileInfoModal.category}</p>
              <p><strong>Owned:</strong> {mobileInfoModal.owned}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

