
import { useState, useEffect } from 'react';

export default function NewsContainer() {
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const news = [
    "Do you love playing in the trash?",
    "You have no one that loves you in this world",
    "Virtual cat cafes explode in popularity",
    "Pizza delivery drones under fire for 'accidental' toppings"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNewsIndex((prev) => (prev + 1) % news.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="news-bar">
      <div className="news-label">News</div>
      <div className="news-content">{news[currentNewsIndex]}</div>
    </div>
  );
}
