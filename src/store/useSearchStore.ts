
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type FilterState = {
  budgetRange: [number, number];
  commute: number | null;
  furnished: boolean | null;
  pets: boolean | null;
  smoking: boolean | null;
};

interface SearchState {
  query: string;
  filters: FilterState;
  setQuery: (query: string) => void;
  updateFilters: (filters: Partial<FilterState>) => void;
  resetFilters: () => void;
}

const defaultFilters: FilterState = {
  budgetRange: [15000, 45000],
  commute: null,
  furnished: null,
  pets: null,
  smoking: null
};

export const useSearchStore = create<SearchState>()(
  persist(
    (set) => ({
      query: '',
      filters: defaultFilters,
      setQuery: (query) => set({ query }),
      updateFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters } })),
      resetFilters: () => set({ filters: defaultFilters })
    }),
    {
      name: 'search-store',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);
