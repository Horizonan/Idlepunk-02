import React, { useState } from 'react';

export default function ElectroStore({ electroShards, onRemoveElectroShard, tronics, setTronics, setNotifications, onBuyTronicsBoost, onBuyQuantumTap, onBack }) {
  const [section, setSection] = useState('average');
  const tronicsBoostCost = parseInt(localStorage.getItem('tronics_boost_cost') || '250');
  const tronicsBoostIICost = parseInt(localStorage.getItem('tronics_boost_II_cost') || '750');
  const hasQuantumTap = localStorage.getItem('quantum_tap_purchased') === 'true';
  const hasTronicsBoost = localStorage.getItem('unlocked_tronics_boost') === 'true';

  return (
    <div className="store-container">
      <div className="store-header">
        <h2>Electro Store</h2>
        <button onClick={onBack}>Close</button>
      </div>
      <div className="store-tabs">
        <button 
          className={`store-tab ${section === 'average' ? 'active' : ''}`}
          onClick={() => setSection('average')}
        >
          Average
        </button>
        <button 
          className={`store-tab ${section === 'premium' ? 'active' : ''}`}
          onClick={() => setSection('premium')}
        >
          Premium
        </button>
      </div>
      <div className="store-items">
        {section === 'average' && (
          <>
            <button
              className={`store-item ${!localStorage.getItem('unlocked_tronics_boost') ? 'locked' : tronics < 250 ? 'disabled' : ''}`}
              onClick={() => {
                if (!localStorage.getItem('unlocked_tronics_boost')) {
                  if (electroShards >= 3) {
                    onBuyTronicsBoost();
                    localStorage.setItem('unlocked_tronics_boost', 'true');
                  }
                } else if (tronics >= tronicsBoostCost) {
                  onBuyTronicsBoost();
                }
              }}
              disabled={!localStorage.getItem('unlocked_tronics_boost') ? electroShards < 3 : tronics < tronicsBoostCost}
            >
              <div className="item-header">
                <strong>⚡ Tronics Click Boost I</strong>
              </div>
              <div>{tronicsBoostCost} Tronics</div>
              <div className="item-info">
                {!localStorage.getItem('unlocked_tronics_boost') ? (
                  <>
                    <p className="locked-message">🔒 Locked - Pay 3 Electro Shards to unlock</p>
                    <p className="unlocked-preview">Once unlocked: +1 Tronics per click (Costs 250 Tronics)</p>
                  </>
                ) : (
                  <>
                    <p>+1 Tronics per click</p>
                    <p className="owned">Owned: {localStorage.getItem('tronics_boost_count') || 0}</p>
                  </>
                )}
              </div>
            </button>

            <button
              className={`store-item ${!localStorage.getItem('unlocked_tronics_boost') || !localStorage.getItem('tronics_boost_count') ? 'locked' : tronics < tronicsBoostIICost ? 'disabled' : ''}`}
              onClick={() => {
                if (localStorage.getItem('unlocked_tronics_boost') && localStorage.getItem('tronics_boost_count') && tronics >= tronicsBoostIICost) {
                  const boostCount = parseInt(localStorage.getItem('tronics_boost_II_count') || '0');
                  const newBoostCount = boostCount + 1;
                  localStorage.setItem('tronics_boost_II_count', newBoostCount);

                  const currentCost = parseInt(localStorage.getItem('tronics_boost_II_cost') || '750');
                  const newCost = Math.floor(currentCost * 1.2);
                  localStorage.setItem('tronics_boost_II_cost', newCost);

                  setTronics(prev => prev - currentCost);
                  setNotifications(prev => [...prev, "Tronics Click Boost II purchased! +2 Tronics per click"]);
                }
              }}
              disabled={!localStorage.getItem('unlocked_tronics_boost') || !localStorage.getItem('tronics_boost_count') || tronics < tronicsBoostIICost}
            >
              <div className="item-header">
                <strong>⚡ Tronics Click Boost II</strong>
              </div>
              <div>{tronicsBoostIICost} Tronics</div>
              <div className="item-info">
                {!localStorage.getItem('unlocked_tronics_boost') || !localStorage.getItem('tronics_boost_count') ? (
                  <>
                    <p className="locked-message">🔒 Locked - Requires Tronics Click Boost I</p>
                    <p className="unlocked-preview">Once unlocked: +2 Tronics per click (Costs {tronicsBoostIICost} Tronics)</p>
                  </>
                ) : (
                  <>
                    <p>+2 Tronics per click</p>
                    <p>Now with extra voltage. May void warranty.</p>
                    <p className="owned">Owned: {localStorage.getItem('tronics_boost_II_count') || 0}</p>
                  </>
                )}
              </div>
            </button>

            <button
              className={`store-item ${!localStorage.getItem('flow_regulator_purchased') ? '' : 'disabled'}`}
              onClick={() => {
                if (tronics >= 3000 && !localStorage.getItem('flow_regulator_purchased')) {
                  setTronics(prev => prev - 3000);
                  localStorage.setItem('flow_regulator_purchased', 'true');
                  localStorage.setItem('globalTronicsMultiplier', '1.1');
                  setNotifications(prev => [...prev, "Flow Regulator purchased! +10% Tronics per click"]);
                }
              }}
              disabled={localStorage.getItem('flow_regulator_purchased') === 'true'}
            >
              <div className="item-header">
                <strong>⚡ Flow Regulator</strong>
              </div>
              <div>3,000 Tronics</div>
              <div className="item-info">
                <p>+10% Tronics per click</p>
                <p className="onetime">One-time purchase</p>
                {localStorage.getItem('flow_regulator_purchased') && <p className="purchased">Already purchased</p>}
              </div>
            </button>

            <button
              className={`store-item ${!hasTronicsBoost ? 'locked' : hasQuantumTap ? 'disabled' : ''}`}
              onClick={() => {
                if (tronics >= 1250 && hasTronicsBoost && !hasQuantumTap) {
                  onBuyQuantumTap();
                  localStorage.setItem('quantum_tap_purchased', 'true');
                  setNotifications(prev => [...prev, "Quantum Tap Circuit purchased! You now have a 3% chance to get 3x Tronics per click."]);
                }
              }}
              disabled={!hasTronicsBoost || hasQuantumTap || tronics < 1250}
            >
              <div className="item-header">
                <strong>⚡ Quantum Tap Circuit</strong>
              </div>
              <div>1,250 Tronics</div>
              <div className="item-info">
                {!hasTronicsBoost ? (
                  <>
                    <p className="locked-message">🔒 Locked - Requires Tronics Click Boost I</p>
                    <p className="unlocked-preview">Once unlocked: 3% chance per click to gain 3x Tronics (Costs 1,250 Tronics)</p>
                  </>
                ) : (
                  <>
                    <p>3% chance per click to gain 3x Tronics</p>
                    <p className="onetime">One-time purchase</p>
                    {hasQuantumTap && <p className="purchased">Already purchased</p>}
                  </>
                )}
              </div>
            </button>

            <button
              onClick={() => {
                if (electroShards >= 2 && tronics >= 10000 && localStorage.getItem('tronics_boost_II_count') && !localStorage.getItem('high_freq_tap_purchased')) {
                  setTronics(prev => prev - 10000);
                  localStorage.setItem('electroShards', electroShards - 2);
                  localStorage.setItem('high_freq_tap_purchased', 'true');
                  setNotifications(prev => [...prev, 'High-Frequency Tap Chip installed!']);
                }
              }}
              disabled={electroShards < 2 || tronics < 10000 || !localStorage.getItem('tronics_boost_II_count') || localStorage.getItem('high_freq_tap_purchased') === 'true'}
              className={`store-item ${!localStorage.getItem('tronics_boost_II_count') ? 'locked' : ''}`}
            >
              <div className="item-header">
                <strong>⚡ High-Frequency Tap Chip</strong>
              </div>
              <div className="item-info">
                {!localStorage.getItem('tronics_boost_II_count') ? (
                  <>
                    <p className="locked-message">🔒 Locked - Requires Tronics Boost II</p>
                    <p className="unlocked-preview">Once unlocked: Clicker fires twice per manual click (Costs 10,000 Tronics and 2 Electro Shards)</p>
                  </>
                ) : localStorage.getItem('high_freq_tap_purchased') === 'true' ? (
                  <p>Already purchased!</p>
                ) : (
                  <>
                    <p>Clicker fires twice per manual click</p>
                    <p>Cost: 10,000 Tronics and 2 Electro Shards</p>
                    <p>One-time purchase</p>
                  </>
                )}
              </div>
            </button>
          </>
        )}
        {section === 'premium' && (
          <div className="store-items">
            <button
              className={`store-item ${!localStorage.getItem('electro_surge_node_purchased') ? (tronics < 35000 || electroShards < 8 ? 'disabled' : '') : 'disabled'}`}
              onClick={() => {
                if (tronics >= 35000 && electroShards >= 8 && !localStorage.getItem('electro_surge_node_purchased')) {
                  setTronics(prev => prev - 35000);
                  onRemoveElectroShard(8);
                  localStorage.setItem('electro_surge_node_purchased', 'true');
                  localStorage.setItem('surge_duration_bonus', '5');
                  setNotifications(prev => [...prev, "⚡ Electro Surge Node installed! All surge durations increased by 5 seconds."]);
                }
              }}
              disabled={localStorage.getItem('electro_surge_node_purchased') || tronics < 35000 || electroShards < 8}
            >
              <div className="item-header">
                <strong>⚡ Electro Surge Node</strong>
               
                {!localStorage.getItem('electro_surge_node_purchased') ? (
                  <>
                    <p>35,000 Tronics + 8 Electro Shards</p>
                  </>
                ) : (
                  <p>Purchased</p>
                )}
              </div>
              <div className="item-info">
                <p>Increases all Surge durations by +5 seconds and unlocks tronics surge</p>
                 <p>Cost: 35,000 Tronics and 8 Electro Shards</p>
                 <p>One-time purchase</p>
                <p className="flavor-text">"Let it surge. Let it ride."</p>
              </div>
            </button>
            <button
              className={`store-item ${parseInt(localStorage.getItem('beaconCount') || '0') < 10 || localStorage.getItem('beacon_core_purchased') || tronics < 500000 || electroShards < 15 ? 'disabled' : ''}`}
              onClick={() => {
                if (tronics >= 500000 && electroShards >= 15 && !localStorage.getItem('beacon_core_purchased') && parseInt(localStorage.getItem('beaconCount') || '0') >= 10) {
                  setTronics(prev => prev - 500000);
                  onRemoveElectroShard(15);
                  localStorage.setItem('beacon_core_purchased', 'true');
                  setNotifications(prev => [...prev, "⚡ Electro Beacon Core installed! Electro Shard spawn time decreased by 25%"]);
                  window.dispatchEvent(new Event('storage'));
                }
              }}
            disabled={localStorage.getItem('beacon_core_purchased') || tronics < 500000 || electroShards < 14}
            >
              <div className="item-header">
                <strong>🔦 Electro Beacon Core</strong>
              </div>
              <div>
                {!localStorage.getItem('beacon_core_purchased') ? (
                  <>
                    <p>500k Tronics + 15 Electro Shards</p>
                  </>
                ) : (
                  <p>Purchased</p>
                )}
              </div>
              <div className="item-info">
                {parseInt(localStorage.getItem('beaconCount') || '0') < 10 ? (
                  <>
                    <p className="locked-message">🔒 Locked - Requires 10 Electro Shard Beacons</p>
                    <p className="unlocked-preview">Once unlocked: Decrease Electro Shard floating pickup spawn time by 25%</p>
                  </>
                ) : (
                  <>
                    <p>Decrease Electro Shard floating pickup spawn time by 25%</p>
                    <p>A signal amplifier recovered from the core of a fallen tech temple. When active, the frequency of rare Electro Shard pickups increases significantly.</p>
                    <p className="onetime">One-time purchase</p>
                    {localStorage.getItem('beacon_core_purchased') && <p className="purchased">Already purchased</p>}
                  </>
                )}
              </div>
            </button>

            <button
              className={`store-item ${!localStorage.getItem('unlocked_tronics_boost') || tronics < 25000 || electroShards < 5 || (parseInt(localStorage.getItem('circuit_optimization_count') || '0') >= 4) ? 'disabled' : ''}`}
              onClick={() => {
                if (tronics >= parseInt(localStorage.getItem('circuit_optimization_cost') || '25000') && electroShards >= 5 && (parseInt(localStorage.getItem('circuit_optimization_count') || '0') < 4)) {
                  const currentCost = parseInt(localStorage.getItem('circuit_optimization_cost') || '25000');
                  const currentCount = parseInt(localStorage.getItem('circuit_optimization_count') || '0');

                  if (tronics >= currentCost && electroShards >= 5) {
                    setTronics(prev => prev - currentCost);
                    onRemoveElectroShard(5);

                    const newCount = currentCount + 1;
                    localStorage.setItem('circuit_optimization_count', newCount);

                    const newCost = Math.floor(currentCost * 1.2);
                    localStorage.setItem('circuit_optimization_cost', newCost);

                    setNotifications(prev => [...prev, "Circuit Optimization Unit installed! Global Junk/sec increased by 25%"]);

                    // Trigger state update
                    window.dispatchEvent(new Event('storage'));
                  } else {
                    if (tronics < currentCost) {
                      setNotifications(prev => [...prev, "Not enough Tronics!"]);
                    } else {
                      setNotifications(prev => [...prev, "Not enough Electro Shards! Need 5 shards."]);
                    }
                  }
                }
              }}
              title="More junk. Same scrap. Just optimized."
            >
              <div className="item-header">
                <strong>🧠 Circuit Optimization Unit</strong>
              </div>
              <div>{localStorage.getItem('circuit_optimization_cost') || 25000} Tronics + 5 Electro Shards</div>
              <div className="item-info">
                <p>An overclocked mesh of recycled processors fine-tunes your entire junk economy.</p>
                <p>Enhances all passive Junk/sec sources with a 25% production boost. This upgrade is ideal for idle-focused builds and synergizes well with helper scaling.</p>
                <p className="owned">Owned: {localStorage.getItem('circuit_optimization_count') || 0}/4</p>
              </div>
            </button>
            
          </div>
        )}
      </div>
    </div>
  );
}