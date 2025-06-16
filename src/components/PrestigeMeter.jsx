import React from 'react';
import '../styles/PrestigeMeter.css';
import { getQuestProgress } from '../utils/questValidation';

const PrestigeMeter = ({ 
  junk, 
  tronics = 0,
  scratz = 0,
  electroShards = 0,
  quantumFlux = 0,
  prestigeCount = 0, 
  onPrestige, 
  showPrestigeMeter = true,
  craftingInventory = {}
}) => {
  if (!showPrestigeMeter) return null;

  // Get current quest progress
  const gameState = {
    junk,
    tronics,
    scratz,
    electroShards,
    quantumFlux,
    prestigeCount,
    craftingInventory
  };

  const questProgress = getQuestProgress(gameState);

  // Define crystal requirements based on prestige level
  const getCrystalRequirements = (prestige) => {
    switch(prestige) {
      case 0:
        return {
          name: 'Ascension Crystal',
          requirements: {
            'Scrap Core': 1,
            'Wires': 10,
            'Metal Plates': 5
          },
          threshold: 500000
        };
      case 1:
        return {
          name: 'Enhanced Ascension Crystal',
          requirements: {
            'Glitched Scrap Core': 1,
            'Encrypted Coil': 1,
            'Surge Capacitor': 1
          },
          threshold: 100000 // tronics
        };
      case 2:
        return {
          name: 'Leadership Crystal',
          requirements: {
            'Leadership Matrix': 1,
            'Advanced Core': 1,
            'Echo Helmet': 1
          },
          threshold: 50000 // scratz
        };
      case 3:
        return {
          name: 'Mastery Crystal',
          requirements: {
            'Transcendence Catalyst': 1,
            'Enlightenment Core': 1,
            'Perfection Matrix': 1
          },
          threshold: 25000 // electroShards
        };
      case 4:
        return {
          name: 'Ultimate Crystal',
          requirements: {
            'Ultimate Catalyst': 1,
            'Impossibility Core': 1,
            'Perfect Form': 1
          },
          threshold: 50000 // quantumFlux
        };
      default:
        return {
          name: 'Transcendence Crystal',
          requirements: {},
          threshold: Infinity
        };
    }
  };

  const crystalInfo = getCrystalRequirements(prestigeCount);

  // Check if player has required materials
  const hasRequiredMaterials = Object.entries(crystalInfo.requirements).every(
    ([material, required]) => (craftingInventory[material] || 0) >= required
  );

  // Calculate progress based on prestige level
  const getCurrentResource = () => {
    switch(prestigeCount) {
      case 0: return junk;
      case 1: return tronics;
      case 2: return scratz;
      case 3: return electroShards;
      case 4: return quantumFlux;
      default: return 0;
    }
  };

  const currentResource = getCurrentResource();
  const progress = Math.min((currentResource / crystalInfo.threshold) * 100, 100);
  const canPrestige = currentResource >= crystalInfo.threshold && hasRequiredMaterials;

  return (
    <div className="prestige-meter-container">
      <div className="prestige-meter">
        <div className="prestige-info">
          <span className="prestige-level">
            {questProgress.header} (P{prestigeCount})
          </span>
          <span className="prestige-progress">
            {currentResource.toLocaleString()} / {crystalInfo.threshold.toLocaleString()}
          </span>
        </div>

        <div className="prestige-bar">
          <div 
            className="prestige-fill" 
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="quest-progress">
          <span>Quest Progress: {questProgress.completed}/{questProgress.total}</span>
          <div className="quest-bar">
            <div 
              className="quest-fill" 
              style={{ width: `${questProgress.percentage}%` }}
            />
          </div>
        </div>

        <div className="crystal-requirements">
          <span className="crystal-name">Next: {crystalInfo.name}</span>
          <div className="materials-list">
            {Object.entries(crystalInfo.requirements).map(([material, required]) => {
              const owned = craftingInventory[material] || 0;
              const hasEnough = owned >= required;
              return (
                <span 
                  key={material} 
                  className={`material ${hasEnough ? 'has-enough' : 'needs-more'}`}
                >
                  {material}: {owned}/{required}
                </span>
              );
            })}
          </div>
        </div>

        {canPrestige && (
          <button 
            className="prestige-button available"
            onClick={onPrestige}
          >
            🔮 CRAFT {crystalInfo.name.toUpperCase()}
          </button>
        )}

        {!canPrestige && (
          <button 
            className="prestige-button disabled"
            disabled
          >
            {currentResource < crystalInfo.threshold 
              ? `Need ${(crystalInfo.threshold - currentResource).toLocaleString()} more`
              : 'Missing Materials'
            }
          </button>
        )}
      </div>
    </div>
  );
};

export default PrestigeMeter;