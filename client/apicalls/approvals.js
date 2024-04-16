import axios from '../common/axios';

const getAllApprovals = async () => {
  const response = await axios?.get('/approvals');
  return response?.data;
};

const addNewApproval = async (approval) => {
  const response = await axios?.post('/approvals', approval);
  return response?.data;
};

const updateApproval = async (data) => {
  const response = await axios?.patch(`/approvals/${data?.id}`, data?.payload);
  return response?.data;
};

const deleteApproval = async (id) => {
  const response = await axios?.delete(`/approvals/${id}`);
  return response?.data;
};

export { getAllApprovals, addNewApproval, updateApproval, deleteApproval };
