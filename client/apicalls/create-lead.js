import axios from '../common/axios';
const createLead = async (payload) => {
  const response = await axios?.post('/contacts/add-lead', payload);
  return response?.data;
};
export default createLead;
