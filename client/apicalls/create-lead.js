import axios from '../common/axios';
const createLead = async (payload) => {
  const response = await axios?.post('/leads', payload);
  return response?.data;
};
export default createLead;
