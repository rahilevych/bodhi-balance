import axios from 'axios';
import { ContactData } from '../components/Contact/ContactForm';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const sendMessage = async (data: ContactData) => {
  const res = await axios.post(`${BASE_URL}/contact/message`, {
    fullName: data.fullName,
    email: data.email,
    message: data.message,
  });
  return res;
};
