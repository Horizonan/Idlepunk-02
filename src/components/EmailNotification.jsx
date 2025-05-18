
import React, { useState, useEffect } from 'react';
import './EmailNotification.css';

export default function EmailNotification({ email, onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isVisible) {
      const timer = setTimeout(onClose, 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <div className={`email-notification ${isVisible ? 'visible' : 'hiding'}`}>
      <div className="email-header">
        <span className="email-from">{email.from}</span>
        <button className="close-button" onClick={() => setIsVisible(false)}>×</button>
      </div>
      <div className="email-subject">{email.subject}</div>
    </div>
  );
}
