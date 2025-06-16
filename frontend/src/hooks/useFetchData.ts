import { useEffect, useState } from 'react';

interface UseFetchDataProps<T> {
  fetchFunction: () => Promise<T[]>;
}

export const useFetchData = <T>({ fetchFunction }: UseFetchDataProps<T>) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchFunction();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchFunction]);
  return { data, loading, error };
};
