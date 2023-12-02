import { create } from 'zustand';
import zukeeper from 'zukeeper';
const useAppStore = create(
  zukeeper((set, get) => ({
    user: null,
    setUser: (user) => {
      set({ user });
    },
  }))
);
if (typeof window !== 'undefined') {
  window.store = useAppStore;
}
export default useAppStore;
