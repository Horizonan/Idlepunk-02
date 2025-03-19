
import React, { useState, useEffect } from 'react';

export default function DroneEffect({ numDrones }) {
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    const drones = Array(numDrones).fill().map(() => ({
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

  return (
    <>
      {positions.map((pos, index) => (
        <img
          key={index}
          src="/src/Icons/Upgrades/drone.png"
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
