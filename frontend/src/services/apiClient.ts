import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://localhost:8080/',
});

apiClient.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('user');
    const loginUser = user ? JSON.parse(user) : '';
    if (loginUser && loginUser.token) {
      config.headers['Authorization'] = `Bearer ${loginUser.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
