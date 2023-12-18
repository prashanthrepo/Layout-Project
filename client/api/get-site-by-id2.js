'use client';
import useGetHook from '../hooks/useGetHook';
const getSiteByID2 = (id) => {
  const { response, loading, error } = useGetHook('/sites/' + id);
  return { site: response, loading, error };
};
export default getSiteByID2;
