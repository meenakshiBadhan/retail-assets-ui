import { create } from "zustand";

const useStore = create((set) => ({
  // State
  count: 0,
  user: null,
  isLoading: false,

  // Actions
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
}));

export default useStore;
