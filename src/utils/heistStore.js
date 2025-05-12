
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useHeistStore = create(
  persist(
    (set, get) => ({
      reputation: 0,
      uiState: {
        showHiringDialog: false,
        showConfirmationDialog: false
      },
      crewMembers: [
        { id: 1, name: 'ByteMe', stealth: 35, combat: 25, skill: 30, available: true, reqRep: 0 },
        { id: 2, name: 'Nullz R Us', stealth: 20, combat: 40, skill: 25, available: true, reqRep: 0 },
        { id: 3, name: 'LagSwitch', stealth: 30, combat: 30, skill: 35, available: true, reqRep: 0 },
        { id: 4, name: '404Dude', stealth: 25, combat: 35, skill: 30, available: true, reqRep: 0 },
        { id: 5, name: 'Shadow', stealth: 75, combat: 45, skill: 60, available: true, reqRep: 50 },
        { id: 6, name: 'Bruiser', stealth: 30, combat: 85, skill: 55, available: true, reqRep: 75 },
        { id: 7, name: 'Tech', stealth: 65, combat: 35, skill: 80, available: true, reqRep: 100 },
      ],
      availableRecruits: [],
      activeHeist: null,
      assignedCrew: [],
      setUiState: (newState) => set(state => ({
        uiState: { ...state.uiState, ...newState }
      })),
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
            crewMembers: state.crewMembers.map(c => ({...c, available: true})),
            reputation: state.reputation + 5 // Add 5 reputation per successful heist
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
      getReputation: () => get().reputation,
      hireCrewMember: (newCrew) => set((state) => ({
        crewMembers: [...state.crewMembers, { ...newCrew, available: true }]
      }))
    }),
    {
      name: 'heist-storage'
    }
  )
);
