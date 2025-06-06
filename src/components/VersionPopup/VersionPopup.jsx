import React, { useEffect, useState } from 'react';
import './VersionPopup.css';

export default function VersionPopup({ onClose }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hasSeenUpdate = localStorage.getItem('seen_update_0.1.0.3');
    if (!hasSeenUpdate) {
      setShow(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('seen_update_0.1.0.3', 'true');
    setShow(false);
    if (onClose) {
      onClose();
    }
  };

  if (!show) return null;

  return (
    <div className="version-popup-overlay">
      <div className="version-popup">
        <h2>🧨 New Version Available: 0.1.0.3</h2>
        <div className="version-content">
          <h3>What's New:</h3>
          <ul>
            <li>🐛 Fixed massive lag bug in Crew System</li>
            <li>🖥️ New designs: Autoclickers, Trash Bonus & Crew Intro</li>
            <li>⚔️ Scraptagon Prototype: Stage Select, Rewards, Winstreak</li>
            <li>📜 Quest updates & new placeholder in Awaken the Core</li>
            <li>⚙️ Force Prestige + Scratz Miner Offline Progress</li>
          </ul>
          <p>Full details in the in-game changelog. Thanks for helping improve IdlePunk!</p>
          <div className="discord-section">
            <p>Join the Discord to share feedback or report bugs:</p>
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
