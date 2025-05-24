
export const missions = {
  scrapScout: {
    id: 'scout_1',
    name: 'Scrap Scout',
    difficulty: 'Easy',
    description: 'Scout the outskirts for valuable junk',
    duration: 300, // 5 minutes in seconds
    baseRewards: {
      credits: 100,
      junk: 1000
    },
    bonusRewards: {
      electroShard: {
        chance: 0.1, // 10% chance
        amount: 1
      },
      rareJunk: {
        chance: 0.2,
        amount: 500
      }
    },
    requirements: {
      tech: 3,
      grit: 2,
      stealth: 1,
      luck: 1,
      psyche: 1
    },
    penalties: {
      failure: {
        credits: -50,
        crewStamina: -20
      }
    }
  },
  
  dataHeist: {
    id: 'heist_1',
    name: 'Data Heist',
    difficulty: 'Medium',
    description: 'Infiltrate a forgotten data center',
    duration: 600, // 10 minutes
    baseRewards: {
      credits: 250,
      junk: 2000
    },
    bonusRewards: {
      electroShard: {
        chance: 0.25,
        amount: 2
      },
      encryptedCoil: {
        chance: 0.1,
        amount: 1
      }
    },
    requirements: {
      tech: 5,
      grit: 3,
      stealth: 4,
      luck: 2,
      psyche: 2
    },
    penalties: {
      failure: {
        credits: -125,
        crewStamina: -40
      }
    }
  },
  
  voidRun: {
    id: 'void_1',
    name: 'Void Run',
    difficulty: 'Hard',
    description: 'Venture into the unstable void zones',
    duration: 900, // 15 minutes
    baseRewards: {
      credits: 500,
      junk: 5000
    },
    bonusRewards: {
      electroShard: {
        chance: 0.4,
        amount: 3
      },
      voidFragment: {
        chance: 0.15,
        amount: 1
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
        credits: -250,
        crewStamina: -60
      }
    }
  }
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
