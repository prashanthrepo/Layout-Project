'use client';
// const prefix = process.env.NEXT_PUBLIC_API_URL;
// const validateOTP = async (payload) => {
//   const response = await fetch(`${prefix}` + '/auth/validate-otp', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(payload),
//   });
//   const result = await response.json();
//   return result;
// };
import axios from '../common/axios';
const validateOTP = async (payload) => {
  const response = await axios?.post('/auth/validate-otp', payload);
  return response?.data;
};
export default validateOTP;
