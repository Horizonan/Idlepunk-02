
import { useState, useEffect } from 'react';

export default function NewsContainer({ isSurgeActive }) {
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const defaultNews = [
    "Do you love playing in the trash?",
    "You have no one that loves you in this world",
    "Virtual cat cafes explode in popularity",
    "Pizza delivery drones under fire for 'accidental' toppings"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsSliding(true);
      setTimeout(() => {
        setCurrentNewsIndex((prev) => (prev + 1) % defaultNews.length);
        setIsSliding(false);
      }, 500);
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  const displayMessage = isSurgeActive 
    ? "⚡ TRASH SURGE: Junk overflow detected — grab it while it lasts!"
    : defaultNews[currentNewsIndex];

  return (
    <div className="news-bar">
      <div className="news-label">News</div>
      <div className="news-content-wrapper">
        <div className={`news-content ${isSliding ? 'slide-out' : ''}`}>
          {displayMessage}
        </div>
      </div>
    </div>
  );
}
