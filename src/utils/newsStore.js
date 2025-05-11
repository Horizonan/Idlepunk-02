
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useNewsStore = create(
  persist(
    (set) => ({
      messages: [
        "Do you love playing in the trash?",
        "You have no one that loves you in this world",
        "Virtual cat cafes explode in popularity",
        "Pizza delivery drones under fire for 'accidental' toppings",
        "Streetrat spotted stealing capacitors again. Local bots unimpressed.",
        "Rumor: A scrap trader found a functioning toaster. Experts remain skeptical.",
        "Reminder: Do not lick the glowing circuits. Again.",
        "Trash surge insurance now available. Terms may apply.",
        "In unrelated news, the vending machine is humming ominously again.",
        "Local helper union demands one less bolt per day.",
        "A mysterious figure was seen whispering to a pile of wires.",
        "Don't forget to oil your clicker. Rust is a liar.",
        "Junk futures hit an all-time high — economists baffled.",
        "Power outage in Sector 3 traced back to an overclocked potato battery.",
        "The city council votes to rename Junk Street to Slightly-Less-Junk Street.",
        "Your scrap might be valuable. Somewhere. To someone. Probably.",
        "New study finds clicking improves morale. Source: the clicker industry.",
        "Robot uprising delayed due to a firmware bug. Carry on.",
        "Stay hydrated. Especially if you're 60% copper wiring.",
        "Touch grass? WE DON'T HAVE GRASS! Here, touch this junk instead.",
        "Game developer found dead after coding 200 hours straight. Redditors continue to harass his corpse for not working harder.",
        "Dyslexic game dev accused of using AI to write coherent text. 'C::tell them i said hello,' says developer."
      ],
      cogfatherTips: {
        1: "If it's buzzing, it's working. If it's sparking, it's improving.",
        2: "Efficiency is just laziness with better marketing.",
        3: "One man's trash is my entire business model.",
        4: "Automation isn't cheating. It's evolution.",
        5: "Upgrade or stagnate. That's the law of the junkpile.",
        6: "I once bartered a working toaster for a seat on a hoverbus. Worth it."
      },
      addMessage: (message) => set((state) => ({
        messages: [...state.messages, message]
      })),
      addTutorialTip: (stage, tip) => set((state) => {
        if (stage > 0 && stage <= 6) {
          const cogfatherTip = `Cogfather: ${state.cogfatherTips[stage]}`;
          const newMessages = [...state.messages];
          if (!newMessages.includes(cogfatherTip)) {
            newMessages.push(cogfatherTip);
          }
          if (tip && !newMessages.includes(tip)) {
            newMessages.push(tip);
          }
          return { messages: newMessages };
        }
        return state;
      })
    }),
    {
      name: 'news-storage'
    }
  )
);
