'use client';
import axios from '../common/axios';
const getSelfApi = async () => {
  const response = await axios?.get('/me', {});
  return response?.data;
};
export default getSelfApi;
