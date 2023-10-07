import { useState, useEffect, useRef } from 'react';
import GetData from '../data/GetData';

export const useFetch = (fetchUrl: string) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();

      try {
        const result = await GetData(fetchUrl, {
          signal: abortControllerRef.current?.signal,
        });
        setData(result);
      } catch (error: any) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (fetchUrl) {
      fetchData();
    }

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [fetchUrl]);

  return { data, isLoading, error };
};