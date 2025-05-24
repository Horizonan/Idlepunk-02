
export const missions = {
  greaseRun: {
    id: 'grease_1',
    name: 'Grease Run',
    difficulty: 'Easy',
    description: 'Retrieve "usable lubricant" from a condemned deep fryer facility. Bring gloves. Or don’t.',
    maxCrew: 1,
    duration: 300, // 5 minutes
    baseRewards: {
      credits: 12,
      junk: 800
    },
    bonusRewards: {
      loadout: {
        chance: 0.3,
        item: 'Grease-Stained Gloves'
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
          'Turns out "edible grease" isn’t a regulated term.',
          'Got into a slap fight with a rat named Dennis.',
          'Fryer ghost whispered forbidden recipes.'
        ]
      }
    }
  },
  
  dataHeist: {
    id: 'heist_1',
    name: 'Data Heist',
    difficulty: 'Medium',
    description: 'Infiltrate a forgotten data center',
    maxCrew: 2,
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
    maxCrew: 3,
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
