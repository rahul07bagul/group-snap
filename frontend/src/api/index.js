import axios from 'axios';

// Create an instance of axios for global API configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000', // Use env variable for the backend URL
  timeout: 5000, // You can set a timeout for requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach tokens (e.g., Auth tokens)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
