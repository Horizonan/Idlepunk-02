
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useHeistStore = create(
  persist(
    (set, get) => ({
      reputation: 0,
      crewMembers: [
        { id: 1, name: 'Shadow', stealth: 75, combat: 45, skill: 60, cost: 50000, available: true, reqRep: 0 },
        { id: 2, name: 'Bruiser', stealth: 30, combat: 85, skill: 55, cost: 75000, available: true, reqRep: 25 },
        { id: 3, name: 'Tech', stealth: 65, combat: 35, skill: 80, cost: 100000, available: true, reqRep: 50 },
      ],
      activeHeist: null,
      assignedCrew: [],
      heistProgress: 0,
      heistCooldown: 0,
      
      setActiveHeist: (heist) => set({ activeHeist: heist }),
      assignCrewMember: (crewId) => set((state) => {
        const crew = state.crewMembers.find(c => c.id === crewId);
        if (!crew || !crew.available) return state;
        
        return {
          assignedCrew: [...state.assignedCrew, crew],
          crewMembers: state.crewMembers.map(c => 
            c.id === crewId ? {...c, available: false} : c
          )
        };
      }),
      removeCrewMember: (crewId) => set((state) => ({
        assignedCrew: state.assignedCrew.filter(c => c.id !== crewId),
        crewMembers: state.crewMembers.map(c => 
          c.id === crewId ? {...c, available: true} : c
        )
      })),
      startHeist: () => set((state) => ({
        heistProgress: 0,
        heistCooldown: 300, // 5 minutes cooldown
      })),
      updateHeistProgress: () => set((state) => {
        if (state.heistProgress >= 100) {
          return { 
            heistProgress: 0,
            assignedCrew: [],
            crewMembers: state.crewMembers.map(c => ({...c, available: true}))
          };
        }
        return { heistProgress: state.heistProgress + 1 };
      }),
      updateCooldown: () => set((state) => ({
        heistCooldown: Math.max(0, state.heistCooldown - 1)
      })),
      addReputation: (amount) => set((state) => ({
        reputation: state.reputation + amount
      })),
      getReputation: () => get().reputation
    }),
    {
      name: 'heist-storage'
    }
  )
);
