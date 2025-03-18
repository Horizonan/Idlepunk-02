
import { useState } from 'react';

export default function MenuButtons({ onStoreSelect }) {
  return (
    <div className="main">
      <button onClick={() => onStoreSelect('store')}>Visit Store</button>
      <button onClick={() => onStoreSelect('electrostore')}>Visit ElectroShop</button>
      <button onClick={() => onStoreSelect('credstore')}>Visit CredStore</button>
      <button onClick={() => onStoreSelect('stats')}>Upgrade Stats</button>
      <button onClick={() => onStoreSelect('craft')}>Craft Items</button>
    </div>
  );
}
