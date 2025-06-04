
export const calculateCrystalTimeReduction = () => {
  const hasBeaconCore = localStorage.getItem("beacon_core_purchased") === "true";
  const beaconCount = parseInt(localStorage.getItem("beaconCount") || "0");
  const maxBeacons = Math.min(10, beaconCount);
  const beaconBaseReduction = hasBeaconCore ? 0.25 : 0;
  const beaconStackReduction = maxBeacons * 0.01;
  const totalReduction = Math.min(0.9, beaconBaseReduction + beaconStackReduction);
  
  return {
    totalReduction,
    percentageReduction: Math.floor(totalReduction * 100),
    multiplier: 1 - totalReduction
  };
};

export const calculateNextCrystalSpawnTime = () => {
  const { multiplier } = calculateCrystalTimeReduction();
  return Math.floor((900 + Math.random() * 900) * multiplier);
};

export const getCrystalPickupDuration = () => {
  return 300; // Returns duration in seconds (5 minutes)
};
