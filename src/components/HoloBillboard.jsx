
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

  const [fontSize, setFontSize] = useState(24);

  const adjustTextSize = () => {
    const billboard = document.querySelector('.holo-billboard');
    const textElement = document.querySelector('.neon-sign');
    if (!billboard || !textElement) return;

    const maxWidth = billboard.offsetWidth * 0.9;
    const maxHeight = billboard.offsetHeight * 0.8;
    
    let size = 24;
    textElement.style.fontSize = `${size}px`;
    
    while ((textElement.scrollWidth > maxWidth || textElement.scrollHeight > maxHeight) && size > 8) {
      size--;
      textElement.style.fontSize = `${size}px`;
    }
    
    setFontSize(size);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText(current => (current + 1) % flavorText.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    adjustTextSize();
  }, [currentText]);

  useEffect(() => {
    window.addEventListener('resize', adjustTextSize);
    return () => window.removeEventListener('resize', adjustTextSize);
  }, []);

  if (!ownedItems.holoBillboard) return null;
  
  useEffect(() => {
    const updateWidth = () => {
      const billboard = document.querySelector('.holo-billboard');
      if (billboard) {
        setBillboardWidth(billboard.offsetWidth);
        document.documentElement.style.setProperty('--billboard-width', `${billboard.offsetWidth}px`);
      }
    };
    
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  return (
    <div className="holo-billboard">
      <div className="neon-sign">{flavorText[currentText]}</div>
      <div className="neon-flicker"></div>
    </div>
  );
}
