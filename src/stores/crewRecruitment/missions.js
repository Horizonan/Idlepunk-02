export const missions = {
  greaseRun: {
    id: 'scavenge_1',
    name: 'Grease Run',
    difficulty: 'Easy',
    category: 'scavenge',
    description: 'Retrieve "usable lubricant" from a condemned deep fryer facility. Bring gloves. Or don\'t.',
    maxCrew: 1,
    duration: 300, // 5 minutes
    baseRewards: {
      credits: 12,
      junk: 800
    },
    bonusRewards: {
      equipment: {
        chance: 0.3,
        itemId: 'grease_gloves'
      },
      rareCredits: {
        chance: 0.1,
        amount: 25
      }
    },
    requirements: {
      tech: 3,
      grit: 4,
      stealth: 2,
      luck: 3,
      psyche: 5
    },
    penalties: {
      failure: {
        credits: -5,
        crewStamina: -15,
        messagePool: [
          'Slipped on the job. Literally.',
          'Turns out "edible grease" isn\'t a regulated term.',
          'Got into a slap fight with a rat named Dennis.',
          'Fryer ghost whispered forbidden recipes.'
        ]
      }
    },
    successMessages: [
      'Came back slick and triumphant.',
      'Grease acquired. Pride? Optional.',
      'Crew members now smells like profit.',
      'Successfully harvested oil of unknown origin.'
    ]
  },

  dumpsterDiveDeluxe: {
    id: 'scavenge_2',
    name: 'Dumpster Dive Deluxe',
    difficulty: 'Medium',
    category: 'scavenge',
    description: 'Pick through the sealed vault-bins behind the Neon Eats megafoodplex. Hazmat gear recommended.',
    maxCrew: 2,
    duration: 600, // 10 minutes
    baseRewards: {
      credits: 22,
      junk: 2300
    },
    bonusRewards: {
      equipment: {
        chance: 0.2,
        itemId: 'hazmat_rag'
      },
      rareCredits: {
        chance: 0.08,
        amount: 40
      }
    },
    requirements: {
      tech: 4,
      grit: 5,
      stealth: 2,
      luck: 3,
      psyche: 2
    },
    penalties: {
      failure: {
        credits: -15,
        crewStamina: -25,
        messagePool: [
          'Trash compactor activated mid-dive.',
          'Found a cursed burger still whispering.',
          'Bitten by a mutant pizza roll.',
          'Smelled something forbidden and forgot your own name.'
        ]
      }
    },
    successMessages: [
      'Disgusting? Yes. Profitable? Also yes.',
      'Found value deep in the bin abyss.',
      'Smelled like shame, looked like coin.',
      'Scored some perfectly questionably edible loot.'
    ]
  },

  coinOpHeist: {
    id: 'heist_1',
    name: 'Coin-Op Heist',
    difficulty: 'Easy',
    category: 'heist',
    description: 'Break into an abandoned arcade to salvage coin trays. Tokens accepted nowhere.',
    maxCrew: 2,
    duration: 420, // 7 minutes
    baseRewards: {
      credits: 18,
      junk: 500
    },
    bonusRewards: {
      equipment: {
        chance: 0.25,
        itemId: 'token_belt'
      },
      electroShard: {
        chance: 0.05,
        amount: 1
      }
    },
    requirements: {
      tech: 3,
      grit: 2,
      stealth: 4,
      luck: 2,
      psyche: 1
    },
    penalties: {
      failure: {
        credits: -10,
        crewStamina: -20,
        messagePool: [
          'Spent 3 minutes stuck in a claw machine.',
          'Got emotionally attached to a DanceBot 3000.',
          'Discovered "Free Play Mode" was a trap.',
          'Triggered pinball multiball defense system.'
        ]
      }
    },
    successMessages: [
      'Jackpotted a full tray of crusty coins!',
      'Arcade looted. DanceBot left undisturbed.',
      'Tokens secured. Morals compromised.',
      'Left a high score and took the loot.'
    ]
  },

  clawbackJob: {
    id: 'heist_2',
    name: 'Clawback Job',
    difficulty: 'Medium',
    category: 'heist',
    description: 'Break into a bankrupt biotech spa to recover illegal "rejuvenation" tokens. Still guarded by malfunctioning medibots.',
    maxCrew: 2,
    duration: 540, // 9 minutes
    baseRewards: {
      credits: 30,
      junk: 900
    },
    bonusRewards: {
      equipment: {
        chance: 0.2,
        itemId: 'spa_override_chip'
      },
      rareCredits: {
        chance: 0.12,
        amount: 40
      }
    },
    requirements: {
      tech: 5,
      grit: 3,
      stealth: 5,
      luck: 3,
      psyche: 2
    },
    penalties: {
      failure: {
        credits: -15,
        crewStamina: -20,
        messagePool: [
          'Tranquilizer gas triggered mid-escape.',
          'Spa bot tried to exfoliate a team member to death.',
          'Confused with actual customers. Still got charged.',
          'Soothing music made everything worse.'
        ]
      }
    },
    successMessages: [
      'Tokens secured. Skin tingling from weird mists.',
      'Spa tech hijacked. Loot acquired.',
      'Crew smelled suspiciously floral but victorious.',
      'Left with bags of coins and a mild aura.'
    ]
  },

  voidRun: {
    id: 'void_1',
    name: 'Void Run',
    difficulty: 'Hard',
    category: 'exploration',
    description: 'Venture into the unstable void zones',
    maxCrew: 3,
    duration: 900, // 15 minutes
    baseRewards: {
      credits: 50,
      junk: 50000
    },
    bonusRewards: {
      electroShard: {
        chance: 0.4,
        amount: 3
      },
      equipment: {
        chance: 0.15,
        itemId: 'void_fragment'
      }
    },
    requirements: {
      tech: 7,
      grit: 6,
      stealth: 5,
      luck: 4,
      psyche: 4
    },
    penalties: {
      failure: {
        credits: -25,
        crewStamina: -40,
        messagePool: [
          'Void exposure overwhelmed the crew.',
          'Reality distortion caused mission failure.',
          'The void consumed our equipment.',
          'Crew lost in dimensional rifts.'
        ]
      }
    },
    successMessages: [
      'Void successfully navigated!',
      'Harvested rare void fragments.',
      'Crew returned with void knowledge.',
      'Reality remained intact during extraction.'
    ]
  },

  echoHarvest: {
    id: 'void_2',
    name: 'Echo Harvest',
    difficulty: 'Very Hard',
    category: 'exploration',
    description: 'Collect ambient "void echoes" from a crumbling anomaly pocket. Echoes can affect memory and personality. Fun.',
    maxCrew: 3,
    duration: 1080, // 18 minutes
    baseRewards: {
      credits: 70,
      junk: 65000
    },
    bonusRewards: {
      electroShard: {
        chance: 0.5,
        amount: 4
      },
      equipment: {
        chance: 0.2,
        itemId: 'echo_resonator'
      }
    },
    requirements: {
      tech: 8,
      grit: 7,
      stealth: 4,
      luck: 5,
      psyche: 8
    },
    penalties: {
      failure: {
        credits: -35,
        crewStamina: -45,
        messagePool: [
          'Crew heard their own voices... from the future.',
          'Temporal sync failed. You left before you arrived.',
          'Harvesting failed—echoes turned hostile.',
          'One crew member doesn\'t remember the job. Or their name.'
        ]
      }
    },
    successMessages: [
      'Echoes captured. Crew slightly unstable, but rich.',
      'Reality bent. Wallets didn\'t.',
      'Mission complete. Memory fog optional.',
      'Voidspeak noted: "Profitable anomaly contact."'
    ]
  }
};

