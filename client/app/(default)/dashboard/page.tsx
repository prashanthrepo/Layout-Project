'use client';
import { useEffect, useState } from 'react';
// export const metadata = {
//   title: 'Layout - Plots',
//   description: 'Plots around bangalore',
// };
import MapView from './buyer-dashboard/map-view';
import AllLayouts from './admin-dashboard/all-layouts';
import SellerDashboard from './seller-dashboard';
import { useUser } from '@/hooks/useUserHook';
import AdminDashboard from './admin-dashboard';
import { redirect } from 'next/navigation';
import BuyerDashboard from './buyer-dashboard';

export default function Dashboard() {
  const { user } = useUser();
  if (!user) {
    // redirect('/signin');
  }
  return (
    <>
      {user?.role == 'Admin' ? (
        <AdminDashboard />
      ) : user?.role == 'Seller' ? (
        <SellerDashboard />
      ) : user?.role == 'Buyer' ? (
        <BuyerDashboard />
      ) : (
        <></>
      )}
    </>
  );
}
