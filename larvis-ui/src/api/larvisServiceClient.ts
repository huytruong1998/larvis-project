import axios, { AxiosInstance } from 'axios';
const apiUrl = import.meta.env.VITE_LARVIS_SERVICE_API;
const larvisServiceClient: AxiosInstance = axios.create({
  baseURL: apiUrl || 'http://localhost:8080',
});

larvisServiceClient.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');
    if (token && !config.url?.includes('/token')) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default larvisServiceClient;
