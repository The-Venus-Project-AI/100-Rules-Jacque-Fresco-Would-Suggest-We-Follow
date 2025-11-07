import { useState, useEffect } from 'react';
import { apiService } from '../services/api';

interface UsePrinciplesOptions {
  page?: number;
  limit?: number;
  region?: string;
  category?: string;
  status?: string;
  autoFetch?: boolean;
}

export const usePrinciples = (options: UsePrinciplesOptions = {}) => {
  const { page = 1, limit = 100, region, category, status, autoFetch = true } = options;

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchPrinciples = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getPrinciples({ page, limit, region, category, status });

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
    if (autoFetch) {
      fetchPrinciples();
    }
  }, [page, limit, region, category, status, autoFetch]);

  return {
    data,
    loading,
    error,
    refetch: fetchPrinciples,
  };
};

export const usePrinciple = (number: number | null) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchPrinciple = async () => {
    if (number === null) return;

    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getPrinciple(number);

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
    if (number !== null) {
      fetchPrinciple();
    }
  }, [number]);

  return {
    data,
    loading,
    error,
    refetch: fetchPrinciple,
  };
};

export const usePrinciplesStats = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getPrinciplesStats();

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
    fetchStats();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchStats,
  };
};
