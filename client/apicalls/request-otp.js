'use client';
import axios from '../common/axios';
const requestOTPApi = async (payload) => {
  const response = await axios?.post('/auth/request-otp', payload);
  return response?.data;
};
export default requestOTPApi;
