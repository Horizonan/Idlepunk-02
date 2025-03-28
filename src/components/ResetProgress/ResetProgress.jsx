
import React from 'react';
import { resetAllProgress } from '../../utils/resetProgress';
import './ResetProgress.css';

export default function ResetProgress() {
  const handleReset = () => {
    const confirmation = window.confirm('WARNING: This will permanently delete ALL progress including:\n\n' +
      '- All junk and resources\n' +
      '- All upgrades and items\n' +
      '- All achievements and quests\n' +
      '- All crafting materials\n' +
      '- All automation progress\n\n' +
      'This action cannot be undone! Are you sure?');
    
    if (confirmation) {
      resetAllProgress();
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
