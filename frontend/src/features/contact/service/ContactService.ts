import api from '../../../shared/api/axiosInstance';
import { ContactData } from '../components/contact-form/ContactForm';

export class ContactService {
  static async sendMessage(data: ContactData) {
    const res = await api.post(`/api/contact/message`, {
      fullName: data.fullName,
      email: data.email,
      message: data.message,
    });
    return res;
  }
}
