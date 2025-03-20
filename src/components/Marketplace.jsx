
import React from 'react';

export default function Marketplace({ onClose }) {
  const dialogueOptions = [
    {
      id: 'crystal',
      text: "Ask about crystal shards",
      response: "Ever felt the hum of the city? There's power in the ether, waiting to be harnessed."
    },
    {
      id: 'business',
      text: "How's business?",
      response: "Ah, the usual ebb and flow. Every piece of scrap tells a story, and every story has its price."
    },
    {
      id: 'future',
      text: "What's next for the city?",
      response: "The city's always changing, kid. Those who adapt, thrive. Those who don't... well, they become part of the scrap."
    }
  ];

  const [selectedResponse, setSelectedResponse] = useState(null);

  return (
    <div className="store-container marketplace">
      <h2>Marketplace</h2>
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
      <button onClick={onClose}>Close</button>
    </div>
  );
}
