
import React from 'react';
import { useFlavorEvents } from '../utils/flavorEventsStore';
import NextQuest from './NextQuest';

export default function StatsDisplay({ credits, junk, passiveIncome, globalJpsMultiplier, autoClicks, clickMultiplier, tronics, electroShards, permanentAutoClicks }) {
  const hasPrestiged = localStorage.getItem('hasPrestiged') === 'true';
  const showJunkError = useFlavorEvents(state => state.showJunkError);
  const showQuestRewards = localStorage.getItem('showQuestRewards') !== 'false';

  const tronicsPerSecond = hasPrestiged ? ((autoClicks + permanentAutoClicks) * (
    (parseInt(localStorage.getItem('tronics_boost_count') || '1')) + 
    (parseInt(localStorage.getItem('tronics_boost_II_count') || '1') * 2)
  )) : 0;

  return (
    <div className="stats">
      <p>Scratz: {Math.floor(credits).toLocaleString('en-US', {maximumFractionDigits: 0})} </p>
      <p>Junk: {showJunkError ? "ERROR" : Math.floor(junk).toLocaleString('en-US', {maximumFractionDigits: 0})}</p>
      <p>Junk/sec: {Math.floor((passiveIncome * globalJpsMultiplier) + ((autoClicks + permanentAutoClicks) * clickMultiplier)).toLocaleString('en-US', {maximumFractionDigits: 0})}</p>
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
