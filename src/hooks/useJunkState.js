import { create } from 'zustand';

const useJunkStore = create((set) => ({
  junk: 0,

  addJunk: (amount) => set((state) => ({
    junk: state.junk + amount
  })),

  removeJunk: (amount) => set((state) => ({
    junk: Math.max(0, state.junk - amount)
  })),

  setJunk: (amount) => set({ junk: amount }),
}));

export default useJunkStore;
