import { create } from "zustand";

interface HomeStore {
  isBottomNavigationVisible: boolean;
  setIsBottomNavigationVisible: (isVisible: boolean) => void;
}

export const useHomeStore = create<HomeStore>((set) => ({
  isBottomNavigationVisible: true,
  setIsBottomNavigationVisible: (isVisible) =>
    set({ isBottomNavigationVisible: isVisible })
}));
