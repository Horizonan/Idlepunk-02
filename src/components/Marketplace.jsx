import React, { useState, useEffect } from 'react';

export default function Marketplace({ onClose, junk, passiveIncome }) {
  const [showPrestigeDialogue, setShowPrestigeDialogue] = useState(false);

  useEffect(() => {
    if (passiveIncome >= 100 || junk >= 1000000) {
      setShowPrestigeDialogue(true);
    }
  }, [passiveIncome, junk]);

  const dialogueOptions = [
    {
      id: 'crystal',
      text: "Ask about crystal shards",
      response: "Ever felt the hum of the city? There's power in the ether, waiting to be harnessed."
    },
    {
      id: 'city',
      text: "Tell me about the city",
      response: "This place... it's a living, breathing machine. Every piece of scrap has a story, every alley a secret."
    },
    {
      id: 'business',
      text: "How's business?",
      response: "The flow of scrap never stops in this city. Always something to salvage, always something to trade."
    },
    ...(showPrestigeDialogue ? [{
      id: 'prestige',
      text: "Is there more to this life than collecting junk?",
      response: "You've scraped the surface, kid… but there's a bigger circuit to plug into. Come back stronger — I'll be waiting."
    }] : [])
  ];

  const [selectedResponse, setSelectedResponse] = useState(null);

  return (
    <div className="store-container marketplace">
      <div className="store-header">
        <h2>Marketplace</h2>
        <button onClick={onClose}>Close</button>
      </div>
      <div className="npc-container">
        <h3>The Cogfather</h3>
        <div className="dialogue-options">
          {dialogueOptions.map(option => (
            <button
              key={option.id}
              onClick={() => setSelectedResponse(option.response)}
              className="dialogue-button"
            >
              {option.text}
            </button>
          ))}
        </div>
        {selectedResponse && (
          <div className="dialogue-response">
            "{selectedResponse}"
          </div>
        )}
      </div>
    </div>
  );
}