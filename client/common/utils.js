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

export { statusColors, siteTypeColor };
