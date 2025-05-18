
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useEmailStore = create(
  persist(
    (set, get) => ({
      emails: [],
      lastEmailTime: 0,
      emailTemplates: [
        {
          from: "cubeadmin@realitypromo.net",
          subject: "[REDEEM NOW] MYSTERY DEVICE AWAITS",
          content: "You've been selected to receive a pre-release Reality Alignment Tool (Model v13).\n\n📦 Contains:\n\n1x stabilized cube\n\n1x red filament (do NOT touch)\n\n1x data-cracked driver for 6th-layer rendering\n\n🎁 Click here to redeem ➜ [hyperlink corrupted]\n⛔ [WARNING]: Previous claimants report audio bleed, nosebleeds, and \"phantom harmonics\"",
        },
        {
          from: "futureorganics@healer404.biz",
          subject: "👁️ This Offer Was Not Approved by the FDA",
          content: "🚫ARE_Y0U_𝔏𝔈𝔙𝔈𝔏3_ACCESS?\nThis isn't skincare. It's refracted evolution.\n\nNanogel-X39™ implants subdermally\n\nQuartz-strand overlay: repel surface optics\n\nSide effect: dream-bleed from 2nd reality\n\n💥 Offer ends after 199 microinteractions\n🧬 Tap to complete sequence: uv93S@3r_ek%L9\n\n\"My eyes see the code now. The old light is GONE.\" – Verified User",
        },
        {
          from: "redpill.dispatch@nomail.void",
          subject: "[SPAM] You Were Never Supposed to See This",
          content: "⚠️ THEY'RE WATCHING. DO NOT FORWARD.\nTop-tier whistleblowers confirm the 1977 blackout wasn't a power surge. The moon blinked. Sensors picked up movement under the lunar surface. NASA denied the tapes existed. We have them.\n\n🚫 Encrypted dump attached (access denied—until 03:33 UTC)\n🟥 Keyphrase for unlock: SABLE.RIFT.DC-38\n\nYou're one of 12 chosen to receive this message.\nDeactivate your smart speaker. They listen.\n\n~ YHVH Override Taskforce\n\"The veil burns brightest before the tear.\"",
        },
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
      latestEmail: null,
      addEmail: (email) => set((state) => {
        // Check if an email with same subject and content exists
        const isDuplicate = state.emails.some(
          existingEmail => 
            existingEmail.subject === email.subject && 
            existingEmail.content === email.content
        );
        
        if (isDuplicate) {
          return state; // Return unchanged state if duplicate
        }
        
        const newEmail = { ...email, id: Date.now(), timestamp: new Date().toLocaleString(), read: false };
        return {
          emails: [...state.emails, newEmail],
          latestEmail: newEmail
        };
      }),
      clearLatestEmail: () => set({ latestEmail: null }),
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
