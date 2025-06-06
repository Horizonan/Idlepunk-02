
import React, { useState, useEffect, useRef } from 'react';

export default function UnifiedTooltip({
  isVisible,
  position = { x: 0, y: 0 },
  item,
  onClose,
  isMobile = false
}) {
  const tooltipRef = useRef(null);
  const [tooltipPosition, setTooltipPosition] = useState('tooltip-position-bottom');

  useEffect(() => {
    if (!isVisible || !tooltipRef.current) return;

    if (isMobile) return; // Mobile uses fixed positioning

    const tooltip = tooltipRef.current;
    const rect = tooltip.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let newPosition = 'tooltip-position-bottom';

    // Check if tooltip would go off screen and adjust position
    if (position.y + rect.height > viewportHeight - 20) {
      newPosition = 'tooltip-position-top';
    }
    if (position.x + rect.width > viewportWidth - 20) {
      newPosition = newPosition.replace('bottom', 'left').replace('top', 'left');
    }
    if (position.x - rect.width < 20) {
      newPosition = newPosition.replace('left', 'right');
    }

    setTooltipPosition(newPosition);
  }, [isVisible, position, isMobile]);

  if (!isVisible || !item) return null;

  const formatNumber = (num) => {
    if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const getEffectClass = (value, isPositive = true) => {
    if (value === 0) return 'tooltip-effect-neutral';
    return isPositive ? 'tooltip-effect-positive' : 'tooltip-effect-negative';
  };

  const renderStats = () => {
    if (!item.effects || item.effects.length === 0) return null;

    return (
      <div className="tooltip-stats">
        {item.effects.map((effect, index) => (
          <div key={index} className="tooltip-stat">
            <span className="tooltip-stat-label">{effect.label}:</span>
            <span className={`tooltip-stat-value ${effect.value > 0 ? 'tooltip-stat-positive' : effect.value < 0 ? 'tooltip-stat-negative' : 'tooltip-stat-neutral'}`}>
              {effect.prefix || ''}{formatNumber(effect.value)}{effect.suffix || ''}
            </span>
          </div>
        ))}
      </div>
    );
  };

  const renderRequirements = () => {
    if (!item.requirements || item.requirements.length === 0) return null;

    const allMet = item.requirements.every(req => req.met);

    return (
      <div className={`tooltip-requirements ${allMet ? 'met' : ''}`}>
        {item.requirements.map((req, index) => (
          <div key={index} className="tooltip-requirement">
            <span className="tooltip-stat-label">{req.label}:</span>
            <span className={req.met ? 'tooltip-requirement-met' : 'tooltip-requirement-unmet'}>
              {formatNumber(req.current)}/{formatNumber(req.required)}
            </span>
          </div>
        ))}
      </div>
    );
  };

  const renderPrice = () => {
    if (!item.price) return null;

    const canAfford = item.canAfford !== false;

    return (
      <div className="tooltip-price">
        <span className="tooltip-price-label">Cost:</span>
        <span className={`tooltip-price-value ${canAfford ? '' : 'tooltip-price-unaffordable'}`}>
          {formatNumber(item.price)} {item.currency || 'Junk'}
        </span>
      </div>
    );
  };

  const tooltipStyle = isMobile ? {} : {
    left: position.x,
    top: position.y,
  };

  return (
    <div
      ref={tooltipRef}
      className={`unified-tooltip ${isVisible ? 'visible' : ''} ${isMobile ? '' : tooltipPosition}`}
      style={tooltipStyle}
    >
      {isMobile && (
        <button className="tooltip-mobile-close" onClick={onClose}>
          ×
        </button>
      )}
      
      <div className="tooltip-header">
        <h3 className="tooltip-title">{item.name}</h3>
        {item.subtitle && <p className="tooltip-subtitle">{item.subtitle}</p>}
      </div>

      <div className="tooltip-body">
        {item.description && (
          <p className="tooltip-description">{item.description}</p>
        )}

        {renderStats()}
        {renderRequirements()}
      </div>

      <div className="tooltip-footer">
        {renderPrice()}
        
        {item.owned !== undefined && (
          <div className="tooltip-owned">
            Owned: {item.owned}
          </div>
        )}

        {item.hotkey && (
          <div className="tooltip-hotkey">
            Hotkey: {item.hotkey}
          </div>
        )}
      </div>
    </div>
  );
}
