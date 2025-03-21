
import React, { useState, useRef, useEffect } from 'react';

export default function ActiveCheats({ cheats, onToggleCheat, onClose }) {
  const [position, setPosition] = useState(() => {
    const stored = localStorage.getItem('activeCheatsPosition');
    return stored ? JSON.parse(stored) : { x: 20, y: 20 };
  });
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const dragStartRef = useRef({ x: 0, y: 0, pos: { x: 0, y: 0 } });

  const handleMouseDown = (e) => {
    if (e.target.className === 'close-btn') return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      pos: { ...position }
    };
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;
      
      const newPosition = {
        x: dragStartRef.current.pos.x + dx,
        y: dragStartRef.current.pos.y + dy
      };
      
      setPosition(newPosition);
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        localStorage.setItem('activeCheatsPosition', JSON.stringify(position));
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, position]);

  useEffect(() => {
    return () => {
      localStorage.setItem('activeCheatsPosition', JSON.stringify(position));
    };
  }, [position]);

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
