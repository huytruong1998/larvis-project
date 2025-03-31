import axios, { AxiosInstance } from 'axios';

const larvisServiceClient: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
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
