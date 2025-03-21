
import React from 'react';

export default function CyberneticsUpgrade({ onClose }) {
  const slots = [
    { id: 'head', label: 'Neural Interface', top: '10%', left: '50%' },
    { id: 'heart', label: 'Core Amplifier', top: '30%', left: '50%' },
    { id: 'bodyUpper', label: 'Upper Frame', top: '40%', left: '50%' },
    { id: 'bodyLower', label: 'Lower Frame', top: '50%', left: '50%' },
    { id: 'leftArm', label: 'Left Servo', top: '35%', left: '25%' },
    { id: 'rightArm', label: 'Right Servo', top: '35%', left: '75%' },
    { id: 'leftLeg', label: 'Left Hydraulics', top: '75%', left: '40%' },
    { id: 'rightLeg', label: 'Right Hydraulics', top: '75%', left: '60%' }
  ];

  return (
    <div className="store-container cybernetics-container">
      <h2>Cybernetic Enhancements</h2>
      <div className="human-diagram">
        {slots.map(slot => (
          <div
            key={slot.id}
            className="cyber-slot"
            style={{
              position: 'absolute',
              top: slot.top,
              left: slot.left,
              transform: 'translate(-50%, -50%)'
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
