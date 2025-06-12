import React from 'react';
import { useFlavorEvents } from '../utils/flavorEventsStore';
import NextQuest from './NextQuest';
import { getJunkBreakdown } from '../utils/junkCalculation';

export default function StatsDisplay({ credits, junk, passiveIncome, globalJpsMultiplier, autoClicks, clickMultiplier, tronics, electroShards, permanentAutoClicks }) {
  const hasPrestiged = localStorage.getItem('hasPrestiged') === 'true';
  const showJunkError = useFlavorEvents(state => state.showJunkError);
  const showQuestRewards = localStorage.getItem('showQuestRewards') !== 'false';

  const tronicsPerSecond = hasPrestiged ? ((autoClicks + permanentAutoClicks) * (
    (parseInt(localStorage.getItem('tronics_boost_count') || '1')) + 
    (parseInt(localStorage.getItem('tronics_boost_II_count') || '1') * 2)
  )) : 0;

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(2)}mil`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(2)}k`;
    }
    return Math.floor(num).toLocaleString();
  };

  // Get effective junk calculation breakdown
  const junkBreakdown = getJunkBreakdown(
    passiveIncome, 
    globalJpsMultiplier, 
    autoClicks + permanentAutoClicks, 
    clickMultiplier
  );

  return (
    <div className="stats">
      <p>Scratz: {Math.floor(credits).toLocaleString('en-US', {maximumFractionDigits: 0})} </p>
      <p>Junk: {showJunkError ? "ERROR" : Math.floor(junk).toLocaleString('en-US', {maximumFractionDigits: 0})}</p>
      <div className="stat-item">
          <span className="stat-label">Junk/sec:</span>
          <span className="stat-value">
            {formatNumber(Math.floor(junkBreakdown.effectiveJunk))}
            {junkBreakdown.totalConsumption > 0 && (
              <span style={{ color: '#FF4444' }}>
                (-{formatNumber(junkBreakdown.totalConsumption)})
              </span>
            )}
          </span>
        </div>
      {hasPrestiged && (
        <>
          <p>Tronics: {Math.floor(tronics).toLocaleString('en-US', {maximumFractionDigits: 0})}</p>
          <p>Tronics/sec: {tronicsPerSecond.toFixed(1)}</p>
        </>
      )}
      <p className="crystal-shards" title="Requires advanced knowledge to operate. Unlocks after ascension.">
        Shards: {electroShards}
      </p>
      {showQuestRewards && <NextQuest />}
    </div>
  );
}