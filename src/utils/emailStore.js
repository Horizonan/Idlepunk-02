import { create } from 'zustand';
import { persist } from 'zustand/middleware';


export const useEmailStore = create(
  persist(
    (set, get) => ({
      emails: [],
      lastEmailTime: 0,
      revealedLoreFragments: [],
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
        },
        {
          from: "craterwatch@lunarveil.pro",
          subject: "Earth's second scar—They never told you about the first",
          content: "They hollowed it in 14,031 BCE. That's why it rings when struck.\nBuzz knew. Stanley helped cover it.\n\n🛰️ Apollo 20 was real—launched without press\n🧬 DNA recovered from inside the craft matched Homo floresiensis\n🐚 Lunar dust contains microscopic bleeding artifacts\n\nThe moon doesn't orbit.\nIt watches."
        },
        {
          from: "ground.truth@echo-grid.nexus",
          subject: "Origin Signal: The City That Won't Die",
          content: "You asked why we stay in a place like this. Why the city hasn't collapsed in on itself like the others. The answer's long — older than any codebase. Older than the Crack. This signal's been passed down through rusted hands. Yours now.\n\n▶️ [READ FULL SIGNAL: ORIGIN-CITY.HEX]\n(Click to reveal city lore fragment)",
          hasLoreFragment: true,
          loreFragment: {
            title: "ULDIR_9: The City That Won't Die",
            content: "Before the world broke, ULDIR_9 was just a supply grid node. Not a city. A pit stop. A junction. Automated trucks rolled through it, never stopping long — kind of like your dad when he went out for coolant and never came back.\n\nThen the Crack came and the sky peeled back like rotten chrome, and guess what? The trucks stopped coming. But people didn't. Because people, unlike delivery logistics, don't need firmware updates to make bad decisions.\n\nThe broken ones came first — looters, hackers, old-world idealists clinging to dead code and half-charged dreams. Then came the quiet ones: data monks, post-splicers, refugees from the server wars, and that one guy who swears he used to be a microwave.\n\nThey found the buried anchors: rusted generators, solar coil farms, one entire vending machine full of expired protein gum, and enough scrap to build a hundred homes or one unkillable idea. Naturally, they chose the idea. Because who needs plumbing when you have hope?\n\nNo one governs ULDIR_9. Not really. The Cogfather once did — or tried, before he started arguing with elevator buttons and lost. Now he mostly just talks to the wires and smells like burnt RAM. The city runs on promise and paranoia. You promise to trade, you promise not to kill without warning, and you keep your secrets wrapped in foil (and if you're smart, double-wrapped in old router plastic).\n\nThe streets here aren't streets. They're braided bundles of old rail, bone-worn cables, and someone's spinal implant that screams when you step on it. Every corner buzzes. Not from power — from memory. Even the lights flicker in patterns only the old drones can read, or pretend to read just to feel included.\n\nULDIR_9 is built like a corpse but lives like a song — specifically, one of those glitched-out synthwave covers of elevator music. People disappear here, and sometimes they come back different. Sometimes they come back better. Sometimes they come back with a new name and someone else's arm.\n\nBut most stay broken — and that's okay, because so is the city.\n\nYou live here now. And if you stay long enough, you'll hum in tune with it. You'll forget the time before. The sky won't scare you anymore. And maybe, just maybe, you'll stop trying to fix what was never yours to repair. Or you'll open a noodle stand. Either way, you'll belong.\n\n📍 Location Added: ULDIR_9 — Core Ruin Junction\nPassive Effect: Crew stress gain reduced while in base."
          }
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
      revealLoreFragment: (emailId, loreFragment) => set((state) => ({
        revealedLoreFragments: [...state.revealedLoreFragments, { emailId, ...loreFragment, id: Date.now() }]
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