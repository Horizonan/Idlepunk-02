
import { useEffect } from 'react';

export default function TrashSurge({ isActive }) {
  useEffect(() => {
    if (isActive) {
      document.body.classList.add('surge-active');
    } else {
      document.body.classList.remove('surge-active');
    }
    return () => document.body.classList.remove('surge-active');
  }, [isActive]);

  return isActive && (
    <div className="surge-banner">
      ⚡ TRASH SURGE ACTIVE!
    </div>
  );
}
