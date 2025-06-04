import React, { useEffect, useState } from 'react';
import './VersionPopup.css';

export default function VersionPopup({ onClose }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hasSeenUpdate = localStorage.getItem('seen_update_0.1.0.1');
    if (!hasSeenUpdate) {
      setShow(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('seen_update_0.1.0.1', 'true');
    setShow(false);
    if (onClose) {
      onClose();
    }
  };

  if (!show) return null;

  return (
    <div className="version-popup-overlay">
      <div className="version-popup">
        <h2>🛠️ New Version Available: 0.1.0.1</h2>
        <div className="version-content">
          <h3>What's New:</h3>
          <ul>
            <li>🖥️ Settings UI Rework + Mobile Friendly UI</li>
            <li>👥 Crew Loadouts, Missions & Bug Fixes</li>
            <li>⚡ Electro Store Logic & Tooltip Fixes</li>
            <li>🎞️ Right Side Menu Animation + New Secret Tooltip</li>
          </ul>
          <p>Check the full Changelog for details or join the community on Discord!</p>
          <div className="discord-section">
            <p>Join our Discord to share feedback and ideas!</p>
            <a href="https://discord.gg/xhJbGbJApN" target="_blank" rel="noopener noreferrer" className="discord-button">
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
