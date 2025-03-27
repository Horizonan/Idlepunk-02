
import { defaultAchievements } from '../hooks/useAchievements';

export const validateQuests = ({
  junk,
  clickCount,
  clickMultiplier,
  passiveIncome,
  autoClicks,
  globalJpsMultiplier,
  surgeCount,
  electroShards,
  cogfatherLore,
  craftingInventory,
  ownedItems,
  setElectroShards,
  setNotifications,
  setCraftingInventory
}) => {
  // Quest validation
  const hasAnyUpgrade = ownedItems.trashBag > 0 || ownedItems.trashPicker > 0;
  const totalPassiveIncome = Math.floor(passiveIncome * globalJpsMultiplier + (autoClicks * clickMultiplier));

  const questChecks = [
    {
      title: "Begin Crafting",
      condition: Object.values(craftingInventory).some(count => count > 0),
      category: 'progression',
      onComplete: () => {
        const questKey = 'quest_sync_Begin Crafting';
        if (localStorage.getItem(questKey) !== 'true') {
          localStorage.setItem(questKey, 'true');
          window.dispatchEvent(new Event('storage'));
          setNotifications(prev => [...prev, "Quest Completed: Begin Crafting"]);
        }
      }
    },
    { 
      title: "First Steps", 
      condition: clickCount > 0,
      category: 'progression'
    },
    { 
      title: "Shopping Time", 
      condition: hasAnyUpgrade,
      category: 'progression'
    },
    { 
      title: "Tool Master", 
      condition: clickMultiplier > 1,
      category: 'progression'
    },
    { 
      title: "Passive Income", 
      condition: totalPassiveIncome > 0,
      category: 'progression'
    },
    {
      title: "Surge Rider",
      condition: surgeCount >= 1,
      category: 'ascension',
      onComplete: () => {
        setElectroShards(prev => {
          const newValue = prev + 1;
          localStorage.setItem('electroShards', newValue);
          return newValue;
        });
        setNotifications(prev => [...prev, "Quest Completed: Surge Rider - Received 1x Electro Shard!"]);
      }
    },
    { 
      title: "Surge Overflow", 
      condition: surgeCount >= 3,
      category: 'ascension',
      onComplete: () => {
        setCraftingInventory(prev => ({
          ...prev,
          'Stabilized Capacitor': (prev['Stabilized Capacitor'] || 0) + 1
        }));
        setNotifications(prev => [...prev, "Received: 1x Stabilized Capacitor"]);
      }
    },
    { 
      title: "The Circuit Speaks", 
      condition: electroShards >= 5,
      category: 'ascension',
      onComplete: () => {
        setCraftingInventory(prev => ({
          ...prev,
          'Voltage Node': (prev['Voltage Node'] || 0) + 1
        }));
        setNotifications(prev => [...prev, "The circuit's secrets are revealed. Received: 1x Voltage Node"]);
      }
    },
    {
      title: "Whispers in the Scrap",
      condition: (cogfatherLore.length >= 10 || junk >= 7500000),
      category: 'ascension',
      onComplete: () => {
        setCraftingInventory(prev => ({
          ...prev,
          'Synthcore Fragment': (prev['Synthcore Fragment'] || 0) + 1
        }));
        window.dispatchEvent(new CustomEvent('nextNews', { 
          detail: { message: "A strange resonance echoes from your scrap..." }
        }));
        setNotifications(prev => [...prev, "The whispers grow stronger. Received: 1x Synthcore Fragment"]);
      }
    },
    {
      title: "Forge the Future",
      condition: craftingInventory['Prestige Crystal'] >= 1,
      category: 'prestige',
      onComplete: () => {
        localStorage.setItem('prestigeUnlocked', 'true');
        localStorage.setItem('quest_sync_Forge the Future', 'true');
        setNotifications(prev => [...prev, "The Prestige System has been unlocked!"]);
        window.dispatchEvent(new CustomEvent('nextNews', { 
          detail: { message: "Cogfather: The crystal's power flows through the system. You're ready for what comes next." }
        }));
      }
    }
  ];

  questChecks.forEach(quest => {
    if (quest.condition) {
      const questSyncKey = `quest_sync_${quest.title}`;
      if (!localStorage.getItem(questSyncKey)) {
        localStorage.setItem(questSyncKey, 'true');
        setNotifications(prev => [...prev, `Quest Completed: ${quest.title}`]);

        if (quest.onComplete) {
          quest.onComplete();
        }
      }
    }
  });
};
