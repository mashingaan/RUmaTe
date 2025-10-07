
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { OnboardingForm } from '@/lib/validation';
import type { Preference } from '@/types/preferences';

interface OnboardingState {
  step: number;
  form: Partial<OnboardingForm>;
  preferences: Preference;
  setStep: (step: number) => void;
  updateForm: (payload: Partial<OnboardingForm>) => void;
  updatePreferences: (payload: Partial<Preference>) => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      step: 0,
      form: {},
      preferences: {},
      setStep: (step) => set({ step }),
      updateForm: (payload) => set((state) => ({ form: { ...state.form, ...payload } })),
      updatePreferences: (payload) =>
        set((state) => ({ preferences: { ...state.preferences, ...payload } })),
      reset: () => set({ step: 0, form: {}, preferences: {} })
    }),
    {
      name: 'onboarding',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);
