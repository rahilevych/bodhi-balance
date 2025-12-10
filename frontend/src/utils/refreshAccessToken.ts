import api from '../shared/api/axiosInstance';

export const refreshAccessToken = async () => {
  try {
    const { data } = await api.get('/auth/refresh');
    localStorage.setItem('accessToken', data.accessToken);
    return data.accessToken;
  } catch (err) {
    console.error('Refresh token failed', err);
    localStorage.removeItem('accessToken');

    return null;
  }
};
