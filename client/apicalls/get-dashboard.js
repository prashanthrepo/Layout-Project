'use client';
import axios from '../common/axios';
const getDashboardApi = async () => {
  const response = await axios?.get('/dashboard', {});
  return response?.data?.data;
};
export default getDashboardApi;
