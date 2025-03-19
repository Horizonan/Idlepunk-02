
import React, { useState, useRef, useEffect } from 'react';

export default function ActiveCheats({ cheats, onToggleCheat, onClose }) {
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    const rect = containerRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className="active-cheats"
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
    >
      <div className="cheat-handle" onMouseDown={handleMouseDown}>
        Active Cheats
        {onClose && <button className="close-btn" onClick={onClose}>×</button>}
      </div>
      <div className="cheat-list">
        {Object.entries(cheats).map(([cheatName, isActive]) => (
          <div key={cheatName} className="cheat-item">
            <label>
              <input
                type="checkbox"
                checked={isActive}
                onChange={() => onToggleCheat(cheatName)}
              />
              {cheatName}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
