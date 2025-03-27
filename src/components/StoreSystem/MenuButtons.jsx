import { useState, useEffect } from 'react';

export default function MenuButtons({ onStoreSelect, showInventory }) {
  const junk = Number(window.localStorage.getItem('junk')) || 0;
  const upgradeCount = Object.keys(JSON.parse(window.localStorage.getItem('itemCosts') || '{}')).length;
  const automationUnlocked = junk >= 2500 || upgradeCount >= 5;

  return (
    <div className="main">
      <button onClick={() => {
        const activeStore = localStorage.getItem('activeStore');
        onStoreSelect(activeStore === 'store' ? null : 'store');
      }}>Visit Store</button>
      {automationUnlocked && (
        <button onClick={() => {
          const activeStore = localStorage.getItem('activeStore');
          onStoreSelect(activeStore === 'automation' ? null : 'automation');
        }}>Visit Automation</button>
      )}
      <button 
        onClick={() => {
          const activeStore = localStorage.getItem('activeStore');
          onStoreSelect(activeStore === 'electrostore' ? null : 'electrostore');
        }}
        className={!localStorage.getItem('hasPrestiged') ? 'locked-store' : ''}
        disabled={!localStorage.getItem('hasPrestiged')}
      >
        Visit ElectroShop {!localStorage.getItem('hasPrestiged') && '🔒'}
      </button>
      <button onClick={() => {
        const activeStore = localStorage.getItem('activeStore');
        onStoreSelect(activeStore === 'credstore' ? null : 'credstore');
      }}>Visit CredStore</button>
      <button onClick={() => {
        const event = new CustomEvent('toggleUpgradeStats');
        window.dispatchEvent(event);
      }}>Upgrade Stats</button>
      <button onClick={() => {
        const activeStore = localStorage.getItem('activeStore');
        onStoreSelect(activeStore === 'craft' ? null : 'craft');
      }}>Craft Items</button>
      {showInventory && <button onClick={() => {
        const activeStore = localStorage.getItem('activeStore');
        onStoreSelect(activeStore === 'inventory' ? null : 'inventory');
      }}>Item Inventory</button>}
    </div>
  );
}