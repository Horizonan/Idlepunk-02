export const crewDatabase = [
  {
    id: 'c1',
    name: 'Rivet',
    rarity: 'common',
    role: 'Scrap Hauler',
    perks: ['+20% junk gained from short missions'],
    stats: {
      tech: 2,
      grit: 7,
      stealth: 2,
      luck: 4,
      psyche: 1, 
    },
    description: 'Used to be a very succesfull trucker, then trucking got automated now hes hauling scrap from one place to another',
    unlockConditions: {
      minGameScore: 10,
      requiresItems: ['Reinforced Harness'],
      minCrew: 0,
    },
    unlockCost: {
      type: 'junk',
      amount: 400000,
      items: [],
    }
  },
  {
    id: 'c2',
    name: 'Greasetrap',
    rarity: 'common',
    role: 'Dumpster Navigator',
    perks: ['+2% junk yield from failed missions'],
    stats: {
      tech: 1,
      grit: 4,
      stealth: 1,
      luck: 2,
      psyche: 2, 
    },
    description: 'Used to live in a cafeteria grease chute. Smells like burnt oil and bad decisions. Claims he can "hear the trash talk.',
    unlockConditions: {
      minGameScore: 5,
      requiresItems: [],
      minCrew: 0,
    },
    unlockCost: {
      type: 'junk',
      amount: 100000,
      items: [],
    }
  },
  {
    id: 'c3',
    name: 'Lintlock',
    rarity: 'common',
    role: 'Pocket Thief (Retired)',
    perks: ['+5% chance to find useless items during missions'],
    stats: {
      tech: 1,
      grit: 3,
      stealth: 3,
      luck: 2,
      psyche: 2,
    },
    description: 'Once tried to pickpocket a vending machine. Mostly collects lint and suspicious IOUs. Swears he "almost made it big in Dust League.',
    unlockConditions: {
      minGameScore: 8,
      requiresItems: [],
      minCrew: 0,
    },
    unlockCost: {
      type: 'junk',
      amount: 200000,
      items: [],
    }
  },
  {
    id: 'u1',
    name: 'Blister',
    rarity: 'uncommon',
    role: 'Saboteur',
    perks: ['+15% chance to reduce mission timers'],
    stats: {
      tech: 4,
      grit: 5,
      stealth: 6,
      luck: 4,
      psyche: 2, // Total: 21
    },
    unlockConditions: {
      minGameScore: 25,
      requiresItems: [],
      minCrew: 0,
    },
  },
  {
    id: 'r1',
    name: 'Glitchwitch',
    rarity: 'rare',
    role: 'Signal Scraper',
    perks: ['+10% Electro Shard obtain chance'],
    stats: {
      tech: 8,
      grit: 2,
      stealth: 5,
      luck: 4,
      psyche: 8, // Total: 27
    },
    unlockConditions: {
      minGameScore: 80,
      requiresItems: ['Signal Scanner'],
      maxCrew: 2,
    },
  },
  {
    id: 'r2',
    name: 'Neon Vex',
    rarity: 'rare',
    role: 'Signal Interceptor',
    perks: ['Chance to discover hidden missions when returning from completed ones'],
    stats: {
      tech: 8,
      grit: 3,
      stealth: 6,
      luck: 5,
      psyche: 5, // Total: 27
    },
    unlockConditions: {
      minGameScore: 45,
      requiresItems: ['Signal Scanner'],
      minCrew: 1,
    },
  },
  {
    id: 'e1',
    name: 'Patchwire',
    rarity: 'epic',
    role: 'Glitch Surgeon',
    perks: ['Once per day, prevents mission failure on risky runs'],
    stats: {
      tech: 7,
      grit: 4,
      stealth: 4,
      luck: 6,
      psyche: 10, // Total: 31
    },
    unlockConditions: {
      minGameScore: 60,
      requiresItems: ['Neuro Patch Kit'],
      minCrew: 2,
    },
  },
  {
    id: 'l1',
    name: 'Nulljack',
    rarity: 'legendary',
    role: 'Core Diver',
    perks: ['Doubles reward from data extraction missions'],
    stats: {
      tech: 10,
      grit: 6,
      stealth: 7,
      luck: 8,
      psyche: 8, // Total: 39
    },
    unlockConditions: {
      minGameScore: 75,
      requiresItems: ['Core Access Spike', 'Encrypted Map'],
      minCrew: 2,
    },
  }
];
