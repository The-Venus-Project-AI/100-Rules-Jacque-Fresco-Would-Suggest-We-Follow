import { useState, useEffect, useCallback } from 'react';

interface UseApiOptions<T> {
  autoFetch?: boolean;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

export const useApi = <T = any>(
  apiFunction: (...args: any[]) => Promise<any>,
  options: UseApiOptions<T> = {}
) => {
  const { autoFetch = false, onSuccess, onError } = options;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(
    async (...args: any[]) => {
      try {
        setLoading(true);
        setError(null);

        const response = await apiFunction(...args);

        if (response.success && response.data) {
          setData(response.data);
          onSuccess?.(response.data);
        } else {
          throw new Error(response.error || 'API call failed');
        }

        return response;
      } catch (err) {
        const error = err as Error;
        setError(error);
        onError?.(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [apiFunction, onSuccess, onError]
  );

  useEffect(() => {
    if (autoFetch) {
      execute();
    }
  }, [autoFetch, execute]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    data,
    loading,
    error,
    execute,
    reset,
  };
};

// Mutation hook for create/update/delete operations
export const useMutation = <TData = any, TVariables = any>(
  mutationFunction: (variables: TVariables) => Promise<any>
) => {
  const [data, setData] = useState<TData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (variables: TVariables) => {
    try {
      setLoading(true);
      setError(null);

      const response = await mutationFunction(variables);

      if (response.success && response.data) {
        setData(response.data);
      }

      return response;
    } catch (err) {
      const error = err as Error;
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };

  return {
    data,
    loading,
    error,
    mutate,
    reset,
  };
};

// Hook for polling/refetching data at intervals
export const usePolling = <T = any>(
  apiFunction: () => Promise<any>,
  interval: number = 5000,
  enabled: boolean = true
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiFunction();

      if (response.success && response.data) {
        setData(response.data);
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [apiFunction]);

  useEffect(() => {
    if (!enabled) return;

    fetchData(); // Fetch immediately

    const intervalId = setInterval(fetchData, interval);

    return () => clearInterval(intervalId);
  }, [enabled, interval, fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
};
