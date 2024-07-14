// const prefix = process.env.NEXT_PUBLIC_API_URL;
// const getLayoutByID = async (id) => {
//   const response = await fetch(`${prefix}` + '/layouts/' + id, {
//     method: 'get',
//     next: { revalidate: 0 },
//   });
//   const result = await response.json();
//   return result;
// };
'use client';
import axios from '../common/axios';
const getLayoutByID = async (id) => {
  const response = await axios?.get('/layouts/' + id);
  return response?.data;
};
const updateLayoutByID = async (id, data) => {
  console.log('id, data :>> ', id, data);
  const response = await axios?.patch('/layouts/' + id, data);
  return response?.data;
};

export { getLayoutByID, updateLayoutByID };
