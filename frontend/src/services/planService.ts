import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getAllPlans = async () => {
  const res = await axios.get(`${BASE_URL}/plans/all`);
  return res.data;
};
export const getPlanById = async (id: string) => {
  const res = await axios.get(`${BASE_URL}/plans/all/${id}`);
  return res.data;
};
