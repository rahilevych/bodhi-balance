import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const registerUser = async (data: {
  fullName: string;
  email: string;
  password: string;
}) => {
  console.log(data);
  const res = await axios.post(`${BASE_URL}/auth/register`, {
    name: data.fullName,
    email: data.email,
    password: data.password,
  });
  return res.data;
};
export const loginUser = async (data: { email: string; password: string }) => {
  const res = await axios.post(
    `${BASE_URL}/auth/login`,
    {
      email: data.email,
      password: data.password,
    },
    {
      withCredentials: true,
    }
  );
  console.log(res.data);
  return res.data;
};
export const getMe = async () => {
  const res = await axios.get(`${BASE_URL}/auth/me`, {
    withCredentials: true,
  });
  return res.data;
};
export const logout = async () => {
  await axios.post(`${BASE_URL}/auth/logout`, null, {
    withCredentials: true,
  });
};
