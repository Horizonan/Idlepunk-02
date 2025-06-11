import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { crewDatabase } from './crewMembers';
import { getEquipmentById } from './equipment';
import {generateRandomProfile} from './profiles'
import {calculateMissionSuccess} from './missions'
import {generateSkillsChallenges} from './skillsChallenges'

export const useRecruitmentZustand = create(
  persist(
    (set, get) => ({
      selectedCrew: null,
      lastFeedback: null,
      unlockedCrew: [...crewDatabase.filter(crew => 
        crew.unlockConditions?.minGameScore === 0 || 
        !crew.unlockConditions?.minGameScore
      )],
      hiredCrew: [],
      newlyHiredCrew: [], // Track recently hired crew for "New!" badge
      equipment: [], // Available equipment items
      crewLoadouts: {}, // Map of crew ID to equipped items
      activeMission: null,
      missionStartTime: null,
      lastStaminaUpdate: Date.now(),
      successfulMissions: 0, // Track successful crew missions

      // Equipment management functions
      addEquipment: (itemId) => {
        const equipment = getEquipmentById(itemId);
        if (equipment) {
          const state = get();

          // Check if equipment already exists in inventory or equipped
          const hasInInventory = state.equipment.some(item => item.id === itemId);
          const hasEquipped = Object.values(state.crewLoadouts).some(loadout => 
            Object.values(loadout).some(equippedItem => equippedItem && equippedItem.id === itemId)
          );

          if (hasInInventory || hasEquipped) {
            // Auto-sell duplicate for credits
            const sellValue = equipment.autoSellValue || 5;

            // Get current credits from localStorage and update
            const currentCredits = Number(localStorage.getItem('credits') || 0);
            const newCredits = currentCredits + sellValue;
            localStorage.setItem('credits', newCredits);

            // Trigger a custom event to update the credits in the main component
            window.dispatchEvent(new CustomEvent('creditsUpdated', { 
              detail: { credits: newCredits, message: `Duplicate ${equipment.name} sold for ${sellValue} Credits!` }
            }));

            return false; // Indicate the item was sold instead of added
          } else {
            set(state => ({
              equipment: [...state.equipment, equipment]
            }));
            return true; // Indicate the item was added
          }
        }
        return false;
      },

      equipItemToCrew: (crewId, itemId, slotType) => {
        const equipment = get().equipment.find(item => item.id === itemId);
        if (equipment && equipment.type === slotType) {
          set(state => ({
            crewLoadouts: {
              ...state.crewLoadouts,
              [crewId]: {
                ...state.crewLoadouts[crewId],
                [slotType]: equipment
              }
            },
            equipment: state.equipment.filter(item => item.id !== itemId)
          }));
        }
      },

      unequipItemFromCrew: (crewId, slotType) => {
        const loadout = get().crewLoadouts[crewId];
        if (loadout && loadout[slotType]) {
          const unequippedItem = loadout[slotType];
          set(state => ({
            crewLoadouts: {
              ...state.crewLoadouts,
              [crewId]: {
                ...loadout,
                [slotType]: null
              }
            },
            equipment: [...state.equipment, unequippedItem]
          }));
        }
      },

      getCrewEffectiveStats: (crewId) => {
        const crew = get().hiredCrew.find(c => c.id === crewId);
        if (!crew) return null;

        const loadout = get().crewLoadouts[crewId] || {};
        const baseStats = { ...crew.stats };

        // Apply equipment bonuses
        Object.values(loadout).forEach(equipment => {
          if (equipment && equipment.statBonus) {
            Object.entries(equipment.statBonus).forEach(([stat, bonus]) => {
              baseStats[stat] = (baseStats[stat] || 0) + bonus;
            });
          }
        });

        return baseStats;
      },

      markCrewAsNotNew: (crewId) => {
        set(state => ({
          newlyHiredCrew: state.newlyHiredCrew.filter(id => id !== crewId)
        }));
      },

      updateStamina: () => {
        const now = Date.now();
        const state = get();
        const timeSinceLastUpdate = now - state.lastStaminaUpdate;
        const staminaGain = Math.floor(timeSinceLastUpdate / (30 * 60 * 1000)) * 10;

        if (staminaGain > 0) {
          set(state => ({
            hiredCrew: state.hiredCrew.map(crew => ({
              ...crew,
              stamina: Math.min(100, (crew.stamina || 100) + staminaGain)
            })),
            lastStaminaUpdate: now
          }));
        }
      },
  profiles: [],
  currentIndex: 0,
  score: 0,
  timeLeft: 60,
  isRunning: false,
  
  // Skills Assessment Game State
  skillsChallenges: [],
  currentChallengeIndex: 0,
  gameVariant: 'profile', // 'profile' or 'skills'

  startGame: () => {
    console.log('Starting recruitment game');
    const profileCount = localStorage.getItem('signal_expander_purchased') ? 10 : 8;
    const generated = Array.from({length: profileCount}, generateRandomProfile);
    console.log('Generated profiles:', generated);
    set({profiles: generated, currentIndex: 0, score: 0, timeLeft: 60, isRunning: true, lastFeedback: null, gameVariant: 'profile'});
    console.log('Game state initialized');
  },

  startSkillsGame: () => {
    console.log('Starting skills assessment game');
    const challengeCount = localStorage.getItem('signal_expander_purchased') ? 10 : 8;
    const challenges = generateSkillsChallenges(challengeCount);
    console.log('Generated challenges:', challenges);
    set({skillsChallenges: challenges, currentChallengeIndex: 0, score: 0, timeLeft: 90, isRunning: true, lastFeedback: null, gameVariant: 'skills'});
    console.log('Skills game state initialized');
  },

  act: (action) => {
    const {profiles, currentIndex, score} = get()
    const profile = profiles[currentIndex]

    let delta = 0

    if (action === 'recruit') {
      if (profile.workPermit.status === 'missing') {
        // Penalize recruiting someone with missing permit
        delta = -2;
      } else {
        // Normal permit checking logic
        const isPermitExpired = profile.workPermit.status === 'expired';

        if (!isPermitExpired) {
          delta = profile.isReal ? 2 : -2;
        } else {
          delta -= 2;
        }
      }
    } else if (action === 'trash') {
      if (profile.workPermit.status === 'missing') {
        // Reward trashing profiles with missing permits
        delta = profile.isReal ? 1 : 1;
      } else {
        // Normal trash logic
        delta = profile.isReal ? -1 : 1;
      }
    }

    const profileCount = localStorage.getItem('signal_expander_purchased') ? 10 : 8;
    if (currentIndex >= profileCount - 1) {
      console.log("🎉 Game finished! Final score:", score + delta);
      get().handleGameEnd(score + delta);
    }

    set({score: score + delta, currentIndex: currentIndex + 1})  
  },

  tick: () => {
    const { timeLeft } = get()
    if (timeLeft > 0) {
      set({ timeLeft: timeLeft - 1 })
    } else {
      set({ isRunning: false }) 
    }
  },

  resetGame:() => {
    set({
      profiles: [],
      currentIndex: 0,
      score: 0,
      timeLeft: 60,
      isRunning: false,
      selectedCrew: null,
      lastFeedback: null,
      skillsChallenges: [],
      currentChallengeIndex: 0,
      gameVariant: 'profile'
    })
  },

  solveChallenge: (answer) => {
    const { skillsChallenges, currentChallengeIndex, score } = get();
    const challenge = skillsChallenges[currentChallengeIndex];

    if (!challenge) return;

    let delta = 0;
    let correct = false;
    let explanation = '';

    if (challenge.type === 'multiple_choice') {
      correct = answer === challenge.correctAnswer;
      delta = correct ? 2 : -2;
      explanation = correct ? 'Well done!' : `Correct answer was: ${challenge.correctAnswer}`;
    } else if (challenge.type === 'calculation') {
      correct = answer === challenge.correctAnswer;
      delta = correct ? 2 : -2;
      explanation = correct ? 'Perfect calculation!' : `Correct answer was: ${challenge.correctAnswer}`;
    } else if (challenge.type === 'sequence') {
      correct = answer === challenge.correctAnswer;
      delta = correct ? 2 : -2;
      explanation = correct ? 'Sequence mastered!' : `Correct sequence was: ${challenge.correctAnswer}`;
    }

    const feedback = {
      correct,
      points: delta,
      explanation
    };

    set({
      score: score + delta,
      currentChallengeIndex: currentChallengeIndex + 1,
      lastFeedback: feedback
    });

    // Clear feedback after 6 seconds
    setTimeout(() => {
      const currentState = get();
      if (currentState.lastFeedback === feedback) {
        set({ lastFeedback: null });
      }
    }, 6000);

    // Check if game should end (8 or 10 challenges total based on Signal Expander)
    const challengeCount = localStorage.getItem('signal_expander_purchased') ? 10 : 8;
    if (currentChallengeIndex + 1 >= challengeCount) {
      console.log("🎉 Skills game finished! Final score:", score + delta);
      setTimeout(() => {
        get().handleSkillsGameEnd(score + delta);
      }, 100);
    }
  },

  handleSkillsGameEnd: (finalScore) => {
    console.log(`Skills game ended with score: ${finalScore}`);

    // Similar unlock logic but with different score thresholds
    const eligibleCrew = crewDatabase.filter(crew => {
      const conditions = crew.unlockConditions;
      if (!conditions) return false;

      const alreadyUnlocked = get().unlockedCrew.some(c => c.id === crew.id);
      if (alreadyUnlocked) return false;

      // Adjust score requirement for skills game (typically higher scores)
      const adjustedMinScore = conditions.minGameScore ? Math.floor(conditions.minGameScore * 0.8) : 0;
      if (finalScore < adjustedMinScore) return false;

      const currentCrewCount = get().hiredCrew.length;
      if (conditions.minCrew !== undefined && currentCrewCount < conditions.minCrew) return false;
      if (conditions.maxCrew !== undefined && currentCrewCount > conditions.maxCrew) return false;

      if (conditions.requiresItems && conditions.requiresItems.length > 0) {
        const hasAllItems = conditions.requiresItems.every(itemId => 
          get().equipment.some(eq => eq.id === itemId)
        );
        if (!hasAllItems) return false;
      }

      return true;
    });

    if (eligibleCrew.length > 0) {
      const randomIndex = Math.floor(Math.random() * eligibleCrew.length);
      const selectedCrew = eligibleCrew[randomIndex];
      console.log(`🎉 Recruited ${selectedCrew.name} through skills assessment!`);
      set({ 
        selectedCrew,
        unlockedCrew: [...get().unlockedCrew, selectedCrew],
        newlyHiredCrew: [...get().newlyHiredCrew, selectedCrew.id]
      });

      setTimeout(() => {
        get().markCrewAsNotNew(selectedCrew.id);
      }, 10000);
    } else {
      console.log("🚫 No crew members unlocked from skills assessment");
      set({ selectedCrew: null });
    }
  },

   generateFeedback: (action, profile, correct, points) => {
      const redFlags = [];
      const goodSigns = [];
      let explanation = '';

      if (profile.isReal) {
        // Real profile analysis
        if (profile.age > 0 && profile.age < 120) {
          goodSigns.push('Realistic age range');
        }
        if (profile.skills.every(skill => !skill.includes('Time Travel') && !skill.includes('Infinite') && !skill.includes('??'))) {
          goodSigns.push('Believable skill set');
        }
        if (!profile.name.includes('!!!') && !profile.name.includes('Xx_') && !profile.name.includes('_xX')) {
          goodSigns.push('Professional name format');
        }
        if (profile.background && !profile.background.includes('corrupted') && !profile.background.includes('Kingdom')) {
          goodSigns.push('Legitimate work history');
        }
        if (profile.workPermit.status !== 'missing') {
          goodSigns.push('Valid documentation');
        }

        if (action === 'recruit') {
          explanation = 'This was a legitimate candidate with verifiable credentials and realistic experience.';
        } else if (action === 'trash') {
          explanation = 'You rejected a real candidate! Look for professional names, realistic ages, and believable skills.';
        } else {
          explanation = 'Skipping real candidates means missing potential crew members.';
        }
      } else {
        // Fake profile analysis
        if (profile.age <= 0 || profile.age > 120 || profile.age === null) {
          redFlags.push('Impossible or missing age');
        }
        if (profile.skills.some(skill => skill.includes('Time Travel') || skill.includes('Infinite') || skill.includes('??') || skill.includes('404'))) {
          redFlags.push('Unrealistic or corrupted skills');
        }
        if (profile.name.includes('!!!') || profile.name.includes('Xx_') || profile.name.includes('_xX') || profile.name.includes('Admin_')) {
          redFlags.push('Suspicious name pattern');
        }
        if (profile.background.includes('corrupted') || profile.background.includes('Kingdom') || profile.background.includes('Sovereign ruler')) {
          redFlags.push('Fake or nonsensical background');
        }
        if (profile.workPermit.status === 'missing') {
          redFlags.push('Missing work documentation');
        }
        if (profile.flags) {
          redFlags.push(...profile.flags);
        }

        if (action === 'trash') {
          explanation = 'Correctly identified as fake! Watch for red flags like impossible ages, suspicious names, and unrealistic skills.';
        } else if (action === 'recruit') {
          explanation = 'You tried to recruit a fake profile! Always check for red flags before recruiting.';
        } else {
          explanation = 'Skipping is safe but gives fewer points than correctly identifying fakes.';
        }
      }

      return {
        correct,
        points,
        explanation,
        redFlags: redFlags.length > 0 ? redFlags : null,
        goodSigns: goodSigns.length > 0 ? goodSigns : null
      };
    },

    act: (action) => {
      const { profiles, currentIndex, score } = get()
      const profile = profiles[currentIndex]

      if (!profile) return

      let delta = 0
      let correct = false

      if (action === 'recruit' && profile.isReal) {
        delta = 2
        correct = true
      } else if (action === 'trash' && !profile.isReal) {
        delta = 2  
        correct = true
      } else if (action === 'skip') {
        delta = 1
        correct = true // Skipping is always "correct" but low reward
      } else {
        delta = -2
        correct = false
      }

      const feedback = get().generateFeedback(action, profile, correct, delta);

      set({
        score: score + delta,
        currentIndex: currentIndex + 1,
        lastFeedback: feedback
      })

      // Clear feedback after 8 seconds so user can read it properly
      setTimeout(() => {
        const currentState = get();
        if (currentState.lastFeedback === feedback) {
          set({ lastFeedback: null });
        }
      }, 8000)
    },

  startMission: (mission, selectedCrew) => {
        const successRate = calculateMissionSuccess(
          get().hiredCrew
            .filter(crew => selectedCrew.includes(crew.id))
            .reduce((stats, crew) => {
              Object.entries(mission.requirements).forEach(([stat]) => {
                stats[stat.toLowerCase()] = (stats[stat.toLowerCase()] || 0) + (crew.stats?.[stat.toLowerCase()] || 0);
              });
              return stats;
            }, {}),
          mission.requirements
        );

        set({
          activeMission: { ...mission, successRate },
          missionStartTime: Date.now(),
          missionPausedTime: 0,
          lastMiniGameCheck: Date.now(),
          showMiniGame: false,
          selectedCrew: selectedCrew
        });
      },

      checkForMiniGame: () => {
        const state = get();
        if (!state.activeMission || state.showMiniGame) return;

        const now = Date.now();
        const timeSinceLastCheck = now - (state.lastMiniGameCheck || state.missionStartTime);

        // Check every 5 minutes (300000ms)
        if (timeSinceLastCheck >= 300000) {
          console.log('🎲 Rolling for mini-game chance (50% probability)...');
          // 50% chance for mini-game
          const roll = Math.random();
          console.log(`🎯 Mini-game roll: ${(roll * 100).toFixed(1)}% (needed: <50.0%)`, roll < 0.5 ? '✅ TRIGGERED!' : '❌ No mini-game');

          if (roll < 0.5) {
            set({
              showMiniGame: true,
              missionPausedTime: state.missionPausedTime + (now - state.missionStartTime)
            });
          }
          set({ lastMiniGameCheck: now });
        }
      },

      completeMiniGame: (success) => {
        const state = get();
        if (!state.showMiniGame) return;

        const now = Date.now();
        let miniGameBonus = { rewardChanceBonus: 0, successPenalty: 0 };

        if (success) {
          // Success: +5% reward chance, -1 minute from timer
          miniGameBonus.rewardChanceBonus = 0.05;
          // Subtract 1 minute (60000ms) from the mission duration by subtracting from paused time
          set({
            showMiniGame: false,
            lastMiniGameCheck: now,
            missionPausedTime: state.missionPausedTime - 60000, // Subtract 1 minute from paused time (reduces total time)
            miniGameBonus
          });
        } else {
          // Failure: -10% success chance, +1 minute to timer
          miniGameBonus.successPenalty = 0.1;
          // Add 1 minute to the mission duration by adding to paused time
          set({
            showMiniGame: false,
            lastMiniGameCheck: now,
            missionPausedTime: state.missionPausedTime + 60000, // Add 1 minute to paused time (increases total time)
            miniGameBonus
          });
        }
      },

      getMissionTimeRemaining: () => {
        const state = get();
        if (!state.activeMission || !state.missionStartTime) return 0;

        const now = Date.now();
        let elapsedTime;

        if (state.showMiniGame) {
          // If mini-game is active, don't count current time, use paused time
          elapsedTime = state.missionPausedTime / 1000;
        } else {
          // Normal calculation including any previous paused time
          elapsedTime = ((now - state.missionStartTime) + state.missionPausedTime) / 1000;
        }

        return Math.max(0, state.activeMission.duration - elapsedTime);
      },
  setActiveMission: (mission) => {
    set({ activeMission: mission });
  },

  handleGameEnd: (finalScore) => {
      console.log(`Game ended with score: ${finalScore}`);
      
      // Mark recruitment game as completed for Signal Expander unlock
      localStorage.setItem('recruitment_game_completed', 'true');

      // Determine crew unlock based on score
      const eligibleCrew = crewDatabase.filter(crew => {
        const conditions = crew.unlockConditions;
        if (!conditions) return false;

        // Check if already unlocked
        const alreadyUnlocked = get().unlockedCrew.some(c => c.id === crew.id);
        if (alreadyUnlocked) return false;

        // Check score requirement
        if (conditions.minGameScore && finalScore < conditions.minGameScore) return false;

        // Check crew count requirements
        const currentCrewCount = get().hiredCrew.length;
        if (conditions.minCrew !== undefined && currentCrewCount < conditions.minCrew) return false;
        if (conditions.maxCrew !== undefined && currentCrewCount > conditions.maxCrew) return false;

        // Check item requirements
        if (conditions.requiresItems && conditions.requiresItems.length > 0) {
          const hasAllItems = conditions.requiresItems.every(itemId => 
            get().equipment.some(eq => eq.id === itemId)
          );
          if (!hasAllItems) return false;
        }

        return true;
      });

      console.log('Eligible crew for unlock:', eligibleCrew);

      if (eligibleCrew.length === 0) {
        console.log("No crew members eligible for unlock");
        set({ selectedCrew: null });
        return;
      }

      if (eligibleCrew && eligibleCrew.length > 0) {
        const randomIndex = Math.floor(Math.random() * eligibleCrew.length);
        const selectedCrew = eligibleCrew[randomIndex];
        console.log(`🎉 Recruited ${selectedCrew.name} (${selectedCrew.rarity})!`);
        set({ 
          selectedCrew,
          unlockedCrew: [...get().unlockedCrew, selectedCrew],
          newlyHiredCrew: [...get().newlyHiredCrew, selectedCrew.id]
        });

        // Remove "New!" badge after 10 seconds
        setTimeout(() => {
          get().markCrewAsNotNew(selectedCrew.id);
        }, 10000);
      } else {
        console.log("🚫 No available crew members to unlock in this tier");
        set({ selectedCrew: null });
      }
    },
  startMission: (missionId, crewMemberId) => {
    const state = get();
    const mission = state.availableMissions.find(m => m.id === missionId);
    const crewMember = state.crewMembers.find(c => c.id === crewMemberId);

    if (!mission || !crewMember || crewMember.status !== 'available') {
      return false;
    }

    const missionData = {
      id: missionId,
      crewMemberId,
      startTime: Date.now(),
      duration: mission.duration,
      reward: mission.reward,
      name: mission.name
    };

    set(state => ({
      crewMembers: state.crewMembers.map(member => 
        member.id === crewMemberId 
          ? { ...member, status: 'on_mission', currentMission: missionId }
          : member
      ),
      activeMissions: [...state.activeMissions, missionData]
    }));

    // Save to localStorage for offline processing
    const activeMissions = JSON.parse(localStorage.getItem('activeMissions') || '[]');
    activeMissions.push(missionData);
    localStorage.setItem('activeMissions', JSON.stringify(activeMissions));

    return true;
  },
  completeMission: (missionId) => {
    const state = get();
    const mission = state.activeMissions.find(m => m.id === missionId);

    if (!mission) return { success: false, reward: 0 };

    set(state => ({
      activeMissions: state.activeMissions.filter(m => m.id !== missionId),
      crewMembers: state.crewMembers.map(member => 
        member.id === mission.crewMemberId 
          ? { ...member, status: 'available', currentMission: null }
          : member
      ),
      successfulMissions: state.successfulMissions + 1
    }));

    // Update localStorage
    const activeMissions = JSON.parse(localStorage.getItem('activeMissions') || '[]');
    const updatedActiveMissions = activeMissions.filter(m => m.id !== missionId);
    localStorage.setItem('activeMissions', JSON.stringify(updatedActiveMissions));

    const completedMissions = JSON.parse(localStorage.getItem('completedMissions') || '[]');
    completedMissions.push({
      ...mission,
      completedAt: Date.now(),
      completedOffline: false
    });
    localStorage.setItem('completedMissions', JSON.stringify(completedMissions));

    return { success: true, reward: mission.reward };
  },
}),
    {
      name: 'crew-storage',
      getStorage: () => localStorage,
    }
  )
)