
import React, { useState, useEffect } from 'react';
import '../styles/JunkUpgrades.css';

export default function JunkUpgrades({ onClose, ownedItems, onBuyStreetratUpgrade, onBuyScrapBagUpgrade }) {
  const [mobileInfoModal, setMobileInfoModal] = useState(null);
  const [hasNewUpgrades, setHasNewUpgrades] = useState(false);
  const junk = parseInt(localStorage.getItem('junk') || '0');

  const upgradeItems = [
    {
      name: "Scrap Bag Reinforcement",
      cost: 30000,
      description: "+1 Junk/Click from Scrap Bags",
      info: "Reinforced with duct tape and ambition.",
      unlockCondition: () => (ownedItems?.trashBag || 0) >= 10,
      owned: parseInt(localStorage.getItem('scrapBagUpgrade') || '0'),
      category: "clicking",
      tier: "basic",
      storageKey: "scrapBagUpgrade",
      action: onBuyScrapBagUpgrade
    },
    {
      name: "Streetrat Efficiency Training",
      cost: 50000,
      description: "Doubles output of all Streetrats",
      info: "They now wear matching vests and whistle while they work.",
      unlockCondition: () => (ownedItems?.streetrat || 0) >= 10,
      owned: parseInt(localStorage.getItem('streetratUpgrade') || '0'),
      category: "passive",
      tier: "advanced",
      storageKey: "streetratUpgrade",
      action: onBuyStreetratUpgrade
    }
  ];

  // Check for new unlocked upgrades
  useEffect(() => {
    const checkNewUpgrades = () => {
      const newUpgradesAvailable = upgradeItems.some(item => 
        item.unlockCondition() && 
        item.owned === 0 && 
        !localStorage.getItem(`upgrade_seen_${item.storageKey}`)
      );
      setHasNewUpgrades(newUpgradesAvailable);
    };

    checkNewUpgrades();
    const interval = setInterval(checkNewUpgrades, 1000);
    return () => clearInterval(interval);
  }, [ownedItems]);

  const handlePurchase = (item) => {
    if (junk >= item.cost && item.unlockCondition()) {
      const newJunk = junk - item.cost;
      const newOwned = item.owned + 1;

      localStorage.setItem('junk', newJunk.toString());
      localStorage.setItem(item.storageKey, newOwned.toString());
      localStorage.setItem(`upgrade_seen_${item.storageKey}`, 'true');

      // Call the specific action handler
      if (item.action) {
        item.action();
      }

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

  const markUpgradeAsSeen = (item) => {
    localStorage.setItem(`upgrade_seen_${item.storageKey}`, 'true');
  };

  const isNewUpgrade = (item) => {
    return item.unlockCondition() && 
           item.owned === 0 && 
           !localStorage.getItem(`upgrade_seen_${item.storageKey}`);
  };

  // Filter items based on unlock conditions
  const availableUpgrades = upgradeItems.filter(item => item.unlockCondition());
  const lockedUpgrades = upgradeItems.filter(item => !item.unlockCondition());

  return (
    <div className="junk-upgrades-container">
      <div className="junk-upgrades-header">
        <h2>
          Junk Upgrades
          {hasNewUpgrades && <span className="junk-upgrades-new-indicator"> (!)</span>}
        </h2>
        <div className="junk-upgrades-controls">
          <div className="junk-upgrades-currency-display">
            <span className="junk-upgrades-currency-amount">{formatNumber(junk)} Junk</span>
          </div>
          <button onClick={onClose} className="junk-upgrades-close-button">Close</button>
        </div>
      </div>

      <div className="junk-upgrades-content">
        <div className="junk-upgrades-description">
          <p>Enhance your junk collection capabilities with specialized upgrades. Each upgrade provides permanent bonuses to boost your efficiency.</p>
        </div>

        {availableUpgrades.length > 0 && (
          <div className="junk-upgrades-section">
            <h3 className="junk-upgrades-section-title">Available Upgrades</h3>
            <div className="junk-upgrades-items">
              {availableUpgrades.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    handlePurchase(item);
                    markUpgradeAsSeen(item);
                  }}
                  disabled={junk < item.cost}
                  className={`junk-upgrade-item ${junk < item.cost ? 'junk-upgrade-disabled' : ''} ${isNewUpgrade(item) ? 'junk-upgrade-new' : ''}`}
                >
                  <div className="junk-upgrade-item-header">
                    <div className="junk-upgrade-item-title-section">
                      <span className="junk-upgrade-tier-icon" style={{ color: getTierColor(item.tier) }}>
                        {getTierIcon(item.tier)}
                      </span>
                      <strong>
                        {item.name}
                        {isNewUpgrade(item) && <span className="junk-upgrade-new-badge"> NEW!</span>}
                      </strong>
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
        )}

        {lockedUpgrades.length > 0 && (
          <div className="junk-upgrades-section">
            <h3 className="junk-upgrades-section-title">Locked Upgrades</h3>
            <div className="junk-upgrades-locked-items">
              {lockedUpgrades.map((item, index) => (
                <div key={index} className="junk-upgrade-locked-item">
                  <div className="junk-upgrade-locked-header">
                    <span className="junk-upgrade-tier-icon" style={{ color: getTierColor(item.tier) }}>
                      {getTierIcon(item.tier)}
                    </span>
                    <strong>{item.name}</strong>
                    <span className="junk-upgrade-locked-badge">🔒</span>
                  </div>
                  <p className="junk-upgrade-locked-requirement">
                    Requires: {item.category === 'clicking' ? `${(ownedItems?.trashBag || 0)}/10 Scrap Bags` : `${(ownedItems?.streetrat || 0)}/10 Streetrats`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {availableUpgrades.length === 0 && lockedUpgrades.length === 0 && (
          <div className="junk-upgrades-empty">
            <p>No upgrades available at this time. Keep collecting junk and purchasing items to unlock new upgrades!</p>
          </div>
        )}
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
