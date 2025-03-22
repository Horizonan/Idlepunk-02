import React from 'react';

function CraftingStation({ onBack }) {
  // ... other component logic ...
  return (
    <div className="store-container">
      <div className="store-header">
        <h2>Crafting Station</h2>
        <button onClick={onBack}>Close</button>
      </div>
      <div className="store-items">
        {/* ... items ... */}
      </div>
    </div>
  );
}

export default CraftingStation;