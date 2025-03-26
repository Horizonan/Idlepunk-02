import React from 'react';

export const craftItem = (item, junk, setJunk, setCraftingInventory, setNotifications, clickMultiplier, craftingInventory) => {
  // First check if we have craftingInventory
  if (!craftingInventory) {
    console.error('Missing craftingInventory in craftItem');
    return;
  }

  // Basic item crafting logic
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
    return;
  }

  // Check if all requirements are met
  const canCraft = Object.entries(item.requirements).every(
    ([mat, count]) => (craftingInventory[mat] || 0) >= count
  ) && (!item.onetime || !(craftingInventory[item.name] || 0));

  // Additional junk cost check
  if (item.cost && junk < item.cost) {
    return;
  }

  if (canCraft) {
    // Update inventory by removing required materials
    setCraftingInventory(prev => {
      const newInventory = { ...prev };
      Object.entries(item.requirements).forEach(([mat, count]) => {
        newInventory[mat] = (newInventory[mat] || 0) - count;
      });
      newInventory[item.name] = (newInventory[item.name] || 0) + 1;
      return newInventory;
    });

    // Deduct junk cost if any
    if (item.cost) {
      setJunk(prev => prev - item.cost);
    }

    setNotifications(prev => [...prev, `Crafted ${item.name}!`]);
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