'use client';
const prefix = process.env.NEXT_PUBLIC_API_URL;
const getLeadsBySite = async (id) => {
  const response = await fetch(`${prefix}/sites/` + id + `/leads`, {
    method: 'get',
  });
  const result = await response.json();
  return result;
};
export default getLeadsBySite;
