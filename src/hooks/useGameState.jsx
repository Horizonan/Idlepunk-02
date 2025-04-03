import { useState, useEffect } from 'react';

export const useGameState = () => {
  const [junk, setJunk] = useState(() => Math.floor(Number(localStorage.getItem('junk')) || 0));
  const [credits, setCredits] = useState(() => Math.floor(Number(localStorage.getItem('credits')) || 0));
  const [clickCount, setClickCount] = useState(() => Math.floor(Number(localStorage.getItem('clickCount')) || 0));
  const [tronics, setTronics] = useState(() => Number(localStorage.getItem('tronics')) || 0);
  const [autoClicks, setAutoClicks] = useState(() => {
    const saved = Number(localStorage.getItem('autoClicks')) || 0;
    const permanent = Number(localStorage.getItem('permanentAutoClicks')) || 0;
    return saved + permanent;
  });
  const [clickMultiplier, setClickMultiplier] = useState(() => Number(localStorage.getItem('clickMultiplier')) || 1);
  const [passiveIncome, setPassiveIncome] = useState(() => Number(localStorage.getItem('passiveIncome')) || 0);
  const [globalJpsMultiplier, setGlobalJpsMultiplier] = useState(() => Number(localStorage.getItem('globalJpsMultiplier')) || 1);
  const [notifications, setNotifications] = useState([]);
  const [electronicsUnlock, setElectronicsUnlock] = useState(() => localStorage.getItem('electronicsUnlock') === 'true');
  const [activeStore, setActiveStore] = useState(() => localStorage.getItem('activeStore') || null);
  const [menuOpen, setMenuOpen] = useState(() => localStorage.getItem('menuOpen') !== 'false');
  const [clickEnhancerLevel, setClickEnhancerLevel] = useState(() => Number(localStorage.getItem('clickEnhancerLevel')) || 0);
  const [tutorialStage, setTutorialStage] = useState(() => Number(localStorage.getItem('tutorialStage')) || 0);
  const [hasUpgrade, setHasUpgrade] = useState(false);
  const [showPrestigePopup, setShowPrestigePopup] = useState(false);
  const [prestigeCount, setPrestigeCount] = useState(() => Number(localStorage.getItem('prestigeCount')) || 0);
  const [electroShards, setElectroShards] = useState(() => Number(localStorage.getItem('electroShards')) || 0);
  const [beaconCount, setBeaconCount] = useState(() => Number(localStorage.getItem('beaconCount')) || 0);
  const [showBeacon, setShowBeacon] = useState(false);
  const [showBeaconVisual, setShowBeaconVisual] = useState(() => localStorage.getItem('showBeaconVisual') !== 'false');
  const [cogfatherLore, setCogfatherLore] = useState(() => JSON.parse(localStorage.getItem('cogfatherLore')) || []);
  const [preservedHelper, setPreservedHelper] = useState(() => localStorage.getItem('preservedHelper') || null);


  //Trash Surge 
  const [surgeCount, setSurgeCount] = useState(() => Number(localStorage.getItem('surgeCount')) || 0);  
  const [hasFoundCapacitorThisSurge, setHasFoundCapacitorThisSurge] = useState(false);
  const [isSurgeActive, setIsSurgeActive] = useState(false);


  //Tronics Surge
  const [isTronicsSurgeActive, setTronicsSurgeActive] = useState(false);

  useEffect(() => {
    const handleAutoClickerClick = () => {
      const autoClicks = parseInt(localStorage.getItem('autoClicks') || '0');
      const permanentAutoClicks = parseInt(localStorage.getItem('permanentAutoClicks') || '0');
      console.log('Achievement check - Current autoclicks:', { autoClicks, permanentAutoClicks });
      
      const achievements = JSON.parse(localStorage.getItem('achievements') || '[]');
      const secretAchievement = achievements.find(a => a.title === "Who's Clicking the Clicker?");
      console.log('Achievement found:', secretAchievement);
      
      if (secretAchievement && !secretAchievement.unlocked && (autoClicks + permanentAutoClicks > 0)) {
        console.log('Unlocking achievement');
        secretAchievement.unlocked = true;
        secretAchievement.checked = true;
        localStorage.setItem('achievements', JSON.stringify(achievements));
        const currentPermanent = parseInt(localStorage.getItem('permanentAutoClicks') || '0');
        localStorage.setItem('permanentAutoClicks', (currentPermanent + 1).toString());
        setAutoClicks(prev => prev + 1);
        window.dispatchEvent(new CustomEvent('nextNews', { 
          detail: { message: "Cogfather: 'Ah, a true automation enthusiast. Always verifying their tools.'" }
        }));
      }
    };

    window.addEventListener('clickedAutoClicker', handleAutoClickerClick);
    return () => window.removeEventListener('clickedAutoClicker', handleAutoClickerClick);
  }, []);

  useEffect(() => {
    localStorage.setItem('credits', credits);
    localStorage.setItem('junk', junk);
    localStorage.setItem('clickCount', clickCount);
    localStorage.setItem('tronics', tronics);
    localStorage.setItem('autoClicks', autoClicks);
    localStorage.setItem('clickMultiplier', clickMultiplier);
    localStorage.setItem('passiveIncome', passiveIncome);
    localStorage.setItem('globalJpsMultiplier', globalJpsMultiplier);
    localStorage.setItem('electronicsUnlock', electronicsUnlock);
    localStorage.setItem('clickEnhancerLevel', clickEnhancerLevel);
    localStorage.setItem('tutorialStage', tutorialStage);
    localStorage.setItem('prestigeCount', prestigeCount);
    localStorage.setItem('electroShards', electroShards);
    localStorage.setItem('beaconCount', beaconCount);
    localStorage.setItem('surgeCount', surgeCount);
    localStorage.setItem('cogfatherLore', JSON.stringify(cogfatherLore));
  }, [junk, credits, clickCount, tronics, autoClicks, clickMultiplier, passiveIncome, globalJpsMultiplier, 
      electronicsUnlock, clickEnhancerLevel, tutorialStage, prestigeCount, electroShards, beaconCount, 
      surgeCount, cogfatherLore]);

  const [manualTronicsClicks, setManualTronicsClicks] = useState(() => 
  parseInt(localStorage.getItem('manualTronicsClicks') || '0')
);
const [totalTronicsClicks, setTotalTronicsClicks] = useState(() => 
  parseInt(localStorage.getItem('totalTronicsClicks') || '0')
);

useEffect(() => {
  localStorage.setItem('manualTronicsClicks', manualTronicsClicks);
  localStorage.setItem('totalTronicsClicks', totalTronicsClicks);
}, [manualTronicsClicks, totalTronicsClicks]);

return {
    junk, setJunk,
    credits, setCredits,
    clickCount, setClickCount,
    tronics, setTronics,
    manualTronicsClicks, setManualTronicsClicks,
    totalTronicsClicks, setTotalTronicsClicks,
    autoClicks, setAutoClicks,
    clickMultiplier, setClickMultiplier,
    passiveIncome, setPassiveIncome,
    globalJpsMultiplier, setGlobalJpsMultiplier,
    notifications, setNotifications,
    electronicsUnlock, setElectronicsUnlock,
    activeStore, setActiveStore,
    menuOpen, setMenuOpen,
    clickEnhancerLevel, setClickEnhancerLevel,
    tutorialStage, setTutorialStage,
    hasUpgrade, setHasUpgrade,
    showPrestigePopup, setShowPrestigePopup,
    prestigeCount, setPrestigeCount,
    electroShards, setElectroShards,
    beaconCount, setBeaconCount,
    showBeacon, setShowBeacon,
    showBeaconVisual, setShowBeaconVisual,
    isSurgeActive, setIsSurgeActive,
    hasFoundCapacitorThisSurge, setHasFoundCapacitorThisSurge,
    surgeCount, setSurgeCount,
    cogfatherLore, setCogfatherLore,
    preservedHelper, setPreservedHelper, 
    isTronicsSurgeActive, setTronicsSurgeActive
  };
};