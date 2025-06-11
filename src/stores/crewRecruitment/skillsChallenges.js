export const skillsChallengePool = [
  // Tech Challenges
  {
    id: 'tech1',
    title: 'Circuit Analysis',
    skillType: 'Tech',
    type: 'multiple_choice',
    description: 'A power relay is overloading. What\'s the most likely cause?',
    options: [
      'Insufficient voltage regulation',
      'Excessive current draw from connected systems',
      'Temperature fluctuation in the control room',
      'Magnetic interference from nearby equipment'
    ],
    correctAnswer: 'Excessive current draw from connected systems'
  },
  {
    id: 'tech2',
    title: 'System Diagnostics',
    skillType: 'Tech',
    type: 'calculation',
    description: 'A processing unit runs at 2.4GHz. If it processes 1000 operations per cycle, how many operations per second? (Answer in millions)',
    correctAnswer: 2400
  },
  {
    id: 'tech3',
    title: 'Signal Pattern',
    skillType: 'Tech',
    type: 'sequence',
    description: 'Complete the signal sequence: 01-10-11-00-01-?',
    correctAnswer: '10'
  },

  // Grit Challenges
  {
    id: 'grit1',
    title: 'Endurance Test',
    skillType: 'Grit',
    type: 'multiple_choice',
    description: 'Your crew has been working for 18 hours straight. What\'s your priority?',
    options: [
      'Push through another 6 hours to finish the job',
      'Rotate crew members for mandatory rest periods',
      'Complete the bare minimum and call it done',
      'Abandon the mission due to safety concerns'
    ],
    correctAnswer: 'Rotate crew members for mandatory rest periods'
  },
  {
    id: 'grit2',
    title: 'Resource Management',
    skillType: 'Grit',
    type: 'calculation',
    description: 'You have 50 units of scrap metal. Each repair uses 7 units. How many complete repairs can you make?',
    correctAnswer: 7
  },
  {
    id: 'grit3',
    title: 'Persistence Code',
    skillType: 'Grit',
    type: 'sequence',
    description: 'Enter the persistence mantra: "never-give-?"',
    correctAnswer: 'up'
  },

  // Stealth Challenges
  {
    id: 'stealth1',
    title: 'Infiltration Route',
    skillType: 'Stealth',
    type: 'multiple_choice',
    description: 'Security patrols change shifts every 4 hours. The facility has 3 patrol routes. What\'s the best infiltration window?',
    options: [
      'During shift change when guards are distracted',
      'Mid-shift when guards are most alert',
      'Right after shift change when new guards are fresh',
      'Just before shift change when guards are tired'
    ],
    correctAnswer: 'During shift change when guards are distracted'
  },
  {
    id: 'stealth2',
    title: 'Sound Calculation',
    skillType: 'Stealth',
    type: 'calculation',
    description: 'A footstep creates 40dB of sound. How many footsteps to reach the 120dB danger threshold?',
    correctAnswer: 3
  },
  {
    id: 'stealth3',
    title: 'Shadow Pattern',
    skillType: 'Stealth',
    type: 'sequence',
    description: 'Navigate the shadow path: left-right-left-left-?',
    correctAnswer: 'right'
  },

  // Luck Challenges
  {
    id: 'luck1',
    title: 'Risk Assessment',
    skillType: 'Luck',
    type: 'multiple_choice',
    description: 'You find two paths: one with 70% success chance and small reward, another with 30% chance and huge reward. Which do you choose?',
    options: [
      'Take the 70% safe path for guaranteed progress',
      'Risk the 30% path for the big payoff',
      'Try to find a third option',
      'Flip a coin to decide'
    ],
    correctAnswer: 'Take the 70% safe path for guaranteed progress'
  },
  {
    id: 'luck2',
    title: 'Probability',
    skillType: 'Luck',
    type: 'calculation',
    description: 'Rolling two six-sided dice, what\'s the percentage chance of getting a sum of 7? (Whole number)',
    correctAnswer: 17
  },
  {
    id: 'luck3',
    title: 'Lucky Numbers',
    skillType: 'Luck',
    type: 'sequence',
    description: 'What\'s the next lucky number: 3-7-13-21-?',
    correctAnswer: '31'
  },

  // Psyche Challenges
  {
    id: 'psyche1',
    title: 'Leadership Decision',
    skillType: 'Psyche',
    type: 'multiple_choice',
    description: 'Your team member is having a breakdown during a critical mission. What do you do?',
    options: [
      'Tell them to toughen up and keep going',
      'Take over their responsibilities immediately',
      'Listen to their concerns and adjust the plan',
      'Send them back to base right away'
    ],
    correctAnswer: 'Listen to their concerns and adjust the plan'
  },
  {
    id: 'psyche2',
    title: 'Stress Management',
    skillType: 'Psyche',
    type: 'calculation',
    description: 'Team stress is at 80%. Each rest period reduces it by 15%. How many rest periods to get below 30%?',
    correctAnswer: 4
  },
  {
    id: 'psyche3',
    title: 'Motivation Sequence',
    skillType: 'Psyche',
    type: 'sequence',
    description: 'Complete the motivational phrase: "we-can-do-?"',
    correctAnswer: 'this'
  }
];

export function generateSkillsChallenges(count) {
  // Return the specified number of challenges (8 or 10)
  const skillTypes = ['Tech', 'Grit', 'Stealth', 'Luck', 'Psyche'];
  const selectedChallenges = [];

  // Ensure we get at least one from each skill type, then fill randomly
  skillTypes.forEach(skillType => {
    const available = skillsChallengePool.filter(c => 
      c.skillType === skillType && !selectedChallenges.includes(c)
    );
    if (available.length > 0) {
      const randomIndex = Math.floor(Math.random() * available.length);
      selectedChallenges.push(available[randomIndex]);
    }
  });

  // Fill remaining slots randomly to reach 8 total
  while (selectedChallenges.length < count) {
    const remaining = skillsChallengePool.filter(c => !selectedChallenges.includes(c));
    if (remaining.length === 0) break;
    const randomIndex = Math.floor(Math.random() * remaining.length);
    selectedChallenges.push(remaining[randomIndex]);
  }

  return selectedChallenges;
}