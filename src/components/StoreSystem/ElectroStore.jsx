
import React from 'react';

export default function ElectroStore({ electroShards, tronics, onBuyTronicsBoost, onBack }) {
  const tronicsBoostCost = parseInt(localStorage.getItem('tronics_boost_cost') || '250');
  const hasQuantumTap = localStorage.getItem('quantum_tap_purchased') === 'true';
  const hasTronicsBoost = localStorage.getItem('unlocked_tronics_boost') === 'true';
  
  return (
    <div className="store-container">
      <div className="store-header">
        <h2>Electronics Store</h2>
        <button onClick={onBack}>Close</button>
      </div>
      <div className="store-items">
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
                <p>Cost: 250 Tronics</p>
                <p className="owned">Owned: {localStorage.getItem('tronics_boost_count') || 0}</p>
              </>
            )}
          </div>
        </button>

        <button
          className={`store-item ${!localStorage.getItem('unlocked_tronics_boost') || !localStorage.getItem('tronics_boost_count') ? 'locked' : tronics < 750 ? 'disabled' : ''}`}
          onClick={() => {
            if (localStorage.getItem('unlocked_tronics_boost') && localStorage.getItem('tronics_boost_count') && tronics >= 750) {
              const boostCount = parseInt(localStorage.getItem('tronics_boost_II_count') || '0');
              const newBoostCount = boostCount + 1;
              localStorage.setItem('tronics_boost_II_count', newBoostCount);
              setTronics(prev => prev - 750);
              setClickMultiplier(prev => prev + 2);
              setNotifications(prev => [...prev, "Tronics Click Boost II purchased! +2 Tronics per click"]);
            }
          }}
          disabled={!localStorage.getItem('unlocked_tronics_boost') || !localStorage.getItem('tronics_boost_count') || tronics < 750}
        >
          <div className="item-header">
            <strong>⚡ Tronics Click Boost II</strong>
          </div>
          <div>750 Tronics</div>
          <div className="item-info">
            <p>+2 Tronics per click</p>
            <p className="owned">Owned: {localStorage.getItem('tronics_boost_II_count') || 0}</p>
            <p title="Now with extra voltage. May void warranty.">Cost: 750 Tronics</p>
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
            <p>3% chance per click to gain 3x Tronics</p>
            <p className="requirement">Requires Tronics Click Boost I</p>
            <p className="onetime">One-time purchase</p>
            {hasQuantumTap && <p className="purchased">Already purchased</p>}
          </div>
        </button>Uncaught ReferenceError: setTronics is not defined
        at onClick (ElectroStore.jsx:57:15)
        at HTMLUnknownElement.callCallback2 (react-dom_client.js?v=918a011d:3672:22)
        at Object.invokeGuardedCallbackDev (react-dom_client.js?v=918a011d:3697:24)
        at invokeGuardedCallback (react-dom_client.js?v=918a011d:3731:39)
        at invokeGuardedCallbackAndCatchFirstError (react-dom_client.js?v=918a011d:3734:33)
        at executeDispatch (react-dom_client.js?v=918a011d:7014:11)
        at processDispatchQueueItemsInOrder (react-dom_client.js?v=918a011d:7034:15)
        at processDispatchQueue (react-dom_client.js?v=918a011d:7043:13)
        at dispatchEventsForPlugins (react-dom_client.js?v=918a011d:7051:11)
        at react-dom_client.js?v=918a011d:7175:20
      </div>
    </div>
  );
}
