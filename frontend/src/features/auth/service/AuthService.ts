import api from '../../../shared/api/axiosInstance';
import { LoginFormData } from '../components/login/LoginForm';
import { RegisterFormData } from '../components/registration/RegistrationForm';

export default class AuthService {
  static async registerUser(data: RegisterFormData) {
    const res = await api.post(`/api/auth/register`, {
      name: data.fullName,
      email: data.email,
      password: data.password,
    });
    return res.data;
  }
  static async loginUser(data: LoginFormData) {
    const res = await api.post(`/api/auth/login`, {
      email: data.email,
      password: data.password,
    });
    return res.data;
  }
  static async getMe() {
    const res = await api.get(`/api/auth/me`);
    return res.data;
  }
  static async logout() {
    return await api.post(`/api/auth/logout`);
  }
}
