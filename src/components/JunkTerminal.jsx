
import React, { useState, useEffect } from 'react';
import { useEmailStore } from '../utils/emailStore';
import './JunkTerminal.css';

export default function JunkTerminal() {
  const emails = useEmailStore((state) => state.emails);
  const markAsRead = useEmailStore((state) => state.markAsRead);
  const [selectedEmail, setSelectedEmail] = useState(null);

  useEffect(() => {
    useEmailStore.getState().initializeEmailSystem();
  }, []);

  const handleEmailSelect = (email) => {
    setSelectedEmail(email);
    if (!email.read) {
      markAsRead(email.id);
    }
  };

  return (
    <div className="terminal-container">
      <div className="terminal-header">
        <h3>📧 JUNK TERMINAL v1.0</h3>
      </div>
      <div className="email-list">
        {emails.map(email => (
          <div 
            key={email.id} 
            className={`email-item ${!email.read ? 'unread' : ''} ${selectedEmail?.id === email.id ? 'selected' : ''}`}
            onClick={() => handleEmailSelect(email)}
          >
            {!email.read && <span className="unread-dot">●</span>}
            <div className="email-header">
              <span className="email-from">{email.from}</span>
              <span className="email-timestamp">{email.timestamp}</span>
            </div>
            <div className="email-subject">{email.subject}</div>
          </div>
        ))}
      </div>
      {selectedEmail && (
        <div className="email-content">
          <h4>{selectedEmail.subject}</h4>
          <p className="email-sender">From: {selectedEmail.from}</p>
          <p className="email-body">{selectedEmail.content}</p>
        </div>
      )}
    </div>
  );
}
