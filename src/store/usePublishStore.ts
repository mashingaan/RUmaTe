import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { PublishConditionsForm, PublishDetailsForm } from '@/lib/validation';

interface PublishState {
  step: number;
  details: Partial<PublishDetailsForm>;
  images: string[];
  conditions: Partial<PublishConditionsForm>;
  setStep: (step: number) => void;
  setDetails: (details: Partial<PublishDetailsForm>) => void;
  setConditions: (conditions: Partial<PublishConditionsForm>) => void;
  setImages: (images: string[]) => void;
  reset: () => void;
}

const initialState = {
  step: 0,
  details: {},
  images: [],
  conditions: {}
};

export const usePublishStore = create<PublishState>()(
  persist(
    (set) => ({
      ...initialState,
      setStep: (step) => set({ step }),
      setDetails: (details) => set((state) => ({ details: { ...state.details, ...details } })),
      setConditions: (conditions) =>
        set((state) => ({ conditions: { ...state.conditions, ...conditions } })),
      setImages: (images) => set({ images }),
      reset: () => set(initialState)
    }),
    {
      name: 'publish-store',
      storage: {
        getItem: AsyncStorage.getItem,
        setItem: (name, value) => AsyncStorage.setItem(name, value ?? ''),
        removeItem: AsyncStorage.removeItem
      }
    }
  )
);
