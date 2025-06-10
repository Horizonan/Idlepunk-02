
import React, { useState } from 'react';


export default function Tooltips({ onClose }) {
  const [expandedTip, setExpandedTip] = useState(null);

  const toggleTip = (tipId) => {
    setExpandedTip(expandedTip === tipId ? null : tipId);
  };

  return (
    <div className="store-container tooltips-menu">
      <div className="tooltips-header">
        <h2>Game Tips</h2>
        <button onClick={onClose}>Close</button>
      </div>
      
      <div className="tooltips-content">
        <div className="tooltip-entry">
          <h3 onClick={() => toggleTip('surges')}>
            ⚡ What Are Surges? {expandedTip === 'surges' ? '▼' : '▶'}
          </h3>
          {expandedTip === 'surges' && (
            <div className="tooltip-section">
              <p>Surges are temporary events that flood the junkyard with extra resources and opportunities.</p>
              
              <h4>🗑️ Trash Surges:</h4>
              <ul>
                <li>Increases junk collection multiplier significantly (Click Collection)</li>
                <li>Lasts 5-7 seconds (can be extended with upgrades)</li>
                <li>Occurs randomly every 4-8 minutes</li>
                <li>Creates screen effects and enhanced button glow</li>
                <li>Sometimes spawns rare Capacitors</li>
              </ul>
              
              <h4>⚡ Tronics Surges:</h4>
              <ul>
                <li>Unlocked after purchasing the Electro Surge Node</li>
                <li>Replaces regular Trash Surges</li>
                <li>Spawns collectible Capacitors across the screen</li>
                <li>Duration based on surge duration upgrades</li>
                <li>Creates yellow screen effects and plays audio</li>
              </ul>
              
              <p className="tooltip-tip">💡 Tip: Watch for the surge banners at the top of your screen - they show remaining time and type!</p>
            </div>
          )}
        </div>

        <div className="tooltip-entry">
          <h3 onClick={() => toggleTip('electroShards')}>
            ⚡ What Are Electro Shards? {expandedTip === 'electroShards' ? '▼' : '▶'}
          </h3>
          {expandedTip === 'electroShards' && (
            <div className="tooltip-section">
              <p>Electro Shards are a rare, high-tier resource used to power advanced systems. They are primarily required to:</p>
              <ul>
                <li>Craft special quest items (like the Prestige Crystal)</li>
                <li>Purchase powerful ElectroShop upgrades</li>
              </ul>
              
              <p>Electro Shards can be acquired through:</p>
              <ul>
                <li>Rare floating pickups</li>
                <li>Special crafting recipes Post Prestige</li>
                <li>Select quests</li>
                <li>Electroshard miner v0.1 (Premium Junk Upgrade)</li>
              </ul>
              
              <p>Their availability increases after your first Prestige, but limited ways to earn them exist earlier in the game.</p>
            
              <p className="tooltip-tip">💡 Tip: Keep an eye on rare pickups and hidden quest rewards — they matter more than you think.</p>
            </div>
          )}
        </div>

        <div className="tooltip-entry">
          <h3 onClick={() => toggleTip('capacitors')}>
            ⏛ What Are Capacitors? {expandedTip === 'capacitors' ? '▼' : '▶'}
          </h3>
          {expandedTip === 'capacitors' && (
            <div className="tooltip-section">
              <p>“Stores unstable surge energy in a compact form.”</p>
              <ul>
                <li>Required for advanced crafting and system upgrades.</li>
                <li>Can be rarely found during normal Surges and more commonly in Tronics Surges.</li>
              </ul>

              <p className="tooltip-tip">💡 Tip: Keep an eye on rare pickups — they matter more than you think.</p>
            </div>
          )}
        </div>

        <div className="tooltip-entry">
          <h3 onClick={() => toggleTip('tronicsClicker')}>
            🔌 Tronics Clicker {expandedTip === 'tronicsClicker' ? '▼' : '▶'}
          </h3>
          {expandedTip === 'tronicsClicker' && (
            <div className="tooltip-section">
              <p>Channel unstable energy into the system — one click at a time.</p>
              <ul>
                <li>🔌 Generates 1 Tronic per click</li>
                <li>📈 Benefits from Tronics per Click upgrades</li>
                <li>💡 Unlocks new tech, ElectroShop items, and advanced systems post-prestige</li>
              </ul>
            </div>
          )}
        </div>

        <div className="tooltip-entry">
          <h3 onClick={() => toggleTip('techTree')}>
            💡 What Is The Tech Tree? {expandedTip === 'techTree' ? '▼' : '▶'}
          </h3>
          {expandedTip === 'techTree' && (
            <div className="tooltip-section">
              <p>“Unlock the circuits of progression.”</p>
              <p>The first node is mandatory it unlocks the Tronics Clicker, which is core to late-game systems like ElectroShop, Credit Store, and more.</p>
              <p>Spend your first Ascension Token here to begin your tech evolution. More nodes unlock advanced upgrades and passive systems.

</p>
              <p className="tooltip-tip">💡 Tip: Unlock the First Node or you WILL be STUCK.</p>
            </div>
          )}
        </div>

        <div className="tooltip-entry">
          <h3 onClick={() => toggleTip('flyingCrystal')}>
            ✨ What Is The Flying Crystal? {expandedTip === 'flyingCrystal' ? '▼' : '▶'}
          </h3>
          {expandedTip === 'flyingCrystal' && (
            <div className="tooltip-section">
              <p>“A rare fragment pulsing with unstable energy.”</p>
              <p>Collect it before it vanishes to gain 1 Electro Shard.</p>
              <p>Stays visible for 5 minutes. Don’t blink — missing one slows your tech progress. </p>
              <p className="tooltip-tip">💡 Tip: Appears once every 30 minutes.</p>
            </div>
          )}
        </div>


        <div className="tooltip-entry">
          <h3 onClick={() => toggleTip('mailTerminal')}>
            ✉️ What Is The Mail Terminal? {expandedTip === 'mailTerminal' ? '▼' : '▶'}
          </h3>
          {expandedTip === 'mailTerminal' && (
            <div className="tooltip-section">
              <p>“Your inbox is a battlefield—contracts, threats, encrypted rumors. Some messages even read you back.”</p>
              <p>📥 What you can do here: </p>
              <ul>
                <li>Read incoming messages</li>
                <li>Claim rewards, trigger events, receive mission info</li>
                <li>Spot hidden codes, patterns, or recruit offers </li>
              </ul>
              <p className="tooltip-tip">💡 Tip: “A bad scan costs more than time. It costs trust.”</p>
            </div>
          )}
        </div>

        <div className="tooltip-entry">
          <h3 onClick={() => toggleTip('crewRec')}>
            👥 What Is The Crew Recruitment? {expandedTip === 'crewRec' ? '▼' : '▶'}
          </h3>
          {expandedTip === 'crewRec' && (
            <div className="tooltip-section">
              <p>“Buried in static and noise are identity fragments. Some are real. Most are not.”</p>
              <p>🔍 Objective: Sort through intercepted profiles and decide who's real.</p>
              <ul>
                <li>Accept real candidates</li>
                <li>Reject fake ones</li>
                <li>The better your accuracy, the higher your chance of recruiting a useful crew member.</li>
                <li> Fakes can be convincing. Watch for suspicious skills, missing data, or impossible backstories.</li>
              </ul>
              <p className="tooltip-tip">💡 Tip: “Some mail is harmless. Some rewrites the map.”</p>
            </div>
          )}
        </div>

        <div className="tooltip-entry">
          <h3 onClick={() => toggleTip('prestige')}>
            🔁 How Prestige Works {expandedTip === 'prestige' ? '▼' : '▶'}
          </h3>
          {expandedTip === 'prestige' && (
            <div className="tooltip-section">
              <p>Prestiging is a major reset that wipes most of your progress in exchange for unlocking permanent upgrades and access to powerful new systems.</p>
              
              <h4>How to Unlock Prestige:</h4>
              <ul>
                <li>Reach 1 million Junk</li>
                <li>Complete the Ascension Questline</li>
                <li>Collect special resources</li>
                <li>Craft the Prestige Crystal</li>
              </ul>
              
              <h4>What Does Prestige Reset?</h4>
              <ul>
                <li>Your Junk, upgrades, helpers, and quest progress</li>
                <li>Most inventory items and crafting materials</li>
              </ul>

              <h4>What Do You Keep?</h4>
              <ul>
                <li>Unlocked systems (like the ElectroShop)</li>
                <li>Prestige-exclusive upgrades and bonuses</li>
                <li>Special resources unlocked post-prestige</li>
              </ul>
              
              <p className="tooltip-tip">💡 Tip: Time your prestige carefully - make sure you've maximized your current run's potential first!</p>
            </div>
          )}
        </div>

        <div className="tooltip-entry">
          <h3 onClick={() => toggleTip('happinessInLife')}>
            🧠 What Is Happiness in Life? {expandedTip === 'happinessInLife' ? '▼' : '▶'}
          </h3>
          {expandedTip === 'happinessInLife' && (
            <div className="tooltip-section">
              <p><em>"Buried in notifications and leftover pizza is something like peace. Some moments are joy. Most are just buffering."</em></p>

              <p><strong>Objective:</strong> Trick your brain into releasing dopamine without spending $8.99 on a mood skin.</p>
              <ul>
                <li>Accept naps, cheese, dog videos, and the void</li>
                <li>Reject group chats named “GrindSquad💪” and unsolicited advice from Chad</li>
                <li>Your accuracy improves with hydration and weird hobbies</li>
                <li>Beware: happiness may be disguised as boredom or a half-dead plant you forgot about</li>
              </ul>

              <p className="tooltip-tip">💡 Tip: “Your brain is easily fooled. Use this power for good.”</p>
              <p className="tooltip-junk">🗑 Junk Data: Includes bursts of dance energy, mild existentialism, 12 open tabs, and an emotional support beverage.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
