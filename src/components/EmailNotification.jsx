
import React, { useEffect, useState } from 'react';
import './EmailNotification.css';

export default function EmailNotification({ email, onClose }) {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldClose, setShouldClose] = useState(false);

  useEffect(() => {
    const visibilityTimer = setTimeout(() => {
      setIsVisible(false);
      setShouldClose(true);
    }, 5000);

    return () => clearTimeout(visibilityTimer);
  }, []);

  useEffect(() => {
    if (shouldClose) {
      const closeTimer = setTimeout(onClose, 300);
      return () => clearTimeout(closeTimer);
    }
  }, [shouldClose, onClose]);

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
