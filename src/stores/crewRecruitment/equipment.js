export const equipmentDatabase = {
  weapons: {
    greaseStainedGloves: {
      id: 'grease_gloves',
      name: 'Grease-Stained Gloves',
      type: 'weapon',
      rarity: 'common',
      statBonus: { grit: 2, tech: 1 },
      icon: '🧤',
      flavor: 'Still slippery after all these years',
      autoSellValue: 5
    },
    stickyTokenBelt: {
      id: 'token_belt',
      name: 'Sticky Token Belt',
      type: 'weapon',
      rarity: 'common',
      statBonus: { luck: 3, stealth: 1 },
      icon: '🪙',
      flavor: 'Jingles ominously when you walk',
      autoSellValue: 5
    },
    spaOverrideChip: {
      id: 'spa_override_chip',
      name: 'Spa Override Chip',
      type: 'weapon',
      rarity: 'uncommon',
      statBonus: { tech: 3, stealth: 2 },
      icon: '💾',
      flavor: 'Still smells faintly of cucumber and deception',
      autoSellValue: 15
    },
    voidFragment: {
      id: 'void_fragment',
      name: 'Void Fragment',
      type: 'weapon',
      rarity: 'epic',
      statBonus: { psyche: 5, tech: 3 },
      icon: '🌌',
      flavor: 'Whispers secrets from the void',
      autoSellValue: 50
    },
    echoResonator: {
      id: 'echo_resonator',
      name: 'Echo Resonator',
      type: 'weapon',
      rarity: 'epic',
      statBonus: { psyche: 5, tech: 3, luck: 2 },
      icon: '📡',
      flavor: 'Whispers memories that aren\'t yours. Very unsettling. Very profitable.',
      autoSellValue: 30
    }
  },
  armor: {
    scrapPlating: {
      id: 'scrap_plating',
      name: 'Scrap Plating',
      type: 'armor',
      rarity: 'common',
      statBonus: { grit: 3 },
      icon: '🛡️',
      flavor: 'Recycled protection for a recycled world',
      autoSellValue: 5
    },
    electroShield: {
      id: 'electro_shield',
      name: 'Electro Shield',
      type: 'armor',
      rarity: 'rare',
      statBonus: { tech: 4, psyche: 2 },
      icon: '⚡',
      flavor: 'Sparks with unstable energy',
      autoSellValue: 25
    }
  },
  tools: {
    hackingKit: {
      id: 'hacking_kit',
      name: 'Hacking Kit',
      type: 'tool',
      rarity: 'uncommon',
      statBonus: { tech: 4, stealth: 2 },
      icon: '💻',
      flavor: 'For when talking fails',
      autoSellValue: 15
    },
    luckyCharm: {
      id: 'lucky_charm',
      name: 'Lucky Charm',
      type: 'tool',
      rarity: 'rare',
      statBonus: { luck: 4, psyche: 3 },
      icon: '🗺️',
      flavor: 'Updates itself when you are not looking',
      autoSellValue: 25
    }
  }
};

export const getEquipmentById = (id) => {
  for (const category of Object.values(equipmentDatabase)) {
    for (const item of Object.values(category)) {
      if (item.id === id) return item;
    }
  }
  return null;
};

export const getAllEquipment = () => {
  const allEquipment = [];
  Object.values(equipmentDatabase).forEach(category => {
    Object.values(category).forEach(item => {
      allEquipment.push(item);
    });
  });
  return allEquipment;
};