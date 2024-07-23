import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";

const api = import.meta.env.VITE_BACKEND_API

function getAccessTokenFromLocalStorage(): string | undefined {
  return Cookies.get("accessToken");
}

export const authorizedApi: AxiosInstance = axios.create({
  baseURL: api,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

authorizedApi.interceptors.request.use(
  (config) => {
    const token = getAccessTokenFromLocalStorage();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const unauthorizedApi: AxiosInstance = axios.create({
  baseURL: api,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});
