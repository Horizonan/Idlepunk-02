import React, { useState, useEffect } from 'react';
import { useEmailStore } from '../utils/emailStore';
import './JunkTerminal.css';

export default function JunkTerminal() {
  const emails = useEmailStore((state) => state.emails);
  const markAsRead = useEmailStore((state) => state.markAsRead);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [unlockedButtons, setUnlockedButtons] = useState(new Set());

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

  const handleUnlockButton = (email) => {
    if (email.unlockFragment) {
      unlockLoreFragment(email.unlockFragment);
      setUnlockedButtons(prev => new Set(prev.add(email.id)));
    }
  };

  const unlockLoreFragment = (fragmentId) => {
    // Placeholder: Implement the actual lore fragment unlocking logic using a lore store
    console.log(`Unlocking lore fragment: ${fragmentId}`);
    // Example (replace with your actual lore store logic):
    // useLoreStore.getState().unlockFragment(fragmentId);
  };

  const isFragmentUnlocked = (fragmentId) => {
    // Placeholder: Implement the logic to check if a fragment is already unlocked.
    // Example (replace with your actual lore store logic):
    // return useLoreStore.getState().isFragmentUnlocked(fragmentId);
    return false; // Default to false, replace with actual check.
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
                    <div className="email-body">
                      {selectedEmail.content}
                      {selectedEmail.hasButton && (
                        <button 
                          className={`unlock-button ${unlockedButtons.has(selectedEmail.id) || (selectedEmail.unlockFragment && isFragmentUnlocked(selectedEmail.unlockFragment)) ? 'unlocked' : ''}`}
                          onClick={() => handleUnlockButton(selectedEmail)}
                          disabled={unlockedButtons.has(selectedEmail.id) || (selectedEmail.unlockFragment && isFragmentUnlocked(selectedEmail.unlockFragment))}
                        >
                          {unlockedButtons.has(selectedEmail.id) || (selectedEmail.unlockFragment && isFragmentUnlocked(selectedEmail.unlockFragment)) ? 'UNLOCKED' : selectedEmail.buttonText}
                        </button>
                      )}
                    </div>
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
                    <div className="email-body">
                      {selectedEmail.content}
                      {selectedEmail.hasButton && (
                        <button 
                          className={`unlock-button ${unlockedButtons.has(selectedEmail.id) || (selectedEmail.unlockFragment && isFragmentUnlocked(selectedEmail.unlockFragment)) ? 'unlocked' : ''}`}
                          onClick={() => handleUnlockButton(selectedEmail)}
                          disabled={unlockedButtons.has(selectedEmail.id) || (selectedEmail.unlockFragment && isFragmentUnlocked(selectedEmail.unlockFragment))}
                        >
                          {unlockedButtons.has(selectedEmail.id) || (selectedEmail.unlockFragment && isFragmentUnlocked(selectedEmail.unlockFragment)) ? 'UNLOCKED' : selectedEmail.buttonText}
                        </button>
                      )}
                    </div>
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