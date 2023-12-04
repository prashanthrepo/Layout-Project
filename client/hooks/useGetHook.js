import { useState, useEffect } from 'react';
const prefix = process.env.NEXT_PUBLIC_API_URL;
console.log('prefix :>> ', prefix);
const useDataFetching = (url) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${prefix}` + url, {
          next: { tags: ['layouts'] },
        });
        const result = await response.json();
        setResponse(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { response, loading, error };
};

export default useDataFetching;
