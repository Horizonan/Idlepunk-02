
import React, { useEffect, useState } from 'react';
import './VersionPopup.css';

export default function VersionPopup({ onClose }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hasSeenUpdate = localStorage.getItem('seen_update_0.0.4.5/2');
    if (!hasSeenUpdate) {
      setShow(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('seen_update_0.0.4.5/2', 'true');
    setShow(false);
    onClose();
  };

  if (!show) return null;

  return (
    <div className="version-popup-overlay">
      <div className="version-popup">
        <h2>🎮 New Version Available: 0.0.4.5/2</h2>
        <div className="version-content">
          <h3>What's New:</h3>
          <ul>
            <li>✨ Added new Prestige button tooltip</li>
            <li>✨ Added Tronics Clicker tooltip</li>
            <li>✨ Added Quest Log animation at 1M Junk</li>
            <li>🔧 Fixed Cogfather's First Secret achievement</li>
            <li>🔋 Added Shard Miner v0.1</li>
          </ul>
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
