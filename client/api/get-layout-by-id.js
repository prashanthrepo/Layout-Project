'use client';
const prefix = process.env.NEXT_PUBLIC_API_URL;
const getLayoutByID = async (id) => {
  const response = await fetch(`${prefix}` + '/layouts/' + id, {
    method: 'get',
  });
  const result = await response.json();
  return result;
};
export default getLayoutByID;
