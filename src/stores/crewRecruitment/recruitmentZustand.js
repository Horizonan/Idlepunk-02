import {create} from 'zustand'
import {generateRandomProfile} from './profiles'

export const useRecruitmentZustand = create((set, get) => ({
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
      delta = profile.isReal ? 2 : -2
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
    })
  },
}))