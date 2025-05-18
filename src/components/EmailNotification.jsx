
import React, { useEffect, useState } from 'react';
import './EmailNotification.css';

export default function EmailNotification({ email, onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Allow animation to complete
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`email-notification ${isVisible ? 'visible' : 'hiding'}`}>
      <div className="email-notification-content">
        <div className="email-notification-header">
          <span className="notification-dot">●</span>
          <span className="notification-from">{email.from}</span>
          <button className="notification-close" onClick={() => setIsVisible(false)}>×</button>
        </div>
        <div className="email-notification-subject">{email.subject}</div>
      </div>
    </div>
  );
}
