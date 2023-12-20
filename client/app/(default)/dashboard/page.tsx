'use client';
import { useEffect, useState } from 'react';
// export const metadata = {
//   title: 'Layout - Plots',
//   description: 'Plots around bangalore',
// };
import AddNewLayout from './AddNewLayout';
import { useAppStore } from '../../../common/utils';
import MapView from './buyer-dashboard/map-view';
import SellerLayouts from './seller-dashboard/seller-layouts';
import AllLayouts from './admin-dashboard/all-layouts';

export default function Dashboard() {
  const { user } = useAppStore((state) => state);
  const [userDetails, setDetailsUser] = useState(null);
  useEffect(() => {
    const user = localStorage.getItem('user');
    setDetailsUser(JSON.parse(user));
  }, []);

  const dashboardRender = (type) => {
    switch (type) {
      case 'buyer':
        return <MapView />;
      case 'seller':
        return <SellerLayouts />;
      case 'admin':
        return <AllLayouts />;
      default:
        return <MapView />;
    }
  };
  return <>{dashboardRender(userDetails?.role)}</>;
}
