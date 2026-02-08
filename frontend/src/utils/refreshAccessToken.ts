import axios from 'axios';
import { BASE_URL } from '../shared/api/axiosInstance';

export const refreshAccessToken = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/auth/refresh`, {
      withCredentials: true,
    });
    localStorage.setItem('accessToken', data.token);

    return data.accessToken;
  } catch (err) {
    console.error('Refresh token failed', err);
    localStorage.removeItem('accessToken');

    return null;
  }
};
