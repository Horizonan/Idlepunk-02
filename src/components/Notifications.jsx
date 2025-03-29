
import { useState } from 'react';
import './Notifications.css';

export default function Notifications({ notifications }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const displayNotifications = isExpanded ? notifications : notifications.slice(-5);

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
          <button onClick={() => setIsExpanded(!isExpanded)}>
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
