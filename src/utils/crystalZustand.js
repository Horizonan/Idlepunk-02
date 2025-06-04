
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { calculateNextCrystalSpawnTime } from "./crystalUtils";

export const useCrystalZustand = create(
  persist(
    (set, get) => ({
      version: 1, // Add version to force storage reset on changes
      showCrystal: false,
      timeUntilNext: null,
      hasChronoCrystalTimer: false,
      setShowCrystal: (show) => set({ showCrystal: show }),
      setHasChronoCrystalTimer: (has) => set({ hasChronoCrystalTimer: has }),
      initializeCrystalTimer: () => {

        const currentTime = get().timeUntilNext;
        if (!currentTime || currentTime <= 0) {
          set({ timeUntilNext: calculateNextCrystalSpawnTime() });
        }

        const timer = setInterval(() => {
          set((state) => {
            if (state.timeUntilNext <= 0) {
              window.dispatchEvent(new CustomEvent("showCrystal"));
              const nextTime = calculateNextCrystalSpawnTime();
              return {
                showCrystal: true,
                timeUntilNext: nextTime,
              };
            }
            return { timeUntilNext: state.timeUntilNext - 1 };
          });
        }, 1000);

        return () => clearInterval(timer);
      },
    }),
    {
      name: "crystal-storage",
    }
  )
);
