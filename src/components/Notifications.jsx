import { useState } from 'react';

export default function Notifications({ notifications }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayNotifications = isExpanded ? notifications : notifications.slice(-5);

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <span>Notifications</span>
        <button onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? 'Show Less' : 'Show More'}
        </button>
      </div>
      <div className="notifications-list">
        {displayNotifications.map((msg, i) => (
          <div key={i} className="notification">{msg}</div>
        ))}
      </div>
    </div>
  );
}
