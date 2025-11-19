import axios from 'axios';
import { UserFormData } from '../features/profile/components/personal-data/PersonalData';

const BASE_URL = import.meta.env.VITE_BASE_URL;
export const updateUser = async (data: UserFormData, id: string) => {
  const res = await axios.put(
    `${BASE_URL}/users/${id}`,
    {
      data,
    },
    { withCredentials: true },
  );
  return res.data;
};
export const deleteUser = async () => {
  const res = await axios.delete(
    `${BASE_URL}/users/delete`,

    { withCredentials: true },
  );
  return res.data;
};
