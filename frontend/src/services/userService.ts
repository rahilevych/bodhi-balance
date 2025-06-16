import axios from 'axios';
import { UserFormData } from '../components/profile/PersonalData';

const BASE_URL = import.meta.env.VITE_BASE_URL;
export const updateUser = async (data: UserFormData, id: string) => {
  const res = await axios.put(
    `${BASE_URL}/users/${id}`,
    {
      data,
    },
    { withCredentials: true }
  );
  return res.data;
};
