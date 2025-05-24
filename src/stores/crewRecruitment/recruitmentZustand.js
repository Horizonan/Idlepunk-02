import {create} from 'zustand'
import {persist} from 'zustand/middleware'
import {generateRandomProfile} from './profiles'
import {crewDatabase} from './crewMembers'
import {calculateMissionSuccess} from './missions'

export const useRecruitmentZustand = create(
  persist(
    (set, get) => ({
      unlockedCrew: [],
      hiredCrew: [],
      activeMission: null,
      missionStartTime: null,
      lastStaminaUpdate: Date.now(),

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

    if (action === 'recruit'){
     
      //Check Permit
      const now = new Date()
      const permit = new Date(profile.workPermit)
      const isPermitExpired = permit < now

      if (currentIndex == 7) {
        console.log("🎉 Game finished! Final score:", score + delta)

        get().handleGameEnd(score + delta)
      }
      
      if(!isPermitExpired){
        delta = profile.isReal ? 2 : -2
      } else {
        delta -= 2
      }
    } else if (action === 'trash') {
      delta = profile.isReal ? -1 : 1
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

  startMission: (mission, selectedCrew, successRate) => {
    set({
      activeMission: { ...mission, successRate },
      missionStartTime: Date.now(),
      selectedCrew: selectedCrew
    });
  },

  setActiveMission: (mission) => {
    set({ activeMission: mission });
  },

  handleGameEnd: (finalScore) => {
    const unlockedCrew = get().unlockedCrew;
    let eligibleCrew;
    
    if (finalScore >= 80) {
      eligibleCrew = crewDatabase.filter(crew => crew.rarity === 'legendary' && !unlockedCrew.some(u => u.id === crew.id));
      console.log("🚀 Legendary tier reached!");
    } else if (finalScore >= 60) {
      eligibleCrew = crewDatabase.filter(crew => crew.rarity === 'epic' && !unlockedCrew.some(u => u.id === crew.id));
      console.log("⭐ Epic tier reached!");
    } else if (finalScore >= 40) {
      eligibleCrew = crewDatabase.filter(crew => crew.rarity === 'rare' && !unlockedCrew.some(u => u.id === crew.id));
      console.log("💫 Rare tier reached!");
    } else if (finalScore >= 20) {
      eligibleCrew = crewDatabase.filter(crew => crew.rarity === 'uncommon' && !unlockedCrew.some(u => u.id === crew.id));
      console.log("✨ Uncommon tier reached!");
    } else if (finalScore >= 1) {
      eligibleCrew = crewDatabase.filter(crew => crew.rarity === 'common' && !unlockedCrew.some(u => u.id === crew.id));
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
    }
  },
}),
    {
      name: 'crew-storage',
      getStorage: () => localStorage,
    }
  )
)