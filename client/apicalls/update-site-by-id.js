import axios from '../common/axios';
const updateSiteByID = async (params) => {
  const response = await axios?.patch('/sites/' + params?.id, params?.payload);
  return response?.data;
};
export default updateSiteByID;
