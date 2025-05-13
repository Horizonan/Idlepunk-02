
import React, { useState } from 'react';
import './JunkTerminal.css';

export default function JunkTerminal() {
  const [emails] = useState([
    {
      id: 1,
      from: "The Cogfather",
      subject: "Welcome to the Network",
      content: "Welcome to the Junk Network, scrapper. Keep your eyes on this terminal - important intel flows through here like electricity through circuits.",
      timestamp: "2 hours ago",
      read: false
    },
    {
      id: 2,
      from: "Anonymous Streetrat",
      subject: "Hot Tip",
      content: "Hey boss, heard some whispers about a surge coming soon. Might want to keep your clickers ready...",
      timestamp: "1 hour ago",
      read: false
    }
  ]);

  const [selectedEmail, setSelectedEmail] = useState(null);

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
            onClick={() => setSelectedEmail(email)}
          >
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
