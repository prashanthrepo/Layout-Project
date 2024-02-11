'use client';
// const prefix = process.env.NEXT_PUBLIC_API_URL;
// const getTranscationsBySite = async (id) => {
//   const response = await fetch(`${prefix}/sites/` + id + `/transactions`, {
//     method: 'get',
//   });
//   const result = await response.json();
//   return result;
// };
import axios from '../common/axios';
const getTranscationsBySite = async (id) => {
  const response = await axios?.get('/sites/' + id + '/transactions');
  return response?.data;
};
export default getTranscationsBySite;
