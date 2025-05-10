
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useFlavorEvents = create(
  persist(
    (set, get) => ({
      lastEventTime: 0,
      showJunkError: false,
      triggerJunkError: () => {
        set({ showJunkError: true });
        setTimeout(() => set({ showJunkError: false }), 800);
      },
      initializeFlavorEvents: () => {
        const getRandomDelay = () => 1800000 + Math.random() * 1800000; // Between 30-60 minutes
        
        const scheduleNextEvent = () => {
          const now = Date.now();
          const state = get();
          const timeSinceLastEvent = now - state.lastEventTime;
          const baseDelay = getRandomDelay();
          
          // If sufficient time hasn't passed since last event, adjust delay
          const adjustedDelay = Math.max(0, baseDelay - timeSinceLastEvent);
          
          setTimeout(() => {
            set((state) => {
              state.triggerJunkError();
              state.lastEventTime = Date.now();
              scheduleNextEvent();
              return state;
            });
          }, adjustedDelay);
        };

        // Start the event cycle
        scheduleNextEvent();
      }
    }),
    {
      name: 'flavor-events-storage'
    }
  )
);
