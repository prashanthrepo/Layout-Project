import { create } from 'zustand';
import zukeeper from 'zukeeper';
import { format } from 'date-fns';
const statusColors = (status) => {
  const statusLowerCase = status?.toLowerCase();
  const replaceUnderrscore = statusLowerCase?.replace(/_/g, ' ');
  switch (replaceUnderrscore) {
    case 'available':
      return 'status_available';
    case 'sold':
      return 'status_sold';
    case 'token':
      return 'status_token';
    case 'token_cancelled':
      return 'status_token_cancelled';
    case 'blocked':
      return 'status_blocked';
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

//use data-fns to calculate days between 2024-01-27T05:49:35.149Z and today
const daysBetween = (date) => {
  const today = new Date();
  const date2 = new Date(date);
  const diffTime = Math.abs(date2 - today);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};
//use date-fns to convert 2024-01-27T05:49:35.149Z to Monday, January 27, 2024
const convertDate = (date) => {
  const date2 = new Date(date);
  const formattedDate = format(date2, 'EEEE, MMMM d, yyyy');
  return formattedDate;
};
export {
  statusColors,
  siteTypeColor,
  findDifferencesBwObjects,
  leadsBgColor,
  daysBetween,
  convertDate,
};
