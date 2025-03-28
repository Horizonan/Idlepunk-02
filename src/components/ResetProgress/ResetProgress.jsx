
import React from 'react';
import { resetAllProgress } from '../../utils/resetProgress';
import './ResetProgress.css';

export default function ResetProgress() {
  const handleReset = () => {
    const confirmText = 'RESET';
    const userInput = window.prompt(
      'WARNING: This will permanently delete ALL progress!\n\n' +
      'Type RESET (all caps) and click OK to confirm deletion of:\n' +
      '- All junk, credits, and resources\n' +
      '- All upgrades and items\n' +
      '- All achievements and quests\n' +
      '- All crafting materials\n' +
      '- All automation progress\n' +
      '- All skills and levels\n' +
      '- Everything else\n\n' +
      'This action CANNOT be undone!'
    );
    
    if (userInput === confirmText) {
      try {
        resetAllProgress();
      } catch (error) {
        console.error('Reset failed:', error);
        alert('Reset failed! Please refresh the page and try again.');
      }
    } else if (userInput !== null) {
      alert('Reset cancelled - Text did not match "RESET"');
    }
  };

  return (
    <div className="reset-section">
      <p className="reset-warning">Warning: This will permanently delete all your progress!</p>
      <button 
        className="reset-button"
        onClick={handleReset}
      >
        Reset All Progress
      </button>
    </div>
  );
}
