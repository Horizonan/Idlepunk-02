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
  calculateEffectiveJunkPerSecond(basePassiveIncome, globalJpsMultiplier, autoClicks, clickMultiplier, isSurgeActive = false) {
    let multiplier = globalJpsMultiplier;

    // Circuit Optimization boost
    if (localStorage.getItem('circuit_optimization_purchased') === 'true') {
      const optimizationCount = parseInt(localStorage.getItem('circuit_optimization_count') || '0');
      const optimizationBoost = optimizationCount * 0.25; // 25% per unit
      multiplier += optimizationBoost;
    }

    // Graffitied Tribute Bin boost
    if (localStorage.getItem('graffitiedTributeBin') === 'true') {
      multiplier += 0.20; // +20% junk/sec
    }

    const totalPassiveJunk = basePassiveIncome * multiplier;
    const totalAutoClickJunk = autoClicks * clickMultiplier;
    let totalProduction = totalPassiveJunk + totalAutoClickJunk;

    // Surge multiplier for total production (both passive and auto-click)
    if (isSurgeActive) {
      totalProduction *= 2; // Double total junk production during surges
    }
    const totalConsumption = this.getTotalConsumption();

    return totalProduction - totalConsumption;
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
  getJunkBreakdown(basePassiveIncome, globalJpsMultiplier, autoClicks, clickMultiplier, isSurgeActive = false) {
    let multiplier = globalJpsMultiplier;

    // Circuit Optimization boost
    if (localStorage.getItem('circuit_optimization_purchased') === 'true') {
      const optimizationCount = parseInt(localStorage.getItem('circuit_optimization_count') || '0');
      const optimizationBoost = optimizationCount * 0.25; // 25% per unit
      multiplier += optimizationBoost;
    }

    // Graffitied Tribute Bin boost
    if (localStorage.getItem('graffitiedTributeBin') === 'true') {
      multiplier += 0.20; // +20% junk/sec
    }

    const passiveJunk = basePassiveIncome * multiplier;
    const autoClickJunk = autoClicks * clickMultiplier;
    let totalProduction = passiveJunk + autoClickJunk;

    // Surge multiplier for total production (both passive and auto-click)
    if (isSurgeActive) {
      totalProduction *= 2; // Double total junk production during surges
    }
    const totalConsumption = this.getTotalConsumption();
    const effectiveJunk = totalProduction - totalConsumption;

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
export const getEffectiveJunkPerSecond = (basePassiveIncome, globalJpsMultiplier, autoClicks, clickMultiplier, isSurgeActive = false) => {
  return junkCalculationManager.calculateEffectiveJunkPerSecond(
    basePassiveIncome, 
    globalJpsMultiplier, 
    autoClicks, 
    clickMultiplier,
    isSurgeActive
  );
};

// Helper function to get junk breakdown
export const getJunkBreakdown = (basePassiveIncome, globalJpsMultiplier, autoClicks, clickMultiplier, isSurgeActive = false) => {
  return junkCalculationManager.getJunkBreakdown(
    basePassiveIncome, 
    globalJpsMultiplier, 
    autoClicks, 
    clickMultiplier,
    isSurgeActive
  );
};