const crewDatabase = [
  {
    id: 'c1',
    name: 'Rivet',
    rarity: 'common',
    role: 'Scrap Hauler',
    perks: ['+20% junk gained from short missions'],
    unlockConditions: {
      minGameScore: 10,
      requiresItems: ['Reinforced Harness'],
      minCrew: 0,
    },
  },
  {
    id: 'u1',
    name: 'Blister',
    rarity: 'uncommon',
    role: 'Saboteur',
    perks: ['+15% chance to reduce mission timers'],
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
    unlockConditions: {
      minGameScore: 75,
      requiresItems: ['Core Access Spike', 'Encrypted Map'],
      minCrew: 2,
    },
  }
];