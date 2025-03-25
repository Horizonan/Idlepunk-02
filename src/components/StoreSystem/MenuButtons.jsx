import { useState, useEffect } from 'react';

export default function MenuButtons({ onStoreSelect, showInventory }) {
  const junk = Number(window.localStorage.getItem('junk')) || 0;
  const upgradeCount = Object.keys(JSON.parse(window.localStorage.getItem('itemCosts') || '{}')).length;
  const automationUnlocked = junk >= 2500 || upgradeCount >= 5;

  return (
    <div className="main">
      <button onClick={() => onStoreSelect('store')}>Visit Store</button>
      {automationUnlocked && (
        <button onClick={() => onStoreSelect('automation')}>Visit Automation</button>
      )}
      <button 
        onClick={() => onStoreSelect('electrostore')}
        className={!localStorage.getItem('hasPrestiged') ? 'locked-store' : ''}
        disabled={!localStorage.getItem('hasPrestiged')}
      >
        Visit ElectroShop {!localStorage.getItem('hasPrestiged') && '🔒'}
      </button>
      <button onClick={() => onStoreSelect('credstore')}>Visit CredStore</button>
      <button onClick={() => setShowUpgradeStats(true)}>Upgrade Stats</button>
      <button onClick={() => onStoreSelect('craft')}>Craft Items</button>
      {showInventory && <button onClick={() => onStoreSelect('inventory')}>Item Inventory</button>}
    </div>
  );
}