import React, { useEffect, useState } from 'react';
import './VersionPopup.css';

export default function VersionPopup({ onClose }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hasSeenUpdate = localStorage.getItem('seen_update_0.1.0.5');
    if (!hasSeenUpdate) {
      setShow(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('seen_update_0.1.0.5', 'true');
    setShow(false);
    if (onClose) {
      onClose();
    }
  };

  if (!show) return null;

  return (
    <div className="version-popup-overlay">
      <div className="version-popup">
        <h2>📦 New Version Available: 0.1.0.5</h2>
        <div className="version-content">
          <h3>What's New:</h3>
          <ul>
            <li>📱 Junk Store & Crew window now mobile friendly</li>
            <li>🧠 GameTips for Surges, Skills Center & Recruitment</li>
            <li>🛠️ Batch Crafting + visible Electro Upgrades</li>
            <li>⚙️ Offline simulation (early version!)</li>
            <li>🐞 Bug fixes for quests, nodes, and crew labels</li>
          </ul>
          <p>See full changelog in-game or share your thoughts on Discord!</p>
          <div className="discord-section">
            <p>Join the Discord to leave feedback or report bugs:</p>
            <a
              href="https://discord.gg/xhJbGbJApN"
              target="_blank"
              rel="noopener noreferrer"
              className="discord-button"
            >
              Join Discord
            </a>
          </div>
        </div>
        <button
          onClick={handleClose}
          className="close-button"
          style={{ display: 'block', visibility: 'visible' }}
        >
          Got it!
        </button>
      </div>
    </div>
  );
}
