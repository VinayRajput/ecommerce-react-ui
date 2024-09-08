import { useAxios } from './axiosInstance';
import { useState, useEffect } from 'react';

export const useFetchData = (path) => {
  const [{ data, loading }] = useAxios(path);
  const [items, setItems] = useState(null);

  useEffect(() => {
    if (loading === false) {
      setItems(data.data);
    }
  }, [loading, data]);

  return { items, loading };
};