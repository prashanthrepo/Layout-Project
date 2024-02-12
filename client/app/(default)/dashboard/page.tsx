'use client';
import { useEffect, useState } from 'react';
// export const metadata = {
//   title: 'Layout - Plots',
//   description: 'Plots around bangalore',
// };
import MapView from './buyer-dashboard/map-view';
import AllLayouts from './admin-dashboard/all-layouts';
import SellerDashboard from './seller-dashboard';
import { useAppStore } from '@/common/appstore';
export default function Dashboard() {
  // const { user } = useAppStore((state) => state);
  const { user } = useAppStore((state) => state);
  console.log('user :>> ', user);
  const dashboardRender = (type) => {
    switch (type) {
      case 'Buyer':
        return <MapView />;
      case 'Seller':
        // return <SellerLayouts />;
        return <SellerDashboard />;
      case 'Admin':
        return <AllLayouts />;
      default:
        return <></>;
    }
  };
  return <>{dashboardRender(user?.role)}</>;
}
