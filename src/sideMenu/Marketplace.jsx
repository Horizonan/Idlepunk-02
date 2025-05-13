
import React, { useState } from 'react';
import '../styles/Store.css';

export default function Marketplace({ onClose }) {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [selectedResponse, setSelectedResponse] = useState(null);
  const [loreFragments] = useState([
    { id: 1, title: "The Great Collapse", content: "In the wake of the techno-industrial collapse, the junk trade became the new currency of power..." },
    { id: 2, title: "Rise of the Cogfather", content: "From the ashes of the old world rose the mysterious Cogfather, a figure who saw potential in what others discarded..." },
    { id: 3, title: "Scrappers' Code", content: "First rule of junking: Everything has value, if you know where to look..." }
  ]);

  const renderLoreTerminal = () => (
    <div className="lore-terminal">
      <h3 style={{ color: '#00FF00' }}>📚 Lore Terminal</h3>
      <div className="lore-fragments">
        {loreFragments.map(fragment => (
          <div key={fragment.id} className="lore-fragment">
            <h4>{fragment.title}</h4>
            <p>{fragment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCogfather = () => {
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
      }
    ];

    return (
      <div className="cogfather-dialogue">
        <h3 style={{ color: '#00FF00' }}>🎭 The Cogfather</h3>
        <div className="dialogue-content">
          <img src="/Icons/NPCs/Cogfather.jfif" alt="Cogfather" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
          <p>"Ah, another scrapper seeking fortune in the wastes. Remember, in this world of rust and ruin, knowledge is as valuable as the junk you collect..."</p>
        </div>
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
    );
  };

  return (
    <div className="store-container">
      <div className="store-header">
        <h2>Junktown Nexus</h2>
        <button onClick={onClose}>Close</button>
      </div>
      
      <div className="nexus-options">
        <button 
          className={`store-item ${selectedCharacter === 'cogfather' ? 'selected' : ''}`}
          onClick={() => setSelectedCharacter('cogfather')}
        >
          <div className="item-header">
            <strong>🎭 The Cogfather</strong>
          </div>
          <div className="item-info">
            <p>Seek wisdom from the mysterious master of the junk trade</p>
          </div>
        </button>

        <button 
          className={`store-item ${selectedCharacter === 'terminal' ? 'selected' : ''}`}
          onClick={() => setSelectedCharacter('terminal')}
        >
          <div className="item-header">
            <strong>📚 Lore Terminal</strong>
          </div>
          <div className="item-info">
            <p>Access archived knowledge about the world</p>
          </div>
        </button>
      </div>

      <div className="nexus-content">
        {selectedCharacter === 'cogfather' && renderCogfather()}
        {selectedCharacter === 'terminal' && renderLoreTerminal()}
      </div>
    </div>
  );
}
