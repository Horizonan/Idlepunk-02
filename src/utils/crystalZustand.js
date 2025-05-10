import { create } from "zustand";

export const useCrystalZustand = create((set, get) => ({
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

    const initialTime = calculateNextSpawnTime();
    set({ timeUntilNext: initialTime, showCrystal: false });

    return () => clearInterval(timer);
  },
}));
