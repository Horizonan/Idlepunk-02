
import React, { useState, useEffect } from 'react';
import './ShardMiner.css';

export default function ShardMiner({ onCollect }) {
  const [storedShards, setStoredShards] = useState(0);
  const maxShards = 3;

  useEffect(() => {
    const interval = setInterval(() => {
      setStoredShards(prev => Math.min(prev + 1, maxShards));
    }, 1800000); // 30 minutes

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className={`shard-miner ${storedShards > 0 ? 'ready' : ''}`}
      onClick={() => {
        if (storedShards > 0) {
          onCollect(storedShards);
          setStoredShards(0);
        }
      }}
    >
      <div className="miner-body">
        <div className="miner-glow"></div>
      </div>
      {storedShards > 0 && (
        <div className="shard-indicator">
          ⚡ x{storedShards}
        </div>
      )}
    </div>
  );
}
