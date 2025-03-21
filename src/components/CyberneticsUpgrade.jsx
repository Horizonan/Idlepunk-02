
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
      <div className="human-diagram" style={{ position: 'relative', height: '600px', margin: '20px auto' }}>
        <div
          className="cyber-slot"
          style={{ top: '50px', left: '50%', transform: 'translateX(-50%)' }}
        >
          <div className="slot-label">Neural Interface</div>
        </div>
        
        <div
          className="cyber-slot"
          style={{ top: '150px', left: '50%', transform: 'translateX(-50%)' }}
        >
          <div className="slot-label">Core Amplifier</div>
        </div>
        
        <div
          className="cyber-slot"
          style={{ top: '250px', left: '35%', transform: 'translateX(-50%)' }}
        >
          <div className="slot-label">Left Servo</div>
        </div>
        
        <div
          className="cyber-slot"
          style={{ top: '250px', left: '65%', transform: 'translateX(-50%)' }}
        >
          <div className="slot-label">Right Servo</div>
        </div>
        
        <div
          className="cyber-slot"
          style={{ top: '200px', left: '50%', transform: 'translateX(-50%)' }}
        >
          <div className="slot-label">Upper Frame</div>
        </div>
        
        <div
          className="cyber-slot"
          style={{ top: '300px', left: '50%', transform: 'translateX(-50%)' }}
        >
          <div className="slot-label">Lower Frame</div>
        </div>
        
        <div
          className="cyber-slot"
          style={{ top: '450px', left: '40%', transform: 'translateX(-50%)' }}
        >
          <div className="slot-label">Left Hydraulics</div>
        </div>
        
        <div
          className="cyber-slot"
          style={{ top: '450px', left: '60%', transform: 'translateX(-50%)' }}
        >
          <div className="slot-label">Right Hydraulics</div>
        </div>
      </div>
      <button onClick={onClose}>Back</button>
    </div>
  );
}
