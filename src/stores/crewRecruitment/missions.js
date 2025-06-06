
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
          'Turns out "edible grease" isn’t a regulated term.',
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
  
  coinOpHeist: {
    id: 'heist_1',
    name: 'Coin-Op Heist',
    difficulty: 'Easy',
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
  
  voidRun: {
    id: 'void_1',
    name: 'Void Run',
    difficulty: 'Hard',
    description: 'Venture into the unstable void zones',
    maxCrew: 3,
    duration: 1, // 15 minutes
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
