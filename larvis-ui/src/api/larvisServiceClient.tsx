import axios, { AxiosInstance } from 'axios';

const serviceA: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // or hardcode: 'http://localhost:3000'
  withCredentials: true, // optional
});

export default serviceA;
