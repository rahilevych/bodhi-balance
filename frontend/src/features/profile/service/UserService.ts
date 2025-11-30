import api from '../../../shared/api/axiosInstance';
import { UserFormData } from '../components/personal-data-form/schema';

export default class UserService {
  static async updateUser(data: UserFormData, id: string) {
    const res = await api.put(`/users/${id}`, {
      data,
    });
    return res.data;
  }
  static async deleteUser() {
    const res = await api.delete(`/users/delete`);
    return res.data;
  }
}
