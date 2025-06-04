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

    // Auto-collect effect for pickups
    const collectInterval = setInterval(() => {
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

        // Auto-collect range - 100 pixels
        const collectRange = 100;

        if (distance <= collectRange) {
          // Auto-collect when within range
          pickup.click();
        }
      });
    }, 16); // ~60fps

    return () => {
      clearInterval(collectInterval);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isActive, mousePosition]);

  // Check if radius styling should be shown
  const showRadius = localStorage.getItem('showPickupMagnetRadius') !== 'false';

  // Render magnet field visualization when active and radius styling is enabled
  if (!isActive || !showRadius) return null;

  return (
    <div
      style={{
        position: 'fixed',
        left: mousePosition.x - 50,
        top: mousePosition.y - 50,
        width: '100px',
        height: '100px',
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