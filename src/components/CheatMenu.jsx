
import React from 'react';

export default function CheatMenu({ onReset, onAddJunk, onClose, onResetTutorial, onNextTutorial }) {
  return (
    <div className="cheat-menu">
      <h2>Cheat Menu</h2>
      <div className="cheat-buttons">
        <button onClick={() => onAddJunk(1000)}>Add 1000 Junk</button>
        <button onClick={() => onAddJunk(10000)}>Add 10000 Junk</button>
        <button onClick={() => onReset('junk')}>Reset Junk</button>
        <button onClick={() => onReset('credits')}>Reset Credits</button>
        <button onClick={() => onReset('achievements')}>Reset Achievements</button>
        <button onClick={onResetTutorial}>Reset Tutorial</button>
        <button onClick={onNextTutorial}>Next Tutorial</button>
        <button onClick={() => window.dispatchEvent(new CustomEvent('triggerSurge'))}>Trigger Surge</button>
        <button onClick={() => window.dispatchEvent(new CustomEvent('nextNews'))}>Next News</button>
        <button onClick={() => window.dispatchEvent(new CustomEvent('slotForceTriple'))}>Force Triple Win</button>
        <button onClick={() => window.dispatchEvent(new CustomEvent('slotForceDouble'))}>Force Double Win</button>
        <button onClick={() => onReset('all')} className="full-width">Reset Everything</button>
        <button onClick={() => {
          const defaultAchievements = [
            {
              title: "Junkie Starter",
              requirement: "Collect 1,000 Junk",
              reward: "+500 Junk",
              flavorText: "Now you're hoarding like a real scavver.",
              unlocked: false,
              checked: false
            },
            {
              title: "The First Clicks",
              requirement: "Click 500 times",
              reward: "+5% Click Power",
              flavorText: "That mouse is starting to look worn...",
              unlocked: false,
              checked: false
            },
            {
              title: "Greasy Milestone",
              requirement: "Reach 10 Junk/sec",
              reward: "+1 Auto Click/sec",
              flavorText: "The gears are turning smoothly now.",
              unlocked: false,
              checked: false
            }
          ];
          localStorage.clear();
          localStorage.setItem('achievements', JSON.stringify(defaultAchievements));
          onReset('all');
          window.location.reload();
        }} style={{backgroundColor: '#800000'}}>Delete Save</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
