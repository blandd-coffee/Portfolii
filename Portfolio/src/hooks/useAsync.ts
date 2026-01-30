import { useCallback, useEffect, useRef, useState } from "react";

type AsyncOptions<T> = {
  skip?: boolean;
  initialData?: T | null;
  errorMessage?: string;
};

export const useAsync = <T>(
  asyncFn: () => Promise<T>,
  deps: ReadonlyArray<unknown>,
  options: AsyncOptions<T> = {},
) => {
  const { skip = false, initialData = null, errorMessage } = options;
  const isMounted = useRef(true);
  const [data, setData] = useState<T | null>(initialData);
  const [loading, setLoading] = useState(!skip);
  const [error, setError] = useState<string | null>(null);

  const stableFn = useCallback(asyncFn, deps);

  const execute = useCallback(async () => {
    if (skip) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const result = await stableFn();
      if (isMounted.current) {
        setData(result);
      }
    } catch (err) {
      if (isMounted.current) {
        setError(
          errorMessage ??
            (err instanceof Error ? err.message : "Request failed"),
        );
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  }, [errorMessage, skip, stableFn]);

  useEffect(() => {
    execute();
  }, [execute]);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return { data, loading, error, setData, execute };
};
