
import React, { useState, useEffect } from 'react';
import '../styles/Notifications.css';

export default function Notifications({ notifications }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileModal, setShowMobileModal] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  const displayNotifications = isExpanded ? notifications : (notifications || []).slice(-5);

  const handleNotificationClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isMobile) {
      setShowMobileModal(true);
    }
  };

  const closeMobileModal = () => {
    setShowMobileModal(false);
  };

  if (!isVisible) {
    return (
      <button 
        className="notifications-reopen-button"
        onClick={() => setIsVisible(true)}
      >
        Show Notifications
      </button>
    );
  }

  // Mobile modal
  if (isMobile && showMobileModal) {
    return (
      <div className="notifications-mobile-modal" onClick={closeMobileModal}>
        <div className="notifications-mobile-content" onClick={(e) => e.stopPropagation()}>
          <div className="notifications-mobile-header">
            <h3>Notifications</h3>
            <button className="notifications-mobile-close" onClick={closeMobileModal}>
              ×
            </button>
          </div>
          <div className="notifications-mobile-body">
            <div className="notifications-mobile-controls">
              <button onClick={() => setIsExpanded(prev => !prev)}>
                {isExpanded ? 'Show Less' : 'Show More'}
              </button>
              <button 
                className="close-notifications" 
                onClick={() => {
                  setIsVisible(false);
                  closeMobileModal();
                }}
              >
                Hide Notifications
              </button>
            </div>
            <div className="notifications-mobile-list">
              {displayNotifications.map((msg, i) => (
                <div key={i} className="notification-mobile-item">
                  {typeof msg === 'string' ? msg : (React.isValidElement(msg) ? msg : (msg.content || msg.message || 'Unknown notification'))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {isMobile ? (
        <button 
          className="notifications-mobile-button"
          onClick={handleNotificationClick}
        >
          Notifications
        </button>
      ) : (
        <div className="notifications-container">
          <div className="notifications-header">
            <span>Notifications</span>
            <div className="notifications-buttons">
              <button onClick={() => setIsExpanded(prev => !prev)}>
                {isExpanded ? 'Show Less' : 'Show More'}
              </button>
              <button 
                className="close-notifications" 
                onClick={() => setIsVisible(false)}
              >
                ×
              </button>
            </div>
          </div>
          <div className="notifications-list">
            {displayNotifications.map((msg, i) => (
              <div key={i} className="notification">
                {typeof msg === 'string' ? msg : (React.isValidElement(msg) ? msg : (msg.content || msg.message || 'Unknown notification'))}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
