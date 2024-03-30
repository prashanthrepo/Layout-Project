'use client';
import axios from '../common/axios';
const cancelTokenApi = async (id, payload) => {
  const response = await axios?.post('/token/cancel/' + id, payload);
  return response?.data;
};
export default cancelTokenApi;
