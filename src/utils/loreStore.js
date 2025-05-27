
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useLoreStore = create(
  persist(
    (set, get) => ({
      unlockedFragments: [],
      fragments: {
        1: {
          id: 1,
          title: "ULDIR_9: Origin Signal",
          content: `"Before the world broke, ULDIR_9 was just a supply grid node. Not a city. A pit stop. A junction. Automated trucks rolled through it, never stopping long — kind of like your dad when he went out for coolant and never came back.

Then the Crack came and the sky peeled back like rotten chrome, and guess what? The trucks stopped coming. But people didn't. Because people, unlike delivery logistics, don't need firmware updates to make bad decisions.

The broken ones came first — looters, hackers, old-world idealists clinging to dead code and half-charged dreams. Then came the quiet ones: data monks, post-splicers, refugees from the server wars, and that one guy who swears he used to be a microwave.

They found the buried anchors: rusted generators, solar coil farms, one entire vending machine full of expired protein gum, and enough scrap to build a hundred homes or one unkillable idea. Naturally, they chose the idea. Because who needs plumbing when you have hope?

No one governs ULDIR_9. Not really. The Cogfather once did — or tried, before he started arguing with elevator buttons and lost. Now he mostly just talks to the wires and smells like burnt RAM. The city runs on promise and paranoia. You promise to trade, you promise not to kill without warning, and you keep your secrets wrapped in foil (and if you're smart, double-wrapped in old router plastic).

The streets here aren't streets. They're braided bundles of old rail, bone-worn cables, and someone's spinal implant that screams when you step on it. Every corner buzzes. Not from power — from memory. Even the lights flicker in patterns only the old drones can read, or pretend to read just to feel included.

ULDIR_9 is built like a corpse but lives like a song — specifically, one of those glitched-out synthwave covers of elevator music. People disappear here, and sometimes they come back different. Sometimes they come back better. Sometimes they come back with a new name and someone else's arm.

But most stay broken — and that's okay, because so is the city.

You live here now. And if you stay long enough, you'll hum in tune with it. You'll forget the time before. The sky won't scare you anymore. And maybe, just maybe, you'll stop trying to fix what was never yours to repair. Or you'll open a noodle stand. Either way, you'll belong."`
        }
      },
      unlockFragment: (fragmentId) => set((state) => {
        if (!state.unlockedFragments.includes(fragmentId)) {
          return {
            unlockedFragments: [...state.unlockedFragments, fragmentId]
          };
        }
        return state;
      }),
      isFragmentUnlocked: (fragmentId) => {
        const state = get();
        return state.unlockedFragments.includes(fragmentId);
      }
    }),
    {
      name: 'lore-storage'
    }
  )
);
