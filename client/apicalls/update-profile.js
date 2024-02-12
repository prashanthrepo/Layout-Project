import axios from '../common/axios';
const updateProfile = async (payload) => {
  const response = await axios?.patch('/auth/update-profile', payload);
  return response?.data;
};
export default updateProfile;
