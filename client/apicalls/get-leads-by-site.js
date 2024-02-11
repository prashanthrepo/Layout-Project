'use client';
// const prefix = process.env.NEXT_PUBLIC_API_URL;
// const getLeadsBySite = async (id) => {
//   const response = await fetch(`${prefix}/sites/` + id + `/leads`, {
//     method: 'get',
//   });
//   const result = await response.json();
//   return result;
// };
import axios from '../common/axios';
const getLeadsBySite = async (id) => {
  const response = await axios?.get('/sites/' + id + '/leads');
  return response?.data;
};
export default getLeadsBySite;
