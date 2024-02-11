'use client';
import axios from '../common/axios';
// const prefix = process.env.NEXT_PUBLIC_API_URL;
// const createLead = async (payload) => {
//   const response = await fetch(`${prefix}` + '/leads', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(payload),
//   });
//   const result = await response.json();
//   return result;
// };
const createLead = async (payload) => {
  const response = await axios?.post('/leads', payload);
  return response?.data;
};
export default createLead;
