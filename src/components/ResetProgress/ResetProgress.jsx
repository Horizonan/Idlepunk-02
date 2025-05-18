import React, { useState } from 'react';
import './ResetProgress.css';
import { useCrystalZustand } from '../../utils/crystalZustand';
import { useEmailStore } from '../../utils/emailStore';

const defaultAchievements = []; // Add default achievements array

export default function ResetProgress({ onReset }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleReset = () => {
    // Clear ALL localStorage items
    localStorage.clear();

    // Reset specific game states to ensure complete cleanup
    localStorage.setItem('clickCount', '0');
    localStorage.setItem('junk', '0');
    localStorage.setItem('credits', '0');
    localStorage.setItem('tronics', '0');
    localStorage.setItem('electroShards', '0');
    localStorage.setItem('clickMultiplier', '1');
    localStorage.setItem('passiveIncome', '0');
    localStorage.setItem('autoClicks', '0');
    localStorage.setItem('permanentAutoClicks', '0');
    localStorage.setItem('globalJpsMultiplier', '1');
    localStorage.setItem('surgeCount', '0');
    localStorage.setItem('beaconCount', '0');
    localStorage.setItem('prestigeCount', '0');
    localStorage.setItem('skillLevels', JSON.stringify({
      scavengingFocus: 0,
      greaseDiscipline: 0
    }));
    localStorage.setItem('ownedItems', JSON.stringify({}));
    localStorage.setItem('craftingInventory', JSON.stringify({}));
    localStorage.setItem('achievements', JSON.stringify(defaultAchievements)); // Set achievements to default
    localStorage.removeItem('email-storage'); // Clear email storage
    localStorage.removeItem('crystal-storage'); // Clear crystal timer storage

    // Reset Zustand stores and their storages
    useCrystalZustand.getState().setShowCrystal(false);
    useCrystalZustand.getState().setHasChronoCrystalTimer(false);
    useCrystalZustand.persist.clearStorage();
    
    useEmailStore.getState().emails = [];
    useEmailStore.getState().latestEmail = null;
    useEmailStore.persist.clearStorage();

    //Force page reload to ensure all states are reset
    window.location.reload();
  };

  return (
    <div className="reset-section">
      <h3>Reset Progress</h3>
      <p className="reset-warning">Warning: This will permanently delete all your progress!</p>
      <button 
        className="reset-button"
        onClick={() => setShowConfirm(true)}
      >
        Reset All Progress
      </button>

      {showConfirm && (
        <div className="reset-confirm-overlay">
          <div className="reset-confirm-popup">
            <h4>Are you sure?</h4>
            <p>This action cannot be undone!</p>
            <div className="reset-confirm-buttons">
              <button onClick={handleReset}>Yes, Reset Everything</button>
              <button onClick={() => setShowConfirm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}