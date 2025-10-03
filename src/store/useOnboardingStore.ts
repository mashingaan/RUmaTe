
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { OnboardingForm } from '@/lib/validation';

interface OnboardingState {
  step: number;
  form: Partial<OnboardingForm>;
  setStep: (step: number) => void;
  updateForm: (payload: Partial<OnboardingForm>) => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      step: 0,
      form: {},
      setStep: (step) => set({ step }),
      updateForm: (payload) => set((state) => ({ form: { ...state.form, ...payload } })),
      reset: () => set({ step: 0, form: {} })
    }),
    {
      name: 'onboarding',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);
