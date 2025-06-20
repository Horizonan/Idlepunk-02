import React, { useState, useEffect } from 'react';
import '../styles/JunkUpgrades.css';

export default function JunkUpgrades({ onClose, ownedItems, junk, setJunk, onBuyStreetratUpgrade, onBuyScrapBagUpgrade, onBuyTrashPickerUpgrade, onBuyCartUpgrade, onBuyUrbanRecyclerUpgrade, onBuyClickEnhancerUpgrade, onBuyJunkMagnetUpgrade, onBuyClampjawUpgrade1, onBuyScrapDroneUpgrade1, onBuyTrashPickerUpgrade2, onBuyStreetratUpgrade2, onBuyTrashBagUpgrade2, onBuyCartUpgrade2, onBuyUrbanRecyclerUpgrade2, onBuyHoloBillboardUpgrade1, onNewUpgradesChange }) {
  const [mobileInfoModal, setMobileInfoModal] = useState(null);
  const [hasNewUpgrades, setHasNewUpgrades] = useState(false);

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
      unlockCondition: () => (ownedItems?.streetrat || 0) >= 15 && !localStorage.getItem('streetratUpgrade'),
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
      unlockCondition: () => (ownedItems?.urbanRecycler || 0) >= 15 && !localStorage.getItem('urbanRecyclerUpgrade'),
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
      unlockCondition: () => (ownedItems?.clickEnhancer || 0) >= 15 && !localStorage.getItem('clickEnhancerUpgrade'),
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
      unlockCondition: () => (ownedItems?.junkMagnet || 0) >= 15 && !localStorage.getItem('junkMagnetUpgrade'),
      owned: localStorage.getItem('junkMagnetUpgrade') ? 1 : 0,
      category: "passive",
      tier: "advanced",
      storageKey: "junkMagnetUpgrade",
      action: onBuyJunkMagnetUpgrade
    },
    {
      name: "Clampjaw Rig WD-40 Baptism",
      cost: 520000,
      description: "+10 Junk/Click from Clampjaw Rigs",
      info: "Less screech, more grab.",
      unlockCondition: () => (ownedItems?.clampjawRig || 0) >= 15 && !localStorage.getItem('clampjawUpgrade1'),
      owned: localStorage.getItem('clampjawUpgrade1') ? 1 : 0,
      category: "clicking",
      tier: "advanced",
      storageKey: "clampjawUpgrade1",
      action: onBuyClampjawUpgrade1
    },
    {
      name: "Scrap Drone Firmware v13.37",
      cost: 670000,
      description: "+15 Junk/sec from Scrap Drones",
      info: "Now supports sarcasm and mild violence.",
      unlockCondition: () => (ownedItems?.scrapDrone || 0) >= 15 && !localStorage.getItem('scrapDroneUpgrade1'),
      owned: localStorage.getItem('scrapDroneUpgrade1') ? 1 : 0,
      category: "passive",
      tier: "advanced",
      storageKey: "scrapDroneUpgrade1",
      action: onBuyScrapDroneUpgrade1
    },
    {
      name: "Trash Picker Holster Belt",
      cost: 870000,
      description: "+2 Junk/Click from Trash Pickers",
      info: "You'll never drop your fork again.",
      unlockCondition: () => (ownedItems?.trashPicker || 0) >= 20 && !localStorage.getItem('trashPickerUpgrade2'),
      owned: localStorage.getItem('trashPickerUpgrade2') ? 1 : 0,
      category: "clicking",
      tier: "quantum",
      storageKey: "trashPickerUpgrade2",
      action: onBuyTrashPickerUpgrade2
    },
    {
      name: "Streetrat Unionization",
      cost: 1130000,
      description: `Streetrats work +50% additional Junk/sec (50% of current production)`,
      info: "Turns out fair treatment is motivating.",
      unlockCondition: () => (ownedItems?.streetrat || 0) >= 20 && !localStorage.getItem('streetratUpgrade2'),
      owned: localStorage.getItem('streetratUpgrade2') ? 1 : 0,
      category: "passive",
      tier: "quantum",
      storageKey: "streetratUpgrade2",
      action: onBuyStreetratUpgrade2
    },
    {
      name: "Trash Bag Max-Patch",
      cost: 1460000,
      description: "+2 Junk/Click from Trash Bags",
      info: "You can't see the bag under the duct tape anymore.",
      unlockCondition: () => (ownedItems?.trashBag || 0) >= 30 && !localStorage.getItem('trashBagUpgrade2'),
      owned: localStorage.getItem('trashBagUpgrade2') ? 1 : 0,
      category: "clicking",
      tier: "quantum",
      storageKey: "trashBagUpgrade2",
      action: onBuyTrashBagUpgrade2
    },
    {
      name: "Cart Racing League Sponsorship",
      cost: 1890000,
      description: `Carts generate +25% additional Junk/sec (25% of current production)`,
      info: "Sponsored by Sludge-Cola and Civic Regret™.",
      unlockCondition: () => (ownedItems?.cart || 0) >= 30 && !localStorage.getItem('cartUpgrade2'),
      owned: localStorage.getItem('cartUpgrade2') ? 1 : 0,
      category: "passive",
      tier: "quantum",
      storageKey: "cartUpgrade2",
      action: onBuyCartUpgrade2
    },
    {
      name: "Urban Recycler Flame Jets",
      cost: 2450000,
      description: "+15 Junk/sec from Urban Recyclers",
      info: "Because fire = faster. Usually.",
      unlockCondition: () => (ownedItems?.urbanRecycler || 0) >= 20 && !localStorage.getItem('urbanRecyclerUpgrade2'),
      owned: localStorage.getItem('urbanRecyclerUpgrade2') ? 1 : 0,
      category: "passive",
      tier: "quantum",
      storageKey: "urbanRecyclerUpgrade2",
      action: onBuyUrbanRecyclerUpgrade2
    },
    {
      name: "Billboard Neon Pulse Sync",
      cost: 3200000,
      description: "+5% global Junk/sec boost",
      info: "Now synced to the city's heartbeat (and local dance stations).",
      unlockCondition: () => (ownedItems?.holoBillboard || 0) >= 1 && !localStorage.getItem('holoBillboardUpgrade1'),
      owned: localStorage.getItem('holoBillboardUpgrade1') ? 1 : 0,
      category: "passive",
      tier: "quantum",
      storageKey: "holoBillboardUpgrade1",
      action: onBuyHoloBillboardUpgrade1
    }
  ];

  // Check for new unlocked upgrades
  useEffect(() => {
    const checkNewUpgrades = () => {
      // First check if there are any available upgrades at all
      const availableUpgrades = upgradeItems.filter(item => item.unlockCondition() && !localStorage.getItem(item.storageKey));
      
      // Only check for new upgrades if there are available upgrades
      const newUpgradesAvailable = availableUpgrades.length > 0 && availableUpgrades.some(item => {
        const isNotSeen = !localStorage.getItem(`upgrade_seen_${item.storageKey}`);
        return isNotSeen;
      });
      
      setHasNewUpgrades(newUpgradesAvailable);

      // Notify parent component if callback exists
      if (onNewUpgradesChange) {
        onNewUpgradesChange(newUpgradesAvailable);
      }
    };

    checkNewUpgrades();
    const interval = setInterval(checkNewUpgrades, 1000);
    return () => clearInterval(interval);
  }, [ownedItems, onNewUpgradesChange]);

  // Mark visible upgrades as seen when the menu opens (only once per mount)
  useEffect(() => {
    const markUpgradesAsSeen = () => {
      const availableUpgrades = upgradeItems.filter(item => item.unlockCondition() && !localStorage.getItem(item.storageKey));
      availableUpgrades.forEach(item => {
        localStorage.setItem(`upgrade_seen_${item.storageKey}`, 'true');
      });
    };

    // Small delay to ensure the component is fully mounted
    const timer = setTimeout(markUpgradesAsSeen, 100);
    return () => clearTimeout(timer);
  }, []); // Only run once when component mounts

  const handlePurchase = (item) => {
    if (junk >= item.cost && item.unlockCondition()) {
      const newJunk = junk - item.cost;

      setJunk(newJunk);
      localStorage.setItem(item.storageKey, 'true');
      localStorage.setItem(`upgrade_seen_${item.storageKey}`, 'true');

      // Handle item renaming based on upgrade type
      switch(item.storageKey) {
        case 'trashPickerUpgrade':
          localStorage.setItem('trashPickerName', 'Braced Trash Picker');
          break;
        case 'cartUpgrade':
          localStorage.setItem('cartName', 'Suspended Cart');
          break;
        case 'scrapBagUpgrade':
          localStorage.setItem('trashBagName', 'Reinforced Trash Bag');
          break;
        case 'streetratUpgrade':
          localStorage.setItem('streetratName', 'Whistling Streetrat');
          break;
        case 'urbanRecyclerUpgrade':
          localStorage.setItem('urbanRecyclerName', 'Flame-Boosted Recycler');
          break;
        case 'clickEnhancerUpgrade':
          localStorage.setItem('clickEnhancerName', 'Overclocked Click Enhancer');
          break;
        case 'junkMagnetUpgrade':
          localStorage.setItem('junkMagnetName', 'Overcharged Junk Magnet');
          break;
        case 'clampjawUpgrade1':
          localStorage.setItem('clampjawRigName', 'Lubricated Clampjaw Rig');
          break;
        case 'scrapDroneUpgrade1':
          localStorage.setItem('scrapDroneName', 'Snarky Scrap Drone');
          break;
        case 'trashPickerUpgrade2':
          localStorage.setItem('trashPickerName', 'Holstered Trash Picker');
          break;
        case 'streetratUpgrade2':
          localStorage.setItem('streetratName', 'Unionized Streetrat');
          break;
        case 'trashBagUpgrade2':
          localStorage.setItem('trashBagName', 'Max-Patched Trash Bag');
          break;
        case 'cartUpgrade2':
          localStorage.setItem('cartName', 'Sponsored Cart');
          break;
        case 'urbanRecyclerUpgrade2':
          localStorage.setItem('urbanRecyclerName', 'Flame-Jet Recycler');
          break;
        case 'holoBillboardUpgrade1':
          localStorage.setItem('holoBillboardName', 'Synced Billboard');
          break;
      }

      // Call the specific action handler
      if (item.action) {
        item.action();
      }
      
      // Force update the UI to reflect changes
      window.dispatchEvent(new Event('storage'));

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

  const isNewUpgrade = (item) => {
    const isUnlocked = item.unlockCondition();
    const isNotPurchased = !localStorage.getItem(item.storageKey);
    const isNotSeen = !localStorage.getItem(`upgrade_seen_${item.storageKey}`);
    return isUnlocked && isNotPurchased && isNotSeen;
  };

  // Filter items based on unlock conditions
  const availableUpgrades = upgradeItems.filter(item => item.unlockCondition());

  return (
    <div className="junk-upgrades-container">
      <div className="junk-upgrades-header">
        <h2>
          Junk Upgrades
          {hasNewUpgrades && <span className="junk-upgrades-new-indicator"> (!)</span>}
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