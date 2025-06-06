import React, { useEffect, useState } from 'react';
import './VersionPopup.css';

export default function VersionPopup({ onClose }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hasSeenUpdate = localStorage.getItem('seen_update_0.1.0.4');
    if (!hasSeenUpdate) {
      setShow(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('seen_update_0.1.0.4', 'true');
    setShow(false);
    if (onClose) {
      onClose();
    }
  };

  if (!show) return null;

  return (
    <div className="version-popup-overlay">
      <div className="version-popup">
        <h2>📱 New Version Available: 0.1.0.4</h2>
        <div className="version-content">
          <h3>What's New:</h3>
          <ul>
            <li>🖥️ Major mobile UI updates (Crafting & Skills)</li>
            <li>🐞 Fixed Void Run & mission exploits</li>
            <li>⚖️ Rebalanced Clickers & Enhancer power</li>
            <li>🧠 Added reset recipe button & fire crew popups</li>
          </ul>
          <p>Check the full changelog in-game or drop by Discord!</p>
          <div className="discord-section">
            <p>Join the Discord to share bugs, ideas, and feedback:</p>
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
