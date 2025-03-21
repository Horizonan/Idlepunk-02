import React, { useState, useEffect } from 'react';

export default function Marketplace({ onClose, junk, passiveIncome, cogfatherLore = [], setShowQuestLog }) {
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
    ...(cogfatherLore && cogfatherLore.includes("001") ? [{
      id: 'lore',
      text: '📘 Cogfather Lore Entry #001 – "Awakening in Neon Ash"',
      response: `"They call me the Cogfather now, but I wasn't always scraps and circuits. I woke buried beneath a heap of sparking neon signs, twisted wires wrapping around me like roots. No memories, just the hum of voltage under my skin and an AI voice whispering endless streams of broken code.

"Scrappers found me rusting in that junkpile, patched me up with metal plates and copper threads, thinking I was just another broken machine. Little did they know, beneath the tarnished chrome lay more questions than answers."

"I adapted, scavenged, and learned from every pulse of electricity and every flicker of the city's dying neon. Now, I see the truth behind the junk: it's not broken. It's waiting—just like I was—for someone brave enough to put the pieces together."

"If you're reading this, you might be that someone. Keep digging, kid. The city's secrets are never far beneath the surface."

— The Cogfather`
    }] : []),
    ...(showPrestigeDialogue ? [{
      id: 'prestige',
      text: "Is there more to this life than collecting junk?",
      response: "You've scraped the surface, kid… but there's a bigger circuit to plug into. I'll update your quest log with new information. Come back stronger — I'll be waiting.",
      onSelect: () => {
        localStorage.setItem('ascensionUnlocked', 'true');
        setShowQuestLog(true);
        window.location.reload();
      }
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
            {selectedResponse}
          </div>
        )}
      </div>
    </div>
  );
}