'use client';
// const prefix = process.env.NEXT_PUBLIC_API_URL;
// const requestOTP = async (payload) => {
//   const response = await fetch(`${prefix}` + '/auth/request-otp', {
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
const requestOTP = async (payload) => {
  const response = await axios?.post('/auth/request-otp', payload);
  return response?.data;
};
export default requestOTP;
