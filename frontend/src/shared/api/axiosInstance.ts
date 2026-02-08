import axios from 'axios';
import { refreshAccessToken } from '../../utils/refreshAccessToken';

export const BASE_URL = import.meta.env.VITE_BASE_URL;

const getToken = () => localStorage.getItem('accessToken');

export const logout = () => {
  localStorage.removeItem('accessToken');
  window.location.href = '/auth';
};

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (!error.response) {
      return Promise.reject(error);
    }
    const statusCode = error.response.status;
    const originalRequest = error.config;

    const isAuthRequest =
      originalRequest.url?.includes('/auth/login') ||
      originalRequest.url?.includes('/auth/register');

    if (isAuthRequest) {
      return Promise.reject(error);
    }

    const token = getToken();

    if (statusCode === 401 && token && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        }
      } catch (error) {
        console.warn('Refresh failed', error);
      }

      logout();
    } else if (statusCode === 500) {
      console.error('Server error-try again later');
    }
    return Promise.reject(error);
  },
);

export default api;
