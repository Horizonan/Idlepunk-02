
export const equipmentCategories = {
  weapon: 'Weapon',
  armor: 'Armor', 
  tool: 'Tool'
};

export const equipmentDatabase = {
  // Weapons
  'Grease-Stained Gloves': {
    id: 'grease_gloves',
    name: 'Grease-Stained Gloves',
    category: 'weapon',
    rarity: 'common',
    description: 'Slippery but surprisingly effective for grappling',
    statBonus: { grit: 2, luck: 1 },
    icon: '🧤',
    flavor: 'Still smells like burnt oil and regret'
  },
  'Sticky Token Belt': {
    id: 'token_belt',
    name: 'Sticky Token Belt',
    category: 'tool',
    rarity: 'common', 
    description: 'Holds an impractical amount of worthless tokens',
    statBonus: { luck: 2, stealth: 1 },
    icon: '🎰',
    flavor: 'Jingles ominously when you walk'
  },
  'Plasma Cutter': {
    id: 'plasma_cutter',
    name: 'Plasma Cutter',
    category: 'weapon',
    rarity: 'uncommon',
    description: 'Industrial cutting tool repurposed for combat',
    statBonus: { tech: 3, grit: 2 },
    icon: '⚡',
    flavor: 'Burns through most things. Including fingers.'
  },
  'Signal Scanner': {
    id: 'signal_scanner',
    name: 'Signal Scanner',
    category: 'tool',
    rarity: 'uncommon',
    description: 'Detects hidden transmissions and secrets',
    statBonus: { tech: 3, psyche: 1 },
    icon: '📡',
    flavor: 'Sometimes picks up old radio shows'
  },
  'Reinforced Harness': {
    id: 'reinforced_harness',
    name: 'Reinforced Harness',
    category: 'armor',
    rarity: 'common',
    description: 'Heavy-duty safety gear for dangerous work',
    statBonus: { grit: 3 },
    icon: '🦺',
    flavor: 'Has suspicious burn marks'
  },
  'Stealth Cloak': {
    id: 'stealth_cloak',
    name: 'Stealth Cloak',
    category: 'armor',
    rarity: 'rare',
    description: 'Advanced camouflage technology',
    statBonus: { stealth: 4, psyche: 1 },
    icon: '🥷',
    flavor: 'Sometimes you forget you are wearing it'
  },
  'Neuro Patch Kit': {
    id: 'neuro_patch',
    name: 'Neuro Patch Kit',
    category: 'tool',
    rarity: 'epic',
    description: 'Emergency neural stabilization equipment',
    statBonus: { psyche: 5, tech: 2 },
    icon: '🧠',
    flavor: 'Side effects may include temporary enlightenment'
  },
  'Core Access Spike': {
    id: 'core_spike',
    name: 'Core Access Spike',
    category: 'weapon',
    rarity: 'legendary',
    description: 'Breaches the most secure systems',
    statBonus: { tech: 6, stealth: 3 },
    icon: '🔌',
    flavor: 'Hums with dangerous energy'
  },
  'Encrypted Map': {
    id: 'encrypted_map',
    name: 'Encrypted Map',
    category: 'tool',
    rarity: 'legendary',
    description: 'Reveals hidden locations and secrets',
    statBonus: { luck: 4, psyche: 3 },
    icon: '🗺️',
    flavor: 'Updates itself when you\'re not looking'
  }
};

export function getEquipmentByCategory(category) {
  return Object.values(equipmentDatabase).filter(item => item.category === category);
}

export function calculateEquipmentBonus(equippedItems) {
  const bonus = { tech: 0, grit: 0, stealth: 0, luck: 0, psyche: 0 };
  
  equippedItems.forEach(itemName => {
    const equipment = equipmentDatabase[itemName];
    if (equipment && equipment.statBonus) {
      Object.entries(equipment.statBonus).forEach(([stat, value]) => {
        bonus[stat] += value;
      });
    }
  });
  
  return bonus;
}