export const missionCategories = {
  scavenge: ['greaseRun', 'dumpsterDiveDeluxe'],
  heist: ['coinOpHeist', 'clawbackJob'],
  exploration: ['voidRun', 'echoHarvest']
};

export function calculateMissionSuccess(crewStats, missionRequirements) {
  let totalScore = 0;
  let maxScore = 0;

  for (const [stat, requirement] of Object.entries(missionRequirements)) {
    if (crewStats[stat]) {
      totalScore += Math.min(crewStats[stat], requirement);
    }
    maxScore += requirement;
  }

  return (totalScore / maxScore) * 100; // Returns percentage of success chance
}

export const calculateMissionDuration = (baseDuration) => {
  let duration = baseDuration; // Duration is already in seconds

  // Check if Chrono Regulator is owned
  const craftingInventory = JSON.parse(localStorage.getItem('craftingInventory') || '{}');
  if (craftingInventory['Chrono Regulator'] && craftingInventory['Chrono Regulator'] > 0) {
    duration = Math.max(60, duration - 20); // Reduce by 20 seconds, minimum 1 minute
  }

  // Apply Heisting Speed skill reduction
  const skillLevels = JSON.parse(localStorage.getItem('skillLevels') || '{}');
  const heistingSpeedLevel = skillLevels.heistingSpeed || 0;
  if (heistingSpeedLevel > 0) {
    const speedReduction = heistingSpeedLevel * 0.005; // 0.5% per level
    duration = Math.max(60, duration * (1 - speedReduction)); // Apply reduction, minimum 1 minute
  }

  return duration;
};