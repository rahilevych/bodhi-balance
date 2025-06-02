import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getAllFAQ = async () => {
  const res = await axios.get(`${BASE_URL}/questions/all`);

  return res.data;
};
