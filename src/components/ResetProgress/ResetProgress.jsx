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

    // Clear specific game progress items but preserve UI settings
    const gameProgressKeys = [
      'clickCount', 'junk', 'credits', 'tronics', 'electroShards', 'clickMultiplier', 
      'passiveIncome', 'autoClicks', 'permanentAutoClicks', 'globalJpsMultiplier', 
      'surgeCount', 'beaconCount', 'prestigeCount', 'chrono_crystal_timer_purchased',
      'skillLevels', 'ownedItems', 'craftingInventory', 'achievements', 'cogfatherLore',
      'autoClickerV1Count', 'autoClickerV2Count', 'clickEnhancerLevel', 'tutorialStage',
      'itemCosts', 'hasPrestiged', 'electronicsUnlock', 'manualTronicsClicks', 'totalTronicsClicks',
      'globalTronicsMultiplier', 'upgradeCount', 'preservedHelper'
    ];

    // Clear quest-related items
    const questKeys = [
      'quest_sync_Forge the Future', 'quest_sync_Scratz to Riches', 'quest_sync_System Memory Detected',
      'quest_sync_Tap the Pulse', 'quest_sync_Upgrade Cascade', 'quest_sync_Beacon Protocol',
      'quest_sync_Forge the Overcrystal'
    ];

    // Remove specific game progress keys
    gameProgressKeys.forEach(key => localStorage.removeItem(key));
    questKeys.forEach(key => localStorage.removeItem(key));

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
      'autoClickerV1Count': '0',
      'autoClickerV2Count': '0',
      'clickEnhancerLevel': '0',
      'tutorialStage': '0',
      'electronicsUnlock': 'false',
      'hasPrestiged': 'false',
      'manualTronicsClicks': '0',
      'totalTronicsClicks': '0',
      'globalTronicsMultiplier': '1',
      'upgradeCount': '0',
      'skillLevels': JSON.stringify({
        scavengingFocus: 0,
        greaseDiscipline: 0
      }),
      'ownedItems': JSON.stringify({
        trashBag: 0,
        trashPicker: 0,
        streetrat: 0,
        cart: 0,
        junkMagnet: 0,
        urbanRecycler: 0,
        clickEnhancer: 0,
        scrapDrone: 0,
        holoBillboard: 0,
        junkRefinery: 0,
        autoClickerV2: 0,
        autoClickerV1: 0,
        modularScrapper: 0,
        tronicsBoost: 0,
        tronicsBoostII: 0,
        flowRegulator: 0,
        quantumTap: 0,
        electroSurgeNode: 0
      }),
      'craftingInventory': '{}',
      'achievements': JSON.stringify(defaultAchievements),
      'cogfatherLore': JSON.stringify([]),
      'itemCosts': JSON.stringify({
        trashBag: 10,
        trashPicker: 100,
        streetrat: 100,
        cart: 500,
        junkMagnet: 1500,
        urbanRecycler: 3000,
        autoClicker: 5000,
        autoClickerV2: 10000,
        clickEnhancer: 2500,
        scrapDrone: 7500,
        holoBillboard: 15000,
        junkRefinery: 500000,    
        modularScrapper: 2500000,
        tronicsBoost: 250,
        tronicsBoostII: 750,
        flowRegulator: 3000,
        quantumTap: 1250,
        electroSurgeNode: 35000,
        scratzMiner: 250000
      })
    };

    // Set all default values
    Object.entries(defaultValues).forEach(([key, value]) => {
      localStorage.setItem(key, value);
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