
import React, { useState, useEffect } from 'react';

export default function HoloBillboard({ ownedItems }) {
  const [currentText, setCurrentText] = useState(0);
  
  const flavorText = [
    "JUNK EMPIRE",
    "Scrap Happens.",
    "Upgrade now. Regret later.",
    "Your Junk, Our Treasure.",
    "Cogfather Approved (Kinda).",
    "Neon Dreams, Rusty Realities.",
    "Breaking News: Everything Still Broken.",
    "Robots Click Better.",
    "Advertise Here—Or Don't, Nobody Reads Anyway.",
    "Eat. Sleep. Scrap. Repeat.",
    "Powered by Junk. Fueled by Regret."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText(current => (current + 1) % flavorText.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  if (!ownedItems.holoBillboard) return null;

  return (
    <div className="holo-billboard">
      <div className="neon-sign">{flavorText[currentText]}</div>
      <div className="neon-flicker"></div>
    </div>
  );
}
