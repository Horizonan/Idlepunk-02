import React, { useEffect, useState } from 'react';
import './VersionPopup.css';

export default function VersionPopup({ onClose }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hasSeenUpdate = localStorage.getItem('seen_update_0.1.1');
    if (!hasSeenUpdate) {
      setShow(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('seen_update_0.1.1', 'true');
    setShow(false);
    if (onClose) {
      onClose();
    }
  };

  if (!show) return null;

  return (
    <div className="version-popup-overlay">
      <div className="version-popup">
        <h2>🧹 New Version Available: 0.1.1</h2>
        <div className="version-content">
          <h3>What's New:</h3>
          <ul>
            <li>🐞 Crew + Skills bugs fixed (Prestige resets, reload issues)</li>
            <li>🛍️ Scratz Store now uses tabs like other stores</li>
            <li>🧠 New items: Signal Expander, Auto Recycler, Chrono Regulator</li>
            <li>👥 New Crew minigame: Skills Assessment</li>
            <li>⚙️ Backend cleanup for future content</li>
          </ul>
          <p>See the full changelog in-game or come hang out on Discord!</p>
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
