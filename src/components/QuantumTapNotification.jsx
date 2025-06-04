
import React, { useState, useEffect } from 'react';
import './QuantumTapNotification.css';

export default function QuantumTapNotification({ notifications, onRemoveNotification }) {
  useEffect(() => {
    notifications.forEach(notification => {
      if (!notification.timerId) {
        const timer = setTimeout(() => {
          onRemoveNotification(notification.id);
        }, 2000);

       
        notification.timerId = timer;
      }
    });

   
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
            top: notification.mousePosition.y - 10 + (notification.offset || 0)
          }}
        >
          Quantum Tap Triggered!
        </div>
      ))}
    </>
  );
}
