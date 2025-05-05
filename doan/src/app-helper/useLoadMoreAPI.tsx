import { useState, useEffect } from 'react';
import useCallAPI from './useCallAPI';
import showToastApp from '@app-components/CustomToast/ShowToastApp';
import queryString from 'query-string';

export const useLoadMoreAPI = (url: string, limit: number, extraParams: any = {}, token?: string) => {
  const [dataLoadMore, setDataLoadMore] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    setError(null);

    try {
      const params = { page, limit, ...extraParams };
      const queryStringParams = queryString.stringify(params);
      let newItems = null
      if (token) {
        const response = await useCallAPI('GET', `${url}?${queryStringParams}`, false, token)
        newItems = response?.data || response?.result?.data
      }
      else {
        const response = await useCallAPI('GET', `${url}?${queryStringParams}`)
        newItems = response?.data || response?.result?.data
      }

      if (newItems?.length < limit) {
        setHasMore(false);
      }

      setDataLoadMore((prevData) => [...prevData, ...newItems]);
      setPage((prevPage) => prevPage + 1);

    } catch (err) {
      setError('Error loading data');
      showToastApp({
        type: 'error',
        title: 'Error loading data'
      })
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { dataLoadMore, loading, hasMore, error, fetchData, page };
};
