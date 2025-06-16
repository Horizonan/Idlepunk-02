
import React, { useState, useEffect } from 'react';
import '../styles/JunkUpgrades.css';

export default function JunkUpgrades({ onClose, ownedItems, onBuyStreetratUpgrade, onBuyScrapBagUpgrade, onBuyTrashPickerUpgrade, onBuyCartUpgrade, onBuyUrbanRecyclerUpgrade, onBuyClickEnhancerUpgrade, onBuyJunkMagnetUpgrade }) {
  const [mobileInfoModal, setMobileInfoModal] = useState(null);
  const [hasNewUpgrades, setHasNewUpgrades] = useState(false);
  const junk = parseInt(localStorage.getItem('junk') || '0');

  const upgradeItems = [
    {
      name: "Trash Picker Wrist Braces",
      cost: 50000,
      description: "+1 Junk/Click from Trash Pickers",
      info: "Ergonomics, but make it trashcore.",
      unlockCondition: () => (ownedItems?.trashPicker || 0) >= 10 && !localStorage.getItem('trashPickerUpgrade'),
      owned: localStorage.getItem('trashPickerUpgrade') ? 1 : 0,
      category: "clicking",
      tier: "basic",
      storageKey: "trashPickerUpgrade",
      action: onBuyTrashPickerUpgrade
    },
    {
      name: "Cart Suspension Mods",
      cost: 75000,
      description: "Carts produce +5 Junk/sec",
      info: "Rides smoother. Holds more junk. Scares more pigeons.",
      unlockCondition: () => (ownedItems?.cart || 0) >= 10 && !localStorage.getItem('cartUpgrade'),
      owned: localStorage.getItem('cartUpgrade') ? 1 : 0,
      category: "passive",
      tier: "basic",
      storageKey: "cartUpgrade",
      action: onBuyCartUpgrade
    },
    {
      name: "Trash Bag Reinforcement",
      cost: 120000,
      description: "+1 Junk/Click from Trash Bags",
      info: "Reinforced with duct tape and ambition.",
      unlockCondition: () => (ownedItems?.trashBag || 0) >= 12 && !localStorage.getItem('scrapBagUpgrade'),
      owned: localStorage.getItem('scrapBagUpgrade') ? 1 : 0,
      category: "clicking",
      tier: "basic",
      storageKey: "scrapBagUpgrade",
      action: onBuyScrapBagUpgrade
    },
    {
      name: "Streetrat Efficiency Training",
      cost: 180000,
      description: "Doubles output of all Streetrats",
      info: "They now wear matching vests and whistle while they work.",
      unlockCondition: () => (ownedItems?.streetrat || 0) >= 10 && !localStorage.getItem('streetratUpgrade'),
      owned: localStorage.getItem('streetratUpgrade') ? 1 : 0,
      category: "passive",
      tier: "advanced",
      storageKey: "streetratUpgrade",
      action: onBuyStreetratUpgrade
    },
    {
      name: "Recycler Flame Boost",
      cost: 250000,
      description: "+10 Junk/sec from Urban Recyclers",
      info: "Powered by fumes and blind optimism.",
      unlockCondition: () => (ownedItems?.urbanRecycler || 0) >= 5 && !localStorage.getItem('urbanRecyclerUpgrade'),
      owned: localStorage.getItem('urbanRecyclerUpgrade') ? 1 : 0,
      category: "passive",
      tier: "advanced",
      storageKey: "urbanRecyclerUpgrade",
      action: onBuyUrbanRecyclerUpgrade
    },
    {
      name: "Click Enhancer Overclock",
      cost: 320000,
      description: "+3 Junk/Click from Click Enhancers",
      info: "We added more wires and crossed our fingers.",
      unlockCondition: () => (ownedItems?.clickEnhancer || 0) >= 10 && !localStorage.getItem('clickEnhancerUpgrade'),
      owned: localStorage.getItem('clickEnhancerUpgrade') ? 1 : 0,
      category: "clicking",
      tier: "advanced",
      storageKey: "clickEnhancerUpgrade",
      action: onBuyClickEnhancerUpgrade
    },
    {
      name: "Junk Magnet Overcharge",
      cost: 400000,
      description: "+10 Junk/sec from Junk Magnets",
      info: "Now hums aggressively at small animals.",
      unlockCondition: () => (ownedItems?.junkMagnet || 0) >= 5 && !localStorage.getItem('junkMagnetUpgrade'),
      owned: localStorage.getItem('junkMagnetUpgrade') ? 1 : 0,
      category: "passive",
      tier: "advanced",
      storageKey: "junkMagnetUpgrade",
      action: onBuyJunkMagnetUpgrade
    }
  ];

  // Check for new unlocked upgrades
  useEffect(() => {
    const checkNewUpgrades = () => {
      const newUpgradesAvailable = upgradeItems.some(item => 
        item.unlockCondition() && 
        !localStorage.getItem(item.storageKey) && 
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

      localStorage.setItem('junk', newJunk.toString());
      localStorage.setItem(item.storageKey, 'true');
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
           !localStorage.getItem(item.storageKey) && 
           !localStorage.getItem(`upgrade_seen_${item.storageKey}`);
  };

  // Filter items based on unlock conditions
  const availableUpgrades = upgradeItems.filter(item => item.unlockCondition());

  return (
    <div className="junk-upgrades-container">
      <div className="junk-upgrades-header">
        <h2>
          Junk Upgrades
          
        </h2>
        <div className="junk-upgrades-controls">
          <button onClick={onClose} className="junk-upgrades-close-button">Close</button>
        </div>
      </div>

      <div className="junk-upgrades-content">
        <div className="junk-upgrades-description">
          <p>Enhance your junk collection capabilities with specialized upgrades. Each upgrade provides permanent bonuses to boost your efficiency.</p>
        </div>

        {availableUpgrades.length > 0 ? (
          <div className="junk-upgrades-section">
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
        ) : (
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
