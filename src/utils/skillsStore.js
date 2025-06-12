
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Initialize from localStorage if available
const initializeFromLocalStorage = () => {
  try {
    const skillLevels = JSON.parse(localStorage.getItem('skillLevels') || '{}');
    const skillXp = JSON.parse(localStorage.getItem('skillXp') || '{}');
    const activeSkill = localStorage.getItem('activeSkill') || '';
    
    return {
      skillLevels: {
        scavengingFocus: skillLevels.scavengingFocus || 0,
        greaseDiscipline: skillLevels.greaseDiscipline || 0
      },
      skillXp: {
        scavengingFocus: skillXp.scavengingFocus || 0,
        greaseDiscipline: skillXp.greaseDiscipline || 0
      },
      activeSkill
    };
  } catch (error) {
    return {
      skillLevels: { scavengingFocus: 0, greaseDiscipline: 0 },
      skillXp: { scavengingFocus: 0, greaseDiscipline: 0 },
      activeSkill: ''
    };
  }
};

export const useSkillsStore = create(
  persist(
    (set, get) => ({
      ...initializeFromLocalStorage(),
      
      setSkillXp: (skillXp) => {
        set({ skillXp });
        localStorage.setItem('skillXp', JSON.stringify(skillXp));
      },
      
      setSkillLevels: (skillLevels) => {
        set({ skillLevels });
        localStorage.setItem('skillLevels', JSON.stringify(skillLevels));
      },
      
      setActiveSkill: (activeSkill) => {
        set({ activeSkill });
        localStorage.setItem('activeSkill', activeSkill);
      },
      
      // Sync with localStorage on store changes
      syncWithLocalStorage: () => {
        const state = get();
        localStorage.setItem('skillLevels', JSON.stringify(state.skillLevels));
        localStorage.setItem('skillXp', JSON.stringify(state.skillXp));
        localStorage.setItem('activeSkill', state.activeSkill);
      },
      
      // Load from localStorage 
      loadFromLocalStorage: () => {
        const data = initializeFromLocalStorage();
        set(data);
      },
      
      updateXp: (skill) => set((state) => {
        if (!skill || state.skillLevels[skill] >= 10) return state;
        
        const baseXp = 10;
        const requiredXp = Math.floor(baseXp * Math.pow(1.25, state.skillLevels[skill]));
        const newXp = (state.skillXp[skill] || 0) + 1;
        
        let newState;
        if (newXp >= requiredXp) {
          newState = {
            skillLevels: {
              ...state.skillLevels,
              [skill]: state.skillLevels[skill] + 1
            },
            skillXp: {
              ...state.skillXp,
              [skill]: 0
            }
          };
        } else {
          newState = {
            skillXp: {
              ...state.skillXp,
              [skill]: newXp
            }
          };
        }
        
        // Update localStorage as well
        if (newState.skillLevels) {
          localStorage.setItem('skillLevels', JSON.stringify(newState.skillLevels));
        }
        localStorage.setItem('skillXp', JSON.stringify(newState.skillXp));
        
        return newState;
      })
    }),
    {
      name: 'skills-storage',
      onRehydrateStorage: () => (state) => {
        // Ensure localStorage is in sync after rehydration
        if (state) {
          state.syncWithLocalStorage();
        }
      }
    }
  )
);
