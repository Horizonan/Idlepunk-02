import React, { useEffect, useState } from 'react';
import './VersionPopup.css';

export default function VersionPopup({ onClose }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hasSeenUpdate = localStorage.getItem('seen_update_0.1.2');
    if (!hasSeenUpdate) {
      setShow(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('seen_update_0.1.2', 'true');
    setShow(false);
    if (onClose) {
      onClose();
    }
  };

  if (!show) return null;

  return (
    <div className="version-popup-overlay">
      <div className="version-popup">
        <h2>🎯 New Version Available: 0.1.2</h2>
        <div className="version-content">
          <h3>What's New:</h3>
          <ul>
            <li>👥 New Crew Missions + Gear Duplication Fix</li>
            <li>🏆 Massive Achievement System Overhaul</li>
            <li>📚 Second Lore Fragment added!</li>
            <li>📱 Major UI polish & mobile-friendly info modals</li>
            <li>👁️ Cogfather’s Eye is watching (play at night!)</li>
          </ul>
          <p>See the full changelog in-game or stop by Discord!</p>
          <div className="discord-section">
            <p>Join the Discord to report bugs or share feedback:</p>
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
