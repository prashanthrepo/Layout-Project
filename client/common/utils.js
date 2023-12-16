import { create } from 'zustand';
import zukeeper from 'zukeeper';
const statusColors = (status) => {
  const statusLowerCase = status?.toLowerCase();
  const replaceUnderrscore = statusLowerCase?.replace(/_/g, ' ');
  switch (replaceUnderrscore) {
    case 'available':
      return 'bg-blue-500 text-white';
    case 'sold':
      return 'bg-red-500 text-white';
    case 'token':
      return 'bg-yellow-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
};

const siteTypeColor = (type) => {
  switch (type) {
    case 'Available':
      return '#d9f99d';
    case 'Sold':
      return '#f87171';
    case 'Token':
      return '#fde047';
    default:
      return '#fff';
  }
};

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
const findDifferencesBwObjects = (obj1, obj2) => {
  const differences = {};

  for (const key in obj1) {
    if (
      obj1.hasOwnProperty(key) &&
      obj2.hasOwnProperty(key) &&
      obj1[key] !== obj2[key]
    ) {
      differences[key] = obj2[key];
    }
  }

  for (const key in obj2) {
    if (!obj1.hasOwnProperty(key)) {
      differences[key] = obj2[key];
    }
  }

  return differences;
};
export { statusColors, siteTypeColor, useAppStore, findDifferencesBwObjects };
