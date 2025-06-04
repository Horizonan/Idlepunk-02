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

    // Magnet effect for pickups
    const magnetInterval = setInterval(() => {
      // Get all floating trash elements
      const trashElements = document.querySelectorAll('img[alt="Trash Bonus"]');
      // Get all floating crystal elements
      const crystalElements = document.querySelectorAll('img[alt="Flying Crystal"]');

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

        // Magnet range - 150 pixels
        const magnetRange = 150;

        if (distance <= magnetRange && distance > 20) {
          // Calculate direction towards cursor
          const dx = mousePosition.x - pickupCenter.x;
          const dy = mousePosition.y - pickupCenter.y;

          // Normalize and apply magnet strength
          const magnetStrength = 3;
          const moveX = (dx / distance) * magnetStrength;
          const moveY = (dy / distance) * magnetStrength;

          // Get current position from computed styles
          const computedStyle = window.getComputedStyle(pickup);
          const currentLeft = parseInt(computedStyle.left) || rect.left;
          const currentTop = parseInt(computedStyle.top) || rect.top;

          // Apply magnetic pull with smooth transition
          pickup.style.position = 'fixed';
          pickup.style.left = `${currentLeft + moveX}px`;
          pickup.style.top = `${currentTop + moveY}px`;
          pickup.style.transition = 'none'; // Remove transitions during magnet pull

          // Add magnet effect visual
          pickup.style.filter = 'drop-shadow(0 0 15px #00ffff) drop-shadow(0 0 10px #ffffff)';
        } else if (distance <= 20) {
          // Auto-collect when very close to cursor
          pickup.click();
        } else {
          // Remove magnet effect when out of range
          const originalFilter = pickup.alt === 'Trash Bonus' 
            ? 'drop-shadow(0 0 10px #00ff00)' 
            : 'drop-shadow(0 0 10px #ff00ff)';
          pickup.style.filter = originalFilter;
           pickup.style.transition = 'all 0.3s ease'; // Restore transitions
        }
      });
    }, 16); // ~60fps

    document.addEventListener('mousemove', handleMouseMove);

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
        left: mousePosition.x - 75,
        top: mousePosition.y - 75,
        width: '150px',
        height: '150px',
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