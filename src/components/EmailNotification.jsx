
import React, { useEffect, useState } from 'react';
import './EmailNotification.css';

export default function EmailNotification({ email, onClose }) {
  const [isVisible, setIsVisible] = useState(true);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => clearTimeout(hideTimer);
  }, []);

  useEffect(() => {
    if (!isVisible && mounted) {
      const closeTimer = setTimeout(() => {
        setMounted(false);
        onClose();
      }, 300);

      return () => clearTimeout(closeTimer);
    }
  }, [isVisible, onClose, mounted]);

  if (!mounted) return null;

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
