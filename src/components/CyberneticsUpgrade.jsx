
import React from 'react';

export default function CyberneticsUpgrade({ onClose }) {
  const slots = [
    { id: 'head', label: 'Neural Interface', x: '50%', y: '5%' },
    { id: 'heart', label: 'Core Amplifier', x: '50%', y: '25%' },
    { id: 'bodyUpper', label: 'Upper Frame', x: '50%', y: '35%' },
    { id: 'bodyLower', label: 'Lower Frame', x: '50%', y: '45%' },
    { id: 'leftArm', label: 'Left Servo', x: '20%', y: '35%' },
    { id: 'rightArm', label: 'Right Servo', x: '80%', y: '35%' },
    { id: 'leftLeg', label: 'Left Hydraulics', x: '35%', y: '75%' },
    { id: 'rightLeg', label: 'Right Hydraulics', x: '65%', y: '75%' }
  ];

  return (
    <div className="store-container cybernetics-container">
      <h2>Cybernetic Enhancements</h2>
      <div className="human-diagram">
        {slots.map(slot => (
          <div
            key={slot.id}
            className={`cyber-slot ${slot.id}`}
            style={{
              left: slot.x,
              top: slot.y
            }}
            title="Not enough ascension energy in system, cannot boot up..."
          >
            <div className="slot-label">{slot.label}</div>
          </div>
        ))}
        <div className="human-outline"></div>
      </div>
      <button onClick={onClose}>Back</button>
    </div>
  );
}
