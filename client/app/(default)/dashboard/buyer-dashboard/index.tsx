import React from 'react';
import MapView from './map';
import { useQuery } from 'react-query';
import getAllLayouts from '@/apicalls/get-all-layouts';

export default function BuyerDashboard() {
  const { data, isLoading, error } = useQuery('allLayouts', getAllLayouts);
  return <MapView layouts={data?.data} />;
}
