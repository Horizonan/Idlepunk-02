
import React, { useState } from 'react';
import '../styles/Notifications.css';

export default function Notifications({ notifications }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const displayNotifications = isExpanded ? notifications : (notifications || []).slice(-5);

  const openMobileModal = () => {
    setIsMobileModalOpen(true);
  };

  const closeMobileModal = () => {
    setIsMobileModalOpen(false);
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

  return (
    <>
      {/* Desktop/Default View */}
      <div className="notifications-container desktop-notifications">
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

      {/* Mobile Button */}
      <button 
        className="mobile-notifications-button"
        onClick={openMobileModal}
      >
        📱 {notifications.length}
      </button>

      {/* Mobile Modal */}
      {isMobileModalOpen && (
        <div className="mobile-notifications-modal">
          <div className="mobile-notifications-content">
            <div className="mobile-notifications-header">
              <h2>Notifications</h2>
              <div className="mobile-notifications-controls">
                <button 
                  className="mobile-expand-toggle"
                  onClick={() => setIsExpanded(prev => !prev)}
                >
                  {isExpanded ? 'Show Less' : 'Show All'}
                </button>
                <button 
                  className="mobile-close-button" 
                  onClick={closeMobileModal}
                >
                  ×
                </button>
              </div>
            </div>
            <div className="mobile-notifications-list">
              {displayNotifications.map((msg, i) => (
                <div key={i} className="mobile-notification">
                  {typeof msg === 'string' ? msg : (React.isValidElement(msg) ? msg : (msg.content || msg.message || 'Unknown notification'))}
                </div>
              ))}
              {notifications.length === 0 && (
                <div className="no-notifications">
                  No notifications yet!
                </div>
              )}
            </div>
            <div className="mobile-notifications-footer">
              <button 
                className="mobile-hide-notifications"
                onClick={() => {
                  setIsVisible(false);
                  closeMobileModal();
                }}
              >
                Hide Notifications
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
