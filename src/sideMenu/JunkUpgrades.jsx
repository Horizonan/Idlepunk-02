
import React, { useState } from 'react';
import '../styles/JunkUpgrades.css';

export default function JunkUpgrades({ onBack }) {
  const [selectedCategory, setSelectedCategory] = useState('efficiency');

  const categories = {
    efficiency: {
      name: 'Efficiency Upgrades',
      description: 'Improve your junk collection and processing efficiency',
      upgrades: [
        {
          id: 'faster_collection',
          name: 'Faster Collection',
          description: 'Increase junk collection speed by 10%',
          cost: 50000,
          maxLevel: 5,
          currentLevel: 0
        },
        {
          id: 'bulk_processing',
          name: 'Bulk Processing',
          description: 'Process multiple items at once',
          cost: 100000,
          maxLevel: 3,
          currentLevel: 0
        }
      ]
    },
    automation: {
      name: 'Automation Upgrades',
      description: 'Automate various aspects of your junk empire',
      upgrades: [
        {
          id: 'auto_sorter',
          name: 'Auto Sorter',
          description: 'Automatically sort collected junk',
          cost: 75000,
          maxLevel: 1,
          currentLevel: 0
        },
        {
          id: 'smart_recycling',
          name: 'Smart Recycling',
          description: 'Intelligently recycle junk for better materials',
          cost: 150000,
          maxLevel: 1,
          currentLevel: 0
        }
      ]
    },
    capacity: {
      name: 'Capacity Upgrades',
      description: 'Increase storage and handling capabilities',
      upgrades: [
        {
          id: 'storage_expansion',
          name: 'Storage Expansion',
          description: 'Increase junk storage capacity by 25%',
          cost: 80000,
          maxLevel: 10,
          currentLevel: 0
        },
        {
          id: 'mega_containers',
          name: 'Mega Containers',
          description: 'Unlock massive storage containers',
          cost: 200000,
          maxLevel: 1,
          currentLevel: 0
        }
      ]
    }
  };

  const formatCurrency = (amount) => {
    if (amount >= 1000000) {
      return (amount / 1000000).toFixed(1) + 'M';
    } else if (amount >= 1000) {
      return (amount / 1000).toFixed(0) + 'K';
    }
    return amount.toString();
  };

  const handleUpgrade = (upgradeId) => {
    console.log(`Upgrading ${upgradeId}`);
    // Upgrade logic will be implemented later
  };

  return (
    <div className="junk-upgrades-overlay">
      <div className="junk-upgrades-container">
        <div className="junk-upgrades-header">
          <h2>🔧 Junk Upgrades</h2>
          <button className="back-button" onClick={onBack}>
            ← Back
          </button>
        </div>
        
        <div className="junk-upgrades-content">
          <div className="categories-sidebar">
            <h3>Categories</h3>
            {Object.entries(categories).map(([key, category]) => (
              <button
                key={key}
                className={`category-button ${selectedCategory === key ? 'active' : ''}`}
                onClick={() => setSelectedCategory(key)}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          <div className="upgrades-main">
            <div className="category-header">
              <h3>{categories[selectedCategory].name}</h3>
              <p>{categories[selectedCategory].description}</p>
            </div>
            
            <div className="upgrades-grid">
              {categories[selectedCategory].upgrades.map((upgrade) => (
                <div key={upgrade.id} className="upgrade-card">
                  <div className="upgrade-info">
                    <h4>{upgrade.name}</h4>
                    <p>{upgrade.description}</p>
                    <div className="upgrade-stats">
                      <span className="cost">Cost: {formatCurrency(upgrade.cost)} Junk</span>
                      <span className="level">Level: {upgrade.currentLevel}/{upgrade.maxLevel}</span>
                    </div>
                  </div>
                  <button
                    className={`upgrade-button ${upgrade.currentLevel >= upgrade.maxLevel ? 'maxed' : ''}`}
                    onClick={() => handleUpgrade(upgrade.id)}
                    disabled={upgrade.currentLevel >= upgrade.maxLevel}
                  >
                    {upgrade.currentLevel >= upgrade.maxLevel ? 'MAXED' : 'UPGRADE'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
