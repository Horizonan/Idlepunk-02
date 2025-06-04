
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
          // Store original properties and pause animations on first entry to magnet range
          if (!pickup.dataset.magnetActive) {
            const computedStyle = window.getComputedStyle(pickup);
            
            // Store original values
            pickup.dataset.originalLeft = pickup.style.left || computedStyle.left;
            pickup.dataset.originalTop = pickup.style.top || computedStyle.top;
            pickup.dataset.originalPosition = pickup.style.position || computedStyle.position;
            pickup.dataset.originalTransform = pickup.style.transform || computedStyle.transform;
            pickup.dataset.originalAnimation = pickup.style.animation || computedStyle.animation;
            pickup.dataset.originalTransition = pickup.style.transition || computedStyle.transition;
            pickup.dataset.originalZIndex = pickup.style.zIndex || computedStyle.zIndex;
            pickup.dataset.originalFilter = pickup.style.filter || computedStyle.filter;
            
            // Mark as being affected by magnet
            pickup.dataset.magnetActive = 'true';
            
            // Get the current computed position to start smooth transition from
            const currentRect = pickup.getBoundingClientRect();
            pickup.dataset.magnetStartX = currentRect.left.toString();
            pickup.dataset.magnetStartY = currentRect.top.toString();
          }

          // Calculate direction towards cursor for magnetic pull
          const dx = mousePosition.x - pickupCenter.x;
          const dy = mousePosition.y - pickupCenter.y;

          // Normalize and apply magnet strength
          const magnetStrength = Math.min(3, (magnetRange - distance) / 60);
          const moveX = (dx / distance) * magnetStrength;
          const moveY = (dy / distance) * magnetStrength;

          // Apply magnetic pull with overrides
          pickup.style.setProperty('position', 'fixed', 'important');
          pickup.style.setProperty('left', `${rect.left + moveX}px`, 'important');
          pickup.style.setProperty('top', `${rect.top + moveY}px`, 'important');
          pickup.style.setProperty('transition', 'left 0.08s ease-out, top 0.08s ease-out', 'important');
          pickup.style.setProperty('transform', 'none', 'important');
          pickup.style.setProperty('animation', 'none', 'important');
          pickup.style.setProperty('animation-play-state', 'paused', 'important');
          pickup.style.setProperty('z-index', '9999', 'important');

          // Add magnet effect visual
          const magnetFilter = pickup.alt === 'Trash Bonus' 
            ? 'drop-shadow(0 0 15px #00ffff) drop-shadow(0 0 10px #00ff00)'
            : 'drop-shadow(0 0 15px #00ffff) drop-shadow(0 0 10px #ff00ff)';
          pickup.style.setProperty('filter', magnetFilter, 'important');
        } else {
          // Restore original properties when out of magnet range
          if (pickup.dataset.magnetActive === 'true') {
            // Remove all magnet-applied styles
            pickup.style.removeProperty('position');
            pickup.style.removeProperty('left');
            pickup.style.removeProperty('top');
            pickup.style.removeProperty('transform');
            pickup.style.removeProperty('animation');
            pickup.style.removeProperty('animation-play-state');
            pickup.style.removeProperty('transition');
            pickup.style.removeProperty('z-index');
            pickup.style.removeProperty('filter');
            
            // Restore original values if they existed
            if (pickup.dataset.originalPosition !== 'static') {
              pickup.style.position = pickup.dataset.originalPosition;
            }
            if (pickup.dataset.originalLeft !== 'auto') {
              pickup.style.left = pickup.dataset.originalLeft;
            }
            if (pickup.dataset.originalTop !== 'auto') {
              pickup.style.top = pickup.dataset.originalTop;
            }
            if (pickup.dataset.originalTransform !== 'none') {
              pickup.style.transform = pickup.dataset.originalTransform;
            }
            if (pickup.dataset.originalAnimation !== 'none') {
              pickup.style.animation = pickup.dataset.originalAnimation;
            }
            if (pickup.dataset.originalTransition !== 'all 0s ease 0s') {
              pickup.style.transition = pickup.dataset.originalTransition;
            }
            if (pickup.dataset.originalZIndex !== 'auto') {
              pickup.style.zIndex = pickup.dataset.originalZIndex;
            }
            if (pickup.dataset.originalFilter !== 'none') {
              pickup.style.filter = pickup.dataset.originalFilter;
            }
            
            // Clean up stored data
            delete pickup.dataset.originalLeft;
            delete pickup.dataset.originalTop;
            delete pickup.dataset.originalPosition;
            delete pickup.dataset.originalTransform;
            delete pickup.dataset.originalAnimation;
            delete pickup.dataset.originalTransition;
            delete pickup.dataset.originalZIndex;
            delete pickup.dataset.originalFilter;
            delete pickup.dataset.magnetStartX;
            delete pickup.dataset.magnetStartY;
            delete pickup.dataset.magnetActive;
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
