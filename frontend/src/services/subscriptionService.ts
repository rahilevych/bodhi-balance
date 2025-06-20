import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;
export const getSubscriptionByUserId = async () => {
  const res = await axios.get(`${BASE_URL}/subscription/active`, {
    withCredentials: true,
  });
  return res.data;
};
