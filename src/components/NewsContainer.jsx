
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
    const handleNextNews = () => {
      setCurrentNewsIndex((prev) => (prev + 1) % defaultNews.length);
    };
    
    const newsContent = document.querySelector('.news-content');
    if (newsContent) {
      newsContent.addEventListener('animationend', handleNextNews);
    }
    
    window.addEventListener('nextNews', handleNextNews);
    return () => {
      window.removeEventListener('nextNews', handleNextNews);
      const newsContent = document.querySelector('.news-content');
      if (newsContent) {
        newsContent.removeEventListener('animationend', handleNextNews);
      }
    };
  }, [defaultNews.length]);

  useEffect(() => {
    const handleTutorialProgress = (event) => {
      const stage = event.detail.stage;
      const tips = {
        1: "If it's buzzing, it's working. If it's sparking, it's improving.",
        2: "Efficiency is just laziness with better marketing.",
        3: "One man's trash is my entire business model.",
        4: "Automation isn't cheating. It's evolution.",
        5: "Upgrade or stagnate. That's the law of the junkpile.",
        6: "I once bartered a working toaster for a seat on a hoverbus. Worth it."
      };
      
      if (stage > 0 && stage <= 6 && event.detail.tip) {
        setDefaultNews(prev => [...prev, event.detail.tip]);
        setCurrentNewsIndex(prev => prev + 1);
      }
    };

    function getCogfatherTip(stage) {
      const tips = {
        1: "If it's buzzing, it's working. If it's sparking, it's improving.",
        2: "Efficiency is just laziness with better marketing.",
        3: "One man's trash is my entire business model.",
        4: "Automation isn't cheating. It's evolution.",
        5: "Upgrade or stagnate. That's the law of the junkpile.",
        6: "I once bartered a working toaster for a seat on a hoverbus. Worth it."
      };
      return tips[stage];
    }

    window.addEventListener('tutorialProgress', handleTutorialProgress);
    return () => window.removeEventListener('tutorialProgress', handleTutorialProgress);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNewsIndex((prev) => (prev + 1) % defaultNews.length);
    }, 12000);

    return () => clearInterval(interval);
  }, [defaultNews.length]);

  const displayMessage = isSurgeActive 
    ? "⚡ TRASH SURGE: Junk overflow detected — grab it while it lasts!"
    : defaultNews[currentNewsIndex % defaultNews.length];

  return (
    <div className="news-bar">
      <div className="news-label">News</div>
      <div className="news-content-wrapper">
        <div key={currentNewsIndex} className="news-content">
          {displayMessage}
        </div>
      </div>
    </div>
  );
}
