import { create } from "zustand";

interface CachedDataStore {
  cachedData: Record<string, any>;
  isFetching: boolean;
  setCachedData: (key: string, data: any) => void;
  setIsFetching: (value: boolean) => void;
}

export const useCachedDataStore = create<CachedDataStore>((set) => ({
  cachedData: {},
  isFetching: true,
  setCachedData: (key, data) =>
    set((state) => ({ cachedData: { ...state.cachedData, [key]: data } })),
  setIsFetching: (value) => set({ isFetching: value })
}));
