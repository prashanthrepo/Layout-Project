'use client';
const prefix = process.env.NEXT_PUBLIC_API_URL;
const getSiteByID = async (id) => {
  const response = await fetch(`${prefix}` + '/sites/' + id, {
    method: 'get',
  });
  const result = await response.json();
  return result;
};
export default getSiteByID;
