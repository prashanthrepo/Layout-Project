'use client';
import { useEffect, useState } from 'react';
// export const metadata = {
//   title: 'Layout - Plots',
//   description: 'Plots around bangalore',
// };
import AddNewLayout from './AddNewLayout';
import { useAppStore } from '../../../common/utils';
import MapView from './buyer-dashboard/map-view';
import SellerLayouts from '../all/page';
import AllLayouts from './admin-dashboard/all-layouts';
import SellerDashboard from './seller-dashboard';

export default function Dashboard() {
  const { user } = useAppStore((state) => state);


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
