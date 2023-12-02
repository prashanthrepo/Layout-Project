'use client';
import { useState } from 'react';
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

  const dashboardRender = (type) => {
    switch (type) {
      case 'Buyer':
        return <MapView />;
      case 'Seller':
        return <SellerLayouts />;
      case 'Admin':
        return <AllLayouts />;
      default:
        return <AllLayouts />;
    }
  };
  return <>{dashboardRender(user?.role)}</>;
}
