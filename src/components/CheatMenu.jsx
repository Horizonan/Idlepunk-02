
import React from 'react';

export default function CheatMenu({ onReset, onAddJunk, onClose, onResetTutorial, onNextTutorial }) {
  return (
    <div className="cheat-menu">
      <h2>Cheat Menu</h2>
      <div className="cheat-buttons">
        <button onClick={() => onAddJunk(1000)}>Add 1000 Junk</button>
        <button onClick={() => onAddJunk(10000)}>Add 10000 Junk</button>
        <button onClick={() => onAddJunk(100000)}>Add 100k Junk</button>
        <button onClick={() => {
          const materials = ['Wires', 'Metal Plates', 'Gear Bits'];
          materials.forEach(material => {
            window.dispatchEvent(new CustomEvent('addMaterial', { 
              detail: { material, amount: 10 }
            }));
          });
        }}>Add Basic Materials</button>
        <button onClick={() => onReset('junk')}>Reset Junk</button>
        <button onClick={() => onReset('credits')}>Reset Credits</button>
        <button onClick={() => onReset('achievements')}>Reset Achievements</button>
        <button onClick={onResetTutorial}>Reset Tutorial</button>
        <button onClick={onNextTutorial}>Next Tutorial</button>
        <button onClick={() => window.dispatchEvent(new CustomEvent('triggerSurge'))}>Trigger Surge</button>
        <button onClick={() => window.dispatchEvent(new CustomEvent('nextNews'))}>Next News</button>
        <button onClick={() => {
          const event = new CustomEvent('showCrystal');
          window.dispatchEvent(event);
        }}>Trigger Crystal</button>
        <button onClick={() => onAddJunk(1000000)}>Add 1M Junk</button>
        <button onClick={() => {
          const stored = localStorage.getItem('electroShards') || '0';
          const current = parseInt(stored);
          localStorage.setItem('electroShards', current + 10);
          window.location.reload();
        }}>Add 10 Crystals</button>
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
