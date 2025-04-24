
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useJunkStore = create(
  persist(
    (set) => ({
      junk: 0,
      addJunk: (amount) => set((state) => ({ 
        junk: state.junk + amount 
      })),
      removeJunk: (amount) => set((state) => ({ 
        junk: Math.max(0, state.junk - amount) 
      })),
      setJunk: (amount) => set({ junk: amount }),
    }),
    {
      name: 'junk-storage',
    }
  )
);

export default useJunkStore;
