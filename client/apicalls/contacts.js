import axios from '../common/axios';

const getAllContacts = async () => {
  const response = await axios?.get('/contacts');
  return response?.data;
};
const createContact = async (payload) => {
  const response = await axios?.post('/contacts', payload);
  return response?.data;
};

const editContact = async (payload) => {
  const response = await axios?.patch(
    '/contacts/' + payload?.id,
    payload?.data
  );
  return response?.data;
};

export { getAllContacts, createContact, editContact };
