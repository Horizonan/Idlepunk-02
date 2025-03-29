import { useState } from 'react';

export default function Notifications({ notifications }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const displayNotifications = isExpanded ? notifications : notifications.slice(-5);

  // If notifications are not visible, show the reopen button
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
          <div key={i} className="notification">{msg}</div>
        ))}
      </div>
    </div>
  );
}