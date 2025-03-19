
import React from 'react';

export default function Settings({ showClickEnhancer, onToggleClickEnhancer, onClose }) {
  return (
    <div className="settings-container">
      <div className="settings-header">
        <h2>Settings</h2>
        <button onClick={onClose}>Close</button>
      </div>
      <div className="settings-options">
        <label className="setting-option">
          <span>Show Click Enhancer Effect</span>
          <input
            type="checkbox"
            checked={showClickEnhancer}
            onChange={onToggleClickEnhancer}
          />
        </label>
      </div>
    </div>
  );
}
