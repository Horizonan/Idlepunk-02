
import React from 'react';
import '../styles/JunkUpgrades.css';

export default function JunkUpgrades({ onClose }) {
  const junk = parseInt(localStorage.getItem('junk') || '0');
  const credits = parseInt(localStorage.getItem('credits') || '0');

  const upgradeItems = [
    {
      name: "Basic Junk Magnet",
      cost: 50000,
      description: "+5% Junk Collection Rate",
      info: "A simple magnetic device that attracts nearby junk",
      owned: parseInt(localStorage.getItem('basicJunkMagnet') || '0'),
    },
    {
      name: "Advanced Picker Kit",
      cost: 150000,
      description: "+10% Click Power",
      info: "Professional-grade tools for enhanced junk collection",
      owned: parseInt(localStorage.getItem('advancedPickerKit') || '0'),
    },
    {
      name: "Quantum Sorter",
      cost: 500000,
      description: "+15% Passive Income",
      info: "Quantum technology that optimizes junk sorting processes",
      owned: parseInt(localStorage.getItem('quantumSorter') || '0'),
    },
    {
      name: "Neural Interface",
      cost: 1000000,
      description: "+20% All Bonuses",
      info: "Direct neural connection for maximum efficiency",
      owned: parseInt(localStorage.getItem('neuralInterface') || '0'),
    },
  ];

  const handlePurchase = (item) => {
    if (junk >= item.cost) {
      const newJunk = junk - item.cost;
      const newOwned = item.owned + 1;

      localStorage.setItem('junk', newJunk.toString());
      localStorage.setItem(item.name.toLowerCase().replace(/\s+/g, ''), newOwned.toString());

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

  return (
    <div className="store-container">
      <div className="store-header">
        <h2>Junk Upgrades</h2>
        <button onClick={onClose} className="close-button">Close</button>
      </div>

      <div className="store-content">
        <div className="store-items">
          {upgradeItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handlePurchase(item)}
              disabled={junk < item.cost}
              className={`store-item ${junk < item.cost ? 'disabled' : ''}`}
            >
              <div className="item-header">
                <strong>{item.name}</strong>
                <span className="cost">({formatNumber(item.cost)} Junk)</span>
              </div>
              <div className="item-info">
                <p>{item.description}</p>
                <p>{item.info}</p>
                <p className="owned">Owned: {item.owned}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
