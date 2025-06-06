
import React from 'react';
import useUnifiedTooltip from '../hooks/useUnifiedTooltip';
import UnifiedTooltip from './UnifiedTooltip/UnifiedTooltip';
import { formatTooltipItem } from '../utils/tooltipFormatter';

export default function TooltipWrapper({ children, tooltipData, gameState }) {
  const { tooltip, showTooltip, hideTooltip, updatePosition, isMobile } = useUnifiedTooltip();

  const handleMouseEnter = (event) => {
    if (!tooltipData) return;
    const formattedItem = formatTooltipItem(tooltipData, gameState);
    showTooltip(formattedItem, event);
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      hideTooltip();
    }
  };

  const handleClick = (event) => {
    if (isMobile && tooltipData) {
      event.preventDefault();
      const formattedItem = formatTooltipItem(tooltipData, gameState);
      showTooltip(formattedItem, event);
    }
  };

  return (
    <>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        style={{ position: 'relative' }}
      >
        {children}
      </div>
      
      <UnifiedTooltip
        isVisible={tooltip.isVisible}
        position={tooltip.position}
        item={tooltip.item}
        onClose={hideTooltip}
        isMobile={isMobile}
      />
    </>
  );
}
