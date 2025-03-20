
import React from 'react';

export default function HoloBillboard({ ownedItems }) {
  if (!ownedItems.holoBillboard) return null;

  return (
    <div className="holo-billboard">
      <div className="neon-sign">JUNK EMPIRE</div>
      <div className="neon-flicker"></div>
    </div>
  );
}
