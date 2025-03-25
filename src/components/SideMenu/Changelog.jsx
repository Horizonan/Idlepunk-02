
import React, { useState } from 'react';

export default function Changelog({ onClose }) {
  const [expandedVersion, setExpandedVersion] = useState('0.0.4.2');

  const toggleVersion = (version) => {
    setExpandedVersion(expandedVersion === version ? null : version);
  };

  return (
    <div className="store-container changelog-menu">
      <div className="changelog-header">
        <h2>Changelog</h2>
        <button onClick={onClose}>Close</button>
      </div>
      <div className="changelog-content">

        <div className="changelog-entry">
          <h3 onClick={() => toggleVersion('0.0.4.2')} style={{ cursor: 'pointer' }}>
            🔧 IdlePunks – Update Log 0.0.4.2 {expandedVersion === '0.0.4.2' ? '▼' : '▶'}
          </h3>
          {expandedVersion === '0.0.4.2' && (
            <>
              <p>⚠️ Note: Progress will slow down slightly due to current lack of funding — thank you for your continued support and patience! 💛</p>
              <div className="changelog-section">
                <h3>✅ New Additions</h3>
                <p>✅ Added Shard Extractor to the Credit Store (spawns Electro Shard) </p>
                <p>✅ Added new styling to Credit Store items added after first Ascension</p>
                <p>✅ Added Junk Refinery to the Junk Store (post-prestige)</p>
                <p>✅ Added Modular Scrapper Rig to the Junk Store (post-prestige)</p>
                <p>✅ Added picture and animation for AutoClicker v1</p>
                <p>✅ Added Upgrade Stats Menu with the first two combat skills (passive XP system)</p>
                <h3>⚙️ Improvements & Fixes</h3>
                <p>⚙️ Fixed bug where Tronics appeared pre-prestige</p>
                <p>⚙️ Fixed Reset Button not working</p>
                <p>⚙️ Fixed News Ticker not updating when store purchases are made</p>
                <p>⚙️ Fixed misplaced Credit Exchange button (moved back to correct position)</p>
                <h3>🧼 Code Refactors & Structural Improvements</h3>
                <p>🧼 Added new folder and cleaner dependency structure for Effects system</p>
                <p>🧼 Added new folder and cleaner dependencies for the Side Menu</p>
                <p>🧼 Moved Stats Display out of App.jsx into its own file</p>
                <p>🧼 Moved Settings Menu into a separate component</p>
                <p>🧼 Moved Crafting Store CSS into its own styleshee</p>
                <p>🧪 Possibly broke Achievements in the process (awaiting testing)</p>
                <h3>🚧 Started (Incomplete Features)</h3>
                <p>🚧 Started integrating Auto Clicker v2: NEED HELP ITS NOT WORKING</p>
                <p>🚧 Tronics Click Boost I & II setup started (not fully implemented)</p>
                <p>🚧 Prestige Visual Feedback (flash/glow) planned but not yet in</p>
                <p>🚧 Crafting System refactor in progress (moving to standalone file)</p>
                <p>🚧 ElectroShop started — still buggy / unstable</p>
                <h3>📝 Known Issues</h3>
                <p>⚠️ Achievements may not trigger or save properly (under review)</p>
                <p>⚠️ More code cleanup coming before additional content</p>
                <p>⚠️ Ascension Reclaimer saved item not being saved on reload.</p>
                <p>⚠️ Milestones are still partially broken</p>
                <p>⚠️ Prestige Button only updates after a page reload</p>
                <p>⚠️ Cogfather's Tips are not showing up in the News Ticker.</p>
                <p>⚠️ Started implementation of Auto Clicker Bot v2:

                Still not purchasable.

                Owned bots not displayed correctly.

                No animation on screen.

                No info in hover tooltip.</p>
              </div>
              <p className="changelog-footer">Thanks again for playing and sharing your feedback — it really helps shape each version. More content and polish coming soon! If you want to help please make sure to mail me itscolord@gmail.com 🚀</p>
            </>
          )}
        </div>

        <div className="changelog-entry">
          <h3 onClick={() => toggleVersion('0.0.4.1')} style={{ cursor: 'pointer' }}>
            🔧 IdlePunks – Update Log 0.0.4.1 {expandedVersion === '0.0.4.1' ? '▼' : '▶'}
          </h3>
          {expandedVersion === '0.0.4.1' && (
            <>
              <p>Thanks to our new Patreon supporter Andy (the actual goat 🐐), we were able to speed up development again — huge thanks, Andy!</p>
              <div className="changelog-section">
                <h3>✅ New Additions</h3>
                <p>✅ Added new resource: Tronics</p>
                <p>✅ Added popup confirmation when pressing Prestige Button (shows what resets)</p>
                <p>✅ Added Cheat Menu Button to instantly set Prestige to 1</p>
                <p>✅ Added toggle option in Settings to disable the Holo Billboard</p>
                <p>✅ Added new Cogfather quote that appears after Prestiging</p>
                <h3>⚙️ Improvements & Fixes</h3>
                <p>⚙️ Fixed bug where ElectroShop would not unlock after Prestige</p>
                <p>⚙️ Fixed bug where Prestige Button remained locked after save deletion</p>
                <p>⚙️ Fixed bug where Prestige Button showed wrong tooltip when locked</p>
                <p>⚙️ Fixed bug where Cogfather quote appeared multiple times after Prestige</p>
                <p>⚙️ Removed lock icon from ElectroShop after it’s unlocked</p>
                <p>⚙️ Removed hover lock overlay from Prestige Button once it’s unlocked</p>
                <p>⚙️ Fixed Prestige Popup and Settings panel sizing issues</p>
                <h3>🧼 Code Refactors & Structural Improvements</h3>
                <p>🧼 Moved Achievement logic out of App.jsx (was causing instability)</p>
                <p>🧼 Moved GameState handling into its own file (was previously inside App.jsx)</p>
                <p>🧼 Moved Store System into a dedicated folder with cleaner dependency routing</p>
                <p>🧪 Possibly broke Achievements in the process (awaiting testing)</p>
                <h3>🚧 Started (Incomplete Features)</h3>
                <p>🚧 Started integrating Auto Clicker v2: NEED HELP ITS NOT WORKING</p>
                <p>🚧 Tronics Click Boost I & II setup started (not fully implemented)</p>
                <p>🚧 Prestige Visual Feedback (flash/glow) planned but not yet in</p>
                <h3>📝 Known Issues</h3>
                <p>⚠️ Achievements may not trigger or save properly (under review)</p>
                <p>⚠️ GameStates need testing for save/load consistency</p>
                <p>⚠️ Ascension Reclaimer saved item not being saved on reload.</p>
                <p>⚠️ Milestones are still partially broken</p>
                <p>⚠️ Prestige Button only updates after a page reload</p>
                <p>⚠️ Cogfather's Tips are not showing up in the News Ticker.</p>
                <p>⚠️ Started implementation of Auto Clicker Bot v2:

                Still not purchasable.

                Owned bots not displayed correctly.

                No animation on screen.

                No info in hover tooltip.</p>
                <p>⚠️ Auto Clicker Bot v1 still has no image or animation</p>
              </div>
              <p className="changelog-footer">Thanks again for playing and sharing your feedback — it really helps shape each version. More content and polish coming soon! If you want to help please make sure to mail me itscolord@gmail.com 🚀</p>
            </>
          )}
        </div>
        
        <div className="changelog-entry">
          <h3 onClick={() => toggleVersion('0.0.4')} style={{ cursor: 'pointer' }}>
            🔧 IdlePunks — Update Log v0.0.4 {expandedVersion === '0.0.4' ? '▼' : '▶'}
          </h3>
          {expandedVersion === '0.0.4' && (
            <>
              <p>⚠️ Note: Progress will slow down slightly due to current lack of funding — thank you for your continued support and patience! 💛</p>
              <div className="changelog-section">
                <h3>✅ New Additions</h3>
                <p>✅ Added Crafting Booster Unit to Credit Store.</p>
                <p>✅ Added Hover Drone to Credit Store.</p>
                <p>✅ Added Ascension Reclaimer to Credit Store. (BROKEN)</p>
                <p>✅ Added JPS Multiplier display to Stats menu.</p>
                <p>✅ Added notification when Electro Shard disappears without being clicked.</p>
                <p>✅ Added toggle for Electro Beacon.</p>
                <p>✅ Added Prestige Button (simple first integration).</p>
                <p>✅ Added Tech Tree & Prestige Token Button (currently in the wrong menu: Settings).</p>
                <p>✅ Added Prestige Count display to Settings menu.</p>
                <p>✅ Known Bugs Section</p>
                <h3>⚙️ Improvements & Fixes</h3>
                <p>⚙️ Quests can now be completed independently from each other.</p>
                <p>⚙️ “Surge Rider” quest now correctly rewards 1 Electro Shard.</p>
                <p>⚙️ Created new JPS Multiplier tracking system (affects future purchases properly).</p>
                <p>⚙️ Global Multiplier now resets on full save deletion.</p>
                <p>⚙️ Fixed bug where Auto Clicker Bot was not saved properly on reload.</p>
                <p>⚙️ Preserved Helper removed from Inventory and moved to Stats section.</p>
                <p>⚙️ Fixed bug where Credit Store items weren’t saved correctly on reload.</p>
                <p>⚙️ Fixed Electro Beacon message notification bug.</p>
                <p>⚙️ Fixed issue where item info in Junk Store didn’t reflect global multiplier.</p>
                <p>⚙️ Fixed bug where Prestige Button disappeared on reload.</p>
                <p>⚙️ Prestige Button now disappears correctly after Ascension.</p>
                <p>⚙️ Changed tab title and icon for better browser identification.</p>
                <h3>📝 Known Issues</h3>
                <p>⚠️ Milestones are still buggy.</p>
                <p>⚠️ Ascension Reclaimer currently only saves one item, even if bought multiple times.</p>
                <p>⚠️ Ascension Reclaimer saved item not being saved on reload.</p>
                <p>⚠️ Missing toggle option for Billboard in Settings menu.</p>
                <p>⚠️ Missing animation/picture for Auto Clicker Bot v2.</p>
                <p>⚠️ Cogfather's Tips are not showing up in the News Ticker.</p>
                <p>⚠️ Started implementation of Auto Clicker Bot v2:

                Still not purchasable.

                Owned bots not displayed correctly.

                No animation on screen.

                No info in hover tooltip.</p>
                <p>⚠️ Prestige System still unusable and buggy overall.</p>
              </div>
              <p className="changelog-footer">Thanks again for playing and sharing your feedback — it really helps shape each version. More content and polish coming soon! 🚀</p>
            </>
          )}
        </div>
        <div className="changelog-entry">
          <h3 onClick={() => toggleVersion('0.0.3')} style={{ cursor: 'pointer' }}>
            🔧 IdlePunks — Update Log v0.0.3 {expandedVersion === '0.0.3' ? '▼' : '▶'}
          </h3>
          {expandedVersion === '0.0.3' && (
            <>
              <p>Hey scavengers! Version 0.0.3 is now live with a bunch of improvements, fixes, and new systems:</p>
              <div className="changelog-section">
                <p>✅ Complete Prestige Quest Line Implemented</p>
                <p>✅ Fixed adjustable Store Menu sizing issue</p>
                <p>✅ Item Inventory overflow on large screens resolved</p>
                <p>✅ Unified UI Close Buttons – All 'Back' buttons changed to 'Close' and moved to top right</p>
                <p>✅ News Ticker glitch fix – No more mid-screen message swaps (hopefully!)</p>
                <p>✅ Added more News Ticker flavor lines</p>
                <p>✅ Electro Shop now locked until Prestige unlock</p>
                <p>✅ Slot machine popup now integrated into UI instead of floating window</p>
                <p>✅ Removed leftover German notification texts</p>
                <p>✅ Fixed rare bug where Prestige button disappeared below 1M Junk</p>
                <p>✅ Minor Crafting System rework & visual polish</p>
                <p>✅ Reworked Cheat Menu with new testing tools</p>
                <p>✅ New flying trash pickup added (used in future surge systems)</p>
                <p>✅ Credit conversion system overhauled: now fixed at 100k Junk → 1 Credit</p>
                <p>✅ New Credit Store item: Electro Shard Beacon – reduces shard spawn time</p>
                <p>✅ Added visuals for the Electro Shard Beacon</p>
              </div>
              <p className="changelog-footer">Thanks again for playing and sharing your feedback — it really helps shape each version. More content and polish coming soon! 🚀</p>
            </>
          )}
        </div>

        <div className="changelog-entry">
          <h3 onClick={() => toggleVersion('0.0.2')} style={{ cursor: 'pointer' }}>
            🔧 IdlePunks — Update Log v0.0.2 {expandedVersion === '0.0.2' ? '▼' : '▶'}
          </h3>
          {expandedVersion === '0.0.2' && (
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
                <p className="changelog-detail">Only the first quest is functional for now — more will follow soon!</p>
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
