'use client';
import axios from '../common/axios';
const getSelf = async () => {
  const response = await axios?.get('/me', {});
  return response?.data;
};
export default getSelf;
