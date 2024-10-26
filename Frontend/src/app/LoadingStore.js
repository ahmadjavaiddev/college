import { create } from "zustand";

export const useLoadingStore = create((set) => ({
  isLoading: true,
  setLoading: (value) => {
    set({ isLoading: value });
  },
}));
