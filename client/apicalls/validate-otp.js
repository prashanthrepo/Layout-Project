'use client';
import axios from '../common/axios';
const validateOTPApi = async (payload) => {
  const response = await axios?.post('/auth/validate-otp', payload);
  return response?.data;
};
export default validateOTPApi;
