import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getAllTrainers = async () => {
  const res = await axios.get(`${BASE_URL}/trainers/all`);

  return res.data;
};
