
import { useState, useEffect, useCallback } from 'react';

export default function useUnifiedTooltip() {
  const [tooltip, setTooltip] = useState({
    isVisible: false,
    position: { x: 0, y: 0 },
    item: null
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const showTooltip = useCallback((item, event) => {
    if (isMobile) {
      // On mobile, center the tooltip
      setTooltip({
        isVisible: true,
        position: { x: 0, y: 0 },
        item
      });
    } else {
      // On desktop, position near cursor
      const rect = event.target.getBoundingClientRect();
      setTooltip({
        isVisible: true,
        position: {
          x: rect.left + rect.width / 2,
          y: rect.top
        },
        item
      });
    }
  }, [isMobile]);

  const hideTooltip = useCallback(() => {
    setTooltip(prev => ({ ...prev, isVisible: false }));
  }, []);

  const updatePosition = useCallback((event) => {
    if (isMobile || !tooltip.isVisible) return;
    
    const rect = event.target.getBoundingClientRect();
    setTooltip(prev => ({
      ...prev,
      position: {
        x: rect.left + rect.width / 2,
        y: rect.top
      }
    }));
  }, [isMobile, tooltip.isVisible]);

  return {
    tooltip,
    showTooltip,
    hideTooltip,
    updatePosition,
    isMobile
  };
}
