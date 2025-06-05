import React, { useEffect, useState } from 'react';
import './VersionPopup.css';

export default function VersionPopup({ onClose }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hasSeenUpdate = localStorage.getItem('seen_update_0.1.0.2');
    if (!hasSeenUpdate) {
      setShow(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('seen_update_0.1.0.2', 'true');
    setShow(false);
    if (onClose) {
      onClose();
    }
  };

  if (!show) return null;

  return (
    <div className="version-popup-overlay">
      <div className="version-popup">
        <h2>🧩 New Version Available: 0.1.0.2</h2>
        <div className="version-content">
          <h3>What's New:</h3>
          <ul>
            <li>✨ Overcharged Crystal Crafting Indicator</li>
            <li>📊 New Stats: Pickup Times, Junk Collected, Crew Mission Wins</li>
            <li>🎮 New Quest + Pickup Magnet in Tronics Store</li>
            <li>🎨 New Designs: Electro Shard, Drones & Hover Models</li>
            <li>🐞 Major Bug Fix: Junk Refinery crash resolved</li>
          </ul>
          <p>Full changelog in-game — or hop into Discord to share feedback!</p>
          <div className="discord-section">
            <p>Join our Discord community to chat and shape the future of IdlePunk:</p>
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
