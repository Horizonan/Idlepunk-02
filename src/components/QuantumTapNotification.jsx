
import React, { useState, useEffect } from 'react';
import './QuantumTapNotification.css';

export default function QuantumTapNotification({ notifications, onRemoveNotification }) {
  useEffect(() => {
    notifications.forEach(notification => {
      const timer = setTimeout(() => {
        onRemoveNotification(notification.id);
      }, 2000);

      // Store timer ID for cleanup
      notification.timerId = timer;
    });

    // Cleanup timers on unmount or when notifications change
    return () => {
      notifications.forEach(notification => {
        if (notification.timerId) {
          clearTimeout(notification.timerId);
        }
      });
    };
  }, [notifications, onRemoveNotification]);

  return (
    <>
      {notifications.map(notification => (
        <div 
          key={notification.id}
          className="quantum-tap-notification"
          style={{
            left: notification.mousePosition.x + 15,
            top: notification.mousePosition.y - 10 + (notifications.indexOf(notification) * 30)
          }}
        >
          Quantum Tap Triggered!
        </div>
      ))}
    </>
  );
}
