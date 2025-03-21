
import React from 'react';

export default function CyberneticsUpgrade({ onClose }) {
  const slots = [
    { id: 'head', label: 'Neural Interface' },
    { id: 'heart', label: 'Core Amplifier' },
    { id: 'bodyUpper', label: 'Upper Frame' },
    { id: 'bodyLower', label: 'Lower Frame' },
    { id: 'leftArm', label: 'Left Servo' },
    { id: 'rightArm', label: 'Right Servo' },
    { id: 'leftLeg', label: 'Left Hydraulics' },
    { id: 'rightLeg', label: 'Right Hydraulics' }
  ];

  return (
    <div className="store-container cybernetics-container">
      <h2>Cybernetic Enhancements</h2>
      <div className="human-diagram">
        {slots.map(slot => (
          <div
            key={slot.id}
            className={`cyber-slot ${slot.id}`}
            
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
