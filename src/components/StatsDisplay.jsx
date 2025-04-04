
import React from 'react';

export default function StatsDisplay({ credits, junk, passiveIncome, globalJpsMultiplier, autoClicks, clickMultiplier, tronics, electroShards, permanentAutoClicks }) {
  const hasPrestiged = localStorage.getItem('hasPrestiged') === 'true';
  
  // Get next quest
  const getNextQuest = () => {
    const questChecks = [
      { title: "First Steps", condition: () => !localStorage.getItem('quest_sync_First Steps'), task: "Click the trash" },
      { title: "Shopping Time", condition: () => !localStorage.getItem('quest_sync_Shopping Time'), task: "Buy an upgrade" },
      { title: "Tool Master", condition: () => !localStorage.getItem('quest_sync_Tool Master'), task: "Increase click multiplier" },
      { title: "Passive Income", condition: () => !localStorage.getItem('quest_sync_Passive Income'), task: "Get passive income" },
      { title: "Automation Punk", condition: () => !localStorage.getItem('quest_sync_Automation Punk'), task: "Get 10 autoclickers" },
      { title: "Prestige Ready", condition: () => !localStorage.getItem('quest_sync_Prestige Ready'), task: "Reach 1M junk" }
    ];
    
    return questChecks.find(quest => quest.condition())?.task || "All basic quests complete!";
  };

  const tronicsPerSecond = hasPrestiged ? ((autoClicks + permanentAutoClicks) * (
    (parseInt(localStorage.getItem('tronics_boost_count') || '1')) + 
    (parseInt(localStorage.getItem('tronics_boost_II_count') || '1') * 2)
  )) : 0;

  return (
    <div className="stats">
      <p>Money: {credits.toFixed(2)}C</p>
      <p>Junk: {Math.floor(junk).toLocaleString('en-US', {maximumFractionDigits: 0})}</p>
      <p>Junk/sec: {Math.floor((passiveIncome * globalJpsMultiplier) + ((autoClicks + permanentAutoClicks) * clickMultiplier)).toLocaleString('en-US', {maximumFractionDigits: 0})}</p>
      {hasPrestiged && (
        <>
          <p>Tronics: {tronics.toFixed(2)}</p>
          <p>Tronics/sec: {tronicsPerSecond.toFixed(1)}</p>
        </>
      )}
      <p className="crystal-shards" title="Requires advanced knowledge to operate. Unlocks after ascension.">
        Electro Shards: {electroShards}
      </p>
      <p className="next-quest" style={{ color: '#00ff00', fontSize: '0.9em', marginTop: '10px', borderTop: '1px solid #333', paddingTop: '10px' }}>
        Next Quest: {getNextQuest()}
      </p>
    </div>
  );
}
