
import React from 'react';
import { resetAllProgress } from '../../utils/resetProgress';
import './ResetProgress.css';

export default function ResetProgress() {
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone!')) {
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
