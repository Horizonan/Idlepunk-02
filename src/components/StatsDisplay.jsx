
import React from 'react';

export default function StatsDisplay({ credits, junk, passiveIncome, globalJpsMultiplier, autoClicks, clickMultiplier, tronics, electroShards }) {
  const hasPrestiged = localStorage.getItem('hasPrestiged') === 'true';

  const tronicsPerSecond = hasPrestiged ? (autoClicks * (
    (parseInt(localStorage.getItem('tronics_boost_count') || '0')) + 
    (parseInt(localStorage.getItem('tronics_boost_II_count') || '0') * 2)
  )) : 0;

  return (
    <div className="stats">
      <p>Money: {credits.toFixed(2)}C</p>
      <p>Junk: {Math.floor(junk).toLocaleString('en-US', {maximumFractionDigits: 0})}</p>
      <p>Junk/sec: {Math.floor((passiveIncome * globalJpsMultiplier) + (autoClicks * clickMultiplier)).toLocaleString('en-US', {maximumFractionDigits: 0})}</p>
      {hasPrestiged && (
        <>
          <p>Tronics: {tronics.toFixed(2)}</p>
          <p>Tronics/sec: {tronicsPerSecond.toFixed(1)}</p>
        </>
      )}
      <p className="crystal-shards" title="Requires advanced knowledge to operate. Unlocks after ascension.">
        Electro Shards: {electroShards}
      </p>
    </div>
  );
}
