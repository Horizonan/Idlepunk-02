
import { useState, useEffect } from 'react';

export default function TutorialSystem({ 
  junk, 
  hasUpgrade, 
  passiveIncome, 
  hasHelper,
  hasCrafting,
  isSurgeActive,
  tutorialStage,
  onTutorialProgress
}) {
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const tutorialMessages = {
    0: "Click the junk, kid. Scrap doesn't collect itself.",
    1: "That's the spirit. Go hit the Store. Buy somethin' useful for once.",
    2: "Upgrades, huh? Shiny tools for dirty jobs.",
    3: "Passive income, baby. That's how the old dogs roll.",
    4: "Look at you, hiring help already. Streetrat's got your back… kinda.",
    5: "You got more junk than sense. Time to start makin' things.",
    6: "Whoa! You feel that surge? The pile's gone wild!"
  };

  useEffect(() => {
    let timeout;
    
    if (tutorialStage < 7 && (
      (tutorialStage === 0) ||
      (tutorialStage === 1 && junk >= 100) ||
      (tutorialStage === 2 && hasUpgrade) ||
      (tutorialStage === 3 && passiveIncome > 0) ||
      (tutorialStage === 4 && hasHelper) ||
      (tutorialStage === 5 && hasCrafting) ||
      (tutorialStage === 6 && isSurgeActive)
    )) {
      setMessage(tutorialMessages[tutorialStage]);
      setIsVisible(true);
      timeout = setTimeout(() => {
        setIsVisible(false);
        onTutorialProgress();
      }, 5000);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [junk, hasUpgrade, passiveIncome, hasHelper, hasCrafting, isSurgeActive, tutorialStage]);

  if (!isVisible) return null;

  return (
    <div className="tutorial-message">
      <div className="cogfather-message">
        <div className="cogfather-avatar">👨‍🔧</div>
        <div className="message-text">{message}</div>
      </div>
    </div>iv>
  );
}
