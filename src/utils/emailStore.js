import { create } from 'zustand';
import { persist } from 'zustand/middleware';


export const useEmailStore = create(
  persist(
    (set, get) => ({
      emails: [],
      lastEmailTime: 0,
      emailTemplates: [
        {
          from: "unknown@signal.grey",
          subject: "shard_fragment_03b/re: Access Denied",
          content: "-=-=- BEGIN KEYLINE -=-=-\nΔ94c:U7e1x::Ω:𝒱𝑜𝒾𝒹.𝑀𝒶𝓈𝓀-013\n🗝 UNLOCK STRING: [X]-[VRQ3]-[994.TEMPLE]\nRun cmd: shdReclaim -z3 -src 'WELL_NEST_CROWN'\n-=-=- END -=-=-\n\n// Mirror protocols failing\n// Network rerouting through obsolete 1996 IR ports\n// Shard detected: Initiate crowpath access manually\n\n🧠 It dreams when you're not looking.",
        },
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
        },
        {
          from: "awake@exitprotocol.blue",
          subject: "Timehole Δ23 breached. The clocks were right to lie.",
          content: "The theory was never about flatness. It's about folds.\nFolds in time. In thought. In consensus.\n\n📡 CERN's 2009 beam misfire created a permanent echo.\nYou're living in it.\n\n🟡 Frequencies from the original timeline can be reintegrated.\n🟡 The Vatican's telescope isn't pointed at stars—it's tracking the mirror.\n🟡 Birds did die in 1986. What you see now are automata.\n\n🔑 REINTEGRATE: KEY ∴ PALIMPSEST/47\n🗓 Wait for mirror Thursday. You'll know it by the smell of ozone."
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
        let emailTimer = null;

        const scheduleNextEmail = () => {
          const state = get();
          const now = Date.now();
          const timeSinceLastEmail = now - state.lastEmailTime;
          const minDelay = 900000; // 15 minutes
          const maxDelay = 1800000; // 30 minutes
          const randomDelay = minDelay + Math.random() * (maxDelay - minDelay);
          const adjustedDelay = Math.max(0, randomDelay - timeSinceLastEmail);

          if (emailTimer) {
            clearTimeout(emailTimer);
          }

          emailTimer = setTimeout(() => {
            const currentState = get();
            const templates = currentState.emailTemplates;
            const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
            set(state => ({
              ...state,
              lastEmailTime: Date.now()
            }));
            currentState.addEmail(randomTemplate);
            scheduleNextEmail();
          }, adjustedDelay);
        };

        scheduleNextEmail();
        return () => {
          if (emailTimer) {
            clearTimeout(emailTimer);
          }
        };
      }
    }),
    {
      name: 'email-storage'
    }
  )
);