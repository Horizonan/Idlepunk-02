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
      selectedCrew: [],
      lastFeedback: null,
      unlockedCrew: [...crewDatabase.filter(crew => 
        crew.unlockConditions?.minGameScore === 0 || 
        !crew.unlockConditions?.minGameScore
      )],
      hiredCrew: [],
      newlyHiredCrew: [],
      equipment: [],
      crewLoadouts: {},
      activeMission: null,
      missionStartTime: null,
      lastStaminaUpdate: Date.now(),
      successfulMissions: 0,

      addEquipment: (itemId) => {
        const equipment = getEquipmentById(itemId);
        if (equipment) {
          const state = get();

          const hasInInventory = state.equipment.some(item => item.id === itemId);
          const hasEquipped = Object.values(state.crewLoadouts).some(loadout => 
            Object.values(loadout).some(equippedItem => equippedItem && equippedItem.id === itemId)
          );

          if (hasInInventory || hasEquipped) {
            const sellValue = equipment.autoSellValue || 5;

            const currentCredits = Number(localStorage.getItem('credits') || 0);
            const newCredits = currentCredits + sellValue;
            localStorage.setItem('credits', newCredits);

            window.dispatchEvent(new CustomEvent('creditsUpdated', { 
              detail: { credits: newCredits, message: `Duplicate ${equipment.name} sold for ${sellValue} Credits!` }
            }));

            return false;
          } else {
            set(state => ({
              equipment: [...state.equipment, equipment]
            }));
            return true;
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

      skillsChallenges: [],
      currentChallengeIndex: 0,
      gameVariant: 'profile',

      startGame: () => {
        const profileCount = localStorage.getItem('signal_expander_purchased') ? 10 : 8;
        const generated = Array.from({length: profileCount}, generateRandomProfile);
        set({profiles: generated, currentIndex: 0, score: 0, timeLeft: 60, isRunning: true, lastFeedback: null, gameVariant: 'profile'});
      },

      startSkillsGame: () => {
        const challengeCount = localStorage.getItem('signal_expander_purchased') ? 10 : 8;
        const challenges = generateSkillsChallenges(challengeCount);
        set({skillsChallenges: challenges, currentChallengeIndex: 0, score: 0, timeLeft: 90, isRunning: true, lastFeedback: null, gameVariant: 'skills'});
      },

      act: (action) => {
        const {profiles, currentIndex, score} = get()
        const profile = profiles[currentIndex]

        let delta = 0
        let correct = false

        if (action === 'recruit') {
          if (profile.workPermit.status === 'missing') {
            delta = -2;
            correct = false;
          } else {
            const isPermitExpired = profile.workPermit.status === 'expired';

            if (!isPermitExpired) {
              delta = profile.isReal ? 2 : -2;
              correct = profile.isReal;
            } else {
              delta = -2;
              correct = false;
            }
          }
        } else if (action === 'trash') {
          if (profile.workPermit.status === 'missing') {
            delta = profile.isReal ? -1 : 1;
            correct = !profile.isReal;
          } else {
            delta = profile.isReal ? -1 : 1;
            correct = !profile.isReal;
          }
        } else if (action === 'skip') {
          delta = 0;
          correct = true;
        }

        // Generate feedback using existing function
        const feedback = get().generateFeedback(action, profile, correct, delta);

        const profileCount = localStorage.getItem('signal_expander_purchased') ? 10 : 8;
        if (currentIndex >= profileCount - 1) {
          setTimeout(() => {
            get().handleGameEnd(score + delta);
          }, 100);
        }

        set({
          score: score + delta, 
          currentIndex: currentIndex + 1,
          lastFeedback: feedback
        });

        // Clear feedback after 4 seconds
        setTimeout(() => {
          const currentState = get();
          if (currentState.lastFeedback === feedback) {
            set({ lastFeedback: null });
          }
        }, 4000);
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
          selectedCrew: [],
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

        setTimeout(() => {
          const currentState = get();
          if (currentState.lastFeedback === feedback) {
            set({ lastFeedback: null });
          }
        }, 6000);

        const challengeCount = localStorage.getItem('signal_expander_purchased') ? 10 : 8;
        if (currentChallengeIndex + 1 >= challengeCount) {
          setTimeout(() => {
            get().handleSkillsGameEnd(score + delta);
          }, 100);
        }
      },

      handleSkillsGameEnd: (finalScore) => {
        const eligibleCrew = crewDatabase.filter(crew => {
          const conditions = crew.unlockConditions;
          if (!conditions) return false;

          const alreadyUnlocked = get().unlockedCrew.some(c => c.id === crew.id);
          const alreadyHired = get().hiredCrew.some(c => c.id === crew.id);
          if (alreadyUnlocked || alreadyHired) return false;

          const adjustedMinScore = conditions.minGameScore ? Math.floor(conditions.minGameScore * 0.8) : 0;
          if (conditions.minGameScore !== undefined && finalScore < adjustedMinScore) {
            return false;
          }

          const currentCrewCount = get().hiredCrew.length;
          if (conditions.minCrew !== undefined && currentCrewCount < conditions.minCrew) {
            return false;
          }
          if (conditions.maxCrew !== undefined && currentCrewCount > conditions.maxCrew) {
            return false;
          }

          if (conditions.requiresItems && conditions.requiresItems.length > 0) {
            const hasAllItems = conditions.requiresItems.every(itemId => 
              get().equipment.some(eq => eq.id === itemId)
            );
            if (!hasAllItems) {
              return false;
            }
          }

          return true;
        });

        if (eligibleCrew.length > 0) {
          const randomIndex = Math.floor(Math.random() * eligibleCrew.length);
          const selectedCrew = eligibleCrew[randomIndex];
          set({ 
            selectedCrew,
            unlockedCrew: [...get().unlockedCrew, selectedCrew],
            newlyHiredCrew: [...get().newlyHiredCrew, selectedCrew.id]
          });

          setTimeout(() => {
            get().markCrewAsNotNew(selectedCrew.id);
          }, 10000);
        } else {
          set({ selectedCrew: [] });
        }
      },

      generateFeedback: (action, profile, correct, points) => {
        const redFlags = [];
        const goodSigns = [];
        let explanation = '';

        if (profile.isReal) {
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

      checkForMiniGame: () => {
        const state = get();
        if (!state.activeMission || state.showMiniGame) return;

        const now = Date.now();
        const timeSinceLastCheck = now - (state.lastMiniGameCheck || state.missionStartTime);

        if (timeSinceLastCheck >= 300000) {
          const roll = Math.random();

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
          miniGameBonus.rewardChanceBonus = 0.05;
          set({
            showMiniGame: false,
            lastMiniGameCheck: now,
            missionPausedTime: state.missionPausedTime - 60000,
            miniGameBonus
          });
        } else {
          miniGameBonus.successPenalty = 0.1;
          set({
            showMiniGame: false,
            lastMiniGameCheck: now,
            missionPausedTime: state.missionPausedTime + 60000,
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
          elapsedTime = state.missionPausedTime / 1000;
        } else {
          elapsedTime = ((now - state.missionStartTime) + state.missionPausedTime) / 1000;
        }

        return Math.max(0, state.activeMission.duration - elapsedTime);
      },

      setActiveMission: (mission) => {
        set({ activeMission: mission });
      },

      setSelectedCrew: (crew) => {
        set({ selectedCrew: crew });
      },

      handleGameEnd: (finalScore) => {
        localStorage.setItem('recruitment_game_completed', 'true');

        const eligibleCrew = crewDatabase.filter(crew => {
          const conditions = crew.unlockConditions;
          if (!conditions) return false;

          const alreadyUnlocked = get().unlockedCrew.some(c => c.id === crew.id);
          const alreadyHired = get().hiredCrew.some(c => c.id === crew.id);
          if (alreadyUnlocked || alreadyHired) return false;

          if (conditions.minGameScore && finalScore < conditions.minGameScore) return false;

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

        if (eligibleCrew.length === 0) {
          set({ selectedCrew: [] });
          return;
        }

        if (eligibleCrew && eligibleCrew.length > 0) {
          const randomIndex = Math.floor(Math.random() * eligibleCrew.length);
          const selectedCrew = eligibleCrew[randomIndex];
          set({ 
            selectedCrew,
            unlockedCrew: [...get().unlockedCrew, selectedCrew],
            newlyHiredCrew: [...get().newlyHiredCrew, selectedCrew.id]
          });

          setTimeout(() => {
            get().markCrewAsNotNew(selectedCrew.id);
          }, 10000);
        } else {
          set({ selectedCrew: [] });
        }
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

      rotateMission: (completedMissionId) => {
        const prestigeCount = parseInt(localStorage.getItem('prestigeCount') || '0');
        
        // Only rotate missions after second prestige
        if (prestigeCount < 2) return null;

        const { missions, missionCategories } = require('./missions');
        const completedMission = missions[completedMissionId];
        
        if (!completedMission || !completedMission.category) return null;

        const categoryMissions = missionCategories[completedMission.category];
        if (!categoryMissions || categoryMissions.length <= 1) return null;

        // Get available missions from the same category (excluding the completed one)
        const availableMissions = categoryMissions.filter(missionKey => missionKey !== completedMissionId);
        
        if (availableMissions.length === 0) return null;

        // Select a random mission from the same category
        const randomIndex = Math.floor(Math.random() * availableMissions.length);
        const selectedMissionKey = availableMissions[randomIndex];
        
        // Track the rotated mission in localStorage
        const rotatedMissions = JSON.parse(localStorage.getItem('rotatedMissions') || '[]');
        if (!rotatedMissions.includes(selectedMissionKey)) {
          rotatedMissions.push(selectedMissionKey);
          localStorage.setItem('rotatedMissions', JSON.stringify(rotatedMissions));
        }
        
        return missions[selectedMissionKey];
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

      clearAllCrewData: () => {
        set({
          selectedCrew: [],
          lastFeedback: null,
          unlockedCrew: [...crewDatabase.filter(crew => 
            crew.unlockConditions?.minGameScore === 0 || 
            !crew.unlockConditions?.minGameScore
          )],
          hiredCrew: [],
          newlyHiredCrew: [],
          equipment: [],
          crewLoadouts: {},
          activeMission: null,
          missionStartTime: null,
          lastStaminaUpdate: Date.now(),
          successfulMissions: 0,
          profiles: [],
          currentIndex: 0,
          score: 0,
          timeLeft: 60,
          isRunning: false,
          skillsChallenges: [],
          currentChallengeIndex: 0,
          gameVariant: 'profile'
        });
      },
    }),
    {
      name: 'crew-storage',
      getStorage: () => localStorage,
    }
  )
)