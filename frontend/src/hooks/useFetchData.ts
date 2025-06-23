import { useEffect, useState } from 'react';

interface UseFetchDataProps<T> {
  fetchFunction: () => Promise<T[]>;
}

export const useFetchData = <T>({ fetchFunction }: UseFetchDataProps<T>) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const [trigger, setTrigger] = useState(0);
  const refetch = () => {
    setTrigger((prev) => prev + 1);
  };

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
  }, [fetchFunction, trigger]);
  return { data, loading, error, refetch };
};
