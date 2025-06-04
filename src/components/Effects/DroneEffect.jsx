
import React, { useState, useEffect } from 'react';

export default function DroneEffect({ numDrones }) {
  const [positions, setPositions] = useState([]);
  const showDrones = localStorage.getItem('showDrones') !== 'false';
  const maxVisibleDrones = Math.min(
    Number(localStorage.getItem('maxVisibleDrones')) || 10,
    numDrones
  );

  useEffect(() => {
    setPositions(prevPositions => {
      const newLength = Math.min(Number(localStorage.getItem('maxVisibleDrones')) || 10, numDrones);
      if (newLength > prevPositions.length) {
        return [...prevPositions, ...Array(newLength - prevPositions.length).fill().map(() => ({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          targetX: Math.random() * window.innerWidth,
          targetY: Math.random() * window.innerHeight
        }))];
      }
      return prevPositions.slice(0, newLength);
    });
  }, [numDrones]);

  useEffect(() => {
    const drones = Array(maxVisibleDrones).fill().map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      targetX: Math.random() * window.innerWidth,
      targetY: Math.random() * window.innerHeight
    }));
    setPositions(drones);

    const moveInterval = setInterval(() => {
      setPositions(prevPositions => 
        prevPositions.map(drone => {
          if (Math.abs(drone.x - drone.targetX) < 5 && Math.abs(drone.y - drone.targetY) < 5) {
            return {
              ...drone,
              targetX: Math.random() * window.innerWidth,
              targetY: Math.random() * window.innerHeight
            };
          }
          return {
            ...drone,
            x: drone.x + (drone.targetX - drone.x) * 0.02,
            y: drone.y + (drone.targetY - drone.y) * 0.02
          };
        })
      );
    }, 50);

    return () => clearInterval(moveInterval);
  }, [numDrones]);

  if (!showDrones) return null;

  return (
    <>
      {positions.map((pos, index) => (
        <img
          key={index}
          src="/Icons/Upgrades/drone.svg"
          alt={`Scrap Drone ${index + 1}`}
          style={{
            position: 'fixed',
            left: pos.x,
            top: pos.y,
            width: '32px',
            height: '32px',
            pointerEvents: 'none',
            zIndex: 1000,
            transition: 'left 2s ease-in-out, top 2s ease-in-out',
            filter: 'drop-shadow(0 0 5px #9400D3)'
          }}
        />
      ))}
    </>
  );
}
