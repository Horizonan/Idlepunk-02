
import React, { useState } from 'react';

export default function Changelog({ onClose }) {
  const [expandedVersion, setExpandedVersion] = useState('0.1.0.2');

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
          <h3 onClick={() => toggleVersion('0.1.0.2')} style={{ cursor: 'pointer' }}>
            🧩 QoL, Stats & Visual Polish – Update Log 0.1.0.2 {expandedVersion === '0.1.0.2' ? '▼' : '▶'}
          </h3>
          {expandedVersion === '0.1.0.2' && (
            <>
              <p>Patch 0.1.0.2 focuses on polish, visual upgrades, stat tracking, and tackling critical bugs. More clarity, smoother gameplay, and a sprinkle of new content await! 🚀</p>
              <div className="changelog-section">
                <h3>🛠️ QoL & System Polish</h3>
                <p>🛠️ Added indicator when Overcharged Crystal is craftable</p>
                <p>🛠️ Improved Prestige clarity (WIP: meter or visual feedback incoming)</p>
                <p>🛠️ Expanded Stats Menu with Trash Bonus pickup time</p>
                <p>🛠️ Added Crystal Pickup Time to Stats Menu</p>
                <p>🛠️ Added Total Junk Collected to Statistics</p>
                <p>🛠️ Redesigned Cheat Menu for easier navigation</p>
                <p>🛠️ Another step toward mobile friendliness... but still a long road 😅</p>

                <h3>🎮 New Content</h3>
                <p>🎮 Added Pickup Magnet item to Tronics Store</p>
                <p>🎮 New Quest: "Scratz to Riches" now available</p>
                <p>🎮 Stats now track how many Crew Missions were completed successfully</p>

                <h3>🎨 New Visual Designs</h3>
                <p>🎨 Added new Hover Drone design</p>
                <p>🎨 Added new Electro Shard design</p>
                <p>🎨 Updated Drone visual for better contrast and feel</p>

                <h3>🐞 Bug Fixes</h3>
                <p>🐞 Fixed issue where Crystal Reduction was calculated twice</p>
                <p>🐞 Fixed mobile bug where Next Crystal Timer stretched across the screen</p>
                <p>🐞 Fixed critical bug that caused the game to break on Junk Refinery purchase</p>
              </div>
              <p className="changelog-footer">Thanks for continuing to play and shape IdlePunk with your feedback! More clarity, stability, and fun features coming soon. 💛</p>
            </>
          )}
        </div>

        <div className="changelog-entry">
          <h3 onClick={() => toggleVersion('0.1.0.1')} style={{ cursor: 'pointer' }}>
            🔧 UI, Crew, and Electro Store Polish – Update Log 0.1.0.1 {expandedVersion === '0.1.0.1' ? '▼' : '▶'}
          </h3>
          {expandedVersion === '0.1.0.1' && (
            <>
              <p>Patch 0.1.0.1 brings a wave of refinements, better animations, more mobile support, and quality-of-life improvements! 🌐</p>
              <div className="changelog-section">
                <h3>🖥️ UI & UX Improvements</h3>
                <p>🖥️ Right SideMenu now animates like the left</p>
                <p>🖥️ Reworked Settings UI styling for better clarity</p>
                <p>🖥️ Added Search Bar to Settings (for future help system)</p>
                <p>🖥️ Statistics moved to a dedicated menu with new design</p>
                <p>🖥️ Made entire UI much more mobile friendly 📱</p>
                <p>🖥️ Changed Quantum Tap notification style</p>
                <p>🖥️ Fixed: Lore Fragment Button in JunkTerminal now works</p>
                <p>🖥️ Clarified: Autoclicker V2 consumes Autoclicker V1</p>
                <p>🖥️ Adjusted Electro Shard speed & frames to reduce lag</p>

                <h3>🧠 System Changes & Tooltips</h3>
                <p>🧠 Added: Quantum Tap notification now auto-removes</p>
                <p>🧠 Added: New **Secret Tooltip** 👀</p>

                <h3>👥 Crew System</h3>
                <p>👥 Added Basic Loadout System (3 items supported for now)</p>
                <p>👥 First Mini-Game for Crew Missions added</p>
                <p>👥 New **Stamina Timer** mechanic for crew</p>
                <p>👥 Fixed: Crew no longer disappears when closing window</p>

                <h3>⚡ Electro Store Improvements</h3>
                <p>⚡ Fixed: Highlight bug showing unaffordable upgrades as available</p>
                <p>⚡ Clarified: Tronics Boost II no longer appears to consume Boost I</p>

              </div>
              <p className="changelog-footer">We're continuing to improve gameplay, visuals, and performance. Thank you for your reports and support! 🧡 Questions or feedback? Drop by the Discord or email: itscolord@gmail.com</p>
            </>
          )}
        </div>
        
        <div className="changelog-entry">
          <h3 onClick={() => toggleVersion('0.1')} style={{ cursor: 'pointer' }}>
            🔧 Major Systems, Visuals & Crew Expansion – Update Log 0.1 {expandedVersion === '0.1' ? '▼' : '▶'}
          </h3>
          {expandedVersion === '0.1' && (
            <>
              <p>Version 0.1 is here! A huge thank you for sticking with us as we continue shaping this world together. 💛</p>
              <div className="changelog-section">
                <h3>🖥️ UI & UX Improvements</h3>
                <p>🖥️ Made Item Inventory Header sticky</p>
                <p>🖥️ Changed entire left menu for better cohesion</p>
                <p>🖥️ Reduced glow of Holo Billboard for visual clarity</p>
                <p>🖥️ Changed Settings Menu styling</p>
                <p>🖥️ Fixed disappearing close/reset buttons on scroll in Settings</p>
                <p>🖥️ Improved Quest Visual Handling & Sticky Quest Log button</p>
                <p>🖥️ Added new Beacon Core, Tronics Clicker & Click Enhancer visuals</p>
                <p>🖥️ Changed Skills Center design to match overall style</p>
                <p>🖥️ Changed Junktown Nexus styling + added junk terminal</p>
                <p>🖥️ Updated Tech Tree visuals (purchase markers & clickable nodes)</p>
                <p>🖥️ Renamed "Pre-prestige" to "Scrap Collectors" in Junk Store</p>
                <p>🖥️ Removed trailing .00 from Credits display</p>

                <h3>🎮 Gameplay & Content</h3>
                <p>🎮 Added 10x buy option to Automation & First Prestige</p>
                <p>🎮 Fixed Prestige Button for 2nd Prestige</p>
                <p>🎮 Reworked Junk Store & Tronics Store V1</p>
                <p>🎮 Fixed bug: Autoclicker V2 not set after rework</p>
                <p>🎮 Fixed bug: Slot Machine UI rendering behind icons</p>
                <p>🎮 Reworked Slot Machine + added simple Auto Slotter & animation</p>
                <p>🎮 Changed how 10x calculation works (fixed edge cases)</p>
                <p>🎮 Hold to Click added (Enter to Hold)</p>
                <p>🎮 Junk Flip minigame added (and close button fixed)</p>
                <p>🎮 Added new setting to enable/disable "Next Goal" UI</p>
                <p>🎮 Added new Crafting tab: "Consumables" + new item: Scrap Cell (Battery)</p>
                <p>🎮 Added Scratz Miner</p>
                <p>🎮 Changed base conversion rate from Junk to Scratz by 100× 🙂</p>
                <p>🎮 Added two new quests + first Lore Fragment!</p>

                <h3>👥 Crew & Mail Systems</h3>
                <p>👥 Introduced full Crew Hiring System</p>
                <p>👥 Added Crew Window + Crew Stats</p>
                <p>👥 Implemented Crew Mini Game + Hint</p>
                <p>👥 Added simple Mission System</p>
                <p>📧 Introduced Email System with Notifications</p>
                <p>📧 Added Spam Mails + Advertisements</p>
                <p>📧 Added Cheat Menu button for next mail + Mail Game Hint</p>

                <h3>🧠 Systems & Backend</h3>
                <p>🧠 Started implementation of Heist System (WIP)</p>
                <p>🧠 Changed Skills Center backend structure</p>
                <p>🧠 Added Global Electronics Multiplier to Stats menu</p>
                <p>🧠 Fixed bug where close button styles were all linked incorrectly</p>
                <p>🧠 Minor tweaks to Cheat Menu for better internal testing</p>

                <h3>🌟 Extras</h3>
                <p>🌟 Added new Random Mini Event</p>
                <p>🌟 Added new UI Element: "Next Goal"</p>
                <p>🌟 Slight layout tweak to Credstore</p>
                <p>🌟 Changed in-game currency name from "Credit" to "Scrapthereum" or "Scrat" for short</p>
                <p>🌟 Added reactive feedback loop for certain interactions</p>
              </div>
              <p className="changelog-footer">Your feedback continues to guide and inspire development! If you find bugs, want to share ideas, or just say hi, feel free to reach out: itscolord@gmail.com. More surprises soon™ 🚀</p>
            </>
          )}
        </div>
      
        <div className="changelog-entry">
          <h3 onClick={() => toggleVersion('0.0.7/2')} style={{ cursor: 'pointer' }}>
            🔧 Last Reddit Update – Update Log 0.0.7/2 {expandedVersion === '0.0.7/2' ? '▼' : '▶'}
          </h3>
          {expandedVersion === '0.0.7/2' && (
            <>
              <p>Note: Reddit failed me... but hey my junk is better than yours💛</p>
              <div className="changelog-section">
                <h3>📜 Updates</h3>
                <p>✅ Added 10x Buy Option to Automation Store</p>
                <p>✅ Fixed Scrap Drone not saving properly</p>
                <p>✅ Fixed UI Settings save/load behavior</p>
                <p>✅ Added toggle for AutoClickers</p>
                <p>✅ Added option to disable Trash Pickups</p>
                <p>✅ Cleaned up number formatting in Junk Store</p>
                <p>✅ Reworked Settings Menu CSS</p>
                <p>✅ Added new quest to highlight click automation</p>
                <p>✅ Fixed a bug that broke the Junk Store (my bad)</p>
                <p>✅ Changed styling for Quest Completion feedback</p>
              </div>
              <p className="changelog-footer">Thanks again for playing and sharing your feedback — it really helps shape each version. More content and polish coming soon! If you want to help please make sure to mail me itscolord@gmail.com 🚀</p>
            </>
          )}
        </div>


        <div className="changelog-entry">
          <h3 onClick={() => toggleVersion('0.0.7/1')} style={{ cursor: 'pointer' }}>
            🔧 Last Reddit Update – Update Log 0.0.7/1 {expandedVersion === '0.0.7/1' ? '▼' : '▶'}
          </h3>
          {expandedVersion === '0.0.7/1' && (
            <>
              <p>Note: Reddit failed me... but hey my junk is better than yours💛</p>
              <div className="changelog-section">
                <h3>📜 Updates</h3>
                <p>✅ Ultimate Slots are now live — spin at your own risk</p>
                <p>✅ Slot Machine CSS moved to its own file for cleaner development</p>
                <p>✅ Fixed the Modular Scrapper</p>
                <p>✅ Refactored ClickerBuyActions logic</p>
                <p>✅ Removed a bunch of legacy code</p>
                <p>✅ Started implementing Buy x10 option (currently Junk Store only)</p>
              </div>
              <p className="changelog-footer">Thanks again for playing and sharing your feedback — it really helps shape each version. More content and polish coming soon! If you want to help please make sure to mail me itscolord@gmail.com 🚀</p>
            </>
          )}
        </div>

        <div className="changelog-entry">
          <h3 onClick={() => toggleVersion('0.0.7')} style={{ cursor: 'pointer' }}>
            🔧 Gameplay, UI and Bug Fixes – Update Log 0.0.7 {expandedVersion === '0.0.7' ? '▼' : '▶'}
          </h3>
          {expandedVersion === '0.0.7' && (
            <>
              <p>Thank you for your continued support and patience! 💛</p>
              <div className="changelog-section">
                <h3>🖥️ UI & UX Improvements</h3>
                <p>🖥️ Updated Trash Clicker to new design</p>
                <p>🖥️ Fixed styling issues in Junk Store</p>
                <p>🖥️ Made Settings collapsible for better screen space</p>
                <p>🖥️ Added Reset UI Layout button</p>
                <p>🖥️ Added several new News Ticker lines</p>
                <p>🖥️ UI Settings state is now saved across sessions</p>
                <p>🖥️ Added Scrap formatting improvements for better readability</p>
                <h3>🎮 Gameplay & Content</h3>
                <p>🎮 Added new event at 50 clicks to spice up early gameplay</p>
                <p>🎮 Added new progression quest</p>
                <p>🎮 Changed parts of the Ascension Questline for clarity and balance</p>
                <p>🎮 Added new item: Glitched Scrap Core</p>
                <p>🎮 Introduced the Luck Engine (teased mechanic)</p>
                <h3>🎰 Slot Machine System</h3>
                <p>🎰 Added Big Slots (larger UI + new reward tier)</p>
                <p>🎰 Added Tronics Surge sound effect</p>
                <p>🎰 Fixed Tronics Surge timer not being removed properly</p>
                <h3>🧠 Systems & Technical Improvements</h3>
                <p>🧠 Refactored: moved many game states into gameStates.js, away from App.jsx</p>
                <p>🧠 Removed old, unused code and cleaned up redundant functions</p>
                <p>🧠 Fixed Autoclickers not saving properly</p>
                <p>🧠 Autoclickers now: Only count toward Tronics Clicks when unlocked, Also contribute to Normal Clicks</p>
                <p>🧠 Fixed bug where Capacitors didn’t exist at all</p>
                <p>🧠 Found and removed duplicate code overriding achievement validation</p>
              </div>
              <p className="changelog-footer">Thanks again for playing and sharing your feedback — it really helps shape each version. More content and polish coming soon! If you want to help please make sure to mail me itscolord@gmail.com 🚀</p>
            </>
          )}
        </div>

        <div className="changelog-entry">
          <h3 onClick={() => toggleVersion('0.0.6/2')} style={{ cursor: 'pointer' }}>
            🔧 Last Reddit Update – Update Log 0.0.6/2 {expandedVersion === '0.0.6/2' ? '▼' : '▶'}
          </h3>
          {expandedVersion === '0.0.6/2' && (
            <>
              <p>Note: Updates will now only be on Discord 💛</p>
              <div className="changelog-section">
                <h3>📜 Updates</h3>
                <p>✅ Completed full integration of Second Prestige Questline</p>
                <p>✅ Added Overcharged Prestige Crystal recipe</p>
                <p>✅ Planted Tech Tree unlock teasers after 2nd Prestige</p>
                <p>✅ Auto Clicks now count toward Tronics Clicks</p>
                <p>✅ Tronic Click Count added to Stats Menu</p>
                <p>✅ Added new counter for ElectroShop upgrades</p>
                <p>✅ Changelog moved to Settings Menu to reduce clutter</p>
                <p>✅ Fixed Modular Scrapper not working properly</p>
                <p>✅ Automation Store relocated into Junk Store (less tabs, cleaner nav)</p>
              </div>
              <p className="changelog-footer">Thanks again for playing and sharing your feedback — it really helps shape each version. More content and polish coming soon! If you want to help please make sure to mail me itscolord@gmail.com 🚀</p>
            </>
          )}
        </div>
        
        <div className="changelog-entry">
          <h3 onClick={() => toggleVersion('0.0.6/1')} style={{ cursor: 'pointer' }}>
            🔧 Rework Systems – Update Log 0.0.6/1 {expandedVersion === '0.0.6/1' ? '▼' : '▶'}
          </h3>
          {expandedVersion === '0.0.6/1' && (
            <>
              <p>Note: Updates will majorly slow down due to funding being depleted💛</p>
              <div className="changelog-section">
                <h3>⚙️ UI & Backend Improvements</h3>
                <p>⚙️ Moved Clicker buttons down to avoid blocking surge timers</p>
                <p>⚙️ Moved Electro Beacon CSS and Notifications CSS into dedicated files</p>
                <p>⚙️ Fixed Notifications button not disappearing correctly (was called twice in App.jsx)</p>
                <p>⚙️ Cheat Menu cleaned up & slightly restructured</p>
                <p>⚙️ Credits Store backend completely overhauled</p>
                <h3>🔧 Bugfixes & Functionality Tweaks</h3>
                <p>🔧 Completely reworked Electro Clicker logic to fix multiple bugs</p>
                <p>🔧 Quantum Tap now triggers at correct 3% chance</p>
                <p>🔧 Fixed Tronics Upgrades not subtracting Tronics properly</p>
                <p>🔧 Surge backend fully reworked — smoother & more stable</p>
                <p>🔧 Added Tronics Surge backend + full implementation</p>
                <p>🔧 Automation Clickers now generate Tronics/sec</p>
                <h3>⚡ Core System Updates</h3>
                <p>⚡ Changed Circuit Speaks quest to only require 3 Electro Shards</p>
                <p>⚡ Added Capacitor Tooltip (finally!)</p>
                <p>⚡ Added Electro Beacon Core upgrade</p>
                <h3>🧩 New Content</h3>
                <p>🧩 Added first new quest for second prestige questline</p>
              </div>
              <p className="changelog-footer">Thanks again for playing and sharing your feedback — it really helps shape each version. More content and polish coming soon! If you want to help please make sure to mail me itscolord@gmail.com 🚀</p>
            </>
          )}
        </div>


        <div className="changelog-entry">
          <h3 onClick={() => toggleVersion('0.0.5')} style={{ cursor: 'pointer' }}>
            🔧 Big QoL and Bugs – Update Log 0.0.5 {expandedVersion === '0.0.5' ? '▼' : '▶'}
          </h3>
          {expandedVersion === '0.0.5' && (
            <>
              <p>Note: Huge Thanks to kykydoodles (Potatomaster) for helping with Feature Testing 💛</p>
              <div className="changelog-section">
                <h3>⚙️ UI & UX Improvements</h3>
                <p>⚙️ Improved portrait mode UI scaling</p>
                <p>⚙️ Updated Prestige quest chain wording for clarity</p>
                <p>⚙️ Standardized Store naming</p>
                <p>⚙️ Side menu sorted for better navigation</p>
                <p>⚙️ Notifications are now fully closable</p>
                <p>⚙️ Gametips renamed from Tooltips for consistency</p>
                <p>⚙️ Added Tech Tree Tooltip + new Item Info Box for tech nodes</p>
                <p>⚙️ Added Flying Crystal Tooltip</p>
                <h3>🔧 Bugfixes & Functionality Tweaks</h3>
                <p>🔧 Fixed clicker Junk/sec bug (finally!)</p>
                <p>🔧 Store lock now stays locked on reload</p>
                <p>🔧 Fixed lock animation not showing without reload</p>
                <p>🔧 Fixed Cheat Menu functionality and cleaned it up</p>
                <p>🔧 Tronics Info Box no longer shows item price</p>
                <p>🔧 Circuit Optimization Unit now correctly subtracts Electro Shards</p>
                <p>🔧 Electro Shard Beacon now displays item ownership properly</p>
                <p>🔧 Shard Miner has been relocated</p>
                <p>🔧 Added missing Electro Shard reward for Tool Master quest</p>
                <p>🔧 Hover Drone is now toggleable</p>
                <h3>⚡ Core System Updates</h3>
                <p>⚡ Fully reworked Surge system</p>
                <p>⚡ Added Next Surge timer after triggering the first surge</p>
                <p>⚡ Trash Surge timer now only displays when Trash Clicker is selected</p>
                <h3>🧩 New Content</h3>
                <p>🧩 Added Flow Regulator item to ElectroShop</p>
                <p>🧩 Added reduction stat in Settings menu</p>
                <p>🧩 Added sound effect when crystal shard appears</p>
                <p>🧩 Added proper locked messages for average ElectroShop upgrades</p>
                <p>🧩 Renamed Prestige quest: “Prestige Ready” → “Unlock Ascension Protocol”</p>
              </div>
              <p className="changelog-footer">Thanks again for playing and sharing your feedback — it really helps shape each version. More content and polish coming soon! If you want to help please make sure to mail me itscolord@gmail.com 🚀</p>
            </>
          )}
        </div>

        <div className="changelog-entry">
          <h3 onClick={() => toggleVersion('0.0.4.5/2')} style={{ cursor: 'pointer' }}>
            🔧 QoL and Bugs – Update Log 0.0.4.5/2 {expandedVersion === '0.0.4.5/2' ? '▼' : '▶'}
          </h3>
          {expandedVersion === '0.0.4.5/2' && (
            <>
              <p>⚠️ Note: Progress will slow down slightly due to current lack of funding — thank you for your continued support and patience! 💛</p>
              <div className="changelog-section">
                <h3>⚙️ Improvements & Fixes</h3>
                <p>⚙️ Added new Prestige button tooltip</p>
                <p>⚙️ Added Tronics Clicker tooltip</p>
                <p>⚙️ Added animation trigger when reaching 1 million Junk to guide players to the Quest Log</p>
                <h3>🔧 System Adjustments & UX Improvements</h3>
                <p>🔧 Moved Reset All Progress button to its own file</p>
                <p>🔧 Fixed issue where Reset All Progress wouldn’t trigger properly after Prestige (hopefully fully resolved)</p>
                <p>🔧 Moved mobile-specific CSS into its own file for easier updates</p>
                <p>🔧 Fixed Cogfather’s First Secret unlocking early without meeting the required condition</p>
                <h3>🔋 Shard System & Progression Improvements</h3>
                <p>🔋 Added Shard Miner v0.1 (early version of crystal shard generation system)</p>
                <p>🔋 Crystal Shard floating pickup now flies around for 5 full minutes</p>
              </div>
              <p className="changelog-footer">Thanks again for playing and sharing your feedback — it really helps shape each version. More content and polish coming soon! If you want to help please make sure to mail me itscolord@gmail.com 🚀</p>
            </>
          )}
        </div>

        <div className="changelog-entry">
          <h3 onClick={() => toggleVersion('0.0.4.5/1')} style={{ cursor: 'pointer' }}>
            🔧 QoL and Bugs – Update Log 0.0.4.5/1 {expandedVersion === '0.0.4.5/1' ? '▼' : '▶'}
          </h3>
          {expandedVersion === '0.0.4.5/1' && (
            <>
              <p>⚠️ Note: Progress will slow down slightly due to current lack of funding — thank you for your continued support and patience! 💛</p>
              <div className="changelog-section">
                <h3>⚙️ Improvements & Fixes</h3>
                <p>⚙️ Fixed floating pickups going under windows and jittering unpredictably</p>
                <p>⚙️ Fixed Hobo Billboard display issue (now correctly applies % bonus to Junk/sec)</p>
                <p>⚙️ Fixed Prestige Ready quest not completing even after reaching required Junk</p>
                <p>⚙️ Fixed Skills Center window not closing other open popups properly</p>
                <h3>🔧 System Adjustments & UX Improvements</h3>
                <p>🔧 Improved visual feedback for the Trash Box so it looks clearly clickable</p>
                <p>🔧 Reworked skill training system to prevent partial XP carryover when switching skills</p>
                <h3>🔋 Shard System & Progression Improvements</h3>
                <p>🔋 Added tooltip/info panel explaining the purpose of Electro Shards</p>
                <h3>🔌 Terminology & UI Cleanup</h3>
                <p>🔌 Renamed “Upgrade Stats” → Skill Center</p>
                <p>🔌 Renamed “Marketplace” → Junktown Nexus</p>
                <p>🔌 Removed “Runs on Replit” label from the interface</p>
              </div>
              <p className="changelog-footer">Thanks again for playing and sharing your feedback — it really helps shape each version. More content and polish coming soon! If you want to help please make sure to mail me itscolord@gmail.com 🚀</p>
            </>
          )}
        </div>

        <div className="changelog-entry">
          <h3 onClick={() => toggleVersion('0.0.4.4')} style={{ cursor: 'pointer' }}>
            🔧 Mobile Update – Update Log 0.0.4.4 {expandedVersion === '0.0.4.4' ? '▼' : '▶'}
          </h3>
          {expandedVersion === '0.0.4.4' && (
            <>
              <p>⚠️ Note: Progress will slow down slightly due to current lack of funding — thank you for your continued support and patience! 💛</p>
              <div className="changelog-section">
                <h3>✅ New Additions</h3>
                <p>✅ Added High-Frequency Tap Chip (Clicker fires twice per click)</p>
                <p>✅ Added new navigation buttons to the ElectroShop to switch between sections</p>
                <p>✅ Added Circuit Optimization Unit (+25% Junk/sec)</p>
                <h3>⚙️ Improvements & Fixes</h3>
                <p>⚙️ Moved Tech Tree UI to a dedicated menu tab (removed from Settings)</p>
                <p>⚙️ AutoClicker v2 is now purchasable and fully functional</p>
                <p>⚙️ Made UI windows toggleable by clicking the same button again (Store, Quests, Achievements, etc.)</p>
                <h3>🧼 Code Refactors & Structural Improvements</h3>
                <p>🧼 Moved Quest Validation to its own file</p>  
                <p>🧼 UI now significantly more mobile-friendly</p>
                <h3>🚧 Started (Incomplete Features)</h3>
                <p>🚧 Tronics Flow Regulator</p>
                <p>🚧 Add tooltip system and basic visual layout polish</p>
                <h3>🧪 Planned Implementations</h3>
                <p>🧪 Add tooltip system and basic visual layout polish</p>
                <p>🧪 Tronics Flow Regulator</p>
              </div>
              <p className="changelog-footer">Thanks again for playing and sharing your feedback — it really helps shape each version. More content and polish coming soon! If you want to help please make sure to mail me itscolord@gmail.com 🚀</p>
            </>
          )}
        </div>

        <div className="changelog-entry">
          <h3 onClick={() => toggleVersion('0.0.4.3')} style={{ cursor: 'pointer' }}>
            🔧 IdlePunks – Update Log 0.0.4.3 {expandedVersion === '0.0.4.3' ? '▼' : '▶'}
          </h3>
          {expandedVersion === '0.0.4.3' && (
            <>
              <p>⚠️ Note: Progress will slow down slightly due to current lack of funding — thank you for your continued support and patience! 💛</p>
              <div className="changelog-section">
                <h3>✅ New Additions</h3>
                <p>✅ Added Quantum Tap Circuit to the ElectroShop</p>
                <p>✅ Fully implemented Tronics Click Boost I (now functional)</p>
                <p>✅ Added Tronics Click Boost II to the game</p>
                <p>✅ Added Prestige popup glow effect (visual feedback)</p>
                <p>✅ Added Quest for Prestige Button unlock</p>
                <p>✅ Added 1000 Tronics button to the cheat menu</p>
                <h3>⚙️ Improvements & Fixes</h3>
                <p>⚙️ Fixed Prestige button not updating without relo</p>
                <p>⚙️ Fixed Tronics Click Boost I unlock mechanic</p>
                <p>⚙️ Fixed Cogfather’s Tips now properly display in News Ticker</p>
                <p>⚙️ Fixed Ascension Reclaimer</p>
                <p>⚙️ Fixed "Begin Crafting" quest not checking properly</p>
                <p>⚙️ Fixed Junk/sec not updating correctly each second</p>
                <p>⚙️ Fixed Tronics Click Boost II</p>
                <h3>🧼 Code Refactors & Structural Improvements</h3>
                <p>🧼 Created new Cheat Menu folder for cleaner dependencies</p>  
                <p>🧼 Refactored StoreSystem dependencies</p>
                <p>🧪 Possibly broke Achievements in the process (awaiting testing)</p>
                <h3>🚧 Started (Incomplete Features)</h3>
                <p>🚧 Started integrating Auto Clicker v2: NEED HELP ITS NOT WORKING</p>
                <p>🚧 Move Tech Tree UI to its own tab (remove from Settings)</p>
                <p>🚧 Move Quest Validation to its own file</p>
                <p>🚧 High-Frequency Tap Chip (ITEM)</p>
                <h3>🧪 Planned Implementations</h3>
                <p>🧪 Add tooltip system and basic visual layout polish</p>
                <p>🧪 Tronics Flow Regulator</p>
                <p>🧪 Make UI windows toggleable by re-clicking menu buttons</p>
                <p>🧪 Started implementation of Auto Clicker Bot v2:

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
