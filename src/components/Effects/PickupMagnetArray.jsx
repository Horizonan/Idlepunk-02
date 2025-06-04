
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
          // Store original styles if not already stored
          if (!pickup.dataset.originalStyles) {
            const computedStyle = window.getComputedStyle(pickup);
            pickup.dataset.originalStyles = JSON.stringify({
              animation: pickup.style.animation || computedStyle.animation,
              animationName: pickup.style.animationName || computedStyle.animationName,
              animationDuration: pickup.style.animationDuration || computedStyle.animationDuration,
              animationTimingFunction: pickup.style.animationTimingFunction || computedStyle.animationTimingFunction,
              animationIterationCount: pickup.style.animationIterationCount || computedStyle.animationIterationCount,
              animationDirection: pickup.style.animationDirection || computedStyle.animationDirection,
              animationFillMode: pickup.style.animationFillMode || computedStyle.animationFillMode,
              animationPlayState: pickup.style.animationPlayState || computedStyle.animationPlayState,
              transform: pickup.style.transform || computedStyle.transform,
              position: pickup.style.position || computedStyle.position,
              left: pickup.style.left || computedStyle.left,
              top: pickup.style.top || computedStyle.top,
              zIndex: pickup.style.zIndex || computedStyle.zIndex,
              filter: pickup.style.filter || computedStyle.filter
            });
          }

          // COMPLETELY DISABLE ALL ANIMATIONS
          pickup.style.animation = 'none';
          pickup.style.animationName = 'none';
          pickup.style.animationDuration = '0s';
          pickup.style.animationTimingFunction = 'linear';
          pickup.style.animationIterationCount = '0';
          pickup.style.animationDirection = 'normal';
          pickup.style.animationFillMode = 'none';
          pickup.style.animationPlayState = 'paused';
          pickup.style.transform = 'none';

          // Calculate magnetic pull direction
          const dx = mousePosition.x - pickupCenter.x;
          const dy = mousePosition.y - pickupCenter.y;

          // Normalize and apply magnet strength
          const magnetStrength = Math.min(4, (magnetRange - distance) / 50);
          const moveX = (dx / distance) * magnetStrength;
          const moveY = (dy / distance) * magnetStrength;

          // Apply magnetic pull
          pickup.style.position = 'fixed';
          pickup.style.left = `${rect.left + moveX}px`;
          pickup.style.top = `${rect.top + moveY}px`;
          pickup.style.transition = 'left 0.1s ease-out, top 0.1s ease-out';
          pickup.style.zIndex = '9999';

          // Add visual magnet effect
          const magnetFilter = pickup.alt === 'Trash Bonus' 
            ? 'drop-shadow(0 0 15px #00ffff) drop-shadow(0 0 10px #00ff00)'
            : 'drop-shadow(0 0 15px #00ffff) drop-shadow(0 0 10px #ff00ff)';
          pickup.style.filter = magnetFilter;

        } else {
          // Restore original styles when outside magnet range
          if (pickup.dataset.originalStyles) {
            const originalStyles = JSON.parse(pickup.dataset.originalStyles);
            
            // Restore all original properties
            Object.keys(originalStyles).forEach(property => {
              if (originalStyles[property] && originalStyles[property] !== 'none') {
                pickup.style[property] = originalStyles[property];
              } else {
                pickup.style.removeProperty(property);
              }
            });

            // Clear stored styles
            delete pickup.dataset.originalStyles;
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
