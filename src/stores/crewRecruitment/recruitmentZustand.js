import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { crewDatabase } from './crewMembers';
import { getEquipmentById } from './equipment';
import {generateRandomProfile} from './profiles'
import {calculateMissionSuccess} from './missions'

export const useRecruitmentZustand = create(
  persist(
    (set, get) => ({
      selectedCrew: null,
      unlockedCrew: [],
      hiredCrew: [],
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
        const state = get();
        const equipment = state.equipment.find(item => item.id === itemId);
        const crew = state.hiredCrew.find(c => c.id === crewId);
        
        if (!equipment || !crew || equipment.type !== slotType) {
          console.log('Equipment operation failed:', { equipment: !!equipment, crew: !!crew, typeMatch: equipment?.type === slotType });
          return;
        }

        // Check if slot is already occupied
        const currentLoadout = state.crewLoadouts[crewId] || {};
        if (currentLoadout[slotType]) {
          console.log('Slot already occupied, cannot equip');
          return;
        }

        // Find the specific equipment instance to remove (handle duplicates)
        const equipmentIndex = state.equipment.findIndex(item => item.id === itemId);
        if (equipmentIndex === -1) return;

        const newEquipment = [...state.equipment];
        const [removedItem] = newEquipment.splice(equipmentIndex, 1);

        set(state => ({
          crewLoadouts: {
            ...state.crewLoadouts,
            [crewId]: {
              ...currentLoadout,
              [slotType]: removedItem
            }
          },
          equipment: newEquipment
        }));

        console.log(`Equipped ${equipment.name} to ${crew.name}'s ${slotType} slot`);
      },

      unequipItemFromCrew: (crewId, slotType) => {
        const state = get();
        const loadout = state.crewLoadouts[crewId];
        const crew = state.hiredCrew.find(c => c.id === crewId);
        
        if (!loadout || !loadout[slotType] || !crew) {
          console.log('Unequip failed: no item equipped or crew not found');
          return;
        }

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

        console.log(`Unequipped ${unequippedItem.name} from ${crew.name}'s ${slotType} slot`);
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

  startGame: () => {
    console.log('Starting recruitment game');
    const generated = Array.from({length: 8}, generateRandomProfile);
    console.log('Generated profiles:', generated);
    set({profiles: generated, currentIndex: 0, score: 0, timeLeft: 60, isRunning: true});
    console.log('Game state initialized');
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

    if (currentIndex == 7) {
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
      selectedCrew: null
    })
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
    const unlockedCrew = get().unlockedCrew;
    const hiredCrew = get().hiredCrew;
    let eligibleCrew;

    // Helper function to check if crew is already unlocked or hired
    const isCrewAvailable = (crew) => {
      return !unlockedCrew.some(u => u.id === crew.id) && 
             !hiredCrew.some(h => h.id === crew.id);
    };

    if (finalScore >= 80) {
      eligibleCrew = crewDatabase.filter(crew => crew.rarity === 'legendary' && isCrewAvailable(crew));
      console.log("🚀 Legendary tier reached!");
    } else if (finalScore >= 60) {
      eligibleCrew = crewDatabase.filter(crew => crew.rarity === 'epic' && isCrewAvailable(crew));
      console.log("⭐ Epic tier reached!");
    } else if (finalScore >= 40) {
      eligibleCrew = crewDatabase.filter(crew => crew.rarity === 'rare' && isCrewAvailable(crew));
      console.log("💫 Rare tier reached!");
    } else if (finalScore >= 20) {
      eligibleCrew = crewDatabase.filter(crew => crew.rarity === 'uncommon' && isCrewAvailable(crew));
      console.log("✨ Uncommon tier reached!");
    } else if (finalScore >= 1) {
      eligibleCrew = crewDatabase.filter(crew => crew.rarity === 'common' && isCrewAvailable(crew));
      console.log("👥 Common tier reached!");
    } else {
      console.log("❌ No reward: insufficient score");
      return;
    }

    if (eligibleCrew && eligibleCrew.length > 0) {
      const randomIndex = Math.floor(Math.random() * eligibleCrew.length);
      const selectedCrew = eligibleCrew[randomIndex];
      console.log(`🎉 Recruited ${selectedCrew.name} (${selectedCrew.rarity})!`);
      set({ 
        selectedCrew,
        unlockedCrew: [...unlockedCrew, selectedCrew]
      });
    } else {
      console.log("🚫 No available crew members to unlock in this tier");
      set({ selectedCrew: null });
    }
  },
}),
    {
      name: 'crew-storage',
      getStorage: () => localStorage,
    }
    
  )
  
)

