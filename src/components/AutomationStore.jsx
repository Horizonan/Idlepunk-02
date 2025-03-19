
import React from 'react';

export default function AutomationStore({ credits, onBack }) {
  return (
    <div className="store-container">
      <h2>Automation Store</h2>
      <div className="store-items">
        <button className="store-item" disabled>
          Coming Soon: More Automation Options!
          <div className="item-info">
            <strong>Advanced Automation</strong>
            <p>New automation features coming soon!</p>
          </div>
        </button>
      </div>
    </div>
  );
}
