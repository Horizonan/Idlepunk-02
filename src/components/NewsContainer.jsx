
import { useState, useEffect } from 'react';

export default function NewsContainer({ isSurgeActive }) {
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [defaultNews, setDefaultNews] = useState([
    "Do you love playing in the trash?",
    "You have no one that loves you in this world",
    "Virtual cat cafes explode in popularity",
    "Pizza delivery drones under fire for 'accidental' toppings"
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNewsIndex((prev) => (prev + 1) % defaultNews.length);
    }, 20000);

    return () => clearInterval(interval);
  }, [defaultNews.length]);

  useEffect(() => {
    const handleTutorialProgress = (event) => {
      const stage = event.detail.stage;
      const cogfatherTips = [
        "If it's buzzing, it's working. If it's sparking, it's improving.",
        "Efficiency is just laziness with better marketing.",
        "One man's trash is my entire business model.",
        "Automation isn't cheating. It's evolution.",
        "Upgrade or stagnate. That's the law of the junkpile.",
        "I once bartered a working toaster for a seat on a hoverbus. Worth it."
      ];
      
      if (stage > 0 && stage <= cogfatherTips.length) {
        const tip = `Cogfather's Tip: ${cogfatherTips[stage - 1]}`;
        setDefaultNews(prev => [...prev, tip]);
      }
    };

    window.addEventListener('tutorialProgress', handleTutorialProgress);
    return () => window.removeEventListener('tutorialProgress', handleTutorialProgress);
  }, []);

  const displayMessage = isSurgeActive 
    ? "⚡ TRASH SURGE: Junk overflow detected — grab it while it lasts!"
    : defaultNews[currentNewsIndex];

  return (
    <div className="news-bar">
      <div className="news-label">News</div>
      <div className="news-content-wrapper">
        <div className="news-content">
          {displayMessage}
        </div>
      </div>
    </div>
  );
}
