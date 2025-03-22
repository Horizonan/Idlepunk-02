
import React from 'react';

export default function Changelog({ onClose }) {
  return (
    <div className="store-container changelog-menu">
      <div className="changelog-header">
        <h2>Changelog</h2>
        <button onClick={onClose}>Close</button>
      </div>
      <div className="changelog-content">
        <div className="changelog-entry">
          <h3>🔧 IdlePunks – Update Log v0.0.2 (Latest Patch)</h3>
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
            <p className="changelog-detail">– Increased in size and now fully draggable — enjoy some junky mobility!</p>

            <p>✅ Store Menu Persistence</p>
            <p className="changelog-detail">– The store now remains open after restart and can stay open even without a selected store item.</p>

            <p>✅ New Prestige Quest Line (WIP)</p>
            <p className="changelog-detail">– A brand-new quest line has been added to guide players toward Ascension.</p>
            <p className="changelog-detail">Only the first quest is functional for now — more will follow soon!</p>

            <p>✅ Item Inventory Refactor</p>
            <p className="changelog-detail">– Inventory system now properly uses ItemInventory.jsx structure for cleaner performance and better modularity.</p>

            <p>✅ New Stats Panel in Settings Menu</p>
            <p className="changelog-detail">– Added a section to view your current play stats and progress.</p>

            <p>✅ Reset Progress Button Added</p>
            <p className="changelog-detail">– You can now manually reset your save and start a fresh junk empire whenever you want.</p>
          </div>

          <p className="changelog-footer">Thanks again for all the feedback and support — this version is a big step forward.<br/>
          More polish, the rest of the prestige quest line, and visual milestone fixes coming soon!</p>
        </div>
      </div>
    </div>
  );
}
