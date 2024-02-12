'use client';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useAppStore = create(
  persist(
    (set, get) => ({
      user: null,
      setUser: (val) => set({ user: val }),
    }),
    {
      name: 'ppsq-storage',
      storage: createJSONStorage(() => sessionStorage),
      skipHydration: true,
    }
  )
);
