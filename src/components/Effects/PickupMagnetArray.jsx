import React, { useEffect, useState } from 'react';

export default function PickupMagnetArray() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Check if magnet array is purchased
    const checkMagnetStatus = () => {
      const purchased = localStorage.getItem('pickup_magnet_array_purchased') === 'true';
      setIsActive(purchased);
    };

    checkMagnetStatus();

    // Listen for storage changes to update status
    const handleStorageChange = () => checkMagnetStatus();
    window.addEventListener('storage', handleStorageChange);

    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    if (!isActive) return;

    // Track mouse position
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Magnet effect for pickups
    const magnetInterval = setInterval(() => {
      // Get all floating pickup elements
      const trashElements = document.querySelectorAll('img[alt="Trash Bonus"]');
      const crystalElements = document.querySelectorAll('img[alt="Crystal"]');

      const allPickups = [...trashElements, ...crystalElements];

      allPickups.forEach(pickup => {
        const rect = pickup.getBoundingClientRect();
        const pickupCenter = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        };

        // Calculate distance to cursor
        const distance = Math.sqrt(
          Math.pow(mousePosition.x - pickupCenter.x, 2) + 
          Math.pow(mousePosition.y - pickupCenter.y, 2)
        );

        // Magnet range - 200 pixels
        const magnetRange = 200;
        const collectRange = 30;

        if (distance <= collectRange) {
          // Auto-collect when very close to cursor
          pickup.click();
        } else if (distance <= magnetRange) {
          // FIRST - Mark as being in magnet field and COMPLETELY stop all animations
          if (!pickup.dataset.magnetized) {
            pickup.dataset.magnetized = 'true';

            // Store current computed position for smooth transition
            const currentRect = pickup.getBoundingClientRect();
            pickup.dataset.magnetStartX = currentRect.left.toString();
            pickup.dataset.magnetStartY = currentRect.top.toString();
          }

          // FORCE STOP ALL ANIMATIONS - Apply every frame to ensure they stay stopped
          pickup.style.setProperty('animation', 'none', 'important');
          pickup.style.setProperty('animation-play-state', 'paused', 'important');
          pickup.style.setProperty('animation-duration', '0s', 'important');
          pickup.style.setProperty('animation-iteration-count', '0', 'important');
          pickup.style.setProperty('transform', 'none', 'important');
          pickup.style.setProperty('transform-origin', 'center', 'important');

          // Calculate magnetic pull direction
          const dx = mousePosition.x - pickupCenter.x;
          const dy = mousePosition.y - pickupCenter.y;

          // Normalize and apply magnet strength
          const magnetStrength = Math.min(4, (magnetRange - distance) / 50);
          const moveX = (dx / distance) * magnetStrength;
          const moveY = (dy / distance) * magnetStrength;

          // Apply magnetic pull with position override
          pickup.style.setProperty('position', 'fixed', 'important');
          pickup.style.setProperty('left', `${rect.left + moveX}px`, 'important');
          pickup.style.setProperty('top', `${rect.top + moveY}px`, 'important');
          pickup.style.setProperty('transition', 'left 0.1s ease-out, top 0.1s ease-out', 'important');
          pickup.style.setProperty('z-index', '9999', 'important');

          // Add visual magnet effect
          const magnetFilter = pickup.alt === 'Trash Bonus' 
            ? 'drop-shadow(0 0 15px #00ffff) drop-shadow(0 0 10px #00ff00)'
            : 'drop-shadow(0 0 15px #00ffff) drop-shadow(0 0 10px #ff00ff)';
          pickup.style.setProperty('filter', magnetFilter, 'important');

        } else {
          // Only restore when COMPLETELY outside magnet range
          if (pickup.dataset.magnetized === 'true') {
            // Clear all magnet-applied styles
            pickup.style.removeProperty('animation');
            pickup.style.removeProperty('animation-play-state');
            pickup.style.removeProperty('animation-duration');
            pickup.style.removeProperty('animation-iteration-count');
            pickup.style.removeProperty('transform');
            pickup.style.removeProperty('transform-origin');
            pickup.style.removeProperty('position');
            pickup.style.removeProperty('left');
            pickup.style.removeProperty('top');
            pickup.style.removeProperty('transition');
            pickup.style.removeProperty('z-index');
            pickup.style.removeProperty('filter');

            // Remove magnet flag
            delete pickup.dataset.magnetized;
            delete pickup.dataset.magnetStartX;
            delete pickup.dataset.magnetStartY;
          }
        }
      });
    }, 16); // ~60fps

    return () => {
      clearInterval(magnetInterval);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isActive, mousePosition]);

  // Render magnet field visualization when active
  if (!isActive) return null;

  return (
    <div
      style={{
        position: 'fixed',
        left: mousePosition.x - 100,
        top: mousePosition.y - 100,
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        border: '2px solid rgba(0, 255, 255, 0.3)',
        background: 'radial-gradient(circle, rgba(0, 255, 255, 0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 9998,
        animation: 'magnetPulse 2s infinite ease-in-out'
      }}
    />
  );
}