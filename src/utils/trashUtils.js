
export const getTrashPickupDuration = () => {
  const hasHoverDrone = JSON.parse(localStorage.getItem('craftingInventory') || '{}')['Hover Drone'];
  const hasPickupMagnetArray = localStorage.getItem('pickup_magnet_array_purchased') === 'true';
  let baseDuration = hasHoverDrone ? 25 : 20;
  if (hasPickupMagnetArray) {
    baseDuration += 8;
  }
  return baseDuration; // Returns duration in seconds
};
