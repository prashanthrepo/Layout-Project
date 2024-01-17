'use client';
const prefix = process.env.NEXT_PUBLIC_API_URL;
const updateSiteByID = async (id, payload) => {
  const response = await fetch(`${prefix}` + '/sites/' + id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const result = await response.json();
  return result;
};
export default updateSiteByID;
