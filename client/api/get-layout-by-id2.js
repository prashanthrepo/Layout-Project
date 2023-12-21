'use client';
import useGetHook from '../hooks/useGetHook';
const getLayoutByID2 = (id) => {
  const { response, loading, error } = useGetHook('/layouts/' + id);
  return { layout: response, loading, error };
};
export default getLayoutByID2;
