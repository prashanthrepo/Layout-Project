import axios from '../common/axios';

const getAllLayouts = async () => {
  const response = await axios?.get('/layouts');
  return response?.data;
};
export default getAllLayouts;
