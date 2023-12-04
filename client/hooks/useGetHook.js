import { useState, useEffect } from 'react';

const useDataFetching = (url) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://13.232.88.16:3000' + url, {
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
