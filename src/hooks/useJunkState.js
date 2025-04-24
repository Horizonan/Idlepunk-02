
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useJunkStore = create(
  persist(
    (set, get) => ({
      junk: 0,
      clickCount: 0,
      clickMultiplier: 1,
      passiveIncome: 0,
      globalJpsMultiplier: 1,

      addJunk: (amount) => set((state) => ({ 
        junk: state.junk + amount 
      })),
      removeJunk: (amount) => set((state) => ({ 
        junk: Math.max(0, state.junk - amount) 
      })),
      setJunk: (amount) => set({ junk: amount }),

      incrementClickCount: () => set((state) => ({
        clickCount: state.clickCount + 1
      })),
      setClickCount: (count) => set({ clickCount: count }),

      setClickMultiplier: (multiplier) => set({ clickMultiplier: multiplier }),
      setPassiveIncome: (income) => set({ passiveIncome: income }),
      setGlobalJpsMultiplier: (multiplier) => set({ globalJpsMultiplier: multiplier }),
    }),
    {
      name: 'junk-storage',
    }
  )
);

export default useJunkStore;
