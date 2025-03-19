
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
  const [task, setTask] = useState('');

  const tutorialMessages = {
    0: "Click the junk, kid. Scrap doesn't collect itself.",
    1: "That's the spirit. Go hit the Store. Buy somethin' useful for once.",
    2: "Upgrades, huh? Shiny tools for dirty jobs.",
    3: "Passive income, baby. That's how the old dogs roll.",
    4: "Look at you, hiring help already. Streetrat's got your back… kinda.",
    5: "You got more junk than sense. Time to start makin' things.",
    6: "Whoa! You feel that surge? The pile's gone wild!"
  };

  const tutorialTasks = {
    0: "Task: Click on the junk pile to collect some scrap",
    1: "Task: Visit the store and buy your first upgrade",
    2: "Task: Keep collecting and upgrading your tools",
    3: "Task: Purchase something that generates passive income",
    4: "Task: Hire your first helper to collect junk for you",
    5: "Task: Start crafting items from your collected junk",
    6: "Task: Take advantage of the surge to collect extra junk"
  };

  useEffect(() => {
    let timeout;

    if (tutorialStage < 7) {
      const goalCompleted = (
        (tutorialStage === 0) ||
        (tutorialStage === 1 && junk >= 10) ||
        (tutorialStage === 2 && hasUpgrade) ||
        (tutorialStage === 3 && passiveIncome > 0) ||
        (tutorialStage === 4 && hasHelper) ||
        (tutorialStage === 5 && hasCrafting) ||
        (tutorialStage === 6 && isSurgeActive)
      );

      if (goalCompleted) {
        setMessage(tutorialMessages[tutorialStage]);
        setTask(tutorialTasks[tutorialStage]);
        setIsVisible(true);
        
        if (tutorialStage > 0) {
          const tips = {
            1: "If it's buzzing, it's working. If it's sparking, it's improving.",
            2: "Efficiency is just laziness with better marketing.",
            3: "One man's trash is my entire business model.",
            4: "Automation isn't cheating. It's evolution.",
            5: "Upgrade or stagnate. That's the law of the junkpile.",
            6: "I once bartered a working toaster for a seat on a hoverbus. Worth it."
          };
          
          window.dispatchEvent(new CustomEvent('tutorialProgress', { 
            detail: { 
              stage: tutorialStage,
              tip: `Cogfather's Tip: ${tips[tutorialStage]}`
            } 
          }));
          
          timeout = setTimeout(() => {
            setIsVisible(false);
            onTutorialProgress();
          }, 5000);
        }
      } else {
        setIsVisible(false);
      }
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [junk, hasUpgrade, passiveIncome, hasHelper, hasCrafting, isSurgeActive, tutorialStage]);

  if (!isVisible) return null;
  if (tutorialStage === null || tutorialStage === undefined) return null;

  return (
    <div className="tutorial-message">
      <div className="cogfather-message">
        <img src="/src/Icons/NPCs/Cogfather.jfif" alt="Cogfather" className="cogfather-avatar" />
        <div className="message-content">
          <div className="message-text">{message}</div>
          <div className="task-text">{task}</div>
          <div className="tutorial-buttons">
            {tutorialStage > 0 && (
              <button 
                onClick={() => {
                  setIsVisible(false);
                  onTutorialProgress(tutorialStage - 1);
                }}
                className="tutorial-nav-btn"
              >
                Previous
              </button>
            )}
            <button 
              onClick={() => {
                setIsVisible(false);
                onTutorialProgress(tutorialStage + 1);
              }}
              className="tutorial-nav-btn"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
