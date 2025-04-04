
import React, { useEffect, useState } from 'react';
import './VersionPopup.css';

export default function VersionPopup({ onClose }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hasSeenUpdate = localStorage.getItem('seen_update_0.0.7');
    if (!hasSeenUpdate) {
      setShow(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('seen_update_0.0.7', 'true');
    setShow(false);
    onClose();
  };

  if (!show) return null;

  return (
    <div className="version-popup-overlay">
      <div className="version-popup">
        <h2>🎮 New Version Available: 0.0.7</h2>
        <div className="version-content">
          <h3>What's New:</h3>
          <ul>
            <li>✨ New Slot Machine Upgrades</li>
            <li>✨ Lots of UI Changes</li>
            <li>🔧 Some Bugfixes</li>
          </ul>
          <p>Check the Changelog for more Information or join the Discord!</p>
          <div className="discord-section">
            <p>Join our Discord community to share feedback and suggestions!</p>
            <a href="https://discord.gg/xhJbGbJApN" target="_blank" rel="noopener noreferrer" className="discord-button">
              Join Discord
            </a>
          </div>
        </div>
        <button onClick={handleClose} className="close-button">Got it!</button>
      </div>
    </div>
  );
}
