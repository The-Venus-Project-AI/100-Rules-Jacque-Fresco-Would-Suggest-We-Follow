import { useState, useEffect } from 'react';
import { apiService } from '../services/api';

interface UseResourcesOptions {
  page?: number;
  limit?: number;
  region?: string;
  category?: string;
  autoFetch?: boolean;
}

export const useResources = (options: UseResourcesOptions = {}) => {
  const { page = 1, limit = 10, region, category, autoFetch = true } = options;

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [pagination, setPagination] = useState<any>(null);

  const fetchResources = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getResources({ page, limit, region, category });

      if (response.success && response.data) {
        setData(response.data);
        setPagination((response as any).pagination);
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchResources();
    }
  }, [page, limit, region, category, autoFetch]);

  return {
    data,
    loading,
    error,
    pagination,
    refetch: fetchResources,
  };
};

export const useResource = (id: string | null) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchResource = async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getResource(id);

      if (response.success && response.data) {
        setData(response.data);
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchResource();
    }
  }, [id]);

  return {
    data,
    loading,
    error,
    refetch: fetchResource,
  };
};
