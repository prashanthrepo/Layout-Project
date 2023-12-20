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
    case 'blocked':
      return 'bg-gray-500 text-white';
    case 'hot':
      return 'bg-emerald-400 text-white';
    case 'cold':
      return 'bg-blue-400 text-white';
    case 'dead':
      return 'bg-gray-400 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
};

const leadsBgColor = (status) => {
  const statusLowerCase = status?.toLowerCase();
  const replaceUnderrscore = statusLowerCase?.replace(/_/g, ' ');
  switch (replaceUnderrscore) {
    case 'hot':
      return 'bg-emerald-50  border-emerald-100 ';
    case 'cold':
      return 'bg-blue-50 border-blue-100';
    case 'dead':
      return 'bg-slate-50 border-slate-100';
    default:
      return 'bg-gray-100 border-gray-200';
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
    case 'Blocked':
      return '#718096';
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
export {
  statusColors,
  siteTypeColor,
  useAppStore,
  findDifferencesBwObjects,
  leadsBgColor,
};
