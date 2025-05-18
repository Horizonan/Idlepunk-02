
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useEmailStore = create(
  persist(
    (set, get) => ({
      emails: [],
      lastEmailTime: 0,
      emailTemplates: [
        {
          from: "The Cogfather",
          subject: "Market Fluctuations",
          content: "Keep an eye on the markets, scrapper. I've noticed some interesting patterns in junk values lately.",
        },
        {
          from: "Anonymous Streetrat",
          subject: "Strange Energy Readings",
          content: "Boss, my sensors are picking up weird energy spikes in the area. Might be worth investigating.",
        },
        {
          from: "System Alert",
          subject: "Maintenance Required",
          content: "Warning: Local junk processing systems operating at reduced efficiency. Maintenance recommended.",
        }
      ],
      addEmail: (email) => set((state) => ({
        emails: [...state.emails, { ...email, id: Date.now(), timestamp: new Date().toLocaleString(), read: false }]
      })),
      markAsRead: (id) => set((state) => ({
        emails: state.emails.map(email => 
          email.id === id ? { ...email, read: true } : email
        )
      })),
      initializeEmailSystem: () => {
        const scheduleNextEmail = () => {
          const state = get();
          const now = Date.now();
          const timeSinceLastEmail = now - state.lastEmailTime;
          const minDelay = 900000; // 15 minutes
          const maxDelay = 1800000; // 30 minutes
          const randomDelay = minDelay + Math.random() * (maxDelay - minDelay);
          
          const adjustedDelay = Math.max(0, randomDelay - timeSinceLastEmail);
          
          setTimeout(() => {
            const templates = state.emailTemplates;
            const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
            state.addEmail(randomTemplate);
            set({ lastEmailTime: Date.now() });
            scheduleNextEmail();
          }, adjustedDelay);
        };

        scheduleNextEmail();
      }
    }),
    {
      name: 'email-storage'
    }
  )
);
