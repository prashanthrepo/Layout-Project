const prefix = process.env.NEXT_PUBLIC_API_URL;
const getAllLayouts = async () => {
  const response = await fetch(`${prefix}/layouts`, {
    method: 'get',
  });
  const result = await response.json();
  return result;
};
export default getAllLayouts;
