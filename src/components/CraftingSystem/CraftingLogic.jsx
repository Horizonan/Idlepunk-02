import React from 'react';

export const craftItem = (item, junk, setJunk, setCraftingInventory, setNotifications, clickMultiplier, craftingInventory, setClickMultiplier, setAutoClicks, setPassiveIncome, setItemCosts) => {
  if (item.type === 'basic') {
    const cost = craftingInventory['Crafting Booster Unit'] ? Math.floor(item.cost * 0.9) : item.cost;
    if (junk >= cost) {
      setJunk(prev => prev - cost);
      setCraftingInventory(prev => ({
        ...prev,
        [item.name]: (prev[item.name] || 0) + 1
      }));
      setNotifications(prev => [...prev, `Crafted ${item.name}!`]);
    }
  } else {
    const canCraft = Object.entries(item.requirements).every(
      ([mat, count]) => (craftingInventory[mat] || 0) >= count
    ) && (!item.onetime || !(craftingInventory[item.name] || 0)) && junk >= (item.cost || 0);

    if (canCraft) {
      setCraftingInventory(prev => {
        const newInventory = { ...prev };
        Object.entries(item.requirements).forEach(([mat, count]) => {
          newInventory[mat] -= count;
        });
        newInventory[item.name] = (newInventory[item.name] || 0) + 1;
        return newInventory;
      });

      if (item.cost) setJunk(prev => prev - item.cost);

      // Handle special effects
      if (item.name === 'Click Rig Mk I') {
        setClickMultiplier(prev => prev * 1.25);
        setNotifications(prev => [...prev, "Click power increased by 25%!"]);
      }
      if (item.name === 'Auto Toolkit') {
        setAutoClicks(prev => Math.floor(prev * 1.25));
        setNotifications(prev => [...prev, "Auto Click efficiency increased by 25%!"]);
      }
      if (item.name === 'Compression Pack') {
        setPassiveIncome(prev => Math.floor(prev * 1.25));
        setNotifications(prev => [...prev, "Passive income increased by 25%!"]);
      }
      if (item.name === 'Reinforced Backpack') {
        setItemCosts(prev => {
          const newCosts = { ...prev };
          Object.keys(newCosts).forEach(key => {
            if (key !== 'clickEnhancer') {
              const currentScaling = key === 'streetrat' || key === 'cart' || key === 'junkMagnet' || key === 'urbanRecycler' || key === 'scrapDrone' ? 1.15 : 1.1;
              const newScaling = currentScaling - 0.01;
              localStorage.setItem(`${key}Scaling`, newScaling.toString());
            }
          });
          return newCosts;
        });
        setNotifications(prev => [...prev, "Cost scaling reduced by 1%!"]);
      }

      setNotifications(prev => [...prev, `Crafted ${item.name}!`]);
    }
  }
};

export const validateCrafting = (junk, craftingInventory, notifications, setNotifications, setJunk, setClickMultiplier, setAutoClicks, setPassiveIncome, setItemCosts) => {
  const handleCraft = (item) => {
    if (item.type === 'basic') {
      const cost = craftingInventory['Crafting Booster Unit'] ? Math.floor(item.cost * 0.9) : item.cost;
      if (junk >= cost) {
        setJunk(prev => prev - cost);
        return {
          ...craftingInventory,
          [item.name]: (craftingInventory[item.name] || 0) + 1
        };
      }
    } else {
      const canCraft = Object.entries(item.requirements).every(
        ([mat, count]) => (craftingInventory[mat] || 0) >= count
      ) && (!item.onetime || !(craftingInventory[item.name] || 0)) && junk >= (item.cost || 0);

      if (canCraft) {
        const newInventory = { ...craftingInventory };
        Object.entries(item.requirements).forEach(([mat, count]) => {
          newInventory[mat] -= count;
        });
        newInventory[item.name] = (newInventory[item.name] || 0) + 1;

        if (item.cost) setJunk(prev => prev - item.cost);


        return newInventory;
      }
    }
    return craftingInventory;
  };
  return { handleCraft };
};

export const formatJunkCost = (cost, hasBooster) => {
  if (hasBooster) {
    cost = Math.floor(cost * 0.9);
  }
  if (cost >= 1000000) {
    return (cost / 1000000).toFixed(1) + 'M';
  } else if (cost >= 1000) {
    return (cost / 1000).toFixed(0) + 'K';
  }
  return cost;
};