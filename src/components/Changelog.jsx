
import React, { useState } from 'react';

export default function Changelog({ onClose }) {
  const [expandedLogs, setExpandedLogs] = useState(['0.0.3']);

  const toggleChangelog = (version) => {
    setExpandedLogs(prev => 
      prev.includes(version) 
        ? prev.filter(v => v !== version)
        : [...prev, version]
    );
  };

  return (
    <div className="store-container changelog-menu">
      <div className="changelog-header">
        <h2>Changelog</h2>
        <button onClick={onClose}>Close</button>
      </div>
      <div className="changelog-content">
        <div className="changelog-entry">
          <h3 onClick={() => toggleChangelog('0.0.3')} style={{ cursor: 'pointer' }}>
            🔧 IdlePunks – Update Log v0.0.3 {expandedLogs.includes('0.0.3') ? '▼' : '▶'}
          </h3>
          {expandedLogs.includes('0.0.3') && (
            <>
              <p>Hey scavengers! Version 0.0.3 is now live with a bunch of improvements, fixes, and new systems:</p>
              <div className="changelog-section">
                <p>✅ Complete Prestige Quest Line Implemented</p>
                <p>✅ Fixed adjustable Store Menu sizing issue</p>
                <p>✅ Item Inventory overflow on large screens resolved</p>
                <p>✅ Unified UI Close Buttons</p>
                <p className="changelog-detail">– All 'Back' buttons changed to 'Close' and moved to top right</p>
                <p>✅ News Ticker glitch fix</p>
                <p className="changelog-detail">– No more mid-screen message swaps (hopefully!)</p>
                <p>✅ Added more News Ticker flavor lines</p>
                <p>✅ Electro Shop now locked until Prestige unlock</p>
                <p>✅ Slot machine popup now integrated into UI</p>
                <p>✅ Removed leftover German notification texts</p>
                <p>✅ Fixed Prestige button disappearing bug</p>
                <p>✅ Minor Crafting System rework & visual polish</p>
                <p>✅ Reworked Cheat Menu with new testing tools</p>
                <p>✅ New flying trash pickup added</p>
                <p>✅ Credit conversion system overhauled</p>
                <p className="changelog-detail">– Now fixed at 100k Junk → 1 Credit</p>
                <p>✅ New Credit Store item: Electro Shard Beacon</p>
                <p className="changelog-detail">– Reduces shard spawn time</p>
                <p>✅ Added visuals for the Electro Shard Beacon</p>
              </div>
              <p className="changelog-footer">Thanks again for playing and sharing your feedback — it really helps shape each version. More content and polish coming soon! 🚀</p>
            </>
          )}
        </div>

        <div className="changelog-entry">
          <h3 onClick={() => toggleChangelog('0.0.2')} style={{ cursor: 'pointer' }}>
            🔧 IdlePunks – Update Log v0.0.2 {expandedLogs.includes('0.0.2') ? '▼' : '▶'}
          </h3>
          {expandedLogs.includes('0.0.2') && (
            <>
              <p>Hey scavengers, here's what's new in the latest version of IdlePunks:</p>
              <div className="changelog-section">
                <p>✅ Prestige Button Tooltip Fix</p>
                <p className="changelog-detail">– The tooltip text now displays properly without overflow.</p>
                <p>✅ UI Alignment Improvements</p>
                <p className="changelog-detail">– Several interface elements have been visually realigned for a more consistent layout.</p>
                <p>✅ Milestone System Logic Rework</p>
                <p className="changelog-detail">– Milestones now check independently rather than in sequence.</p>
                <p className="changelog-warning">⚠️ Visual display bugs remain: some unlocked milestones may still appear inactive.</p>
                <p>✅ Slot Machine Improvements</p>
                <p className="changelog-detail">– Increased in size and now fully draggable</p>
                <p>✅ Store Menu Persistence</p>
                <p className="changelog-detail">– The store now remains open after restart</p>
                <p>✅ New Prestige Quest Line (WIP)</p>
                <p className="changelog-detail">– A brand-new quest line has been added to guide players toward Ascension.</p>
                <p>✅ Item Inventory Refactor</p>
                <p className="changelog-detail">– Inventory system now properly uses ItemInventory.jsx structure</p>
                <p>✅ New Stats Panel in Settings Menu</p>
                <p className="changelog-detail">– Added a section to view your current play stats and progress.</p>
                <p>✅ Reset Progress Button Added</p>
                <p className="changelog-detail">– You can now manually reset your save and start fresh</p>
              </div>
              <p className="changelog-footer">Thanks again for all the feedback and support — this version is a big step forward.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
