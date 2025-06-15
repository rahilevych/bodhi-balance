import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;
export const createCheckoutSession = async (trainingId: string) => {
  const res = await axios.post(
    `${BASE_URL}/booking/training`,
    {
      trainingId: trainingId,
    },
    { withCredentials: true }
  );
  return res.data;
};
