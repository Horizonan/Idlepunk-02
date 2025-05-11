import React from 'react';
import Ticker from 'react-ticker';
import { useNewsStore } from '../utils/newsStore';

export default function NewsContainer({ isSurgeActive }) {
  const messages = useNewsStore((state) => state.messages);
  const addMessage = useNewsStore((state) => state.addMessage);
  const addTutorialTip = useNewsStore((state) => state.addTutorialTip);

  React.useEffect(() => {
    const handleAddNews = (event) => {
      addMessage(event.detail.message);
    };

    const handleTutorialProgress = (event) => {
      addTutorialTip(event.detail.stage, event.detail.tip);
    };

    window.addEventListener('addNews', handleAddNews);
    window.addEventListener('tutorialProgress', handleTutorialProgress);

    return () => {
      window.removeEventListener('addNews', handleAddNews);
      window.removeEventListener('tutorialProgress', handleTutorialProgress);
    };
  }, [addMessage, addTutorialTip]);

  return (
    <div className="news-bar">
      <div className="news-label">News</div>
      <div className="news-content-wrapper">
        <Ticker speed={5} mode="smooth">
          {({ index }) => (
            <div className="news-content">
              {isSurgeActive 
                ? "⚡ TRASH SURGE: Junk overflow detected — grab it while it lasts!"
                : messages[index % messages.length]}
            </div>
          )}
        </Ticker>
      </div>
    </div>
  );
}