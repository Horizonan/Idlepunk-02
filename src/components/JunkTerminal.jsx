
import React, { useState, useEffect, useRef } from 'react';
import { useEmailStore } from '../utils/emailStore';
import './JunkTerminal.css';

const terminalInstances = new Set();

export default function JunkTerminal() {
  const instanceRef = useRef(null);

  useEffect(() => {
    if (terminalInstances.size === 0) {
      instanceRef.current = Symbol();
      terminalInstances.add(instanceRef.current);
      return () => {
        terminalInstances.delete(instanceRef.current);
      };
    } else {
      return;
    }
  }, []);

  if (terminalInstances.size > 0 && !terminalInstances.has(instanceRef.current)) {
    return null;
  }
  const emails = useEmailStore((state) => state.emails);
  const markAsRead = useEmailStore((state) => state.markAsRead);
  const [selectedEmail, setSelectedEmail] = useState(null);

  useEffect(() => {
    useEmailStore.getState().initializeEmailSystem();
  }, []);

  const handleEmailSelect = (email) => {
    if (selectedEmail?.id === email.id) {
      setSelectedEmail(null);
      if (!email.read) {
        markAsRead(email.id);
      }
    } else {
      setSelectedEmail(email);
    }
  };

  const unreadEmails = emails.filter(email => !email.read);
  const readEmails = emails.filter(email => email.read);

  return (
    <div className="terminal-container">
      <div className="terminal-header">
        <h3>📧 JUNK TERMINAL v1.0</h3>
      </div>
      
      {unreadEmails.length > 0 && (
        <div className="email-section">
          <h4 className="section-header">Unread Messages</h4>
          <div className="email-list">
            {unreadEmails.map(email => (
              <div key={email.id}>
                <div 
                  className={`email-item unread ${selectedEmail?.id === email.id ? 'selected' : ''}`}
                  onClick={() => handleEmailSelect(email)}
                >
                  <span className="unread-dot">●</span>
                  <div className="email-header">
                    <span className="email-from">{email.from}</span>
                    <span className="email-timestamp">{email.timestamp}</span>
                  </div>
                  <div className="email-subject">{email.subject}</div>
                </div>
                {selectedEmail?.id === email.id && (
                  <div className="email-content">
                    <h4>{selectedEmail.subject}</h4>
                    <p className="email-sender">From: {selectedEmail.from}</p>
                    <p className="email-body">{selectedEmail.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {readEmails.length > 0 && (
        <div className="email-section">
          <h4 className="section-header">Read Messages</h4>
          <div className="email-list">
            {readEmails.map(email => (
              <div key={email.id}>
                <div 
                  className={`email-item ${selectedEmail?.id === email.id ? 'selected' : ''}`}
                  onClick={() => handleEmailSelect(email)}
                >
                  <div className="email-header">
                    <span className="email-from">{email.from}</span>
                    <span className="email-timestamp">{email.timestamp}</span>
                  </div>
                  <div className="email-subject">{email.subject}</div>
                </div>
                {selectedEmail?.id === email.id && (
                  <div className="email-content">
                    <h4>{selectedEmail.subject}</h4>
                    <p className="email-sender">From: {selectedEmail.from}</p>
                    <p className="email-body">{selectedEmail.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
