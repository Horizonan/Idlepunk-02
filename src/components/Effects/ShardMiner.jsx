
import React, { useState, useEffect } from 'react';
import './ShardMiner.css';

export default function ShardMiner({ onCollect }) {
  const [storedShards, setStoredShards] = useState(0);
  const [timeUntilNext, setTimeUntilNext] = useState(1800);
  const maxShards = 3;

  useEffect(() => {
    const handleSkipTimer = () => {
      setTimeUntilNext(1);
    };
    window.addEventListener('skipShardTimer', handleSkipTimer);
    return () => window.removeEventListener('skipShardTimer', handleSkipTimer);
  }, []);

  useEffect(() => {
    const miningInterval = setInterval(() => {
      setStoredShards(prev => Math.min(prev + 1, maxShards));
      setTimeUntilNext(1800);
    }, 1800000); // 30 minutes

    const timerInterval = setInterval(() => {
      setTimeUntilNext(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => {
      clearInterval(miningInterval);
      clearInterval(timerInterval);
    };
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

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
      <div className="shard-indicator">
        {storedShards > 0 ? `⚡ x${storedShards}` : formatTime(timeUntilNext)}
      </div>
    </div>
  );
}
