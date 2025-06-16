import { useEffect, useState } from 'react';

interface UseFetchDataWithParamProps<T, P> {
  fetchFunction: (param: P) => Promise<T | T[]>;
  param?: P;
}

export const useFetchDataWithParam = <T, P>({
  fetchFunction,
  param,
}: UseFetchDataWithParamProps<T, P>) => {
  const [data, setData] = useState<T | T[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    if (param === undefined || param === null) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await fetchFunction(param);
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchFunction, param]);

  return { data, loading, error };
};
