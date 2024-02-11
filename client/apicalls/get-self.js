'use client';
// import usePostHook from '../hooks/usePostHook';
// const getSelf = (payload) => {
//   const { response, loading, error } = usePostHook('/me', payload);
//   return { response, loading, error };
// };
import axios from '../common/axios';
const getSelf = async (payload) => {
  const response = await axios?.post('/me', payload);
  return response?.data;
};
export default getSelf;
