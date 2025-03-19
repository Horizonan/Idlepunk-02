
import { useState } from 'react';

export default function MenuButtons({ onStoreSelect }) {
  const junk = Number(window.localStorage.getItem('junk')) || 0;
  const upgradeCount = Object.keys(JSON.parse(window.localStorage.getItem('itemCosts') || '{}')).length;
  const automationUnlocked = junk >= 2500 || upgradeCount >= 5;
  
  return (
    <div className="main">
      <button onClick={() => onStoreSelect('store')}>Visit Store</button>
      {automationUnlocked && (
        <button onClick={() => onStoreSelect('automation')}>Automation Store</button>
      )}
      <button onClick={() => onStoreSelect('electrostore')}>Visit ElectroShop</button>
      <button onClick={() => onStoreSelect('credstore')}>Visit CredStore</button>
      <button onClick={() => onStoreSelect('stats')}>Upgrade Stats</button>
      <button onClick={() => onStoreSelect('craft')}>Craft Items</button>
    </div>
  );
}
