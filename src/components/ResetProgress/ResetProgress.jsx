import React, { useState } from 'react';
import './ResetProgress.css';
import { useCrystalZustand } from '../../utils/crystalZustand';
import { useEmailStore } from '../../utils/emailStore';

const defaultAchievements = []; // Add default achievements array

export default function ResetProgress({ onReset }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleReset = () => {
    // First clear all Zustand persistent stores
    useCrystalZustand.persist.clearStorage();
    useEmailStore.persist.clearStorage();

    // Reset Zustand states
    // Clear crystal state
    useCrystalZustand.setState({
      showCrystal: false,
      timeUntilNext: null,
      hasChronoCrystalTimer: false,
      version: 1
    });
    localStorage.removeItem('chrono_crystal_timer_purchased');

    useEmailStore.setState({
      emails: [],
      lastEmailTime: 0,
      latestEmail: null
    });

    // Clear ALL localStorage items
    for (const key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        localStorage.removeItem(key);
      }
    }

    // Set default values
    const defaultValues = {
      'clickCount': '0',
      'junk': '0',
      'credits': '0',
      'tronics': '0',
      'electroShards': '0',
      'clickMultiplier': '1',
      'passiveIncome': '0',
      'autoClicks': '0',
      'permanentAutoClicks': '0',
      'globalJpsMultiplier': '1',
      'surgeCount': '0',
      'beaconCount': '0',
      'prestigeCount': '0',
      'chrono_crystal_timer_purchased': 'false',
      'skillLevels': JSON.stringify({
        scavengingFocus: 0,
        greaseDiscipline: 0
      }),
      'ownedItems': '{}',
      'craftingInventory': '{}',
      'achievements': JSON.stringify(defaultAchievements),
      // Explicitly clear quest-related items
      'quest_sync_Forge the Future': null,
      'quest_sync_Scratz to Riches': null,
      'quest_sync_System Memory Detected': null,
      'quest_sync_Tap the Pulse': null,
      'quest_sync_Upgrade Cascade': null,
      'quest_sync_Beacon Protocol': null,
      'quest_sync_Forge the Overcrystal': null
    };

    // Set all default values
    Object.entries(defaultValues).forEach(([key, value]) => {
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, value);
      }
    });

    // Clear Zustand storage keys explicitly
    localStorage.removeItem('email-storage');
    localStorage.removeItem('crystal-storage');
    localStorage.removeItem('crew-storage');

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