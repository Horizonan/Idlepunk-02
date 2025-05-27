
import React, { useEffect, useState } from 'react';
import './VersionPopup.css';

export default function VersionPopup({ onClose }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hasSeenUpdate = localStorage.getItem('seen_update_0.0.7/1');
    if (!hasSeenUpdate) {
      setShow(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('seen_update_0.0.7/1', 'true');
    setShow(false);
    if (onClose) {
      onClose();
    }
  };

  if (!show) return null;

  return (
          <div className="version-popup-overlay">
            <div className="version-popup">
              <h2>🎮 New Version Available: 0.1</h2>
              <div className="version-content">
                <h3>What's New:</h3>
                <ul>
                  <li>✨ Full Junk Store & Tronics Store Rework</li>
                  <li>👥 Crew System, Emails & Mini Games</li>
                  <li>🛠️ 10x Purchases, UI Fixes & Sticky Elements</li>
                  <li>📦 New Items, Events & Lore Fragment</li>
                </ul>
                <p>Check the Changelog for full details or join the Discord!</p>
          <div className="discord-section">
            <p>Join our Discord community to share feedback and suggestions!</p>
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
