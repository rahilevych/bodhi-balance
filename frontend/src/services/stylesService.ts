import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getAllStyles = async () => {
  const res = await axios.get(`${BASE_URL}/yoga/styles`);

  return res.data;
};
