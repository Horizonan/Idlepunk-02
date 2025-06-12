
// Centralized junk calculation system
export class JunkCalculationManager {
  constructor() {
    this.consumers = new Map(); // Track all junk consumers
    this.listeners = new Set(); // Components that need updates
  }

  // Register a junk consumer (like auto recycler)
  registerConsumer(id, consumptionRate) {
    this.consumers.set(id, consumptionRate);
    this.notifyListeners();
  }

  // Unregister a junk consumer
  unregisterConsumer(id) {
    this.consumers.delete(id);
    this.notifyListeners();
  }

  // Get total junk consumption per second
  getTotalConsumption() {
    let total = 0;
    for (const consumption of this.consumers.values()) {
      total += consumption;
    }
    return total;
  }

  // Calculate effective junk per second after consumption
  calculateEffectiveJunkPerSecond(basePassiveIncome, globalJpsMultiplier, autoClicks, clickMultiplier) {
    const totalPassiveJunk = basePassiveIncome * globalJpsMultiplier;
    const totalAutoClickJunk = autoClicks * clickMultiplier;
    const totalProduction = totalPassiveJunk + totalAutoClickJunk;
    const totalConsumption = this.getTotalConsumption();
    
    return Math.max(0, totalProduction - totalConsumption);
  }

  // Add listener for consumption changes
  addListener(callback) {
    this.listeners.add(callback);
  }

  // Remove listener
  removeListener(callback) {
    this.listeners.delete(callback);
  }

  // Notify all listeners of changes
  notifyListeners() {
    for (const listener of this.listeners) {
      listener();
    }
  }

  // Get breakdown of junk calculations
  getJunkBreakdown(basePassiveIncome, globalJpsMultiplier, autoClicks, clickMultiplier) {
    const passiveJunk = basePassiveIncome * globalJpsMultiplier;
    const autoClickJunk = autoClicks * clickMultiplier;
    const totalProduction = passiveJunk + autoClickJunk;
    const totalConsumption = this.getTotalConsumption();
    const effectiveJunk = Math.max(0, totalProduction - totalConsumption);

    return {
      passiveJunk,
      autoClickJunk,
      totalProduction,
      totalConsumption,
      effectiveJunk,
      consumers: Array.from(this.consumers.entries()).map(([id, consumption]) => ({
        id,
        consumption
      }))
    };
  }
}

// Create singleton instance
export const junkCalculationManager = new JunkCalculationManager();

// Helper function to get effective junk per second
export const getEffectiveJunkPerSecond = (basePassiveIncome, globalJpsMultiplier, autoClicks, clickMultiplier) => {
  return junkCalculationManager.calculateEffectiveJunkPerSecond(
    basePassiveIncome, 
    globalJpsMultiplier, 
    autoClicks, 
    clickMultiplier
  );
};

// Helper function to get junk breakdown
export const getJunkBreakdown = (basePassiveIncome, globalJpsMultiplier, autoClicks, clickMultiplier) => {
  return junkCalculationManager.getJunkBreakdown(
    basePassiveIncome, 
    globalJpsMultiplier, 
    autoClicks, 
    clickMultiplier
  );
};
