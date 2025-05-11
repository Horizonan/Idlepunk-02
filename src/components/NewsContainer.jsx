import { useEffect } from 'react';
import { useNewsStore } from '../utils/newsStore';

export default function NewsContainer({ isSurgeActive }) {
  const { currentNewsIndex, defaultNews, addNews, incrementNewsIndex } = useNewsStore();

  useEffect(() => {
    const handleAddNews = (event) => {
      addNews(event.detail.message);
    };

    const handleNextNews = () => {
      incrementNewsIndex();
    };

    window.addEventListener('addNews', handleAddNews);

    const newsContent = document.querySelector('.news-content');
    if (newsContent) {
      newsContent.addEventListener('animationend', handleNextNews);
    }

    window.addEventListener('nextNews', handleNextNews);

    return () => {
      window.removeEventListener('nextNews', handleNextNews);
      window.removeEventListener('addNews', handleAddNews);
      const newsContent = document.querySelector('.news-content');
      if (newsContent) {
        newsContent.removeEventListener('animationend', handleNextNews);
      }
    };
  }, [addNews, incrementNewsIndex]);

  useEffect(() => {
    const handleTutorialProgress = (event) => {
      const stage = event.detail.stage;
      const cogfatherTips = {
        1: "Cogfather: If it's buzzing, it's working. If it's sparking, it's improving.",
        2: "Cogfather: Efficiency is just laziness with better marketing.",
        3: "Cogfather: One man's trash is my entire business model.",
        4: "Cogfather: Automation isn't cheating. It's evolution.",
        5: "Cogfather: Upgrade or stagnate. That's the law of the junkpile.",
        6: "Cogfather: I once bartered a working toaster for a seat on a hoverbus. Worth it."
      };

      if (stage > 0 && stage <= 6) {
        const tip = cogfatherTips[stage];
        if (tip && !defaultNews.includes(tip)) {
          addNews(tip);
        }
        if (event.detail.tip && !defaultNews.includes(event.detail.tip)) {
          addNews(event.detail.tip);
        }
        incrementNewsIndex();
      }
    };

    window.addEventListener('tutorialProgress', handleTutorialProgress);
    return () => window.removeEventListener('tutorialProgress', handleTutorialProgress);
  }, [defaultNews, addNews, incrementNewsIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      incrementNewsIndex();
    }, 20000);

    return () => clearInterval(interval);
  }, [incrementNewsIndex]);

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