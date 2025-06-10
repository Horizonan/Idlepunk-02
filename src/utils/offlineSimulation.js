
export const processOfflineProgress = (gameState, setGameState) => {
  const currentTime = Date.now();
  const lastActiveTime = parseInt(localStorage.getItem('lastActiveTime') || currentTime.toString());
  const lastOfflineCheck = parseInt(localStorage.getItem('lastOfflineCheck') || currentTime.toString());
  const timeOffline = Math.floor((currentTime - lastActiveTime) / 1000); // seconds
  
  // Cap offline time at 30 minutes (1800 seconds)
  const maxOfflineTime = 1800;
  const effectiveOfflineTime = Math.min(timeOffline, maxOfflineTime);
  
  // Only process if offline for more than 5 minutes AND haven't checked recently
  // This prevents triggering during menu navigation or quick tab switches
  const timeSinceLastCheck = Math.floor((currentTime - lastOfflineCheck) / 1000);
  if (effectiveOfflineTime < 300 || timeSinceLastCheck < 60) {
    // Update last offline check time to prevent spam
    localStorage.setItem('lastOfflineCheck', currentTime.toString());
    return;
  }
  
  let offlineResults = {
    junk: 0,
    scratz: 0,
    tronics: 0,
    missions: 0,
    duration: effectiveOfflineTime
  };
  
  // Process passive junk income
  if (gameState.passiveIncome > 0) {
    const junkPerSecond = gameState.passiveIncome * gameState.globalJpsMultiplier;
    offlineResults.junk = Math.floor(junkPerSecond * effectiveOfflineTime);
    
    setGameState.setJunk(prev => prev + offlineResults.junk);
    
    // Track total junk collected
    const currentTotal = parseInt(localStorage.getItem('totalJunkCollected') || '0');
    localStorage.setItem('totalJunkCollected', (currentTotal + offlineResults.junk).toString());
  }
  
  // Process auto-clicker junk and tronics
  if (gameState.autoClicks > 0 || gameState.permanentAutoClicks > 0) {
    const totalAutoClicks = gameState.autoClicks + gameState.permanentAutoClicks;
    const autoJunkGained = totalAutoClicks * gameState.clickMultiplier * effectiveOfflineTime;
    
    offlineResults.junk += Math.floor(autoJunkGained);
    setGameState.setJunk(prev => prev + Math.floor(autoJunkGained));
    setGameState.setClickCount(prev => prev + (totalAutoClicks * effectiveOfflineTime));
    
    // Track total junk collected from auto-clickers
    const currentTotal = parseInt(localStorage.getItem('totalJunkCollected') || '0');
    localStorage.setItem('totalJunkCollected', (currentTotal + Math.floor(autoJunkGained)).toString());
    
    // Process offline tronics if electronics are unlocked
    if (gameState.electronicsUnlock) {
      const boostICount = parseInt(localStorage.getItem('tronics_boost_count') || '0');
      const boostIICount = parseInt(localStorage.getItem('tronics_boost_II_count') || '0');
      const tronicsPerClick = 1 + boostICount + (boostIICount * 2);
      const offlineTronics = Math.floor(totalAutoClicks * tronicsPerClick * effectiveOfflineTime * gameState.electroMultiplier);
      
      offlineResults.tronics = offlineTronics;
      setGameState.setTronics(prev => prev + offlineTronics);
      setGameState.setTotalTronicsClicks(prev => prev + (totalAutoClicks * effectiveOfflineTime));
    }
  }
  
  // Process Scratz Miner offline progress (handled separately in ScratzMiner component)
  // This is already implemented in the ScratzMiner component
  
  // Process mission progress
  const missionResults = processOfflineMissions(effectiveOfflineTime);
  offlineResults.missions = missionResults.completedMissions;
  offlineResults.scratz += missionResults.scratzEarned;
  
  // Add earned scratz to credits
  if (missionResults.scratzEarned > 0) {
    setGameState.setCredits(prev => prev + missionResults.scratzEarned);
  }
  
  // Show offline progress notification
  showOfflineProgressNotification(offlineResults, setGameState.setNotifications);
  
  // Update last active time and last offline check
  localStorage.setItem('lastActiveTime', currentTime.toString());
  localStorage.setItem('lastOfflineCheck', currentTime.toString());
  
  // Return results for popup display
  return offlineResults;
};

const processOfflineMissions = (timeOffline) => {
  const results = { completedMissions: 0, scratzEarned: 0 };
  
  try {
    // Get active missions from localStorage
    const activeMissions = JSON.parse(localStorage.getItem('activeMissions') || '[]');
    const completedMissions = JSON.parse(localStorage.getItem('completedMissions') || '[]');
    
    activeMissions.forEach(mission => {
      if (mission.startTime && mission.duration && mission.reward) {
        const missionEndTime = mission.startTime + (mission.duration * 1000);
        const currentTime = Date.now();
        const timeWhenWentOffline = currentTime - (timeOffline * 1000);
        
        // Check if mission would have completed while offline
        if (missionEndTime <= currentTime && missionEndTime > timeWhenWentOffline) {
          results.completedMissions++;
          results.scratzEarned += mission.reward;
          
          // Move mission to completed
          completedMissions.push({
            ...mission,
            completedAt: missionEndTime,
            completedOffline: true
          });
        }
      }
    });
    
    // Update localStorage with completed missions
    if (results.completedMissions > 0) {
      const remainingActiveMissions = activeMissions.filter(mission => {
        const missionEndTime = mission.startTime + (mission.duration * 1000);
        const currentTime = Date.now();
        const timeWhenWentOffline = currentTime - (timeOffline * 1000);
        return !(missionEndTime <= currentTime && missionEndTime > timeWhenWentOffline);
      });
      
      localStorage.setItem('activeMissions', JSON.stringify(remainingActiveMissions));
      localStorage.setItem('completedMissions', JSON.stringify(completedMissions));
    }
  } catch (error) {
    console.error('Error processing offline missions:', error);
  }
  
  return results;
};

const showOfflineProgressNotification = (results, setNotifications) => {
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return minutes > 0 ? `${minutes}m ${secs}s` : `${secs}s`;
  };
  
  let message = `Welcome back! You were offline for ${formatTime(results.duration)}\n`;
  
  if (results.junk > 0) {
    message += `• Collected ${results.junk.toLocaleString()} Junk\n`;
  }
  
  if (results.tronics > 0) {
    message += `• Generated ${results.tronics.toLocaleString()} Tronics\n`;
  }
  
  if (results.scratz > 0) {
    message += `• Earned ${results.scratz} Scratz\n`;
  }
  
  if (results.missions > 0) {
    message += `• Completed ${results.missions} mission${results.missions > 1 ? 's' : ''}\n`;
  }
  
  if (results.junk > 0 || results.tronics > 0 || results.scratz > 0 || results.missions > 0) {
    setNotifications(prev => [...prev, message.trim()]);
  }
};

export const updateLastActiveTime = () => {
  const currentTime = Date.now().toString();
  localStorage.setItem('lastActiveTime', currentTime);
  // Also update last offline check to prevent immediate triggering
  localStorage.setItem('lastOfflineCheck', currentTime);
};
