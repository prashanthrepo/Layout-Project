'use client';
import axios from '../common/axios';
// const prefix = process.env.NEXT_PUBLIC_API_URL;
// const cancelTokenApi = async (id, payload) => {
//   const response = await fetch(`${prefix}` + '/token/cancel/' + id, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(payload),
//   });
//   const result = await response.json();
//   return result;
// };
const cancelTokenApi = async (id, payload) => {
  const response = await axios?.post('/token/cancel/' + id, payload);
  return response?.data;
};
export default cancelTokenApi;
