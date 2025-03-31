import axios, { AxiosInstance, AxiosRequestHeaders, InternalAxiosRequestConfig } from 'axios';

const apiUrl = import.meta.env.VITE_LARVIS_SERVICE_API;
const larvisServiceClient: AxiosInstance = axios.create({
  baseURL: apiUrl || 'http://localhost:8080',
});

larvisServiceClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const newConfig = { ...config };
    const token = sessionStorage.getItem('token');
    if (token && !config.url?.includes('/token')) {
      newConfig.headers = newConfig.headers || ({} as AxiosRequestHeaders);
      newConfig.headers.Authorization = `Bearer ${token}`;
    }
    return newConfig;
  },
  (error) => Promise.reject(error),
);

export default larvisServiceClient;
