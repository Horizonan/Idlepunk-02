
import React from 'react';

export default function Inventory({ credits, junk, tronics, electronicsUnlock, autoClicks, clickMultiplier, onCheat }) {
  return (
    <div className="inventory">
      <p>Money: {credits.toFixed(2)}C</p>
      <p>Junk: {junk}</p>
      <p>AutoClicks/sec: {autoClicks * clickMultiplier}</p>
      {electronicsUnlock && <p className="tronics">Tronics: {tronics.toFixed(3)}</p>}
      <button onClick={onCheat}>Cheat: +1000 Junk</button>
    </div>
  );
}
