import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getAllTrainingForDay = async (date: Date) => {
  const res = await axios.get(`${BASE_URL}/schedule/trainings`, {
    params: { date },
  });

  return res.data;
};
export const getTrainingById = async (id: string) => {
  const res = await axios.get(`${BASE_URL}/schedule/trainings/training/${id}`);
  return res.data;
};
