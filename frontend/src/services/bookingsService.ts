import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;
export const getBookingsByUserId = async (id: string) => {
  const res = await axios.get(`${BASE_URL}/booking/trainings/${id}`, {
    withCredentials: true,
  });
  return res.data;
};
