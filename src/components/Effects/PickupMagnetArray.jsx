
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
          // Store ALL original CSS properties if not already stored and pause animations immediately
          if (!pickup.dataset.magnetActive) {
            const computedStyle = window.getComputedStyle(pickup);
            pickup.dataset.originalLeft = pickup.style.left || computedStyle.left;
            pickup.dataset.originalTop = pickup.style.top || computedStyle.top;
            pickup.dataset.originalPosition = pickup.style.position || computedStyle.position;
            pickup.dataset.originalTransform = pickup.style.transform || computedStyle.transform;
            pickup.dataset.originalAnimation = pickup.style.animation || computedStyle.animation;
            pickup.dataset.originalTransition = pickup.style.transition || computedStyle.transition;
            pickup.dataset.originalZIndex = pickup.style.zIndex || computedStyle.zIndex;
            pickup.dataset.magnetActive = 'true';
            
            // Pause original animations immediately when entering magnet range
            pickup.style.transform = 'none !important';
            pickup.style.animation = 'none !important';
            pickup.style.animationPlayState = 'paused';
          }

          // Calculate direction towards cursor for magnetic pull
          const dx = mousePosition.x - pickupCenter.x;
          const dy = mousePosition.y - pickupCenter.y;

          // Normalize and apply magnet strength
          const magnetStrength = Math.min(3, (magnetRange - distance) / 60); // Stronger pull when closer
          const moveX = (dx / distance) * magnetStrength;
          const moveY = (dy / distance) * magnetStrength;

          // Get current position from rect (always accurate)
          const currentX = rect.left;
          const currentY = rect.top;

          // Apply magnetic pull with smooth transition
          pickup.style.position = 'fixed';
          pickup.style.left = `${currentX + moveX}px`;
          pickup.style.top = `${currentY + moveY}px`;
          pickup.style.transition = 'left 0.1s ease-out, top 0.1s ease-out';
          pickup.style.zIndex = '9999';

          // Add magnet effect visual
          pickup.style.filter = pickup.alt === 'Trash Bonus' 
            ? 'drop-shadow(0 0 15px #00ffff) drop-shadow(0 0 10px #00ff00)'
            : 'drop-shadow(0 0 15px #00ffff) drop-shadow(0 0 10px #ff00ff)';
        } else {
          // Restore ALL original properties when out of range
          if (pickup.dataset.magnetActive === 'true') {
            pickup.style.position = pickup.dataset.originalPosition;
            pickup.style.left = pickup.dataset.originalLeft;
            pickup.style.top = pickup.dataset.originalTop;
            pickup.style.transform = pickup.dataset.originalTransform;
            pickup.style.animation = pickup.dataset.originalAnimation;
            pickup.style.transition = pickup.dataset.originalTransition;
            pickup.style.zIndex = pickup.dataset.originalZIndex;
            pickup.style.animationPlayState = '';
            
            // Clean up stored data
            delete pickup.dataset.originalLeft;
            delete pickup.dataset.originalTop;
            delete pickup.dataset.originalPosition;
            delete pickup.dataset.originalTransform;
            delete pickup.dataset.originalAnimation;
            delete pickup.dataset.originalTransition;
            delete pickup.dataset.originalZIndex;
            delete pickup.dataset.magnetActive;
          }

          // Remove magnet effect when out of range
          const originalFilter = pickup.alt === 'Trash Bonus' 
            ? 'drop-shadow(0 0 10px #00ff00)' 
            : 'drop-shadow(0 0 10px #ff00ff)';
          pickup.style.filter = originalFilter;
          pickup.style.transition = 'all 0.3s ease';
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
