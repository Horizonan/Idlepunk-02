
import { create } from "zustand";
import { persist } from "zustand/middleware";

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
        const calculateNextSpawnTime = () => {
          const hasBeaconCore =
            localStorage.getItem("beacon_core_purchased") === "true";
          const beaconCount = parseInt(localStorage.getItem("beaconCount") || "0");
          const maxBeacons = Math.min(10, beaconCount);
          const beaconBaseReduction = hasBeaconCore ? 0.25 : 0;
          const beaconStackReduction = maxBeacons * 0.01;
          const totalReduction = Math.min(
            0.9,
            beaconBaseReduction + beaconStackReduction,
          );
          const beaconMultiplier = 1 - totalReduction;

          return Math.floor((900 + Math.random() * 900) * beaconMultiplier);
        };

        const currentTime = get().timeUntilNext;
        if (!currentTime || currentTime <= 0) {
          set({ timeUntilNext: calculateNextSpawnTime() });
        }

        const timer = setInterval(() => {
          set((state) => {
            if (state.timeUntilNext <= 0) {
              window.dispatchEvent(new CustomEvent("showCrystal"));
              const nextTime = calculateNextSpawnTime();
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
