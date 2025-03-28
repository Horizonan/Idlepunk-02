
import React, { useState, useEffect } from 'react';
import './ShardMiner.css';

export default function ShardMiner({ onCollect }) {
  const [storedShards, setStoredShards] = useState(0);
  const [timeUntilNext, setTimeUntilNext] = useState(1800);
  const [readyToCollect, setReadyToCollect] = useState(false);
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
      if (storedShards < maxShards) {
        setReadyToCollect(true);
      }
      setTimeUntilNext(1800);
    }, 1800000); // 30 minutes

    const timerInterval = setInterval(() => {
      setTimeUntilNext(prev => {
        if (prev <= 0) {
          if (storedShards < maxShards) {
            setReadyToCollect(true);
          }
          return 1800;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(miningInterval);
      clearInterval(timerInterval);
    };
  }, [storedShards]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleClick = () => {
    if (readyToCollect) {
      setStoredShards(prev => Math.min(prev + 1, maxShards));
      setReadyToCollect(false);
    } else if (storedShards > 0) {
      onCollect(storedShards);
      setStoredShards(0);
    }
  };

  return (
    <div 
      className={`shard-miner ${readyToCollect || storedShards > 0 ? 'ready' : ''}`}
      onClick={handleClick}
    >
      <div className="miner-body">
        <div className="miner-glow"></div>
      </div>
      <div className="shard-indicator">
        {storedShards > 0 ? `⚡ x${storedShards}` : readyToCollect ? '⚡ Ready!' : formatTime(timeUntilNext)}
      </div>
    </div>
  );
}
