import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface WizardState {
  step: number;
  estado: string | null;
  nivelAcademico: string | null;
  gender: 'Femenino' | 'Masculino' | 'Otro' | null;
  age: number | null;
  hasChildren: boolean | null;
  isPregnant: boolean | null;
  groups: string[];
  
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setEstado: (estado: string) => void;
  setNivelAcademico: (nivel: string) => void;
  setGender: (gender: 'Femenino' | 'Masculino' | 'Otro') => void;
  setAge: (age: number) => void;
  setHasChildren: (hasChildren: boolean) => void;
  setIsPregnant: (isPregnant: boolean) => void;
  setGroups: (groups: string[]) => void;
  reset: () => void;
}

export const useWizardStore = create<WizardState>()(
  devtools(
    (set) => ({
      step: 1,
      estado: null,
      nivelAcademico: null,
      gender: null,
      age: null,
      hasChildren: null,
      isPregnant: null,
      groups: [],
      
      setStep: (step) => set({ step }),
      nextStep: () => set((state) => ({ step: state.step + 1 })),
      prevStep: () => set((state) => ({ step: Math.max(1, state.step - 1) })),
      setEstado: (estado) => set({ estado }),
      setNivelAcademico: (nivelAcademico) => set({ nivelAcademico }),
      setGender: (gender) => set({ gender, ...(gender !== 'Femenino' ? { isPregnant: null } : {}) }),
      setAge: (age) => set({ age }),
      setHasChildren: (hasChildren) => set({ hasChildren }),
      setIsPregnant: (isPregnant) => set({ isPregnant }),
      setGroups: (groups) => set({ groups }),
      
      reset: () => set({ 
        step: 1, 
        estado: null, 
        nivelAcademico: null,
        gender: null,
        age: null,
        hasChildren: null,
        isPregnant: null,
        groups: []
      }),
    }),
    { name: 'wizard-store' }
  )
);
