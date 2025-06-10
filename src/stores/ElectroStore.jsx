import React, { useState } from 'react';
import '../styles/Store.css';
import PurchasedItemsList from '../components/PurchasedItemsList';

export default function ElectroStore({ 
  electroShards, tronics, onBuyTronicsBoost, onBuyQuantumTap, 
  onBack, bulkBuy, setBulkBuy, itemCosts, calculate10xPrice01, onBuyTronicsBoostII, caluclatePricex02, onBuyFlowRegulator, onBuyElectroSurgeNode, onBuyElectroBeaconCore,
  onBuyCircuitOptimization,onBuyFrequencyTap, onBuyReactiveFeedback, onBuyPickupMagnetArray,
}) {
  const [selectedTab, setSelectedTab] = useState("basic");

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(2)}mil`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(2)}k`;
    }
    return num;
  };

  const getPurchasedItems = () => {
    const purchased = [];
    
    // Check all purchased items
    if (localStorage.getItem('unlocked_tronics_boost')) {
      const count = parseInt(localStorage.getItem('tronics_boost_count') || '0');
      if (count > 0) {
        purchased.push({
          name: "⚡ Tronics Click Boost I",
          effect: `+1 Tronics per click`,
          count: count
        });
      }
    }
    
    const boostIICount = parseInt(localStorage.getItem('tronics_boost_II_count') || '0');
    if (boostIICount > 0) {
      purchased.push({
        name: "⚡ Tronics Click Boost II",
        effect: `+2 Tronics per click`,
        count: boostIICount
      });
    }
    
    if (localStorage.getItem('flow_regulator_purchased') === 'true') {
      purchased.push({
        name: "⚡ Flow Regulator",
        effect: "+10% Tronics per click",
        count: 1
      });
    }
    
    if (localStorage.getItem('quantum_tap_purchased') === 'true') {
      purchased.push({
        name: "⚡ Quantum Tap Circuit",
        effect: "3% chance for 3x Tronics per click",
        count: 1
      });
    }
    
    if (localStorage.getItem('electro_surge_node_purchased') === 'true') {
      purchased.push({
        name: "⚡ Electro Surge Node",
        effect: "+5 seconds surge duration, unlocks Tronics surges",
        count: 1
      });
    }
    
    if (localStorage.getItem('beacon_core_purchased') === 'true') {
      purchased.push({
        name: "🔦 Electro Beacon Core",
        effect: "-25% Electro Shard spawn time",
        count: 1
      });
    }
    
    const circuitOptCount = parseInt(localStorage.getItem('circuit_optimization_count') || '0');
    if (circuitOptCount > 0) {
      purchased.push({
        name: "🧠 Circuit Optimization Unit",
        effect: `+25% global Junk/sec`,
        count: circuitOptCount
      });
    }
    
    if (localStorage.getItem('high_freq_tap_purchased') === 'true') {
      purchased.push({
        name: "⚡ High-Frequency Tap Chip",
        effect: "Clicker fires twice per manual click",
        count: 1
      });
    }
    
    if (localStorage.getItem('reactive_feedback_purchased') === 'true') {
      purchased.push({
        name: "🔄 Reactive Feedback Loop",
        effect: "+15% Tronics per click + 2.5% of Junk/sec from clicks",
        count: 1
      });
    }
    
    if (localStorage.getItem('pickup_magnet_array_purchased') === 'true') {
      purchased.push({
        name: "🧲 Pickup Magnet Array",
        effect: "Extends pickup duration by 8s, auto-collects near cursor",
        count: 1
      });
    }
    
    return purchased;
  };



  const basicItems = [
    {
      name: "⚡ Tronics Click Boost I",
      cost: {
        tronics: !localStorage.getItem('unlocked_tronics_boost')
          ? 0
          : (bulkBuy 
              ? (calculate10xPrice01(itemCosts.tronicsBoost).totalCost) 
              : itemCosts.tronicsBoost),
        shards: !localStorage.getItem('unlocked_tronics_boost') ? 3 : 0 
      },
      description: "+1 Tronics per click",
      info: (!localStorage.getItem('unlocked_tronics_boost') !== null)
        ? "Unlock with 3 Electro Shards, then purchase for Tronics"
        : "Basic boost to tronics generation",
      action: onBuyTronicsBoost,
      purchasedCount: parseInt(localStorage.getItem('tronics_boost_count') || '0'),
      unlockCondition: () => !localStorage.getItem('unlocked_tronics_boost') ? electroShards >= 3 : true
    },
    {
      name: "⚡ Tronics Click Boost II",
      cost: { tronics: bulkBuy ? caluclatePricex02(itemCosts.tronicsBoostII).totalCost : itemCosts.tronicsBoostII, },
      description: "+2 Tronics per click",
      info: "Now with extra voltage. May void warranty. Requires Tronics Boost I to be unlocked. Does not consume Tronics Boost I.",
      action: onBuyTronicsBoostII,
      purchasedCount: parseInt(localStorage.getItem('tronics_boost_II_count') || '0'),
      unlockCondition: () => localStorage.getItem('unlocked_tronics_boost') && localStorage.getItem('tronics_boost_count') && tronics >= itemCosts.tronicsBoostII
    } 
  ];

  const advancedItems = [
    {
      name: "⚡ Flow Regulator",
      cost: { tronics: 3000 },
      description: "+10% Tronics per click",
      info: "One-time purchase that optimizes tronics flow",
      action: onBuyFlowRegulator,
      purchasedCount: localStorage.getItem('flow_regulator_purchased') === 'true' ? 1 : 0,
      unlockCondition: () => !localStorage.getItem('flow_regulator_purchased')
    },
    {
      name: "⚡ Quantum Tap Circuit",
      cost: { tronics: 1250 },
      description: "3% chance per click to gain 3x Tronics",
      info: "One-time purchase that adds chance for bonus tronics",
      action: onBuyQuantumTap,
      purchasedCount: localStorage.getItem('quantum_tap_purchased') === 'true' ? 1 : 0,
      unlockCondition: () => localStorage.getItem('unlocked_tronics_boost') && !localStorage.getItem('quantum_tap_purchased')
    },
    {
      name: "⚡ Electro Surge Node",
      cost: {
        tronics: !localStorage.getItem('electro_surge_node_unlocked')
          ? 0
          : 35000,
        shards: !localStorage.getItem('electro_surge_node_unlocked') ? 8 : 0
      },
      description: "Increases all Surge durations by +5 seconds and unlocks tronics surge",
      info: "One-time purchase",
      action: onBuyElectroSurgeNode,
      purchasedCount: localStorage.getItem('electro_surge_node_purchased') === 'true' ? 1 : 0,
      unlockCondition: () => !localStorage.getItem('electro_surge_node_purchased') && (localStorage.getItem('electro_surge_node_unlocked') || electroShards >= 8)
    },
    {
      name: "🔦 Electro Beacon Core",
      cost: {
        tronics: !localStorage.getItem('beacon_core_purchased')
          ? 0
          : 500000,
        shards: !localStorage.getItem('beacon_core_purchased') ? 15 : 0
      },
      description: "Decrease Electro Shard floating pickup spawn time by 25%",
      info: "Requires 10 Electro Shard Beacons",
      action: onBuyElectroBeaconCore,
      purchasedCount: localStorage.getItem('beacon_core_purchased') === 'true' ? 1 : 0,
      unlockCondition: () => parseInt(localStorage.getItem('beaconCount') || '0') >= 10 && !localStorage.getItem('beacon_core_purchased')
    },
    {
      name: "🧠 Circuit Optimization Unit",
      cost: {
        tronics: !localStorage.getItem('circuit_optimization_purchased') ? 0 : parseInt(localStorage.getItem('circuit_optimization_cost') || '25000'),
        shards: !localStorage.getItem('circuit_optimization_purchased') ? 5 : 0
      },
      description: "Global Junk/sec increased by 25%",
      info: "An overclocked mesh of recycled processors fine-tunes your entire junk economy.",
      action: onBuyCircuitOptimization,
      purchasedCount: parseInt(localStorage.getItem('circuit_optimization_count') || '0'),
      unlockCondition: () => localStorage.getItem('unlocked_tronics_boost') && tronics >= 25000 && electroShards >= 5 && (parseInt(localStorage.getItem('circuit_optimization_count') || '0') < 4)
    },
    {
      name: "⚡ High-Frequency Tap Chip",
      cost: {
        tronics: !localStorage.getItem('high_freq_tap_unlocked') ? 0 : 10000,
        shards: !localStorage.getItem('high_freq_tap_unlocked') ? 2 : 0
      },
      description: "Clicker fires twice per manual click",
      info: "Requires Tronics Boost II",
      action: onBuyFrequencyTap,
      purchasedCount: localStorage.getItem('high_freq_tap_purchased') === 'true' ? 1 : 0,
      unlockCondition: () => localStorage.getItem('tronics_boost_II_count') && !localStorage.getItem('high_freq_tap_purchased')
    },
    {
      name: "🔄 Reactive Feedback Loop",
      cost: {
        tronics: !localStorage.getItem('reactive_feedback_purchased') ? 0 : 40000,
        shards: !localStorage.getItem('reactive_feedback_purchased') ? 12 : 0
      },
      description: "+15% Tronics per click + 2.5% of current Junk/sec from clicks",
      info: "A self-reinforcing circuit that amplifies your clicking efficiency and converts passive income into active gains",
      action: onBuyReactiveFeedback,
      purchasedCount: localStorage.getItem('reactive_feedback_purchased') === 'true' ? 1 : 0,
      unlockCondition: () => localStorage.getItem('unlocked_tronics_boost') && tronics >= 40000 && electroShards >= 12 && !localStorage.getItem('reactive_feedback_purchased')
    },
    {
      name: "🧲 Pickup Magnet Array",
      cost: {
        tronics: !localStorage.getItem('pickup_magnet_array_purchased') ? 0 : 200000,
        shards: !localStorage.getItem('pickup_magnet_array_purchased') ? 10 : 0
      },
      description: "Extends pickup duration by 8s (all floating pickups) and auto-collects near cursor",
      info: "A powerful electromagnetic field generator that draws all valuable materials within range directly to your collection interface",
      action: onBuyPickupMagnetArray,
      purchasedCount: localStorage.getItem('pickup_magnet_array_purchased') === 'true' ? 1 : 0,
      unlockCondition: () => localStorage.getItem('unlocked_tronics_boost') && tronics >= 200000 && electroShards >= 10 && !localStorage.getItem('pickup_magnet_array_purchased')
    }
  ];

  const tabs = [
    { id: "basic", label: "Basic" },
    { id: "advanced", label: "Advanced" }
  ];

  const renderItems = (items) => (
    <div className="store-items">
      {items.filter(item => {
        // Hide one-time purchases that are already bought
        if (item.name.includes("Flow Regulator") && localStorage.getItem('flow_regulator_purchased') === 'true') {
          return false;
        }
        if (item.name.includes("Quantum Tap") && localStorage.getItem('quantum_tap_purchased') === 'true') {
          return false;
        }
        if (item.name.includes("Electro Surge Node") && localStorage.getItem('electro_surge_node_purchased') === 'true') {
          return false;
        }
        if (item.name.includes("Electro Beacon Core") && localStorage.getItem('beacon_core_purchased') === 'true') {
          return false;
        }
        if (item.name.includes("Circuit Optimization") && parseInt(localStorage.getItem('circuit_optimization_count') || '0') >= 4) {
          return false;
        }
        if (item.name.includes("High-Frequency Tap") && localStorage.getItem('high_freq_tap_purchased') === 'true') {
          return false;
        }
        if (item.name.includes("Reactive Feedback Loop") && localStorage.getItem('reactive_feedback_purchased') === 'true') {
          return false;
        }
        if (item.name.includes("Pickup Magnet Array") && localStorage.getItem('pickup_magnet_array_purchased') === 'true') {
          return false;
        }
        // Hide Tronics Boost I if fully purchased (only show if not unlocked yet)
        if (item.name.includes("Tronics Click Boost I") && localStorage.getItem('unlocked_tronics_boost') && parseInt(localStorage.getItem('tronics_boost_count') || '0') >= 100) {
          return false;
        }
        // Hide Tronics Boost II if fully purchased
        if (item.name.includes("Tronics Click Boost II") && parseInt(localStorage.getItem('tronics_boost_II_count') || '0') >= 100) {
          return false;
        }
        return true;
      }).map((item) => {
        const canAfford = (item.cost.tronics ? tronics >= item.cost.tronics : true) && 
                         (item.cost.shards ? electroShards >= item.cost.shards : true);
        return (
          <button
            key={item.name}
            onClick={item.action}
            disabled={!canAfford || !item.unlockCondition()}
            className={`store-item ${!canAfford || !item.unlockCondition() ? 'disabled' : ''}`}
          >
            <div className="item-header">
              <strong>{item.name}</strong>
              <span className="cost">
                {item.cost.tronics ? `${formatNumber(item.cost.tronics)} Tronics` : ''}
                {item.cost.shards ? `${item.cost.shards} Shards` : ''}
              </span>
            </div>
            <div className="item-info">
              <p>{item.description}</p>
              <p>{item.info}</p>
              <p className="owned">Owned: {item.purchasedCount}</p>
            </div>
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="store-container">
      <div className="store-header">
        <h2>Tronics Store</h2>
        <div className="store-controls">
          <button 
            onClick={() => setBulkBuy(!bulkBuy)} 
            className="bulk-buy-toggle"
          >
            {bulkBuy ? '10x' : '1x'}
          </button>
          <button onClick={onBack}>Close</button>
        </div>
      </div>
      <div className="crafting-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${selectedTab === tab.id ? "active" : ""}`}
            onClick={() => setSelectedTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="store-content">
        {selectedTab === "basic" && renderItems(basicItems)}
        {selectedTab === "advanced" && renderItems(advancedItems)}
      </div>
      
      <PurchasedItemsList 
        title="⚡ Active Electrotech Upgrades"
        purchasedItems={getPurchasedItems()}
        className="electrostore-purchased"
      />
    </div>
  );
}