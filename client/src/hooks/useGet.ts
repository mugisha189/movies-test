/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { authorizedApi } from "../utils/api";

export interface ApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

const useGet = <T>(
  url: string,
  config?: AxiosRequestConfig,
  page?: number,
  perPage?: number
): ApiResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const params: any = { ...config?.params };
      if (page !== undefined && perPage !== undefined) {
        params.page = page;
        params.perPage = perPage;
      }
      const response: AxiosResponse<T> = await authorizedApi.get(url, {
        ...config,
        params,
      });
      setData(response.data);
      setError(null);
    } catch (error) {
      setError(error instanceof Error ? error : new Error("Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [page, perPage]);

  return { data, loading, error, refetch };
};

export default useGet;
