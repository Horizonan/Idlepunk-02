
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useSkillsStore = create(
  persist(
    (set) => ({
      skillXp: {
        scavengingFocus: 0,
        greaseDiscipline: 0
      },
      skillLevels: {
        scavengingFocus: 0,
        greaseDiscipline: 0
      },
      activeSkill: '',
      setSkillXp: (skillXp) => set({ skillXp }),
      setSkillLevels: (skillLevels) => set({ skillLevels }),
      setActiveSkill: (activeSkill) => set({ activeSkill }),
      updateXp: (skill) => set((state) => {
        if (!skill || state.skillLevels[skill] >= 10) return state;
        
        const baseXp = 10;
        const requiredXp = Math.floor(baseXp * Math.pow(1.25, state.skillLevels[skill]));
        const newXp = (state.skillXp[skill] || 0) + 1;
        
        if (newXp >= requiredXp) {
          return {
            skillLevels: {
              ...state.skillLevels,
              [skill]: state.skillLevels[skill] + 1
            },
            skillXp: {
              ...state.skillXp,
              [skill]: 0
            }
          };
        }
        
        return {
          skillXp: {
            ...state.skillXp,
            [skill]: newXp
          }
        };
      })
    }),
    {
      name: 'skills-storage'
    }
  )
);
