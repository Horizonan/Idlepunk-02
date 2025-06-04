
export const getTrashPickupDuration = () => {
  const hasHoverDrone = JSON.parse(localStorage.getItem('craftingInventory') || '{}')['Hover Drone'];
  return hasHoverDrone ? 25 : 20; // Returns duration in seconds
};
