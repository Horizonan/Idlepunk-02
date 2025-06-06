
export const formatTooltipItem = (item, gameState) => {
  const baseItem = {
    name: item.name || 'Unknown Item',
    subtitle: item.subtitle || item.type,
    description: item.description || '',
    owned: item.owned || 0,
    hotkey: item.hotkey
  };

  // Add effects/stats
  if (item.effects) {
    baseItem.effects = item.effects.map(effect => ({
      label: effect.label,
      value: effect.value,
      prefix: effect.prefix || (effect.value > 0 ? '+' : ''),
      suffix: effect.suffix || ''
    }));
  }

  // Add price information
  if (item.price !== undefined) {
    baseItem.price = item.price;
    baseItem.currency = item.currency || 'Junk';
    baseItem.canAfford = gameState?.junk >= item.price;
  }

  // Add requirements
  if (item.requirements) {
    baseItem.requirements = item.requirements.map(req => ({
      label: req.label,
      current: req.current,
      required: req.required,
      met: req.current >= req.required
    }));
  }

  return baseItem;
};

export const createUpgradeTooltip = (upgrade, gameState) => {
  return formatTooltipItem({
    name: upgrade.name,
    subtitle: upgrade.category || 'Upgrade',
    description: upgrade.description,
    price: upgrade.price,
    currency: upgrade.currency,
    owned: upgrade.owned || 0,
    effects: [
      {
        label: upgrade.effectLabel || 'Effect',
        value: upgrade.effectValue || 0,
        suffix: upgrade.effectSuffix || ''
      }
    ]
  }, gameState);
};

export const createItemTooltip = (item, gameState) => {
  return formatTooltipItem({
    name: item.name,
    subtitle: item.rarity || 'Item',
    description: item.description,
    owned: item.quantity || 0,
    effects: item.stats ? Object.entries(item.stats).map(([key, value]) => ({
      label: key.charAt(0).toUpperCase() + key.slice(1),
      value: value,
      prefix: value > 0 ? '+' : ''
    })) : []
  }, gameState);
};
